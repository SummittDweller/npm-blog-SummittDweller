/*

  This version (v02) checks for a title of 5 characters or more and 
  removes any Drafts title above the frontmatter delimiter.

  Create a .md file in Github repo

  To configure, edit REPO, SOURCE, PATH and SITE. All of them are subject to
  string formatting, so you can use following macros for dynamic URL generation:
  * {year} - four-digit year
  * {month} - two digit month (from 01 to 12)
  * {day} - two digit day (from 01 to 31)

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
credential.addTextField('token', 'GITHUB_TOKEN');
credential.authorize();

var TOKEN = credential.getValue('token');


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

function removeDraftsTitle(text) {
  const delimiter = '---';
  const index = text.indexOf(delimiter);
    if (index === -1) {
      return text;
    }
    return text.slice(index).trimStart();
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
    res.data = JSON.parse(res.responseText);
  return res;
}

function urlformat(/* ...bits */) {
  var d = new Date();
  var bits = [].filter.call(arguments, function(x) { return !!x; });
  return format(bits.join('/'),
    {year:  d.getFullYear(), month: pad(d.getMonth() + 1), day: pad(d.getDate())});
}



/**** Logic */

function main() {
  var content = draft.content;
  var trimmed = removeDraftsTitle(content)
  var slug = getSlug(content);

  var url = urlformat(BASE, REPO, 'contents', SOURCE, PATH, slug + '.md');
  // var b64 = Base64.encode(content);
  var b64 = Base64.encode(trimmed);

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


main();
