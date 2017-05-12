const t = require('tap');
const List = require('./list.js');

const l = new List();

l.add('A').add('B').add('C');

t.equal(l.link('B', 'C'), false, 'B and C were not linked');
t.deepEqual(l.walk('A'), [ 'A' ], 'A, walk');
t.deepEqual(l.walk('B'), [ 'B', 'C' ], 'B walk');
t.deepEqual(l.walk('C'), [ 'C' ], 'C walk');
t.deepEqual(l.get('B'), { key: 'B', prev: null, next: 'C' }, 'B node');
t.deepEqual(l.get('C'), { key: 'C', prev: 'B', next: null }, 'C node');

t.equal(l.link('A', 'B'), false, 'A and B were not linked');
t.deepEqual(l.walk('A'), [ 'A', 'B', 'C' ], 'A walk');
t.deepEqual(l.get('A'), { key: 'A', prev: null, next: 'B' }, 'A node');
t.deepEqual(l.get('B'), { key: 'B', prev: 'A', next: 'C' }, 'B node');
t.deepEqual(l.get('C'), { key: 'C', prev: 'B', next: null }, 'C node');

t.equal(l.link('A', 'C'), true, 'A and C were linked');
