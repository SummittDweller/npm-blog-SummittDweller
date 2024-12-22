---
title: Proper Python
publishDate: 2022-09-24T14:26:44-05:00
lastmod: 2022-09-26T12:00:29-05:00
location: Toledo, IA
weight: "-20220924"
draft: false
description: A new Python approach based on my `blog.summittdweller.com` site.
# Enter comma separated values.
tags:
  - Python
  - venv2022-09-26T12:00:16-05:00
  - Virtual Environment
  - DigitalOcean
  - App Platform
---

What follows is the `README.md` file from my _GitHub_ repo where https://blog.summittdweller.com is built.  It outlines how to "properly" add Python to a project such that we can create an easily reproducible "virtual environment" without storing the necessary Python libraries in _GitHub_.  

From the `README.md`...  

{{% original %}}
# blogs-SummittDweller

The Python portions of this repo were gleaned from https://github.com/SummittDweller/hikes. 
This is the repo for my https://blog.SummittDweller.com/ static website.

## Latest Python Improvements

Using guidance at https://predictivehacks.com/how-to-work-with-vs-code-and-virtual-environments-in-python/ I successfully created a new `.venv` virtual environment.  The commands I used to do this were...

```
╭─mark@Marks-Mac-Mini ~/GitHub/blogs-SummittDweller ‹main*›
╰─$ python3 -m venv .venv

╭─mark@Marks-Mac-Mini ~/GitHub/blogs-SummittDweller ‹main*›
╰─$ source .venv/bin/activate

(.venv) ╭─mark@Marks-Mac-Mini ~/GitHub/blogs-SummittDweller ‹main› 
╰─$ pip3 freeze > python-requirements.txt

(.venv) ╭─mark@Marks-Mac-Mini ~/GitHub/blogs-SummittDweller ‹main*›
╰─$ pip3 install -r python-requirements.txt
```

Then I used `COMMAND-SHIFT-P` to select and `Python: Select interpreter` to choose the new `.venv` Python.  After that...

```
(.venv) ╭─mark@Marks-Mac-Mini ~/GitHub/blogs-SummitDweller ‹main*›
╰─$ python3 consolidate.py --start 20220806 --end 20220825

(.venv) ╭─mark@Marks-Mac-Mini ~/GitHub/blogs-SummitDweller ‹main*›
╰─$ hugo server
```

## Rebuilding a Local Environment

Based on guideance from https://stackoverflow.com/questions/6590688/is-it-bad-to-have-my-virtualenv-directory-inside-my-git-repository I've reconstructed this project such that Python artifacts do NOT propogate into Github.

The project should automatically "rebuild" as necessary when opened in VSCode, but if the Python virtual environment needs to be recreated use...

```
source .venv/bin/activate && pip3 install -r python-requirements.txt
```

## Deployment via DigitalOcean 

In order to deploy this `starter` static app on _DigitalOcean_ I had to PERMANENTLY move all of my Python components (`.py` scripts and `requirements.txt`) to a `.python` directory to hide it from view during app creation.  Before moving these elements _DigitalOcean_ would consistently try to deploy my app as Python, and that's not right.

See _DigitalOcean_ ticket [#06849069] `Hugo static site with Python components builds fail` for details.

The response I received from _DigitalOcean_... 

{{% original %}}
Hello,

Thanks for contacting DigitalOcean.

We appreciate you reaching out to us about your Hugo static site. From what you mentioned it does sound like your app is getting detected as a python webservice rather then a static site due to the requirements.txt file you had in the root of your repo.

Unfortunately this is currently what App platform uses to detect applications as python apps. Either having a requirements.txt file or a setup.py file will cause that detection. Our engineers are looking into options to specify the build pack used rather then relying upon the auto detection, which would address this issue in your case, but don't have a timeline yet for implementing it. 

In the mean time the work around that you have specified here should work fine for this. It should cause the app to be detected as a static site rather then python. Hopefully it isn't impacting anything else in your app's build process. 

If you have any questions, please let us know.

Regards,
Nate
Senior Cloud Support Engineer
Check out our community for great tutorials, articles and FAQs! 
digitalocean.com/community
 

ref:_00Df218t5m._5004P21l4JM:ref
{{% /original %}}

### Remedy

Based on the response above I'm making final changes to eliminate the `.python` folder, renaming `.python/requirements.txt` as `python-requirements.txt`, and pulling all other contents of `.python` into the root of the project.
 
{{% /original %}}
