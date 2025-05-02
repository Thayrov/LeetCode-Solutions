/* 
838. Push Dominoes

There are n dominoes in a line, and we place each domino vertically upright. In the beginning, we simultaneously push some of the dominoes either to the left or to the right.

After each second, each domino that is falling to the left pushes the adjacent domino on the left. Similarly, the dominoes falling to the right push their adjacent dominoes standing on the right.

When a vertical domino has dominoes falling on it from both sides, it stays still due to the balance of the forces.

For the purposes of this question, we will consider that a falling domino expends no additional force to a falling or already fallen domino.

You are given a string dominoes representing the initial state where:

dominoes[i] = 'L', if the ith domino has been pushed to the left,
dominoes[i] = 'R', if the ith domino has been pushed to the right, and
dominoes[i] = '.', if the ith domino has not been pushed.
Return a string representing the final state.

Example 1:
Input: dominoes = "RR.L"
Output: "RR.L"
Explanation: The first domino expends no additional force on the second domino.

Example 2:
Input: dominoes = ".L.R...LR..L.."
Output: "LL.RR.LLRRLL.."

Constraints:
n == dominoes.length
1 <= n <= 10^5
dominoes[i] is either 'L', 'R', or '.'.

</> Typescript code:
*/

function pushDominoes(dominoes: string): string {
  // Add sentinel 'L' at start and 'R' at end to simplify edge handling
  const s = "L" + dominoes + "R";
  // Convert string to array for in-place edits
  const arr = s.split("");
  // Index of last non-dot domino
  let prev = 0;
  // Scan through each position
  for (let i = 1, n = arr.length; i < n; ++i) {
    // Skip unopened dominoes
    if (arr[i] === ".") continue;
    // Case: same force on both ends ("L...L" or "R...R")
    if (arr[prev] === arr[i]) {
      // Apply that force to all in between
      for (let k = prev + 1; k < i; ++k) {
        arr[k] = arr[i];
      }
      // Case: opposing forces meet ("R...L")
    } else if (arr[prev] === "R" && arr[i] === "L") {
      // Two pointers filling towards center
      let l = prev + 1;
      let r = i - 1;
      while (l < r) {
        arr[l++] = "R"; // rightward push from left
        arr[r--] = "L"; // leftward push from right
      }
      // If l === r, middle stays '.'
    }
    // Update last non-dot index
    prev = i;
  }
  // Strip off added sentinels and return final state
  return arr.slice(1, -1).join("");
}
