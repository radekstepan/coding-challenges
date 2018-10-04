const Immutable = require('immutable');
const assert = require('assert');

const solve = require('./solve');

it('should transform errors', () => {
  const errors = Immutable.fromJS({
    name: ['This field is required'],
    age: ['This field is required', 'Only numeric characters are allowed'],
    urls: [{}, {}, {
      site: {
        code: ['This site code is invalid'],
        id: ['Unsupported id'],
      }
    }],
    url: {
      site: {
        code: ['This site code is invalid'],
        id: ['Unsupported id'],
      }
    },
    tags: [{}, {
      non_field_errors: ['Only alphanumeric characters are allowed'],
      another_error: ['Only alphanumeric characters are allowed'],
      third_error: ['Third error']
    }, {}, {
      non_field_errors: [
        'Minumum length of 10 characters is required',
        'Only alphanumeric characters are allowed',
      ],
    }],
    tag: {
      nested: {
        non_field_errors: ['Only alphanumeric characters are allowed'],
      },
    },
  });

  // in this specific case,
  // errors for `url` and `urls` keys should be nested
  // see expected object below
  const res = solve(errors, ['urls', 'url']).toJS();

  // console.log(JSON.stringify(res, null, 2));

  assert.deepEqual(solve(errors, ['urls', 'url']).toJS(), {
    name: 'This field is required.',
    // concatenate array into single string
    age: 'This field is required. Only numeric characters are allowed.',
    // preserve nesting
    urls: [{}, {}, {
      site: {
        // append a trailing comma
        code: 'This site code is invalid.',
        id: 'Unsupported id.',
      },
    }],
    // preserve nesting
    url: {
      site: {
        // append a trailing comma
        code: 'This site code is invalid.',
        id: 'Unsupported id.',
      },
    },
    // sort keys first
    // extract deep strings
    // filter out non-unique values 
    tags: 'Only alphanumeric characters are allowed. Third error. ' +
      'Minumum length of 10 characters is required.',
    tag: 'Only alphanumeric characters are allowed.',
  });
});

