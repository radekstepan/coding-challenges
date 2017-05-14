const List = require('../../generic/linked-list/list.js');

function Game(board){
  this.board = board;
  this.list = new List(function(a, b) {
    return parseInt(a, 10) < parseInt(b, 10);
  });
}

Game.prototype.play = function() {
  let c = 0, k = 0, g = this.board, l = {};
  this.rows = [];
  for (let i = 0; i < g.length; i++) { // rows
    for (let j = 0; j < g[i].length; j++) { // columns
      // Has food?
      if (g[i][j]) {
        // Is the square to the north part of an area?
        const a = (i && g[i - 1][j]) ? g[i - 1][j] : 0;
        // Is the square to the west part of an area?
        const b = (j && g[i][j - 1]) ? g[i][j - 1] : 0;
        // Contiguous area, potential link.
        if (i + j > 0 && a && b) {
          // A link of two areas?
          if (a !== b) {
            // Did we know about this?
            if (!this.list.link(a, b)) c--;
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
          c++;
          g[i][j] = ++k;
        }
        console.log(i, j, a, b, c);
      }
    }
    this.rows.push(c);
  }
  return c;
}

module.exports = Game;
