/*
3652. Best Time to Buy and Sell Stock using Strategy

You are given two integer arrays prices and strategy, where:
prices[i] is the price of a given stock on the ith day.
strategy[i] represents a trading action on the ith day, where:
-1 indicates buying one unit of the stock.
0 indicates holding the stock.
1 indicates selling one unit of the stock.
You are also given an even integer k, and may perform at most one modification to strategy. A modification consists of:
Selecting exactly k consecutive elements in strategy.
Set the first k / 2 elements to 0 (hold).
Set the last k / 2 elements to 1 (sell).
The profit is defined as the sum of strategy[i] * prices[i] across all days.
Return the maximum possible profit you can achieve.

Note: There are no constraints on budget or stock ownership, so all buy and sell operations are feasible regardless of past actions.

Example 1:
Input: prices = [4,2,8], strategy = [-1,0,1], k = 2
Output: 10
Explanation:
Modification	Strategy	Profit Calculation	Profit
Original	[-1, 0, 1]	(-1 × 4) + (0 × 2) + (1 × 8) = -4 + 0 + 8	4
Modify [0, 1]	[0, 1, 1]	(0 × 4) + (1 × 2) + (1 × 8) = 0 + 2 + 8	10
Modify [1, 2]	[-1, 0, 1]	(-1 × 4) + (0 × 2) + (1 × 8) = -4 + 0 + 8	4
Thus, the maximum possible profit is 10, which is achieved by modifying the subarray [0, 1]​​​​​​​.

Example 2:
Input: prices = [5,4,3], strategy = [1,1,0], k = 2
Output: 9
Explanation:
Modification	Strategy	Profit Calculation	Profit
Original	[1, 1, 0]	(1 × 5) + (1 × 4) + (0 × 3) = 5 + 4 + 0	9
Modify [0, 1]	[0, 1, 0]	(0 × 5) + (1 × 4) + (0 × 3) = 0 + 4 + 0	4
Modify [1, 2]	[1, 0, 1]	(1 × 5) + (0 × 4) + (1 × 3) = 5 + 0 + 3	8
Thus, the maximum possible profit is 9, which is achieved without any modification.

Constraints:
2 <= prices.length == strategy.length <= 10^5
1 <= prices[i] <= 10^5
-1 <= strategy[i] <= 1
2 <= k <= prices.length
k is even

</> Typescript code:
*/

function maxProfit(prices: number[], strategy: number[], k: number): number {
    const n = prices.length;
    let baseProfit = 0;

    // Calculate the initial profit without any modifications
    for (let i = 0; i < n; i++) {
        baseProfit += strategy[i] * prices[i];
    }

    let currentGain = 0; // Represents the delta added to baseProfit by the modification
    const halfK = k / 2;

    // Initialize the sliding window for the first k elements [0...k-1]
    for (let i = 0; i < k; i++) {
        // First half (k/2) elements become 0, second half become 1
        const target = i < halfK ? 0 : 1;
        // Gain = (New Action - Old Action) * Price
        currentGain += (target - strategy[i]) * prices[i];
    }

    // We track the maximum gain; 0 covers the case where the original is best
    let maxGain = Math.max(0, currentGain);

    // Slide the window of size k across the array
    for (let i = k; i < n; i++) {
        // The element leaving the window (at the start) was a '0' (Hold)
        const outIdx = i - k;
        currentGain -= (0 - strategy[outIdx]) * prices[outIdx];

        // The element moving from the 2nd half to the 1st half of the window
        // It changes from target 1 (Sell) to target 0 (Hold)
        const midIdx = i - halfK;
        currentGain -= (1 - strategy[midIdx]) * prices[midIdx]; // Remove old target
        currentGain += (0 - strategy[midIdx]) * prices[midIdx]; // Add new target

        // The new element entering the window at the end becomes a '1' (Sell)
        const inIdx = i;
        currentGain += (1 - strategy[inIdx]) * prices[inIdx];

        // Update global max gain found so far
        if (currentGain > maxGain) maxGain = currentGain;
    }

    // Total profit is the original profit plus the best improvement found
    return baseProfit + maxGain;
}
