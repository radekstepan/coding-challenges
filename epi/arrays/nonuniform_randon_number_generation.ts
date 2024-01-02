// You are given n numbers as well as probabilities p0, p1, ..., pn-1, which sum up to l. Given a random
// number generator that produces values in [0, 1] uniformly, how would you generate one of the n
// numbers according to the specified probabilities?

function binary_search(C: number[], r: number): number {
  let low = 0;
  let high = C.length - 1;
  let mid: number;
  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    if (r < C[mid]) {
      high = mid - 1;
    } else {
      low = mid + 1
    }
  }

  return low;
}

// O(nlogn)
function nonuniform_randon_number_generation(N: number[], P: number[]): number[] {
  // Build the cumulative probabilities.
  const C = new Array<number>(P.length);
  C[P.length - 1] = 1;
  for (let i = 0; i < P.length - 1; i++) {
    C[i] = P[i] + (C[i - 1] ?? 0);
  }

  const R = new Array<number>(N.length);
  for (let i = 0; i < N.length; i++) {
    R[i] = N[binary_search(C, Math.random())];
  }

  return R;
}

const N = [3,5,7,11];
const P = [9/18, 6/18, 2/18, 1/18];

console.log(nonuniform_randon_number_generation(N, P));

const S = 10000;
let M = new Map(N.map(v => [v, 0]));
for (let i = 0; i < S; i++) {
  const R = nonuniform_randon_number_generation(N, P);
  for (const e of R) {
    M.set(e, M.get(e) + 1);
  }
}

for (const i in N) {
  console.log(N[i], P[i].toFixed(3), (M.get(N[i]) / (S * N.length)).toFixed(3));
}
