---
title: Wrapping Hugo in NPM
slug: wrapping-hugo-in-npm
date: 2023-05-09T23:13:09.000Z
date_updated: 2023-05-10T14:56:55.000Z
weight: -20230509
tags:
  - Development
  - Azure
  - DigitalOcean
  - Hugo
---

I ran into a big road block with implementation of Pagefind in *Rootstalk* today... everything works fine in development, but I can't easily deploy to *Azure* because there's no way to "inject" Pagefind into an Azure Static Web App build before the "public" content gets deployed.  I can generate the Pagefind parts after deployment, but that does me no good.

Tomorrow I need to have a look at my *Rootstalk* DigitalOcean deployment to see if what I already have might work there (DO uses a build script that I can add an `npx...` command to).  If that fails I need to look back at [https://www.blogtrack.io/blog/powerful-blog-setup-with-hugo-and-npm/](https://www.blogtrack.io/blog/powerful-blog-setup-with-hugo-and-npm/) to see if there's a solution there for me.

-/-/-/

location: Toledo, IA
