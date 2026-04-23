/*
2615. Sum of Distances

Hint
You are given a 0-indexed integer array nums. There exists an array arr of length nums.length, where arr[i] is the sum of |i - j| over all j such that nums[j] == nums[i] and j != i. If there is no such j, set arr[i] to be 0.
Return the array arr.

Example 1:
Input: nums = [1,3,1,1,2]
Output: [5,0,3,4,0]
Explanation: 
When i = 0, nums[0] == nums[2] and nums[0] == nums[3]. Therefore, arr[0] = |0 - 2| + |0 - 3| = 5. 
When i = 1, arr[1] = 0 because there is no other index with value 3.
When i = 2, nums[2] == nums[0] and nums[2] == nums[3]. Therefore, arr[2] = |2 - 0| + |2 - 3| = 3. 
When i = 3, nums[3] == nums[0] and nums[3] == nums[2]. Therefore, arr[3] = |3 - 0| + |3 - 2| = 4. 
When i = 4, arr[4] = 0 because there is no other index with value 2. 

Example 2:
Input: nums = [0,5,3]
Output: [0,0,0]
Explanation: Since each element in nums is distinct, arr[i] = 0 for all i.

Constraints:
1 <= nums.length <= 10^5
0 <= nums[i] <= 10^9
 
Note: This question is the same as 2121: Intervals Between Identical Elements.

</> Typescript code:
*/

function distance(nums: number[]): number[] {
  const n = nums.length;
  const res = new Array(n).fill(0);
  // Map to group indices by their value: { value: [index1, index2, ...] }
  const groups = new Map<number, number[]>();

  // Single pass to populate the groups O(n)
  for (let i = 0; i < n; i++) {
    if (!groups.has(nums[i])) groups.set(nums[i], []);
    groups.get(nums[i])!.push(i);
  }

  // Process each group of identical numbers
  for (const [val, indices] of groups) {
    const m = indices.length;
    // If the number appears only once, distance is 0 (already filled)
    if (m <= 1) continue;

    // Calculate the total sum of all indices in this group to derive rightSum later
    let totalSum = 0;
    for (const idx of indices) totalSum += idx;

    let leftSum = 0; // Running prefix sum of indices seen so far in this group
    for (let i = 0; i < m; i++) {
      const targetIdx = indices[i];
      // rightSum is the sum of all indices to the right of the current targetIdx
      const rightSum = totalSum - leftSum - targetIdx;

      const leftCount = i; // Number of elements to the left
      const rightCount = m - 1 - i; // Number of elements to the right

      // Mathematical breakdown:
      // Left distances: (targetIdx - leftIdx_1) + (targetIdx - leftIdx_2)...
      // Simplified: (targetIdx * leftCount) - leftSum
      // Right distances: (rightIdx_1 - targetIdx) + (rightIdx_2 - targetIdx)...
      // Simplified: rightSum - (targetIdx * rightCount)
      res[targetIdx] =
        targetIdx * leftCount - leftSum + (rightSum - targetIdx * rightCount);

      // Update leftSum for the next index in the group
      leftSum += targetIdx;
    }
  }

  return res;
}
