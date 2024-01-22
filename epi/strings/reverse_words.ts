// Implement a function for reversing the words in a string s.

// Modifies array with start pointers, but handles multiple spaces.
function reverse_words(s: string[]): string {
  let ss: Array<string|number> = s;
  // Location of the start of this word.
  let start = 0;
  // Truthy if we are ending a block.
  let end = false;
  let i = 0;
  while (i !== s.length) {
    if (ss[i] === " ") {
      // Next non-space after this will end this block.
      end = true;
    } else if (end) {
      ss[i - 1] = start;
      // Beginning of the next block
      start = i;
      end = false;
    }
    i++;
  }

  i--;
  let j = 0;
  let mid = Math.ceil(i - ((i - start) / 2));
  while (i) {
    // Keep swapping until we reach a mid-point.
    if (i >= mid) {
      [ss[start + j], ss[i]] = [ss[i], ss[start + j]];
      j++;
    } else if (!start) {
      // Early return.
      break;
    } else {
      // Jump to the next break.
      i = start - 1;
      start = ss[i] as number;
      j = 0;
      ss[i] = " ";
      mid = Math.floor(i - ((i - start) / 2));
    }
    i--;
  }

  return ss.reverse().join("");
}

function reverse_words_epi(s: string[]): string {
  s.reverse();
  let i = 0;
  let start = 0;
  while (true) {
    const terminate = i === s.length - 1;
    if (s[i] === " " || terminate) {
      if (!terminate) {
        i--;
      }
      const mid = Math.floor(i - ((i - start) / 2));
      let j = 0;
      while ((start + j) <= mid) {
        [s[start + j], s[i - j]] = [s[i - j], s[start + j]];
        j++;
      }
      if (terminate) {
        break;
      }
      i++;
      start = i + 1;
    }
    i++;
  }

  return s.join("");
}

console.log(reverse_words_epi(Array.from("Alice likes Bob")));
