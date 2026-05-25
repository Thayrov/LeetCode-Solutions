/*
1871. Jump Game VII

Hint
You are given a 0-indexed binary string s and two integers minJump and maxJump. In the beginning, you are standing at index 0, which is equal to '0'. You can move from index i to index j if the following conditions are fulfilled:
i + minJump <= j <= min(i + maxJump, s.length - 1), and
s[j] == '0'.
Return true if you can reach index s.length - 1 in s, or false otherwise.

Example 1:
Input: s = "011010", minJump = 2, maxJump = 3
Output: true
Explanation:
In the first step, move from index 0 to index 3. 
In the second step, move from index 3 to index 5.

Example 2:
Input: s = "01101110", minJump = 2, maxJump = 3
Output: false

Constraints:
2 <= s.length <= 10^5
s[i] is either '0' or '1'.
s[0] == '0'
1 <= minJump <= maxJump < s.length

</> Typescript code:
*/

function canReach(s: string, minJump: number, maxJump: number): boolean {
  // Store string length to avoid repeated property access.
  const n = s.length;

  // dp[i] is 1 when index i is reachable, otherwise 0.
  const dp = new Uint8Array(n);

  // We always start at index 0.
  dp[0] = 1;

  // Counts reachable previous indexes inside the valid jump window for current i.
  let reachable = 0;

  // Check every target index from left to right.
  for (let i = 1; i < n; i++) {
    // Add index i - minJump when it first becomes able to jump to i.
    if (i >= minJump) reachable += dp[i - minJump];

    // Remove index i - maxJump - 1 when it becomes too far to jump to i.
    if (i > maxJump) reachable -= dp[i - maxJump - 1];

    // Current index is reachable only if it is '0' and some valid previous index is reachable.
    if (s.charCodeAt(i) === 48 && reachable > 0) dp[i] = 1;
  }

  // Last index must be reachable.
  return dp[n - 1] === 1;
}
