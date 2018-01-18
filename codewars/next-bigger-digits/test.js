const t = require('tap');

const solve = require('./solve.js');

t.equal(solve(12), 21);
t.equal(solve(513), 531);
t.equal(solve(2017), 2071);
t.equal(solve(414), 441);
t.equal(solve(144), 414);
t.equal(solve(8965), 9568);
t.equal(solve(20709452), 20709524);
t.equal(solve(59853), 83559);
