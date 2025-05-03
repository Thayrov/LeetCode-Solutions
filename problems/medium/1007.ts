/* 
1007. Minimum Domino Rotations For Equal Row

In a row of dominoes, tops[i] and bottoms[i] represent the top and bottom halves of the ith domino. (A domino is a tile with two numbers from 1 to 6 - one on each half of the tile.)

We may rotate the ith domino, so that tops[i] and bottoms[i] swap values.

Return the minimum number of rotations so that all the values in tops are the same, or all the values in bottoms are the same.

If it cannot be done, return -1.

Example 1:
Input: tops = [2,1,2,4,2,2], bottoms = [5,2,6,2,3,2]
Output: 2
Explanation: 
The first figure represents the dominoes as given by tops and bottoms: before we do any rotations.
If we rotate the second and fourth dominoes, we can make every value in the top row equal to 2, as indicated by the second figure.

Example 2:
Input: tops = [3,5,1,2,3], bottoms = [3,6,3,3,4]
Output: -1
Explanation: 
In this case, it is not possible to rotate the dominoes to make one row of values equal.

Constraints:
2 <= tops.length <= 2 * 10^4
bottoms.length == tops.length
1 <= tops[i], bottoms[i] <= 6

</> Typescript code:
*/

function minDominoRotations(tops: number[], bottoms: number[]): number {
  // Get the length of the arrays (number of dominoes)
  const n = tops.length;

  // We only need to check tops[0] and bottoms[0] as candidates
  // If a value can be made common across all dominoes, it must exist
  // in either the top or bottom of every domino, including the first one
  for (const target of [tops[0], bottoms[0]]) {
    // topCount tracks how many rotations needed if we want all tops to be target
    let topCount = 0;
    // bottomCount tracks how many rotations needed if we want all bottoms to be target
    let bottomCount = 0;
    // i is our loop counter
    let i = 0;

    // Iterate through all dominoes
    for (; i < n; i++) {
      // If the target is not present in either top or bottom of current domino,
      // it's impossible to make all tops or bottoms equal to target
      if (tops[i] !== target && bottoms[i] !== target) break;

      // Count rotations needed to make all tops equal to target
      if (tops[i] !== target) topCount++;

      // Count rotations needed to make all bottoms equal to target
      if (bottoms[i] !== target) bottomCount++;
    }

    // If we processed all dominoes without breaking, a solution exists
    if (i === n) {
      // Return the minimum number of rotations needed
      // (either making all tops or all bottoms equal to target)
      return Math.min(topCount, bottomCount);
    }
  }

  // If we couldn't make either tops[0] or bottoms[0] common across all dominoes
  return -1;
}
