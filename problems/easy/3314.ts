/*
3314. Construct the Minimum Bitwise Array I

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
2 <= nums[i] <= 1000
nums[i] is a prime number.

</> Typescript code:
*/

function minBitwiseArray(nums: number[]): number[] {
    // Get the length of the input array for iteration
    const n = nums.length;
    // Use Int32Array for better performance and memory efficiency in numerical constraints
    const ans = new Int32Array(n);

    for (let i = 0; i < n; i++) {
        const num = nums[i];

        // The only even prime is 2 (binary 10). 
        // x OR (x+1) for any x will never produce 2.
        if (num === 2) {
            ans[i] = -1;
            continue;
        }

        // We need to find the length of the trailing sequence of 1s in the binary representation.
        // The minimal x is found by changing the last 1 in that sequence to a 0.
        let bit = 0;
        // Shift bits to the right and check if the LSB is 1
        while (((num >> bit) & 1) === 1) {
            bit++;
        }

        // Flip the bit at position (bit - 1) from 1 to 0 using XOR with a bitmask.
        // Example: num = 7 (111), bit = 3 (first 0 at pos 3), bit-1 = 2. 7 ^ (1 << 1) = 111 ^ 010 = 101 (5) NO.
        // Wait, correction: shift bit until the first 0, then the 1 to the right of it is the target.
        // Correct logic: 111 (7) -> bit becomes 3. 1 << (3-1) is 4. 7 ^ 4 = 3 (011). 3 OR 4 = 7.
        ans[i] = num ^ (1 << (bit - 1));
    }
    
    // Convert TypedArray back to standard array as per return type requirement
    return Array.from(ans);
};
