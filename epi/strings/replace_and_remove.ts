// Consider the following two rules that are to be applied to an array of characters.
// - Replace each 'a' by two 'd's.
// - Delete each entry containing a 'b'

function replace_and_remove(s: string[], l: number): string[] {
  let nBCh = 0; // non "b" characters
  let aCh = 0; // "a" characters

  let i = 0;
  while (i !== l) {
    if (s[i] === a) {
      aCh++;
    } else if (s[i] !== b) {
      nBCh++;
    }
    i++;
  }

  let j = nBCh + aCh * 2;
  const r = new Array(j);
  while (i) {
    i--;
    if (s[i] === a) {
      r[--j] = d;
      r[--j] = d;
    } else if (s[i] !== b) {
      r[--j] = s[i];
    }
  }

  return r;
}

function replace_and_remove_epi(s: string[], l: number): string[] {
  let aCh = 0; // "a" characters
  let j = 0; // write index
  let i = 0;
  // Forward: get a count of "a" and delete all "b".
  while (i !== l) {
    if (s[i] !== b) {
      s[j] = s[i];
      j++;
    }
    if (s[i] === a) {
      aCh++;
    }
    i++;
  }

  // Backward: replace "a" with "dd", copy the rest.
  i = j + aCh;
  s.length = i; // update the final size
  while (j) {
    j--;
    if (s[j] === a) {
      s[--i] = d;
      s[--i] = d;
    } else {
      s[--i] = s[j];
    }
  }

  return s;
}

const a = 'a', b = 'b', c = 'c', d = 'd';

console.log(replace_and_remove_epi([a,c,d,b,b,c,a], 7));
console.log(replace_and_remove_epi([b,b,b,b], 3));
console.log(replace_and_remove_epi([b,c,b,c], 3));
console.log(replace_and_remove_epi([a,a,a,a], 2));

// You have an array C of characters. The characters may be letters, digits, blanks, and
// punctuation. The telex-encoding of the array C is an array T of characters in which letters, digits,
// and blanks appear as before, but punctuation marks are spelled out. For example, telex-encoding
// entails replacing the character "." by the string "DOT", the character "," by "COMMA", the
// character "?" by "QUESTION MARK", and the character "!" by "EXCLAMATION MARK".
// Design an algorithm to perform telex-encoding with O(1) space.

const R = {
  ",": "COMMA",
  "?": "QUESTION MARK",
  "!": "EXCLAMATION MARK",
  ".": "FULL STOP"
};

function telex_encoding(C: string[]) {
  let i = 0;
  // Get the array size we'll need.
  let s = 0;
  while (i !== C.length) {
    const r = R[C[i]];
    if (r) {
      s += r.length;
    }
    s++;
    i++;
  }

  // Fill from the back.
  while (i) {
    i--;
    const r = R[C[i]];
    if (r) {
      let j = r.length;
      while (j) {
        j--;
        C[--s] = r.charAt(j);
      }
      C[--s] = " ";
    } else {
      C[--s] = C[i];
    }
  }

  return C;
}

console.log(telex_encoding(Array.from("A, B C?!")).join(""));

// Write a program which merges two sorted arrays of integers, A and B. Specifically, the
// final result should be a sorted array of length m + n, where n and m are the lengths of A and B,
// respectively. Use O(1) additional storage-assume the result is stored in A, which has sufficient
// space. These arrays are C-style arrays, i.e., contiguous preallocated blocks of memory.

function merge_sorted_arrays(A: number[], B: number[]): number[] {
  let iA = A.length - 1;
  let iB = B.length - 1;
  let w = A.length + B.length - 1;
  // Merge both arrays from the end keeping track of write index.
  while (w !== -1) {
    if (B[iB] > (A[iA] ?? -Infinity)) {
      A[w--] = B[iB--];
    } else {
      A[w--] = A[iA--];
    }
  }
  return A;
}

console.log(merge_sorted_arrays([1,2], [0,3,4]));
