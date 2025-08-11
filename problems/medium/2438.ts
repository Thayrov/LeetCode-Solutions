/*
2438. Range Product Queries of Powers

Given a positive integer n, there exists a 0-indexed array called powers, composed of the minimum number of powers of 2 that sum to n. The array is sorted in non-decreasing order, and there is only one way to form the array.
You are also given a 0-indexed 2D integer array queries, where queries[i] = [lefti, righti]. Each queries[i] represents a query where you have to find the product of all powers[j] with lefti <= j <= righti.
Return an array answers, equal in length to queries, where answers[i] is the answer to the ith query. Since the answer to the ith query may be too large, each answers[i] should be returned modulo 109 + 7.

Example 1:
Input: n = 15, queries = [[0,1],[2,2],[0,3]]
Output: [2,4,64]
Explanation:
For n = 15, powers = [1,2,4,8]. It can be shown that powers cannot be a smaller size.
Answer to 1st query: powers[0] * powers[1] = 1 * 2 = 2.
Answer to 2nd query: powers[2] = 4.
Answer to 3rd query: powers[0] * powers[1] * powers[2] * powers[3] = 1 * 2 * 4 * 8 = 64.
Each answer modulo 109 + 7 yields the same answer, so [2,4,64] is returned.

Example 2:
Input: n = 2, queries = [[0,0]]
Output: [2]
Explanation:
For n = 2, powers = [2].
The answer to the only query is powers[0] = 2. The answer modulo 109 + 7 is the same, so [2] is returned.

Constraints:
1 <= n <= 10^9
1 <= queries.length <= 10^5
0 <= starti <= endi < powers.length

</> Typescript code:
*/

function productQueriesCommented(n: number, queries: number[][]): number[] {
    // Define the modulo constant as specified in the problem
    const MOD = 1000000007;
    
    // Array to store the exponents of powers of 2 that make up n
    const exponents: number[] = [];
    
    // Bit position counter starting from 2^0
    let bit = 0;
    
    // Extract all set bits from n to find powers of 2
    while (n > 0) {
        // Check if the least significant bit is set
        if (n & 1) exponents.push(bit);
        // Right shift n by 1 bit (unsigned shift to handle large numbers)
        n >>>= 1;
        // Move to the next bit position
        bit++;
    }
    
    // Create prefix sum array for exponents (one extra element for easier range calculation)
    const prefixSums = new Array(exponents.length + 1).fill(0);
    
    // Build prefix sums of exponents for O(1) range sum queries
    for (let i = 0; i < exponents.length; i++) {
        prefixSums[i + 1] = prefixSums[i] + exponents[i];
    }
    
    // Efficient modular exponentiation using BigInt for precision with large exponents
    function modPow(base: number, exp: number, mod: number): number {
        // Initialize result to 1 using BigInt for precision
        let result = 1n;
        // Convert base to BigInt and ensure it's within modulo range
        let baseBig = BigInt(base) % BigInt(mod);
        // Convert exponent to BigInt
        let expBig = BigInt(exp);
        // Convert modulo to BigInt for consistent operations
        const modBig = BigInt(mod);
        
        // Binary exponentiation loop using BigInt arithmetic
        while (expBig > 0n) {
            // If current bit of exponent is set, multiply result by current base
            if (expBig & 1n) result = (result * baseBig) % modBig;
            // Square the base for next iteration
            baseBig = (baseBig * baseBig) % modBig;
            // Right shift exponent by 1 bit
            expBig >>= 1n;
        }
        // Convert back to number (safe since result is mod 10^9+7)
        return Number(result);
    }
    
    // Process each query and return the result
    return queries.map(([left, right]) => 
        // Calculate 2^(sum of exponents in range [left, right])
        modPow(2, prefixSums[right + 1] - prefixSums[left], MOD)
    );
}
