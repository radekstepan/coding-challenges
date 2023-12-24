// Write a program which takes as input an array of digits encoding
// a nonnegative decimal integer D and updates the array to represent
// the integer D + 1. For example, if the input is (1,2,9) then
// you should update the array to (1,3,0). Your algorithm should work
// even if it is implemented in a language that has finite-precision
// arithmetic.

function plus_one(D: number[], add = 1) {
  if (!D.length) {
    return [1];
  }
  if (D[D.length - 1] + add === 10) {
    return plus_one(D.slice(0, D.length - 1), 1).concat([0]);
  }
  return D.slice(0, D.length - 1).concat(D[D.length - 1] + add);
};

console.log(plus_one([1,2,9]));
console.log(plus_one([9,9,9]));
console.log(plus_one([2,9]));
console.log(plus_one([0]));
console.log(plus_one([1,7,8,4]));
