/*

  Version History:
  
  v07 @ 10-Feb-2025 : Fixing the lack of [title] slug and filename substitution
  v06 @  9-Feb-2025 : New Micropost template handing w/ "automatic title" from post's first line
  v05 @  9-Feb-2025 : Added 2-mile test around Toledo, Tama and Grinnell to avoid unecessary API calls
  v04 @  8-Feb-2025 : Populates `location:` frontmatter using logic from https://forums.getdrafts.com/t/reverse-geocode-feature/9598/5
  v03 @  8-Feb-2025 : Populates `coordinates:` frontmatter using Drafts capture variables
  v02 @  8-Feb-2025 : Checks for a title of 5 characters or more and removes any Drafts title above the frontmatter delimiter.
  v01 @  8-Feb-2025 : Original script w/ credientials.  Working nicely!  Just needs some 
    geo-location sense and automatic removal of Drafts title above the frontmatter delimiter.

  Create a .md file in Github repo

  To configure, edit REPO, SOURCE, PATH and SITE. All of them are subject to
  string formatting, so you can use following macros for dynamic URL generation:
  * {year} - four-digit year
  * {month} - two digit month (from 01 to 12)
  * {day} - two digit day (from 01 to 31)
  

Micropost Template
[title]
---
title: "[automatic title]"
date: [[date|%Y-%m-%dT%H:%M:%S%z]]
tags: template
location: "[full location]"
coordinates: "[created_latitude, created_longitude]"
draft: false
type: micropost
---
[body]


*/

/**** Configuration */

// Repository name on Github
var REPO = 'SummittDweller/npm-blog-SummittDweller';
// Where should the file be saved, ROOT directory inside repository with site sources
var SOURCE = 'content';
// Site domain
var SITE = 'https://blog.summittdweller.com/';
// Path inside ROOT source directory *AND* path on site. NOTE: Should they be different?..
var PATH = 'microposts/{year}/{month}';

// Github API base
var BASE = 'https://api.github.com/repos';

/**** Connection */

var http = HTTP.create();
var credential = Credential.create('Github', 'Insert Github API token from github.com/settings/tokens' +
                                   ' (when creating new, add full repo control to allow writing to repos)');
credential.addTextField('token', '');
credential.authorize();

var TOKEN = credential.getValue('token');
if (!TOKEN) {
  throw 'Missing GitHub token in Drafts credentials.';
}


/**** Coordiante Geom */

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 3959; // Radius of the Earth in miles
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
}

function inToledo(draft) {
  const lat1 = 41.99284;
  const lon1 = -92.58171;
  miles = calculateDistance(lat1, lon1, draft.createdLatitude, draft.createdLongitude);
  if (miles < 2.0) { return true; } 
  return false;
}

function inTama(draft) {
  const lat1 = 41.96233;
  const lon1 = -92.57958;
  miles = calculateDistance(lat1, lon1, draft.createdLatitude, draft.createdLongitude);
  if (miles < 2.0) { return true; } 
  return false;
}

function inGrinnell(draft) {
  const lat1 = 41.74324;
  const lon1 = -92.72945;
  miles = calculateDistance(lat1, lon1, draft.createdLatitude, draft.createdLongitude);
  if (miles < 2.0) { return true; } 
  return false;
}

/**** Utils */

function pad(i) {
  return (i < 10 ? '0' : '') + i;
}

function format(s, data) {
  return s.replace(/\{([^\}]+)\}/g, function(match, k) {
    return data[k];
  });
}

function createDateSlug() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, pad with 0 if needed
  const day = String(now.getDate()).padStart(2, '0'); // Pad with 0 if needed

  const dslug = `${year}-${month}-${day}-`;
  return dslug;
}


function getSlug(content) {
  var slug = content.match(/^slug: (.*)$/m);
  if (slug)
    return slug[1];
  var title = content.match(/^title: (.*)$/m);
  if (!title)
    throw 'Unknown title!';
  if (title[1].length < 4)
	throw 'Did you forget the title?';
  var dateSlug = createDateSlug();
  var slug = dateSlug + (title[1]
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-|-$/g, ''));
  return slug;
}


/* geolocation tips from https://forums.getdrafts.com/t/add-coordinates-when-capturing-from-apple-watch-possible-quick-capture-when-cycling-d/11302 */

function getCoordinates(draft) {
  var coords = "Undefined"
  // var field = draft.content.match(/^coordinates: (.*)$/m);
  // if (!field)
  //  return draft.content;
  coords = draft.createdLatitude + ", " + draft.createdLongitude;
  return coords;
}

function toTitleCase(str) {
  var terms = str.match(/[A-Za-z][A-Za-z0-9'’]*/g);
  if (!terms) {
    return str;
  }

  var smallWords = {
    a: true,
    an: true,
    and: true,
    as: true,
    at: true,
    but: true,
    by: true,
    for: true,
    if: true,
    in: true,
    nor: true,
    of: true,
    on: true,
    or: true,
    per: true,
    the: true,
    to: true,
    v: true,
    vs: true,
    via: true
  };

  var i = 0;
  var last = terms.length - 1;

  return str.replace(/[A-Za-z][A-Za-z0-9'’]*/g, function(word) {
    var lower = word.toLowerCase();
    var isAllUpper = word.length > 1 && word === word.toUpperCase();
    var isAllLower = word === lower;
    var isSimpleTitle = /^[A-Z][a-z0-9'’]*$/.test(word);
    var isMixedCaseBrand = !isAllUpper && !isAllLower && !isSimpleTitle;
    var isMiddleWord = i > 0 && i < last;

    // Preserve acronyms and intentional mixed-case words (e.g., MSP, CID, iOS, eBay).
    if (isAllUpper || isMixedCaseBrand) {
      i += 1;
      return word;
    }

    // Keep common short connectives lowercase unless they are first/last in the title.
    if (isMiddleWord && smallWords[lower]) {
      i += 1;
      return lower;
    }

    i += 1;
    return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
  });
}

function removeDraftsTitle(text) {
  const delimiter = '---';
  const index = text.indexOf(delimiter);
  if (index === -1) { throw "You MUST provide a first-line title!"; }
  var firstLine = text.slice(0, index);
  var title = toTitleCase(firstLine.trim( ));
  var txt = text.replace("[automatic title]", title);
  return txt.slice(index).trimStart();
}
  

function req(method, url, data) {
  console.log(method + ' ' + url);
  var res = http.request({
    method: method,
    url: url,
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': 'token ' + TOKEN
    },
    encoding: 'json',
    data: data
  });
  if (res.responseText)
    res.data = parseJsonResponse(res.responseText, 'GitHub API');
  return res;
}

function parseJsonResponse(text, source) {
  try {
    return JSON.parse(text);
  }
  catch (error) {
    var preview = text.slice(0, 200);
    throw source + ' returned invalid JSON: ' + error + '\n' + preview;
  }
}

function extractLocationLabel(geodata) {
  if (!geodata || !geodata.address) {
    return null;
  }

  var address = geodata.address;
  var locality = address.city || address.town || address.village || address.hamlet || address.suburb || address.county;
  var region = address.state || address.region;

  if (locality && region) {
    return locality + ', ' + region;
  }

  if (geodata.display_name) {
    return geodata.display_name;
  }

  return null;
}

function lookupLocationWithNominatim(draft) {
  var geocodeHttp = HTTP.create();
  geocodeHttp.timeout = 10;

  var response = geocodeHttp.request({
    "url": "https://nominatim.openstreetmap.org/reverse",
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "User-Agent": "SummittDwellerDraftsMicropost/1.0"
    },
    "parameters": {
      "lat": String(draft.createdLatitude),
      "lon": String(draft.createdLongitude),
      "format": "jsonv2",
      "zoom": "10",
      "addressdetails": "1"
    }
  });

  if (!response.success || !response.responseText) {
    console.log('Nominatim lookup failed: ' + response.statusCode + ' ' + response.error);
    return null;
  }

  var text = response.responseText.trim();
  if (!text || text.charAt(0) === '<') {
    console.log('Nominatim returned non-JSON content');
    return null;
  }

  var geodata = parseJsonResponse(text, 'Nominatim API');
  return extractLocationLabel(geodata);
}

function urlformat(/* ...bits */) {
  var d = new Date();
  var bits = [].filter.call(arguments, function(x) { return !!x; });
  return format(bits.join('/'),
    {year:  d.getFullYear(), month: pad(d.getMonth() + 1), day: pad(d.getDate())});
}

/* location: logic */
// geocode sample Taken from several sources on Draft community and some assistance from ChatGPT AI - DHT 2023-03-05 Sun

function getLocation(draft) {
  var fullLocation = "Undetermined"
  
  if (!draft.createdLatitude || !draft.createdLongitude) {
    return fullLocation;
  }

  if (inToledo(draft)) {
    return "Toledo, IA"
  }

  if (inTama(draft)) {
    return "Tama, IA"
  }

  if (inGrinnell(draft)) {
    return "Grinnell, IA"
  }

  try {
    var nominatimLocation = lookupLocationWithNominatim(draft);
    if (nominatimLocation) {
      return nominatimLocation;
    }
  }
  catch (error) {
    console.log('Location lookup failed: ' + error);
  }

  return fullLocation;

};  


/**** Logic */

function main( ) {

  var coords = getCoordinates(draft);
  var loc = getLocation(draft);

  var content = draft.content.replace("[full location]", loc).replace("[created_latitude, created_longitude]", coords);
  var trimmed = removeDraftsTitle(content)

  var slug = getSlug(trimmed);  // send 'trimmed' into the fuction, not 'content' in order to get correct title
  
  var url = urlformat(BASE, REPO, 'contents', SOURCE, PATH, slug + '.md');
  // var b64 = Base64.encode(content);
  var b64 = Base64.encode(trimmed);

  // throw "slug: " + slug + "trimmed: " + trimmed;

  var res = req('GET', url, null);
  console.log('GET response: ' + res.statusCode
    //+ ' ' + res.responseText 
    );

  if ((res.statusCode == 200) && (res.data.type != 'file')) {
    throw 'Target file exists, but is not a file: ' + res.data.type;

  } else if (res.statusCode == 200) {
    res = req('PUT', url, {
      message: 'Update post from Drafts.app: ' + slug,
      content: b64,
      sha: res.data.sha
    });

  } else {
    res = req('PUT', url, {
      message: 'New post from Drafts.app: ' + slug,
      content: b64
    });
  }
  console.log('PUT response: ' + res.statusCode + ' ' + res.responseText);

  var result = urlformat(SITE, PATH, slug, '');
  app.setClipboard(result);
}


main( );
