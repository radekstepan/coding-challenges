import _ from 'lodash';
import emailRegex from 'email-regex';

import Store from '../lib/Store.js';

import actions from '../actions/appActions.js';

import CONST from '../../constants.json';

class AppStore extends Store {

  // Initial payload.
  constructor() {
    super({
      'system': {
        'loading': false
      },
      // Awaiting input.
      'user': null
    });

    // Listen to all app actions.
    actions.onAny((obj, event) => {
      let fn = `on.${event}`.replace(/[.]+(\w|$)/g, (m, p) => p.toUpperCase());
      // Run?
      (fn in this) && this[fn](obj);
    });
  }

  login(input, cb) {
    // Check input.
    for (let field in input) {
      if (!input[field] || input[field].length < 8) {
        // `The ${field} is too short`
        return cb(CONST.ERROR.FIELD_LENGTH.replace('%', field));
      }
    }

    // Check email is email.
    if (!emailRegex({ 'exact': true }).test(input.email)) {
      return cb(CONST.ERROR.EMAIL);
    }

    // Mock xhr.
    setTimeout(this.cb(() => {
      if (input.password === CONST.USER.PASS) {
        cb(null, _.extend(input, { 'id': 1 }));
      } else {
        cb(CONST.ERROR.AUTH);
      }
    }), 1e3);
  }

  onSystemLoading(state) {
    this.set('system.loading', state);
  }

  // Log user in.
  onUserLogin(input) {
    this.login(input, (error, user) => {
      this.set('user', error ? { error } : user);
    });
  }

  // Clear user state so we can start over.
  onUserClear() {
    this.set('user', null);
  }

}

export default new AppStore();
