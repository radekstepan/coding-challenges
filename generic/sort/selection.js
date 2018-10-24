const t = require('tap');

// find next smallest value in the remainder of the list
// O(n^2) always
// O(1) extra space, in place
const sort = list => {
  for (let i = 0; i < list.length; i++) {
    let min = i;
    for (let j = i + 1; j < list.length; j++) {
      if (list[j] < list[min]) min = j;
    }
    list.splice(i, 0, list[min]); // insert into position
    list.splice(min + 1, 1); // remove old reference
  }

  return list;
};

t.deepEqual(sort([3, 8, 5, 4, 1, 9, -2]), [-2, 1, 3, 4, 5, 8, 9]);