/*
2561. Rearranging Fruits

You have two fruit baskets containing n fruits each. You are given two 0-indexed integer arrays basket1 and basket2 representing the cost of fruit in each basket. You want to make both baskets equal. To do so, you can use the following operation as many times as you want:
Chose two indices i and j, and swap the ith fruit of basket1 with the jth fruit of basket2.
The cost of the swap is min(basket1[i],basket2[j]).
Two baskets are considered equal if sorting them according to the fruit cost makes them exactly the same baskets.
Return the minimum cost to make both the baskets equal or -1 if impossible.

Example 1:
Input: basket1 = [4,2,2,2], basket2 = [1,4,1,2]
Output: 1
Explanation: Swap index 1 of basket1 with index 0 of basket2, which has cost 1. Now basket1 = [4,1,2,2] and basket2 = [2,4,1,2]. Rearranging both the arrays makes them equal.

Example 2:
Input: basket1 = [2,3,4,1], basket2 = [3,2,5,1]
Output: -1
Explanation: It can be shown that it is impossible to make both the baskets equal.

Constraints:
basket1.length == basket2.length
1 <= basket1.length <= 10^5
1 <= basket1[i],basket2[i] <= 10^9
</> Typescript code:
*/

function minCost(basket1: number[], basket2: number[]): number {
    // Create frequency maps to count occurrences of each fruit
    const freq = new Map<number, number>(); // Total frequency across both baskets
    const count1 = new Map<number, number>(); // Frequency in basket1
    const count2 = new Map<number, number>(); // Frequency in basket2
    
    // Count fruits in basket1
    for (const fruit of basket1) {
        freq.set(fruit, (freq.get(fruit) || 0) + 1);
        count1.set(fruit, (count1.get(fruit) || 0) + 1);
    }
    // Count fruits in basket2, adding to total frequency
    for (const fruit of basket2) {
        freq.set(fruit, (freq.get(fruit) || 0) + 1);
        count2.set(fruit, (count2.get(fruit) || 0) + 1);
    }
    
    // Track minimum fruit cost for potential indirect swapping
    let minFruit = Infinity;
    // Check if equal distribution is possible and find minimum fruit cost
    for (const [fruit, count] of freq) {
        // If any fruit has odd total count, equal distribution is impossible
        if (count % 2 !== 0) return -1;
        // Track cheapest fruit for indirect swapping strategy
        minFruit = Math.min(minFruit, fruit);
    }
    
    // Arrays to store excess fruits from both baskets that need to be swapped
    const excess1: number[] = [];
    const excess2: number[] = [];
    
    // Identify excess fruits in both baskets that need to be redistributed
    for (const [fruit, totalCount] of freq) {
        const needed = totalCount / 2; // Each basket should have half of total count
        const has1 = count1.get(fruit) || 0; // How many basket1 currently has
        const has2 = count2.get(fruit) || 0; // How many basket2 currently has
        
        // If basket1 has more than needed, add excess instances to swap list
        if (has1 > needed) {
            for (let i = 0; i < has1 - needed; i++) {
                excess1.push(fruit);
            }
        }
        // If basket2 has more than needed, add excess instances to swap list
        if (has2 > needed) {
            for (let i = 0; i < has2 - needed; i++) {
                excess2.push(fruit);
            }
        }
    }
    
    // Sort excess1 ascending and excess2 descending for optimal pairing
    excess1.sort((a, b) => a - b);
    excess2.sort((a, b) => b - a);
    
    // Calculate minimum cost for all required swaps
    let cost = 0;
    const n = excess1.length; // Number of swaps needed
    
    for (let i = 0; i < n; i++) {
        // For each pair of excess fruits, choose minimum cost between:
        // 1. Direct swap cost: min(excess1[i], excess2[i])
        // 2. Indirect swap via cheapest fruit: 2 * minFruit
        const directCost = Math.min(excess1[i], excess2[i]);
        const indirectCost = 2 * minFruit;
        cost += Math.min(directCost, indirectCost);
    }
    
    return cost;
};
