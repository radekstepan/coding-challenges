const t = require('tap');
const MySet = require('./set.js');

const s = new MySet();

s.add('A').add('B').add('C');

t.equal(s.link('B', 'C'), false, 'B and C were not linked');
t.equal(s.link('A', 'B'), false, 'A and B were not linked');
t.equal(s.link('A', 'C'), true, 'A and C were linked');
