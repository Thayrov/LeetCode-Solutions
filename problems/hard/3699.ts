/*
3699. Number of ZigZag Arrays I

Hint
You are given three integers n, l, and r.
A ZigZag array of length n is defined as follows:
Each element lies in the range [l, r].
No two adjacent elements are equal.
No three consecutive elements form a strictly increasing or strictly decreasing sequence.
Return the total number of valid ZigZag arrays.
Since the answer may be large, return it modulo 109 + 7.
A sequence is said to be strictly increasing if each element is strictly greater than its previous one (if exists).
A sequence is said to be strictly decreasing if each element is strictly smaller than its previous one (if exists).

Example 1:
Input: n = 3, l = 4, r = 5
Output: 2
Explanation:
There are only 2 valid ZigZag arrays of length n = 3 using values in the range [4, 5]:
[4, 5, 4]
[5, 4, 5]​​​​​​​

Example 2:
Input: n = 3, l = 1, r = 3
Output: 10
Explanation:
There are 10 valid ZigZag arrays of length n = 3 using values in the range [1, 3]:
[1, 2, 1], [1, 3, 1], [1, 3, 2]
[2, 1, 2], [2, 1, 3], [2, 3, 1], [2, 3, 2]
[3, 1, 2], [3, 1, 3], [3, 2, 3]
All arrays meet the ZigZag conditions.

Constraints:
3 <= n <= 2000
1 <= l < r <= 2000

</> Typescript code:
*/

function zigZagArrays(n: number, l: number, r: number): number {
  // Modulo required by the statement.
  const MOD = 1000000007;

  // Only the count of usable values matters, not their absolute offset.
  const m = r - l + 1;

  // up[v] = count of valid arrays ending at compressed value v with last move increasing.
  let up = new Array<number>(m + 1);

  // down[v] = count of valid arrays ending at compressed value v with last move decreasing.
  let down = new Array<number>(m + 1);

  // Initialize all valid arrays of length 2.
  for (let v = 1; v <= m; v++) {
    // Previous value can be any smaller value.
    up[v] = v - 1;

    // Previous value can be any larger value.
    down[v] = m - v;
  }

  // Extend arrays from length 3 through n.
  for (let len = 3; len <= n; len++) {
    // nextUp[v] stores new counts ending at v with an increasing last move.
    const nextUp = new Array<number>(m + 1).fill(0);

    // nextDown[v] stores new counts ending at v with a decreasing last move.
    const nextDown = new Array<number>(m + 1).fill(0);

    // Running prefix sum of previous down counts.
    let pref = 0;

    // Build increasing moves: previous value must be smaller, and prior move must be down.
    for (let v = 1; v <= m; v++) {
      // All down-ending arrays ending at values below v can move up into v.
      nextUp[v] = pref;

      // Add current value for later larger destinations.
      pref = (pref + down[v]) % MOD;
    }

    // Running suffix sum of previous up counts.
    let suff = 0;

    // Build decreasing moves: previous value must be larger, and prior move must be up.
    for (let v = m; v >= 1; v--) {
      // All up-ending arrays ending at values above v can move down into v.
      nextDown[v] = suff;

      // Add current value for later smaller destinations.
      suff = (suff + up[v]) % MOD;
    }

    // Move to next length's increasing-state counts.
    up = nextUp;

    // Move to next length's decreasing-state counts.
    down = nextDown;
  }

  // Total valid arrays of length n.
  let ans = 0;

  // Sum both possible final directions over every ending value.
  for (let v = 1; v <= m; v++) {
    // Accumulate under modulo.
    ans = (ans + up[v] + down[v]) % MOD;
  }

  // Return total valid ZigZag arrays.
  return ans;
}
