/* 
1769. Minimum Number of Operations to Move All Balls to Each Box

You have n boxes. You are given a binary string boxes of length n, where boxes[i] is '0' if the ith box is empty, and '1' if it contains one ball.

In one operation, you can move one ball from a box to an adjacent box. Box i is adjacent to box j if abs(i - j) == 1. Note that after doing so, there may be more than one ball in some boxes.

Return an array answer of size n, where answer[i] is the minimum number of operations needed to move all the balls to the ith box.

Each answer[i] is calculated considering the initial state of the boxes.

Example 1:
Input: boxes = "110"
Output: [1,1,3]
Explanation: The answer for each box is as follows:
1) First box: you will have to move one ball from the second box to the first box in one operation.
2) Second box: you will have to move one ball from the first box to the second box in one operation.
3) Third box: you will have to move one ball from the first box to the third box in two operations, and move one ball from the second box to the third box in one operation.

Example 2:
Input: boxes = "001011"
Output: [11,8,5,4,3,4]

Constraints:
n == boxes.length
1 <= n <= 2000
boxes[i] is either '0' or '1'.

</> Typescript Code:
*/

function minOperations(boxes: string): number[] {
  // Declare n as the length of the input string
  const n = boxes.length;
  // Initialize the result array with zeros
  const result = new Array(n).fill(0);
  // Create prefix sums for ball counts and positions
  const prefixCounts = new Array(n + 1).fill(0);
  const prefixSumPos = new Array(n + 1).fill(0);

  // Populate prefix sums
  for (let i = 0; i < n; i++) {
    prefixCounts[i + 1] = prefixCounts[i] + (boxes[i] === '1' ? 1 : 0);
    prefixSumPos[i + 1] = prefixSumPos[i] + (boxes[i] === '1' ? i : 0);
  }

  // Calculate the cost for each index i
  for (let i = 0; i < n; i++) {
    // Number of balls to the left
    const leftCount = prefixCounts[i];
    // Number of balls to the right
    const rightCount = prefixCounts[n] - prefixCounts[i + 1];
    // Sum of positions of balls to the left
    const leftSum = prefixSumPos[i];
    // Sum of positions of balls to the right
    const rightSum = prefixSumPos[n] - prefixSumPos[i + 1];
    // Combine left and right distances
    result[i] = i * leftCount - leftSum + (rightSum - i * rightCount);
  }

  // Return the computed array
  return result;
}
