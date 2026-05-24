/*
1340. Jump Game V

Hint
Given an array of integers arr and an integer d. In one step you can jump from index i to index:
i + x where: i + x < arr.length and  0 < x <= d.
i - x where: i - x >= 0 and  0 < x <= d.
In addition, you can only jump from index i to index j if arr[i] > arr[j] and arr[i] > arr[k] for all indices k between i and j (More formally min(i, j) < k < max(i, j)).
You can choose any index of the array and start jumping. Return the maximum number of indices you can visit.
Notice that you can not jump outside of the array at any time.

Example 1:
Input: arr = [6,4,14,6,8,13,9,7,10,6,12], d = 2
Output: 4
Explanation: You can start at index 10. You can jump 10 --> 8 --> 6 --> 7 as shown.
Note that if you start at index 6 you can only jump to index 7. You cannot jump to index 5 because 13 > 9. You cannot jump to index 4 because index 5 is between index 4 and 6 and 13 > 9.
Similarly You cannot jump from index 3 to index 2 or index 1.

Example 2:
Input: arr = [3,3,3,3,3], d = 3
Output: 1
Explanation: You can start at any index. You always cannot jump to any index.

Example 3:
Input: arr = [7,6,5,4,3,2,1], d = 1
Output: 7
Explanation: Start at index 0. You can visit all the indicies. 

Constraints:
1 <= arr.length <= 1000
1 <= arr[i] <= 10^5

</> Typescript code:
*/

function maxJumps(arr: number[], d: number): number {
  // Store array length to avoid repeated property access.
  const n = arr.length;

  // dp[i] stores the max number of indices visitable starting from index i.
  // Int16Array is enough because n <= 1000.
  const dp = new Int16Array(n);

  // DFS computes the best path starting at index i.
  const dfs = (i: number): number => {
    // If already computed, return memoized value.
    if (dp[i]) return dp[i];

    // Starting index itself always counts as one visited index.
    let best = 1;

    // Try jumping left up to distance d.
    // Stop immediately when arr[j] >= arr[i], because it blocks farther jumps.
    for (let j = i - 1; j >= 0 && i - j <= d && arr[j] < arr[i]; j--) {
      // Jump to j, then add the best path from j.
      best = Math.max(best, 1 + dfs(j));
    }

    // Try jumping right up to distance d.
    // Stop immediately when arr[j] >= arr[i], because it blocks farther jumps.
    for (let j = i + 1; j < n && j - i <= d && arr[j] < arr[i]; j++) {
      // Jump to j, then add the best path from j.
      best = Math.max(best, 1 + dfs(j));
    }

    // Memoize result for index i.
    dp[i] = best;

    // Return computed answer for index i.
    return best;
  };

  // At least one index can always be visited.
  let ans = 1;

  // Try every index as starting point.
  for (let i = 0; i < n; i++) {
    // Keep global maximum path length.
    ans = Math.max(ans, dfs(i));
  }

  // Return maximum number of visitable indices.
  return ans;
}
