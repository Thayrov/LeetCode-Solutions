/* 
1718. Construct the Lexicographically Largest Valid Sequence

Given an integer n, find a sequence that satisfies all of the following:

The integer 1 occurs once in the sequence.
Each integer between 2 and n occurs twice in the sequence.
For every integer i between 2 and n, the distance between the two occurrences of i is exactly i.
The distance between two numbers on the sequence, a[i] and a[j], is the absolute difference of their indices, |j - i|.

Return the lexicographically largest sequence. It is guaranteed that under the given constraints, there is always a solution.

A sequence a is lexicographically larger than a sequence b (of the same length) if in the first position where a and b differ, sequence a has a number greater than the corresponding number in b. For example, [0,1,9,0] is lexicographically larger than [0,1,5,6] because the first position they differ is at the third number, and 9 is greater than 5.

Example 1:
Input: n = 3
Output: [3,1,2,3,2]
Explanation: [2,3,2,1,3] is also a valid sequence, but [3,1,2,3,2] is the lexicographically largest valid sequence.

Example 2:
Input: n = 5
Output: [5,3,1,4,3,5,2,4,2]

Constraints:
1 <= n <= 20

</> Typescript Code:
*/

function constructDistancedSequence(n: number): number[] {
  // Initialize the result array with the required length, filled with zeros.
  const res: number[] = new Array(2 * n - 1).fill(0);
  // Track whether a number has already been fully placed in the sequence.
  const used: boolean[] = new Array(n + 1).fill(false);

  // Recursive DFS function starting at a given index.
  const dfs = (index: number): boolean => {
    // Skip over indices already filled.
    while (index < res.length && res[index] !== 0) index++;
    // If the end of the array is reached, a valid sequence has been built.
    if (index === res.length) return true;
    // Try placing numbers from n down to 1 to achieve lexicographical largeness.
    for (let i = n; i >= 1; i--) {
      // Skip the number if it has already been used.
      if (used[i]) continue;
      // Special handling for 1, which should appear only once.
      if (i === 1) {
        res[index] = 1; // Place 1 at the current index.
        used[i] = true; // Mark 1 as used.
        if (dfs(index + 1)) return true; // Continue recursion.
        used[i] = false; // Backtrack: unmark 1.
        res[index] = 0; // Backtrack: remove 1 from the index.
      } else {
        // For numbers greater than 1, ensure the second occurrence can be placed.
        if (index + i >= res.length || res[index + i] !== 0) continue;
        // Place the number i at both the current index and the matching index.
        res[index] = res[index + i] = i;
        used[i] = true; // Mark i as used.
        if (dfs(index + 1)) return true; // Recurse to complete the sequence.
        // Backtrack: reset the placements and mark i as unused.
        res[index] = res[index + i] = 0;
        used[i] = false;
      }
    }
    // Return false if no valid placements lead to a solution.
    return false;
  };

  dfs(0); // Start the DFS from the first position.
  return res; // Return the constructed lexicographically largest sequence.
}
