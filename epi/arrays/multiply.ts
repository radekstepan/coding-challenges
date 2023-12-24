// Write a program that takes two arrays representing integers, and returns
// an integer representing their product

function multiply(A: number[], B: number[]) {
  const result = [];
  for (let i = A.length - 1; i > -1; i--) {
    for (let j = B.length - 1; j > -1; j--) {
      const sum = A[i] * B[j] + (result[i + j + 1] ?? 0);
      const remainder = sum % 10;
      const carry = (sum - remainder) / 10;
      result[i + j + 1] = remainder; 
      result[i + j] = (result[i + j] ?? 0) + carry;
    }
  }

  return result[0] === 0 ? result.slice(1) : result;
}

console.log(multiply([1,7], [1,3]));
console.log(multiply([4,3], [5,7]));
