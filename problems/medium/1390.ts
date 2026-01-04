/*
1390. Four Divisors

Given an integer array nums, return the sum of divisors of the integers in that array that have exactly four divisors. If there is no such integer in the array, return 0.

Example 1:
Input: nums = [21,4,7]
Output: 32
Explanation: 
21 has 4 divisors: 1, 3, 7, 21
4 has 3 divisors: 1, 2, 4
7 has 2 divisors: 1, 7
The answer is the sum of divisors of 21 only.

Example 2:
Input: nums = [21,21]
Output: 64

Example 3:
Input: nums = [1,2,3,4,5]
Output: 0

Constraints:
1 <= nums.length <= 10^4
1 <= nums[i] <= 10^5

</> Typescript code:
*/

function sumFourDivisors(nums: number[]): number {
    // Stores the cumulative sum of divisors for all valid numbers in the array
    let totalSum = 0;

    // Iterate through each number in the input array
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        let count = 0;
        let currentSum = 0;
        // Optimization: only iterate up to the square root of the number
        const sqrt = Math.sqrt(num);

        for (let d = 1; d <= sqrt; d++) {
            // Check if 'd' is a divisor of 'num'
            if (num % d === 0) {
                // Case: The divisor is the square root (e.g., 4 for 16)
                if (d * d === num) {
                    count += 1;
                    currentSum += d;
                } 
                // Case: 'd' and 'num/d' are two distinct divisors
                else {
                    count += 2;
                    currentSum += (d + num / d);
                }
            }
            // Optimization: If divisors exceed 4, stop checking this number immediately
            if (count > 4) break;
        }

        // If the number has exactly four divisors, add their sum to the total
        if (count === 4) {
            totalSum += currentSum;
        }
    }

    // Return the final accumulated sum
    return totalSum;
}
