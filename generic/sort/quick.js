const t = require('tap');

// split into lists of 1 elements by picking a pivot and splitting into <= and > than pivot
// Ω(n log(n)) like merge sort
// O(n^2) worst case
// O(log(n)) extra space
const sort = list => {
  if (!list.length) return list;

  const a = [], b = [];

  for (let i = 1; i < list.length; i++) {
    if (list[i] <= list[0]) { // pivot
      a.push(list[i]);
    } else {
      b.push(list[i]);
    }
  }

  return sort(a).concat(list[0], sort(b));
};

t.deepEqual(sort([3, 8, 5, 4, 1, 9, -2]), [-2, 1, 3, 4, 5, 8, 9]);