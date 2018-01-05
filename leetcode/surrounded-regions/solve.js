const X = 'X';
const O = '-';
const S = '*';

module.exports = board => {
  // Size.
  const [w, h] = [board[0].length, board.length];
  // Max number of layers to explore.
  const max = Math.ceil(Math.min(w, h) / 2); // TODO deal with rotation
  const even = Math.min(w, h) % 2 === 0; // is the board even?

  // Minimum size check.
  if (w < 3 || h < 3) return board;

  // Starting point.
  let [r, c, l] = [0, 0, 0]; // row, column, layer index

  // Have we starred the last layer?
  let starred = true;
  while (l < max && starred) { // end when we explore all layers or if we don't star anything
    starred = false;

    // Go left to right for top and bottom rows.
    while (c < w - l) {
      if (board[l][c] === O && (l === 0 || board[l - 1][c] === S)) { // top
        board[l][c] = S;
        starred = true;
      }
      if ((l + 1 !== max) || even) {
        if (board[h - l - 1][c] === O && (l === 0 || board[h - l][c] === S)) { // bottom
          board[h - l - 1][c] = S;
          starred = true;
        }
      }

      c += 1;
    }

    // Go top to bottom for left and right columns.

    l += 1; // new layer
    r = l;
    c = l;
  }

  // Turn all "*" characters into "O"s, the rest is "X".
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      board[i][j] = board[i][j] === S ? O : X;
    }
  }

  return board;
};
