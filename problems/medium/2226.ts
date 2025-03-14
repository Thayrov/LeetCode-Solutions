/* 
2226. Maximum Candies Allocated to K Children

You are given a 0-indexed integer array candies. Each element in the array denotes a pile of candies of size candies[i]. You can divide each pile into any number of sub piles, but you cannot merge two piles together.

You are also given an integer k. You should allocate piles of candies to k children such that each child gets the same number of candies. Each child can be allocated candies from only one pile of candies and some piles of candies may go unused.

Return the maximum number of candies each child can get.

Example 1:
Input: candies = [5,8,6], k = 3
Output: 5
Explanation: We can divide candies[1] into 2 piles of size 5 and 3, and candies[2] into 2 piles of size 5 and 1. We now have five piles of candies of sizes 5, 5, 3, 5, and 1. We can allocate the 3 piles of size 5 to 3 children. It can be proven that each child cannot receive more than 5 candies.

Example 2:
Input: candies = [2,5], k = 11
Output: 0
Explanation: There are 11 children but only 7 candies in total, so it is impossible to ensure each child receives at least one candy. Thus, each child gets no candy and the answer is 0.
 

Constraints:
1 <= candies.length <= 10^5
1 <= candies[i] <= 10^7
1 <= k <= 10^12

</> Typescript Code:
*/

function maximumCandies(candies: number[], k: number): number {
  // Set the minimum possible candies each child can get (at least 1 candy)
  let left = 1;
  // The maximum possible candies any child can get is bounded by the largest pile
  let right = Math.max(...candies);
  // This variable will store the optimal (maximum valid) number of candies per child
  let result = 0;

  // Binary search to find the maximum valid allocation per child
  while (left <= right) {
    // Compute the middle value, which represents a candidate allocation per child
    let mid = Math.floor((left + right) / 2);
    // Initialize a counter to accumulate the number of children that can be served with 'mid' candies each
    let count = 0;
    // Loop through each pile in the candies array
    for (let candy of candies) {
      // For the current pile, count how many children can receive 'mid' candies
      count += Math.floor(candy / mid);
    }
    // Check if the current candidate allocation can serve at least k children
    if (count >= k) {
      // If yes, update the result to the current candidate allocation
      result = mid;
      // Try to see if a larger allocation per child is also possible by moving the lower bound up
      left = mid + 1;
    } else {
      // Otherwise, reduce the candidate allocation by moving the upper bound down
      right = mid - 1;
    }
  }
  // Return the maximum candies each child can get that meets the requirement
  return result;
}
