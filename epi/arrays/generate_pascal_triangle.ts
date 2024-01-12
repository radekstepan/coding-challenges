// Write a program which takes as input a nonnegative integer n and returns the first
// n rows of Pascal's triangle.

function generate_pascal_triangle(n: number): number[][] {
  if (n < 1) {
    return [];
  }

  const P = [[1]];

  let i = 1;
  while (i !== n) {
    let j = 0;
    P[i] = [];
    while (j !== i + 1) {
      P[i].push((P[i - 1][j - 1] ?? 0) + (P[i - 1][j] ?? 0));
      j++;
    }
    i++;
  }

  return P;
}

console.log(generate_pascal_triangle(0));
console.log(generate_pascal_triangle(1));
console.log(generate_pascal_triangle(2));
console.log(generate_pascal_triangle(3));
console.log(generate_pascal_triangle(4));
console.log(generate_pascal_triangle(5));

// Compute the nth row of Pascal's triangle using O(n) space.

function nth_row_pascal_triangle(n: number): number[] {
  if (n < 1) {
    return [];
  }

  const R = [1];

  let i = 1;
  while (i !== n) {
    let j = 1;
    R[i] = 1;
    let k = 1;
    while (j !== i) {
      let t = R[j];
      R[j] += k;
      k = t;
      j++;
    }
    i++;
  }

  return R;
}

console.log(nth_row_pascal_triangle(0));
console.log(nth_row_pascal_triangle(1));
console.log(nth_row_pascal_triangle(2));
console.log(nth_row_pascal_triangle(3));
console.log(nth_row_pascal_triangle(4));
console.log(nth_row_pascal_triangle(5));

