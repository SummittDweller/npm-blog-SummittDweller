---
title: Building My First Steamlit App
slug: building-my-first-steamlit-app
date: 2023-07-24T18:44:51.000Z
date_updated: 2023-07-25T02:15:43.000Z
tags: 
  - Streamlit
  - Development  
hero_image: /images/2jpSBy-photo-1600682322637-95c40966e79f.jpg
---

I've been wanting to give [Streamlit](https://streamlit.io/) a try for some time now.  Recently, I found [Streamlit DataScience Apps](https://github.com/Jcharis/Streamlit_DataScience_Apps), a *GitHub* repo full of *Streamlit* apps, written by [Jcharis](https://github.com/Jcharis/Streamlit_DataScience_Apps/commits?author=Jcharis).  In particular, I thought I would take the [Job_Search_App_with_Streamlit_Forms_n_GithubAPI](https://github.com/Jcharis/Streamlit_DataScience_Apps/tree/master/Job_Search_App_with_Streamlit_Forms_n_GithubAPI) code for a spin.

First step, I created a new `~/GitHub/` code directory on my Mac; I named my directory `~/GitHub/job-search-app-with-streamlit-forms`.  The plan was to work in that directory inside *VSCode* with all the project requirements housed in a Python virtual environment (`.venv`) there.

The command stream in my terminal looked like this:

    ╭─mark@Marks-Mac-Mini ~
    ╰─$ cd ~/GitHub
    ╭─mark@Marks-Mac-Mini ~/GitHub
    ╰─$ mkdir job-search-app-with-streamlit-forms
    ╭─mark@Marks-Mac-Mini ~/GitHub
    ╰─$ cd job-search-app-with-streamlit-forms
    ╭─mark@Marks-Mac-Mini ~/GitHub/job-search-app-with-streamlit-forms
    ╰─$ code .
    

That last command opened the new directory in *VSCode* where I had all the tools I needed, including a new terminal window.  In that window I continued with...

    ╭─mark@Marks-Mac-Mini ~/GitHub/job-search-app-with-streamlit-forms 
    ╰─$ python3 -m venv .venv
    
    ╭─mark@Marks-Mac-Mini ~/GitHub/job-search-app-with-streamlit-forms 
    ╰─$ source .venv/bin/activate
    
    (.venv) ╭─mark@Marks-Mac-Mini ~/GitHub/job-search-app-with-streamlit-forms 
    ╰─$ pip3 install streamlit
    
    Collecting streamlit
      Downloading streamlit-1.25.0-py2.py3-none-any.whl (8.1 MB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 8.1/8.1 MB 26.6 MB/s eta 0:00:00
    Collecting altair<6,>=4.0
      Downloading altair-5.0.1-py3-none-any.whl (471 kB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 471.5/471.5 kB 13.9 MB/s eta 0:00:00
    Collecting blinker<2,>=1.0.0
      Downloading blinker-1.6.2-py3-none-any.whl (13 kB)
    Collecting cachetools<6,>=4.0
      Downloading cachetools-5.3.1-py3-none-any.whl (9.3 kB)
    Collecting click<9,>=7.0
      Downloading click-8.1.6-py3-none-any.whl (97 kB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 97.9/97.9 kB 3.7 MB/s eta 0:00:00
    Collecting importlib-metadata<7,>=1.4
      Downloading importlib_metadata-6.8.0-py3-none-any.whl (22 kB)
    Collecting numpy<2,>=1.19.3
      Downloading numpy-1.25.1-cp311-cp311-macosx_10_9_x86_64.whl (20.0 MB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 20.0/20.0 MB 30.2 MB/s eta 0:00:00
    Collecting packaging<24,>=16.8
      Downloading packaging-23.1-py3-none-any.whl (48 kB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 48.9/48.9 kB 1.6 MB/s eta 0:00:00
    Collecting pandas<3,>=1.3.0
      Downloading pandas-2.0.3-cp311-cp311-macosx_10_9_x86_64.whl (11.6 MB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 11.6/11.6 MB 38.2 MB/s eta 0:00:00
    Collecting pillow<10,>=7.1.0
      Downloading Pillow-9.5.0-cp311-cp311-macosx_10_10_x86_64.whl (3.4 MB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 3.4/3.4 MB 23.5 MB/s eta 0:00:00
    Collecting protobuf<5,>=3.20
      Downloading protobuf-4.23.4-cp37-abi3-macosx_10_9_universal2.whl (400 kB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 400.3/400.3 kB 12.9 MB/s eta 0:00:00
    Collecting pyarrow>=6.0
      Downloading pyarrow-12.0.1-cp311-cp311-macosx_10_14_x86_64.whl (24.7 MB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 24.7/24.7 MB 19.0 MB/s eta 0:00:00
    Collecting pympler<2,>=0.9
      Downloading Pympler-1.0.1-py3-none-any.whl (164 kB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 164.8/164.8 kB 5.9 MB/s eta 0:00:00
    Collecting python-dateutil<3,>=2.7.3
      Downloading python_dateutil-2.8.2-py2.py3-none-any.whl (247 kB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 247.7/247.7 kB 7.9 MB/s eta 0:00:00
    Collecting requests<3,>=2.18
      Downloading requests-2.31.0-py3-none-any.whl (62 kB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 62.6/62.6 kB 2.3 MB/s eta 0:00:00
    Collecting rich<14,>=10.14.0
      Downloading rich-13.4.2-py3-none-any.whl (239 kB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 239.4/239.4 kB 8.8 MB/s eta 0:00:00
    Collecting tenacity<9,>=8.1.0
      Downloading tenacity-8.2.2-py3-none-any.whl (24 kB)
    Collecting toml<2,>=0.10.1
      Downloading toml-0.10.2-py2.py3-none-any.whl (16 kB)
    Collecting typing-extensions<5,>=4.1.0
      Downloading typing_extensions-4.7.1-py3-none-any.whl (33 kB)
    Collecting tzlocal<5,>=1.1
      Downloading tzlocal-4.3.1-py3-none-any.whl (20 kB)
    Collecting validators<1,>=0.2
      Downloading validators-0.20.0.tar.gz (30 kB)
      Preparing metadata (setup.py) ... done
    Collecting gitpython!=3.1.19,<4,>=3.0.7
      Downloading GitPython-3.1.32-py3-none-any.whl (188 kB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 188.5/188.5 kB 6.9 MB/s eta 0:00:00
    Collecting pydeck<1,>=0.8
      Downloading pydeck-0.8.0-py2.py3-none-any.whl (4.7 MB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 4.7/4.7 MB 28.7 MB/s eta 0:00:00
    Collecting tornado<7,>=6.0.3
      Downloading tornado-6.3.2-cp38-abi3-macosx_10_9_x86_64.whl (422 kB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 422.6/422.6 kB 12.7 MB/s eta 0:00:00
    Collecting jinja2
      Downloading Jinja2-3.1.2-py3-none-any.whl (133 kB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 133.1/133.1 kB 5.4 MB/s eta 0:00:00
    Collecting jsonschema>=3.0
      Downloading jsonschema-4.18.4-py3-none-any.whl (80 kB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 81.0/81.0 kB 3.0 MB/s eta 0:00:00
    Collecting toolz
      Downloading toolz-0.12.0-py3-none-any.whl (55 kB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 55.8/55.8 kB 2.1 MB/s eta 0:00:00
    Collecting gitdb<5,>=4.0.1
      Downloading gitdb-4.0.10-py3-none-any.whl (62 kB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 62.7/62.7 kB 2.1 MB/s eta 0:00:00
    Collecting zipp>=0.5
      Downloading zipp-3.16.2-py3-none-any.whl (7.2 kB)
    Collecting pytz>=2020.1
      Using cached pytz-2023.3-py2.py3-none-any.whl (502 kB)
    Collecting tzdata>=2022.1
      Downloading tzdata-2023.3-py2.py3-none-any.whl (341 kB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 341.8/341.8 kB 10.8 MB/s eta 0:00:00
    Collecting six>=1.5
      Downloading six-1.16.0-py2.py3-none-any.whl (11 kB)
    Collecting charset-normalizer<4,>=2
      Downloading charset_normalizer-3.2.0-cp311-cp311-macosx_10_9_x86_64.whl (125 kB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 125.1/125.1 kB 4.5 MB/s eta 0:00:00
    Collecting idna<4,>=2.5
      Downloading idna-3.4-py3-none-any.whl (61 kB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 61.5/61.5 kB 2.1 MB/s eta 0:00:00
    Collecting urllib3<3,>=1.21.1
      Downloading urllib3-2.0.4-py3-none-any.whl (123 kB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 123.9/123.9 kB 4.5 MB/s eta 0:00:00
    Collecting certifi>=2017.4.17
      Downloading certifi-2023.7.22-py3-none-any.whl (158 kB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 158.3/158.3 kB 5.7 MB/s eta 0:00:00
    Collecting markdown-it-py>=2.2.0
      Downloading markdown_it_py-3.0.0-py3-none-any.whl (87 kB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 87.5/87.5 kB 3.3 MB/s eta 0:00:00
    Collecting pygments<3.0.0,>=2.13.0
      Downloading Pygments-2.15.1-py3-none-any.whl (1.1 MB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 1.1/1.1 MB 23.0 MB/s eta 0:00:00
    Collecting pytz-deprecation-shim
      Downloading pytz_deprecation_shim-0.1.0.post0-py2.py3-none-any.whl (15 kB)
    Collecting decorator>=3.4.0
      Downloading decorator-5.1.1-py3-none-any.whl (9.1 kB)
    Collecting smmap<6,>=3.0.1
      Downloading smmap-5.0.0-py3-none-any.whl (24 kB)
    Collecting MarkupSafe>=2.0
      Downloading MarkupSafe-2.1.3-cp311-cp311-macosx_10_9_x86_64.whl (13 kB)
    Collecting attrs>=22.2.0
      Downloading attrs-23.1.0-py3-none-any.whl (61 kB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 61.2/61.2 kB 2.1 MB/s eta 0:00:00
    Collecting jsonschema-specifications>=2023.03.6
      Downloading jsonschema_specifications-2023.7.1-py3-none-any.whl (17 kB)
    Collecting referencing>=0.28.4
      Downloading referencing-0.30.0-py3-none-any.whl (25 kB)
    Collecting rpds-py>=0.7.1
      Downloading rpds_py-0.9.2-cp311-cp311-macosx_10_7_x86_64.whl (311 kB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 311.9/311.9 kB 9.3 MB/s eta 0:00:00
    Collecting mdurl~=0.1
      Downloading mdurl-0.1.2-py3-none-any.whl (10.0 kB)
    Installing collected packages: pytz, zipp, urllib3, tzdata, typing-extensions, tornado, toolz, toml, tenacity, smmap, six, rpds-py, pympler, pygments, protobuf, pillow, packaging, numpy, mdurl, MarkupSafe, idna, decorator, click, charset-normalizer, certifi, cachetools, blinker, attrs, validators, requests, referencing, pytz-deprecation-shim, python-dateutil, pyarrow, markdown-it-py, jinja2, importlib-metadata, gitdb, tzlocal, rich, pydeck, pandas, jsonschema-specifications, gitpython, jsonschema, altair, streamlit
      DEPRECATION: validators is being installed using the legacy 'setup.py install' method, because it does not have a 'pyproject.toml' and the 'wheel' package is not installed. pip 23.1 will enforce this behaviour change. A possible replacement is to enable the '--use-pep517' option. Discussion can be found at https://github.com/pypa/pip/issues/8559
      Running setup.py install for validators ... done
    Successfully installed MarkupSafe-2.1.3 altair-5.0.1 attrs-23.1.0 blinker-1.6.2 cachetools-5.3.1 certifi-2023.7.22 charset-normalizer-3.2.0 click-8.1.6 decorator-5.1.1 gitdb-4.0.10 gitpython-3.1.32 idna-3.4 importlib-metadata-6.8.0 jinja2-3.1.2 jsonschema-4.18.4 jsonschema-specifications-2023.7.1 markdown-it-py-3.0.0 mdurl-0.1.2 numpy-1.25.1 packaging-23.1 pandas-2.0.3 pillow-9.5.0 protobuf-4.23.4 pyarrow-12.0.1 pydeck-0.8.0 pygments-2.15.1 pympler-1.0.1 python-dateutil-2.8.2 pytz-2023.3 pytz-deprecation-shim-0.1.0.post0 referencing-0.30.0 requests-2.31.0 rich-13.4.2 rpds-py-0.9.2 six-1.16.0 smmap-5.0.0 streamlit-1.25.0 tenacity-8.2.2 toml-0.10.2 toolz-0.12.0 tornado-6.3.2 typing-extensions-4.7.1 tzdata-2023.3 tzlocal-4.3.1 urllib3-2.0.4 validators-0.20.0 zipp-3.16.2
    
    [notice] A new release of pip is available: 23.0.1 -> 23.2.1
    [notice] To update, run: pip install --upgrade pip
    
    (.venv) ╭─mark@Marks-Mac-Mini ~/GitHub/job-search-app-with-streamlit-forms 
    ╰─$ pip install --upgrade pip
    
    Requirement already satisfied: pip in ./.venv/lib/python3.11/site-packages (23.0.1)
    Collecting pip
      Downloading pip-23.2.1-py3-none-any.whl (2.1 MB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 2.1/2.1 MB 12.6 MB/s eta 0:00:00
    Installing collected packages: pip
      Attempting uninstall: pip
        Found existing installation: pip 23.0.1
        Uninstalling pip-23.0.1:
          Successfully uninstalled pip-23.0.1
    Successfully installed pip-23.2.1
    
    (.venv) ╭─mark@Marks-Mac-Mini ~/GitHub/job-search-app-with-streamlit-forms 
    ╰─$ pip3 install requests
    
    Requirement already satisfied: requests in ./.venv/lib/python3.11/site-packages (2.31.0)
    Requirement already satisfied: charset-normalizer<4,>=2 in ./.venv/lib/python3.11/site-packages (from requests) (3.2.0)
    Requirement already satisfied: idna<4,>=2.5 in ./.venv/lib/python3.11/site-packages (from requests) (3.4)
    Requirement already satisfied: urllib3<3,>=1.21.1 in ./.venv/lib/python3.11/site-packages (from requests) (2.0.4)
    Requirement already satisfied: certifi>=2017.4.17 in ./.venv/lib/python3.11/site-packages (from requests) (2023.7.22)
    
    (.venv) ╭─mark@Marks-Mac-Mini ~/GitHub/job-search-app-with-streamlit-forms 
    ╰─$ streamlit app
    Usage: streamlit [OPTIONS] COMMAND [ARGS]...
    Try 'streamlit --help' for help.
    
    Error: No such command 'app'.
    
    (.venv) ╭─mark@Marks-Mac-Mini ~/GitHub/job-search-app-with-streamlit-forms 
    ╰─$ streamlit run app.py
    
      You can now view your Streamlit app in your browser.
    
      Local URL: http://localhost:8501
      Network URL: http://192.168.0.183:8501
    
      For better performance, install the Watchdog module:
    
      $ xcode-select --install
      $ pip install watchdog
                
    2023-07-24 20:58:17.240 Uncaught app exception
    Traceback (most recent call last):
      File "/Users/mark/GitHub/job-search-app-with-streamlit-forms/.venv/lib/python3.11/site-packages/streamlit/runtime/scriptrunner/script_runner.py", line 552, in _run_script
        exec(code, module.__dict__)
      File "/Users/mark/GitHub/job-search-app-with-streamlit-forms/app.py", line 116, in <module>
        main()
      File "/Users/mark/GitHub/job-search-app-with-streamlit-forms/app.py", line 43, in main
        nav1,nav2,nav3 = st.beta_columns([3,2,1])
                         ^^^^^^^^^^^^^^^
    AttributeError: module 'streamlit' has no attribute 'beta_columns'
    

Mackenzie says I need to remove the `beta_` in two places in the code... Done.

Launching the app again with `streamlit run app.py` after a moment or two it works!
