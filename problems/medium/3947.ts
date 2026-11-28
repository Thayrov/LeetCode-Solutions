/*
3947. Maximum Number of Items From Sale II

You are given a 2D integer array items, where items[i] = [factori, pricei] represents the ith item. You are also given an integer budget.

There are unlimited copies of each item available for purchase. You may buy any number of copies of any items such that the total cost of the purchased copies is at most budget.

After buying items, you may receive free copies according to the following rules:
Each purchased copy of item i can give you at most one free copy of another item j.
The free item must satisfy i != j and factori divides factorj.
For each ordered pair (i, j), you can receive a free copy of item j from purchases of item i at most once, regardless of how many copies of item i you buy.
The same item j can be received multiple times for free if it is received from purchases of different item types.

Return the maximum total number of item copies you can obtain, including both purchased copies and free copies, while spending at most budget on purchased items.

Example 1:
Input: items = [[1,6],[2,4],[3,5]], budget = 19
Output: 5
Explanation:
You can buy 2 copies of item 0 and 1 copy of item 1 for a total cost of 2 * 6 + 4 = 16, which is not greater than budget = 19.
One purchased copy of item 0 gives 1 free copy of item 1, because factor0 = 1 divides factor1 = 2.
The other purchased copy of item 0 gives 1 free copy of item 2, because factor0 = 1 divides factor2 = 3.
You leave with 3 purchased copies and 2 free copies, for a total of 5 item copies.

Example 2:
Input: items = [[2,8],[1,10],[6,6],[4,12],[5,20],[5,17]], budget = 35
Output: 7
Explanation:
You can buy 2 copies of item 0, 1 copy of item 1, and 1 copy of item 2 for a total cost of 2 * 8 + 10 + 6 = 32, which is not greater than budget = 35.
One purchased copy of item 0 gives 1 free copy of item 2, because factor0 = 2 divides factor2 = 6.
The other purchased copy of item 0 gives 1 free copy of item 3, because factor0 = 2 divides factor3 = 4.
The purchased copy of item 1 gives 1 free copy of item 2, because factor1 = 1 divides factor2 = 6.
Buying item 2 gives no free copy, because factor2 = 6 does not divide the factor of any other item.
You leave with 4 purchased copies and 3 free copies, for a total of 7 item copies.

Constraints:
1 <= items.length <= 10^5
items[i] = [factori, pricei]
1 <= factori <= items.length
1 <= pricei <= 10^9
1 <= budget <= 10^9

</> Typescript code:
*/

function maximumSaleItems(items: number[][], budget: number): number {
  // Factors are bounded by the number of item types.
  const n = items.length;
  // Count distinct item types by factor, including duplicate factors.
  const frequency = new Int32Array(n + 1);
  // Track the cheapest unlimited single purchase.
  let cheapest = Infinity;
  // Read each type once to establish the single-copy baseline.
  for (const [factor, price] of items) {
    // Include this type in the count of eligible factors.
    frequency[factor]++;
    // Update the minimum price for a single copy.
    cheapest = Math.min(cheapest, price);
  }
  // Stop when the budget cannot buy even one copy.
  if (cheapest > budget) return 0;

  // Cache free-copy limits for factors with useful offers.
  const capacity = new Int32Array(n + 1);
  // Keep the price and available pair count for each useful type.
  const offers: [number, number][] = [];
  // Consider each type's independently limited free-copy offers.
  for (const [factor, price] of items) {
    // Skip pairs that cannot beat two singles or fit the budget.
    if (price >= 2 * cheapest || price > budget) continue;
    // Scan the multiples only once for each relevant factor.
    if (capacity[factor] === 0) {
      // Accumulate eligible types, including the purchased type for now.
      let count = 0;
      // Visit exactly the factors divisible by this factor.
      for (let multiple = factor; multiple <= n; multiple += factor) {
        // Count every type at the current multiple.
        count += frequency[multiple];
      }
      // The count includes at least this type, so zero still means uncached.
      capacity[factor] = count;
    }
    // Exclude the purchased type itself from its free-copy choices.
    const pairs = capacity[factor] - 1;
    // Keep the offer only if a free copy can accompany a purchase.
    if (pairs > 0) offers.push([price, pairs]);
  }
  // Buy the least expensive two-copy offers first.
  offers.sort((a, b) => a[0] - b[0]);

  // Track the copies obtained from offers.
  let copies = 0;
  // Spend on cheaper offers before considering more expensive ones.
  for (const [price, limit] of offers) {
    // No remaining offer fits once the cheapest one is unaffordable.
    if (price > budget) break;
    // Take as many pairs as the budget and free-copy limit allow.
    const pairs = Math.min(limit, Math.floor(budget / price));
    // Deduct the exact cost of this batch.
    budget -= pairs * price;
    // Count one paid copy and one free copy for each pair.
    copies += 2 * pairs;
  }
  // Spend the remainder on the cheapest unlimited singles.
  return copies + Math.floor(budget / cheapest);
}
