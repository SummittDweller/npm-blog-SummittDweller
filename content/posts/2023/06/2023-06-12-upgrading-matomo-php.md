---
title: Upgrading Matomo PHP
slug: upgrading-matomo-php
date: 2023-06-12T19:30:18.000Z
date_updated: 2023-06-12T19:56:08.000Z
tags: 
  - Development
  - DigitalOcean
  - Work
---

This afternoon I'm adding `https://digital.grinnell.edu` (site ID is 17) to my own Matomo instance and I'm prompted to upgrade PHP on that Matomo droplet (DigitalOcean).  I did so quite easily following [Upgrade PHP from 7.2 to 7.4 on CentOS 8 and Apache](https://www.digitalocean.com/community/questions/upgrade-php-from-7-2-to-7-4-on-centos-8-and-apache).  I've also updated my Drupal version, and some modules, in [https://digital.grinnell.edu](https://digital.grinnell.edu) along with adding the `matomo` module, but that module is now reporting:

    
        The validation of "http://analytics.summittservices.com/matomo.php" failed with error "Error opening socket ssl://analytics.summittservices.com:443" (HTTP code 0).
        The validation of "https://analytics.summittservices.com/matomo.php" failed with error "Error opening socket ssl://analytics.summittservices.com:443" (HTTP code 0).
    

Hmmm...wonder what's up with that?

So, I tried this...

    Last login: Mon Jun 12 19:21:45 2023 from 162.243.190.66
    [root@centos-s-1vcpu-1gb-nyc1-01 ~]# sudo certbot renew
    Saving debug log to /var/log/letsencrypt/letsencrypt.log
    
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Processing /etc/letsencrypt/renewal/summittservices.com-0001.conf
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Renewing an existing certificate for summittservices.com and analytics.summittservices.com
    Reloading nginx server after certificate renewal
    
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Processing /etc/letsencrypt/renewal/summittservices.com.conf
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Renewing an existing certificate for summittservices.com and www.summittservices.com
    Reloading nginx server after certificate renewal
    
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Congratulations, all renewals succeeded: 
      /etc/letsencrypt/live/summittservices.com-0001/fullchain.pem (success)
      /etc/letsencrypt/live/summittservices.com/fullchain.pem (success)
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    

...and... NO more validation errors!  Yay!
