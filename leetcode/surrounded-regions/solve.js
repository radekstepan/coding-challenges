const X = 'X';
const O = 'O';
const S = '*';

module.exports = b => {
  // Size.
  const h = b.length, w = h ? b[0].length : 0;

  // Minimum size check.
  if (w >= 3 && h >= 3) {
    // Up, down, left, right, mirror cell helpers.
    b.u = (r, c) => r ? b[r - 1][c] : S;
    b.d = (r, c) => r + 1 !== h ? b[r + 1][c] : S;
    b.l = (r, c) => c ? b[r][c - 1] : S;
    b.r = (r, c) => c + 1 !== w ? b[r][c + 1] : S;
    b.m = (i, s) => s - i - 1;

    // Max number of layers to explore.
    const m = Math.ceil(Math.min(w, h) / 2);

    // End when we explore all layers or if we don't star anything.
    for (let i = 0, s = !0; s && i < m; i++) {
      s = !1;
      // Go left to right for top and bottom rows.
      for (let c = i; c <= w - m + 1; c++) {
        b[i][c] === O && b.u(i, c) === S && // up
          (s = b[i][c] = S);
        b[b.m(i, h)][c] === O && b.d(b.m(i, h), c) === S && // down
          (s = b[b.m(i, h)][c] = S);
      }

      // Go top to bottom for left and right columns.
      for (let r = i; r <= h - m + 1; r++) {
        b[r][i] === O && b.l(r, i) === S && // left
          (s = b[r][i] = S);
        b[r][b.m(i, w)] === O && b.r(r, b.m(i, w)) === S && // right
          (s = b[r][b.m(i, w)] = S);
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
