/*
2110. Number of Smooth Descent Periods of a Stock

You are given an integer array prices representing the daily price history of a stock, where prices[i] is the stock price on the ith day.
A smooth descent period of a stock consists of one or more contiguous days such that the price on each day is lower than the price on the preceding day by exactly 1. The first day of the period is exempted from this rule.
Return the number of smooth descent periods.

Example 1:
Input: prices = [3,2,1,4]
Output: 7
Explanation: There are 7 smooth descent periods:
[3], [2], [1], [4], [3,2], [2,1], and [3,2,1]
Note that a period with one day is a smooth descent period by the definition.

Example 2:
Input: prices = [8,6,7,7]
Output: 4
Explanation: There are 4 smooth descent periods: [8], [6], [7], and [7]
Note that [8,6] is not a smooth descent period as 8 - 6 ≠ 1.

Example 3:
Input: prices = [1]
Output: 1
Explanation: There is 1 smooth descent period: [1]

Constraints:
1 <= prices.length <= 10^5
1 <= prices[i] <= 10^5

</> Typescript code:
*/

function getDescentPeriods(prices: number[]): number {
    // Initialize total count. 
    // We start with 1 because the first element (prices[0]) always forms a valid period of length 1.
    // Time Complexity: O(N) - Single pass through the array.
    // Space Complexity: O(1) - Only two integer variables used.
    let totalPeriods = 1;

    // 'currentRun' tracks the length of the consecutive smooth descent ending at the current index.
    // A single element is always a valid descent period of length 1.
    let currentRun = 1;

    // Cache length to avoid repeated property access in the loop, though modern engines optimize this well.
    const n = prices.length;

    // Iterate starting from the second element (index 1) to compare with the previous element.
    for (let i = 1; i < n; i++) {
        // Check if the current price is exactly 1 less than the previous day's price.
        if (prices[i - 1] - prices[i] === 1) {
            // If yes, the current streak continues. 
            // We extend the smooth descent period.
            currentRun++;
        } else {
            // If the condition breaks, the streak ends.
            // However, the current element itself starts a new valid period of length 1.
            currentRun = 1;
        }

        // Add the 'currentRun' to the total.
        // Logic: If we have a smooth descent [3, 2, 1], at '1' the run is 3.
        // The valid subarrays ending at '1' are [1], [2, 1], and [3, 2, 1].
        // The count of these subarrays is exactly equal to the length of the run.
        totalPeriods += currentRun;
    }

    return totalPeriods;
}
