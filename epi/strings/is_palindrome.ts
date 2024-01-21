// Implement a function which takes as input a string s and returns true if s is a palindromic string.

const ch_A = 'A'.charCodeAt(0);
const ch_Z = 'Z'.charCodeAt(0);
const ch_a = 'a'.charCodeAt(0);
const ch_z = 'z'.charCodeAt(0);

function is_palindrome(s: string): boolean {
  let i = 0;
  let j = s.length - 1;

  while (i < j) {
    let chI = s.charCodeAt(i);
    if (chI >= ch_a && chI <= ch_z) {
      chI -= ch_a - ch_A;
    } else if (chI < ch_A || chI > ch_Z) {
      i++;
      continue;
    }
    let chJ = s.charCodeAt(j);
    if (chJ >= ch_a && chJ <= ch_z) {
      chJ -= ch_a - ch_A;
    } else if (chJ < ch_A || chJ > ch_Z) {
      j--;
      continue;
    }

    if (chI !== chJ) {
      return false;
    }

    i++;
    j--;
  }

  return true;
}

console.log(is_palindrome("aa"));
console.log(is_palindrome("ab"));
console.log(is_palindrome("aaa"));
console.log(is_palindrome("aba"));
console.log(is_palindrome("radar"));
console.log(is_palindrome("radek"));
console.log(is_palindrome("A man, a plan, a canal, Panama"));
