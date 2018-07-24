const t = require('tap');

const solve = require('./solve.js');

t.equal(solve(
  [-1, 0, 1, 3]),
  "-1-1,3"
);
t.equal(solve(
  [17, 18, 19, 20]),
  "17-20"
);
t.equal(solve(
  [-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]),
  "-6,-3-1,3-5,7-11,14,15,17-20"
);
