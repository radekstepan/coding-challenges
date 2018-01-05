const X = 'X';
const O = 'O';
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
  let [row, col, l] = [0, 0, 0]; // row, column, layer index

  // Have we starred the last layer?
  let starred = true;
  while (l < max && starred) { // end when we explore all layers or if we don't star anything
    starred = false;

    // Go left to right for top and bottom rows.
    while (col < w - l) {
      if (board[l][col] === O && (l === 0 || board[l - 1][col] === S)) { // top
        board[l][col] = S;
        starred = true;
      }
      if ((l + 1 !== max) || even) {
        if (board[h - l - 1][col] === O && (l === 0 || board[h - l][col] === S)) { // bottom
          board[h - l - 1][col] = S;
          starred = true;
        }
      }

      col += 1;
    }

    // Go top to bottom for left and right columns.
    while (row < h - l) {
      if (board[row][l] === O && (l === 0 || board[row][l - 1] === S)) { // left
        board[row][l] = S;
        starred = true;
      }
      if ((l + 1 !== max) || even) {
        if (board[row][w - l - 1] === O && (l === 0 || board[row][w - l] === S)) { // right
          board[row][w - l - 1] = S;
          starred = true;
        }
      }

      row += 1;
    }

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
