/*
3946. Maximum Number of Items From Sale I

You are given a 2D integer array items, where items[i] = [factor_i, price_i] represents the i-th item. You are also given an integer budget.

There are unlimited copies of each item available for purchase.
You may buy any number of copies of any items such that the total cost of the purchased copies is at most budget.

After buying items, you may receive free copies according to the following rules:

- For each item i that you bought at least one copy of, you receive one free copy of every item j such that j != i and factor_i divides factor_j.
- Buying multiple copies of the same item i does not give additional free copies through item i.
- The same item j can be received multiple times for free if it is received from purchases of different item types.

Return the maximum total number of item copies you can obtain, including both purchased copies and free copies, while spending at most budget on purchased items.

Example 1:
Input: items = [[6,2],[2,6],[3,4]], budget = 9
Output: 4
Explanation:
You can buy 2 copies of item 0 and 1 copy of item 2 for a total cost of 2 * 2 + 4 = 8, which is not greater than budget = 9.
Buying item 2 gives 1 free copy of item 0, because factor_2 = 3 divides factor_0 = 6.
You leave with 3 purchased copies and 1 free copy, for a total of 4 item copies.

Example 2:
Input: items = [[2,4],[3,2],[4,1],[6,4],[12,4]], budget = 8
Output: 10
Explanation:
You can buy 1 copy of item 0, 1 copy of item 1, and 2 copies of item 2 for a total cost of 4 + 2 + 2 * 1 = 8.
Buying item 0 gives 1 free copy of items 2, 3, and 4.
Buying item 1 gives 1 free copy of items 3 and 4.
Buying item 2 gives 1 free copy of item 4.
Thus, you receive 6 free copies. You leave with 4 purchased copies and 6 free copies, for a total of 10 item copies.

Constraints:
1 <= items.length <= 1000
items[i] = [factor_i, price_i]
1 <= factor_i, price_i <= 1500
1 <= budget <= 1500

</> Typescript code:
*/

// Maximize purchased and free copies within the budget.
function maximumSaleItems(items: number[][], budget: number): number {
  // Track the largest factor for the sieve.
  let maxFactor = 0;
  // Start above the budget to detect when nothing is affordable.
  let minPrice = budget + 1;
  // Scan each item once.
  for (const [factor, price] of items) {
    // Extend the sieve range when needed.
    if (factor > maxFactor) maxFactor = factor;
    // Keep the lowest unit price.
    if (price < minPrice) minPrice = price;
  }
  // Return zero when no purchase fits.
  if (minPrice > budget) return 0;

  // Count item types by factor, including repeated factors.
  const frequency = new Uint16Array(maxFactor + 1);
  // Add each item type to its factor bucket.
  for (const [factor] of items) frequency[factor]++;

  // Store the total copies earned by the first purchase for each factor.
  const rewards = new Uint16Array(maxFactor + 1);
  // Visit each possible source factor.
  for (let factor = 1; factor <= maxFactor; factor++) {
    // Skip factors that never appear.
    if (frequency[factor] === 0) continue;
    // Start the multiples count at zero.
    let reward = 0;
    // Enumerate every divisible factor.
    for (let multiple = factor; multiple <= maxFactor; multiple += factor) {
      // Add all item types with this multiple.
      reward += frequency[multiple];
    }
    // The purchased copy replaces the source item excluded from the freebies.
    rewards[factor] = reward;
  }

  // Use best[money] for the most copies obtainable within that budget.
  const best = new Int32Array(budget + 1);
  // Initialize affordable budgets with repeat purchases at the cheapest price.
  for (let money = minPrice; money <= budget; money++) {
    // Spend as much as possible on these repeat copies.
    best[money] = Math.floor(money / minPrice);
  }
  // Consider each item type's first purchase once.
  for (const [factor, price] of items) {
    // Read the reward for its factor.
    const reward = rewards[factor];
    // Skip purchases that cheapest repeats can match at the same cost.
    if (reward <= Math.floor(price / minPrice)) continue;
    // Scan downward so this item type cannot award its bonus twice.
    for (let money = budget; money >= price; money--) {
      // Add the reward to the best score from the remaining budget.
      const candidate = best[money - price] + reward;
      // Keep the better score for this budget.
      if (candidate > best[money]) best[money] = candidate;
    }
  }
  // Return the best score within the full budget.
  return best[budget];
};
