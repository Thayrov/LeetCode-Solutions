/*
3350. Adjacent Increasing Subarrays Detection II

Given an array nums of n integers, your task is to find the maximum value of k for which there exist two adjacent subarrays of length k each, such that both subarrays are strictly increasing. Specifically, check if there are two subarrays of length k starting at indices a and b (a < b), where:
Both subarrays nums[a..a + k - 1] and nums[b..b + k - 1] are strictly increasing.
The subarrays must be adjacent, meaning b = a + k.
Return the maximum possible value of k.
A subarray is a contiguous non-empty sequence of elements within an array.

Example 1:
Input: nums = [2,5,7,8,9,2,3,4,3,1]
Output: 3
Explanation:
The subarray starting at index 2 is [7, 8, 9], which is strictly increasing.
The subarray starting at index 5 is [2, 3, 4], which is also strictly increasing.
These two subarrays are adjacent, and 3 is the maximum possible value of k for which two such adjacent strictly increasing subarrays exist.

Example 2:
Input: nums = [1,2,3,4,4,4,4,5,6,7]
Output: 2
Explanation:
The subarray starting at index 0 is [1, 2], which is strictly increasing.
The subarray starting at index 2 is [3, 4], which is also strictly increasing.
These two subarrays are adjacent, and 2 is the maximum possible value of k for which two such adjacent strictly increasing subarrays exist.

Constraints:
2 <= nums.length <= 2 * 10^5
-10^9 <= nums[i] <= 10^9

</> Typescript code:
*/

function maxIncreasingSubarrays(nums: number[]): number {
    // Store the length of the strictly increasing subarray starting at each index
    const n = nums.length;
    const lengths = new Array(n).fill(1);
    
    // Build lengths array from right to left
    // lengths[i] = length of strictly increasing subarray starting at index i
    for (let i = n - 2; i >= 0; i--) {
        // If current element is less than next, extend the increasing sequence
        if (nums[i] < nums[i + 1]) {
            lengths[i] = lengths[i + 1] + 1;
        }
        // Otherwise, lengths[i] remains 1 (single element subarray)
    }
    
    // Track the maximum k value found
    let maxK = 0;
    
    // Check each position as a potential starting point
    for (let i = 0; i < n; i++) {
        const currentLen = lengths[i];
        
        // Case 1: Split a single increasing subarray into two equal parts
        // Maximum k from splitting is floor(currentLen / 2)
        maxK = Math.max(maxK, Math.floor(currentLen / 2));
        
        // Case 2: Two different adjacent increasing subarrays
        // Next subarray starts right after current one ends
        const nextStart = i + currentLen;
        if (nextStart < n) {
            // k is limited by the minimum of the two adjacent subarray lengths
            maxK = Math.max(maxK, Math.min(currentLen, lengths[nextStart]));
        }
    }
    
    return maxK;
}
