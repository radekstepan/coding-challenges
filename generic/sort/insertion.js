const t = require('tap');

// insert next value into sorted part of the list
// Ω(n) if already sorted
// O(n^2) if reverse order
// O(1) extra space, in place
const sort = list => {
  for (let i = 1; i < list.length; i++) {
    let j = i - 1;
    while (j >= 0 && list[i] < list[j]) {
      j--;
    }
    list.splice(j + 1, 0, list[i]);
    list.splice(i + 1, 1);
  }

  return list;
};

t.deepEqual(sort([3, 8, 5, 4, 1, 9, -2]), [-2, 1, 3, 4, 5, 8, 9]);