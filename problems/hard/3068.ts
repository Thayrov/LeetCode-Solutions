/*
3068. Find the Maximum Sum of Node Values

There exists an undirected tree with n nodes numbered 0 to n - 1. You are given a 0-indexed 2D integer array edges of length n - 1, where edges[i] = [ui, vi] indicates that there is an edge between nodes ui and vi in the tree. You are also given a positive integer k, and a 0-indexed array of non-negative integers nums of length n, where nums[i] represents the value of the node numbered i.

Alice wants the sum of values of tree nodes to be maximum, for which Alice can perform the following operation any number of times (including zero) on the tree:

Choose any edge [u, v] connecting the nodes u and v, and update their values as follows:
nums[u] = nums[u] XOR k
nums[v] = nums[v] XOR k
Return the maximum possible sum of the values Alice can achieve by performing the operation any number of times.

Example 1:
Input: nums = [1,2,1], k = 3, edges = [[0,1],[0,2]]
Output: 6
Explanation: Alice can achieve the maximum sum of 6 using a single operation:
- Choose the edge [0,2]. nums[0] and nums[2] become: 1 XOR 3 = 2, and the array nums becomes: [1,2,1] -> [2,2,2].
The total sum of values is 2 + 2 + 2 = 6.
It can be shown that 6 is the maximum achievable sum of values.

Example 2:
Input: nums = [2,3], k = 7, edges = [[0,1]]
Output: 9
Explanation: Alice can achieve the maximum sum of 9 using a single operation:
- Choose the edge [0,1]. nums[0] becomes: 2 XOR 7 = 5 and nums[1] become: 3 XOR 7 = 4, and the array nums becomes: [2,3] -> [5,4].
The total sum of values is 5 + 4 = 9.
It can be shown that 9 is the maximum achievable sum of values.

Example 3:
Input: nums = [7,7,7,7,7,7], k = 3, edges = [[0,1],[0,2],[0,3],[0,4],[0,5]]
Output: 42
Explanation: The maximum achievable sum is 42 which can be achieved by Alice performing no operations.
 
Constraints:
2 <= n == nums.length <= 2 * 10^4
1 <= k <= 10^9
0 <= nums[i] <= 10^9
edges.length == n - 1
edges[i].length == 2
0 <= edges[i][0], edges[i][1] <= n - 1
The input is generated such that edges represent a valid tree.

</> Typescript code:
*/

// Fully commented version explaining every line
function maximumValueSum(
  nums: number[],
  k: number,
  _edges: number[][]
): number {
  // 1. baseSum collects the sum of the original array; we will add the optimal gain to it.
  let baseSum = 0;

  // 2–5. Helpers to evaluate each node’s gain (= (value XOR k) − value)
  let posCnt = 0; // how many nodes give a positive gain if flipped
  let posSum = 0; // total gain from all positive-gain nodes
  let minPos = Infinity; // smallest positive gain seen — useful if we must drop one
  let maxNeg = -Infinity; // largest (closest-to-zero) non-positive gain

  // 6–15. Iterate once over nums to gather the above statistics in O(n)
  for (const v of nums) {
    baseSum += v; // add original value
    const d = (v ^ k) - v; // compute gain/loss from flipping this node

    if (d > 0) {
      // positive gain case
      ++posCnt; // count it
      posSum += d; // add to positive-gain sum
      if (d < minPos) minPos = d; // track the smallest positive gain
    } else {
      // zero or negative gain case
      if (d > maxNeg) maxNeg = d; // track the least harmful non-positive gain
    }
  }

  // 16–17. If the number of positive-gain nodes is even, we can flip all of them.
  if (posCnt % 2 === 0) {
    return baseSum + posSum; // maximal sum achieved
  }

  // 18–20. Otherwise we must adjust parity:
  // option1: skip the smallest positive gain to make the subset size even.
  const option1 = posSum - minPos;

  // option2: add the best (closest to zero) non-positive gain to make size even.
  const option2 = maxNeg > -Infinity ? posSum + maxNeg : -Infinity;

  // 21. Pick the better of the two parity-fix strategies and add it to the base sum.
  return baseSum + Math.max(option1, option2);
}
