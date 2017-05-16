function Game(board){
  this.board = board;
  this.set = new MySet();
}

Game.prototype.play = function() {
  let c = 0, k = 0, g = this.board, l = {};
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
            if (!this.set.link(a, b)) c--;
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
  }
  return c;
}

function MySet() {
  this.map = {};
}

MySet.prototype.add = function(key) {
  if (!(key in this.map)) {
    this.map[key] = new Set([ key ]);
  }

  return this;
}

MySet.prototype.link = function(a, b) {
  this.add(a).add(b);

  const [ setA, setB ] = [ this.map[a], this.map[b] ];

  // We are linked.
  if (setA.has(b)) return true;

  // Else make a union.
  for (let key of setB) {
    setA.add(key);
    this.map[key] = setA;
  }

  return false;
}

module.exports = Game;
