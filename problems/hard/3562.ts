/*
3562. Maximum Profit from Trading Stocks with Discounts

You are given an integer n, representing the number of employees in a company. Each employee is assigned a unique ID from 1 to n, and employee 1 is the CEO. You are given two 1-based integer arrays, present and future, each of length n, where:
present[i] represents the current price at which the ith employee can buy a stock today.
future[i] represents the expected price at which the ith employee can sell the stock tomorrow.
The company's hierarchy is represented by a 2D integer array hierarchy, where hierarchy[i] = [ui, vi] means that employee ui is the direct boss of employee vi.
Additionally, you have an integer budget representing the total funds available for investment.
However, the company has a discount policy: if an employee's direct boss purchases their own stock, then the employee can buy their stock at half the original price (floor(present[v] / 2)).
Return the maximum profit that can be achieved without exceeding the given budget.

Note:
You may buy each stock at most once.
You cannot use any profit earned from future stock prices to fund additional investments and must buy only from budget.

Example 1:
Input: n = 2, present = [1,2], future = [4,3], hierarchy = [[1,2]], budget = 3
Output: 5
Explanation:
Employee 1 buys the stock at price 1 and earns a profit of 4 - 1 = 3.
Since Employee 1 is the direct boss of Employee 2, Employee 2 gets a discounted price of floor(2 / 2) = 1.
Employee 2 buys the stock at price 1 and earns a profit of 3 - 1 = 2.
The total buying cost is 1 + 1 = 2 <= budget. Thus, the maximum total profit achieved is 3 + 2 = 5.

Example 2:
Input: n = 2, present = [3,4], future = [5,8], hierarchy = [[1,2]], budget = 4
Output: 4
Explanation:
Employee 2 buys the stock at price 4 and earns a profit of 8 - 4 = 4.
Since both employees cannot buy together, the maximum profit is 4.

Example 3:
Input: n = 3, present = [4,6,8], future = [7,9,11], hierarchy = [[1,2],[1,3]], budget = 10
Output: 10
Explanation:
Employee 1 buys the stock at price 4 and earns a profit of 7 - 4 = 3.
Employee 3 would get a discounted price of floor(8 / 2) = 4 and earns a profit of 11 - 4 = 7.
Employee 1 and Employee 3 buy their stocks at a total cost of 4 + 4 = 8 <= budget. Thus, the maximum total profit achieved is 3 + 7 = 10.

Example 4:
Input: n = 3, present = [5,2,3], future = [8,5,6], hierarchy = [[1,2],[2,3]], budget = 7
Output: 12
Explanation:
Employee 1 buys the stock at price 5 and earns a profit of 8 - 5 = 3.
Employee 2 would get a discounted price of floor(2 / 2) = 1 and earns a profit of 5 - 1 = 4.
Employee 3 would get a discounted price of floor(3 / 2) = 1 and earns a profit of 6 - 1 = 5.
The total cost becomes 5 + 1 + 1 = 7 <= budget. Thus, the maximum total profit achieved is 3 + 4 + 5 = 12.

Constraints:
1 <= n <= 160
present.length, future.length == n
1 <= present[i], future[i] <= 50
hierarchy.length == n - 1
hierarchy[i] == [ui, vi]
1 <= ui, vi <= n
ui != vi
1 <= budget <= 160
There are no duplicate edges.
Employee 1 is the direct or indirect boss of every employee.
The input graph hierarchy is guaranteed to have no cycles.

</> Typescript code:
*/

function maxProfitCommented(n: number, present: number[], future: number[], hierarchy: number[][], budget: number): number {
    // Convert edge list to adjacency list for tree traversal.
    // Adjust 1-based indices to 0-based.
    const adj: number[][] = Array.from({ length: n }, () => []);
    for (const [u, v] of hierarchy) {
        adj[u - 1].push(v - 1);
    }
    
    // Use a safe negative number for "impossible" states to avoid overflow issues during addition.
    const INF = -1e9;

    // Helper to merge two knapsack DP arrays.
    // Using 'any' type for the arrays to bypass TypeScript 'ArrayBuffer' vs 'ArrayBufferLike' compilation errors
    // while still using Int32Array at runtime for performance.
    function merge(curr: any, child: any): any {
        const next = new Int32Array(budget + 1).fill(INF);
        
        // Knapsack-style combination: iterate through all budget splits.
        for (let i = 0; i <= budget; i++) {
            if (curr[i] === INF) continue;
            
            const limit = budget - i;
            for (let j = 0; j <= limit; j++) {
                if (child[j] === INF) continue;
                
                const totalCost = i + j;
                const totalProfit = curr[i] + child[j];
                
                if (totalProfit > next[totalCost]) {
                    next[totalCost] = totalProfit;
                }
            }
        }
        return next;
    }

    function dfs(u: number): { noBuy: any, buy: any } {
        // aggNoBuy: Max profit from subtree 'u' assuming 'u' DOES NOT buy.
        // aggBuy: Max profit from subtree 'u' assuming 'u' DOES buy.
        // Typed as 'any' to ensure compatibility with the return type of 'merge'.
        let aggNoBuy: any = new Int32Array(budget + 1).fill(INF);
        let aggBuy: any = new Int32Array(budget + 1).fill(INF);
        
        // Base case: cost 0 is profit 0.
        aggNoBuy[0] = 0;
        aggBuy[0] = 0;

        // Post-order traversal: process children first.
        for (const v of adj[u]) {
            const childRes = dfs(v);
            // Merge child's results into current accumulated results.
            aggNoBuy = merge(aggNoBuy, childRes.noBuy);
            aggBuy = merge(aggBuy, childRes.buy);
        }

        // --- Calculate dpNoBuy (Parent of u didn't buy) ---
        // Option 1: u doesn't buy (inherit aggNoBuy)
        const dpNoBuy = new Int32Array(aggNoBuy); 
        
        // Option 2: u buys at FULL price (since parent didn't buy).
        // If u buys, children must have satisfied the condition "parent of child (u) bought" -> aggBuy.
        const costFull = present[u];
        const profitFull = future[u] - costFull;
        if (costFull <= budget) {
            for (let i = 0; i <= budget - costFull; i++) {
                if (aggBuy[i] !== INF) {
                    const newProfit = aggBuy[i] + profitFull;
                    if (newProfit > dpNoBuy[i + costFull]) {
                        dpNoBuy[i + costFull] = newProfit;
                    }
                }
            }
        }

        // --- Calculate dpBuy (Parent of u bought) ---
        // Option 1: u doesn't buy (inherit aggNoBuy - discount availability doesn't matter if not buying)
        const dpBuy = new Int32Array(aggNoBuy); 
        
        // Option 2: u buys at DISCOUNTED price (since parent bought).
        const costDisc = present[u] >> 1; // floor(price / 2)
        const profitDisc = future[u] - costDisc;
        if (costDisc <= budget) {
            for (let i = 0; i <= budget - costDisc; i++) {
                if (aggBuy[i] !== INF) {
                    const newProfit = aggBuy[i] + profitDisc;
                    if (newProfit > dpBuy[i + costDisc]) {
                        dpBuy[i + costDisc] = newProfit;
                    }
                }
            }
        }

        return { noBuy: dpNoBuy, buy: dpBuy };
    }

    // Solve starting from CEO (index 0). 
    // The CEO has no boss, so we take the "noBuy" scenario (no parent bought).
    const result = dfs(0);
    
    // Find the max profit possible within the budget.
    let ans = 0;
    for (let i = 0; i <= budget; i++) {
        if (result.noBuy[i] > ans) ans = result.noBuy[i];
    }
    return ans;
};
