// Write a function that takes as input an n x n 2D array, and rotates the array by 90 degrees clockwise.

function rotate_matrix(M: number[][]): number[][] {
  const n = M.length - 1;
  // Outer loop to iterate through each layer of the matrix. The loop goes
  // up to the middle layer, handling one layer per iteration.
  let i = 0;
  while (i !== Math.floor(M.length / 2)) {
    // Inner loop to rotate elements within the current layer. It rotates
    // all elements of the layer except for the last one in each row,
    // as those will be handled in the next layer.
    let j = i;
    while (j !== n - i) {
      // Perform a 4-way exchange.
      [
        M[i][j], // right
        M[n-j][i], // down
        M[n-i][n-j], // left
        M[j][n-i] // up
      ] = [
        M[n-j][i],
        M[n-i][n-j],
        M[j][n-i],
        M[i][j]
      ];
      j++; // next element in the row
    }
    i++; // next inner layer
  }
  

  return M;
}

const M2 = [
  [1, 2],
  [3, 4],
];
const M3 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const M4 = [
  [ 1,  2,  3,  4],
  [ 5,  6,  7,  8],
  [ 9, 10, 11, 12],
  [13, 14, 15, 16],
];

const E2 = [
  [3, 1],
  [4, 2]
];
const E3 = [
  [7, 4, 1],
  [8, 5, 2],
  [9, 6, 3],
];
const E4 = [
  [13,  9,  5,  1],
  [14, 10,  6,  2],
  [15, 11,  7,  3],
  [16, 12,  8,  4],
];

console.log(rotate_matrix(M2));
