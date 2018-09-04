module.exports = (list, k) => {
  const buff = [list[0]];
  for (const n of list.splice(1)) {
    for (const b of buff) {
      if (b + n === k) return true;
    }
    buff.push(n);
  }

  return false;
};