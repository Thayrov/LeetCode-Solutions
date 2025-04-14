/* 
1534. Count Good Triplets

Given an array of integers arr, and three integers a, b and c. You need to find the number of good triplets.

A triplet (arr[i], arr[j], arr[k]) is good if the following conditions are true:

0 <= i < j < k < arr.length
|arr[i] - arr[j]| <= a
|arr[j] - arr[k]| <= b
|arr[i] - arr[k]| <= c
Where |x| denotes the absolute value of x.

Return the number of good triplets.

Example 1:
Input: arr = [3,0,1,1,9,7], a = 7, b = 2, c = 3
Output: 4
Explanation: There are 4 good triplets: [(3,0,1), (3,0,1), (3,1,1), (0,1,1)].

Example 2:
Input: arr = [1,1,2,2,3], a = 0, b = 0, c = 1
Output: 0
Explanation: No triplet satisfies all conditions.

Constraints:
3 <= arr.length <= 100
0 <= arr[i] <= 1000
0 <= a, b, c <= 1000

</> Typescript Code:
*/

function countGoodTriplets(
  arr: number[],
  a: number,
  b: number,
  c: number
): number {
  // Initialize the counter to accumulate the number of valid triplets.
  let count = 0;
  // Iterate over the array for the first element of the triplet (index i).
  // Stop at arr.length - 2 because we need room for two more elements.
  for (let i = 0; i < arr.length - 2; i++) {
    // Iterate for the second element (index j) starting from i + 1.
    // Stop at arr.length - 1 to leave at least one element for index k.
    for (let j = i + 1; j < arr.length - 1; j++) {
      // Check the first condition: the absolute difference between arr[i] and arr[j] must be <= a.
      // If not, skip to the next iteration of the j loop.
      if (Math.abs(arr[i] - arr[j]) > a) continue;
      // Iterate for the third element (index k) starting from j + 1.
      for (let k = j + 1; k < arr.length; k++) {
        // Check both remaining conditions in a single if-statement:
        // - The absolute difference between arr[j] and arr[k] must be <= b.
        // - The absolute difference between arr[i] and arr[k] must be <= c.
        // If either condition fails, skip this combination.
        if (Math.abs(arr[j] - arr[k]) > b || Math.abs(arr[i] - arr[k]) > c)
          continue;
        // If all conditions are satisfied, increment the count of valid triplets.
        count++;
      }
    }
  }
  // Return the total count of good triplets found.
  return count;
}
