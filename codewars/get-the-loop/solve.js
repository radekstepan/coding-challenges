function loop_size(node) {
  const map = new WeakMap(); // ES6 is cheating...
  let i = 0;
  while ((node = node.getNext()) && !map.has(node)) {
    map.set(node, i++);
  }
  return i - map.get(node);
}
