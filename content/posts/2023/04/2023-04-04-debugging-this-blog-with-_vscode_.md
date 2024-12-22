---
title: Debugging This Blog with VSCode
slug: debugging-this-blog-with-_vscode_
date: 2023-04-04T16:31:07.000Z
date_updated: 2023-04-05T00:28:44.000Z
hero_image: https://images.unsplash.com/photo-1592609931041-40265b692757?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDR8fHZzY29kZXxlbnwwfHx8fDE2ODA2MzI0NjM&ixlib=rb-4.0.3&q=80&w=2000
---

I'm making some significant changes to the code behind this blog today.  Specifically, I'm going to move my micropost "front matter" from the `post.excerpt` or `post.custom_excerpt` field to the "body" of the post where it might look like this example (taken from this very post):

    -+-+-+
    location: Toledo, IA
    price: $50.00
    note: This is just some sample "front matter". My parser removed the "split" characters from the delimiter you see here.
    

# I Need VSCode Debugging!

To do this effectively I really need live dev debugging in *VSCode*, but how can I do that?

Well, I turned first to [Tips for debugging in 11ty](https://griffadev.medium.com/tips-for-debugging-in-11ty-aca887d2c66e) by [George Griffiths](https://griffadev.medium.com) because it looked very promising.  In the second half of that post under the heading of **Debugging with VS Code** there are instructions for creating a `.vscode/lanuch.json` to do this, and I did.  But how does one "attach" their debugger to the script I use to launch/test this blog locally?  That command by the way is `yarn start`.

## My Debugger Configuration

So, I found that the stock `launch.json` prescribed by George didn't quite work in my situation, I had to add a configuration AND with a small change, and turn off `Auto Attach` debugging.

I clicked on the debugger icon in the left-hand pane of my *VSCode* window and there I had the option to add a configuration.  I clicked that and was presented with several choices.  After incorrectly trying a few options I settled on one labeled `Run Script&colon; start` and it almost worked.

The configuration added to my `launch.json` file included `"command"&colon; "yarn run start"`, but that's not quite right for me.  I simply use `yarn start` to launch my local dev instance of this blog, so I made that change to `lanuch.json` so that file now reads:

    {
      "name": "11ty",
      "type": "node",
      "request": "launch",
      "program": "${workspaceRoot}/node_modules/.bin/eleventy",
      "stopOnEntry": false,
      "args": [],
      "cwd": "${workspaceRoot}",
      "console": "internalConsole",
      "configurations": [
        {
          "type": "node-terminal",
          "name": "Run Script: start",
          "request": "launch",
          "command": "yarn start",
          "cwd": "${workspaceFolder}"
        }
      ]
    }
    

# It Works!

Now when I open the debugger and click the green start arrow beside `Run Script: start` I can see `.eleventy.js` begin running and it stops at any breakpoints I have set.  It even works when stepping into my `custom.js` script, all the while showing me the call stack and variables that are in-scope at the time.  Yay!

Thank You [George](https://griffadev.medium.com)!

## Wait, There's More

Even better news is that I can still run `yarn start` locally without involving the debugger.  Nice.

-/-/-/

location: Toledo, IA

price: $50.00

note: This is just some sample "front matter".
