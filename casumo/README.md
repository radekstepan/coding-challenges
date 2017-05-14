# Product List

Shows (upto, browser-dependent) 1m product results on one page. Example of React.js & Flux architecture.

![image](https://raw.githubusercontent.com/radekstepan/coding-challenges/master/casumo/screenshot.png)

## Quickstart

```bash
$ nvm use
$ npm install
$ npm start
# product-list/0.0.2 started on port 8080
```

## Architecture

### Router

The main router, found in `App.jsx`, serves as the main entry point to the app. The index route matches, and renders, a `ProductsPage` and a bootstrap load of initial data gets made by way of `products.load` action.

### Store

The app store, found in `stores/appStore.js` listens to all actions. On products load it makes a mock request to the server that returns a `queryId`. This could be a handle to a view in, say, CouchDB. We also get a `count` of items that will be returned.

Store also listens for product listing scroll event, `evt.scroll`, that tells the `List` of products to display new items. In case the user resizes her browser, we handle this eventuality in `evt.resize`, resetting how many products one can see on the screen at one time. The px height of each product item is set via `config.js`.

The actual products in question are generated from fake data using the `faker` library.

### ProductsPage

All pages can be found under `components/pages`. Our main products page displays a list of results when available. It also handles products sort by emitting the `products.load` action with the extra `{ sort }` parameter. This again fetches a new `queryId` in Store and the whole cycle starts again.

### List

This component, found in `components/List.jsx` displays a list of products with an appropriate offset. **Only products that can be visible are rendered**. The rest of the space is filled with large empty `<div />` elements so that the user can still scroll through the list.

Since we have a unique `queryId` for each products results set, know the size of the whole collection and know where the user is looking at, we can generate a product `id` for each item, based on their position in the list. Every time we render an individual product row we check if the product data can be found in `cache`. If not, we collect the `id` of the product to fetch. Once we get through the viewport-full of results, we make a request for all of the products that are missing, by their `id`. Once these arrive, the component gets re-rendered with the new data, now stored in a `cache`.

**A note on the size of the product list rendered**. Chrome 48.0.2564.82 Ubuntu 14.04 (64-bit) renders about 559,239 items. Beyond that and the scrollbar is truncated preventing further scrolling for more results. Firefox gives up outright and/or produces artifacts at about 200k results. In practicality, no human wants to see 1 million results all at once and we would, for example, implement search/sorting of data to aid her.

### Cache

An LRU cache deals with the issue of holding large chunks of product data. Its size can be configured and based on this setting the cache holds onto product data until they are overwritten by new ones. In an ideal Flux architecture, we would be passing the cache-resolved items as a list/object into the component, but this would result in collection duplication, thus we optimize by making a singleton cache globally available.

Note that the size of the cache needs to be at least that of the amount of products we can show on the screen.
