const t = require('tap');

const sort = require('./sort.js');

t.deepEqual(sort([
  [1,2],
  [4,3]
]), [1,2,3,4]);

t.deepEqual(sort([
  [1,2,3],
  [4,5,6],
  [7,8,9]
]), [1,2,3,6,9,8,7,4,5]);
