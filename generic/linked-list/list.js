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

  // Lookup ordered position for "b".
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

// TODO merge two lists together.
List.prototype.link2 = function(a, b) {
  // Make sure we have the two keys.
  // Swap the two keys so "a" is smaller than "b".
  // Keep taking nodes from "a" until we reach either end of "b" or the nodes match.
  // We have been linked already, return true.

  // Get the heads of the two lists.
  // Swap the two heads so "a" is smaller than "b".
  // Keep taking nodes from "a" as "prev" until we have no more nodes in "a".
  // Keep loking for a spot for this "prev" node in "b", linking it in.
  // We have not been linked already, return false.
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
