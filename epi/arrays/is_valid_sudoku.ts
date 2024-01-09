// Check whether a 9 x 9 2D array representing a partially completed Sudoku is valid. Specifically,
// check that no row, column, or 3 x 3 2D subarray contains duplicates. A O-value in the 2D array
// indicates that entry is blank; every other entry is in [1,9].

function is_valid_sudoku(S: number[][]): boolean {
  let r = 0;
  let c = 0;
  while (r !== 9) {
    const s = new Set();
    c = 0;
    while (c !== 9) {
      const e = S[r][c];
      if (e === 0) {
        c++;
        continue;
      }
      if (s.has(e)) {
        return false;
      }
      s.add(e);

      c++;
    }

    r++;
  }

  r = 0;
  c = 0;
  while (c !== 9) {
    const s = new Set();
    r = 0;
    while (r !== 9) {
      const e = S[r][c];
      if (e === 0) {
        r++;
        continue;
      }
      if (s.has(e)) {
        return false;
      }
      s.add(e);

      r++;
    }

    c++;
  }

  return true;
}

const S = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

console.log(is_valid_sudoku(S));
