/*
3488. Closest Equal Element Queries

Hint
You are given a circular array nums and an array queries.
For each query i, you have to find the following:
The minimum distance between the element at index queries[i] and any other index j in the circular array, where nums[j] == nums[queries[i]]. If no such index exists, the answer for that query should be -1.
Return an array answer of the same size as queries, where answer[i] represents the result for query i.

Example 1:
Input: nums = [1,3,1,4,1,3,2], queries = [0,3,5]
Output: [2,-1,3]
Explanation:
Query 0: The element at queries[0] = 0 is nums[0] = 1. The nearest index with the same value is 2, and the distance between them is 2.
Query 1: The element at queries[1] = 3 is nums[3] = 4. No other index contains 4, so the result is -1.
Query 2: The element at queries[2] = 5 is nums[5] = 3. The nearest index with the same value is 1, and the distance between them is 3 (following the circular path: 5 -> 6 -> 0 -> 1).

Example 2:
Input: nums = [1,2,3,4], queries = [0,1,2,3]
Output: [-1,-1,-1,-1]
Explanation:
Each value in nums is unique, so no index shares the same value as the queried element. This results in -1 for all queries.

Constraints:
1 <= queries.length <= nums.length <= 10^5
1 <= nums[i] <= 10^6
0 <= queries[i] < nums.length

</> Typescript code:
*/

function solveQueries(nums: number[], queries: number[]): number[] {
  const n = nums.length; // Store array length for circular calculations
  const valToIndices = new Map<number, number[]>(); // Group indices by their values

  // Grouping indices: O(N) time
  for (let i = 0; i < n; i++) {
    if (!valToIndices.has(nums[i])) valToIndices.set(nums[i], []);
    valToIndices.get(nums[i])!.push(i);
  }

  const memo = new Map<number, number>(); // Cache results for repeated query indices
  const results: number[] = new Array(queries.length); // Final output array

  for (let i = 0; i < queries.length; i++) {
    const queryIdx = queries[i];
    const val = nums[queryIdx];

    // If we've already calculated the answer for this index, reuse it
    if (memo.has(queryIdx)) {
      results[i] = memo.get(queryIdx)!;
      continue;
    }

    const indices = valToIndices.get(val)!;
    // If the number appears only once, no "other" index exists
    if (indices.length === 1) {
      memo.set(queryIdx, -1);
      results[i] = -1;
      continue;
    }

    // Binary search to find the position of queryIdx in the sorted indices list: O(log N)
    const m = indices.length;
    let pos = 0,
      low = 0,
      high = m - 1;
    while (low <= high) {
      let mid = (low + high) >>> 1;
      if (indices[mid] === queryIdx) {
        pos = mid;
        break;
      }
      indices[mid] < queryIdx ? (low = mid + 1) : (high = mid - 1);
    }

    // In a sorted list, the closest neighbors are the elements immediately before and after
    const prev = indices[(pos - 1 + m) % m]; // Circular previous
    const next = indices[(pos + 1) % m]; // Circular next

    // Circular distance formula: min(|i - j|, N - |i - j|)
    const d1 = Math.abs(queryIdx - prev);
    const d2 = Math.abs(queryIdx - next);
    const dist = Math.min(Math.min(d1, n - d1), Math.min(d2, n - d2));

    memo.set(queryIdx, dist); // Store result for index to optimize potential duplicates
    results[i] = dist;
  }

  return results;
}
