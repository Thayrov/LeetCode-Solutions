/*
1015. Smallest Integer Divisible by K

Given a positive integer k, you need to find the length of the smallest positive integer n such that n is divisible by k, and n only contains the digit 1.
Return the length of n. If there is no such n, return -1.

Note: n may not fit in a 64-bit signed integer.

Example 1:
Input: k = 1
Output: 1
Explanation: The smallest answer is n = 1, which has length 1.

Example 2:
Input: k = 2
Output: -1
Explanation: There is no such positive integer n divisible by 2.

Example 3:
Input: k = 3
Output: 3
Explanation: The smallest answer is n = 111, which has length 3.

Constraints:
1 <= k <= 10^5
 
</> Typescript code:
*/

function smallestRepunitDivByK(k: number): number {
    // Early exit: repunits (numbers with only 1s) always end in 1,
    // so they can never be divisible by 2 or 5
    if (k % 2 === 0 || k % 5 === 0) return -1;
    
    // Track the remainder of our current repunit divided by k
    // Start at 0 (representing the number before we begin: 0)
    let remainder = 0;
    
    // Iterate up to k times (by pigeonhole principle, if solution exists, we'll find it within k iterations)
    // length represents how many 1s are in our current repunit
    for (let length = 1; length <= k; length++) {
        // Build the next repunit using modular arithmetic:
        // To go from 11 to 111: multiply by 10 and add 1
        // We only track remainder to avoid integer overflow
        // (remainder * 10 + 1) simulates appending another '1' digit
        remainder = (remainder * 10 + 1) % k;
        
        // If remainder is 0, current repunit is divisible by k
        // Return the length (number of 1s)
        if (remainder === 0) return length;
    }
    
    // If we've tried k different lengths and found no solution,
    // we've encountered all possible remainders and are in a cycle
    // No solution exists
    return -1;
}
