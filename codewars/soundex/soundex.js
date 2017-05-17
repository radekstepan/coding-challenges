const map = {
  a: 0, e: 0, i: 0, o: 0, u: 0, y: 0, h: -1, w: -1, b: 1, f: 1, p: 1, v: 1,
  c: 2, g: 2, j: 2, k: 2, q: 2, s: 2, x: 2, z: 2, d: 3, t: 3, l: 4, m: 5,
  n: 5, r: 6
};

module.exports = (input) => input.split(/\s+/g).map((n) => {
  let [ h, ...t ] = n, d = [0, 0, 0], i = 0, c, s;
  while (t.length && i < 3) {
    if ((c = map[t.shift()]) <= 0) {
      if (!c) s = true;
      continue;
    }
    if (!s && (i && d[i - 1] === c)) continue;
    s = false;
    d[i++] = c;
  }
  return h.toUpperCase() + d.join('');
}).join(' ');
