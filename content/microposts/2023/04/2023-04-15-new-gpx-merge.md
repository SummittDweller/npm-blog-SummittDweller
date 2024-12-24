---
title: New GPX Merge
slug: new-gpx-merge
date: 2023-04-15T13:42:58.000Z
date_updated: 2023-04-15T15:04:49.000Z
# weight: -20230415
tags: 
  - Development
---

Last evening I rode my bike to/from soccer so this morning I wanted to "merge" those two track logs before publishing them to [https://hikes.SummittDweller.com](https://hikes.SummittDweller.com).  So, I found and forked [https://github.com/locked-fg/gpxmerger](https://github.com/locked-fg/gpxmerger) to [https://github.com/SummittDweller/gpxmerger](https://github.com/SummittDweller/gpxmerger) and after tweaking my own code IT WORKS!

The command I ran to make my first "merge" was: `python3 gpxmerger.py "/Users/mark/Downloads/2023-04-14 16:32 - 3m 11s.gpx" "/Users/mark/Downloads/2023-04-14 20:40 - 3m 27s.gpx"`.  I think I might tweak the script soon to just pull all of the `.gpx` files from a specified directory.

**Update**: My fork of the project now accepts a single `target_directory` argument and uses "glob" to grab all the `.gpx` files in that directory.
