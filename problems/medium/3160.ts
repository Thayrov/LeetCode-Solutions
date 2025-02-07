/* 
3160. Find the Number of Distinct Colors Among the Balls

You are given an integer limit and a 2D array queries of size n x 2.

There are limit + 1 balls with distinct labels in the range [0, limit]. Initially, all balls are uncolored. For every query in queries that is of the form [x, y], you mark ball x with the color y. After each query, you need to find the number of distinct colors among the balls.

Return an array result of length n, where result[i] denotes the number of distinct colors after ith query.

Note that when answering a query, lack of a color will not be considered as a color.

Example 1:
Input: limit = 4, queries = [[1,4],[2,5],[1,3],[3,4]]
Output: [1,2,2,3]
Explanation:
After query 0, ball 1 has color 4.
After query 1, ball 1 has color 4, and ball 2 has color 5.
After query 2, ball 1 has color 3, and ball 2 has color 5.
After query 3, ball 1 has color 3, ball 2 has color 5, and ball 3 has color 4.

Example 2:
Input: limit = 4, queries = [[0,1],[1,2],[2,2],[3,4],[4,5]]
Output: [1,2,2,3,4]
Explanation:
After query 0, ball 0 has color 1.
After query 1, ball 0 has color 1, and ball 1 has color 2.
After query 2, ball 0 has color 1, and balls 1 and 2 have color 2.
After query 3, ball 0 has color 1, balls 1 and 2 have color 2, and ball 3 has color 4.
After query 4, ball 0 has color 1, balls 1 and 2 have color 2, ball 3 has color 4, and ball 4 has color 5.

Constraints:
1 <= limit <= 10^9
1 <= n == queries.length <= 10^5
queries[i].length == 2
0 <= queries[i][0] <= limit
1 <= queries[i][1] <= 10^9

</> Typescript code:
*/

function queryResults(limit: number, queries: number[][]): number[] {
  // Create a Map to track the current color of each ball.
  const ballColor = new Map<number, number>();
  // Create a Map to track the frequency of each color among colored balls.
  const colorCount = new Map<number, number>();
  // Initialize an array to store the results after each query.
  const result: number[] = [];
  // Iterate over each query, where each query is [ball, color].
  for (const [ball, color] of queries) {
    // Check if this ball has been colored before.
    if (ballColor.has(ball)) {
      // Retrieve the previous color from the map.
      const prevColor = ballColor.get(ball)!;
      // Get the frequency count of the previous color.
      const prevCount = colorCount.get(prevColor)!;
      // If this was the only ball with the previous color, remove it from the map.
      if (prevCount === 1) colorCount.delete(prevColor);
      // Otherwise, decrement the frequency count.
      else colorCount.set(prevColor, prevCount - 1);
    }
    // Update the ball's color to the new color.
    ballColor.set(ball, color);
    // Increment the frequency count for the new color.
    colorCount.set(color, (colorCount.get(color) || 0) + 1);
    // The number of distinct colors is equal to the number of keys in the colorCount map.
    result.push(colorCount.size);
  }
  // Return the result array with distinct color counts after each query.
  return result;
}
