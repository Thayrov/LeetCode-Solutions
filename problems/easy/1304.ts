/*
1304. Find N Unique Integers Sum up to Zero

Given an integer n, return any array containing n unique integers such that they add up to 0.

Example 1:
Input: n = 5
Output: [-7,-1,1,3,4]
Explanation: These arrays also are accepted [-5,-1,1,2,3] , [-3,-1,2,-2,4].

Example 2:
Input: n = 3
Output: [-1,0,1]

Example 3:
Input: n = 1
Output: [0]

Constraints:
1 <= n <= 1000

</> Typescript code:
*/

function sumZero(n: number): number[] {
    // Pre-allocate array with exact size for optimal memory usage
    const result: number[] = new Array(n);
    
    // Use bit shift for faster division by 2 (n >> 1 === Math.floor(n/2))
    const half = n >> 1;
    
    // Create pairs of positive/negative numbers that cancel out
    for (let i = 0; i < half; i++) {
        // Generate positive number starting from 1
        const val = i + 1;
        
        // Place positive number at even index using bit shift (i << 1 === i * 2)
        result[i << 1] = val;
        
        // Place negative counterpart at next odd index
        result[(i << 1) + 1] = -val;
    }
    
    // Check if n is odd using bitwise AND (n & 1 === n % 2)
    if (n & 1) {
        // Add 0 at the end to maintain sum of zero without affecting uniqueness
        result[n - 1] = 0;
    }
    
    return result;
}
