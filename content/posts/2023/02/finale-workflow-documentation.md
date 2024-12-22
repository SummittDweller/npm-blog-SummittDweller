---
title: Finale Workflow Documentation
publishDate: 2023-02-08
last_modified_at: 2024-12-22T15:26:26
draft: false
description: "Christine's Finale workflow captured using my new documentation approach"
azure:
  dir: https://sddocs.blob.core.windows.net/documentation
  subdir: Finale-Workflow-Documentation
publishDate: 2023-02-08
lastmod: 2023-02-08T14:54:39
location: Toledo, IA
weight: -20230208
draft: false
author: Mark McFate
---

Mackenzie, my daughter, and I created this post documenting my wife's [Finale](https://www.finalemusic.com/) workflow for scanning and editing music on her Mac.  We did this for my wife to <strike>celebrate her birthday</strike> preserve her sanity.  Well, it was worth a shot.  The birthday idea seemed more romantic, but mental health comes first.  

The document was created using a process we recently built and documented in [Creating Better Documentation](https://static.grinnell.edu/dlad-blog/posts/138-creating-better-documentation/).  In this instance of the process we tried to annotate in yellow screen capture elements that need attention, and used red annotation to indicate things that require input or action of some kind.  In some of the later images we failed and things that should be red were left highlighted in yellow.  Sorry.  

# Begin by Scanning

The first step involved launching the _Canon MF Scan Utility_ as you see below.  This is the software she uses to scan music pages on the multi-function scanner attached to her Mac.  

![Launch the Canon MF Scan Utility](https://sddocs.blob.core.windows.net/documentation/Finale-Workflow-Documentation/0010.png "Launch the Canon MF Scan Utility")  

We verified that the correct scanner is selected, loaded the score into the scanner*, and clicked `Custom` to begin the scan.  Then, wait for the scanner to warm up, if necessary.  

*Note that the sheet music can be placed on the scanner glass one-sheet-at-a-time, or if the pages are 8.5x11, one-sided, and in good condition, they may be loaded in the document feeder to scan continuously.  In this particular case we were able to use the document feeder.  

![Select Custom scanning](https://sddocs.blob.core.windows.net/documentation/Finale-Workflow-Documentation/0015.png "Select Custom scanning")

![Waiting for the scanner to warm up](https://sddocs.blob.core.windows.net/documentation/Finale-Workflow-Documentation/0020.png "Waiting for the scanner to warm up")

Once the scanner is ready the mechanical process of scanning should begin.  When scanning one-page-at-a-time some user intervention will be required.  

![Scanning in progress](https://sddocs.blob.core.windows.net/documentation/Finale-Workflow-Documentation/0028.png "Scanning in progress")

When the scan is complete a `Save Settings` window should pop-up.  We reviewed the information and made appropriate selections where noted below, then clicked `OK` to continue.  **Be sure to set and take note of the `File Name:` and `Save in:` fields!  Also, it's probably wise to ensure that the `Data Format:` is "TIFF" and the `Save to a subfolder with current date` control is checked.**  

![Save scan settings](https://sddocs.blob.core.windows.net/documentation/Finale-Workflow-Documentation/0046.png "Save scan settings")

# SmartScore 64 Pro 

A _SmartScore 64 Pro_ window will automatically open, **but don't be confused, we don't want to run this application yet!  Click the `Cancel` button to close _SmartScore 64 Pro_**.  

![SmartScore Pro launches automatically](https://sddocs.blob.core.windows.net/documentation/Finale-Workflow-Documentation/0064.png "SmartScore Pro launches automatically but needs to be closed")

Once _SmartScore 64 Pro_ is closed, we need to open it properly by clicking its icon in the dock.  :frowning:  

![Properly launching SmartScore](https://sddocs.blob.core.windows.net/documentation/Finale-Workflow-Documentation/0078.png "Properly launching SmartScore")

Now _SmartScore_ is open to the `Task Window` where we selected `Recognition` to convert the scanned images to music XML.  

![Starting the SmartScore recognition process](https://sddocs.blob.core.windows.net/documentation/Finale-Workflow-Documentation/0089.png "Starting the SmartScore recognition process")

Next, we add the files of our scanned pages to the recognition processing list.  

![Add scans to SmartScore recognition](https://sddocs.blob.core.windows.net/documentation/Finale-Workflow-Documentation/0094.png "Add scans to SmartScore recognition")

In the file dialog we navigate to the scanned page TIFFs and select them all.  The order of files in the selection is NOT critical.  With all files selected click `Open`.  

![Navigate to the scan files and select them](https://sddocs.blob.core.windows.net/documentation/Finale-Workflow-Documentation/0105.png "Navigate to the scan files and select them")

The next `Begin Recognition` screen offers controls to change the file order if necessary.  Once the files are in the proper order click `Begin Recognition` button to proceed.  

![Order the TIFFs and begin recognition](https://sddocs.blob.core.windows.net/documentation/Finale-Workflow-Documentation/0134.png "Order the TIFFs and begin recognition")

Be patient, the recognition process may take a few minutes.  

![Recognition in progress](https://sddocs.blob.core.windows.net/documentation/Finale-Workflow-Documentation/0151.png "Recognition in progress")

When the recognition is complete a `System Report` appeared prompting us to `Open SmartScore file`.  We did.  

![SmartScore system report](https://sddocs.blob.core.windows.net/documentation/Finale-Workflow-Documentation/0155.png "SmartScore system report")

Next, the `Unify Score` window popped up and we verified the default selections shown below before clicking `OK`.  

![Unify score pop-up](https://sddocs.blob.core.windows.net/documentation/Finale-Workflow-Documentation/0157.png "Unify score pop-up")

When prompted to save the score be sure to select `Music XML (*.xml)` and take note of where the file will be saved.  

![Saving as XML](https://sddocs.blob.core.windows.net/documentation/Finale-Workflow-Documentation/0168.png "Saving as XML")

You may be prompted to save each scan/file individually.  Once the file save is confirmed you can close _SmartScore 64 Pro_.    

![Confirm save and close SmartScore](https://sddocs.blob.core.windows.net/documentation/Finale-Workflow-Documentation/0189.png "Confirm save and close SmartScore")

# Finale

Next, open _Finale_ from the dock as shown below.  

![Open Finale](https://sddocs.blob.core.windows.net/documentation/Finale-Workflow-Documentation/0199.png "Open Finale")

After a minute or more the _Finale_ `Launch Window` should appear, and we selected `IMPORT MUSICXML` as shown below.  

![Selecting IMPORT MUSICXML](https://sddocs.blob.core.windows.net/documentation/Finale-Workflow-Documentation/0209.png "Selecting IMPORT MUSICXML")

We navigated to the XML file that was saved in _SmartScore_ and clicked `Open` to load it in _Finale_.  

![Opening the saved MusicXML file](https://sddocs.blob.core.windows.net/documentation/Finale-Workflow-Documentation/0224.png "Opening the saved MusicXML file")

That's it, the scanned score is now loaded in _Finale_ where it is ready to be edited!  It's a good idea to click `Save As...` routinely to save your changes as you proceed.  

![Save your Finale work](https://sddocs.blob.core.windows.net/documentation/Finale-Workflow-Documentation/0237.png "Save your Finale work")

