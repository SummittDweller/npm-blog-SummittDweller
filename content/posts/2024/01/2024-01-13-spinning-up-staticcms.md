---
title: Spinning Up StaticCMS
date: 2024-01-13T15:40:23.000Z
date_updated: 2024-01-14T03:53:56.000Z
tags: 
  - StaticCMS
  - Development
  - Wieting Theatre
hero_image: https://summittservices.blob.core.windows.net/summitt-dweller-blog/images/2024/01/Screenshot-2024-01-13-at-09.34.52.png
# weight: -20240113
---

Today is Saturday, January 13, 2024, and I won't be able to watch the KC Chief's wildcard playoff game vs. the Miami Dolphins tonight because it is streaming ONLY on Peacock, and I refuse to pay them for the "privilege" to watch it live.  So, I'm going to do something productive instead.  Let's see if I can spin up an instance of [StaticCMS](https://www.staticcms.org/) to provide an OPEN CMS for the content editor(s) behind the [Wieting Theatre website](https://Wieting.TamaToledo.com).  

## The Plan

So, the plan here involves establishing a "local-only" CMS for the [Wieting Theatre website](https://Wieting.TamaToledo.com) and running it on the new Ubuntu server in the Wieting's projection booth.  Editors should will be given login credentials to that server where they can run a local copy of the website (it's a Hugo static site) AND a local copy of the CMS editor, make changes, preview them, and commit the changes to the project's GitHub repo.  The website, hosted with *AWS Amplify* is then automatically updated based on the updated content.

### Along the Way

It's worth noting that while looking at [StaticCMS](https://www.staticcms.org) I also stumbled upon [tabcms - A CMS that runs in your browser tab](https://mortenson.coffee/work/tabcms/) which might be of interest if "The Plan" doesn't work.

## First Steps - Start with a Template

I choose the guidance at [Start with a Template](https://www.staticcms.org/docs/start-with-a-template) to get started.  My aim is to clone that repo and build it locally "as-is", then see if I can drop my existing [wieting-ss](https://github.com/SummittServices/wieting-ss) repo into the `site` directory and continue to make it work locally.

If that works, I'll repeat the same on the Wieting's Ubuntu server and keep pushing forward.  Wish me luck?

### Getting Started

Following the [Local Development](https://github.com/StaticJsCMS/static-cms-hugo-netlify-template#local-development) guidance found me cloning this [template](https://github.com/StaticJsCMS/static-cms-hugo-netlify-template) then...

    ╭─mark@Marks-Mac-Mini ~/GitHub/static-cms-hugo-netlify-template ‹main› 
    ╰─$ npm install 
    npm WARN deprecated querystring@0.2.0: The querystring API is considered Legacy. new code should use the URLSearchParams API instead.
    
    added 1567 packages, and audited 1568 packages in 2m
    
    426 packages are looking for funding
      run `npm fund` for details
    
    2 moderate severity vulnerabilities
    
    To address all issues, run:
      npm audit fix
    
    Run `npm audit` for details.
    ╭─mark@Marks-Mac-Mini ~/GitHub/static-cms-hugo-netlify-template ‹main*› 
    ╰─$ npm start
    
    > static-cms-hugo-netlify-template@1.0.0 start
    > run-p start:**
    
    
    > static-cms-hugo-netlify-template@1.0.0 start:webpack
    > webpack-dev-server --config webpack.dev.js --hot --stats-error-details
    
    
    > static-cms-hugo-netlify-template@1.0.0 start:hugo
    > hugo -d ../dist -s site -vw
    
    WARN  --verbose was deprecated in Hugo v0.114.0 and will be removed in a future release. use --logLevel info
    Start building sites … 
    hugo v0.120.1-16fb2cae88eb6add7d12e9fbfcf01d8670e60a35 darwin/amd64 BuildDate=2023-10-30T16:44:31Z VendorInfo=gohugoio
    
    INFO  copy static: syncing static files to /
    INFO  build: running step process duration 962.376µs
    INFO  build: running step assemble duration 4.712758ms
    INFO  build: running step render duration 16.982673ms
    INFO  build: running step postProcess duration 8.3µs
    
                       | EN  
    -------------------+-----
      Pages            | 10  
      Paginator pages  |  0  
      Non-page files   |  0  
      Static files     | 43  
      Processed images |  0  
      Aliases          |  1  
      Sitemaps         |  1  
      Cleaned          |  0  
    
    Built in 68 ms
    Watching for changes in /Users/mark/GitHub/static-cms-hugo-netlify-template/site/{content,data,layouts,static}
    Watching for config changes in /Users/mark/GitHub/static-cms-hugo-netlify-template/site/config.toml
    Press Ctrl+C to stop
    <i> [webpack-dev-server] Project is running at:
    <i> [webpack-dev-server] Loopback: http://localhost:3000/
    <i> [webpack-dev-server] On Your Network (IPv4): http://192.168.0.183:3000/
    <i> [webpack-dev-server] On Your Network (IPv6): http://[fe80::1]:3000/
    <i> [webpack-dev-server] Content not from webpack is served from '/Users/mark/GitHub/static-cms-hugo-netlify-template/dist' directory
    <i> [webpack-dev-server] 404s will fallback to '/index.html'
    <i> [webpack-dev-middleware] wait until bundle finished: /
    assets by path *.js 18.3 MiB
      asset cms.js 18 MiB [emitted] (name: cms)
      asset main.js 300 KiB [emitted] (name: main)
    asset main.css 113 KiB [emitted] (name: main)
    asset admin/index.html 521 bytes [emitted]
    asset fonts/.keep 0 bytes [emitted] [from: src/fonts/.keep] [copied]
    Entrypoint main 413 KiB = main.css 113 KiB main.js 300 KiB
    Entrypoint cms 18 MiB = cms.js
    runtime modules 72.3 KiB 38 modules
    modules by path ./node_modules/ 16.9 MiB 82 modules
    modules by path ./src/ 133 KiB (javascript) 113 KiB (css/mini-extract)
      modules by path ./src/js/ 15.2 KiB 9 modules
      modules by path ./src/css/*.scss 118 KiB (javascript) 113 KiB (css/mini-extract)
        ./src/css/main.scss 2.78 KiB [built] [code generated]
        ./node_modules/to-string-loader/src/to-string.js!./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/css/main.scss 429 bytes [built] [code generated]
        ./node_modules/mini-css-extract-plugin/dist/loader.js??ruleSet[1].rules[2].use[1]!./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/css/main.scss 332 bytes [built] [code generated]
        + 2 modules
      ./src/index.js 124 bytes [built] [code generated]
    asset modules 5.46 KiB
      data:image/png;base64,iVBORw0KGgoAAAAN.. 1.28 KiB [built] [code generated] [build time executed]
      data:image/png;base64,iVBORw0KGgoAAAAN.. 1.33 KiB [built] [code generated] [build time executed]
      data:image/jpeg;base64,/9j/4QAYRXhpZgAA.. 1.55 KiB [built] [code generated] [build time executed]
      data:image/png;base64,iVBORw0KGgoAAAAN.. 1.3 KiB [built] [code generated] [build time executed]
    webpack 5.89.0 compiled successfully in 6191 ms
    INFO  Received System Events: [CREATE        "/Users/mark/GitHub/static-cms-hugo-netlify-template/site/data/webpack.json" WRITE         "/Users/mark/GitHub/static-cms-hugo-netlify-template/site/data/webpack.json"]
    
    Change detected, rebuilding site.
    2024-01-13 10:55:38.259 -0600
    Data changed WRITE         "/Users/mark/GitHub/static-cms-hugo-netlify-template/site/data/webpack.json"
    Data changed WRITE         "/Users/mark/GitHub/static-cms-hugo-netlify-template/site/data/webpack.json"
    INFO  build: running step process duration 114.033µs
    INFO  build: running step assemble duration 277ns
    INFO  build: running step render duration 6.244639ms
    INFO  build: running step postProcess duration 1.831µs
    Total in 6 ms
    

The demo site is indeed working at `http://localhost:3000/` and a vist to `http://localhost:3000/admin` does indeed open a *StaticCMS* login that's prompting me with the following image.

![Screenshot-2024-01-13-at-11.00.45](images/2024/01/Screenshot-2024-01-13-at-11.00.45.png)

### Let's Go Local!

Next, I'm going to try and switch what we have above to "go local" using [this guidance](https://www.staticcms.org/docs/local-backend) provided in the *StaticCMS* documenation.  Fingers crossed for good luck...

### Eureka! It Works!

So, I made the `local_backend` config changes as prescribed in `site/static/admin/config.yml` and that file now looks like this:

    local_backend: 
      # when using a custom proxy server port
      url: http://localhost:8082/api/v1
      # when accessing the local site from a host other than 'localhost' or '127.0.0.1'
      allowed_hosts: ['192.168.0.1']
    

I also added a new `.env` file in the project root directory with a single line reading `PORT=8082`, matching the port number specified in the `url:` value from `config.yml`.

Now, with `npx @staticcms/proxy-server` running in a local terminal I'm able to run `npm start` (in my *VSCode* terminal) to launch the site at `localhost:3000`.  Having done that I'm able to visit `http://localhost:3000/admin` where I get a new *StaticCMS* splash screen with a simple `Login` button, not a *Netlify* button.  Yay!

### Even Better News?

*StaticCMS* was built from *NetlifyCMS* so the `site/static/admin/config.yml`.  I think I'll be able to use the `collections:` portion of my old `admin/config.yml` file from [wieting-one-click-hugo-cms](https://github.com/SummittDweller/wieting-one-click-hugo-cms) to get a headstart on setting that up!

Next step... let's see if I can drop the `site` directory from [wieting-ss](https://github.com/SummittServices/wieting-ss) into this local project and still have a functioning local site.  Again, fingers crossed for luck.

# Fresh Restart

In order to start fresh I went back to the [StaticJsCMS/static-cms-hugo-netlify-template](https://github.com/StaticJsCMS/static-cms-hugo-netlify-template) repo and created a new fork (not a clone) in my `Summitt-Services` team space at [https://github.com/Summitt-Services/static-cms-hugo-local-template](https://github.com/Summitt-Services/static-cms-hugo-local-template).  In the new fork I changed the `-netlify-` portion of the name to `-local-` as this new project is intended to have no *Netlify* association, only a "local" CMS will be supported.

Next, I cloned the new fork to my workstation and got it working locally again using the same steps I had taken above.

## Copying `wieting-ss` to `static-cms-hugo-local-template`

For safe-keeping I created a new branch named `wieting` in `~/GitHub/static-cms-hugo-local-template` where I did this:

    ╭─mark@Marks-Mac-Mini ~/GitHub/static-cms-hugo-local-template ‹wieting*› 
    ╰─$ rsync -aruvi ../wieting-ss/. site/.
    ...
    >f++++++++++ themes/vanilla-bootstrap-hugo-theme/static/js/checkTweetDate.js
    >f++++++++++ themes/vanilla-bootstrap-hugo-theme/static/js/feather.min.js
    >f++++++++++ themes/vanilla-bootstrap-hugo-theme/static/js/jquery-3.3.1.slim.min.js
    
    sent 282,877,469 bytes  received 470,944 bytes  9,605,030.95 bytes/sec
    total size is 470,527,158  speedup is 1.66
    

Will it work?  Let's see... NOPE.  It does produce a site but the old "Kaldi" content is still all I see.  I even changed the `backend.branch:` value from `main` to `wieting`, but that did nothing.  So, I've captured the output here so that I can have a look at what's happening.

    ╭─mark@Marks-Mac-Mini ~/GitHub/static-cms-hugo-local-template ‹wieting*› 
    ╰─$ npm start                               
    
    > static-cms-hugo-netlify-template@1.0.0 start
    > run-p start:**
    
    
    > static-cms-hugo-netlify-template@1.0.0 start:webpack
    > webpack-dev-server --config webpack.dev.js --hot --stats-error-details
    
    
    > static-cms-hugo-netlify-template@1.0.0 start:hugo
    > hugo -d ../dist -s site -vw
    
    WARN  --verbose was deprecated in Hugo v0.114.0 and will be removed in a future release. use --logLevel info
    Start building sites … 
    hugo v0.120.1-16fb2cae88eb6add7d12e9fbfcf01d8670e60a35 darwin/amd64 BuildDate=2023-10-30T16:44:31Z VendorInfo=gohugoio
    
    INFO  copy static: syncing static files to /
    INFO  build: running step process duration 4.236952ms
    INFO  build: running step assemble duration 13.684119ms
    WARN  found no layout file for "json" for kind "section": You should create a template file which matches Hugo Layouts Lookup Rules for this combination.
    INFO  build: running step render duration 58.753135ms
    INFO  build: running step postProcess duration 8.744µs
    
                       | EN   
    -------------------+------
      Pages            |  66  
      Paginator pages  |   7  
      Non-page files   |   0  
      Static files     | 541  
      Processed images |   0  
      Aliases          |   7  
      Sitemaps         |   1  
      Cleaned          |   0  
    
    Built in 579 ms
    Watching for changes in /Users/mark/GitHub/static-cms-hugo-local-template/site/{archetypes,content,data,layouts,package.json,static,themes}
    Watching for config changes in /Users/mark/GitHub/static-cms-hugo-local-template/site/config.toml, /Users/mark/GitHub/static-cms-hugo-local-template/site/config/_default
    Press Ctrl+C to stop
    <i> [webpack-dev-server] Project is running at:
    <i> [webpack-dev-server] Loopback: http://localhost:3000/
    <i> [webpack-dev-server] On Your Network (IPv4): http://192.168.0.183:3000/
    <i> [webpack-dev-server] On Your Network (IPv6): http://[fe80::1]:3000/
    <i> [webpack-dev-server] Content not from webpack is served from '/Users/mark/GitHub/static-cms-hugo-local-template/dist' directory
    <i> [webpack-dev-server] 404s will fallback to '/index.html'
    <i> [webpack-dev-middleware] wait until bundle finished: /
    assets by path *.js 18.3 MiB
      asset cms.js 18 MiB [emitted] (name: cms)
      asset main.js 300 KiB [emitted] (name: main)
    asset main.css 113 KiB [emitted] (name: main)
    asset admin/index.html 521 bytes [emitted]
    asset fonts/.keep 0 bytes [emitted] [from: src/fonts/.keep] [copied]
    Entrypoint main 413 KiB = main.css 113 KiB main.js 300 KiB
    Entrypoint cms 18 MiB = cms.js
    runtime modules 72.3 KiB 38 modules
    modules by path ./node_modules/ 16.9 MiB 82 modules
    modules by path ./src/ 133 KiB (javascript) 113 KiB (css/mini-extract)
      modules by path ./src/js/ 15.2 KiB 9 modules
      modules by path ./src/css/*.scss 118 KiB (javascript) 113 KiB (css/mini-extract)
        ./src/css/main.scss 2.78 KiB [built] [code generated]
        ./node_modules/to-string-loader/src/to-string.js!./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/css/main.scss 429 bytes [built] [code generated]
        ./node_modules/mini-css-extract-plugin/dist/loader.js??ruleSet[1].rules[2].use[1]!./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/css/main.scss 332 bytes [built] [code generated]
        + 2 modules
      ./src/index.js 124 bytes [built] [code generated]
    asset modules 5.46 KiB
      data:image/png;base64,iVBORw0KGgoAAAAN.. 1.28 KiB [built] [code generated] [build time executed]
      data:image/png;base64,iVBORw0KGgoAAAAN.. 1.33 KiB [built] [code generated] [build time executed]
      data:image/jpeg;base64,/9j/4QAYRXhpZgAA.. 1.55 KiB [built] [code generated] [build time executed]
      data:image/png;base64,iVBORw0KGgoAAAAN.. 1.3 KiB [built] [code generated] [build time executed]
    webpack 5.89.0 compiled successfully in 5563 ms
    INFO  Received System Events: [CHMOD         "/Users/mark/GitHub/static-cms-hugo-local-template/site/data/webpack.json" WRITE         "/Users/mark/GitHub/static-cms-hugo-local-template/site/data/webpack.json"]
    
    Change detected, rebuilding site.
    2024-01-13 13:15:08.329 -0600
    Data changed WRITE         "/Users/mark/GitHub/static-cms-hugo-local-template/site/data/webpack.json"
    INFO  build: running step process duration 186.604µs
    INFO  build: running step assemble duration 244ns
    WARN  found no layout file for "json" for kind "section": You should create a template file which matches Hugo Layouts Lookup Rules for this combination.
    INFO  build: running step render duration 31.514265ms
    INFO  build: running step postProcess duration 7.661µs
    Total in 31 ms
    ^C<i> [webpack-dev-server] Gracefully shutting down. To force exit, press ^C again. Please wait...
    

## Corrections Needed

So, the first thing I see here is that the new `site` directory contains the template's `content/_index.md` file which naturally becomes the site's home page.  It contains only "Kaldi" content. So I tried removing that `_index.md` file and that changed the home page "title", but very little else.

I think returing to the `main` branch of this project and starting over again but using only the content of `wieting-ss` in the new `site/` directory might be wise.  I did it like this:

    ╭─mark@Marks-Mac-Mini ~/GitHub
    ╰─$ rm -fr static-cms-hugo-local-template
    ╭─mark@Marks-Mac-Mini ~/GitHub
    ╰─$ git clone https://github.com/Summitt-Services/static-cms-hugo-local-template.git
    Cloning into 'static-cms-hugo-local-template'...
    remote: Enumerating objects: 574, done.
    remote: Counting objects: 100% (155/155), done.
    remote: Compressing objects: 100% (50/50), done.
    remote: Total 574 (delta 122), reused 125 (delta 102), pack-reused 419
    Receiving objects: 100% (574/574), 22.14 MiB | 23.94 MiB/s, done.
    Resolving deltas: 100% (248/248), done.
    ╭─mark@Marks-Mac-Mini ~/GitHub
    ╰─$ cd static-cms-hugo-local-template
    ╭─mark@Marks-Mac-Mini ~/GitHub/static-cms-hugo-local-template ‹main›
    ╰─$ cp -fr site/static/admin ~
    ╭─mark@Marks-Mac-Mini ~/GitHub/static-cms-hugo-local-template ‹main›
    ╰─$ rm -fr site
    ╭─mark@Marks-Mac-Mini ~/GitHub/static-cms-hugo-local-template ‹main*›
    ╰─$ mkdir site
    ╭─mark@Marks-Mac-Mini ~/GitHub/static-cms-hugo-local-template ‹main*›
    ╰─$ cp -fr ../wieting-ss/. site/.
    ╭─mark@Marks-Mac-Mini ~/GitHub/static-cms-hugo-local-template ‹main*›
    ╰─$ cp -f ~/admin/config.yml site/static/admin/.
    

Next I launched the proxy server like so:

    ╭─mark@Marks-Mac-Mini ~/GitHub/static-cms-hugo-local-template ‹main*›
    ╰─$ npx @staticcms/proxy-server
    info: Static CMS File System Proxy Server configured with /Users/mark/GitHub/static-cms-hugo-local-template
    info: Static CMS Proxy Server listening on port 8082
    

Then in my *VSCode* terminal this:

    ╭─mark@Marks-Mac-Mini ~/GitHub/static-cms-hugo-local-template ‹main*› 
    ╰─$ npm start
    
    > static-cms-hugo-netlify-template@1.0.0 start
    > run-p start:**
    
    
    > static-cms-hugo-netlify-template@1.0.0 start:webpack
    > webpack-dev-server --config webpack.dev.js --hot --stats-error-details
    
    
    > static-cms-hugo-netlify-template@1.0.0 start:hugo
    > hugo -d ../dist -s site -vw
    
    WARN  --verbose was deprecated in Hugo v0.114.0 and will be removed in a future release. use --logLevel info
    Start building sites … 
    hugo v0.120.1-16fb2cae88eb6add7d12e9fbfcf01d8670e60a35 darwin/amd64 BuildDate=2023-10-30T16:44:31Z VendorInfo=gohugoio
    
    INFO  copy static: syncing static files to /
    INFO  build: running step process duration 3.193622ms
    INFO  build: running step assemble duration 25.748629ms
    WARN  found no layout file for "json" for kind "section": You should create a template file which matches Hugo Layouts Lookup Rules for this combination.
    INFO  build: running step render duration 70.992512ms
    INFO  build: running step postProcess duration 9.94µs
    <i> [webpack-dev-server] Project is running at:
    <i> [webpack-dev-server] Loopback: http://localhost:3000/
    <i> [webpack-dev-server] On Your Network (IPv4): http://192.168.0.183:3000/
    <i> [webpack-dev-server] On Your Network (IPv6): http://[fe80::1]:3000/
    <i> [webpack-dev-server] Content not from webpack is served from '/Users/mark/GitHub/static-cms-hugo-local-template/dist' directory
    <i> [webpack-dev-server] 404s will fallback to '/index.html'
    
                       | EN   
    -------------------+------
      Pages            |  57  
      Paginator pages  |   0  
      Non-page files   |   0  
      Static files     | 499  
      Processed images |   0  
      Aliases          |   1  
      Sitemaps         |   1  
      Cleaned          |   0  
    
    Built in 1034 ms
    Watching for changes in /Users/mark/GitHub/static-cms-hugo-local-template/site/{archetypes,content,layouts,package.json,static,themes}
    Watching for config changes in /Users/mark/GitHub/static-cms-hugo-local-template/site/config/_default
    Press Ctrl+C to stop
    <i> [webpack-dev-middleware] wait until bundle finished: /
    assets by path *.js 18.3 MiB
      asset cms.js 18 MiB [emitted] (name: cms)
      asset main.js 300 KiB [emitted] (name: main)
    asset main.css 113 KiB [emitted] (name: main)
    asset admin/index.html 521 bytes [emitted]
    asset fonts/.keep 0 bytes [emitted] [from: src/fonts/.keep] [copied]
    Entrypoint main 413 KiB = main.css 113 KiB main.js 300 KiB
    Entrypoint cms 18 MiB = cms.js
    runtime modules 72.3 KiB 38 modules
    modules by path ./node_modules/ 16.9 MiB 82 modules
    modules by path ./src/ 133 KiB (javascript) 113 KiB (css/mini-extract)
      modules by path ./src/js/ 15.2 KiB 9 modules
      modules by path ./src/css/*.scss 118 KiB (javascript) 113 KiB (css/mini-extract)
        ./src/css/main.scss 2.78 KiB [built] [code generated]
        ./node_modules/to-string-loader/src/to-string.js!./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/css/main.scss 429 bytes [built] [code generated]
        ./node_modules/mini-css-extract-plugin/dist/loader.js??ruleSet[1].rules[2].use[1]!./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/css/main.scss 332 bytes [built] [code generated]
        + 2 modules
      ./src/index.js 124 bytes [built] [code generated]
    asset modules 5.46 KiB
      data:image/png;base64,iVBORw0KGgoAAAAN.. 1.28 KiB [built] [code generated] [build time executed]
      data:image/png;base64,iVBORw0KGgoAAAAN.. 1.33 KiB [built] [code generated] [build time executed]
      data:image/jpeg;base64,/9j/4QAYRXhpZgAA.. 1.55 KiB [built] [code generated] [build time executed]
      data:image/png;base64,iVBORw0KGgoAAAAN.. 1.3 KiB [built] [code generated] [build time executed]
    webpack 5.89.0 compiled successfully in 6771 ms
    

Again, it works.  Only this time the Wieting website appears at [http://localhost:3000](http://localhost:3000) and [http://localhost:3000/admin](http://localhost:3000/admin) works too, but with the wrong configuration.  Still, that's a WIN!

## Time To Save My Progress

I really don't want to dump 4000+ new files, many of them specific to the Wieting website, into my pristine (and working) [https://github.com/Summitt-Services/static-cms-hugo-local-template](https://github.com/Summitt-Services/static-cms-hugo-local-template) GitHub repository.  So, I'm going to clean up my local project by removing that which is no longer needed, and then I'm going to remove the `.git` directory and create/populate a new [wieting-staticCMS](https://github.com/SummittDweller/wieting-staticCMS) private repository.  After creating that empty repository the process looked like this:

    ╭─mark@Marks-Mac-Mini ~/GitHub/static-cms-hugo-local-template ‹main*› 
    ╰─$ rm -fr site/.git 
    ╭─mark@Marks-Mac-Mini ~/GitHub/static-cms-hugo-local-template ‹main*› 
    ╰─$ rm -fr .git
    ╭─mark@Marks-Mac-Mini ~/GitHub/static-cms-hugo-local-template 
    ╰─$ git init
    Initialized empty Git repository in /Users/mark/GitHub/static-cms-hugo-local-template/.git/
    ╭─mark@Marks-Mac-Mini ~/GitHub/static-cms-hugo-local-template 
    ╰─$ git add .
    ╭─mark@Marks-Mac-Mini ~/GitHub/static-cms-hugo-local-template 
    ╰─$ git commit -m "first commit"
    ╭─mark@Marks-Mac-Mini ~/GitHub/static-cms-hugo-local-template 
    ╰─$ git branch -M main
    ╭─mark@Marks-Mac-Mini ~/GitHub/static-cms-hugo-local-template 
    ╰─$ git remote add origin https://github.com/SummittDweller/wieting-staticCMS.git
    ╭─mark@Marks-Mac-Mini ~/GitHub/static-cms-hugo-local-template 
    ╰─$ git push -u origin main
    ...
    Enumerating objects: 2979, done.
    Counting objects: 100% (2979/2979), done.
    Delta compression using up to 6 threads
    Compressing objects: 100% (2855/2855), done.
    Writing objects: 100% (2979/2979), 95.87 MiB | 2.65 MiB/s, done.
    Total 2979 (delta 638), reused 0 (delta 0), pack-reused 0
    remote: Resolving deltas: 100% (638/638), done.
    To https://github.com/SummittDweller/wieting-staticCMS.git
     * [new branch]      main -> main
    branch 'main' set up to track 'origin/main'.
    

# wieting-staticCMS

With the new GitHub repo in place let's take it for a local spin.

    ╭─mark@Marks-Mac-Mini ~/GitHub
    ╰─$ git clone https://github.com/SummittDweller/wieting-staticCMS.git
    Cloning into 'wieting-staticCMS'...
    remote: Enumerating objects: 2979, done.
    remote: Total 2979 (delta 0), reused 0 (delta 0), pack-reused 2979
    Receiving objects: 100% (2979/2979), 95.87 MiB | 26.77 MiB/s, done.
    Resolving deltas: 100% (638/638), done.
    Updating files: 100% (4834/4834), done.
    ╭─mark@Marks-Mac-Mini ~/GitHub
    ╰─$ cd wieting-staticCMS
    ╭─mark@Marks-Mac-Mini ~/GitHub/wieting-staticCMS ‹main›
    ╰─$ npm install
    npm WARN deprecated querystring@0.2.0: The querystring API is considered Legacy. new code should use the URLSearchParams API instead.
    
    added 1567 packages, and audited 1568 packages in 1m
    
    426 packages are looking for funding
      run `npm fund` for details
    
    2 moderate severity vulnerabilities
    
    To address all issues, run:
      npm audit fix
    
    Run `npm audit` for details.
    ╭─mark@Marks-Mac-Mini ~/GitHub/wieting-staticCMS ‹main›
    ╰─$ npx @staticcms/proxy-server
    info: Static CMS File System Proxy Server configured with /Users/mark/GitHub/wieting-staticCMS
    info: Static CMS Proxy Server listening on port 8082
    

Then, in a differnt terminal window...

    ╭─mark@Marks-Mac-Mini ~/GitHub/wieting-staticCMS ‹main›
    ╰─$ npm start
    
    > static-cms-hugo-netlify-template@1.0.0 start
    > run-p start:**
    
    
    > static-cms-hugo-netlify-template@1.0.0 start:hugo
    > hugo -d ../dist -s site -vw
    
    
    > static-cms-hugo-netlify-template@1.0.0 start:webpack
    > webpack-dev-server --config webpack.dev.js --hot --stats-error-details
    
    WARN  --verbose was deprecated in Hugo v0.114.0 and will be removed in a future release. use --logLevel info
    Start building sites …
    hugo v0.120.1-16fb2cae88eb6add7d12e9fbfcf01d8670e60a35 darwin/amd64 BuildDate=2023-10-30T16:44:31Z VendorInfo=gohugoio
    
    INFO  copy static: syncing static files to /
    INFO  build: running step process duration 3.975463ms
    INFO  build: running step assemble duration 19.211854ms
    WARN  found no layout file for "json" for kind "section": You should create a template file which matches Hugo Layouts Lookup Rules for this combination.
    INFO  build: running step render duration 54.091014ms
    INFO  build: running step postProcess duration 8.597µs
    
                       | EN
    -------------------+------
      Pages            |  57
      Paginator pages  |   0
      Non-page files   |   0
      Static files     | 499
      Processed images |   0
      Aliases          |   1
      Sitemaps         |   1
      Cleaned          |   0
    
    Built in 717 ms
    Watching for changes in /Users/mark/GitHub/wieting-staticCMS/site/{archetypes,content,layouts,package.json,static,themes}
    Watching for config changes in /Users/mark/GitHub/wieting-staticCMS/site/config/_default
    Press Ctrl+C to stop
    <i> [webpack-dev-server] Project is running at:
    <i> [webpack-dev-server] Loopback: http://localhost:3000/
    <i> [webpack-dev-server] On Your Network (IPv4): http://192.168.0.183:3000/
    <i> [webpack-dev-server] On Your Network (IPv6): http://[fe80::1]:3000/
    <i> [webpack-dev-server] Content not from webpack is served from '/Users/mark/GitHub/wieting-staticCMS/dist' directory
    <i> [webpack-dev-server] 404s will fallback to '/index.html'
    <i> [webpack-dev-middleware] wait until bundle finished: /
    assets by path *.js 18.3 MiB
      asset cms.js 18 MiB [emitted] (name: cms)
      asset main.js 300 KiB [emitted] (name: main)
    asset main.css 113 KiB [emitted] (name: main)
    asset admin/index.html 521 bytes [emitted]
    asset fonts/.keep 0 bytes [emitted] [from: src/fonts/.keep] [copied]
    Entrypoint main 413 KiB = main.css 113 KiB main.js 300 KiB
    Entrypoint cms 18 MiB = cms.js
    runtime modules 72.3 KiB 38 modules
    modules by path ./node_modules/ 16.9 MiB 82 modules
    modules by path ./src/ 133 KiB (javascript) 113 KiB (css/mini-extract)
      modules by path ./src/js/ 15.2 KiB 9 modules
      modules by path ./src/css/*.scss 118 KiB (javascript) 113 KiB (css/mini-extract)
        ./src/css/main.scss 2.78 KiB [built] [code generated]
        ./node_modules/to-string-loader/src/to-string.js!./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/css/main.scss 429 bytes [built] [code generated]
        ./node_modules/mini-css-extract-plugin/dist/loader.js??ruleSet[1].rules[2].use[1]!./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/css/main.scss 332 bytes [built] [code generated]
        + 2 modules
      ./src/index.js 124 bytes [built] [code generated]
    asset modules 5.46 KiB
      data:image/png;base64,iVBORw0KGgoAAAAN.. 1.28 KiB [built] [code generated] [build time executed]
      data:image/png;base64,iVBORw0KGgoAAAAN.. 1.33 KiB [built] [code generated] [build time executed]
      data:image/jpeg;base64,/9j/4QAYRXhpZgAA.. 1.55 KiB [built] [code generated] [build time executed]
      data:image/png;base64,iVBORw0KGgoAAAAN.. 1.3 KiB [built] [code generated] [build time executed]
    webpack 5.89.0 compiled successfully in 6051 ms
    

And again, **IT WORKS!**

Time to merge the old CMS config from `site/static/.admin-netlify/config.yml` into the new config at `site/static/admin/config.yml`.   Then a few changes will be needed since the site's content structure has changed somewhat from the old days.  
