/*
1833. Maximum Ice Cream Bars

Hint
It is a sweltering summer day, and a boy wants to buy some ice cream bars.
At the store, there are n ice cream bars. You are given an array costs of length n, where costs[i] is the price of the ith ice cream bar in coins. The boy initially has coins coins to spend, and he wants to buy as many ice cream bars as possible. 

Note: The boy can buy the ice cream bars in any order.
Return the maximum number of ice cream bars the boy can buy with coins coins.
You must solve the problem by counting sort.

Example 1:
Input: costs = [1,3,2,4,1], coins = 7
Output: 4
Explanation: The boy can buy ice cream bars at indices 0,1,2,4 for a total price of 1 + 3 + 2 + 1 = 7.

Example 2:
Input: costs = [10,6,8,7,7,8], coins = 5
Output: 0
Explanation: The boy cannot afford any of the ice cream bars.

Example 3:
Input: costs = [1,6,3,1,2,5], coins = 20
Output: 6
Explanation: The boy can buy all the ice cream bars for a total price of 1 + 6 + 3 + 1 + 2 + 5 = 18.

Constraints:
costs.length == n
1 <= n <= 10^5
1 <= costs[i] <= 10^5
1 <= coins <= 10^8

</> Typescript code:
*/

function maxIceCream(costs: number[], coins: number): number {
  // Creates frequency array for counting sort, indexed by ice cream cost.
  const count = new Int32Array(100001);

  // Counts how many bars exist for each cost.
  for (const cost of costs) count[cost]++;

  // Stores the number of ice cream bars bought.
  let bought = 0;

  // Iterates prices from cheapest to most expensive while still affordable.
  for (let cost = 1; cost <= 100000 && coins >= cost; cost++) {
    // Skips costs that do not appear.
    if (count[cost] === 0) continue;

    // Buys as many bars of this cost as possible.
    const canBuy = Math.min(count[cost], Math.floor(coins / cost));

    // Adds bought bars to the answer.
    bought += canBuy;

    // Deducts spent coins.
    coins -= canBuy * cost;
  }

  // Returns maximum bars bought.
  return bought;
}
