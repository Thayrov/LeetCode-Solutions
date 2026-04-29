/*
3225. Maximum Score From Grid Operations

Hint
You are given a 2D matrix grid of size n x n. Initially, all cells of the grid are colored white. In one operation, you can select any cell of indices (i, j), and color black all the cells of the jth column starting from the top row down to the ith row.
The grid score is the sum of all grid[i][j] such that cell (i, j) is white and it has a horizontally adjacent black cell.
Return the maximum score that can be achieved after some number of operations.

Example 1:
Input: grid = [[0,0,0,0,0],[0,0,3,0,0],[0,1,0,0,0],[5,0,0,3,0],[0,0,0,0,2]]
Output: 11
Explanation:
In the first operation, we color all cells in column 1 down to row 3, and in the second operation, we color all cells in column 4 down to the last row. The score of the resulting grid is grid[3][0] + grid[1][2] + grid[3][3] which is equal to 11.

Example 2:
Input: grid = [[10,9,0,0,15],[7,1,0,8,0],[5,20,0,11,0],[0,0,0,1,2],[8,12,1,10,3]]
Output: 94
Explanation:
We perform operations on 1, 2, and 3 down to rows 1, 4, and 0, respectively. The score of the resulting grid is grid[0][0] + grid[1][0] + grid[2][1] + grid[4][1] + grid[1][3] + grid[2][3] + grid[3][3] + grid[4][3] + grid[0][4] which is equal to 94.

Constraints:
1 <= n == grid.length <= 100
n == grid[i].length
0 <= grid[i][j] <= 10^9

</> Typescript code:
*/

function maximumScore(grid: number[][]): number {
  // Main function accepting the 2D grid of numbers
  const n = grid.length; // Store the dimension of the n x n grid
  const N = n + 1; // Create a boundary constant N for size allocations handling 0 to n heights
  const pref = Array.from({ length: n }, () => new Float64Array(N)); // Initialize a prefix sum array for fast column scoring

  for (let j = 0; j < n; j++) {
    // Iterate over each column of the grid
    let sum = 0; // Initialize running sum for the current column
    for (let i = 0; i < n; i++) {
      // Iterate row by row downwards
      sum += grid[i][j]; // Accumulate the score for the current cell
      pref[j][i + 1] = sum; // Store the 1-indexed prefix sum for fast range queries
    } // Close row iteration
  } // Close column iteration

  let dp = new Float64Array(N * N); // Use a highly performant flat array to map our 2D state [C][R]

  for (let C = 0; C <= n; C++) {
    // Loop over every possible height configuration for column 0
    for (let R = 0; R <= n; R++) {
      // Loop over every possible right-neighbor height (column 1)
      const diff = pref[0][R] - pref[0][C]; // Calculate the score contribution exclusively bound to this profile
      dp[C * N + R] = diff > 0 ? diff : 0; // Store max(0, diff) to strictly add non-negative valid points
    } // Close R iteration
  } // Close C iteration

  let prefMaxV = new Float64Array(N); // Preallocate array to hold rolling prefix maximums across L
  let suffMaxVS = new Float64Array(N); // Preallocate array to hold rolling suffix maximums across L
  let nextDp = new Float64Array(N * N); // Preallocate the next state matrix sequentially to avoid reallocation

  for (let j = 1; j < n; j++) {
    // Start transition loop from column 1 to the end
    nextDp.fill(0); // Quickly wipe the next state matrix with 0s for clean writes

    for (let C = 0; C <= n; C++) {
      // Pin the height of the current column to optimize inner dimensions
      let maxV = 0; // Initialize tracking for the best left branch up to a prefix
      for (let L = 0; L <= n; L++) {
        // Scan forwards to populate prefix maxes for L <= R scenarios
        const v = dp[L * N + C]; // Read the DP result from the previous iteration step
        if (v > maxV) maxV = v; // Update the running maximum if a better previous state is found
        prefMaxV[L] = maxV; // Store the highest achievable previous score for this prefix
      } // Close L forward scan

      let maxVS = 0; // Initialize tracking for the best left branch spanning into suffixes
      for (let L = n; L >= 0; L--) {
        // Scan backwards to populate suffix maxes for L > R scenarios
        const v = dp[L * N + C]; // Fetch the DP result from the prior step
        const diff = pref[j][L] - pref[j][C]; // Query the score column j gets from col j-1 being taller
        const s = diff > 0 ? diff : 0; // Ensure the calculated score difference remains non-negative
        const vs = v + s; // Aggregate the base DP value with the new interval score
        if (vs > maxVS) maxVS = vs; // Update the suffix maximum tracker if this aggregate beats the record
        suffMaxVS[L] = maxVS; // Store the maximum achievable score from this suffix boundary
      } // Close L backward scan

      for (let R = 0; R <= n; R++) {
        // Iterate over all possibilities of the upcoming right column's height
        const diff = pref[j][R] - pref[j][C]; // Assess the points column j gets uniquely from column j+1
        const s_R = diff > 0 ? diff : 0; // Clamp the difference to zero if it doesn't yield points

        const opt1 = s_R + prefMaxV[R]; // Calculate branch 1: Right neighbor dominates left neighbor (L <= R)
        const opt2 = R < n ? suffMaxVS[R + 1] : 0; // Calculate branch 2: Left neighbor dominates right (L > R)

        nextDp[C * N + R] = opt1 > opt2 ? opt1 : opt2; // Take the overarching max of both mutually exclusive domains
      } // Close R iteration
    } // Close C iteration

    const temp = dp; // Create a temporary pointer swap reference
    dp = nextDp; // Point the main DP state to the newly evaluated table
    nextDp = temp; // Re-assign the next DP array pointer to the old memory to recycle
  } // Close j iteration

  let ans = 0; // Initialize a variable to hold the finalized max configuration score
  for (let C = 0; C <= n; C++) {
    // Iterate the final DP states where the imaginary column 'n' rests at height 0
    if (dp[C * N + 0] > ans) ans = dp[C * N + 0]; // Keep updating the best observed score ending at an empty col
  } // Close final extraction loop

  return ans; // Yield the highest possible grid score back to LeetCode's evaluator
} // Terminate function scope
