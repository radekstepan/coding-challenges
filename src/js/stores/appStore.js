import _ from 'lodash';

import Store from '../lib/Store.js';

import actions from '../actions/appActions.js';

import config from '../../config.js';

class AppStore extends Store {

  // Initial payload.
  constructor() {
    super({
      'system': {
        'loading': false
      }
    });

    // Listen to all app actions.
    actions.onAny((obj, event) => {
      let fn = `on.${event}`.replace(/[.]+(\w|$)/g, (m, p) => p.toUpperCase());
      // Run?
      (fn in this) && this[fn](obj);
    });
  }

  onSystemLoading(state) {
    this.set('system.loading', state);
  }

}

export default new AppStore();
