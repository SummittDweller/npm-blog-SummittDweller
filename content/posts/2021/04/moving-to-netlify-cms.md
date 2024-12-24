---
title: Moving to Netlify CMS 
publishDate: 2021-04-04T20:14:08-05:00
lastmod: 2021-06-06T15:07:01-05:00
location: Toledo, IA
# weight: "-20210404"
draft: false
description: Moving my new Netlify CMS configuration to Netlify
# Enter comma separated values.
tags:
  - Netlify
  - CMS
  - migration
---

In my last post, [Adding _Netlify CMS_ for Editing This Blog](posts/2021/03/adding-netlify-to-this-blog/), I was able to successfully engage the [_Netlify CMS_](https://www.netlifycms.org/) with a "local" copy of this blog.  But I never got the CMS to work in production with this blog's App on [_DigitalOcean_](https://www.digitalocean.com/) (_DO_). I should note that _DO_'s support folks were very helpful, but in the end I think all of the client-side stuff that _Netlify CMS_ is doing was more than they were willing (capable?) of helping me overcome. That's probably my fault more than their's; client-side isn't my strong suit.

In the week since then I have, however, been able to stand up a new working copy of the [_Wieting Theatre_ website](https://wieting.Tama-Toledo.com) on [_Netlify.com_](https://www.netlify.com/), where it enjoys the same kind of automated builds and automatic deployment that I previously found at _DO_.  The big difference, at Netlify.com my _Netlify CMS_ depoloyment works locally AND in production, giving me the ability to allow content editors, even those who don't have a _Netlify.com_ or _GitHub_ account, to do what they do best, edit their content.

## The _Wieting Theatre_'s New Site, and the _CRB_

So this post started as a brain dump, chronicling how I got [https://Wieting.Tama-Toledo.com](https://Wieting.Tama-Toledo.com) to work.  But, instead of hashing out how I "did" it, I'm going to show you how I'm doing something similar, for a site that features the _Compass Rose Band_, or _CRB_, my brother-in-law's band out of Cedar Rapids, Iowa.

## Netlify Identity

I think the real key to all of this is a _Netlify.com_ agent called [_Netlify Identity_](https://docs.netlify.com/visitor-access/identity/). From the _Netlify.com_ site and documentation... 

{{% original %}}
_Netlify Identity_ service brings a full suite of authentication functionality, backed by the _GoTrue_ API. This allows you to manage and authenticate users on your site or app, without requiring them to be users of _Netlify_ or any other service. You can use this for gated content, site administration, and more.
{{% /original %}}

In theory, _Netlify Identity_ can be deployed anywhere, but in practice, setting it up can be quite tricky (at least it was for me).  That's where _Netlify.com_ shines, and that's understandable since they created both _Netlify CMS_ and _Netlify Identity_. The two creations play well together, and make life easier for a devops like me. Well played indeed.

If you read my previous post you know that in a [_Hugo_](https://gohugo.io) site, like this one, the `./static/admin/config.yml` file holds all of your CMS info.  If you host content on _Netlify.com_ with _Netlify CMS_ and _Netlify Identity_ engaged, all you really need in that config file is something like this:

```
backend:
  name: git-gateway
  branch: main
...
```

The rest of the CMS "magic" takes place in a server-side access manager that you can find at your _Netlify.com_ site folder at `https://app.netlify.com/sites/[site-name]/identity`.  The client-side of the access/identity equation can be handled with an app template, and you can choose from many starter templates found at [Start with a Template](https://www.netlifycms.org/docs/start-with-a-template).  

### External OAuth without _Netlify.com_

If you wish to proceed without using _Netlify.com_ as your host, you'll find a number of options at [External OAuth Client](https://www.netlifycms.org/docs/external-oauth-clients/). Beware, this option isn't for a server-side guy like me, and the _Netlify.com_ option is quick, easy, and cheap... at least I think so.  

## Building a New _Compass Rose Band_ Site on _Netlify.com_

Rather than rehashing the story of my _Wieting Theatre_ migration to _Netlify.com_, I'm going to repeat that process and capture the journey while migrating our existing _Compass Rose Band_ site from _DO_.

### Using _Netlify.com_ and `one-click-hugo-cms`

From the [Start with a Template](https://www.netlifycms.org/docs/start-with-a-template) I clicked the `Deploy to Netlify` button under the 'Hugo Site Starter' option. This was super easy since _Netlify.com_ already knows me... because I created a free account about a week ago. That selection took me to a screen where I was asked to identify a new _Github_ repostory. Again, super easy because I had already logged in to _Github_ earlier.

The default name for this new repository is `one-click-hugo-cms`, same as the template repository it will be built from. I choose to name my new repo `compass-rose-band-one-click`, for obvious reasons. That repository can be found at https://github.com/SummittDweller/compass-rose-band-one-click where the `README.md` file is titled "Hugo template for Netlify CMS with Netlify Identity". The initial repository contents looked like this:

![one-click-hugo-cms](/img/one-click-hugo-cms.png)

### Replacing the `/site`

A default _Hugo_ site is automatically built and deployed for you as part of the one-click process, and _Netlify.com_ will supply an address so you can see your creation. But that's not the _Compass Rose Band_! No problem, I found it quick and easy to replace the default template site by first cloning my new repo to my workstation, and replacing the `/site` directory with my own contents.  It went like this...

  - `cd ~/GitHub`  :left_arrow: This is where I keep local copies of all my GitHub projects.
  - `git clone https://github.com/SummittDweller/compass-rose-band-one-click`
  - `cd compass-rose-band-one-click`
  - `git branch -m master main`  :left_arrow: Optional step, changes my local branch name to 'main'.
  - `rm -fr site/*`  :left_arrow: Remove the template site, the contents of `/site`.
  - `cp -fr ~/GitHub/compass-rose-band/* site/.`  :left_arrow: Copy my local CRB site<sup>*</sup> to `/site`.
  
<sup>*</sup>Note that copying in the manner excludes all . files and directories, so the `.git` folder is NOT copied. This is IMPORTANT!

At this point, your old site has a new home in `./site` so if you navigate there and do `hugo server` you should see a local instance of the site.  Like so...

  - `cd site`
  - `hugo server`
  - Visit `localhost:1313`, or whatever localhost site is indicated, to see your site.
  
### Pushing the Site to _Github_

So, now your _Netlify.com_ project lives in a directory like my `~/GitHub/compass-rose-band-one-click`, and the corresponding _Hugo_ site contents are in the `./site` folder there. To deploy this new copy of your site to _Netlify.com_ simply do like this...

  - `cd ~/GitHub/compass-rose-band-one-click`
  - `git add .`
  - `git commit -m "Now with CRB site contents in ./site"`
  - `git push -u origin main`
   
### Deploying the Site on _Netlify.com_
  
By default, pushing your changes to _Github_ will automatically deploy them to your _Netlify.com_ site, but you pushed to `main`, not `master`, so no synchornization is likely. But that's easy to fix.  

Navigate your browser to your _Netlify.com_ "team" page, find your new project there, and click on `Site Settings`. Next you'll see options for things like changing the name of your project and site.  I changed mine to `compass-rose-band-one-click` to match my _Github_ repo name.  

Visit the `Build & Deploy` link in the menu on the left side of the page, find the `Deploy contexts` info and click `Edit settings` there so you can change the production branch setting from `master` to `main`.  Leave the default setting of "Any pull request against your production branch / branch deploy branches" selected.

Next, visit the "Deploys" page in your _Netlify.com_ project page at `https://app.netlify.com/sites/[project-name]/deploys`, mine is https://app.netlify.com/sites/compass-rose-band-one-click/deploys, and click the `Trigger deploy` button there.  You should then see a log of the deployment as it runs, and this time it should target your new `main` branch with your updated `./site` contents.

If successful you should see a screen featuring a block like this one:

![Successfuly deployed on _Netlify.com_](/img/netlify-preview-deploy.png)

Click on the `Preview deploy ⬈` link and voilà, your site!

## Now..._Netlify CMS_
 
It's getting late on this Sunday night so I'll share the first few lines from the latest copy of my new project's `./site/static/admin/config.yml` file for _Netlify CMS_.

```
backend:
  name: git-gateway
  branch: main

## To make local_backend mode work you must run 'npx netlify-cms-proxy-server' in its own terminal window
##   from the project root.  See https://www.netlifycms.org/docs/beta-features/ for details.
local_backend: true

media_folder: site/static/img    
public_folder: /img
...
```

### What's All That?

I'm back, as promised, and you're probably asking what all that stuff in the `config.yml` file is doing? Well, as mentioned earlier, the simple `backend:` section (first three lines) links the CMS to the `main` branch of our new _Github_ project.  The rest isn't required, unless you also want to use the CMS on a local clone of the project, like when making mass edits locally.

Let me try to explain. 

### `local_backend:` A _Netlify CMS_ Beta Feature 

If you visit the _Netlify CMS_' [Beta Features!](https://www.netlifycms.org/docs/beta-features/) pages you'll see `local_backend` mentioned near the very top. [_Note that as a beta feature this information is bound to move at some point._] That feature enables configuration of an option to make the CMS avaialble when working locally on a cloned, presumably, copy of the _Github_ repository.  The beta documentation mentions running `npx netlify-cms-proxy-server` as part of the process.

### A Local Problem with `./site`?  No, Not Really

So, in the local clone of my new _Compass Rose Band_ one-click _Hugo_ website, the "one-click" _Netlify CMS_ parts live in the project's root directory, and the _Hugo_ site lives just "below" it in `./site`.  Accordingly my `media_folder:` setting shown above includes the `site/` prefix, and the same is true of all the `config.yml` keys that end in `folder:`.  This is correct for production, and it also works with a local clone IF I launch things correctly!

_Hugo_ and the `hugo server` command that I need to preview local changes demands that I either `cd site` before I run it, or override the command's path by specifying `hugo server -s site`.  Only this 2nd approach works!  

So the process that's needed for local development and testing, including _Netlify CMS_ looks like this for me:

  - If I don't yet have the project locally I will begin with...
    `cd ~/GitHub; git clone --recursive https://github.com/SummittDweller/compass-rose-band-one-click; cd compass-rose-band-one-click`
  - If I already have a local clone I'll do this...
    `cd ~/GitHub/compass-rose-band-one-click; git pull`
  
From here on out there's just one process, like so...
  - `npx netlify-cms-proxy-server`   :left_arrow: In a new terminal window. See next section of this post.
  - `atom .`  :left_arrow: Launch _Atom_ in the working directory.
  - `hugo server -s site`  :left_arrow: **Important:** Don't forget the `-s site` option!
  - Create and edit files as needed. Changes should be immediately visible in `http://localhost:1313`.  
  - To edit or create content using _Netlify CMS_, just visit `http://localhost:1313/admin/`.
  - When all changes are complete...  
    - `git add .`
    - `git commit -m "a brief message here"`
    - `git push`
      
### Requires _npx_, Part of _Node.js_

The `npx` command mentioned above requires that _npx_ be installed, and it's part of _Node.js_.  To make it run properly I followed guidance from [https://treehouse.github.io/installation-guides/mac/node-mac.html](https://treehouse.github.io/installation-guides/mac/node-mac.html) to ensure both were installed.  In at least one instance I also had to run `brew upgrade node` and `npm i -g npx` to ensure that _Node.js_ was up-to-date, and that _npx_ was available as needed.  
  
The `npx netlify-cms-proxy-server`, loads and runs the _netlify-cms-proxy-server_ script, and in doing so it will tie up your terminal window.  So, it's best to **do this in a separate terminal window!**  Don't put the command in the background (using a `&` flag at the end) as this won't allow you to see if the command is working properly. When you run this command you should see some feedback from the script indicating what it is doing. The script binds to your working directory then effectively routes all _Netlify CMS_ actions, performed in this instance via `http://localhost:1313/admin/`, to the local _git_ repo there.  
  
## Ok, Now We Need a Proper Domain

So, in its original form the _Compass Rose Band_ site is aliased to three different domains:

  - https://compassroseband.net,
  - https://thecompassroseband.com, and
  - https://thecompassroseband.net

I choose to try migrating these domains to the new _Netlify.com_ site one-at-a-time, starting with the least-used domain, _thecompassroseband.net_.  

To do this I started by visiting my _Netlify.com_ account/team and the `Domains` menu, then my project-specific domain settings at [https://app.netlify.com/teams/summittdweller/dns/thecompassroseband.net](https://app.netlify.com/teams/summittdweller/dns/thecompassroseband.net).  In this page I'm given a list of 4 _Netlify.com_ name servers that I can use for this particular project.  I made note of the four before moving on.

Next step was to visit my registrar, _enom.com_, where I have a control screen for editing DNS records and name servers.  I set the name server values for _thecompassroseband.net_ there to the values that _Netlify.com_ provided. And then, we wait... for the changes to propogate.

Fortunately, _Netlify.com_ is on the ball... when I visit my new site's domain controls page, [https://app.netlify.com/sites/compass-rose-band-one-click/settings/domain](https://app.netlify.com/sites/compass-rose-band-one-click/settings/domain), I find a widget that looks like this:

![DNS Propogation](/img/netlify-dns-propogation.png)

The cog behind "Waiting on DNS propagation" is spinning while _Netlify.com_ waits for the transfer to happen.  So, I'm going to go for a walk and see what that cog looks like in an hour or two.

<hr/>

Clear as mud?  Give it a try, and hopefully it will begin to make sense.  Until next time...
