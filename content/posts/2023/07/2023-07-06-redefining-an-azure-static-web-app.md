---
title: Redefining an Azure Static Web App
slug: redefining-an-azure-static-web-app
date: 2023-07-06T19:11:12.000Z
date_updated: 2023-07-06T19:11:12.000Z
---

Today's burning question... Can I *easily* "redefine" an Azure Static Web App?

So, the source code for my password-protected [Wieting-Guild-Pages](https://wieting-guild.tamatoledo.com/) is broken and I can't update the stale old content that's currently there.  It's a long story.  Fortunately, I've rebuilt that code in a new GitHub repo and have it working again.  Yay!

Now, can I take the deployment parts of the old/broken repo and apply them to the new repo and make it all work again?

## Worth a Try

So, I started this experiment by visiting the old project, [https://github.com/SummittDweller/wieting-guild-pages](https://github.com/SummittDweller/wieting-guild-pages), and copying the [https://github.com/SummittDweller/wieting-guild-pages/blob/main/.github/workflows/azure-static-web-apps-lemon-mushroom-087d78210.yml](https://github.com/SummittDweller/wieting-guild-pages/blob/main/.github/workflows/azure-static-web-apps-lemon-mushroom-087d78210.yml) file found there.  That GitHub workflow file contains nearly all the information required to deploy the old site, maybe it will work for the new site too?  Nope, at least not right out of the box.

I attched the `.yml` file to my new project by placing an unmodified copy of it in the new project's `.github/workflows` directory.  Then when I committed the change and pushed it to GitHub the workflow kicked in automatically.  Ultimately it looks like the "build" portion of the process worked as-expected, but the "deployment" failed with these messages:

    DeploymentId: 86ab60d0-3abf-429c-9c17-405068c1ebcf
    
    deployment_token was not provided.
    The deployment_token is required for deploying content. If you'd like to continue the run without deployment, add the configuration skip_deploy_on_missing_secrets set to true in your workflow file
    An unknown exception has occurred
    
    For further information, please visit the Azure Static Web Apps documentation at https://docs.microsoft.com/en-us/azure/static-web-apps/
    If you believe this behavior is unexpected, please raise a GitHub issue at https://github.com/azure/static-web-apps/issues/
    Exiting
    

## Something is Missing

Since I'm not absolutely sure what's missing, and I don't know how to replace it even if I was sure of what it is, I'm going to just create a new instance of this web app following the guidance, yet again, in [Quickstart: Build your first static web app](https://learn.microsoft.com/en-us/azure/static-web-apps/get-started-portal?tabs=vanilla-javascript&amp;pivots=github).
