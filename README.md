#[sourceboard](http://radekstepan.com/sourceboard)

Dashboard of GitHub open source projects.

[![Dependencies](http://img.shields.io/david/radekstepan/sourceboard.svg?style=flat)](https://david-dm.org/radekstepan/sourceboard)
[![License](http://img.shields.io/badge/license-AGPL--3.0-red.svg?style=flat)](LICENSE)

![image](https://raw.githubusercontent.com/radekstepan/sourceboard/master/public/img/screenshot.png)

##Customize

To point to your own projects change the `url` property in `src/models/repos.coffee` according to the [api docs](https://developer.github.com/v3/repos/).

[Ractive.js](http://www.ractivejs.org/) is being used for eventing and templating. You can see views in `src/views/` and mustache templates in `src/templates/`.

[Backbone.js](http://backbonejs.org/) handles local persistence. An adapter is used to propagate changes to and read data from Ractive templates.

[Browserify](https://github.com/substack/node-browserify) lets us use CommonJS/Modules in the browser, requiring libraries from npm.

And finally [LESS](http://lesscss.org/) & [LESS Hat](http://lesshat.madebysource.com/) are utilized to make writing CSS rules easier.

You will find tests over in `test/`, which validates *numanization* of repo names and adding of languages into a unique collection as they arrive in repos from GitHub.

##Commands

```bash
radek@helios ~/d/sourceboard> rake -T
rake build            # Build everything & minify
rake build:css        # Build the styles with LESS
rake build:js         # Build the app with Browserify
rake build:minify     # Minify build for production
rake commit[message]  # Build app and make a commit with latest changes
rake install          # Install dependencies with NPM
rake publish          # Publish to GitHub Pages
rake serve            # Start a web server on port 8080
rake test             # Run tests with mocha
rake watch            # Watch everything
rake watch:css        # Watch the styles
rake watch:js         # Watch the app
```