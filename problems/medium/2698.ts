/* 
2698. Find the Punishment Number of an Integer

Given a positive integer n, return the punishment number of n.

The punishment number of n is defined as the sum of the squares of all integers i such that:

1 <= i <= n
The decimal representation of i * i can be partitioned into contiguous substrings such that the sum of the integer values of these substrings equals i.

Example 1:
Input: n = 10
Output: 182
Explanation: There are exactly 3 integers i in the range [1, 10] that satisfy the conditions in the statement:
- 1 since 1 * 1 = 1
- 9 since 9 * 9 = 81 and 81 can be partitioned into 8 and 1 with a sum equal to 8 + 1 == 9.
- 10 since 10 * 10 = 100 and 100 can be partitioned into 10 and 0 with a sum equal to 10 + 0 == 10.
Hence, the punishment number of 10 is 1 + 81 + 100 = 182

Example 2:
Input: n = 37
Output: 1478
Explanation: There are exactly 4 integers i in the range [1, 37] that satisfy the conditions in the statement:
- 1 since 1 * 1 = 1. 
- 9 since 9 * 9 = 81 and 81 can be partitioned into 8 + 1. 
- 10 since 10 * 10 = 100 and 100 can be partitioned into 10 + 0. 
- 36 since 36 * 36 = 1296 and 1296 can be partitioned into 1 + 29 + 6.
Hence, the punishment number of 37 is 1 + 81 + 100 + 1296 = 1478

Constraints:
1 <= n <= 1000

</> Typescript Code:
*/

// Function that computes the punishment number for a given n
function punishmentNumber(n: number): number {
  // Helper function: checks if the string 's' (representing i*i) can be partitioned
  // into contiguous substrings whose integer values sum up to the number i (target).
  const canPartition = (s: string, target: number): boolean => {
    // Memoization map to cache subproblem results; keys combine index and current cumulative sum.
    const memo = new Map<string, boolean>();

    // Recursive function (dfs) starting at index 'index' with a running sum 'currentSum'
    const dfs = (index: number, currentSum: number): boolean => {
      // If we reach the end of the string, check if the accumulated sum equals the target.
      if (index === s.length) return currentSum === target;

      // Composite key for memoization.
      const key = index + '-' + currentSum;
      if (memo.has(key)) return memo.get(key)!;

      let num = 0;
      // Try every possible substring partition starting at 'index'
      for (let i = index; i < s.length; i++) {
        // Build the number represented by the current substring.
        num = num * 10 + +s[i];
        // Recursively check if the remainder of the string can yield a valid partition sum.
        if (dfs(i + 1, currentSum + num)) {
          memo.set(key, true);
          return true;
        }
      }
      // If no valid partition is found, cache the result and return false.
      memo.set(key, false);
      return false;
    };
    // Initiate the recursion from the beginning of the string with a sum of 0.
    return dfs(0, 0);
  };

  let ans = 0;
  // Iterate over each integer from 1 to n.
  for (let i = 1; i <= n; i++) {
    // Compute the square of i and convert it to its string representation.
    const sqStr = (i * i).toString();
    // If we can partition the string such that the sum equals i, add i*i to the final answer.
    if (canPartition(sqStr, i)) {
      ans += i * i;
    }
  }
  // Return the computed punishment number.
  return ans;
}
