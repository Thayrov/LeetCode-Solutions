/*
3567. Minimum Absolute Difference in Sliding Submatrix

You are given an m x n integer matrix grid and an integer k.
For every contiguous k x k submatrix of grid, compute the minimum absolute difference between any two distinct values within that submatrix.
Return a 2D array ans of size (m - k + 1) x (n - k + 1), where ans[i][j] is the minimum absolute difference in the submatrix whose top-left corner is (i, j) in grid.

Note: If all elements in the submatrix have the same value, the answer will be 0.
A submatrix (x1, y1, x2, y2) is a matrix that is formed by choosing all cells matrix[x][y] where x1 <= x <= x2 and y1 <= y <= y2.

Example 1:
Input: grid = [[1,8],[3,-2]], k = 2
Output: [[2]]
Explanation:
There is only one possible k x k submatrix: [[1, 8], [3, -2]].
Distinct values in the submatrix are [1, 8, 3, -2].
The minimum absolute difference in the submatrix is |1 - 3| = 2. Thus, the answer is [[2]].

Example 2:
Input: grid = [[3,-1]], k = 1
Output: [[0,0]]
Explanation:
Both k x k submatrix has only one distinct element.
Thus, the answer is [[0, 0]].

Example 3:
Input: grid = [[1,-2,3],[2,3,5]], k = 2
Output: [[1,2]]
Explanation:
There are two possible k × k submatrix:
Starting at (0, 0): [[1, -2], [2, 3]].
Distinct values in the submatrix are [1, -2, 2, 3].
The minimum absolute difference in the submatrix is |1 - 2| = 1.
Starting at (0, 1): [[-2, 3], [3, 5]].
Distinct values in the submatrix are [-2, 3, 5].
The minimum absolute difference in the submatrix is |3 - 5| = 2.
Thus, the answer is [[1, 2]].

Constraints:
1 <= m == grid.length <= 30
1 <= n == grid[i].length <= 30
-10^5 <= grid[i][j] <= 10^5
1 <= k <= min(m, n)

</> Typescript code:
*/

function minAbsDiff(grid: number[][], k: number): number[][] {
  const m = grid.length,
    n = grid[0].length;
  // Pre-allocate result matrix based on sliding window bounds
  const res: number[][] = Array.from(
    { length: m - k + 1 },
    () => new Array(n - k + 1),
  );
  const size = k * k;
  // TypedArray for high-performance in-place sorting
  const arr = new Int32Array(size);

  for (let i = 0; i <= m - k; i++) {
    for (let j = 0; j <= n - k; j++) {
      let rIdx = 0;
      // Extract all elements of the current k x k submatrix
      for (let r = i; r < i + k; r++) {
        for (let c = j; c < j + k; c++) {
          arr[rIdx++] = grid[r][c];
        }
      }

      // Sort elements numerically (O(K^2 log K^2))
      arr.sort();

      let minDiff = Infinity;
      let foundDistinct = false;

      // Iterate through sorted array to find the smallest difference between non-equal neighbors
      for (let p = 1; p < size; p++) {
        if (arr[p] !== arr[p - 1]) {
          const diff = arr[p] - arr[p - 1];
          if (diff < minDiff) minDiff = diff;
          foundDistinct = true;
          // Optimization: if we find a difference of 1, it's the smallest possible positive integer diff
          if (minDiff === 1) break;
        }
      }

      // If no two elements were distinct, the problem specifies the result is 0
      res[i][j] = !foundDistinct ? 0 : minDiff;
    }
  }
  return res;
}
