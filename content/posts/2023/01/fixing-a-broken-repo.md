---
title: Fixing a Broken GitHub Repo
publishDate: 2023-01-19T13:30:13-06:00
last_modified_at: 2024-12-22T15:26:25
location: Toledo, IA
weight: -20230119
draft: false
description: Fixing a broken GitHub repo after pushing a too-large file
tags:
  - GitHub
  - broken
  - git 
  - filter-repo
---

# Don't Push Enormous Files to GitHub!

Pay close attention to the subtitle above!  A couple of days ago I was working on content for [Tama-Toledo Community Visioning](https://cv.tamatoledo.org) and I added a large `socialmedia.zip` file to the source repo, and then very stupidly pushed it to GitHub and the repo's `main` branch.  Naturally, the push didn't finish so I removed the file and pushed a new commit to "remove it permanently".  Well, that ain't how `git` works!  

The "remove" commit appeared to have worked, but now the TTCV site wouldn't deploy since the build time had gone from less than 2 minutes, to more than 10 minutes.  I immediately became suspicious of that pesky, large, `socialmedia.zip` file, but how could I properly get rid of it?  

# Using `git filter-repo`

Fortunately, I found and followed the GitHub docs guidance in [Using git filter-repo](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository#using-git-filter-repo) to remove the troublesome large file, namely `socialmedia.zip`, from the repo.  My commands, and somewhat abridged output, to do this looked something like this...  

{{% original %}}
╭─mark@Marks-Mac-Mini ~/GitHub/cv ‹main*›  
╰─$ git status  
On branch main  
Your branch is up to date with 'origin/main'.  
  
Untracked files:  
  (use "git add <file>..." to include in what will be committed)  
	static/images/Business-30-Broadway-Crosswalk-Sign.png  
  
nothing added to commit but untracked files present (use "git add" to track)  
╭─mark@Marks-Mac-Mini ~/GitHub/cv ‹main*›  
╰─$ code .  
╭─mark@Marks-Mac-Mini ~/GitHub/cv ‹main*›  
╰─$ brew install git-filter-repo  
Running `brew update --auto-update`...  
==> Auto-updated Homebrew!  
==> Updated Homebrew from 3.6.19 (260ee0ee6) to 3.6.20 (344d32bf7).  
Updated 3 taps (homebrew/core, homebrew/cask and dart-lang/dart).  
==> New Formulae  
dstack  
==> New Casks  
codux  
  
The 3.6.20 changelog can be found at:  
  https://github.com/Homebrew/brew/releases/tag/3.6.20  
==> Fetching git-filter-repo  
==> Downloading https://ghcr.io/v2/homebrew/core/git-filter-repo/manifests/2.38.0-1
######################################################################## 100.0%  
==> Downloading https://ghcr.io/v2/homebrew/core/git-filter-repo/blobs/sha256:a309651d195fca608c9268b7075f58e018e83fc285e4f43d85546adea28e1d83  
==> Downloading from https://pkg-containers.githubusercontent.com/ghcr1/blobs/sha256:a309651d195fca608c9268b7075f58e018e83fc285e4f43d85546adea28e1d83?se=2023-01
######################################################################## 100.0%  
==> Pouring git-filter-repo--2.38.0.all.bottle.1.tar.gz  
🍺  /usr/local/Cellar/git-filter-repo/2.38.0: 8 files, 281.4KB  
==> Running `brew cleanup git-filter-repo`...  
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.  
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).  
╭─mark@Marks-Mac-Mini ~/GitHub/cv ‹main›  
╰─$ git pull  
remote: Enumerating objects: 7, done.  
remote: Counting objects: 100% (7/7), done.  
remote: Compressing objects: 100% (2/2), done.  
remote: Total 4 (delta 2), reused 4 (delta 2), pack-reused 0  
Unpacking objects: 100% (4/4), 78.90 KiB | 1022.00 KiB/s, done.  
From https://github.com/Tama-Toledo/community-visioning  
   978a2cd..23b4276  gh-pages   -> origin/gh-pages  
Already up to date.  
╭─mark@Marks-Mac-Mini ~/GitHub/cv ‹main›  
╰─$ code .  
╭─mark@Marks-Mac-Mini ~/GitHub/cv ‹main›  
╰─$ cd ..  
╭─mark@Marks-Mac-Mini ~/GitHub  
╰─$ mv -f cv .out-of-the-way  
╭─mark@Marks-Mac-Mini ~/GitHub  
╰─$ git clone https://github.com/Tama-Toledo/community-visioning  
Cloning into 'community-visioning'...  
remote: Enumerating objects: 3738, done.  
remote: Counting objects: 100% (882/882), done.  
remote: Compressing objects: 100% (307/307), done.  
remote: Total 3738 (delta 488), reused 776 (delta 388), pack-reused 2856  
Receiving objects: 100% (3738/3738), 119.72 MiB | 29.18 MiB/s, done.  
Resolving deltas: 100% (1932/1932), done.  
╭─mark@Marks-Mac-Mini ~/GitHub  
╰─$ cd community-visioning               
╭─mark@Marks-Mac-Mini ~/GitHub/community-visioning ‹main›  
╰─$ ll  
total 16  
-rw-r--r--  1 mark  staff    36B Jan 19 16:24 README.md  
drwxr-xr-x  4 mark  staff   128B Jan 19 16:24 archetypes  
drwxr-xr-x  3 mark  staff    96B Jan 19 16:24 assets  
-rw-r--r--  1 mark  staff   3.5K Jan 19 16:24 config.toml   
drwxr-xr-x  9 mark  staff   288B Jan 19 16:24 content  
drwxr-xr-x  3 mark  staff    96B Jan 19 16:24 i18n  
drwxr-xr-x  8 mark  staff   256B Jan 19 16:24 layouts  
drwxr-xr-x  3 mark  staff    96B Jan 19 16:24 resources  
drwxr-xr-x  6 mark  staff   192B Jan 19 16:24 static  
drwxr-xr-x  3 mark  staff    96B Jan 19 16:24 themes  
╭─mark@Marks-Mac-Mini ~/GitHub/community-visioning ‹main›  
╰─$ code .  
╭─mark@Marks-Mac-Mini ~/GitHub/community-visioning ‹main›   
╰─$ git filter-repo --invert-paths --path socialmedia.zip                     
╭─mark@Marks-Mac-Mini ~/GitHub/community-visioning ‹main›   
╰─$ git remote add origin https://github.com/Tama-Toledo/community-visioning  
╭─mark@Marks-Mac-Mini ~/GitHub/community-visioning ‹main›   
╰─$ git push origin --force --all       
╭─mark@Marks-Mac-Mini ~/GitHub/community-visioning ‹main›  
╰─$ git status  
On branch main  
Your branch is up to date with 'origin/main'.  
  
nothing to commit, working tree clean  
╭─mark@Marks-Mac-Mini ~/GitHub/community-visioning ‹main›  
╰─$ git pull   
╭─mark@Marks-Mac-Mini ~/GitHub/community-visioning ‹main›   
╰─$ git branch --set-upstream-to=origin/main  main                            
{{% /original %}}  

The key commands in that sequence are... 

 - **brew install git-filter-repo**  
 - **git clone** https://github.com/Tama-Toledo/community-visioning
   - The above command was necessary because the next command expects a "clean", recently compressed local repository.  
  - **git filter-repo** --invert-paths --path socialmedia.zip                     
  - **git remote add origin** https://github.com/Tama-Toledo/community-visioning  
  - **git push origin --force --all**
  - **git branch --set-upstream-to=origin/main** main

# It Worked!  

The good news, this worked, and I now have my repo back in shape such that I can successfully deploy it again.  

---

That's a wrap.  Oh, in case you want to know what happened to `socialmedia.zip`, check out that project's [README.md](https://github.com/Tama-Toledo/community-visioning/blob/main/README.md) file.   