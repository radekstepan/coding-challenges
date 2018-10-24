const t = require('tap');

const merge = (a, b) => {
  const res = [];
  let i = 0, j = 0; // index in left and right
  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) {
      res.push(a[i]);
      i++;
    } else {
      res.push(b[j]);
      j++
    }
  }

  return res.concat(a.slice(i)).concat(b.slice(j)); // add the tails
};

// split into lists of 1 element and keep merging back taking from the two subsets recursively
// O(n log(n)) always
// O(n) extra space; splits list into lists of 1 element
const sort = list => {
  if (list.length === 1) return list;

  const mid = Math.floor(list.length / 2); // pick middle point
  
  return merge(
    sort(list.slice(0, mid)),
    sort(list.slice(mid))
  );
};

t.deepEqual(sort([3, 8, 5, 4, 1, 9, -2]), [-2, 1, 3, 4, 5, 8, 9]);