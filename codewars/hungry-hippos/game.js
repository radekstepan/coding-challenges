function Game(board){
  this.board = board;
}

// Linked list.
Game.prototype.link = function(a, b, l) {
  [ a, b ] = a > b ? [ b, a ] : [ a, b ];
  let n;
  if (n = l[a]) {
    while (n.n != null && n.n <= b) {
      n = l[n.n];
    }
    // We are linked.
    if (n.v && n.v === b) return true;
    // Need to add the link.
    l[b] = { v: b, p: n.v, n: n.n };
    if (n.n) l[n.n].p = b;
    if (n.p) l[n.p].n = b;
  } else {
    if (!(n = l[b])) {
      n = l[b] = { v: b, p: null, n: null };
    }
    if (n.p) l[n.p].n = a;

    l[a] = { v: a, n: b, p: n.p };
  }

  return false;
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
        // console.log(i, j, a, b, c);
        // Contiguous area, potential link.
        if (i + j > 0 && a && b) {
          // A link of two areas?
          if (a !== b) {
            // Did we know about this?
            if (!this.link(a, b, l)) c--;
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
      }
    }
    this.rows.push(c);
  }
  return c;
}

module.exports = Game;
