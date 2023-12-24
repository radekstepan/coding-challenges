// Design an algorithm that takes a sequence of n three-dimensional
// coordinates to be traversed, and returns the minimum battery capacity
// needed to complete the journey. The robot begins with a fully charged battery.

// x - horizontal
// y - vertical
// z - elevation

type C = [number, number, number];

function run(A: C[]) {
  let p = A[0][2]; // prev
  let f = 0; // fuel
  let m = 0; // max fuel
  let i = 1;
  while (i < A.length) {
    f += A[i][2] - p;
    m = Math.max(m, f);
    f = Math.max(0, f);
    p = A[i][2];
    i++;
  }
  return m;
}

console.log(run([[0,0,0], [1,1,0], [2,2,0], [3,3,0]]));
console.log(run([[0,0,0], [1,1,1], [2,2,2], [3,3,1], [4,4,0]]));
console.log(run([[0,0,0], [1,2,3], [2,3,1], [3,4,5], [4,5,2]]));
console.log(run([[0,0,5], [1,1,3], [2,2,6]]));
