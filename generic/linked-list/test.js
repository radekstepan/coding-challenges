const t = require('tap');
const List = require('./list.js');

const l1 = new List();

l1.add('A').add('B').add('C');

t.equal(l1.link('B', 'C'), false, 'B and C were not linked');
t.deepEqual(l1.walk('A'), [ 'A' ], 'A, walk');
t.deepEqual(l1.walk('B'), [ 'B', 'C' ], 'B walk');
t.deepEqual(l1.walk('C'), [ 'C' ], 'C walk');
t.deepEqual(l1.get('B'), { key: 'B', prev: null, next: 'C' }, 'B node');
t.deepEqual(l1.get('C'), { key: 'C', prev: 'B', next: null }, 'C node');

t.equal(l1.link('A', 'B'), false, 'A and B were not linked');
t.deepEqual(l1.walk('A'), [ 'A', 'B', 'C' ], 'A walk');
t.deepEqual(l1.get('A'), { key: 'A', prev: null, next: 'B' }, 'A node');
t.deepEqual(l1.get('B'), { key: 'B', prev: 'A', next: 'C' }, 'B node');
t.deepEqual(l1.get('C'), { key: 'C', prev: 'B', next: null }, 'C node');

t.equal(l1.link('A', 'C'), true, 'A and C were linked');

const l2 = new List(function(a, b) {
  return parseInt(a, 10) < parseInt(b, 10);
});

l2.link('10', '2');
t.deepEqual(l2.get('2'), { key: '2', prev: null, next: '10' }, '2, 10 integer key comparison');

const l3 = new List(function(a, b) {
  return parseInt(a, 10) < parseInt(b, 10);
});

l3.link('1', '5');
l3.link('3', '4');
l3.link('2', '7');
l3.link('5', '6');
l3.link('5', '4');

t.deepEqual(l3.walk('1'), [ '1', '2', '3', '4', '5', '6', '7' ], 'integer walk');
