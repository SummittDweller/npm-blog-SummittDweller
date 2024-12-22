---
title: Adding Netlify CMS for Editing This Blog
publishDate: 2021-03-27T02:40:11.820Z
lastmod: 2021-04-04T20:13:36-05:00
location: Toledo, IA
weight: -20210326
draft: false
description: Testing my new Netlify CMS configuration here
# Enter comma separated values.
tags:
  - Netlify
  - Testing
---
OK, I'm using the "*Rich Text*" editor option in the body field here in my "posts" **Netlify CMS** form for [this blog](https://blog.SummittDweller.com).  Will it work?  We shall see!

## Yup!

I have to confess, this is pretty cool.  I'm even able to switch dynamically between the *Rich Text* and *Markdown* editors here!

# How Was This Done?

Let me elaborate just a bit...

## Using Hugo

Since this blog is published using [Hugo](https://gohugo.io) I looked to the Netlify CMS guidance provided at <https://www.netlifycms.org/docs/hugo/> for help.

First I added the requested `./static/admin` directory, and the two files required there:

* `index.html`, and 
* `config.yml`

### index.html

The contents of my `index.html` file is identical to what's called for in the documentation.  Easy.  I like.

### config.yml

This file demands considerable customization, so I turned to more *Netlify CMS* documentation regarding [Widgets](https://www.netlifycms.org/docs/widgets) and the [Github Backend](https://www.netlifycms.org/docs/github-backend/) that I already use.

As a result, my `config.yml` file looks like this:

```
backend:
  name: github
  repo: SummittDweller/blogs-SummittDweller
  branch: main 

media_folder: 'static/img'
public_folder: /img

collections:
  - name: 'posts'
    label: 'Post'
    folder: 'content/posts'
    create: true
    slug: '{{slug}}'
    path: '{{year}}/{{month}}/{{slug}}'
    preview_path: '{{year}}/{{month}}/{{slug}}'
    preview_path_date_field: publishDate
    sortable_fields: [ 'publishDate', 'lastmod' ]
    sort: 'publishDate:desc'
    view_groups:
      - label: Year
        field: publishDate
        # groups items based on the value matched by the pattern
        pattern: \d{4}
      - label: Drafts
        field: draft
    editor:
      preview: true
    fields:
      - label: Title
        name: title
      - label: Body
        name: body
        widget: markdown 
      - label: Publish Date
        name: publishDate
        widget: date      
      - label: Last Mod
        name: lastmod
        widget: datetime
      - label: Location
        name: location
        default: 'Toledo, IA'
        required: false
      - label: Weight
        name: weight
        height: "Enter today's date with a leading dash, like -YYYYMMDD."
        required: true
        # default: -{{year}}{{month}}{{day}}
      - label: Draft Status
        name: draft
        widget: boolean
        default: false 
      - label: Description
        name: description
        required: false
      - label: Tags
        name: tags
        widget: list
        hint: 'Enter comma separated values.'
        required: false
```

## Simple = Elegant

At this moment I'm running `hugo server` on my Mac and I'm editing this post in `https://localhost:1313/admin`, basically in the *admin* page of my blog on my localhost.  Beautimous!
