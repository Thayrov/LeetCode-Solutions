/*
1722. Minimize Hamming Distance After Swap Operations

Hint
You are given two integer arrays, source and target, both of length n. You are also given an array allowedSwaps where each allowedSwaps[i] = [ai, bi] indicates that you are allowed to swap the elements at index ai and index bi (0-indexed) of array source. Note that you can swap elements at a specific pair of indices multiple times and in any order.
The Hamming distance of two arrays of the same length, source and target, is the number of positions where the elements are different. Formally, it is the number of indices i for 0 <= i <= n-1 where source[i] != target[i] (0-indexed).
Return the minimum Hamming distance of source and target after performing any amount of swap operations on array source.

Example 1:
Input: source = [1,2,3,4], target = [2,1,4,5], allowedSwaps = [[0,1],[2,3]]
Output: 1
Explanation: source can be transformed the following way:
- Swap indices 0 and 1: source = [2,1,3,4]
- Swap indices 2 and 3: source = [2,1,4,3]
The Hamming distance of source and target is 1 as they differ in 1 position: index 3.

Example 2:
Input: source = [1,2,3,4], target = [1,3,2,4], allowedSwaps = []
Output: 2
Explanation: There are no allowed swaps.
The Hamming distance of source and target is 2 as they differ in 2 positions: index 1 and index 2.

Example 3:
Input: source = [5,1,2,4,3], target = [1,5,4,2,3], allowedSwaps = [[0,4],[4,2],[1,3],[1,4]]
Output: 0

Constraints:
n == source.length == target.length
1 <= n <= 10^5
1 <= source[i], target[i] <= 10^5
0 <= allowedSwaps.length <= 10^5
allowedSwaps[i].length == 2
0 <= ai, bi <= n - 1
ai != bi

</> Typescript code:
*/

function minimumHammingDistance(
  source: number[],
  target: number[],
  allowedSwaps: number[][],
): number {
  const n = source.length;
  // Using Int32Array for better memory performance over standard arrays
  const parent = new Int32Array(n).map((_, i) => i);

  // Iterative Find with path halving for O(α(n)) time complexity
  const find = (i: number): number => {
    while (parent[i] !== i) {
      parent[i] = parent[parent[i]]; // Path compression
      i = parent[i];
    }
    return i;
  };

  // Union operation: Connect indices that can be swapped
  for (let i = 0; i < allowedSwaps.length; i++) {
    const rootA = find(allowedSwaps[i][0]);
    const rootB = find(allowedSwaps[i][1]);
    if (rootA !== rootB) parent[rootA] = rootB;
  }

  // Group source elements by their component root to track available numbers in each "swap zone"
  const groups = new Map<number, Map<number, number>>();
  for (let i = 0; i < n; i++) {
    const root = find(i);
    if (!groups.has(root)) groups.set(root, new Map());
    const countMap = groups.get(root)!;
    const val = source[i];
    countMap.set(val, (countMap.get(val) || 0) + 1);
  }

  let matchingElements = 0;
  // For every index, check if the target value exists in its component's source pool
  for (let i = 0; i < n; i++) {
    const root = find(i);
    const countMap = groups.get(root)!;
    const val = target[i];
    const count = countMap.get(val);

    // If the number exists in the pool, it can be moved to this position
    if (count && count > 0) {
      matchingElements++;
      countMap.set(val, count - 1);
    }
  }

  // Hamming distance is total elements minus those we successfully matched
  return n - matchingElements;
}
