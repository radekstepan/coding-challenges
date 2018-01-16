const t = require('tap');

const sum = require('./sum.js');

t.deepEqual(sum([1, 2], 3), [1, 2]);
t.deepEqual(sum([1, 4, 8, 7, 3, 15], 8), [1, 7]);
t.deepEqual(sum([1, -2, 3, 0, -6, 1], -6), [0, -6]);
t.deepEqual(sum([20, -13, 40], -7), undefined);
t.deepEqual(sum([1, 2, 3, 4, 1, 0], 2), [1, 1]);
t.deepEqual(sum([10, 5, 2, 3, 7, 5], 10), [3, 7]);
t.deepEqual(sum([4, -2, 3, 3, 4], 8), [4, 4]);
t.deepEqual(sum([0, 2, 0], 0), [0, 0]);
t.deepEqual(sum([5, 9, 13, -3], 10), [13, -3]);
