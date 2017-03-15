var ava = require('ava');

var LRUCache = require('./cache.js');

var store = new LRUCache(3, {a: 1});

ava.serial('LRUCache', function(t) {
  t.deepEqual(Object.getOwnPropertyNames(store), ['a'], "Object.getOwnPropertyNames(store)");
  t.is(store.size, 1, 'store.size');
  t.is(store.capacity, 3, 'store.capacity');
  t.is(store.a, 1, 'store.a');
  t.is(store.cache('b', 2)['b'], 2, 'store.b');
  store.a = 5;
  t.is(store.a, 5, 'store.a');
  store.cache('c', 3).cache('d', 4);
  t.is(store.b, undefined, 'store.b');
  t.is(store.c, 3, 'store.c');
  t.is(store.d, 4, 'store.d');
  t.is(store.a, 5, 'store.a');
  t.is(store.size, 3, 'store.size');
  t.is(store.delete('delete'), false, "store.delete('delete')");
  t.is(store.delete('d'), true, "store.delete('d')");
  t.is(store.d, undefined, 'store.d');
  t.is(store.size, 2, 'store.size');
  store.cache('c', 4);
  t.is(store.c, 4, 'store.c');
  store.capacity = 1;
  t.is(Object.getOwnPropertyNames(store).length, 1, "Object.getOwnPropertyNames(store).length");
  t.is(Object.getOwnPropertyNames(store)[0], 'c', "Object.getOwnPropertyNames(store).length");
});
