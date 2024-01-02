// Write a program that takes as input a positive integer n and a size k <= n, and returns a size-k subset
// of {0, 1, 2, ..., n - 1}. The subset should be represented as an array. All subsets should be equally
// likely and, in addition, all permutations of elements of the array should be equally likely. You may
// assume you have a function which takes as input a nonnegative integer t and returns an integer in
// the set {0, 1, ..., t - 1} with uniform probability.

function rand(a: number, b: number): number {
  return a + Math.floor(Math.random() * (b - a + 1));
}

function random_subset(range: number, size: number): number[] {
  // Initialize a map to keep track of element swaps. This map will record
  //  the current position of elements after they've been moved.
  const M = new Map<number, number>();

  let i = 0;
  while (i < size) {
    const r = rand(i, range - 1);
    
    // Check if we have previously swapped the element at index r. If so, get
    //  its new position. If not, the element remains at its original position.
    const rV = M.has(r) ? M.get(r) : r;
    // Similarly, check if we have previously swapped the element at index i.
    const iV = M.has(i) ? M.get(i) : i;

    // Swap the elements by updating their positions in the map. The element
    //  originally at position r is moved to position i, and vice versa.
    M.set(r, iV);
    M.set(i, rV);

    i++;
  }

  return new Array(size).fill(1).map((_, i) => M.get(i));
}

console.log(random_subset(4, 2));

const S = 10000;
const P = new Map<string, number>();
for (let i = 0; i < S; i++) {
  const R = random_subset(4, 2);
  if (new Set(R).size !== 2) {
    console.log(R);
    throw new Error("Elements repeat themselves");
  }
  const k = R.join('.');
  const c = P.get(k) ?? 0;
  P.set(k, c + 1);
}
console.log(Array.from(P.values()));
