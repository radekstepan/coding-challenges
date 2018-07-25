const t = require('tap');

const evaluate = require('./evaluate.js');

t.equal(evaluate("9+6-12"), 3);
t.equal(evaluate("2+1-3+4-7+6-5"), -2);
t.equal(evaluate("(1+2)"), 3);
t.equal(evaluate("22+(6-4)"), 24);
t.equal(evaluate("5+16-((9-6)-(4-5))"), 17);