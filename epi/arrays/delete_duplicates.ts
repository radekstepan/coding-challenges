// Write a program which takes as input a sorted array and updates it so that
// all duplicates have been removed and the remaining elements have been
// shifted left to fill the emptied indices. Return the number of valid elements.
// Many languages have library functions for performing this operation you cannot
// use these functions.
// There is an O(n) time and O(1) space solution.

function delete_duplicates(A: number[]): number[] {
  let i = 0; // index forward
  let w = 0; // write index
  let l = null; // last
  while (i < A.length) {
    // If it differs, save it.
    if (l !== A[i]) {
      A[w] = A[i];
      l = A[i];
      w++;
    }

    i++;
  }

  A.length = w;
  return A;
}

console.log(delete_duplicates([2,3,5,5,7,11,11,11,13]));

// Implement a function which takes as input an array and a key, and updates the array
// so that all occurrences of the input key have been removed and the remaining elements
// have been shifted left to fill the emptied indices. Return the number of remaining
// elements. There are no requirements as to the values stored beyond the last valid
// element.

function delete_key_duplicates(A: number[], key: number): number[] {
  let i = 0; // index forward
  let s = 0; // shift index
  while (i < A.length) {
    // Find the key.
    if (A[i] === key) {
      s++;
    } else if (s) {
      // Only write if it's necessary.
      A[i - s] = A[i];
    }

    i++;
  }

  A.length = A.length - s;
  return A;
}

console.log(delete_key_duplicates([2,3,5,5,7,11,11,11,13], 5));

// Write a program which takes as input a sorted array A of integers and a positive
// integer m, and updates A so that if x appears m times in A it appears exactly
// min(2, m) times in A. The update to A should be performed in one pass, and no
// additional storage may be allocated.

// unit test
function delete_times_duplicatesU(A: number[], m: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < A.length; i++) {
    const count = map.get(A[i]) ?? 0;
    map.set(A[i], count + 1);
  }

  let result = [];
  for (const [num, count] of map) {
    result = result.concat(Array(count >= m ? Math.min(2, m) : count).fill(num));
  }

  return result;
}

function delete_times_duplicates(A: number[], m: number): number[] {
  const a = Math.min(2, m); // count to allow
  let c = 0; // same character counter
  let l = A[0]; // the last character
  let w = 0; // write index

  let i = 0;
  while (i < A.length) {
    // Update the duplicate counter.
    if (A[i] === l) {
      c++;
    } else {
      // Adjust the write index back.
      if (c >= m) {
        w -= c - a;
      }
      // Reset.
      l = A[i];
      c = 1;
    }
    // Write the number.
    A[w] = A[i];

    w++;
    i++;
  }

  if (c >= m) {
    w -= c - a;
  }

  A.length = w;

  return A;
}

console.log(delete_times_duplicates([], 1));
console.log(delete_times_duplicates([], 2));
console.log(delete_times_duplicates([2], 1));
console.log(delete_times_duplicates([2], 2));
console.log(delete_times_duplicates([2,3], 1));
console.log(delete_times_duplicates([2,3], 2));
console.log(delete_times_duplicates([2,3,3], 1));
console.log(delete_times_duplicates([2,3,3], 2));
console.log(delete_times_duplicates([2,3,3], 3));
console.log(delete_times_duplicates([2,2,2,3,3,4], 1));
console.log(delete_times_duplicates([2,2,2,3,3,4], 2));
console.log(delete_times_duplicates([2,2,2,3,3,4], 3));
console.log(delete_times_duplicates([2,3,5,5,7,11,11,11,11,13,13,13,13,14,14,15], 1));
console.log(delete_times_duplicates([2,3,5,5,7,11,11,11,11,13,13,13,13,14,14,15], 2));
console.log(delete_times_duplicates([2,3,5,5,7,11,11,11,11,13,13,13,13,14,14,15], 3));
console.log(delete_times_duplicates([2,3,5,5,7,11,11,11,11,11,11,11,13,13,13,13,14,14], 1));
console.log(delete_times_duplicates([2,3,5,5,7,11,11,11,11,11,11,11,13,13,13,13,14,14], 2));
console.log(delete_times_duplicates([2,3,5,5,7,11,11,11,11,11,11,11,13,13,13,13,14,14], 3));
