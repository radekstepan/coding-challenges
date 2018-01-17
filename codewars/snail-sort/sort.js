module.exports = list => {
  const h = list.length;
  if (!h) return [];
  const w = list[0].length;
  if (!w || w !== h) return [];

  const [max, sorted] = [Math.floor(w / 2), []];
  for (let l = 0; l < max; l++) {
    let [r, c] = [l, l];
    for (; c < w - l; c++) sorted.push(list[r][c]);
    for (r++; r < c - 1; r++) sorted.push(list[r][c - 1]);
    for (c--; c > l; c--) sorted.push(list[r][c]);
    for (; r > l; r--) sorted.push(list[r][l]);
  }

  (w % 2) && sorted.push(list[max][max]);

  return sorted;
}
