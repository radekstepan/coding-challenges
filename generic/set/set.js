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

module.exports = MySet;
