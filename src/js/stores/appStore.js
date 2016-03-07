import _ from 'lodash';
import emailRegex from 'email-regex';

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

  // A mock xhr that checks email & password on the server.
  xhr(user, cb) {
    setTimeout(() => {
      if (user.password === 'password') {
        cb('You are not authorized to view this page');
      } else {
        cb(null, _.extend(user, { 'id': 1 }));
      }
    }, 1e3);
  }

  onSystemLoading(state) {
    this.set('system.loading', state);
  }

  onUserLogin(input) {
    let done = (err, user) => {
      if (err) {
        this.set('user.error', err);
      } else {
        this.set('user', user);
      }
    };

    // Check input.
    for (let field in input) {
      if (!input[field] || input[field].length < 8) {
        return done(`The ${field} is too short`);
      }
    }

    // Check email is email.
    if (!emailRegex({ 'exact': true }).test(input.email)) {
      return done('The email is not valid');
    }

    // Xhr credentials check.
    this.xhr(input, this.cb(done));
  }

}

export default new AppStore();
