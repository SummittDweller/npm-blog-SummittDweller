---
title: Wrap EVERYTHING in NPM!
slug: wrap-everything-in-npm
date: 2023-05-19T22:27:00.000Z
date_updated: 2023-07-18T21:22:37.000Z
tags: 
  - Azure
  - Development
  - DigitalOcean
  - Work
hero_image: https://summittservices.blob.core.windows.net/summitt-dweller-blog/images/pexels-mikhail-nilov-8542562.jpg
---

So, `node` and `npm` seem to be all the rage these days, and perhaps for good reason.  I recently fell in love with [Eleventy/11ty](https://www.11ty.dev) over [Hugo](https://gohugo.io) because it's Javascript, not Go, and it's elegantly simple with tons of flexibility.  I recently tried to add *Pagefind* search to a Hugo static web site (see [https://static.grinnell.edu/dlad-blog/posts/143-significant-rootstalk-retooling/](https://static.grinnell.edu/dlad-blog/posts/143-significant-rootstalk-retooling/)).  If *Rootstalk*, an Azure Static Web App was framed in `node.js`, as both *Eleventy* and *Pagefind* are, there would be no problem.  The Azure scripts used to deploy those frameworks are far more customizable than Hugo, and there's documentation to prove it.

So, how might I approach combining Hugo with Pagefind in the cloud?  Well, [A Powerful Blog Setup with Hugo and NPM](https://web.archive.org/web/20220818082611/https://www.blogtrack.io/blog/powerful-blog-setup-with-hugo-and-npm/)* by Tom Hombergs looked like a promising place to start.  The process that Tom advocates leverages a neat little package called [hugo-bin](https://www.npmjs.com/package/hugo-bin).

**The links provided above and below are to a Wayback Machine capture of the original post.*

# That Was Too Easy!

Wrapping my Hugo site in an NPM package was so easy that I forgot to document it... and maybe I really didn't need too.  Time to catch up, so here's a brief sysnopsis of what I did...

## Following Tom's Excellent Advice

I started by studying [A Powerful Blog Setup with Hugo and NPM](https://web.archive.org/web/20220818082611/https://www.blogtrack.io/blog/powerful-blog-setup-with-hugo-and-npm/) and quickly found that I could easily follow it almost verbatim.  Since I already had `npm` and `Hugo` installed I skipped ahead to the section titled "Setting Up a Hugo Project" and then to the `npx` and `git` commands there.  My experience, mostly in commands, looked like this on my Mac Mini workstation.

    cd ~/GitHub/
    # Named the new project npm-rootstalk so it would not confilct with any of my existing `rootstalk...` directories
    mkdir npm-rootstalk      
    cd npm-rootstalk
    npx hugo new site . --force
    # Copied the contents of my old project into the new one and then removed whatever I no longer needed
    cp -fr ~/GitHub/rootstalk/. .  
    # Installed Pagefind...
    npm install pagefind
    git init
    # I created a new empty repo in GitHub called npm-rootstalk, then...
    git remote add origin https://github.com/Digital-Grinnell/npm-rootstalk 
    git add . 
    git commit -m "Initial commit of new npm-wrapped Hugo project"
    git push
    

Having secured a new repo I moved to running Hugo locally, then polishing my `package.json` scripts as Tom did.  I now have a `package.json` that reads like this:

    {
      "name": "npm-rootstalk",
      "version": "1.0.0",
      "description": "Rootstalk website built with Hugo and the Lightbi theme inside an NPM package.  May 2023.",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "npm run hugo:build && npx pagefind --source public",
        "do:build": "hugo -d public && npx pagefind --source public",
        "azure:build": "hugo -d public --baseURL=\"https://yellow-wave-0e513e510.3.azurestaticapps.net/\" && npx pagefind --source public",
        "clean": "npm run hugo:clean",
        "serve": "npm run hugo:build && npx pagefind --source public --bundle-dir ../static/_pagefind && npm run hugo:serve",
        "hugo:build": "hugo -d public",
        "hugo:serve": "hugo server",
        "hugo:clean": "rm -rf build resources public"
      },
      "author": "Mark A. McFate",
      "license": "ISC",
      "dependencies": {
        "hugo-bin": "^0.102.0",
        "pagefind": "^0.12.0"
      }
    }
    

# It Works!

Now I just use `npm run serve` to build the Hugo site, index it with Pagefind, and serve it locally at [http://localhost:1313](http://localhost:1313).

# A Staging Site in Azure

I can simply push changes to the `main` branch of the `npm-rootstalk` repo to trigger an Azure (aka GitHub Actions) rebuild, indexing and deployment of the site to [this address](https://yellow-wave-0e513e510.3.azurestaticapps.net/).

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
