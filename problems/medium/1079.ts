/* 
1079. Letter Tile Possibilities

You have n  tiles, where each tile has one letter tiles[i] printed on it.

Return the number of possible non-empty sequences of letters you can make using the letters printed on those tiles.

Example 1:
Input: tiles = "AAB"
Output: 8
Explanation: The possible sequences are "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA".

Example 2:
Input: tiles = "AAABBC"
Output: 188

Example 3:
Input: tiles = "V"
Output: 1

Constraints:
1 <= tiles.length <= 7
tiles consists of uppercase English letters.

</> Typescript Code:
*/

function numTilePossibilities(tiles: string): number {
  // Create a frequency object to count occurrences of each character in tiles
  const freq: {[key: string]: number} = {};
  // Populate the frequency table for each character in the input string
  for (const c of tiles) {
    freq[c] = (freq[c] || 0) + 1;
  }

  // This variable will accumulate the total count of unique sequences
  let count = 0;

  // Recursive helper function using backtracking to explore all sequence possibilities
  const dfs = () => {
    // Iterate over each character in the frequency object
    for (const key in freq) {
      // If the character is available for use (frequency > 0)
      if (freq[key] > 0) {
        // Count the current selection as one valid sequence
        count++;
        // Choose the character by decreasing its available count
        freq[key]--;
        // Recurse to add more characters to the sequence
        dfs();
        // Backtrack: restore the character's frequency for further exploration
        freq[key]++;
      }
    }
  };

  // Start the recursive backtracking
  dfs();
  // Return the total number of unique sequences generated
  return count;
}
