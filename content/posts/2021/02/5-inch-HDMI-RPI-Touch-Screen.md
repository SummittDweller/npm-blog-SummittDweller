---
title: "5-Inch HDMI Raspberry Pi Touch Screen"
publishDate: 2021-02-05
lastmod: 2021-02-05T23:26:27-06:00
location: "Toledo,IA"
weight: -20210205
draft: false
tags:
  - HDMI
  - Raspberry Pi
  - Touch Screen
  - XPT2046
---

A couple of years have now passed since I purchased an [Elecrow 5" HDMI Touchscreen display for the Raspberry Pi](https://www.amazon.com/Elecrow-Display-Monitor-800x480-Raspberry/dp/B013JECYF2/ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=mmjjg-20&linkId=df2d8e154ca1d5ca9fb992d34677ebd3) and put it to use.  I even 3D printed a very nice case for it.  So, there's a bit of configuration code on the SD card that can be edited to determine if the 5" screen is active, or if the RPI's output is directed to its HDMI output port.  Well, in the last 2 years I forgot what to edit and what changes to make.  

Fortunately, when I went looking for some info to refresh my memory, I found a great resource... a review posted in 2016 from none other than [Jeff Geerling](https://www.jeffgeerling.com/), aka [geerlingguy](https://github.com/geerlingguy).  His review/blog post is [Review: Elecrow HDMI 5" 800x480 TFT Display with XPT2046 Touch Controller](https://www.jeffgeerling.com/blog/2016/review-elecrow-hdmi-5-800x480-tft-display-xpt2046-touch-controller).  In case Jeff's post should ever disappear, here's the a key piece of info that I needed to jog my memory:  

{{% original %}}
## Getting full resolution over HDMI

When I first booted the Pi attached to the display, there was a large white area on the right, and only the left portion of the screen was being used by the Pi (it was only using 640x480 of the 800x480 display). To fix this, you have to set a few display options in the configuration file the Raspberry Pi reads during startup to switch certain hardware settings.  

Edit /boot/config.txt (either while booted into Raspbian, or on another computer directly on the microSD card), making sure the following values are set:  
```
# uncomment if you get no picture on HDMI for a 
# default "safe" mode
#hdmi_safe=1

# uncomment this if your display has a black border of unused 
# pixels visible and your display can output without overscan
disable_overscan=0

# uncomment if hdmi display is not detected and composite 
# is being output
#hdmi_force_hotplug=1

# uncomment to force a specific HDMI mode (this will force VGA)
hdmi_group=2
hdmi_mode=1
hdmi_mode=87
hdmi_cvt=800 480 60 6 0 0 0
```

Reboot the Pi either via the UI or by entering sudo reboot in the Terminal. Once rebooted, the Pi should fill up the full 800x480 display.

>  Note: If the Pi boots up to a funny-looking screen and you can't see anything, you can either reformat the microSD card, or pull it, edit the /boot/config.txt file from another computer to fix it, and put it back in the Pi.

{{% /original %}}
