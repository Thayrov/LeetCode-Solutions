/*
3548. Equal Sum Grid Partition II

You are given an m x n matrix grid of positive integers. Your task is to determine if it is possible to make either one horizontal or one vertical cut on the grid such that:
Each of the two resulting sections formed by the cut is non-empty.
The sum of elements in both sections is equal, or can be made equal by discounting at most one single cell in total (from either section).
If a cell is discounted, the rest of the section must remain connected.
Return true if such a partition exists; otherwise, return false.

Note: A section is connected if every cell in it can be reached from any other cell by moving up, down, left, or right through other cells in the section.

Example 1:
Input: grid = [[1,4],[2,3]]
Output: true
Explanation:
A horizontal cut after the first row gives sums 1 + 4 = 5 and 2 + 3 = 5, which are equal. Thus, the answer is true.

Example 2:
Input: grid = [[1,2],[3,4]]
Output: true
Explanation:
A vertical cut after the first column gives sums 1 + 3 = 4 and 2 + 4 = 6.
By discounting 2 from the right section (6 - 2 = 4), both sections have equal sums and remain connected. Thus, the answer is true.

Example 3:
Input: grid = [[1,2,4],[2,3,5]]
Output: false
Explanation:
A horizontal cut after the first row gives 1 + 2 + 4 = 7 and 2 + 3 + 5 = 10.
By discounting 3 from the bottom section (10 - 3 = 7), both sections have equal sums, but they do not remain connected as it splits the bottom section into two parts ([2] and [5]). Thus, the answer is false.

Example 4:
Input: grid = [[4,1,8],[3,2,6]]
Output: false
Explanation:
No valid cut exists, so the answer is false.

Constraints:
1 <= m == grid.length <= 10^5
1 <= n == grid[i].length <= 10^5
2 <= m * n <= 10^5
1 <= grid[i][j] <= 10^5

</> Typescript code:
*/

function canPartitionGrid(grid: number[][]): boolean {
  const m = grid.length;
  const n = grid[0].length;

  // Use fast typed arrays for O(1) existence checks. Max value constraint is 10^5.
  const freqTop = new Int32Array(100005);
  const freqBottom = new Int32Array(100005);
  let totalSum = 0;

  // Preload the entire grid into the 'bottom' partition to prepare for horizontal slicing
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const val = grid[i][j];
      totalSum += val;
      if (val <= 100000) freqBottom[val]++;
    }
  }

  // --- 1. EVALUATE HORIZONTAL CUTS ---
  let topSum = 0;
  for (let i = 0; i < m - 1; i++) {
    // Shift row 'i' from bottom section to top section
    for (let j = 0; j < n; j++) {
      const val = grid[i][j];
      topSum += val;
      if (val <= 100000) {
        freqBottom[val]--;
        freqTop[val]++;
      }
    }

    const bottomSum = totalSum - topSum;
    const diff = topSum - bottomSum;

    if (diff === 0) return true; // Perfect Equal cut

    // If top is larger, we must remove a cell from Top equal to the difference
    if (diff > 0 && diff <= 100000) {
      const isTop1D = i === 0 || n === 1;
      if (isTop1D) {
        // If 1D, removing an internal cell breaks connectivity. Check ends ONLY.
        if (n === 1 && (grid[0][0] === diff || grid[i][0] === diff))
          return true;
        if (i === 0 && (grid[0][0] === diff || grid[0][n - 1] === diff))
          return true;
      } else {
        // If 2D (height>1 and width>1), NO cell breaks connectivity. Accept ANY match.
        if (freqTop[diff] > 0) return true;
      }
    }
    // If bottom is larger, we must remove a cell from Bottom
    else if (diff < 0 && -diff <= 100000) {
      const target = -diff;
      const isBottom1D = i === m - 2 || n === 1;
      if (isBottom1D) {
        // Verify against valid end-caps of the 1D bottom partition
        if (n === 1 && (grid[i + 1][0] === target || grid[m - 1][0] === target))
          return true;
        if (
          i === m - 2 &&
          (grid[i + 1][0] === target || grid[i + 1][n - 1] === target)
        )
          return true;
      } else {
        if (freqBottom[target] > 0) return true;
      }
    }
  }

  // --- 2. EVALUATE VERTICAL CUTS ---
  // Reset state for vertical scans
  const freqLeft = new Int32Array(100005);
  const freqRight = new Int32Array(100005);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const val = grid[i][j];
      if (val <= 100000) freqRight[val]++;
    }
  }

  // Precalculate column sums efficiently
  const colSums = new Float64Array(n);
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < m; i++) colSums[j] += grid[i][j];
  }

  let leftSum = 0;
  for (let j = 0; j < n - 1; j++) {
    // Shift column 'j' from right section to left section
    for (let i = 0; i < m; i++) {
      const val = grid[i][j];
      if (val <= 100000) {
        freqRight[val]--;
        freqLeft[val]++;
      }
    }

    leftSum += colSums[j];
    const rightSum = totalSum - leftSum;
    const diff = leftSum - rightSum;

    if (diff === 0) return true;

    // If left is larger, find cell to remove in Left
    if (diff > 0 && diff <= 100000) {
      const isLeft1D = j === 0 || m === 1;
      if (isLeft1D) {
        if (m === 1 && (grid[0][0] === diff || grid[0][j] === diff))
          return true;
        if (j === 0 && (grid[0][0] === diff || grid[m - 1][0] === diff))
          return true;
      } else {
        if (freqLeft[diff] > 0) return true;
      }
    }
    // If right is larger, find cell to remove in Right
    else if (diff < 0 && -diff <= 100000) {
      const target = -diff;
      const isRight1D = j === n - 2 || m === 1;
      if (isRight1D) {
        if (m === 1 && (grid[0][j + 1] === target || grid[0][n - 1] === target))
          return true;
        if (
          j === n - 2 &&
          (grid[0][j + 1] === target || grid[m - 1][j + 1] === target)
        )
          return true;
      } else {
        if (freqRight[target] > 0) return true;
      }
    }
  }

  return false; // No valid configuration found
}
