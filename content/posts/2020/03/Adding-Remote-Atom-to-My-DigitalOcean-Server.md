---
title: Adding "Remote Atom" to My DigitalOcean Server
publishDate: 2020-03-15
lastmod: 2020-03-15T00:47:02-05:00
location: "Toledo, Iowa"
weight: -20200315
draft: false
tags:
  - Atom
  - rmate
  - ratom
  - Remote Atom
---

Last evening and early this morning I completed the addition of a new (to me) package to _Atom_ on my Mac Mini.  The package is [Remote Atom](https://atom.io/packages/remote-atom) and I found the configuration to be a little confusing, but in the end it was worth the work.

## Use

The addition and configuration of this package allows me to open an _SSH_ terminal/session from my Mac Mini to my _summitt-dweller-DO-docker_ droplet and, with _Atom_ open locally on my Mac I can issue a command like

  ```
  ratom /opt/README.md
  ```
in the terminal connected to _summitt-dweller-DO-docker_, and the specified "remote" file will open in my local _Atom_.  Better still, if I make changes to the file and save them, the remote copy is automatically updated as saved.

## Configuration

As I said, configuration was a little dicey.  Mine followed exactly what's documented in [the project site](https://atom.io/packages/remote-atom), complete with renaming `rmate` to `ratom` as suggested.  The real key to configuration has two parts:

  - First, _Atom_ has to be open locally. This is necessary to get the package running so that it can accept connections from the remote, and that also requires that the package is auto-started along with _Atom_.
  - Next, I added the following specs to `~/.ssh/config` on my Mac Mini:

    ```
    Host 104.248.237.235
      RemoteForward 52698 localhost:52698
    ```

That addition to `~/.ssh/config` allows me to run my usual _ssh_ connection commands without having to specify any remote/reverse tunneling...the config does it for me automatically when the "Host" or target is _summitt-dweller-DO-docker_.  Without that spec I'd have to configure each _ssh_ connection I open, like so:

  ```
  ssh -R 52698:localhost:52698 administrator@104.248.237.235
  ```

That's a wrap. Until next time...
