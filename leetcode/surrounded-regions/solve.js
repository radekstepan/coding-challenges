module.exports = b => {
  // Size.
  const h = b.length, w = h ? b[0].length : 0;

  // Minimum size check.
  if (w >= 3 && h >= 3) {
    const q = []; // queue to explore
    let rc = [0, 0]; // row, column OR false when done
    while (rc || q.length) {
      while (q.length) {
        const [r, c] = q.shift();
        if (b[r, c] === 'X') continue;
        // Explore the surrounding cells.
        r && b[r - 1][c] === 'O' && (b[r - 1][c] = '*') && q.unshift([r - 1, c]); // up
        r + 1 !== h && b[r + 1][c] === 'O' && (b[r + 1][c] = '*') && q.unshift([r + 1, c]); // down
        c && b[r][c - 1] === 'O' && (b[r][c - 1] = '*') && q.unshift([r, c - 1]); // left
        c + 1 !== w && b[r][c + 1] === 'O' && (b[r][c + 1] = '*') && q.unshift([r, c + 1]); // right
      }

      const [r, c] = rc;
      // Check this cell.
      b[r][c] === 'O' && (b[r][c] = '*') && q.push([r, c]);
      if (!r) { // first and last row
        // Check last row.
        b[h - 1][c] === 'O' && (b[h - 1][c] = '*') && q.push([h - 1, c]);
        // Go right or switch sides.
        c + 1 === w ? rc = [1, 0] : rc[1] += 1;
      } else {
        // Check right column.
        b[r][w - 1] === 'O' && (b[r][w - 1] = '*') && q.push([r, w - 1]);
        // Go down or we are done.
        r + 1 === h ? rc = !1 : rc[0] += 1;
      }
    }

    // Turn all "*" characters into "O"s, the rest is "X".
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        b[i][j] = b[i][j] === '*' ? 'O' : 'X';
      }
    }
  }
};
