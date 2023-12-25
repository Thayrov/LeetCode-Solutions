/* 
2. Add Two Numbers


You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.


Example 1:


Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
Example 2:

Input: l1 = [0], l2 = [0]
Output: [0]
Example 3:

Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]

Constraints:

The number of nodes in each linked list is in the range [1, 100].
0 <= Node.val <= 9
It is guaranteed that the list represents a number that does not have leading zeros.

</>Code:
*/

/* Definition for singly-linked list. */
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val; // Constructor: Initializes the value of the node. Defaults to 0 if not provided.
    this.next = next === undefined ? null : next; // Constructor: Initializes the next node. Defaults to null if not provided.
  }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  let dummyHead = new ListNode(0); // Create a dummy head node for the resulting linked list. This helps in simplifying list operations.
  let curr = dummyHead; // Initialize a current pointer to the dummy head. This will be used to build the result list.

  let carry = 0; // Initialize the carry to 0. This will store any carry-over during addition.

  // Start a loop that runs until both l1 and l2 are fully traversed
  while (l1 !== null || l2 !== null) {
    let sum = carry; // Start with the carry value in the sum for this digit.

    if (l1 !== null) {
      sum += l1.val; // Add the value of the current node of l1 to sum if l1 is not null.
      l1 = l1.next; // Move to the next node in l1.
    }
    if (l2 !== null) {
      sum += l2.val; // Add the value of the current node of l2 to sum if l2 is not null.
      l2 = l2.next; // Move to the next node in l2.
    }

    carry = Math.floor(sum / 10); // Calculate the carry for the next digit (1 if sum is 10 or more, otherwise 0).
    curr.next = new ListNode(sum % 10); // Create a new node with the digit part of the sum and add it to the result list.
    curr = curr.next; // Move the current pointer to the new node.
  }

  // After processing both lists, if there's still a carry, add a new node with the carry value.
  if (carry > 0) {
    curr.next = new ListNode(carry);
  }

  return dummyHead.next; // Return the next node of dummy head, which is the start of the actual result list.
}

/* 1637. Widest Vertical Area Between Two Points Containing No Points

Medium
Topics
Companies
Hint

Given n points on a 2D plane where points[i] = [xi, yi], Return the widest vertical area between two points such that no points are inside the area.

A vertical area is an area of fixed-width extending infinitely along the y-axis (i.e., infinite height). The widest vertical area is the one with the maximum width.

Note that points on the edge of a vertical area are not considered included in the area.

Example 1:

​Input: points = [[8,7],[9,9],[7,4],[9,7]]
Output: 1
Explanation: Both the red and the blue area are optimal.

Example 2:

Input: points = [[3,1],[9,0],[1,0],[1,4],[5,3],[8,8]]
Output: 3

Constraints:

n == points.length
2 <= n <= 105
points[i].length == 2
0 <= xi, yi <= 109 

</>Code:
*/

function maxWidthOfVerticalArea(points: number[][]): number {
  // Extract x-coordinates from the array of points and sort them in ascending order.
  // map(point => point[0]): Extracts the x-coordinate (first element of each sub-array).
  // sort((a, b) => a - b): Sorts the x-coordinates in ascending numerical order.
  let xCoords = points.map(point => point[0]).sort((a, b) => a - b);

  // Initialize the variable to store the maximum width of the vertical area.
  let maxGap = 0;

  // Iterate through the sorted x-coordinates starting from the second element.
  for (let i = 1; i < xCoords.length; i++) {
    // Calculate the gap between the current and previous x-coordinate.
    // Math.max(maxGap, xCoords[i] - xCoords[i - 1]): Compares the current gap with the maximum gap found so far,
    // and updates maxGap with the larger value.
    maxGap = Math.max(maxGap, xCoords[i] - xCoords[i - 1]);
  }

  // Return the largest gap found, which is the widest vertical area.
  return maxGap;
}

/* 
91. Decode Ways

A message containing letters from A-Z can be encoded into numbers using the following mapping:

'A' -> "1"
'B' -> "2"
...
'Z' -> "26"
To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, "11106" can be mapped into:

"AAJF" with the grouping (1 1 10 6)
"KJF" with the grouping (11 10 6)
Note that the grouping (1 11 06) is invalid because "06" cannot be mapped into 'F' since "6" is different from "06".

Given a string s containing only digits, return the number of ways to decode it.

The test cases are generated so that the answer fits in a 32-bit integer.



Example 1:

Input: s = "12"
Output: 2
Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).

Example 2:

Input: s = "226"
Output: 3
Explanation: "226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).

Example 3:

Input: s = "06"
Output: 0
Explanation: "06" cannot be mapped to "F" because of the leading zero ("6" is different from "06").


Constraints:

1 <= s.length <= 100
s contains only digits and may contain leading zero(s).

*/

function numDecodings(s: string): number {
  // If the string is empty or starts with '0', there are no valid decodings.
  if (s.length === 0 || s[0] === '0') {
    return 0;
  }

  // dp array to store the number of ways to decode up to the ith character
  let dp = new Array(s.length + 1).fill(0);
  dp[0] = 1; // Base case: one way to decode an empty string
  dp[1] = s[0] !== '0' ? 1 : 0; // There is one way if the first character is not '0', otherwise 0 ways

  // Iterate over the string starting from the second character
  for (let i = 2; i <= s.length; i++) {
    // Check if the single digit is valid (not '0')
    if (s[i - 1] !== '0') {
      // If valid, the number of ways to decode it is the same as the previous character
      dp[i] += dp[i - 1];
    }

    // Check if the two digits form a valid number between 10 and 26
    const twoDigit = parseInt(s.substring(i - 2, i), 10);
    if (twoDigit >= 10 && twoDigit <= 26) {
      // If valid, add the number of ways to decode the string up to two characters before
      dp[i] += dp[i - 2];
    }
  }

  // The total number of ways to decode the entire string is stored in dp[s.length]
  return dp[s.length];
}
