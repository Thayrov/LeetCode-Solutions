/*
2787. Ways to Express an Integer as Sum of Powers

Given two positive integers n and x.
Return the number of ways n can be expressed as the sum of the xth power of unique positive integers, in other words, the number of sets of unique integers [n1, n2, ..., nk] where n = n1x + n2x + ... + nkx.
Since the result can be very large, return it modulo 109 + 7.
For example, if n = 160 and x = 3, one way to express n is n = 23 + 33 + 53.

Example 1:
Input: n = 10, x = 2
Output: 1
Explanation: We can express n as the following: n = 32 + 12 = 10.
It can be shown that it is the only way to express 10 as the sum of the 2nd power of unique integers.

Example 2:
Input: n = 4, x = 1
Output: 2
Explanation: We can express n in the following ways:
- n = 41 = 4.
- n = 31 + 11 = 4.

Constraints:
1 <= n <= 300
1 <= x <= 5

</> Typescript code:
*/

function numberOfWays(n: number, x: number): number {
    // Define the modulo constant as specified in the problem
    const MOD = 1000000007;
    
    // Initialize DP array where dp[i] represents the number of ways to form sum i
    const dp = new Array(n + 1).fill(0);
    
    // Base case: there's exactly one way to form sum 0 (using no numbers)
    dp[0] = 1;
    
    // Iterate through all possible base numbers i where i^x <= n
    for (let i = 1; Math.pow(i, x) <= n; i++) {
        // Calculate the power of current base number
        const power = Math.pow(i, x);
        
        // Iterate backwards through all possible sums to avoid using the same number twice
        for (let j = n; j >= power; j--) {
            // Update dp[j] by adding the number of ways to form (j - power)
            // This represents including the current power in our sum
            dp[j] = (dp[j] + dp[j - power]) % MOD;
        }
    }
    
    // Return the number of ways to form exactly sum n
    return dp[n];
}
