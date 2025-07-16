/*
3201. Find the Maximum Length of Valid Subsequence I

You are given an integer array nums.
A subsequence sub of nums with length x is called valid if it satisfies:
(sub[0] + sub[1]) % 2 == (sub[1] + sub[2]) % 2 == ... == (sub[x - 2] + sub[x - 1]) % 2.
Return the length of the longest valid subsequence of nums.
A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

Example 1:
Input: nums = [1,2,3,4]
Output: 4
Explanation:
The longest valid subsequence is [1, 2, 3, 4].

Example 2:
Input: nums = [1,2,1,1,2,1,2]
Output: 6
Explanation:
The longest valid subsequence is [1, 2, 1, 2, 1, 2].

Example 3:
Input: nums = [1,3]
Output: 2
Explanation:
The longest valid subsequence is [1, 3].

Constraints:
2 <= nums.length <= 2 * 10^5
1 <= nums[i] <= 10^7

</> Typescript code:
*/

function maximumLength(nums: number[]): number {
    // Store array length for efficient access
    const n = nums.length;

    // Count total even and odd numbers for same-parity subsequences
    let evenCount = 0, oddCount = 0;

    // Count even and odd numbers in single pass
    for (let i = 0; i < n; i++) {
        // Use bitwise AND for fast parity check (odd if lowest bit is 1)
        if (nums[i] & 1) oddCount++;
        else evenCount++;
    }

    // Track maximum length of alternating subsequences
    let maxAlternating = 1;

    // Dynamic programming variables for alternating patterns
    // evenToOdd: length of subsequence ending with odd number (last transition even->odd)
    // oddToEven: length of subsequence ending with even number (last transition odd->even)
    let evenToOdd = 0, oddToEven = 0;

    // Single pass to find longest alternating subsequence
    for (let i = 0; i < n; i++) {
        const isOdd = nums[i] & 1;

        if (isOdd) {
            // Current number is odd, extend even->odd pattern
            // Take previous oddToEven length and add current odd number
            evenToOdd = oddToEven + 1;
        } else {
            // Current number is even, extend odd->even pattern
            // Take previous evenToOdd length and add current even number
            oddToEven = evenToOdd + 1;
        }

        // Update maximum alternating length found so far
        maxAlternating = Math.max(maxAlternating, evenToOdd, oddToEven);
    }

    // Return maximum of all possible valid subsequence lengths:
    // - All even numbers (adjacent sums are even)
    // - All odd numbers (adjacent sums are even)
    // - Longest alternating pattern (adjacent sums are odd)
    return Math.max(evenCount, oddCount, maxAlternating);
}