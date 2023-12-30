// Implement an algorithm that takes as input an array of distinct elements and a size, and returns
// a subset of the given size of the array elements. All subsets should be equally likely. Return the
// result in input array itself.

// Approach: if I were to shuffle the whole array, I'd then just pick the first N elements. So shuffle
//  only the first N elements and return those.

function rand(a: number, b: number): number {
  return a + Math.floor(Math.random() * (b - a + 1));
}

function random_sampling<T>(A: T[], size: number) {
  let i = 0;
  while (i < A.length) {
    const r = rand(i, A.length - 1);
    [A[i], A[r]] = [A[r], A[i]];
    i++;
  }

  A.splice(size, A.length - size);
}

const A = [1, 2, 3, 4];
const size = 2;

const T = [...A];
random_sampling(T, size);
console.log(T);

const S = 10000;
let c = 0;
for (let i = 0; i < S; i++) {
  const B = [...A]
  random_sampling(B, size);
  if (B.includes(A[0])) {
    c++;
  };
}
console.log(100 / A.length * size, 100 * c / S);
