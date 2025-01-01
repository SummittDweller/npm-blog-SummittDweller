# npm-blog-SummittDweller

This blog now features search with [Pagefind](https://pagefind.app/) via [npm](https://www.npmjs.com/).  Use `npm run serve` to launch a full `localhost` test instance.  

<div style="border: 3px solid red; text-align: center;">What follows is from an earlier iteration of this blog that did NOT use `Pagefind`.  Much of this information is obsolete.</div>

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

## Adding the `SummittDweller/hugo-timeline` Module

I've successfully added the code to drive a new `/timeline` page as part of this blog, but I did so "locally", and now I'd like to repeat the process but using the aforementioned [SummittDweller/hugo-timeline](https://github.com/SummittDweller/hugo-timeline) [module](https://gohugo.io/hugo-modules/).

I used guidance found in [Hugo Modules: Getting Started](https://scripter.co/hugo-modules-getting-started/) to make this happen, like so:

```
╭─mark@Marks-Mac-Mini ~/GitHub/blogs-SummittDweller ‹main› 
╰─$ brew install go
╭─mark@Marks-Mac-Mini ~/GitHub/blogs-SummittDweller ‹main› 
╰─$ brew upgrade   # This is not "required", but probably overdue.

╭─mark@Marks-Mac-Mini ~/GitHub/blogs-SummittDweller ‹main*› 
╰─$ mkdir content/timeline/.out-of-the-way      # vvv Moving existing local stuff out of the way vvv
╭─mark@Marks-Mac-Mini ~/GitHub/blogs-SummittDweller ‹main*› 
╰─$ mv -f layouts/partials/hugo-timeline* content/timeline/.out-of-the-way/.   
╭─mark@Marks-Mac-Mini ~/GitHub/blogs-SummittDweller ‹main*› 
╰─$ mv -f layouts/shortcodes/hugo-timeline* content/timeline/.out-of-the-way/.
╭─mark@Marks-Mac-Mini ~/GitHub/blogs-SummittDweller ‹main*› 
╰─$ mv -f static/css/hugo-timeline* content/timeline/.out-of-the-way/.        

╭─mark@Marks-Mac-Mini ~/GitHub/blogs-SummittDweller ‹main*› 
╰─$ hugo mod init github.com/SummittDweller/blogs-SummittDweller        
go: creating new go.mod: module github.com/SummittDweller/blogs-SummittDweller
go: to add module requirements and sums:
        go mod tidy
```

Next, to pull in [SummittDweller/hugo-timeline](https://github.com/SummittDweller/hugo-timeline) as a module I turned to the `config.yml` file and guidance found in [Hugo Modules: everything you need to know!](https://www.thenewdynamic.com/article/hugo-modules-everything-from-imports-to-create/).  Additions to `config.yml` are:

```yml
module:
  imports:
    - path: github.com/SummittDweller/hugo-timeline
      mounts:
      - source: layouts
        target: layouts
      - source: static
        target: static
```

### Updating the Module

So, all of the above moves appeared to work correctly, at least locally, but I wanted to be sure I can successfully update the `hugo-timeline` module and get updated behavior in this project.  The command required to make that happen per [Hugo Modules: everything you need to know!](https://www.thenewdynamic.com/article/hugo-modules-everything-from-imports-to-create/#upgrading) is:

```
╭─mark@Marks-Mac-Mini ~/GitHub/blogs-SummittDweller ‹main*› 
╰─$ hugo mod get -u github.com/SummittDweller/hugo-timeline
go: downloading github.com/SummittDweller/hugo-timeline v0.0.0-20221206191252-cd7178e7e43b
go: upgraded github.com/SummittDweller/hugo-timeline v0.0.0-20221206043330-5f1ecbad913f => v0.0.0-20221206191252-cd7178e7e43b

╭─mark@Marks-Mac-Mini ~/GitHub/blogs-SummittDweller ‹main*› 
╰─$ hugo server
port 1313 already in use, attempting to use an available port
Start building sites … 
hugo v0.107.0+extended darwin/amd64 BuildDate=unknown

                   | EN   
-------------------+------
  Pages            | 288  
  Paginator pages  |   9  
  Non-page files   |   0  
  Static files     |  38  
  Processed images |   0  
  Aliases          |  79  
  Sitemaps         |   1  
  Cleaned          |   0  

Built in 90 ms
Watching for changes in /Users/mark/GitHub/blogs-SummittDweller/{archetypes,content,layouts,static,themes}
Watching for config changes in /Users/mark/GitHub/blogs-SummittDweller/config.yaml, /Users/mark/GitHub/blogs-SummittDweller/go.mod
Environment: "development"
Serving pages from memory
Running in Fast Render Mode. For full rebuilds on change: hugo server --disableFastRender
Web Server is available at //localhost:62846/ (bind address 127.0.0.1)
Press Ctrl+C to stop
```

Eureka!  The page rendered at `http://localhost:1313/timeline/` after the above `hugo mod get -u...` command is displaying the latest changes I made to `hugo-timeline`!  Perfect!  

__My work here is done, well, for now anyway.__   :grin: 
