/*
808. Soup Servings

You have two soups, A and B, each starting with n mL. On every turn, one of the following four serving operations is chosen at random, each with probability 0.25 independent of all previous turns:
pour 100 mL from type A and 0 mL from type B
pour 75 mL from type A and 25 mL from type B
pour 50 mL from type A and 50 mL from type B
pour 25 mL from type A and 75 mL from type B

Note:
There is no operation that pours 0 mL from A and 100 mL from B.
The amounts from A and B are poured simultaneously during the turn.
If an operation asks you to pour more than you have left of a soup, pour all that remains of that soup.
The process stops immediately after any turn in which one of the soups is used up.
Return the probability that A is used up before B, plus half the probability that both soups are used up in the same turn. Answers within 10-5 of the actual answer will be accepted.

Example 1:
Input: n = 50
Output: 0.62500
Explanation: 
If we perform either of the first two serving operations, soup A will become empty first.
If we perform the third operation, A and B will become empty at the same time.
If we perform the fourth operation, B will become empty first.
So the total probability of A becoming empty first plus half the probability that A and B become empty at the same time, is 0.25 * (1 + 1 + 0.5 + 0) = 0.625.

Example 2:
Input: n = 100
Output: 0.71875
Explanation: 
If we perform the first serving operation, soup A will become empty first.
If we perform the second serving operations, A will become empty on performing operation [1, 2, 3], and both A and B become empty on performing operation 4.
If we perform the third operation, A will become empty on performing operation [1, 2], and both A and B become empty on performing operation 3.
If we perform the fourth operation, A will become empty on performing operation 1, and both A and B become empty on performing operation 2.
So the total probability of A becoming empty first plus half the probability that A and B become empty at the same time, is 0.71875.

Constraints:
0 <= n <= 10^9

</> Typescript code:
*/

function soupServings(n: number): number {
    // For large n (> 4800), probability approaches 1.0 due to asymmetric operations
    // This optimization prevents excessive computation for large inputs
    if (n > 4800) return 1.0;
    
    // Memoization map to store calculated probabilities for each state (a,b)
    const memo = new Map<string, number>();
    
    // Recursive function to calculate probability for remaining soup amounts a and b
    // Working with units of 25ml to reduce state space (divide original amounts by 25)
    function dp(a: number, b: number): number {
        // Base case: both soups empty simultaneously - contributes 0.5 to probability
        if (a <= 0 && b <= 0) return 0.5;
        // Base case: only soup A is empty - contributes 1.0 to probability
        if (a <= 0) return 1.0;
        // Base case: only soup B is empty - contributes 0.0 to probability
        if (b <= 0) return 0.0;
        
        // Create unique key for current state to check memoization
        const key = `${a},${b}`;
        // Return cached result if already calculated
        if (memo.has(key)) return memo.get(key)!;
        
        // Calculate probability as weighted average of all four operations
        // Each operation has 0.25 probability:
        // Operation 1: pour 4 units from A, 0 from B (100ml A, 0ml B)
        // Operation 2: pour 3 units from A, 1 from B (75ml A, 25ml B)
        // Operation 3: pour 2 units from A, 2 from B (50ml A, 50ml B)
        // Operation 4: pour 1 unit from A, 3 from B (25ml A, 75ml B)
        const result = 0.25 * (
            dp(a - 4, b) +
            dp(a - 3, b - 1) +
            dp(a - 2, b - 2) +
            dp(a - 1, b - 3)
        );
        
        // Store result in memoization map before returning
        memo.set(key, result);
        return result;
    }
    
    // Start recursion with initial soup amounts converted to 25ml units
    // Use Math.ceil to handle cases where n is not divisible by 25
    return dp(Math.ceil(n / 25), Math.ceil(n / 25));
}
