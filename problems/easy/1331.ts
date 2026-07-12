/*
1331. Rank Transform of an Array

Hint
Given an array of integers arr, replace each element with its rank.
The rank represents how large the element is. The rank has the following rules:
Rank is an integer starting from 1.
The larger the element, the larger the rank. If two elements are equal, their rank must be the same.
Rank should be as small as possible.

Example 1:
Input: arr = [40,10,20,30]
Output: [4,1,2,3]
Explanation: 40 is the largest element. 10 is the smallest. 20 is the second smallest. 30 is the third smallest.

Example 2:
Input: arr = [100,100,100]
Output: [1,1,1]
Explanation: Same elements share the same rank.

Example 3:
Input: arr = [37,12,28,9,100,56,80,5,12]
Output: [5,3,4,2,8,6,7,1,3]

Constraints:
0 <= arr.length <= 10^5
-10^9 <= arr[i] <= 10^9

</> Typescript code:
*/

// Defines the function that replaces each value with its rank.
function arrayRankTransform(arr: number[]): number[] {
  // Removes duplicates, copies the values, and sorts them in ascending order.
  const sorted = [...new Set(arr)].sort((a, b) => a - b);

  // Creates a map from each unique value to its rank.
  const ranks = new Map<number, number>();

  // Iterates through the sorted unique values.
  for (let i = 0; i < sorted.length; i++) {
    // Stores the rank using a one-based index.
    ranks.set(sorted[i], i + 1);
  }

  // Replaces every original value with its previously computed rank.
  return arr.map((value) => ranks.get(value)!);
}
