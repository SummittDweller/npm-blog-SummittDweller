---
title: Launching MacDown from a Terminal
publishDate: 2020-03-15
lastmod: 2020-03-15T16:04:08-05:00
location: Toledo, Iowa
# weight: -20200315
draft: false
tags:
  - MacDown
  - terminal
---

Lately I find that I like to open _Markdown_ documents in _MacDown_ rather than _Atom_.  This is espeically true of things like "README.md" documents that I intend to read, but not edit. This can be done without any special configuration, assuming _MacDown_ is installed and working.  To do that use a syntax like this:

```
open -b com.uranusjr.macdown path/to/document.md
```

A command I've been using quite often today is: `open -b com.uranusjr.macdown ~/GitHub/dg-isle/docs/install/install-local-migrate.md`.

That's a wrap. Until next time...
