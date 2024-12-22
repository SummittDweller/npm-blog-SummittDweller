---
title: A Pagefind Problem?
slug: a-pagefind-problem
date: 2023-05-10T14:33:09.000Z
date_updated: 2023-05-19T21:05:02.000Z
tags: 
    - Development
    - Azure
    - DigitalOcean
    - Hugo
hero_image: /images/Z3Cf5V-photo-1561470508-fd4df1ed90b2.jpg
---

# Not Just a Hugo Issue

Take note of the question mark at the end of the title, otherwise it could be somewhat misleading.  This is not really a problem with Hugo, but one with cloud deployment of Hugo static apps, particularly as an Azure Static Web App.

# The Nutshell

As you may know from [post 143](https://static.grinnell.edu/dlad-blog/posts/143-significant-rootstalk-retooling/), I have successfully installed and configured [Pagefind](https://pagefind.app/) in [Rootstalk](https://rootstalk.grinnell.edu), but thus far it only works locally.  When I try to deploy Pagefind to the cloud, specifically as an Azure Static Web App, I can't make it work because there's no apparent way to invoke the necessary `npx pagefind...` command AFTER Hugo compiles the site, but BEFORE the site gets deployed.  Azure leverages GitHub Actions to build Hugo sites, but that process also involves some custom/proprietary Azure scripts.  Therein lies the problem.

The Azure script auto-detects the presence of a Hugo project, or any one of many other platforms.  That makes the process super-easy to use, but nearly impossible to "customize".  Azure does provide some configuration variables to influence the script behavior, most notably there's an `app_build_command` variable that looks promising, but it only works for `node` builds, and not for Hugo.

# Three Possible Solutions

I can reasonably see three possible solutions to this dilema.  In order of simplicity they are:

## 1. Skip Azure and Deploy Only to DigitalOcean

Ultimately, Rootstalk's production instance is a DigitalOcean (DO) static web app, Azure is only used for "staging" of a locally viable Rootstalk instance.  DO doesn't use GitHub Actions, a drawback in my book, so its build script, called an "App Spec" in DO, is a little more "open".  The critical portion of the App Spec I use to deploy Rootstalk in DO reads like this:

    static_sites:
    - build_command: hugo -d public
    

That's it, just a simple `hugo -d public` command.  So, in theory I should be able to just change that to read:

    static_sites:
    - build_command: hugo -d public && npm_config_yes=true npx pagefind --source "public" --bundle-dir ../static/_pagefind
    

It's basically just a "compound" command to run `npx` immediately after `hugo` is done compiling.

The problem with this very simple solution, assuming it even works, is that it's somewhat unique to Rootstalk which is already deployed to DigitalOcean.  Other Hugo projects, and I have many like [this blog](https://static.grinnell.edu/dlad-blog), that need Azure or another cloud provider other than DO, would not benefit from this fix.

### Update 12-May-2023: Same Problem Exists in DigitalOcean

Well, I tried.  I attempted to push my Pagefind additions to Rootstalk forward directly into production on DigitalOcean.  Unfortunately, that failed in similar fashion to what I saw in Azure.  It all works locally, but DigitalOcean, like Azure, has no way of "detecting" that my Hugo project has an NPM component, and therefore takes no steps to build NPM or Pagefind into my solution.

So, I'm moving on to option #2 below.  Wish me luck.

## 2. Wrap Hugo in `npm`

So, `node` and `npm` seem to be all the rage these days, and perhaps for good reason.  I recently fell in love with [Eleventy/11ty](https://www.11ty.dev) because it's Javascript, not Go, and it's elegantly simple with tons of flexibility.  If my Azure Static Web App was framed in `node.js`, as both *Eleventy* and *Pagefind* are, there would be no problem.  The Azure scripts used to deploy those frameworks are far more customizable than Hugo, and there's documentation to prove it.

So, how might I approach something like this?  Well, [A Powerful Blog Setup with Hugo and NPM](https://www.blogtrack.io/blog/powerful-blog-setup-with-hugo-and-npm/) by Tom Hombergs looks like a promising place to start.  The process that Tom advocates leverages a neat little package called [hugo-bin](https://www.npmjs.com/package/hugo-bin).

If strategy #1 fails I'll certainly give this #2 a try.  Even if #1 works, I might give this strategy a spin if/when I re-tool [this blog](https://static.grinnell.edu/dlad-blog).

## Update 29-May-2023: NPM is GREAT!

Since my first option (above) failed very quickly, I moved on to this option and I honestly think I might transition every static site that I have to be wrapped inside NPM, it works wonderfully and is a really attractive solution for so many ills!

I'm going to document my experience with NPM wrapped around Hugo and will post that document here soon, probably as [Wrap EVERYTHING in NPM!](https://blog.summittdweller.com/wrap-everything-in-npm/).

## 3. Transition from Hugo to Eleventy

Reasonable?  Yes.  A lot of work?  That's relative.  The right thing to do?  Probably.

So, it's already been done, see [This Blog in Eleventy + Ghost](https://blog.summittdweller.com/this-blog-in-eleventy-ghost/) and [Searching for a Search Solution](https://blog.summittdweller.com/glad-i-found-pagefind/).  That's all I'm going to say about this option, a definite maybe.

---

That's all folks... for now.
