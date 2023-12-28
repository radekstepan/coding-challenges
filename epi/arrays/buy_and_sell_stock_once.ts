// Write a program that takes an array denoting the daily stock price, and returns the
// maximum profit that could be made by buying and then selling one share of that stock.
// There is no need to buy if no profit is possible.

function buy_and_sell_stock_once(A: number[]): number {
  let x = 0;
  let l = +Infinity;
  for (let i = 0; i < A.length; i++) {
    x = Math.max(x, A[i] - l);
    l = Math.min(l, A[i]);
  }

  return x;
};

console.log(buy_and_sell_stock_once([310,315,275,295,260,270,290,230,255,250]), 30);

// Write a program that takes an array of integers and finds the length of a longest subarray
// all of whose entries are equal.

function longest_subarray(A: number[]): number {
  if (!A.length) {
    return 0;
  }

  let x = 1; // longest subarray length
  let c = A[0]; // last character
  let l = 1;  // current subarray length
  for (let i = 1; i < A.length; i++) {
    if (A[i] !== c) {
      c = A[i];
      l = 1;
    } else {
      l++;
      x = Math.max(x, l);
    }

    // Early exit if we can't find a longer subarray in the tail.
    if (x >= A.length - 1 - i) {
      break;
    }
  }

  return x;
}

console.log(longest_subarray([]), 0);
console.log(longest_subarray([2]), 1);
console.log(longest_subarray([1, 1]), 2);
console.log(longest_subarray([1, 1, 1, 2, 3, 4]), 3);
console.log(longest_subarray([1, 2, 2, 4, 4, 4, 2, 2, 1]), 3);
