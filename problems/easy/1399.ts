/* 
1399. Count Largest Group

You are given an integer n.

Each number from 1 to n is grouped according to the sum of its digits.

Return the number of groups that have the largest size.

Example 1:
Input: n = 13
Output: 4
Explanation: There are 9 groups in total, they are grouped according sum of its digits of numbers from 1 to 13:
[1,10], [2,11], [3,12], [4,13], [5], [6], [7], [8], [9].
There are 4 groups with largest size.

Example 2:
Input: n = 2
Output: 2
Explanation: There are 2 groups [1], [2] of size 1.

Constraints:
1 <= n <= 10^4

</> Typescript code:
*/

function countLargestGroup(n: number): number {
  // Maximum possible digit sum for n <= 10^4 is 45 (for 9999)
  const maxSum = 45;
  // freq[s] will store the count of numbers whose digits sum to s
  const freq = new Uint16Array(maxSum + 1);
  // Track the current largest group size and how many groups reach it
  let maxCount = 0,
    result = 0;
  // ds[i] will store the sum of digits of i
  const ds = new Uint8Array(n + 1);
  // Iterate over all numbers from 1 to n
  for (let i = 1; i <= n; i++) {
    // Compute digit sum by reusing the sum of digits of floor(i/10) and adding last digit
    const s = ds[(i / 10) | 0] + (i % 10);
    // Store the computed digit sum for potential reuse
    ds[i] = s;
    // Increment frequency for this digit sum
    const c = ++freq[s];
    // If this frequency exceeds the current maxCount, update maxCount and reset result to 1
    if (c > maxCount) {
      maxCount = c;
      result = 1;
      // If this frequency equals the current maxCount, increment the result
    } else if (c === maxCount) {
      result++;
    }
  }
  // Return the number of groups with the largest size
  return result;
}
