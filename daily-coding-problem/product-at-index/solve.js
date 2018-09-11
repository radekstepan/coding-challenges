const naive = list => {
  const product = Array(list.length).fill(1);

  for (const i in list) {
    for (const j in product) {
      if (j === i) continue;
      product[j] *= list[i];
    }
  }

  return product;
};

module.exports = list => {
  const len = list.length;
  if (len <= 1) return undefined;

  const product = [1];
  let i = 1, last = list[0];

  for (; i < len; i++) {
    product[i] = product[i - 1] * last;
    last = list[i];
  }

  for (i -= 2; i >= 0; i--) {
    product[i] *= last;
    last *= list[i];
  }

  return product;
};