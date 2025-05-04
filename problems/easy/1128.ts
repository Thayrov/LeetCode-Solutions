/* 
1128. Number of Equivalent Domino Pairs

Given a list of dominoes, dominoes[i] = [a, b] is equivalent to dominoes[j] = [c, d] if and only if either (a == c and b == d), or (a == d and b == c) - that is, one domino can be rotated to be equal to another domino.

Return the number of pairs (i, j) for which 0 <= i < j < dominoes.length, and dominoes[i] is equivalent to dominoes[j].

Example 1:
Input: dominoes = [[1,2],[2,1],[3,4],[5,6]]
Output: 1

Example 2:
Input: dominoes = [[1,2],[1,2],[1,1],[1,2],[2,2]]
Output: 3

Constraints:
1 <= dominoes.length <= 4 * 10^4
dominoes[i].length == 2
1 <= dominoes[i][j] <= 9

</> Typescript code:
*/

function numEquivDominoPairs(dominoes: number[][]): number {
  // Create a fixed-size array for counting each normalized domino (values 11–99)
  const count = new Array(100).fill(0);
  // Accumulator for equivalent pairs
  let ans = 0;
  // Iterate through each domino
  for (let i = 0; i < dominoes.length; ++i) {
    // Destructure current domino values
    const a = dominoes[i][0],
      b = dominoes[i][1];
    // Normalize order: ensure smaller digit is first to handle rotations
    const key = a < b ? a * 10 + b : b * 10 + a;
    // Any previous dominoes with this key form equivalent pairs
    ans += count[key];
    // Record this domino for future comparisons
    count[key]++;
  }
  // Return total count of equivalent pairs
  return ans;
}
