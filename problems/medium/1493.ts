/*
1493. Longest Subarray of 1's After Deleting One Element

Given a binary array nums, you should delete one element from it.
Return the size of the longest non-empty subarray containing only 1's in the resulting array. Return 0 if there is no such subarray.

Example 1:
Input: nums = [1,1,0,1]
Output: 3
Explanation: After deleting the number in position 2, [1,1,1] contains 3 numbers with value of 1's.

Example 2:
Input: nums = [0,1,1,1,0,1,1,0,1]
Output: 5
Explanation: After deleting the number in position 4, [0,1,1,1,1,1,0,1] longest subarray with value of 1's is [1,1,1,1,1].

Example 3:
Input: nums = [1,1,1]
Output: 2
Explanation: You must delete one element.

Constraints:
1 <= nums.length <= 10^5
nums[i] is either 0 or 1.

</> Typescript code:
*/

function longestSubarray(nums: number[]): number {
    // Initialize the left pointer of the sliding window.
    let left = 0;
    // Initialize a counter for the number of zeros within the current window.
    let zeroCount = 0;
    // Initialize a variable to store the maximum length found so far.
    let maxLength = 0;

    // Iterate through the array with the right pointer to expand the window.
    for (let right = 0; right < nums.length; right++) {
        // If the current element is a zero, increment the zero counter.
        if (nums[right] === 0) {
            zeroCount++;
        }

        // This loop shrinks the window from the left if it contains more than one zero.
        // A valid window for this problem can have at most one zero (the one to be deleted).
        while (zeroCount > 1) {
            // If the element at the left pointer is a zero, decrement the counter as it's being removed from the window.
            if (nums[left] === 0) {
                zeroCount--;
            }
            // Move the left pointer to the right, effectively shrinking the window.
            left++;
        }

        // After ensuring the window is valid (<= 1 zero), calculate its length.
        // The length of the subarray of 1s is the window size (right - left + 1) minus the number of zeros (1).
        // This simplifies to `right - left`. This formula also works if there are no zeros in the window,
        // as we must delete one element anyway, so the length would be `(right - left + 1) - 1`.
        maxLength = Math.max(maxLength, right - left);
    }

    // Return the maximum length found throughout the iteration.
    return maxLength;
};
