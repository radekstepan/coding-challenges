// Given an array A of n elements and a permutation P, apply P to A.

function apply_permutation(A: number[], P: number[]): number[] {
  for (let i = 0; i < A.length; i++) {
    while (P[i] !== i) {
      // Swap the elements in array A
      [A[i], A[P[i]]] = [A[P[i]], A[i]];

      // Swap the elements in permutation P and move to the next position
      let a = P[i];
      let b = P[P[i]];
      P[i] = b;
      P[a] = a;
    }
  }

  return A;
}

console.log(apply_permutation([1,2,3,4], [2,0,1,3]), [2,3,1,4]);
// console.log(apply_permutation([1,2,3,4,5], [2,0,1,3,4]), [2,3,1,4,5]);
// console.log(apply_permutation([1,2,3,4], [2,1,3,0]), [4,2,1,3]);
// console.log(apply_permutation([1,2,3,4], [3,0,2,1]), [2,4,3,1]);
