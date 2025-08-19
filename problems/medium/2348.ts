/*
2348. Number of Zero-Filled Subarrays

Given an integer array nums, return the number of subarrays filled with 0.
A subarray is a contiguous non-empty sequence of elements within an array.

Example 1:
Input: nums = [1,3,0,0,2,0,0,4]
Output: 6
Explanation: 
There are 4 occurrences of [0] as a subarray.
There are 2 occurrences of [0,0] as a subarray.
There is no occurrence of a subarray with a size more than 2 filled with 0. Therefore, we return 6.

Example 2:
Input: nums = [0,0,0,2,0,0]
Output: 9
Explanation:
There are 5 occurrences of [0] as a subarray.
There are 3 occurrences of [0,0] as a subarray.
There is 1 occurrence of [0,0,0] as a subarray.
There is no occurrence of a subarray with a size more than 3 filled with 0. Therefore, we return 9.

Example 3:
Input: nums = [2,10,2019]
Output: 0
Explanation: There is no subarray filled with 0. Therefore, we return 0.

Constraints:
1 <= nums.length <= 10^5
-10^9 <= nums[i] <= 10^9

</> Typescript code:
*/

function zeroFilledSubarray(nums: number[]): number {
    // Initialize total count of zero-filled subarrays
    let result = 0;
    
    // Track current sequence length of consecutive zeros
    let consecutiveZeros = 0;
    
    // Iterate through each number in the array
    for (const num of nums) {
        // If current number is zero, extend the consecutive sequence
        if (num === 0) {
            consecutiveZeros++;
        } else {
            // Non-zero encountered: calculate subarrays from current sequence
            // Formula: n consecutive zeros generate n*(n+1)/2 subarrays
            // Using Math.floor to handle potential floating point precision issues
            result += Math.floor(consecutiveZeros * (consecutiveZeros + 1) / 2);
            
            // Reset consecutive zero counter for next potential sequence
            consecutiveZeros = 0;
        }
    }
    
    // Handle final sequence if array ends with zeros
    // Add subarrays from the last consecutive zero sequence
    return result + Math.floor(consecutiveZeros * (consecutiveZeros + 1) / 2);
}
