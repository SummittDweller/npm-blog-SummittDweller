---
title: Engaging `s3cmd` to Download and Resize Images from DO Spaces
slug: engaging-s3cmd-to-download-and-resize-images-from-do-spaces
date: 2023-04-16T14:57:16.000Z
date_updated: 2023-04-16T19:38:25.000Z
tags: 
  - Development
  - DigitalOcean
hero_image: /images/1xh3hb-Screenshot-2023-04-16-at-14.37.02.png
---

Earlier in this blog there's a `micropost` that lays out the problem at hand.  In a nutshell, most of the photos I saved in *DigitalOcean Spaces* are too big to be effective in this blog.  They suck up lots of time and bandwidth every time this blog gets rebuilt, and then they are rendered at a fraction of their original size. This is exceptionall wasteful and unnecessary.

So, my task this morning is to install, configure, and engage the [s3cmd](https://s3tools.org/s3cmd) tools to help get this done.  There's *DigitalOcean*-specific guidance provided in [Setting Up s3cmd 2.x with DigitalOcean Spaces](https://docs.digitalocean.com/products/spaces/reference/s3cmd/) so that's where I will begin.  Here goes...

## Installing `s3cmd`

This looks to be very simple and straightforward, `brew install s3cmd` should do the trick. In a substantially abridged form, that looked like this:

    ╭─mark@Marks-Mac-Mini ~/GitHub/blog-eleventy-ghost ‹main›
    ╰─$ brew install s3cmd
    Running `brew update --auto-update`...
    ==> Auto-updated Homebrew!
    ==> Updated Homebrew from 4.0.10 (931327df1) to 4.0.13 (ac0663ae5).
    Updated 4 taps (dart-lang/dart, sass/sass, homebrew/core and homebrew/cask).
    ...
    You have 55 outdated formulae and 1 outdated cask installed.
    ...
    ==> Installing s3cmd
    ==> Pouring s3cmd--2.3.0.ventura.bottle.1.tar.gz
    🍺  /usr/local/Cellar/s3cmd/2.3.0: 837 files, 11.4MB
    ==> Running `brew cleanup s3cmd`...
    Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
    Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
    ...
    

That took about 10 minutes, but should be worth it.

## Configuration

Next, to begin configuration I need to fetch the access key:value pair for `images-summittdweller` that I created 4 years ago. I have the credentials necessary to view that information at [https://cloud.digitalocean.com/account/api/spaces](https://cloud.digitalocean.com/account/api/spaces) so that's what I've done.

Whoa, that didn't work! I tried to use old access keys but apparently they are in the wrong format?  So, I created a new key named `key-for-s3cmd` and applied that (see below) and it works.

    ╭─mark@Marks-Mac-Mini ~/GitHub/blog-eleventy-ghost ‹main›
    ╰─$ s3cmd --configure
    
    Enter new values or accept defaults in brackets with Enter.
    Refer to user manual for detailed description of all options.
    
    Access key and Secret key are your identifiers for Amazon S3. Leave them empty for using the env variables.
    Access Key [images-summittdweller]: ***This is a secret***
    Secret Key [4YPWYNXZZXFDIR6CRPHG]: ***An even bigger secret***
    Default Region [US]:
    
    Use "s3.amazonaws.com" for S3 Endpoint and not modify it to the target Amazon S3.
    S3 Endpoint [nyc3.digitaloceanspaces.com]:
    
    Use "%(bucket)s.s3.amazonaws.com" to the target Amazon S3. "%(bucket)s" and "%(location)s" vars can be used
    if the target S3 system supports dns based buckets.
    DNS-style bucket+hostname:port template for accessing a bucket [%(bucket)s.nyc3.digitaloceanspaces.com]:
    
    Encryption password is used to protect your files from reading
    by unauthorized persons while in transfer to S3
    Encryption password [SummittDweller]:
    Path to GPG program [/usr/local/bin/gpg]:
    
    When using secure HTTPS protocol all communication with Amazon S3
    servers is protected from 3rd party eavesdropping. This method is
    slower than plain HTTP, and can only be proxied with Python 2.7 or newer
    Use HTTPS protocol [Yes]:
    
    On some networks all internet access must go through a HTTP proxy.
    Try setting it here if you can't connect to S3 directly
    HTTP Proxy server name:
    
    New settings:
      Access Key: ***This is a secret***
      Secret Key: ***An even bigger secret***
      Default Region: US
      S3 Endpoint: nyc3.digitaloceanspaces.com
      DNS-style bucket+hostname:port template for accessing a bucket: %(bucket)s.nyc3.digitaloceanspaces.com
      Encryption password: SummittDweller
      Path to GPG program: /usr/local/bin/gpg
      Use HTTPS protocol: True
      HTTP Proxy server name:
      HTTP Proxy server port: 0
    
    Test access with supplied credentials? [Y/n] Y
    Please wait, attempting to list all buckets...
    Success. Your access key and secret key worked fine :-)
    
    Now verifying that encryption works...
    Success. Encryption and decryption worked fine :-)
    
    Save settings? [y/N] y
    Configuration saved to '/Users/mark/.s3cfg'
    

## Using `s3cwd`

The "More Information" section at the end of the document I used above says that... "You can use our [quick reference on s3cmd usage](https://docs.digitalocean.com/products/spaces/reference/s3cmd-usage/) to get started."  Ok, let's have a look... very nice!  I'm moving immediately to the [Save files to your local computer](https://docs.digitalocean.com/products/spaces/reference/s3cmd-usage/#save-files-to-your-local-computer) bits.

### Fetching Files of the August 2020 Derecho

The photos I saved of damage from our August 2020 Derecho, in a `images-summittdweller/2020-Aug-10-Derecho` bucket, are rather depressing and certainly don't need to be super high-res for the web, so let's retrieve those and practice this workflow there first.

The quick reference linked above says to use a command of the form `s3cmd get s3://spacename/path/ --recursive` to get all files from a particular folder.  In my case, that's...

    ╭─mark@Marks-Mac-Mini ~/Downloads/2020-derecho-photos
    ╰─$ s3cmd get s3://images-summittdweller/2020-Aug-10-Derecho/ --recursive
    
    WARNING: Empty object name on S3 found, ignoring.
    download: 's3://images-summittdweller/2020-Aug-10-Derecho/Derecho - 1.png' -> './Derecho - 1.png'  [1 of 82]
     23486944 of 23486944   100% in    1s    21.04 MB/s  done
    download: 's3://images-summittdweller/2020-Aug-10-Derecho/Derecho - 10.png' -> './Derecho - 10.png'  [2 of 82]
     20861132 of 20861132   100% in    0s    23.45 MB/s  done
    ...
    download: 's3://images-summittdweller/2020-Aug-10-Derecho/Photo-2020-08-20-19-51.jpeg' -> './Photo-2020-08-20-19-51.jpeg'  [81 of 82]
     6277783 of 6277783   100% in    0s    16.86 MB/s  done
    ERROR: Creation of file './for-the-web/' failed (Reason: Is a directory)
    

Ok, 81 images downloaded.  That was sooooooooo much better than the 1000-or-so clicks it would have taken to do that manually!  The only gottcha... that last error message about not downloading the `for-the-web` directory, which is currently empty anyway.  Before I go farther, I'm going to open that *DigitalOcean Spaces* bucket and change the errant directory name to `web-ready`; that's where my "thumbnail" copies of all these images will be uploaded shortly.

## Next Step, Resize Those Images

I found some concise and timely advice in the first web post I Googled: [How to quickly resize multiple images at once on Mac](https://www.idownloadblog.com/2013/10/19/how-to-resize-multiple-images-mac/). It uses exactly the tool I had in mind, the Mac-native `Preview` app.

Before begining that process I wanted to see just how much space my 81 images occupy, like so:

    ╭─mark@Marks-Mac-Mini ~/Downloads/2020-derecho-photos
    ╰─$ du -sh
    2.7G	.
    

2.7G isn't all that much, but it's still much bigger than it needs to be.  I'm firing up `Preview` now to see if I can reduce all images proportionally to a maximum width of 800 pixels.  Be back in a couple of minutes...

Drum roll please...

    ╭─mark@Marks-Mac-Mini ~/Downloads/2020-derecho-photos
    ╰─$ du -sh
    163M	.
    

Not bad at all.  Only took a couple of minutes and it reduced the total image size from 2.7G down to 163M. Not too shabby.

## Uploads Complete... Next?

In order to upload the resized images back to *DigitalOcean Spaces*, I simply used the nice graphical interface available to me at [https://cloud.digitalocean.com/spaces/images-summittdweller?path=2020-Aug-10-Derecho%2Fweb-ready](https://cloud.digitalocean.com/spaces/images-summittdweller?path=2020-Aug-10-Derecho%2Fweb-ready) and the `Upload` option there.  It worked nicely, but for whatever reason two of the images failed to upload: `Derecho - 38.png` and `Derecho - 39.png`.  After a little review, and retries, I could not figure out why these wouldn't upload but that's OK because they are both largely redundant with `Derecho - 40.png`, so we'll just stick with that one.

So, in the original folder image `Derecho - 1.png` has an endpoint of `https://images.summittdweller.com/2020-Aug-10-Derecho/Derecho%20-%201.png`.  Makes sense.  In my new `web-ready` directory the reduced-size copy of the same image naturally has an endpoint of `https://images.summittdweller.com/2020-Aug-10-Derecho/web-ready/Derecho%20-%201.png`.  Fortunately, that's a "match" except for the addition of the `web-ready` subdirectory in the path.  Exactly what I hoped would happen.

This means the next step is to...

## Alter Content to Include the `web-ready` Path

I used the admin search (magnifying glass) feature of the *Ghost* instance behind [this blog](__GHOST_URL__/ghost/#/dashboard) to find all references to `https://images.summittdweller.com/2020-Aug-10-Derecho` and it found: NOTHING.  Yikes.  Turns out all of the references were in one post, and it was draft.  So I edited the draft "manually" and published it.  Now let's try that search again... NOPE.  So, the text inside those `figure` tags evidently isn't discoverable.  ☹️  Just as well since I think a different approach is needed.

## Not `web-ready`, `originals`

Since editing the content (posts) to pick up the new `web-ready` directory is a royal pain, what I'm going to do now is create a new `originals` sub-directory in each bucket, download all the images, resize them locally as I did above, but replace the existing high-resolution images with the smaller copies AFTER I make a backup the original images in a new `originals` directory.  That way I don't have to edit any of my posts in order to get the smaller web-ready images, but I won't lose the originals either.  **Beautimous**.

## Belay That Order!

While I'm confident this approach (above) will work, it may not be necessary.  I looked, for example, in `images-summittdweller/Norway-Photos-2019/Bergen - Hordaland, June 19, 2019` expecting to find some large images, but there were none over 800px in width.  In fact, I believe they are all under 640px wide, so nothing to do there, and that's a good thing.

## That's All Folks

A detailed search of `images-summittdweller` didn't turn up any more enromous images that might get pushed to the web, so... "That's All Folks", for now at least.
