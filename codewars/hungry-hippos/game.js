function Game(board){
  this.board = board;
}

Game.prototype.play = function() {
  let c = 0, g = this.board, o = {};
  for (let i = 0; i < g.length; i++) {
    for (let j = 0; j < g[i].length; j++) {
      if (g[i][j]) {
        const a = (i && g[i - 1][j]) ? g[i - 1][j] : 0;
        const b = (j && g[i][j - 1]) ? g[i][j - 1] : 0;
        // Contiguous area on both ends.
        if (i + j > 0 && a && b) {
          // A join.
          if (a !== b) {
            // Do we know about it?
            if (!o[a] || !o[b]) c--;
            // Now we do...
            o[a] = true;
            o[b] = true;
          }
          // Set as being part of this area.
          g[i][j] = a;
        // Contiguous area to the north.
        } else if (a) {
          g[i][j] = a;
        // Contiguous area to the west.
        } else if (b) {
          g[i][j] = b;
        // A new area was found.
        } else if (!a && !b) {
          g[i][j] = ++c;
        }
      }
    }
  }

  return c;
}

module.exports = Game;
