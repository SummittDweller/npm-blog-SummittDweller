---
title: Gating My Content
publishDate: 2023-01-30T14:45:01-06:00
last_modified_at: 2024-12-22T15:26:25
location: Toledo, IA
weight: -20230130
draft: false
description: My first attempt at gating contnet in Wieting.TamaToledo.com
tags:
  - gating
  - authentication
  - Netlify
  - Wieting
  - Staticrypt
  - Eleventy
  - Azure
  - DevOps
---

# Gating Content in JAMstack Sites

This section's title was borrowed from a [Stackbit](https://www.stackbit.com/) article with the same title, [Gating Content in JAMstack Sites](https://www.stackbit.com/blog/gating-content-jamstack).  Working through that article to password protect some of the content at https://Wieting.TamaToledo.com is my tech pursit today.    

# Nope, Not on Netlify 

:frowning:
Last evening I took a shot at implementing the _Netlify Identity_ tricks from the aforementioned article, but could not easily get it to work.  The problem, I think, is that the https://Wieting.TamaToledo.com on _Netlify_ already uses _Netlify Identity_ for authentication of my _Netlify CMS_ forms, and adding a second, separate instance of that service isn't trivial and perhaps isn't even feasible.  I also tried implementing some quick [Staticrypt](https://www.npmjs.com/package/staticrypt) CLI protection but that also failed.  _Netlify_ does provide a really quick and painless solution, but it costs $20/month, at a minimum, to enable it.  

# New Staticrypt Strategy?

So, my next shot at this will involve creating a new [Eleventy](https://www.11ty.dev/) site just for the Wieting's protected content.  Wish me luck and follow along here if you like.  

# Trying Azure DevOps

I recently created a personal Azure account, registered to _summitt.dweller@gmail.com_, and last evening (January 31, 2023) I took a dive into [Azure DevOps]() under that account.  The "welcome" email that I received says I now have an "organization" URL at [https://dev.azure.com/summittdweller](https://dev.azure.com/summittdweller).  

I jumped into Azure DevOps because it looks like within that environment I can establish a Content Management System (CMS) not unlike the _NetlifyCMS_ (or perhaps it IS NCMS) that I run for the Wieting Theatre, hosted with Netlify.com.  I really like _NetlifyCMS_, but thus far I've had limited success with it, and ONLY at Netlify.com where the user authentication process is nicely streamlined.  I hope that Azure DevOps has user authentication that's just as easy to manage, and at less cost.  

So, I guess the strategy now is to see what Azure DevOps has to offer, rather than venturing further with [Staticrypt](https://www.npmjs.com/package/staticrypt).  

---

That's a TEMPORAY wrap, this post isn't finished just yet.    