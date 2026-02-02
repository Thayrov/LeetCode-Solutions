/*
3013. Divide an Array Into Subarrays With Minimum Cost II

You are given a 0-indexed array of integers nums of length n, and two positive integers k and dist.
The cost of an array is the value of its first element. For example, the cost of [1,2,3] is 1 while the cost of [3,4,1] is 3.
You need to divide nums into k disjoint contiguous subarrays, such that the difference between the starting index of the second subarray and the starting index of the kth subarray should be less than or equal to dist. In other words, if you divide nums into the subarrays nums[0..(i1 - 1)], nums[i1..(i2 - 1)], ..., nums[ik-1..(n - 1)], then ik-1 - i1 <= dist.
Return the minimum possible sum of the cost of these subarrays.

Example 1:
Input: nums = [1,3,2,6,4,2], k = 3, dist = 3
Output: 5
Explanation: The best possible way to divide nums into 3 subarrays is: [1,3], [2,6,4], and [2]. This choice is valid because ik-1 - i1 is 5 - 2 = 3 which is equal to dist. The total cost is nums[0] + nums[2] + nums[5] which is 1 + 2 + 2 = 5.
It can be shown that there is no possible way to divide nums into 3 subarrays at a cost lower than 5.

Example 2:
Input: nums = [10,1,2,2,2,1], k = 4, dist = 3
Output: 15
Explanation: The best possible way to divide nums into 4 subarrays is: [10], [1], [2], and [2,2,1]. This choice is valid because ik-1 - i1 is 3 - 1 = 2 which is less than dist. The total cost is nums[0] + nums[1] + nums[2] + nums[3] which is 10 + 1 + 2 + 2 = 15.
The division [10], [1], [2,2,2], and [1] is not valid, because the difference between ik-1 and i1 is 5 - 1 = 4, which is greater than dist.
It can be shown that there is no possible way to divide nums into 4 subarrays at a cost lower than 15.

Example 3:
Input: nums = [10,8,18,9], k = 3, dist = 1
Output: 36
Explanation: The best possible way to divide nums into 4 subarrays is: [10], [8], and [18,9]. This choice is valid because ik-1 - i1 is 2 - 1 = 1 which is equal to dist.The total cost is nums[0] + nums[1] + nums[2] which is 10 + 8 + 18 = 36.
The division [10], [8,18], and [9] is not valid, because the difference between ik-1 and i1 is 3 - 1 = 2, which is greater than dist.
It can be shown that there is no possible way to divide nums into 3 subarrays at a cost lower than 36.

Constraints:
3 <= n <= 10^5
1 <= nums[i] <= 10^9
3 <= k <= n
k - 2 <= dist <= n - 2

</> Typescript code:
*/

/**
 * To find the minimum cost, we use a sliding window of size 'dist + 1'.
 * Inside this window, we need to pick the 'k-1' smallest elements.
 * We use a Binary Indexed Tree (Fenwick Tree) to perform frequency and prefix sum queries in O(log N).
 */
function minimumCost(nums: number[], k: number, dist: number): number {
  const n = nums.length;
  // The first element is always included. We look at everything from index 1 onwards.
  const candidates = nums.slice(1);
  // Coordinate compression: Map large values to 1...M for the Fenwick Tree.
  const sortedUnique = Array.from(new Set(candidates)).sort((a, b) => a - b);
  const valToIndex = new Map<number, number>();
  for (let i = 0; i < sortedUnique.length; i++)
    valToIndex.set(sortedUnique[i], i + 1);

  const m = sortedUnique.length;
  const treeCount = new BigUint64Array(m + 1); // Stores frequency of values
  const treeSum = new BigUint64Array(m + 1); // Stores sum of values

  // Standard Fenwick Tree update function
  function update(val: number, delta: bigint) {
    let idx = valToIndex.get(val)!;
    const valBig = BigInt(val);
    while (idx <= m) {
      treeCount[idx] += delta;
      treeSum[idx] += delta * valBig;
      idx += idx & -idx;
    }
  }

  // Binary lifting on Fenwick Tree to find the sum of the 'count' smallest elements in O(log M)
  function query(count: number): bigint {
    let idx = 0;
    let currentCount = 0n;
    let currentSum = 0n;
    // Iterate through powers of 2 to find the position in the BIT
    for (let i = 1 << Math.floor(Math.log2(m)); i > 0; i >>= 1) {
      let nextIdx = idx + i;
      if (nextIdx <= m && currentCount + treeCount[nextIdx] < BigInt(count)) {
        idx = nextIdx;
        currentCount += treeCount[idx];
        currentSum += treeSum[idx];
      }
    }
    // If we still need more elements, take them from the next available value in the sorted list
    if (idx < m) {
      const needed = BigInt(count) - currentCount;
      currentSum += needed * BigInt(sortedUnique[idx]);
    }
    return currentSum;
  }

  let minAdditionalCost = -1n;
  const targetCount = k - 1; // We need k-1 more subarrays (first one is nums[0])

  for (let i = 0; i < candidates.length; i++) {
    // Add the current element to the BIT
    update(candidates[i], 1n);
    // Remove the element that falls out of the 'dist' range window
    if (i > dist) update(candidates[i - (dist + 1)], -1n);

    // Once the window reaches its required size (dist + 1), start calculating the min
    if (i >= dist) {
      const res = query(targetCount);
      if (minAdditionalCost === -1n || res < minAdditionalCost) {
        minAdditionalCost = res;
      }
    }
  }

  // Final answer is the constant nums[0] + the smallest sum of k-1 elements found
  return Number(BigInt(nums[0]) + minAdditionalCost);
}
