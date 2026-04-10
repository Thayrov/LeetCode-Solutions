/*
3740. Minimum Distance Between Three Equal Elements I

Hint
You are given an integer array nums.
A tuple (i, j, k) of 3 distinct indices is good if nums[i] == nums[j] == nums[k].
The distance of a good tuple is abs(i - j) + abs(j - k) + abs(k - i), where abs(x) denotes the absolute value of x.
Return an integer denoting the minimum possible distance of a good tuple. If no good tuples exist, return -1.

Example 1:
Input: nums = [1,2,1,1,3]
Output: 6
Explanation:
The minimum distance is achieved by the good tuple (0, 2, 3).
(0, 2, 3) is a good tuple because nums[0] == nums[2] == nums[3] == 1. Its distance is abs(0 - 2) + abs(2 - 3) + abs(3 - 0) = 2 + 1 + 3 = 6.

Example 2:
Input: nums = [1,1,2,3,2,1,2]
Output: 8
Explanation:
The minimum distance is achieved by the good tuple (2, 4, 6).
(2, 4, 6) is a good tuple because nums[2] == nums[4] == nums[6] == 2. Its distance is abs(2 - 4) + abs(4 - 6) + abs(6 - 2) = 2 + 2 + 4 = 8.

Example 3:
Input: nums = [1]
Output: -1
Explanation:
There are no good tuples. Therefore, the answer is -1.

Constraints:
1 <= n == nums.length <= 100
1 <= nums[i] <= n

</> Typescript code:
*/

function minimumDistance(nums: number[]): number {
  // Map to store the indices of each unique number encountered
  const indicesMap: Map<number, number[]> = new Map();
  // Initialize minimum distance with Infinity to track the lowest value
  let minDistance = Infinity;

  // Single pass through the array to collect indices and calculate distances
  for (let i = 0; i < nums.length; i++) {
    const val = nums[i];

    // If the number is seen for the first time, initialize its index list
    if (!indicesMap.has(val)) {
      indicesMap.set(val, [i]);
    } else {
      const list = indicesMap.get(val)!;
      // Add current index to the list of indices for this specific value
      list.push(i);

      // A 'good tuple' requires at least 3 occurrences of the same number
      if (list.length >= 3) {
        // Formula |i-j| + |j-k| + |k-i| simplified for sorted i < j < k is 2 * (k - i)
        // We use the current index (k) and the index two positions back (i)
        const dist = 2 * (i - list[list.length - 3]);
        // Update the global minimum if the current triplet is closer
        if (dist < minDistance) minDistance = dist;
      }
    }
  }

  // Return the minimum distance found, or -1 if no good tuple exists
  return minDistance === Infinity ? -1 : minDistance;
}
