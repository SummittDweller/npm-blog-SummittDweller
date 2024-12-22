---
title: On-prem Servers with StaticCMS and Remote Access for the Wieting
slug: on-prem-servers-with-staticcms-and-remote-access-for-the-wieting
date: 2023-12-29T16:41:14.000Z
date_updated: 2023-12-29T17:19:09.000Z
hero_image: 
---

It's no secret that I love building ridiculously inexpensive but secure and reliable static web sites.  Unfortunately, adding and maintaining content can be a pain.  *I'd rather write code than content!*  So, I also want to pawn that content responsibility off on others, but that means teaching them to use [VSCode](https://code.visualstudio.com/) – my means of editing static content – or providing a [CMS (content management system)](https://en.wikipedia.org/wiki/Content_management_system) they can work with.  There's no such thing as a static CMS so now I need some "dynamic" components.  Unfortunately my "dynamic" CMS requires user authentication because *we want SOMEONE editing our content, not EVERYONE! *That always seems to be pricey, at least by comparison to our $5/month static website.    

# Currently...

The Wieting already has an inexpensive [Hugo](gohugo.io) static website at [https://Wieting.TamaToledo.com](https://wieting.TamaToledo.com).   The site code and content both reside in [GitHub](https://github.com) free-of-charge.  The site is currently hosted on *Netlify* and that costs very little, but also provides meager and dimishing features with virtually no support.  So all of that is good, but could be much better in the near future.  

Right now the CMS portion of the puzzle uses *NetlifyCMS* which demands either running on *Netlify, *as it does,or tediously implementing a relatively complex editor authentication scheme elsewhere.  I chose the simple approach of using the *Netlify* host with it's built-in *Netlify Identity* features for authentication.  Again, not bad, but not optimal and certainly not sustainable.    

The other problem with *NetlifyCMS* is that every change/addition triggers a new automatic deployment of the site.  When the editors make more than one or two changes in rapid succession, which they like to do, the CMS queues up multiple concureent re-builds of the site and those almost always exceed API quota and crash.   So the changes get saved, but not deployed.   

# The Future...

So, what if I could give my "editors" access to a free, aka "open" CMS, one that doesn't require *Netlify *or* Netlify Identity*?  Sounds promising.  I've been looking at [StaticCMS](https://www.staticcms.org/), but if I run that CMS in the cloud we still have an "expensive" authentication requirement in some form.  Hmmmm, what if that CMS were running locally on my own server so that no cloud authentication is needed?  That could work, right?  Editors could sit down at the server, which is really just a workstation at the theatre, and edit content until the cows come home, with no cloud authentication needed.  Perfect!  

Yes, but...  I can't imagine anyone wanting to sit at a workstation in the projection booth to enter content, that place is difficult to access (lots of stairs), way too noisy with the projector running, frequently either too hot or too cold, and it's just not convenient in the least.  

# Remote Access to the Rescue

To avoid working in the projection booth, where the noisy projector and computer workstations are, we currently take advantage of remote desktop access using a program I purchased several years ago: [Screens](https://edovia.com/en/screens/).  I have a *Screens 4* license that I obtained with a one-time-fee and it works from any of my Macs (or iOS devices) to give me control of the Mac Mini in the booth.  But *Screens* is Mac-only software.  It has a remote component called *Screens Connect *that runs on each remote device to make connections super-easy, but *Screens Connect *doesn't work on Linux systems which require tedios manual configuration instead.  **I've spent many hours but have never been able to make the manual configuration work with the Wieting's networking and [Kinetic](https://www.windstream.com/high-speed-internet) internet connection from *Windstream*.  **

In addition to *Screens,* the Wieting has used *TeamViewer* with our technical service provider, [Sonic Equipment Company](https://www.sonicequipment.com/), for remote connections into the projection booth.  We've never owned a license and purchasing one is cost-prohibitive.   

# Reasonable Remote Access?

*Screens* just released a new version, *Screens 5*, and the upgrade costs $$$ but it's still Mac-only and there's still no Linux version of their wonderful *Screens Connect* app.  So, no thank you.  There must be a reasonable alternative, right?   

Yup.  I've signed up for a 30-day trial (I love software that comes with a reasonable trial version and period) of [Getscreen.me](https://getscreen.me).   So far it rocks!  Even with my Linux workstations!   Best of all, I believe the Wieting's use case would cost between $60 to $150 per year.  Not too shabby.

# Summary... the Plan

So, my plan/proposal is to park a Linux workstation (a PC repurposed with the *Ubuntu *OS) in the projection booth to support an instance of [StaticCMS](https://www.staticcms.org/).  That workstation will be remotely accessible using [Getscreen.me](https://getscreen.me) and it will be home to a local copy of the Wieting's website.  It will be configured such that *StaticCMS* can be used to update the local website content, with a link that can be used to push changes to *GitHub* where changes are deployed to [https://wieting.TamaToledo.com](https://wieting.TamaToledo.com) hosted in either *DigitalOcean* or *Azure* static apps.  

# Bonus!

Without too much extra effort, the Linux workstation with remote access should also be able to support playback of the Wieting's pre-show content (currently running from an unreliable Raspberry Pi) as well as projector and audio rack controls (currently supplied by our Mac Mini).   
