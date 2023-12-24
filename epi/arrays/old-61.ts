// Write a function that takes an array A and an index i into A, and
// rearranges the elements such that all elements less than A[i] appear first, followed
// by elements equal to A[i], followed by elements greater than A[i]. Your algorithm
// should have 0(1) space complexity and 0(|A|) time complexity.

function run(A: number[], i: number) {
  console.log(A, A[i]);

  let smaller = 0;
  let equal = 0;
  let larger = A.length - 1;

  while (equal <= larger) {
    if (A[equal] < A[i]) {
      [A[smaller], A[equal]] = [A[equal], A[smaller]];
      smaller++;
      equal++
    } else if (A[equal] === A[i]) {
      equal++;
    } else {
      [A[larger], A[equal]] = [A[equal], A[larger]];
      larger--;
    }
  }

  return A;
}

console.log(run([3, 5, 2, 6, 8, 4, 1], 3)); // [3, 5, 2, 4, 1, 6, 8]
// console.log(run([4, 3, 2, 5, 1], 2)); // [1, 2, 4, 3, 5]
