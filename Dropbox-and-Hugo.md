

The three key parts used to render a file from Dropbox into a Hugo site page, located in: `layouts/partials/render_from_Dropbox.html`, `config.toml`, and `layouts/index.html`.


The source code and call to fetch a file from Dropbox is located in `render_from_Dropbox.html`.
Within the source code, there is a function, `readTextFile`, that requires a URL as a parameter. This URL is set in `config.toml` as `.Site.Params.dropboxURL`, and should link to the actual dropbox file being referenced. The call to read a text file is wrapped in an if statement, in case there has been no Dropbox URL set in `config.toml`.

The Dropbox partial is invoked in `index.html` with a simple `{{ partial "render_from_Dropbox.html" . }}`.


The content of the file in Dropbox can be edited and updated or changed completely by uploading a file by the same name to that Dropbox. The site should reflect whatever file's address matches the Dropbox URL in `config.toml`. 
