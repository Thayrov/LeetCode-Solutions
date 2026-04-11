/*
3741. Minimum Distance Between Three Equal Elements II

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
1 <= n == nums.length <= 10^5
1 <= nums[i] <= n

</> Typescript code:
*/

function minimumDistance(nums: number[]): number {
  // Map to store the last two indices seen for every unique number to save memory over storing all indices
  const lastTwo = new Map<number, [number, number]>();
  // Initialize minimum distance with Infinity for comparison
  let minDistance = Infinity;

  for (let i = 0; i < nums.length; i++) {
    const val = nums[i];
    const prevIndices = lastTwo.get(val);

    if (!prevIndices) {
      // First time seeing the number: store current index in a partial tuple
      lastTwo.set(val, [i, -1]);
    } else if (prevIndices[1] === -1) {
      // Second time seeing the number: update the second slot
      lastTwo.set(val, [prevIndices[0], i]);
    } else {
      // Third (or more) time seeing the number: calculate distance 2 * (k - i)
      // Simplified formula abs(i-j) + abs(j-k) + abs(k-i) reduces to 2 * (max_idx - min_idx)
      const dist = 2 * (i - prevIndices[0]);
      // Update global minimum if the current triple is tighter than previous ones
      if (dist < minDistance) minDistance = dist;
      // Shift indices forward: the previous 2nd index becomes the 1st, current becomes 2nd
      lastTwo.set(val, [prevIndices[1], i]);
    }
  }

  // Return -1 if no good tuple (3 identical numbers) was found, otherwise return the minimum
  return minDistance === Infinity ? -1 : minDistance;
}
