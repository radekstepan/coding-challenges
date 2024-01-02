// Design an algorithm that creates uniformly random permutations of {0, 1,..., n - 1}. You are given
// a random number generator that returns integers in the set {0, 1, ... , n - l} with equal probability;
// use as few calls to it as possible.

// Generate a random integer 0...ceil.
function rand(ceil: number): number {
  return Math.floor(Math.random() * (ceil + 1));
}

function compute_random_permutation(s: number): number[] {
  if (s === 0) {
    return [];
  }
  const R = new Array(s).fill(1).map((_, i) => i);
  let i = s - 1;
  // Apparently this is the Fisher-Yates (Knuth) Algorithm.
  while (i !== 0) {
    const r = rand(i);
    [R[i], R[r]] = [R[r], R[i]];
    i--;
  }
  return R;
}

console.log(compute_random_permutation(0));
console.log(compute_random_permutation(1));
console.log(compute_random_permutation(3));

const S = 10000;
const P = new Map<string, number>();
for (let i = 0; i < S; i++) {
  const R = compute_random_permutation(3);
  if (new Set(R).size !== 3) {
    throw new Error("Elements repeat themselves");
  }
  const k = R.join('.');
  const c = P.get(k) ?? 0;
  P.set(k, c + 1);
}
console.log(Array.from(P.values()));
