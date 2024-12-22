---
title: Migrating the Wieting Site in Drupal 8
publishDate: 2020-02-28
lastmod: 2020-03-01T08:33:46-06:00
location: Toledo, Iowa
weight: -20200228
draft: false
tags:
  - Wieting
  - Docksal
  - Lando
  - docker-compose-drupal
---
# Migrating the Wieting Site in Drupal 8

Sorry for my extended absence here, I've been uber-busy with work, but have also been able to work a little (lots of long nights and weekends) on a long-overdue update of [https://Wieting.TamaToledo.com](https://Wieting.TamaToledo.com) in _Drupal 8_.  It's true, I have been thinking about moving that site to make it static, almost certainly using _Hugo_, but I thought before doing so I'd give _Drupal 8_ one more try.  I'm pleased to report that it's working nicely again.  Here's how I did it, and how I plan to keep it updated...

## Saved by "docker-compose-drupal"

I actually started the process of migrating and updating [the Wieting website](https://wieting.tamatoledo.com) in _Docksal_, but I failed... I could never figure out how to reliably and easily push my work to production from there.  _Docksal_ just seems to wrap so much of itself into the `cli` container that drives it, I found it difficult to de-couple from that in production.

So I went looking elsewhere and discovered [Lando](https://devwithlando.org), and I did considerable work with it because _Lando_, at least in the case of _Drupal_, builds a 3-part development stack that looks a lot like what I wanted to deploy in production.  The parts of a _Lando_ stack, and my production stack, are the same:

  - An `nginx` web server container,
  - A `mysql` or `mariadb` database container, and
  - A `php` codebase container.

But once again I had trouble figuring out exactly how to push that development stack to production.  So, I went looking again for an open (and by that I mean "free" and freely modifiable) production-ready stack configuration that uses the 3-parts I had in mind.  I found [docker-compose-drupal](https://github.com/mogtofu33/docker-compose-drupal) and almost immediately created [my own fork](https://github.com/SummittDweller/docker-compose-drupal) of that project. Using [my `docker-compose-drupal` fork](https://github.com/SummittDweller/docker-compose-drupal) I set off to build a production instance, NOT a development instance, on my `summitt-dweller-DO-docker` droplet at _DigitalOcean_.  That project came to life in `/opt/docker-compose-drupal` there.

The evolution of `summitt-dweller-DO-docker:/opt/docker-compose-drupal` was quite an adventure, in large part because the _Wieting's_ web site had gone almost a year without any updates.  That meant upgrading the _Drupal_ core from version 8.2.? to version 8.8.2, along with countless modules that had changed rather dramatically, so there were lots of bumps along the way.  I also had to move the site from a multi-site configuration, the old site lived in a container at `/var/www/html/web/sites/wieting`, to a _default_ configuration that lives in the container at `/var/www/localhost/web/sites/default`.

Fortunately, [docker-compose-drupal](https://github.com/mogtofu33/docker-compose-drupal) includes some nice scripts and features to help with things like that, and they are nicely documented in the [project's README.md](https://github.com/mogtofu33/docker-compose-drupal/blob/master/README.md) file.  I'll elaborate on a few of the key features later in this post, but most of what I did during the migration and update is water-under-the-bridge, and should not need to be repeated, ever, so I won't elaborate on all of it here.  It's worth noting here that the work I did in my fork all happened in a branch named `wieting`.

## Moved to "wieting-D8-DO"

Once I had a new site working as I'd hoped, I wanted to begin a fresh new development and update cycle, so I used a process I've documented in my work blog: ["How to Create a New GitHub Repo from an Existing Branch"](https://static.grinnell.edu/blogs/McFateM/posts/065-create-new-github-project-from-a-branch/). That work created the _Wieting_ site's new home, [https://github.com/SummittDweller/wieting-D8-DO](https://github.com/SummittDweller/wieting-D8-DO), based on the _wieting_ branch of the aforementioned fork of _docker-compose-drupal_.

## Site Update Workflow

Having built the [wieting-D8-DO](https://github.com/SummittDweller/wieting-D8-DO) project I need a reliable workflow that I could use to keep it up-to-date.  I created that workflow by migrating the existing production site at `summitt-dweller-DO-docker:/opt/docker-compose-drupal`, where it responded as _https://Wieting.TamaToledo.org_, to a new staging copy at `summitt-dweller-DO-docker:/opt/wieting-D8-DO`, where it would respond, temporarily, at my designated "staging" address, _https://Wieting.SummittServices.com_.

While working as _administrator_ on `summitt-dweller-DO-docker` the entire command-line process looked like this:

```
echo $(date --iso-8601)
cd /opt/docker-compose-drupal
git ls-files --others --ignored --exclude-standard > $(date --iso-8601).ignored.list
tar czvf $(date --iso-8601).ignored.list.tar.gz --files-from $(date --iso-8601).ignored.list
gpg --encrypt --recipient summitt.dweller@gmail.com $(date --iso-8601).ignored.list.tar.gz
rm -fr $(date --iso-8601).ignored.list.tar.gz
cd /opt
git clone https://github.com/SummittDweller/wieting-D8-DO.git
cd wieting-D8-DO
cp -f ../docker-compose-drupal/2020-02-27.ignored.list.tar.gz.gpg .
gpg --decrypt 2020-02-27.ignored.list.tar.gz.gpg > ignored.tar.gz
tar xzvf ignored.tar.gz
rm -f ignored.tar.gz
cd ../docker-compose-drupal
scripts/mysql dump
mv -f database/dump/dump.sql /opt/wieting-D8-DO/database/mysql-init
cd /opt/wieting-D8-DO
nano .env
nano docker-compose.yml
docker-compose up -d
```

### Breaking the Workflow Down

Moving the site from `/opt/docker-compose-drupal` and https://Wieting.TamaToledo.com, to `/opt/wieting-D8-DO` and https://Wieting.SummittServices.com is a command-line process like this, with comments...

| Comments / Commands |
| --- |
| # Set the working directory to the server's project root, then `git clone` the _wieting-D8-DO_ project.<br/> `cd /opt` <br/> `git clone https://github.com/SummittDweller/wieting-D8-DO.git` |
| # Save today's date in ISO 8601 format to `${today}`; we will use it a few times later on. <br/> `today=$(date --iso-8601)` |
| # Set working directory to the initial project. Put the site into 'maintenance_mode', flush all caches, dump a copy of the project's database, move previously dumped databases to an _.inactive_ directory, and move the dumped database so it will initialze the new site upon startup. <br/> `cd /opt/docker-compose-drupal` <br/> `scripts/drush sset system.maintenance_mode 1 --input-format=integer` <br/> `scripts/drush cr` <br/> `scripts/mysql dump -f dump_${today}.sql` <br/> `mv -f /opt/wieting-D8-DO/database/mysql-init/*.sql /opt/wieting-D8-DO/database/mysql-init/.inactive/` <br/> `mv -f database/dump/dump_${today}.sql /opt/wieting-D8-DO/database/mysql-init/` |
| # Fetch a list of ignored files, then _tar_ the ignored files to make an archive, and encrypt the tarball for security purposes, then remove the itermediate tarball. <br/> `git ls-files --others --ignored --exclude-standard > ${today}.ignored.list` <br/> `tar czvf ${today}.ignored.list.tar.gz --files-from ${today}.ignored.list` <br/> `gpg --encrypt --recipient summitt.dweller@gmail.com ${today}.ignored.list.tar.gz` <br/> `rm -fr ${today}.ignored.list.tar.gz` |
| # Now set the working directory to the new project, copy the tarball from the old site to the new one, decrypt and then restore/extract the tarball contents, and finally, remove the intermediate tarball. <br/> `cd /opt/wieting-D8-DO` <br/> `cp -f ../docker-compose-drupal/${today}.ignored.list.tar.gz.gpg .` <br/> `gpg --decrypt ${today}.ignored.list.tar.gz.gpg > ignored.tar.gz` <br/> `tar xzvf ignored.tar.gz` <br/> `rm -f ignored.tar.gz` |
| # Working in the new directory, edit the _.env_ file to set `PROJECT_NAME`, `NGINX_HOST_HTTP_PORT` and `NGINX_HOST_HTTPS_PORT` that won't conflict with existing names. <br/> `nano .env` |
| # Still in the new directory, edit the _docker-compose.yml_ file to set the _nginx_ service `labels:` to include  `traefik.frontend.rule=Host:wieting.SummittServices.com`, to properly address the new site. <br/> `nano docker-compose.yml` |
| # Spin up the new site for testing. <br/> `docker-compose up -d` |
| # Turn off 'maintenance_mode' in both sites. <br/> `/opt/docker-compose-drupal/scripts/drush sset system.maintenance_mode 0 --input-format=integer` <br/> `/opt/wieting-D8-DO/scripts/drush sset system.maintenance_mode 0 --input-format=integer` |

That worked nicely!  Time to end this saga, but I'll return shortly, in another post, to document my workflow for ongoing maintenance and updates.  Until next time...
