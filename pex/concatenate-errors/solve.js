const Immutable = require('immutable');
const { Map, List } = Immutable;

const fn = val => {
  if (typeof val === 'string') return val;

  if (List.isList(val) && typeof val.get(0) === 'string') {
    return val.toSet().join('. ') + '.';
  }
  
  return val.map(fn);
};

/**
 * Concatenate error messages and keep nested if need be.
 * 
 * @param {Map} errors map to concatenate
 * @param {Array} nested list of keys to keep nested
 */
module.exports = (errors, nested) =>
  errors.map((val, key) =>
    fn(nested.indexOf(key) >= 0 ? val : val.flatten())
  );