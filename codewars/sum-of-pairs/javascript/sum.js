module.exports = (list, result) => {
  const set = new Set();
  for (const b of list) {
    const a = result - b;
    if (set.has(a)) {
      return [a, b];
    }
    set.add(b);
  }
}
