---
title: "Paperless-ng on CentOS7"
publishDate: 2021-01-07
lastmod: 2021-01-07T14:59:28-06:00
location: "Toledo,IA"
# weight: -20210107
draft: false
tags:
  - Paperless-ng
  - CentOS 7
---

Over the end-of-year holiday break in 2020 I managed to ressurect my old home-office CentOS 7 development server.  I had a mind salvage and update [Paperless](https://github.com/the-paperless-project/paperless) on that server, and I did manage to do that.  However, along the way I discovered the *Paperless-ng* branch of the project and I installed it, using *Docker* as suggested, by creating a new project and configuration I've saved as [summittdweller/paperless-ng-dockerfiles](https://github.com/SummittDweller/paperless-ng-dockerfiles).

## Mounting my ReadyNAS Share

To successfully mount my *ReadyNAS/Paperless* SMB share I had to do the following on *centos7* as *root*:

```
mount -t cifs -o username=mark,vers=1.0 //192.168.1.48/Paperless /mnt/paperless
```

Unfortunately, this did NOT work!  Everything appeeared to be working properly except that files copied into *//ReadyNAS/Paperless/consume* were NOT shared into the container as mapped, so no ingest was triggered.  I could only get the ingest to start if I used *docker cp...* to copy the files into the mapped *./consume* directory.

## Mounting */home/mark/paperless-ng* To Support Ingest

So, I turned to [https://devopspoints.com/centos-7-setting-up-samba-and-nfs-for-file-sharing.html](https://devopspoints.com/centos-7-setting-up-samba-and-nfs-for-file-sharing.html) for setup of SAMBA on *CentOS7* at *192.168.1.22* with hopes that I could mount */home/mark/paperless-ng/consume* and get Paperless auto-ingest working.

It works!  In fact, it works quite well.

Paperless-ng is configured to watch for changes in */home/mark/paperless-ng/consume* and will ingest any unique .pdf files dropped there.  Note that *Paperless-ng* is smart enough to keep track of all the files it has ingested so it won't knowingly ingest a duplicate.

It's worth noting that there is also a */home/mark/paperless-ng/exported* directory where regular exports of Paperless documents can be kept before back-up to *//ReadyNAS* storage.

## Still NO Good

So, the network configuration indicated above appears to work when copying files from a Mac into the target share, */home/mark/paperless-ng/consume*.  Unfortunately I've had NO luck whatsoever getting my *Brother ADS-1500W* scanner to network with ANYTHING.  The setup seems just fine, but whatever I scan eventually gives me a "Send Failed" message with NO other explanation.

After spending many, many, many hours dealing with this I have officially given up!

## A New USB Workflow

My *Brother ADS-1500W* scanner supports a number of transfer options including USB. There's only one USB port on the back of the scanner so it's relatively foolproof.

To engage this workflow I formatted a USB stick as *FAT32* and named it *PAPERLESS*.  When this stick is inserted into the scanner a *BROTHER* directory is created and scans named *mmddyynn.pdf* are generated there.

Once a set of documents has been scanned using the *to USB* profile, the USB stick can be removed from the scanner and plugged in to any *CentOS7* USB input port.  The *PAPERLESS* volume will automatically appear on the desktop and all that one must do is copy/paste (select and drag) each of the .pdf files from */mnt/paperless/BROTHER* to the target *consume* diretory at */home/mark/paperless-ng/consume*.

## Modifying *inotify* in CentOS 7

The *~/Desktop/README.md* file on node *centos7* documents a necessary step that I discovered as the key to making *Paperless* consume/ingest process work.  The commands are:

```
cat /proc/sys/fs/inotify/max_user_watches          # default is 8192
sudo sysctl fs.inotify.max_user_watdhes=1048576    # necessary increase
```

## Starting and Stopping *Paperless-ng*

### Starting *Paperless-ng*

Simple, to start it on *CentOS7*:

```
cd /home/mark/GitHub/paperless-ng-dockerfiles
docker-compose up -d
```

Or, simply reboot *CentOS7*.  See auto-start details in the section below.

### Stopping *Paperless-ng*

Also simple, on *CentOS7*:

```
cd /home/mark/GitHub/paperless-ng-dockerfiles
docker-compose down
```

## Auto-Starting *Paperless-ng*

I found and followed [this resource](https://www.thegeekdiary.com/centos-rhel-7-how-to-make-custom-script-to-run-automatically-during-boot/) to create a boot-time auto-start script to configure and launch *Paperless-ng* whenever *CentOS7* is booted.  My script is */var/tmp/startup_script.sh* and the process of running it echoes some output to */var/tmp/script.out*.

I saved the script as a [public gist](https://gist.github.com/SummittDweller/9e179f948faf0d30fe8069f684b7d762) for safe-keeping.
