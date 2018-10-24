const t = require('tap');

// keep swapping values
// Ω(n) when already sorted
// O(n^2) when reverse sorted
// O(1) extra space, in place
const sort = list => {
  for (let i = 0; i < list.length; i++) {
    let swapped = false;

    for (let j = 0; j < list.length; j++) {
      if (list[j] > list[i]) {
        [list[i], list[j]] = [list[j], list[i]];
        swapped = true;
      }
    }

    if (!swapped) break; // already sorted
  }

  return list;
};

t.deepEqual(sort([3, 8, 5, 4, 1, 9, -2]), [-2, 1, 3, 4, 5, 8, 9]);