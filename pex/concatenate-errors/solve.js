const Immutable = require('immutable');

const { List } = Immutable;
const { Iterable } = Immutable;

const join = val =>
  List.isList(val) && typeof val.get(0) === 'string' ?
    val.toSet().join('. ') + '.' : val.map(join);

const flatten = (list, val) =>
  Iterable.isIterable(val) ?
    val.reduce(flatten, list) : list.push(val);

/**
 * Concatenate error messages and keep nested if need be.
 * 
 * @param {Map} errors map to concatenate
 * @param {Array} nested list of keys to keep nested
 */
module.exports = (errors, nested) =>
  errors.map((val, key) =>
    join(nested.indexOf(key) >= 0 ? val : flatten(new List, val))
  );