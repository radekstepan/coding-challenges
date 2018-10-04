Requirements
------------

* Immutable.js
* Mocha (optional, just to run a test)

Imagine that you submit a html form via REST API. This form has multiple errors, the details about errors are returned in a single object. The errors within this object can be nested. The object keys represent `field` in the html form.
Every field can have one or more errors and the fields can be nested. The errors are always listed as an array (even if there's only single error).

Your objective is to concatenate all errors to a single string for each object key separated by dot `.`.

Example:

```js
// original error object
let error = {
  name: ['This field is required', 'Another error'],
  age: ['Only numeric characters are allowed'],
};

// transformed
error = {
  name: 'This field is required. Another error.',
  age: 'Only numeric characters are allowed.'
};
```

In case the errors are nested, you need to make sure that concatenated string won't have recurring errors. The nested structures could be both objects and arrays. The nested structures are not preserved, transformed object should have flat structure by default.

Example:
```js
// original error object
let error = {
  name: {
    first: ['Only alphanumeric characters are allowed'],
    last: ['Only alphanumeric characters are allowed'],
  },
  names: [{}, {
    first: ['Only alphanumeric characters are allowed'],
    last: ['Only alphanumeric characters are allowed'],
  }, {}],
};

// transformed
error = {
  name: 'Only alphanumeric characters are allowed.',
  names: 'Only alphanumeric characters are allowed.',
};
```

Sometimes, preserving nested structures could be useful when rendering errors on the screen. One of your implemented functions should take one or more arguments that specify the keys of error object for which you want to preserve the nested structure.

For example, if you want to preserve nested structure for field `names`, the transformed object should look like:
```js
error = {
  name: 'Only alphanumeric characters are allowed.',
  names: [{}, {
    first: 'Only alphanumeric characters are allowed.',
    last: 'Only alphanumeric characters are allowed.',
  }, {}],
```

And that's it. In `test.js` file you'll find a test that you need to pass. Add your implemented functions to the file and replace value of `result` variable on line 46.

Challenge rules:
* You need to use Immutable.js, see the `errors` variable in the `test.js`, it is Immutable.Map, the transformed result should also be Immutable.Map
* Use functional programming
* You may use only pure functions, no side effects are allowed
* You may not use any variables (no `var`, `let` or `const`, only function arguments are allowed)
* The test will be run with Node v8.4