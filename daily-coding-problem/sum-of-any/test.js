const t = require('tap');

const solve = require('./solve.js');

t.equal(solve([10, 15, 3, 7], 17), true);
t.equal(solve([10], 10), false);
t.equal(solve([], null), false);
t.equal(solve([-2, 1, 3], 1), true);