// Write a program that takes an array A of n numbers, and rearranges A's elements to get a new array
// B having the property that B[0] <= B[1] >= B[2] <= B[3] >= B[4] <= B[5] >= ...

function rearrange_log(A: number[]): number[] {
  A.sort();
  for (let i = 1; i < A.length - 1; i += 2) {
    [A[i], A[i + 1]] = [A[i + 1], A[i]];
  }
  return A;
}

function rearrange(A: number[]): number[] {
  for (let i = 0; i < A.length - 1; i++) {
    if (i % 2 === 0) {
      if (A[i] > A[i + 1]) {
        [A[i], A[i + 1]] = [A[i + 1], A[i]];
      }
    } else {
      if (A[i] < A[i + 1]) {
        [A[i], A[i + 1]] = [A[i + 1], A[i]];
      }
    }
  }
  return A;
}

console.log(rearrange([1]), [1]);
console.log(rearrange([2,1]), [1,2]);
console.log(rearrange([3,2,1]), [2,3,1]);
console.log(rearrange([1,2,3,4,5,6,7,8]), [1,3,2,5,4,7,6,8]);
