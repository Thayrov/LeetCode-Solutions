/* 
440. K-th Smallest in Lexicographical Order

Given two integers n and k, return the kth lexicographically smallest integer in the range [1, n].

Example 1:
Input: n = 13, k = 2
Output: 10
Explanation: The lexicographical order is [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9], so the second smallest number is 10.

Example 2:
Input: n = 1, k = 1
Output: 1

Constraints:
1 <= k <= n <= 10^9

</> Typescript Code:
*/

function findKthNumber(n: number, k: number): number {
  let curr = 1; // Start at 1, the first lexicographical number
  k--; // Decrease k by 1, since we are counting steps in 0-indexed manner

  // Helper function to calculate the number of steps between two prefixes
  const getSteps = (n: number, curr: number): number => {
    let steps = 0; // Initialize step counter
    let first = curr; // First number in the current lexicographical range
    let last = curr; // Last number in the current range

    // Loop to calculate the number of valid lexicographical steps
    while (first <= n) {
      // Add the range from first to last (or n) to steps
      steps += Math.min(n + 1, last + 1) - first;
      // Move to the next level in lexicographical order
      first *= 10;
      last = last * 10 + 9;
    }

    return steps; // Return the total steps for this prefix
  };

  // Main loop to find the k-th lexicographical number
  while (k > 0) {
    const steps = getSteps(n, curr); // Get the number of steps from curr

    if (steps <= k) {
      // If k is greater than or equal to steps, move to the next number
      k -= steps;
      curr++; // Move to the next lexicographical number
    } else {
      // Otherwise, move deeper into the current number's lexicographical tree
      k--;
      curr *= 10; // Move to the next level by multiplying by 10
    }
  }

  return curr; // Return the k-th lexicographical number
}
