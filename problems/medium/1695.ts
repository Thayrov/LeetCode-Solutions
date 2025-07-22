/*
1695. Maximum Erasure Value

You are given an array of positive integers nums and want to erase a subarray containing unique elements. The score you get by erasing the subarray is equal to the sum of its elements.
Return the maximum score you can get by erasing exactly one subarray.
An array b is called to be a subarray of a if it forms a contiguous subsequence of a, that is, if it is equal to a[l],a[l+1],...,a[r] for some (l,r).

Example 1:
Input: nums = [4,2,4,5,6]
Output: 17
Explanation: The optimal subarray here is [2,4,5,6].

Example 2:
Input: nums = [5,2,1,2,5,2,1,2,5]
Output: 8
Explanation: The optimal subarray here is [5,2,1] or [1,2,5].

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^4

</> Typescript code:
*/

function maximumUniqueSubarray(nums: number[]): number {
    // Use array instead of Map for O(1) access since nums[i] <= 10^4
    // Initialize all positions to -1 to indicate "not seen yet"
    const lastPos = new Array(10001).fill(-1);

    // Track maximum sum found, current window sum, and left boundary of sliding window
    let maxSum = 0, currentSum = 0, left = 0;

    // Expand window by moving right pointer through the array
    for (let right = 0; right < nums.length; right++) {
        const num = nums[right];

        // If current number was seen within current window (lastPos[num] >= left)
        if (lastPos[num] >= left) {
            // Shrink window from left until we pass the duplicate element
            // This maintains the unique elements invariant
            while (left <= lastPos[num]) {
                currentSum -= nums[left]; // Remove element from current sum
                left++; // Move left boundary forward
            }
        }

        // Update last seen position of current number to current index
        lastPos[num] = right;

        // Add current number to window sum
        currentSum += num;

        // Update maximum sum if current window sum is larger
        maxSum = Math.max(maxSum, currentSum);
    }

    // Return the maximum sum of any subarray with unique elements
    return maxSum;
}