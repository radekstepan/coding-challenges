const t = require('tap');

const solve = require('./solve.js');

t.deepEqual(solve([1, 2, 3, 4, 5]), [120, 60, 40, 30, 24]);
t.deepEqual(solve([3, 2, 1]), [2, 3, 6]);
t.deepEqual(solve([7, -1]), [-1, 7]);
t.deepEqual(solve([0]), undefined);