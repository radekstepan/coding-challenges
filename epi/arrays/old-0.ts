const prices = [10, 2, 5, 1, 6, 7];
// The answer is 1 (index 3) and 7 (index 5);

// 1. Find the lowest number before each index.
["Inf", 10, 2, 2, 1, 1];

const lowest = [+Infinity];
let last = prices[0];
let i = 0;
for (const p of prices.slice(1)) {
  if (last < lowest[i]) {
    lowest.push(last);
  } else {
    lowest.push(lowest[i]);
  }
  last = p;
  i += 1;
}

// 2. Now find the highest diff between us and the number that precedes.
i = 1;
let diff = -Infinity;
for (const p of prices.slice(1)) {
  if (p - lowest[i] > diff) {
    diff = p - lowest[i];
  }

  i += 1;
}

console.log(diff);