import { assert } from 'chai';

import store from '../src/js/stores/appStore.js';

import CONST from '../src/constants.json';

// Sets of inputs and outputs we expect.
let fixtures = {
  'fail field length': {
    'email': CONST.USER.EMAIL,
    'password': 'abc',
    'err': CONST.ERROR.FIELD_LENGTH.replace('%', 'password')
  },
  'fail email validation': {
    'email': 'abcdefgh',
    'password': CONST.USER.PASS,
    'err': CONST.ERROR.EMAIL
  },
  'fail auth': {
    'email': CONST.USER.EMAIL,
    'password': '12345678',
    'err': CONST.ERROR.AUTH
  },
  'ok': {
    'email': CONST.USER.EMAIL,
    'password': CONST.USER.PASS,
    'err': null
  }
};

for (let name in fixtures) {
  exports[`login - ${name}`] = (done) => {
    let test = fixtures[name];
    store.login(test, (err) => {
      if (test.err) {
        assert.equal(err, test.err);
      } else {
        assert.ok(err);
      }

      done();
    });
  };
}
