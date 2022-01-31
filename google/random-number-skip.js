/**
 * Given an integer n and a list of integers l, write a function that
 * randomly generates a number from 0 to n-1 that isn't in l (uniform).
 */
const n = 10;
const l = [0, 2, 3, 9];

function random() {
  l.sort();
  let rand = Math.floor(Math.random() * (n - l.length));

  for (const m of l) {
    if (rand < m) return rand;
    rand += 1; // need to account for this "gap"
  }

  return rand;
}

const dist = new Array(n).fill(0);
let samples = 100;
while (samples) {
  samples -= 1;
  const rand = random();
  dist[rand] += 1;
  if (l.includes(rand)) {
    throw new Error('😭')
  }
}

console.log(JSON.stringify(dist, null, 2));
