enum D {
  RIGHT,
  DOWN,
  LEFT,
  UP
};

// Keep track of levels.
function matrix_in_spiral_order(M: number[][]): number[] {
  const n = M.length;
  const R = [];

  let i = 0;
  let d = D.RIGHT; // direction
  let r = 0; // row
  let c = 0; // column
  let l = 0; // level
  
  while (i < n * n) {
    R.push(M[r][c]);

    switch (d) {
      case D.RIGHT:
        c++;
        if (c === n - 1 - l) {
          c = n - 1 - l;
          d = D.DOWN;
        }
        break;
      case D.DOWN:
        r++;
        if (r === n - 1 - l) {
          r = n - 1 - l;
          d = D.LEFT;
        }
        break;
      case D.LEFT:
        c--;
        if (c === l) {
          d = D.UP;
          c = l;
        }
        break;
      case D.UP:
        r--;
        if (r === 1 + l) {
          d = D.RIGHT;
          l++;
          r = l;
        }
        break;
    }

    i++;
  }

  return R;
}

// Mark visited cells.
function matrix_in_spiral_order_epi(M: number[][]): number[] {
  // Define the directional shifts: right, down, left, and up.
  const SHIFT = [[0, 1], [1, 0], [0, -1], [-1, 0]];

  // Initialize the direction index and starting point.
  let direction = 0;
  let x = 0, y = 0;

  // Array to store the elements in spiral order.
  const R = [];

  // Iterate over each element in the square matrix.
  for (let i = 0; i < M.length ** 2; i++) {
    // Append the current element to the spiral ordering.
    R.push(M[x][y]);

    // Mark the current position as visited by setting it to 0.
    M[x][y] = 0;

    // Calculate the next position using the current direction.
    let nextX = x + SHIFT[direction][0];
    let nextY = y + SHIFT[direction][1];

    // Check if the next position is out of bounds or already visited.
    if (nextX < 0 || nextX >= M.length ||
        nextY < 0 || nextY >= M.length ||
        M[nextX][nextY] === 0) {
      // Change direction (right -> down -> left -> up -> right -> ...)
      direction = (direction + 1) % 4;

      // Recalculate the next position based on the new direction.
      nextX = x + SHIFT[direction][0];
      nextY = y + SHIFT[direction][1];
    }

    // Update the current position to the next position.
    x = nextX;
    y = nextY;
  }

  // Return the array containing the elements in spiral order.
  return R;
}

const M2 = [
  [1, 2],
  [3, 4]
];

const M3 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const M4 = [
  [ 1,  2,  3,  4],
  [ 5,  6,  7,  8],
  [ 9, 10, 11, 12],
  [13, 14, 15, 16]
];

console.log(matrix_in_spiral_order_epi(M2));
console.log(matrix_in_spiral_order_epi(M3));
console.log(matrix_in_spiral_order_epi(M4));
