const t = require('tap');

// keep dividing into halves looking for less or greater value
// Θ(log(n)) best case
// O(n)	worst case
// O(n) space in a tree
const search = (list, item, min = 0, max = list.length - 1) => {
  if (min > max) return -1;

  const mid = min + Math.floor((max - min) / 2);

  if (list[mid] > item) {
    return search(list, item, min, mid - 1);
  } else if (list[mid] < item) {
    return search(list, item, mid + 1, max)
  }
  
  return mid;
};

t.equal(search([2, 3, 4, 10, 40], 3), 1);
t.equal(search([2, 3, 4, 10, 40], 5), -1);