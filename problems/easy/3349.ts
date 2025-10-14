/*
3349. Adjacent Increasing Subarrays Detection I

Given an array nums of n integers and an integer k, determine whether there exist two adjacent
of length k such that both subarrays are strictly increasing. Specifically, check if there are two subarrays starting at indices a and b (a < b), where:
Both subarrays nums[a..a + k - 1] and nums[b..b + k - 1] are strictly increasing.
The subarrays must be adjacent, meaning b = a + k.
Return true if it is possible to find two such subarrays, and false otherwise.

Example 1:
Input: nums = [2,5,7,8,9,2,3,4,3,1], k = 3
Output: true
Explanation:
The subarray starting at index 2 is [7, 8, 9], which is strictly increasing.
The subarray starting at index 5 is [2, 3, 4], which is also strictly increasing.
These two subarrays are adjacent, so the result is true.

Example 2:
Input: nums = [1,2,3,4,4,4,4,5,6,7], k = 5
Output: false

Constraints:
2 <= nums.length <= 100
1 < 2 * k <= nums.length
-1000 <= nums[i] <= 1000

</> Typescript code:
*/

function hasIncreasingSubarrays(nums: number[], k: number): boolean {
    // Track the length of the previous strictly increasing sequence
    let prev = 0;
    // Track the length of the current strictly increasing sequence (starts at 1 for first element)
    let curr = 1;
    
    // Iterate through the array starting from index 1
    for (let i = 1; i < nums.length; i++) {
        // Check if current element continues the strictly increasing sequence
        if (nums[i] > nums[i - 1]) {
            // Increment the current increasing sequence length
            curr++;
        } else {
            // Sequence breaks: store current length as previous
            prev = curr;
            // Reset current sequence length to 1 (starting new sequence at position i)
            curr = 1;
        }
        
        // Check two conditions for adjacent increasing subarrays:
        // 1. Current sequence has k elements AND previous sequence had k elements (adjacent)
        // 2. Current sequence has 2*k elements (contains two adjacent subarrays of length k)
        if ((curr >= k && prev >= k) || curr >= 2 * k) {
            return true;
        }
    }
    
    // No two adjacent strictly increasing subarrays of length k found
    return false;
}
