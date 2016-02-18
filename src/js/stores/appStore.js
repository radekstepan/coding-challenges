import _ from 'lodash';
import faker from 'faker';

import Store from '../lib/Store.js';

import actions from '../actions/appActions.js';

import cache from '../models/cache.js';

import config from '../../config.js';

class AppStore extends Store {

  // Initial payload.
  constructor() {
    super({
      'system': {
        'loading': false
      },
      'window': {
        // Height of one item.
        'item': config.ITEM_HEIGHT,
        // Offset from the top.
        'offset': 0
      },
      // Current products view query.
      'query': null
    });

    // Listen to all app actions.
    actions.onAny((obj, event) => {
      let fn = `on.${event}`.replace(/[.]+(\w|$)/g, (m, p) => p.toUpperCase());
      // Run?
      (fn in this) && this[fn](obj);
    });

    // When query resets, reset the cache and window offset position.
    this.on('query', (val) => {
      if (val != null) return;
      // Reset the cache.
      cache.reset();
      // Reset the scroll position.
      this.set('window.offset', 0, false);
    });

    // Debounce products getter.
    this.onProductsGet = _.debounce(this.onProductsGet, config.SCROLL_DEBOUNCE);

    if (!process.browser) return;

    // Set initial window dimensions and watch for resize.
    this.evtResize();
    window.addEventListener("resize", this.evtResize.bind(this));
  }

  evtResize() {
    let height = window.innerHeight - config.TOP_OFFSET;
    // Available space.
    this.set('window.height', height);
    // How many items can we show on one screen?
    this.set('window.count', Math.ceil(height / config.ITEM_HEIGHT));
  }

  // A mock xhr returning a query id of say CouchDB backend.
  xhrQuery(params, cb) {
    setTimeout(_.partial(cb, null, {
      'queryId': _.uniqueId() + faker.internet.password(),
      'count': _.random(5e5, 1.5e6)
    }), 1e3);
  }

  // A mock xhr returning a item by id.
  xhrItems(ids, cb) {
    setTimeout(_.partial(cb, null, _.map(ids, (id) => {
      return {
        'id': id,
        'name': faker.commerce.productName(),
        'brand': faker.company.companyName(),
        'color': faker.commerce.color(),
        'material': faker.commerce.productMaterial(),
        'price': '€' + faker.commerce.price()
      }
    })), 100);
  }

  // Load products.
  onProductsLoad(params) {
    // No query atmo.
    this.set('query', null);

    // Fetch the current view handle and item count.
    this.xhrQuery(params, this.cb((err, res) => {
      if (err) throw err;

      // Save the query id.
      if (params) _.extend(res, { params });
      this.set('query', res);
    }));
  }

  // Fetch products by their id (debounced).
  onProductsGet(ids) {
    if (!ids.length) return;

    let cb = this.cb((err, arr) => {
      if (err) throw err;
      _.each(arr, (item) => {
        cache.set(item.id, item);
        // Emit a single event saying we have these items now.
        this.emit(`$cache.${item.id}`, item.id);
      });
    });

    // Xhr then.
    this.xhrItems(ids, cb);
  }

  onSystemLoading(state) {
    this.set('system.loading', state);
  }

}

export default new AppStore();
