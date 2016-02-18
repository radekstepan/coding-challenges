#book-list

A [React](http://facebook.github.io/react/) app utilizing a [Flux](http://facebook.github.io/flux/) architecture.

- EventEmitter listeners can use RegExp paths thus allowing the use of namespaces
- routing resets the whole UI between page changes and so Components are easier to reason about (`componentDidMount`)
- store `cb` registers long-running functions and cleans them up on component unmount
- can be run (1) from NPM, (2) via GitHub Pages and (3) locally via dev server

To start a project off this repo:

```bash
$ npm install -g create-project
$ create-project <name> radekstepan/react-create-project
```

##Quickstart

```bash
$ nvm use
$ npm install
$ make watch
$ make start-dev
# book-list/0.0.0 (dev) started on port 8080
```
