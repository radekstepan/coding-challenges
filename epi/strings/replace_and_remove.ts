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
