const t = require('tap');

const sum = require('./sum.js');

// Part 1 - original.
t.equal(sum([[1, 1], 2, [1, 1]]), 10);
t.equal(sum([1, [4, [6]]]), 27);
t.equal(sum([1, 2]), 3);
// Part 2 - reverse.
t.equal(sum([[1, 2]], !0), 3);
t.equal(sum([1, [2, 3]], !0), 7);
t.equal(sum([[1, 1], 2, [1, 1]], !0), 8);
t.equal(sum([3, [2, 2], 3, [2, [1]]], !0), 31);
