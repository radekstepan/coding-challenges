// Write a program that computes the maximum profit that can be made by buying and selling a share
// at most twice. The second buy must be made on another date after the first sale.

function buy_and_sell_stock_twice(A: number[]): number {
  let firstBuyCost = -Infinity;
  let firstSellProfit = 0;
  let secondBuyCost = -Infinity;
  let secondSellProfit = 0;

  for (const price of A) {
    firstBuyCost = Math.max(firstBuyCost, -price);  // Buy low
    firstSellProfit = Math.max(firstSellProfit, price + firstBuyCost);  // Sell high
    // Find the maximum money left over after a second buy.
    secondBuyCost = Math.max(secondBuyCost, firstSellProfit - price);  // Buy low again
    secondSellProfit = Math.max(secondSellProfit, price + secondBuyCost);  // Sell high again/ Sell high again
  }

  return secondSellProfit; // The maximum profit after the second sell
}

console.log(buy_and_sell_stock_twice([1,3,1,2]), 3);
console.log(buy_and_sell_stock_twice([1,2,1,4]), 4);
console.log(buy_and_sell_stock_twice([12,11,13,9,12,8,14,13,15]), 10);
