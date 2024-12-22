---
title: "New Announcement Feature"
publishDate: 2020-09-13
lastmod: 2020-09-13T11:42:54-05:00
location: "Toledo, Iowa"
weight: -20200913
draft: false
tags:
  - Announcement
---

Quite some time ago I added an **Announcement** feature to the [Rootstalk](https://rootstalk.grinnell.edu) website that I helped design and maintain for [Grinnell College](https://grinnell.edu). Events of the past week have driven me to implement this feature as part of this blog and one other site, with some minor improvements.

<!--more-->

The original [Rootstalk](https://rootstalk.grinnell.edu) version of the feature is very simple, it works around this logic:

  - The site's `content/_index.html` page invokes a shortcode named `announcement.html`.
  - The `announcement.html` shortcode checks for existence of a file path of `static/announcement.md`.
  - If the `static/announcement.md` file exists, its _markdown_ content is read and displayed prominently on the home page.

Removing or disabling the announcement is as simple as deleting the file, or simply changing the filename to something like `static/.announcement.md`, and republishing the site.

## Implemented for the Compass Rose Band

My brother-in-law, the founder and lead-singer for the [Compass Rose Band](https://compassroseband.net), out of greater metropolitan Cedar Rapids, fell ill, and literally fell down the stairs, on Thursday evening, September 10, 2020.  Since my daughter publishes the aforementioned [CRB](https://compassroseband.net) website, we wanted to alert their fans that the show set for Friday evening, September 11, would be canceled. We immediately thought of the [Rootstalk](https://rootstalk.grinnell.edu) **Announcement** feature and subsequently implemented it for the [CRB](https://compassroseband.net) site.

In the case of [CRB](https://compassroseband.net) the feature is implemented just a little differently:

  - Instead of a shortcode the `layouts/index.html` file includes a new block of code that looks for a file named `content/announcement.md`.
  - If the file exists, its _markdown_ content is prominently displayed with an orange border near the top of the home page.

Removing or disabling the announcement is just like in [Rootstalk](https://rootstalk.grinnell.edu), we delete or change the filename to something like `content/.announcement.md`, and republish the site.

## Implemented Here In This blog

Since I'm essentially documenting the new feature here, I thought it only prudent to also implement it here, and that implementation is currently **identical** to what we did for the [CRB](https://compassroseband.net).

So watch the top of this blog's home for prominent announcements in the future, hopefully none that report dire emergencies. :smiley:

That's a warp. Until next time...
