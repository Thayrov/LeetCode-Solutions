/*
135. Candy

There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings.

You are giving candies to these children subjected to the following requirements:

Each child must have at least one candy.
Children with a higher rating get more candies than their neighbors.
Return the minimum number of candies you need to have to distribute the candies to the children.

Example 1:
Input: ratings = [1,0,2]
Output: 5
Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.

Example 2:
Input: ratings = [1,2,2]
Output: 4
Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.
The third child gets 1 candy because it satisfies the above two conditions.

Constraints:
n == ratings.length
1 <= n <= 2 * 10^4
0 <= ratings[i] <= 2 * 10^4

</> Typescript code:
*/

function candy(ratings: number[]): number {
  // Get the length of ratings array to avoid repeated .length calls
  const n = ratings.length;

  // Initialize candies array with 1 candy for each child (minimum requirement)
  const candies = new Array(n).fill(1);

  // First pass: Left to right traversal
  // Ensure children with higher rating than left neighbor get more candies
  for (let i = 1; i < n; i++) {
    // If current child's rating is higher than previous child's rating
    if (ratings[i] > ratings[i - 1]) {
      // Give current child one more candy than the previous child
      candies[i] = candies[i - 1] + 1;
    }
  }

  // Second pass: Right to left traversal
  // Ensure children with higher rating than right neighbor get more candies
  for (let i = n - 2; i >= 0; i--) {
    // If current child's rating is higher than next child's rating
    if (ratings[i] > ratings[i + 1]) {
      // Take maximum between current candies and (next child's candies + 1)
      // This ensures we don't decrease candies from the first pass
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
  }

  // Sum all candies and return the total minimum candies needed
  return candies.reduce((sum, candy) => sum + candy, 0);
}
