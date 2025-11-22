/*
3190. Find Minimum Operations to Make All Elements Divisible by Three

You are given an integer array nums. In one operation, you can add or subtract 1 from any element of nums.
Return the minimum number of operations to make all elements of nums divisible by 3.

Example 1:
Input: nums = [1,2,3,4]
Output: 3
Explanation:
All array elements can be made divisible by 3 using 3 operations:
Subtract 1 from 1.
Add 1 to 2.
Subtract 1 from 4.

Example 2:
Input: nums = [3,6,9]
Output: 0

Constraints:
1 <= nums.length <= 50
1 <= nums[i] <= 50

</> Typescript code:
*/

function minimumOperations(nums: number[]): number {
    // Initialize a counter to track the total number of operations needed.
    let count = 0;

    // Iterate through the array using a standard for-loop.
    // Caching 'len' (nums.length) prevents accessing the property on every iteration, 
    // providing a micro-optimization for performance.
    for (let i = 0, len = nums.length; i < len; ++i) {
        
        // Check the remainder of the current number when divided by 3.
        // Logic:
        // 1. If nums[i] % 3 == 0, it is already divisible. Operations needed: 0.
        // 2. If nums[i] % 3 == 1, we subtract 1. Operations needed: 1.
        // 3. If nums[i] % 3 == 2, we add 1. Operations needed: 1.
        // Therefore, any non-zero remainder (truthy value in JS/TS) implies exactly 1 operation.
        if (nums[i] % 3) {
            
            // If the remainder is not 0, increment the operation count.
            count++;
        }
    }

    // Return the total count of numbers that required an operation.
    return count;
}
