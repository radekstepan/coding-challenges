// Given a dimension d, write a program to generate a dxd 2D array which in spiral order is
// <1,2,3, ... , d2>.

enum D {
  RIGHT,
  DOWN,
  LEFT,
  UP
};

const matrix = (d: number): number[][] => new Array(d).fill(1).map(() => new Array(d));

function spiral_order_to_matrix(n: number): number[][] {
  const M = matrix(n);

  let r = 0;
  let c = 0;
  let l = 0;
  let d = D.RIGHT;

  let i = 0;
  while (i !== n * n) {
    M[r][c] = i + 1;

    switch (d) {
      case D.RIGHT:
        c++;
        if (c === n - l - 1) {
          d = D.DOWN;
        }
        break;
      case D.DOWN:
        r++;
        if (r === n - l - 1) {
          d = D.LEFT;
        }
        break;
      case D.LEFT:
        c--;
        if (c === l) {
          d = D.UP;
        }
        break;
      case D.UP:
        r--;
        if (r === l) {
          l++;
          r = l;
          c = l;
          d = D.RIGHT;
        }
        break;
    }

    i++;
  }

  return M;
}

console.log(spiral_order_to_matrix(2));
console.log(spiral_order_to_matrix(3));
console.log(spiral_order_to_matrix(4));
console.log(spiral_order_to_matrix(5));
