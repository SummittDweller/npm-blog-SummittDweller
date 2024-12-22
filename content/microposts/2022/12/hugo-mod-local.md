---
publishDate: 2022-12-19
lastmod: 2022-12-19T15:51:22-06:00
location: Toledo, IA
weight: -20221219
draft: false
---
Today I discovered a slick trick for "local" development of my first [Hugo Module](https://github.com/SummittDweller/hugo-timeline).  The guidance I used was found in [Working with Hugo Module Locally](https://www.thenewdynamic.com/note/develop-hugo-modules-locally/) and it was spot-on!  In my case the key was the additon of one line, two if you include the comment, to my project's `config.yml` file:

```
// Innocent line below!
replace github.com/SummittDweller/hugo-timeline => /Users/mark/GitHub/hugo-timeline
```
