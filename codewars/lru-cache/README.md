#LRU Cache

Implement a Least Recently Used (LRU) cache. An LRU cache is a key-value store that contains a set capacity for the number of elements it holds, which is stored in a property. The size should also be a property. When trying to add a new key-value pair, if `cache.size == cache.capacity`, the Least Recently Used key is removed.

Hint: You will will need to use the `Object.defineProperty` facility

Example Behavior:

```js
var store = new LRUCache(3 // Size of the cache
                        , {a: 1}); // Optional initial values for cache
store.size; // should be 1
store.capacity; // should be 3
store.a; // should be 1;
store.cache('b', 2)['b']; // should be 2
store.a = 5;
store.a; // should be 5
store.cache('c', 3).cache('d', 4).b; // should be undefined, since 'b' was removed because it was the least recently used
store.delete('d');
store.d ; // should be undefined, since 'd' was deleted
store.size ; // should be 2
store.cache('c', 4);
store.c; // should be 4
store.capacity = 1; // should resize the store to have just one element
Object.keys(store); // should be ['c']
```
