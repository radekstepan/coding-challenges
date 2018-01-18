module.exports = input => {
  if (input < 12) return -1;

  const list = Array.from('' + input);
  const l = list.length;

  for (let a = l - 2; a >= 0; a--) {
    for (let b = l - 1; b > a; b--) {
      if (list[a] < list[b]) {
        [list[a], list[b]] = [list[b], list[a]];
        return parseInt(list.slice(0, a + 1).concat(list.slice(a + 1).sort()).join(''), 10);
      }
    }
  }

  return -1;
}
