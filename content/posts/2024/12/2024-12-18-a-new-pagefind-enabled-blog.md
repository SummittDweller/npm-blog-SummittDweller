---
title: A New Pagefind Enabled Blog!
slug: new-pagefind-enabled-blog
# weight: -20241218
date: 2024-12-18T08:31:49-06:00
date_updated: 2024-12-18T08:31:57-06:00
tags: 
  - Azure
  - Development
  - Hugo
  - npm
  - Pagefind
hero_image: https://summittservices.blob.core.windows.net/summitt-dweller-blog/images/search-6821469_640.jpg
---

So, `node` and `npm` are maybe not "all the rage" these days, but they do the job nicely for me.

So, how might I **ONCE AGAIN** approach combining Hugo with Pagefind in the cloud?  Well, [A Powerful Blog Setup with Hugo and NPM](https://web.archive.org/web/20220818082611/https://www.blogtrack.io/blog/powerful-blog-setup-with-hugo-and-npm/)* by Tom Hombergs looked like a promising place to start.  The process that Tom advocates leverages a neat little package called [hugo-bin](https://www.npmjs.com/package/hugo-bin).

**The links provided above and below are to a Wayback Machine capture of the original post.*

# That Was Too Easy!

Wrapping this Hugo blog site in an NPM package was so easy that I forgot to document it... and maybe I really didn't need too.  Time to catch up, so here's a brief sysnopsis of what I did...

## Following Tom's Excellent Advice

I started by studying [A Powerful Blog Setup with Hugo and NPM](https://web.archive.org/web/20220818082611/https://www.blogtrack.io/blog/powerful-blog-setup-with-hugo-and-npm/) and quickly found that I could easily follow it almost verbatim.  Since I already had `npm` and `Hugo` installed I skipped ahead to the section titled "Setting Up a Hugo Project" and then to the `npx` and `git` commands there.  My experience, mostly in commands, looked like this on my Mac Mini workstation.

    cd ~/GitHub/
    # Named the new project npm-blog-sd so it would not confilct with any of my existing `blog...` directories
    mkdir npm-blog-sd
    cd npm-blog-sd
    npx hugo new site . --force
    # Copied the contents of my old project into the new one and then removed whatever I no longer needed
    cp -fr ~/GitHub/blog-sd/. .  
    # Installed Pagefind...
    npm install pagefind
    git init
    # I created a new empty repo in GitHub called npm-blog-sd, then...
    git remote add origin https://github.com/SummittDweller/npm-blog-sd 
    git add . 
    git commit -m "Initial commit of new npm-wrapped Hugo project"
    git push
    

Having secured a new repo I moved to running Hugo locally, then polishing my `package.json` scripts as Tom did.  I now have a `package.json` that reads like this:

```
{
  "name": "npm-blog-sd",
  "version": "1.0.0",
  "description": "My personal (SummittDweller) blog built with Hugo inside an NPM package.  December 2024.",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "npm run hugo:build && npx pagefind --site public",
    "do:build": "hugo -d public && npx pagefind --site public",
    "azure:build": "hugo -d public --baseURL=\"https://azure-static-web-apps-ashy-rock-0f18efc0f\" && npx pagefind --site public",
    "clean": "npm run hugo:clean",
    "serve": "npm run hugo:build && npx pagefind --site public --output-subdir ../static/_pagefind && npm run hugo:serve",
    "hugo:build": "hugo -d public",
    "hugo:serve": "hugo server",
    "hugo:clean": "rm -rf build resources public"
  },
  "author": "Mark A. McFate",
  "license": "ISC",
  "dependencies": {
    "hugo-bin": "^0.137.0",
    "pagefind": "^1.2.0"
  }
}
```

# It Works!

Now I just use `npm run serve` to build the Hugo site, index it with Pagefind, and serve it locally at [http://localhost:1313](http://localhost:1313).

# A Staging Site in Azure

I can simply push changes to the `main` branch of the `npm-blog-sd` repo to trigger an Azure (aka GitHub Actions) rebuild, indexing and deployment of the site to [this address](https://ashy-rock-0f18efc0f.4.azurestaticapps.net).

# Errors?

So, it took lots of trial-and-error to get the Azure configuration straight.  First there were issues with deployment tokens, so I rewound the project and got that fixed.  Then, since this blog uses SASS I needed to run the `extended` version of Hugo, or more specifically, `hugo-bin-extended`.   I fixed that, apparently, with the addition of...  

```
  "dependencies": {
    "hugo-bin-extended": "latest",
    "pagefind": "^1.2.0"
  }
```

...in `package.json`.  That `hugo-bin-extended` key replaced `hugo-bin` and I set the version to `latest`.   

## Last of the Errors?

The changes mentioned above left me with two deprecation errors...  

```
ERROR deprecated: site config key paginate was deprecated in Hugo v0.128.0 and will be removed in Hugo 0.141.0. Use pagination.pagerSize instead.
WARN  Raw HTML omitted while rendering "/github/workspace/content/about.md"; see https://gohugo.io/getting-started/configuration-markup/#rendererunsafe
You can suppress this warning by adding the following to your site configuration:
ignoreLogs = ['warning-goldmark-raw-html']
ERROR deprecated: .Site.Social was deprecated in Hugo v0.124.0 and will be removed in Hugo 0.141.0. Implement taxonomy 'social' or use .Site.Params.Social instead.
```

This [post](https://stackoverflow.com/a/5542964) was very helpful for working with my submodule theme!  

# Success!

Well, somewhat.  My site at https://ashy-rock-0f18efc0f.4.azurestaticapps.net/ is visible now, but the theme isn't right.  I suspect that is because my `hugo.yml` file still sets the `baseURL` to "https://blog.summittdweller.com" and we are not quite there yet.  Setting the `baseURL` to "https://ashy-rock-0f18efc0f.4.azurestaticapps.net/" and let's see what happens...  **Bingo!**   Now, I just need to add a search bar to expose the Pagefind results.   Done!

{{< attention-box "What follows is obsolete, it's from `npm-rootstalk`, and does NOT apply to this blog!" >}}

# A New Production Branch

Pushing to production is just as simple, I just have to push changes to the new `production` branch of the code and my app spec at DigitalOcean (see below) takes care of building, indexing, and deploying to [https://rootstalk.grinnell.edu](https://rootstalk.grinnell.edu).

That DO app spec reads like this:

    alerts:
    - rule: DEPLOYMENT_FAILED
    - rule: DOMAIN_FAILED
    domains:
    - domain: rootstalk.grinnell.edu
      type: PRIMARY
    - domain: prairiejournal.grinnell.edu
      type: ALIAS
    envs:
    - key: TZ
      scope: RUN_AND_BUILD_TIME
      value: America/Chicago
    - key: HUGO_MATOMO_ID
      scope: RUN_AND_BUILD_TIME
      value: "15"
    ingress:
      rules:
      - component:
          name: npm-rootstalk
        match:
          path:
            prefix: /
    name: npm-rootstalk
    region: nyc
    static_sites:
    - build_command: npm run build
      environment_slug: node-js
      github:
        branch: production
        deploy_on_push: true
        repo: Digital-Grinnell/npm-rootstalk
      name: npm-rootstalk
      source_dir: /
    

---

It's heavenly!  And that's all for now.
