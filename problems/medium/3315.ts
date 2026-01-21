/*
3315. Construct the Minimum Bitwise Array II

You are given an array nums consisting of n prime integers.
You need to construct an array ans of length n, such that, for each index i, the bitwise OR of ans[i] and ans[i] + 1 is equal to nums[i], i.e. ans[i] OR (ans[i] + 1) == nums[i].
Additionally, you must minimize each value of ans[i] in the resulting array.
If it is not possible to find such a value for ans[i] that satisfies the condition, then set ans[i] = -1.

Example 1:
Input: nums = [2,3,5,7]
Output: [-1,1,4,3]
Explanation:
For i = 0, as there is no value for ans[0] that satisfies ans[0] OR (ans[0] + 1) = 2, so ans[0] = -1.
For i = 1, the smallest ans[1] that satisfies ans[1] OR (ans[1] + 1) = 3 is 1, because 1 OR (1 + 1) = 3.
For i = 2, the smallest ans[2] that satisfies ans[2] OR (ans[2] + 1) = 5 is 4, because 4 OR (4 + 1) = 5.
For i = 3, the smallest ans[3] that satisfies ans[3] OR (ans[3] + 1) = 7 is 3, because 3 OR (3 + 1) = 7.

Example 2:
Input: nums = [11,13,31]
Output: [9,12,15]
Explanation:
For i = 0, the smallest ans[0] that satisfies ans[0] OR (ans[0] + 1) = 11 is 9, because 9 OR (9 + 1) = 11.
For i = 1, the smallest ans[1] that satisfies ans[1] OR (ans[1] + 1) = 13 is 12, because 12 OR (12 + 1) = 13.
For i = 2, the smallest ans[2] that satisfies ans[2] OR (ans[2] + 1) = 31 is 15, because 15 OR (15 + 1) = 31.

Constraints:
1 <= nums.length <= 100
2 <= nums[i] <= 10^9
nums[i] is a prime number.

</> Typescript code:
*/

function minBitwiseArray(nums: number[]): number[] {
    const n = nums.length;
    // Use Int32Array for better performance with large sets of integers
    const ans = new Int32Array(n);

    for (let i = 0; i < n; i++) {
        const num = nums[i];

        // The only even prime is 2. x OR (x+1) is always odd.
        // Therefore, no x exists such that x OR (x+1) == 2.
        if (num === 2) {
            ans[i] = -1;
            continue;
        }

        // We need to find the length of the trailing sequence of 1s in binary.
        // Example: 11 is 1011. Trailing 1s = 2.
        let t = num;
        let count = 0;
        while ((t & 1) === 1) {
            t >>= 1; // Shift right to check the next bit
            count++; // Count the consecutive 1s from the right
        }

        // To minimize ans[i], we flip the leftmost '1' of that trailing block to '0'.
        // This is done by XORing num with 2^(count-1).
        // Example: 1011 XOR (1 << (2-1)) = 1011 XOR 0010 = 1001 (9).
        ans[i] = num ^ (1 << (count - 1));
    }

    // Convert TypedArray back to standard number array for LeetCode compatibility
    return Array.from(ans);
}
