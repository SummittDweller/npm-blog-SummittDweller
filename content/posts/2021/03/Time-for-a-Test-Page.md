---
title: Time for a Test Page
publishDate: 2021-03-07
lastmod: 2021-03-07T21:06:14-05:00
# weight: -20210307
location: "Toledo, Iowa"
draft: false
---

My daughter, Mackenzie, and I have been using this blog for testing new features lately. If you've been following me here you've seen some of them pop-up on the home page. Now that we have a host of them working, I need to move some out--of-the-way so they don't clutter things up too much.  However, I don't want to discard them, in some cases we didn't implement them anywhere else so this is the only _working_ copy we have.

So, this morning I found a post at [formcake]([https://formcake.com/), titled [How to add a Static Page to Hugo](https://formcake.com/blog/adding-a-single-page-to-hugo) by Joe Marshall.  I'm going to follow Joe's lead and try to add a static "Testing" page here. If I'm successful, it will become the new home for 3 features (and maybe more in the future), specifically:

  - A _markdown_ (.md) file fetched from Dropbox,
  - A summary of my public gists, and 
  - My latest _Tweet_, with automatic, timed expiration.
  
These three features currently look like this on my home page:

 {{< figure src="/img/Hugo-features-03-07-2021.png" title="3 Features, Time for a New Home" >}}
 
 ## It Worked, Almost
 
 I did indeed manage to make this work, but not quite as Joe proposed. I found that in [How to add a Static Page to Hugo](https://formcake.com/blog/adding-a-single-page-to-hugo) there's some confusion around the name of the `.html` file that Joe calls for. In at least one place the file is named `/layouts/_default/singlepage.html`, but in fact the file should be named `/layouts/_default/staticpage.html`.
 
 The other issue I encountered was my fault. My implementation of this "testing" page means that I need to include not just text or markdown content, I also need quite a bit of code, mostly Javascript. So, in my case I duplicated the `/layouts/_default/staticpage.html` template, calling it `/layouts/_default/testpage.html`.  My `code` appears in this new template file. I also changed the content "type" in the frontmatter of `/content/testing.md` from "staticpage" to "testpage".  And voilá...
 
 ## It Just Works!
 
 You can find the results on my [Testing Page](https://blog.summittdweller.com/testing/). Enjoy.
