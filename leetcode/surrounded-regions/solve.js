const X = 'X';
const O = 'O';
const S = '*';

module.exports = board => {
  board.above = (r, c) => r ? board[r - 1][c] : S;
  board.below = (r, c) => r + 1 !== board.length ? board[r + 1][c] : S;
  board.left = (r, c) => c ? board[r][c - 1] : S;
  board.right = (r, c) => c + 1 !== board[0].length ? board[r][c + 1] : S;

  // Size.
  const [w, h] = [board[0].length, board.length];
  // Max number of layers to explore.
  const max = Math.ceil(Math.min(w, h) / 2); // TODO deal with rotation

  // Minimum size check.
  if (w < 3 || h < 3) return board;

  // Starting point.
  let [row, col, l] = [0, 0, 0]; // row, column, layer index

  // Have we starred the last layer?
  let starred = true;
  while ((l < max) && starred) { // end when we explore all layers or if we don't star anything
    starred = false;

    // Go left to right for top and bottom rows.
    while (col < w - max + 1) {
      if (board[l][col] === O && board.above(l, col) === S) { // top
        board[l][col] = S;
        starred = true;
      }
      if (board[h - l - 1][col] === O && board.below(h - l - 1, col) === S) { // bottom
        board[h - l - 1][col] = S;
        starred = true;
      }
      col += 1;
    }

    // Go top to bottom for left and right columns.
    while (row < h - max + 1) {
      if (board[row][l] === O && board.left(row, l) === S) { // left
        board[row][l] = S;
        starred = true;
      }
      if (board[row][w - l - 1] === O && board.right(row, w - l - 1) === S) { // right
        board[row][w - l - 1] = S;
        starred = true;
      }
      row += 1;
    }

    l += 1; // new layer
    row = l;
    col = l;
  }

  // Turn all "*" characters into "O"s, the rest is "X".
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      board[i][j] = board[i][j] === S ? O : X;
    }
  }

  return board;
};
