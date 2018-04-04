# [Help Scout Book Store](https://helpscout-store.netlify.com) Engineering Project

A client-side book listing CR/D SPA in React.

![Screencap](https://goo.gl/Jdz6dZ)

## Quickstart

```bash
$ nvm use # optional
$ npm i
$ npm start # http://localhost:3000
```

## Features
- Listing of books in a responsive grid/list view (linkable).
- Viewing a book (linkable). Implemented as an async action w/ loading spinner.
- Adding/removing of books.
- Sorting of books by either title/author.

## Architecture
*tl;dr: React/Rematch (Redux) app bootstrapped using `create-react-app` with Sass
styles and a CSS Grid-based ui.*

### Libraries/Frameworks
*tl;dr: Separation of concerns.*

I chose React/Redux over Backbone/Marionette due to its greater separation
between the ui (render/update) and data/model layer. The project was bootstrapped
using [create-react-app](https://github.com/facebook/create-react-app) which
provides preconfigured Webpack, Babel, ESLint and others out of the box.

### Models
*tl;dr: One-way data-flow and im/pure functions.*

[Rematch](https://github.com/rematch/rematch) is used as a wrapper on top of
Redux to reduce the amount of boilerplate code and increase readability of
model-related code. As an example, `src/models/books.js` shows an asynchronous
impure function `resolveBook` using async/await.

Some example books are preloaded from `src/data/books.json`.

This is the only part of the app that has a single test resulting in an
overall coverage of 2%...

### Main Application & Routes

The main application entry-point lives in `src/App.js`. The `render` function
displays the currently active container/route. To trigger a route change we call
the `navigate` action on the store which updates the app using pushState (
[history](https://github.com/reacttraining/history)) and changes the current route
in the store if it matches any of the paths in `src/models/router.js`. This way
route changes behave like any other app input/state-change.

### Containers & Components

Container is just another name for a React component. The main difference is that
all components are dumb, while containers handle user events as well.

As an example, `src/containers/ViewBook.js` calls the store action `resolveBook`
after it gets rendered and handles the `onRemoveBook` user event.

On the other hand, `src/component/Book.js` is a dumb component that purely
displays a single book.

### Styles
*tl;dr: CSS Grid used for both table and grid layouts.*

The main (self-imposed) requirement for the styles was to be able to reuse as
much code for both the responsive table and grid books listing ui. I chose to
explore [CSS Grid](https://tympanus.net/codrops/css_reference/grid/)
because it was new to me and fits the criteria. You can see an example use of
`display: grid` in `src/styles/app.scss` under the `.books` selector.

## Postmortem
*tl;dr: Project was delivered over-schedule at 10:50hrs and is not fit for
production. It was fun though.*

The project was delivered over-schedule. I attribute it to two factors:
1. Choosing to go deep on and learning about `CSS Grid` rather than delivering
the broader strokes.
2. Seeing all the work involved and knowing my current skill level, it would be
a challenge for me to deliver under 6hrs "all-in" even second time round.

There are so many things to consider when developing a production-ready app. It
all depends on how the app is intended to be used and by whom. For some of the
reasons why the app is **not production ready** yet see below.

### Performance
*tl;dr: Improve book iteration & sort.*

To iterate over and sort a list of books each time a component re-renders is
horribly inefficient. There's [reselect](https://github.com/reactjs/reselect) for
that. It is unclear how many books would be expected to be rendered in the list
and what the backend is like. Should we even cache content on the client? We can
use e.g. [Falcor](https://github.com/Netflix/falcor) or GraphQL to minimize
over-fetching.

Server-side rendering might have to be implemented as SEO is critical for an
e-commerce store!

### Styles
*tl;dr: Check CSS browser support and build responsive.*

In a larger project, it might be advantageous to refactor the styles and keep
them tied to each component to balance the needs of designers and developers.
Perhaps we already have a set of standardized components?

Depending on who our target audience is, `CSS Grid` might not work for us as it
is [not supported](https://caniuse.com/#search=CSS%20Grid)), for example, by UC
Browser which represents 8% of the worldwide market. Polyfills could be added,
but they could result in a janky experience.

It would be advantageous to use responsive CSS units instead of pixel-based ones,
especially if we truly want our app to be responsive.

### Browser Support
*tl;dr: Make use of polyfills.*

No browser tests have been done. Polyfills could be added at
[build time](https://github.com/ai/browserslist) or [runtime](https://polyfill.io).
As an example, `URLSearchParams` are
[not supported in IE](https://caniuse.com/#search=URLSearchParams) at all.

### User Experience
*tl;dr: Serve the target audience.*

The app doesn't have any [blank slate](https://basecamp.com/books/Getting%20Real.pdf),
notifications, links to help, error pages etc. If we are replacing an existing
app, we'll also have to make sure that no links break and deployments result in
no downtime.

Who is our target audience?
- Locale requirements?
- Laws, e.g. cookies?
- Accessibility, e.g. ARIA, WCAG contrast?
- Internal/mobile/desktop/kiosk outdoors?

### Maintenance
*tl;dr: Support the lifetime of the product.*

Who is expected to maintain the app? Do we need to write developer/support team
docs? Do we have monitoring setup when this goes down? What about analytics?

What is the company standard for linting and coding style? Eg having `propTypes`
to enforce prop rules around component interfaces.
