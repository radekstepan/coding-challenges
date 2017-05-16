const t = require('tap');
const c = require('./calc.js');

t.equal(c.seven(c.times(c.five())), 35);
t.equal(c.four(c.plus(c.nine())), 13);
t.equal(c.eight(c.minus(c.three())), 5);
t.equal(c.six(c.dividedBy(c.two())), 3);
