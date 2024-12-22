---
title: Reduce Spaces Stored Image Sizes
slug: reduce-azure-stored-image-sizes
date: 2023-04-16T13:28:11.000Z
date_updated: 2023-04-16T19:40:37.000Z
weight: -20230416
tags: 
  - Development
---

Ok, I get the sense that constantly pulling enormous digital images from *DigitalOcean Spaces* to rebuild this blog is unnecessarily chewing up lots of bandwidth.  Today I'd like to begin fixing that by creating a utility, probably in *Python*, to grab all those images one-by-one, make a smaller copy of each, and put those copies back into a `web-ready` subdirectory in *Spaces*, or something like that.

There's a wealth of probably pertinent information to be had in [https://docs.digitalocean.com/reference/api/spaces-api/](https://docs.digitalocean.com/reference/api/spaces-api/).  Unfortunately, *Spaces* isn't compatible with DO's own command line utility, [doctl](https://github.com/digitalocean/doctl), but it is compatible with [s3cmd](https://docs.digitalocean.com/products/spaces/reference/s3cmd/) and the link I've provided documents how to get started with that.  🙂

**Update:** See [Engaging `s3cmd` to Download and Resize Images from DO Spaces](https://blog.summittdweller.com/engaging-s3cmd-to-download-and-resize-images-from-do-spaces/) for my solution.
