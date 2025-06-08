/* 
386. Lexicographical Numbers

Given an integer n, return all the numbers in the range [1, n] sorted in lexicographical order.

You must write an algorithm that runs in O(n) time and uses O(1) extra space. 

Example 1:
Input: n = 13
Output: [1,10,11,12,13,2,3,4,5,6,7,8,9]

Example 2:
Input: n = 2
Output: [1,2]

Constraints:
1 <= n <= 5 * 10^4

</> Typescript Code:
*/

function lexicalOrder(n: number): number[] {
  // Array to store the result in lexicographical order
  const result: number[] = [];

  // Start the traversal with the first number '1'
  let current = 1;

  // Loop n times, since we need to generate exactly n numbers
  for (let i = 0; i < n; i++) {
    // Add the current number to the result array
    result.push(current);

    // If current * 10 is within bounds, move to the next lexicographical level
    // For example, after 1, we move to 10, 100, etc.
    if (current * 10 <= n) {
      current *= 10;
    } else {
      // If current exceeds the limit, we need to backtrack
      // Move to the next valid number in lexicographical order
      if (current >= n) current = Math.floor(current / 10);

      // Increment the current number to the next in sequence
      current++;

      // Skip trailing zeros in the lexicographical path
      while (current % 10 == 0) {
        current = Math.floor(current / 10);
      }
    }
  }

  // Return the final lexicographically ordered array
  return result;
}
