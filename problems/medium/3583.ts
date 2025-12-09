/*
3583. Count Special Triplets

You are given an integer array nums.
A special triplet is defined as a triplet of indices (i, j, k) such that:
0 <= i < j < k < n, where n = nums.length
nums[i] == nums[j] * 2
nums[k] == nums[j] * 2
Return the total number of special triplets in the array.
Since the answer may be large, return it modulo 109 + 7.

Example 1:
Input: nums = [6,3,6]
Output: 1
Explanation:
The only special triplet is (i, j, k) = (0, 1, 2), where:
nums[0] = 6, nums[1] = 3, nums[2] = 6
nums[0] = nums[1] * 2 = 3 * 2 = 6
nums[2] = nums[1] * 2 = 3 * 2 = 6

Example 2:
Input: nums = [0,1,0,0]
Output: 1
Explanation:
The only special triplet is (i, j, k) = (0, 2, 3), where:
nums[0] = 0, nums[2] = 0, nums[3] = 0
nums[0] = nums[2] * 2 = 0 * 2 = 0
nums[3] = nums[2] * 2 = 0 * 2 = 0

Example 3:
Input: nums = [8,4,2,8,4]
Output: 2
Explanation:
There are exactly two special triplets:
(i, j, k) = (0, 1, 3)
nums[0] = 8, nums[1] = 4, nums[3] = 8
nums[0] = nums[1] * 2 = 4 * 2 = 8
nums[3] = nums[1] * 2 = 4 * 2 = 8
(i, j, k) = (1, 2, 4)
nums[1] = 4, nums[2] = 2, nums[4] = 4
nums[1] = nums[2] * 2 = 2 * 2 = 4
nums[4] = nums[2] * 2 = 2 * 2 = 4

Constraints:
3 <= n == nums.length <= 10^5
0 <= nums[i] <= 10^5

</> Typescript code:
*/

/**
 * Calculates the number of special triplets (i, j, k) where nums[i] = nums[j]*2 and nums[k] = nums[j]*2.
 * Prioritizes performance using TypedArrays for O(1) frequency lookups and a single pass logic.
 */
function specialTriplets(nums: number[]): number {
    const n = nums.length;
    const MOD = 1_000_000_007;
    // Use Uint32Array for better memory performance over standard objects or Maps
    const right = new Uint32Array(100001); 
    const left = new Uint32Array(100001);
    let total = 0;

    // Populate the right frequency array with all numbers initially
    for (let i = 0; i < n; i++) {
        right[nums[i]]++;
    }

    // Iterate through each j which acts as the center of the triplet
    for (let j = 0; j < n; j++) {
        const val = nums[j];
        // Remove current element from right side count as j cannot be k
        right[val]--;
        
        const target = val * 2;
        // Optimization: only check if the doubled value is within range constraints
        if (target <= 100000) {
            const countL = left[target]; // Count of i < j where nums[i] = nums[j]*2
            const countR = right[target]; // Count of k > j where nums[k] = nums[j]*2
            
            if (countL > 0 && countR > 0) {
                // Triplets are formed by multiplying left possibilities by right possibilities
                total = (total + (countL * countR)) % MOD;
            }
        }
        
        // Add current element to left side count for future iterations of j
        left[val]++;
    }

    return total;
}
