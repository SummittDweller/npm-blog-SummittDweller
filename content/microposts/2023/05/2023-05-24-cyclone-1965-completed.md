---
title: Cyclone 1965 Completed
slug: cyclone-1965-completed
date: 2023-05-24T18:23:56.000Z
date_updated: 2023-05-24T18:23:56.000Z
weight: -20230524
tags:
  - Work
location: Grinnell College
---

This morning I was dealing with the 1965 edition of the Grinnell College yearbook, *Cyclone 1965*, in Digital.Grinnell.  That's a monster of a yearbook, 278 pages and a .pdf that's almost 1.4 GB in size.

In order to get the .pdf to upload I tried a number of tricks, the only one that worked was a modification of [Book Ingest in Digital.Grinnell](https://static.grinnell.edu/dlad-blog/posts/097-book-ingest-in-digital-grinnell/)   The key command was...

    docker cp "/mnt/storage/Yearbooks/Cyclone 1965/lib_1965cycloneyearbook_0002.pdf" isle-apache-dg:/var/www/sites/default/files/book.pdf
