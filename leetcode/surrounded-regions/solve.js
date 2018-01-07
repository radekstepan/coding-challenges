const X = 'X';
const O = 'O';
const S = '*';

module.exports = b => {
  // Size.
  const h = b.length, w = h ? b[0].length : 0;

  // Minimum size check.
  if (w >= 3 && h >= 3) {
    // Up, down, left, right, mirror cell helpers.
    b.u = ([r, c]) => r ? b[r - 1][c] === O : !1;
    b.d = ([r, c]) => r + 1 !== h ? b[r + 1][c] === O : !1;
    b.l = ([r, c]) => c ? b[r][c - 1] === O : !1;
    b.r = ([r, c]) => c + 1 !== w ? b[r][c + 1] === O : !1;
    b.g = ([r, c]) => b[r][c]; // getter
    b.s = ([r, c]) => b[r][c] = S; // star

    const q = []; // queue to explore
    let rc = [0, 0]; // row, column OR false when done
    while (rc || q.length) {
      while (q.length) {
        const n = q.shift();
        if (b.g(n) === X) continue;
        const [r, c] = n;
        // Explore the surrounding cells.
        b.u(n) && b.s([r - 1, c]) && q.unshift([r - 1, c]);
        b.d(n) && b.s([r + 1, c]) && q.unshift([r + 1, c]);
        b.l(n) && b.s([r, c - 1]) && q.unshift([r, c - 1]);
        b.r(n) && b.s([r, c + 1]) && q.unshift([r, c + 1]);
      }

      const [r, c] = rc;
      // Check this cell.
      b.g(rc) === O && b.s(rc) && q.push([r, c]);
      if (!r) { // first and last row
        // Check last row.
        b.g([h - 1, c]) === O && b.s([h - 1, c]) && q.push([h - 1, c]);
        // Go right or switch sides.
        c + 1 === w ? rc = [1, 0] : rc[1] += 1;
      } else {
        // Check right column.
        b.g([r, w - 1]) === O && b.s([r, w - 1]) && q.push([r, w - 1]);
        // Go down or we are done.
        r + 1 === h ? rc = !1 : rc[0] += 1;
      }
    }

    // Turn all "*" characters into "O"s, the rest is "X".
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        b[i][j] = b[i][j] === S ? O : X;
      }
    }
  }
};
