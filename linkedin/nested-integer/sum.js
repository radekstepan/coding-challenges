module.exports = (list, reverse = !1) =>
  [sum1, sum2][+reverse].call(null, list);

// Original.
const sum1 = (list, depth = 1) =>
  list.reduce((t, e) => t + (Array.isArray(e) ? sum1(e, depth + 1) : depth * e), 0);

// Reverse.
const sum2 = (list, depth = 1) => {
  const res = list.reduce((totals, e) => {
    if (Array.isArray(e)) {
      const [groups, max] = sum2(e, depth + 1);
      totals.groups = totals.groups.concat(groups);
      max > totals.max && (totals.max = max);
    } else {
      totals.groups[0][0] += e;
    }
    return totals;
  }, { groups: [[0, depth]], max: depth });

  return depth > 1 ?
    [ res.groups, res.max ] :
    res.groups.reduce((t, g) => t + (g[0] * (res.max - g[1] + 1)), 0);
};
