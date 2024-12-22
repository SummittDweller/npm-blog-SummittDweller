---
title: Fixing Wieting Guild Pages
slug: fixing-wieting-guild-pages
date: 2023-06-03T23:20:26.000Z
date_updated: 2023-06-03T23:37:01.000Z
tags: 
  - Development
  - Eleventy
---

Just the other day I got an updated copy of the Wieting Theatre's volunteer roster and assignment schedule.  As I'm trying to post them to the [theatre's management website](https://wieting-guild.tamatoledo.com) (it's password protected) I keep having issues with `npm` and dependencies that won't compile.  The fix, thus far has included a local command stream like this:

    cd wieting-guild-pages
    git pull
    code .
    npm run build
    npm run start 
      --> failed
    npm update
    npm audit fix
    npm run build
    npm run start
      --> failed
    npm audit fix --force
    npm run build
      --> failed
    npm install axios
    npm run build
      --> failed
    npm update
    npm run build
    

The last errors had this in common:

    [11ty] Unhandled rejection in promise: (more in DEBUG output)
    [11ty] connect ETIMEDOUT 54.243.162.8:443 (via Error)
    [11ty] 
    [11ty] Original error stack trace: Error: connect ETIMEDOUT 54.243.162.8:443
    [11ty]     at AxiosError.from (/Users/mark/GitHub/wieting-guild-pages/node_modules/axios/dist/node/axios.cjs:836:14)
    

One explanation I found:

    The ETIMEDOUT error is thrown by the Node.js runtime when a connection or HTTP request is not closed properly after some time. You might encounter this error from time to time if you configured a timeout on your outgoing HTTP requests. The general solution to this issue is to catch the error and repeat the request, preferably using an exponential backoff strategy so that a waiting period is added between subsequent retries until the request eventually succeeds, or the maximum amount of retries is reached. If you encounter this error frequently, try to investigate your request timeout settings and choose a more appropriate value for the endpoint if possible.
    

I also found a GitHub issues/bug report related to Axios and this error at [https://github.com/SillyTavern/SillyTavern/issues/432](https://github.com/SillyTavern/SillyTavern/issues/432).  So, maybe it's not just me?
