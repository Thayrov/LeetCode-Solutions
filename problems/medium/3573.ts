/*
3573. Best Time to Buy and Sell Stock V

You are given an integer array prices where prices[i] is the price of a stock in dollars on the ith day, and an integer k.
You are allowed to make at most k transactions, where each transaction can be either of the following:
Normal transaction: Buy on day i, then sell on a later day j where i < j. You profit prices[j] - prices[i].
Short selling transaction: Sell on day i, then buy back on a later day j where i < j. You profit prices[i] - prices[j].

Note that you must complete each transaction before starting another. Additionally, you can't buy or sell on the same day you are selling or buying back as part of a previous transaction.
Return the maximum total profit you can earn by making at most k transactions.

Example 1:
Input: prices = [1,7,9,8,2], k = 2
Output: 14
Explanation:
We can make $14 of profit through 2 transactions:
A normal transaction: buy the stock on day 0 for $1 then sell it on day 2 for $9.
A short selling transaction: sell the stock on day 3 for $8 then buy back on day 4 for $2.

Example 2:
Input: prices = [12,16,19,19,8,1,19,13,9], k = 3
Output: 36
Explanation:
We can make $36 of profit through 3 transactions:
A normal transaction: buy the stock on day 0 for $12 then sell it on day 2 for $19.
A short selling transaction: sell the stock on day 3 for $19 then buy back on day 4 for $8.
A normal transaction: buy the stock on day 5 for $1 then sell it on day 6 for $19.

Constraints:
2 <= prices.length <= 10^3
1 <= prices[i] <= 10^9
1 <= k <= prices.length / 2

</> Typescript code:
*/

function maximumProfit(prices: number[], k: number): number {
    // Defines the problem size
    const n = prices.length;

    /**
     * DP State Arrays:
     * free[j]: Max profit having completed `j` transactions, currently holding no stock.
     * hold[j]: Max profit having completed `j` transactions, currently holding stock (Normal transaction started).
     * shortSol[j]: Max profit having completed `j` transactions, currently shorting stock (Short transaction started).
     * * We initialize with -Infinity to mark unreachable states.
     */
    let free = new Array(k + 1).fill(-Infinity);
    let hold = new Array(k + 1).fill(-Infinity);
    let shortSol = new Array(k + 1).fill(-Infinity);
    
    // Buffer arrays for the next day's state calculation to avoid using same-day updates incorrectly.
    // The problem forbids starting a transaction on the same day one ends.
    let nextFree = new Array(k + 1);
    let nextHold = new Array(k + 1);
    let nextShort = new Array(k + 1);

    // Base case: Day 0, 0 transactions completed, 0 profit.
    free[0] = 0;

    for (const p of prices) {
        // Initialize next state with current state (Action: Do Nothing/Wait)
        // This carries forward the best profit from the previous day if we make no moves today.
        for (let j = 0; j <= k; j++) {
            nextFree[j] = free[j];
            nextHold[j] = hold[j];
            nextShort[j] = shortSol[j];
        }

        // Iterate through all possible transaction counts
        for (let j = 0; j <= k; j++) {
            // TRANSITION 1: STARTING TRANSACTIONS
            // We can only start a transaction (Buy or Short Sell) if we are in the 'free' state from the previous day.
            if (free[j] !== -Infinity) {
                // Option A: Start Normal Transaction (Buy)
                // Cost is 'p', so profit decreases by 'p'.
                const buy = free[j] - p;
                if (buy > nextHold[j]) nextHold[j] = buy;
                
                // Option B: Start Short Transaction (Sell Short)
                // We gain 'p' immediately, so profit increases by 'p'.
                const sellShort = free[j] + p;
                if (sellShort > nextShort[j]) nextShort[j] = sellShort;
            }

            // TRANSITION 2: ENDING TRANSACTIONS
            // This increments the transaction count from j-1 to j.
            if (j > 0) {
                // Option A: End Normal Transaction (Sell)
                // We gain 'p'. Previous state must be 'hold'.
                if (hold[j - 1] !== -Infinity) {
                    const sell = hold[j - 1] + p;
                    if (sell > nextFree[j]) nextFree[j] = sell;
                }
                
                // Option B: End Short Transaction (Buy Back)
                // We lose 'p' (cost to cover short). Previous state must be 'shortSol'.
                if (shortSol[j - 1] !== -Infinity) {
                    const buyBack = shortSol[j - 1] - p;
                    if (buyBack > nextFree[j]) nextFree[j] = buyBack;
                }
            }
        }

        // Swap references to move to the next day without reallocating memory (Performance optimization)
        let temp = free; free = nextFree; nextFree = temp;
        temp = hold; hold = nextHold; nextHold = temp;
        temp = shortSol; shortSol = nextShort; nextShort = temp;
    }

    // The result is the maximum profit found in the 'free' state across all possible transaction counts (0 to k).
    // It is possible that fewer than k transactions yield the best profit.
    let maxProfit = 0;
    for (let j = 0; j <= k; j++) {
        if (free[j] > maxProfit) maxProfit = free[j];
    }
    return maxProfit;
};
