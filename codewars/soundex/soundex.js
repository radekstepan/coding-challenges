const map = {
  a: 0, e: 0, i: 0, o: 0, u: 0, y: 0, h: -1, w: -1, b: 1, f: 1, p: 1, v: 1,
  c: 2, g: 2, j: 2, k: 2, q: 2, s: 2, x: 2, z: 2, d: 3, t: 3, l: 4, m: 5,
  n: 5, r: 6
};

const american = (n) => {
  let [ h, ...t ] = n,
      f = map[h.toLowerCase()],
      d = [ f <= 0 ? h : f, 0, 0, 0],
      i = 1,
      s,
      c;
  while (t.length && i < 4) {
    if ((c = map[t.shift()]) <= 0) {
      if (!c) s = true;
      continue;
    }
    if (!s && d[i - 1] === c) continue;
    s = false;
    d[i++] = c;
  }
  return (typeof d[0] === h ? d : [h].concat(d.slice(1))).join('').toUpperCase();
};

module.exports = (input) => input.split(/\s+/g).map(american).join(' ');
