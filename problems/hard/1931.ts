/*
1931. Painting a Grid With Three Different Colors

You are given two integers m and n. Consider an m x n grid where each cell is initially white. You can paint each cell red, green, or blue. All cells must be painted.

Return the number of ways to color the grid with no two adjacent cells having the same color. Since the answer can be very large, return it modulo 109 + 7.

Example 1:
Input: m = 1, n = 1
Output: 3
Explanation: The three possible colorings are shown in the image above.

Example 2:
Input: m = 1, n = 2
Output: 6
Explanation: The six possible colorings are shown in the image above.

Example 3:
Input: m = 5, n = 5
Output: 580986
 
Constraints:
1 <= m <= 5
1 <= n <= 1000

</> Typescript code:
*/

function colorTheGrid(m: number, n: number): number {
  // Define modulo constant to avoid overflow
  const MOD = 1e9 + 7;
  // Total possible color assignments per column (3^m)
  const total = 3 ** m;
  // Array to hold column patterns with no vertical repeats
  const valid: number[] = [];
  // Generate and filter valid column patterns
  for (let mask = 0; mask < total; ++mask) {
    let x = mask;
    let prev = -1;
    let ok = true;
    // Decode base-3 representation and check vertical adjacency
    for (let i = 0; i < m; ++i) {
      const c = x % 3;
      if (c === prev) {
        ok = false;
        break;
      }
      prev = c;
      x = Math.floor(x / 3);
    }
    if (ok) valid.push(mask);
  }
  // Number of valid patterns
  const vlen = valid.length;
  // Precompute compatibility: which patterns can follow which
  const comp: number[][] = Array.from({ length: vlen }, () => []);
  for (let i = 0; i < vlen; ++i) {
    for (let j = 0; j < vlen; ++j) {
      let a = valid[i];
      let b = valid[j];
      let ok = true;
      // Check horizontal adjacency between two columns
      for (let k = 0; k < m; ++k) {
        if (a % 3 === b % 3) {
          ok = false;
          break;
        }
        a = Math.floor(a / 3);
        b = Math.floor(b / 3);
      }
      if (ok) comp[i].push(j);
    }
  }
  // Initialize DP arrays: dp for previous column, ndp for current
  let dp = new Array(vlen).fill(1);
  let ndp = new Array(vlen).fill(0);
  // Iterate over columns 1..n-1 (first column is all ones)
  for (let col = 1; col < n; ++col) {
    ndp.fill(0);
    // For each pattern i in previous column...
    for (let i = 0; i < vlen; ++i) {
      const ways = dp[i];
      // Distribute its count to all compatible patterns j
      for (const j of comp[i]) {
        ndp[j] = (ndp[j] + ways) % MOD;
      }
    }
    // Swap dp and ndp for next iteration
    [dp, ndp] = [ndp, dp];
  }
  // Sum up all ways to paint the last column
  return dp.reduce((sum, v) => (sum + v) % MOD, 0);
}
