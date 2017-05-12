function List(cmp) {
  this.map = {};
  this.cmp = cmp || function(a, b) {
    return a.localeCompare(b) < 0;
  };
}

List.prototype.add = function(key) {
  if (!(key in this.map)) {
    this.map[key] = { key, prev: null, next: null };
  }

  return this;
}

List.prototype.get = function(key) {
  return this.map[key];
}

List.prototype.link = function(a, b) {
  this.add(a).add(b);
  [ a, b ] = this.cmp(a, b) ? [ a, b ] : [ b, a ];

  // Lookup ordered position for b.
  let node = this.map[a];
  while (node.next != null && node.next <= b) {
    node = this.map[node.next];
  }

  // We are linked already.
  if (node.key === b) return true;

  // We need to add a new link.
  const next = this.map[node.next];
  if (next) next.prev = b;
  node.next = b;

  this.map[b].prev = node.key;
  if (next) this.map[b].next = next.key;

  return false;
}

List.prototype.walk = function(key) {
  if (!(key in this.map)) {
    return [];
  }

  const res = [key];
  let node = this.map[key];
  while (node.next != null) {
    res.push(node.next);
    node = this.map[node.next];
  }
  return res;
}

module.exports = List;
