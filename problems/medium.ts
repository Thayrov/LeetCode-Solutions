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

/* 
1155. Number of Dice Rolls With Target Sum
Medium

You have n dice, and each die has k faces numbered from 1 to k.

Given three integers n, k, and target, return the number of possible ways (out of the kn total ways) to roll the dice, so the sum of the face-up numbers equals target. Since the answer may be too large, return it modulo 109 + 7.


Example 1:

Input: n = 1, k = 6, target = 3
Output: 1
Explanation: You throw one die with 6 faces.
There is only one way to get a sum of 3.

Example 2:

Input: n = 2, k = 6, target = 7
Output: 6
Explanation: You throw two dice, each with 6 faces.
There are 6 ways to get a sum of 7: 1+6, 2+5, 3+4, 4+3, 5+2, 6+1.

Example 3:

Input: n = 30, k = 30, target = 500
Output: 222616187
Explanation: The answer must be returned modulo 109 + 7.

Constraints:

1 <= n, k <= 30
1 <= target <= 1000

</> Typescript Code:
*/

function numRollsToTarget(n: number, k: number, target: number): number {
  const MOD = 1000000007; // The modulo value
  // dp[i][j] will store the number of ways to get sum j with i dice
  let dp = Array.from({length: n + 1}, () => new Array(target + 1).fill(0));

  // Base case: There's 1 way to get sum 0 with 0 dice
  dp[0][0] = 1;

  // Iterate over the number of dice
  for (let i = 1; i <= n; i++) {
    // Iterate over all possible sums
    for (let j = 1; j <= target; j++) {
      // Calculate the number of ways to achieve the sum j with i dice
      for (let face = 1; face <= k; face++) {
        if (j - face >= 0) {
          // Add the ways from the previous sum (j - face) with one less die
          dp[i][j] = (dp[i][j] + dp[i - 1][j - face]) % MOD;
        }
      }
    }
  }

  // Return the number of ways to get the target sum with n dice
  return dp[n][target];
}

/* 
1578. Minimum Time to Make Rope Colorful

Alice has n balloons arranged on a rope. You are given a 0-indexed string colors where colors[i] is the color of the ith balloon.

Alice wants the rope to be colorful. She does not want two consecutive balloons to be of the same color, so she asks Bob for help. Bob can remove some balloons from the rope to make it colorful. You are given a 0-indexed integer array neededTime where neededTime[i] is the time (in seconds) that Bob needs to remove the ith balloon from the rope.

Return the minimum time Bob needs to make the rope colorful.

Example 1:

Input: colors = "abaac", neededTime = [1,2,3,4,5]
Output: 3
Explanation: In the above image, 'a' is blue, 'b' is red, and 'c' is green.
Bob can remove the blue balloon at index 2. This takes 3 seconds.
There are no longer two consecutive balloons of the same color. Total time = 3.

Example 2:

Input: colors = "abc", neededTime = [1,2,3]
Output: 0
Explanation: The rope is already colorful. Bob does not need to remove any balloons from the rope.

Example 3:

Input: colors = "aabaa", neededTime = [1,2,3,4,1]
Output: 2
Explanation: Bob will remove the ballons at indices 0 and 4. Each ballon takes 1 second to remove.
There are no longer two consecutive balloons of the same color. Total time = 1 + 1 = 2.


Constraints:

n == colors.length == neededTime.length
1 <= n <= 105
1 <= neededTime[i] <= 104
colors contains only lowercase English letters.

</> Typescript Code:
*/

function minCost(colors: string, neededTime: number[]): number {
  let totalCost = 0; // Total time to make the rope colorful
  let maxCostInGroup = 0; // The highest removal time in the current group of same-colored balloons
  let currentSum = 0; // Sum of removal times in the current group

  for (let i = 0; i < colors.length; i++) {
    // If it's the start of a new group or the only balloon of its color
    if (i === 0 || colors[i] !== colors[i - 1]) {
      totalCost += currentSum - maxCostInGroup; // Add the sum minus the max cost in the last group
      currentSum = 0; // Reset the sum for the new group
      maxCostInGroup = 0; // Reset the max cost for the new group
    }
    currentSum += neededTime[i]; // Add the cost of the current balloon to the sum
    maxCostInGroup = Math.max(maxCostInGroup, neededTime[i]); // Update the max cost if the current cost is higher
  }

  // Add the cost for the last group
  totalCost += currentSum - maxCostInGroup;

  return totalCost;
}

/* 
2610. Convert an Array Into a 2D Array With Conditions

You are given an integer array nums. You need to create a 2D array from nums satisfying the following conditions:

The 2D array should contain only the elements of the array nums.
Each row in the 2D array contains distinct integers.
The number of rows in the 2D array should be minimal.
Return the resulting array. If there are multiple answers, return any of them.

Note that the 2D array can have a different number of elements on each row.

Example 1:

Input: nums = [1,3,4,1,2,3,1]
Output: [[1,3,4,2],[1,3],[1]]
Explanation: We can create a 2D array that contains the following rows:
- 1,3,4,2
- 1,3
- 1
All elements of nums were used, and each row of the 2D array contains distinct integers, so it is a valid answer.
It can be shown that we cannot have less than 3 rows in a valid array.

Example 2:

Input: nums = [1,2,3,4]
Output: [[4,3,2,1]]
Explanation: All elements of the array are distinct, so we can keep all of them in the first row of the 2D array.

Constraints:

1 <= nums.length <= 200
1 <= nums[i] <= nums.length

</> Typescript Code:
*/

function findMatrix(nums: number[]): number[][] {
  // Sort the input array in descending order
  nums.sort((a, b) => b - a);

  // Initialize an empty array to hold the resulting 2D array
  const result: number[][] = [];

  // Iterate over each number in the sorted array
  for (const num of nums) {
    let placed = false; // Flag to check if the number has been placed in a row

    // Iterate over each row in the result array
    for (const row of result) {
      // Check if the current number is not already in the row
      if (!row.includes(num)) {
        // If it's not, add the number to the row
        row.push(num);
        placed = true; // Set the flag to true as the number is placed
        break; // Break out of the loop since the number is placed
      }
    }

    // If the number was not placed in any row
    if (!placed) {
      // Create a new row with the current number
      result.push([num]);
    }
  }

  // Return the filled 2D array
  return result;
}

/* 
2125. Number of Laser Beams in a Bank

Anti-theft security devices are activated inside a bank. You are given a 0-indexed binary string array bank representing the floor plan of the bank, which is an m x n 2D matrix. bank[i] represents the ith row, consisting of '0's and '1's. '0' means the cell is empty, while'1' means the cell has a security device.

There is one laser beam between any two security devices if both conditions are met:

The two devices are located on two different rows: r1 and r2, where r1 < r2.
For each row i where r1 < i < r2, there are no security devices in the ith row.
Laser beams are independent, i.e., one beam does not interfere nor join with another.

Return the total number of laser beams in the bank.


Example 1:

Input: bank = ["011001","000000","010100","001000"]
Output: 8
Explanation: Between each of the following device pairs, there is one beam. In total, there are 8 beams:
 * bank[0][1] -- bank[2][1]
 * bank[0][1] -- bank[2][3]
 * bank[0][2] -- bank[2][1]
 * bank[0][2] -- bank[2][3]
 * bank[0][5] -- bank[2][1]
 * bank[0][5] -- bank[2][3]
 * bank[2][1] -- bank[3][2]
 * bank[2][3] -- bank[3][2]
Note that there is no beam between any device on the 0th row with any on the 3rd row.
This is because the 2nd row contains security devices, which breaks the second condition.


Example 2:

Input: bank = ["000","111","000"]
Output: 0
Explanation: There does not exist two devices located on two different rows.


Constraints:

m == bank.length
n == bank[i].length
1 <= m, n <= 500
bank[i][j] is either '0' or '1'.

</> Typescript Code:
*/

function numberOfBeams(bank: string[]): number {
  // Initialize variables to store the count of devices in the previous row and total beams
  let previousCount = 0,
    totalBeams = 0;

  // Iterate through each row in the bank
  for (const row of bank) {
    // Count the number of '1's in the current row
    const currentCount = row.split('').filter(char => char === '1').length;

    // If the current row has security devices
    if (currentCount > 0) {
      // Add to total beams: product of the number of devices in this row and the previous row
      totalBeams += previousCount * currentCount;
      // Update the previous row device count to the current row's count for next iteration
      previousCount = currentCount;
    }
  }

  // Return the total number of laser beams calculated
  return totalBeams;
}

/* 
2870. Minimum Number of Operations to Make Array Empty

You are given a 0-indexed array nums consisting of positive integers.

There are two types of operations that you can apply on the array any number of times:

Choose two elements with equal values and delete them from the array.
Choose three elements with equal values and delete them from the array.
Return the minimum number of operations required to make the array empty, or -1 if it is not possible.


Example 1:

Input: nums = [2,3,3,2,2,4,2,3,4]
Output: 4
Explanation: We can apply the following operations to make the array empty:
- Apply the first operation on the elements at indices 0 and 3. The resulting array is nums = [3,3,2,4,2,3,4].
- Apply the first operation on the elements at indices 2 and 4. The resulting array is nums = [3,3,4,3,4].
- Apply the second operation on the elements at indices 0, 1, and 3. The resulting array is nums = [4,4].
- Apply the first operation on the elements at indices 0 and 1. The resulting array is nums = [].
It can be shown that we cannot make the array empty in less than 4 operations.


Example 2:

Input: nums = [2,1,2,2,3,3]
Output: -1
Explanation: It is impossible to empty the array.


Constraints:

2 <= nums.length <= 105
1 <= nums[i] <= 106

</> Typescript Code:
*/

// tslint:disable-next-line: max-line-length
function minOperationsAlt(nums: number[]): number {
  const freq = new Map<number, number>(); // Create a map to store frequencies of each number

  // Count frequencies of each number in nums
  for (const num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  let operations = 0; // Initialize the count of operations

  // Iterate through the frequency map
  for (const count of freq.values()) {
    // If count is odd and less than 3, it's impossible to empty the array
    if (count % 2 === 1 && count < 3) {
      return -1;
    }
    // Add the required operations for this number to the total operations
    operations += Math.ceil(count / 3);
  }

  // Return the total number of operations
  return operations;
}

/* 
300. Longest Increasing Subsequence

Given an integer array nums, return the length of the longest strictly increasing subsequence.


Example 1:

Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.


Example 2:

Input: nums = [0,1,0,3,2,3]
Output: 4


Example 3:

Input: nums = [7,7,7,7,7,7,7]
Output: 1


Constraints:

1 <= nums.length <= 2500
-104 <= nums[i] <= 104

</> Typescript Code:
*/

function lengthOfLIS(nums: number[]): number {
  // Initialize dp array where each element is 1
  const dp = new Array(nums.length).fill(1);

  // Iterate over nums array starting from the second element
  for (let i = 1; i < nums.length; i++) {
    // For each nums[i], look back at previous elements nums[j]
    for (let j = 0; j < i; j++) {
      // If nums[j] is less than nums[i], it can be part of the increasing subsequence
      if (nums[j] < nums[i]) {
        // Update dp[i] to the maximum of its current value and dp[j] + 1
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  // The length of the longest increasing subsequence is the max value in dp array
  return Math.max(...dp);
}

/* 
2385. Amount of Time for Binary Tree to Be Infected

You are given the root of a binary tree with unique values, and an integer start. At minute 0, an infection starts from the node with value start.

Each minute, a node becomes infected if:

The node is currently uninfected.
The node is adjacent to an infected node.
Return the number of minutes needed for the entire tree to be infected.


Example 1:

Input: root = [1,5,3,null,4,10,6,9,2], start = 3
Output: 4
Explanation: The following nodes are infected during:
- Minute 0: Node 3
- Minute 1: Nodes 1, 10 and 6
- Minute 2: Node 5
- Minute 3: Node 4
- Minute 4: Nodes 9 and 2
It takes 4 minutes for the whole tree to be infected so we return 4.


Example 2:

Input: root = [1], start = 1
Output: 0
Explanation: At minute 0, the only node in the tree is infected so we return 0.


Constraints:

The number of nodes in the tree is in the range [1, 105].
1 <= Node.val <= 105
Each node has a unique value.
A node with a value of start exists in the tree.

</> Typescript Code:
*/

/* Definition for a binary tree node. */
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function amountOfTime(root: TreeNode | null, start: number): number {
  // Graph to represent the tree as an adjacency list
  const graph = new Map<number, number[]>();
  // Build the graph from the binary tree
  buildGraph(root, null, graph);

  // Set to keep track of visited nodes during BFS
  const visited = new Set<number>();
  // Queue for BFS, containing pairs of node value and time taken to infect
  const queue: [number, number][] = [[start, 0]];
  // Variable to track the maximum time taken for infection
  let maxTime = 0;

  // BFS loop
  while (queue.length > 0) {
    // Dequeue a node and its associated time
    const [node, time] = queue.shift()!;
    // Update the maximum time
    maxTime = Math.max(maxTime, time);
    // Mark the node as visited
    visited.add(node);

    // Traverse all adjacent nodes
    for (const neighbor of graph.get(node) || []) {
      // If the neighbor has not been visited, enqueue it with incremented time
      if (!visited.has(neighbor)) {
        queue.push([neighbor, time + 1]);
      }
    }
  }

  // Return the maximum time taken for the infection to spread
  return maxTime;
}

// Helper function to build the graph from the binary tree
function buildGraph(node: TreeNode | null, parent: TreeNode | null, graph: Map<number, number[]>) {
  if (!node) return; // Base case: if the node is null
  // Initialize the adjacency list for this node
  if (!graph.has(node.val)) graph.set(node.val, []);
  // Add the parent to the current node's list and vice versa
  if (parent) {
    graph.get(node.val)!.push(parent.val);
    graph.get(parent.val)!.push(node.val);
  }
  // Recursively build the graph for left and right children
  buildGraph(node.left, node, graph);
  buildGraph(node.right, node, graph);
}

/* 
1026. Maximum Difference Between Node and Ancestor

Given the root of a binary tree, find the maximum value v for which there exist different nodes a and b where v = |a.val - b.val| and a is an ancestor of b.

A node a is an ancestor of b if either: any child of a is equal to b or any child of a is an ancestor of b.


Example 1:

Input: root = [8,3,10,1,6,null,14,null,null,4,7,13]
Output: 7
Explanation: We have various ancestor-node differences, some of which are given below :
|8 - 3| = 5
|3 - 7| = 4
|8 - 1| = 7
|10 - 13| = 3
Among all possible differences, the maximum value of 7 is obtained by |8 - 1| = 7.


Example 2:

Input: root = [1,null,2,null,0,3]
Output: 3


Constraints:

The number of nodes in the tree is in the range [2, 5000].
0 <= Node.val <= 105

</> Typescript Code:
*/

/*
  Definition for a binary tree node.
  class TreeNode {
      val: number
      left: TreeNode | null
      right: TreeNode | null
      constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
          this.val = (val===undefined ? 0 : val)
          this.left = (left===undefined ? null : left)
          this.right = (right===undefined ? null : right)
      }
  }
 */

function maxAncestorDiff(root: TreeNode | null): number {
  // Start DFS with the root, initializing minVal and maxVal with the root's value
  return dfs2(root, root!.val, root!.val);
}

function dfs2(node: TreeNode | null, minVal: number, maxVal: number): number {
  // Base case: if node is null, return the difference between max and min values
  if (!node) return maxVal - minVal;
  // Update the min and max values encountered so far
  minVal = Math.min(minVal, node.val);
  maxVal = Math.max(maxVal, node.val);
  // Recursively call DFS for left and right children, and return the maximum difference
  return Math.max(dfs2(node.left, minVal, maxVal), dfs2(node.right, minVal, maxVal));
}

/* 
1347. Minimum Number of Steps to Make Two Strings Anagram

You are given two strings of the same length s and t. In one step you can choose any character of t and replace it with another character.

Return the minimum number of steps to make t an anagram of s.

An Anagram of a string is a string that contains the same characters with a different (or the same) ordering.


Example 1:

Input: s = "bab", t = "aba"
Output: 1
Explanation: Replace the first 'a' in t with b, t = "bba" which is anagram of s.


Example 2:

Input: s = "leetcode", t = "practice"
Output: 5
Explanation: Replace 'p', 'r', 'a', 'i' and 'c' from t with proper characters to make t anagram of s.


Example 3:

Input: s = "anagram", t = "mangaar"
Output: 0
Explanation: "anagram" and "mangaar" are anagrams. 


Constraints:

1 <= s.length <= 5 * 104
s.length == t.length
s and t consist of lowercase English letters only.

</> Typescript Code:
*/

function minSteps(s: string, t: string): number {
  // Array to hold the frequency count of characters (since we only have lowercase letters)
  const charCount = new Array(26).fill(0);

  // Count the frequency of each character in string s
  for (const char of s) {
    charCount[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
  }

  // Decrement the frequency based on characters in string t
  for (const char of t) {
    charCount[char.charCodeAt(0) - 'a'.charCodeAt(0)]--;
  }

  // Sum up the counts that are positive, which indicates the number of replacements needed
  return charCount.filter(count => count > 0).reduce((sum, count) => sum + count, 0);
}

/* 
1657. Determine if Two Strings Are Close
Two strings are considered close if you can attain one from the other using the following operations:

Operation 1: Swap any two existing characters.
For example, abcde -> aecdb
Operation 2: Transform every occurrence of one existing character into another existing character, and do the same with the other character.
For example, aacabb -> bbcbaa (all a's turn into b's, and all b's turn into a's)
You can use the operations on either string as many times as necessary.

Given two strings, word1 and word2, return true if word1 and word2 are close, and false otherwise.


Example 1:

Input: word1 = "abc", word2 = "bca"
Output: true
Explanation: You can attain word2 from word1 in 2 operations.
Apply Operation 1: "abc" -> "acb"
Apply Operation 1: "acb" -> "bca"


Example 2:

Input: word1 = "a", word2 = "aa"
Output: false
Explanation: It is impossible to attain word2 from word1, or vice versa, in any number of operations.


Example 3:

Input: word1 = "cabbba", word2 = "abbccc"
Output: true
Explanation: You can attain word2 from word1 in 3 operations.
Apply Operation 1: "cabbba" -> "caabbb"
Apply Operation 2: "caabbb" -> "baaccc"
Apply Operation 2: "baaccc" -> "abbccc"


Constraints:

1 <= word1.length, word2.length <= 105
word1 and word2 contain only lowercase English letters.

</> Typescript Code:
*/

function closeStrings(word1: string, word2: string): boolean {
  // Early return if lengths are different
  if (word1.length !== word2.length) return false;

  // Helper function to count character frequencies
  const countChars = (word: string) => {
    const count = Array(26).fill(0);
    for (const char of word) {
      count[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }
    return count;
  };

  // Get frequency counts for both words
  const count1 = countChars(word1);
  const count2 = countChars(word2);

  // Check if both words have the same set of characters
  for (let i = 0; i < 26; i++) {
    if ((count1[i] === 0) !== (count2[i] === 0)) return false;
  }

  // Compare the sorted frequency counts
  return count1.sort().toString() === count2.sort().toString();
}

/* 
2225. Find Players With Zero or One Losses

You are given an integer array matches where matches[i] = [winneri, loseri] indicates that the player winneri defeated player loseri in a match.

Return a list answer of size 2 where:

answer[0] is a list of all players that have not lost any matches.
answer[1] is a list of all players that have lost exactly one match.
The values in the two lists should be returned in increasing order.

Note:

You should only consider the players that have played at least one match.
The testcases will be generated such that no two matches will have the same outcome.


Example 1:

Input: matches = [[1,3],[2,3],[3,6],[5,6],[5,7],[4,5],[4,8],[4,9],[10,4],[10,9]]
Output: [[1,2,10],[4,5,7,8]]
Explanation:
Players 1, 2, and 10 have not lost any matches.
Players 4, 5, 7, and 8 each have lost one match.
Players 3, 6, and 9 each have lost two matches.
Thus, answer[0] = [1,2,10] and answer[1] = [4,5,7,8].


Example 2:

Input: matches = [[2,3],[1,3],[5,4],[6,4]]
Output: [[1,2,5,6],[]]
Explanation:
Players 1, 2, 5, and 6 have not lost any matches.
Players 3 and 4 each have lost two matches.
Thus, answer[0] = [1,2,5,6] and answer[1] = [].


Constraints:

1 <= matches.length <= 105
matches[i].length == 2
1 <= winneri, loseri <= 105
winneri != loseri
All matches[i] are unique.

</> Typescript Code:
*/

function findWinners(matches: number[][]): number[][] {
  // A map to keep track of each player's loss count
  const lossCount = new Map<number, number>();

  // Iterate through each match to update loss counts
  for (const [winner, loser] of matches) {
    // Increment loss count for the loser, and initialize for the winner if not present
    lossCount.set(winner, lossCount.get(winner) || 0);
    lossCount.set(loser, (lossCount.get(loser) || 0) + 1);
  }

  // Lists to store players with zero and one loss
  const noLosses: number[] = [],
    oneLoss: number[] = [];
  // Iterate through the map to categorize players based on their loss count
  for (const [player, losses] of lossCount) {
    if (losses === 0) noLosses.push(player);
    else if (losses === 1) oneLoss.push(player);
  }

  // Return the sorted lists of players with zero and one loss
  return [noLosses.sort((a, b) => a - b), oneLoss.sort((a, b) => a - b)];
}

/* 
380. Insert Delete GetRandom O(1)

Implement the RandomizedSet class:

RandomizedSet() Initializes the RandomizedSet object.
bool insert(int val) Inserts an item val into the set if not present. Returns true if the item was not present, false otherwise.
bool remove(int val) Removes an item val from the set if present. Returns true if the item was present, false otherwise.
int getRandom() Returns a random element from the current set of elements (it's guaranteed that at least one element exists when this method is called). Each element must have the same probability of being returned.
You must implement the functions of the class such that each function works in average O(1) time complexity.


Example 1:

Input
["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
[[], [1], [2], [2], [], [1], [2], []]
Output
[null, true, false, true, 2, true, false, 2]

Explanation
RandomizedSet randomizedSet = new RandomizedSet();
randomizedSet.insert(1); // Inserts 1 to the set. Returns true as 1 was inserted successfully.
randomizedSet.remove(2); // Returns false as 2 does not exist in the set.
randomizedSet.insert(2); // Inserts 2 to the set, returns true. Set now contains [1,2].
randomizedSet.getRandom(); // getRandom() should return either 1 or 2 randomly.
randomizedSet.remove(1); // Removes 1 from the set, returns true. Set now contains [2].
randomizedSet.insert(2); // 2 was already in the set, so return false.
randomizedSet.getRandom(); // Since 2 is the only number in the set, getRandom() will always return 2.


Constraints:

-231 <= val <= 231 - 1
At most 2 * 105 calls will be made to insert, remove, and getRandom.
There will be at least one element in the data structure when getRandom is called.

</> Typescript Code:
*/

class RandomizedSet {
  // Hash map to store the values and their indices in the array
  private map: Map<number, number>;
  // Array to store the values
  private arr: number[];

  constructor() {
    this.map = new Map();
    this.arr = [];
  }

  insert(val: number): boolean {
    // If the value already exists, return false
    if (this.map.has(val)) return false;
    // Otherwise, add the value to the array and map
    this.map.set(val, this.arr.length);
    this.arr.push(val);
    return true;
  }

  remove(val: number): boolean {
    // If the value does not exist, return false
    if (!this.map.has(val)) return false;
    // Get the index of the value to be removed
    const index = this.map.get(val)!;
    // Swap the value with the last element in the array
    const lastVal = this.arr[this.arr.length - 1];
    this.arr[index] = lastVal;
    // Update the map for the swapped element
    this.map.set(lastVal, index);
    // Remove the last element from the array and delete the value from the map
    this.arr.pop();
    this.map.delete(val);
    return true;
  }

  getRandom(): number {
    // Generate a random index and return the element at that index
    const randomIndex = Math.floor(Math.random() * this.arr.length);
    return this.arr[randomIndex];
  }
}

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */

/* 
931. Minimum Falling Path Sum

Given an n x n array of integers matrix, return the minimum sum of any falling path through matrix.

A falling path starts at any element in the first row and chooses the element in the next row that is either directly below or diagonally left/right. Specifically, the next element from position (row, col) will be (row + 1, col - 1), (row + 1, col), or (row + 1, col + 1).


Example 1:

Input: matrix = [[2,1,3],[6,5,4],[7,8,9]]
Output: 13
Explanation: There are two falling paths with a minimum sum as shown.


Example 2:

Input: matrix = [[-19,57],[-40,-5]]
Output: -59
Explanation: The falling path with a minimum sum is shown.


Constraints:

n == matrix.length == matrix[i].length
1 <= n <= 100
-100 <= matrix[i][j] <= 100

</> Typescript Code:
*/

function minFallingPathSum(matrix: number[][]): number {
  const n = matrix.length; // Get the size of the matrix

  // Start from the second row
  for (let i = 1; i < n; i++) {
    // Iterate through each column
    for (let j = 0; j < n; j++) {
      // Get the minimum sum from the directly above element
      let minAbove = matrix[i - 1][j];

      // Also consider the diagonally left element if it exists
      if (j > 0) minAbove = Math.min(minAbove, matrix[i - 1][j - 1]);

      // And the diagonally right element if it exists
      if (j < n - 1) minAbove = Math.min(minAbove, matrix[i - 1][j + 1]);

      // Update the current element with the minimum sum to reach this element
      matrix[i][j] += minAbove;
    }
  }

  // The answer is the minimum sum in the last row
  return Math.min(...matrix[n - 1]);
}

/* 
907. Sum of Subarray Minimums

Given an array of integers arr, find the sum of min(b), where b ranges over every (contiguous) subarray of arr. Since the answer may be large, return the answer modulo 109 + 7.


Example 1:

Input: arr = [3,1,2,4]
Output: 17
Explanation: 
Subarrays are [3], [1], [2], [4], [3,1], [1,2], [2,4], [3,1,2], [1,2,4], [3,1,2,4]. 
Minimums are 3, 1, 2, 4, 1, 1, 2, 1, 1, 1.
Sum is 17.


Example 2:

Input: arr = [11,81,94,43,3]
Output: 444


Constraints:

1 <= arr.length <= 3 * 104
1 <= arr[i] <= 3 * 104

</> Typescript Code:
*/

function sumSubarrayMins(arr: number[]): number {
  const MOD = 1e9 + 7; // Modulo for large numbers
  const n = arr.length; // Length of the array
  const left = new Array(n).fill(0); // Distance to previous smaller element
  const right = new Array(n).fill(0); // Distance to next smaller element
  const stack: number[] = []; // Monotonic stack

  // Calculate distances to the previous smaller element
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && arr[stack[stack.length - 1]] > arr[i]) {
      stack.pop();
    }
    left[i] = stack.length === 0 ? i + 1 : i - stack[stack.length - 1];
    stack.push(i);
  }

  stack.length = 0; // Clear the stack

  // Calculate distances to the next smaller element
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length > 0 && arr[stack[stack.length - 1]] >= arr[i]) {
      stack.pop();
    }
    right[i] = stack.length === 0 ? n - i : stack[stack.length - 1] - i;
    stack.push(i);
  }

  // Calculate the sum of minimums for all subarrays
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum = (sum + arr[i] * left[i] * right[i]) % MOD;
  }

  return sum;
}

/* 
198. House Robber

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.


Example 1:

Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.


Example 2:

Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.


Constraints:

1 <= nums.length <= 100
0 <= nums[i] <= 400

</> Typescript Code:
*/

function rob(nums: number[]): number {
  // Edge case: if the array is empty
  if (nums.length === 0) return 0;
  // Edge case: if there is only one house
  if (nums.length === 1) return nums[0];

  // Initialize the dynamic programming array
  let dp = new Array(nums.length);
  dp[0] = nums[0]; // Base case: only one house
  dp[1] = Math.max(nums[0], nums[1]); // Choose the maximum of the first two houses

  // Iterate through the array starting from the third house
  for (let i = 2; i < nums.length; i++) {
    // For each house, choose the maximum of:
    // 1. Robbing this house and the best of all options two steps back
    // 2. Skipping this house and taking the best of all options one step back
    dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1]);
  }

  // The last element of dp array contains the maximum amount that can be robbed
  return dp[nums.length - 1];
}

/* 
1239. Maximum Length of a Concatenated String with Unique Characters

You are given an array of strings arr. A string s is formed by the concatenation of a subsequence of arr that has unique characters.

Return the maximum possible length of s.

A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.


Example 1:

Input: arr = ["un","iq","ue"]
Output: 4
Explanation: All the valid concatenations are:
- ""
- "un"
- "iq"
- "ue"
- "uniq" ("un" + "iq")
- "ique" ("iq" + "ue")
Maximum length is 4.


Example 2:

Input: arr = ["cha","r","act","ers"]
Output: 6
Explanation: Possible longest valid concatenations are "chaers" ("cha" + "ers") and "acters" ("act" + "ers").


Example 3:

Input: arr = ["abcdefghijklmnopqrstuvwxyz"]
Output: 26
Explanation: The only string in arr has all 26 characters.


Constraints:

1 <= arr.length <= 16
1 <= arr[i].length <= 26
arr[i] contains only lowercase English letters.

</> Typescript Code:
*/

function maxLength(arr: string[]): number {
  let result = 0; // Variable to store the maximum length of unique characters

  // Backtracking function to try all combinations
  function backtrack(start: number, current: string) {
    // If the current string has duplicate characters, stop and return
    if (new Set(current).size !== current.length) return;

    // Update the result if the current string's length is greater
    result = Math.max(result, current.length);

    // Try adding each string in the array to the current string
    for (let i = start; i < arr.length; i++) {
      backtrack(i + 1, current + arr[i]);
    }
  }

  // Start backtracking from the first string
  backtrack(0, '');
  return result;
}

/* 
1457. Pseudo-Palindromic Paths in a Binary Tree

Given a binary tree where node values are digits from 1 to 9. A path in the binary tree is said to be pseudo-palindromic if at least one permutation of the node values in the path is a palindrome.

Return the number of pseudo-palindromic paths going from the root node to leaf nodes.


Example 1:

Input: root = [2,3,1,3,1,null,1]
Output: 2 
Explanation: The figure above represents the given binary tree. There are three paths going from the root node to leaf nodes: the red path [2,3,3], the green path [2,1,1], and the path [2,3,1]. Among these paths only red path and green path are pseudo-palindromic paths since the red path [2,3,3] can be rearranged in [3,2,3] (palindrome) and the green path [2,1,1] can be rearranged in [1,2,1] (palindrome).


Example 2:

Input: root = [2,1,1,1,3,null,null,null,null,null,1]
Output: 1 
Explanation: The figure above represents the given binary tree. There are three paths going from the root node to leaf nodes: the green path [2,1,1], the path [2,1,3,1], and the path [2,1]. Among these paths only the green path is pseudo-palindromic since [2,1,1] can be rearranged in [1,2,1] (palindrome).


Example 3:

Input: root = [9]
Output: 1


Constraints:

The number of nodes in the tree is in the range [1, 105].
1 <= Node.val <= 9

</> Typescript Code:
*/

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function pseudoPalindromicPaths(root: TreeNode | null): number {
  let count = 0; // Initialize the count of pseudo-palindromic paths

  // DFS function to traverse the tree
  const dfs = (node: TreeNode | null, path: number) => {
    if (!node) return; // Base case: if the node is null

    // Toggle the bit corresponding to the node's value in the path
    path ^= 1 << node.val;

    // Check if the path is a leaf node
    if (!node.left && !node.right) {
      // Check if the path can be rearranged into a palindrome
      if ((path & (path - 1)) === 0) count++;
      return;
    }

    // Continue DFS traversal for left and right children
    dfs(node.left, path);
    dfs(node.right, path);
  };

  dfs(root, 0); // Start DFS from the root with an empty path
  return count; // Return the count of pseudo-palindromic paths
}

/* 
1143. Longest Common Subsequence

Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
A common subsequence of two strings is a subsequence that is common to both strings.


Example 1:

Input: text1 = "abcde", text2 = "ace" 
Output: 3  
Explanation: The longest common subsequence is "ace" and its length is 3.


Example 2:

Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.


Example 3:

Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.


Constraints:

1 <= text1.length, text2.length <= 1000
text1 and text2 consist of only lowercase English characters.
</> Typescript Code:
*/

function longestCommonSubsequence(text1: string, text2: string): number {
  const m = text1.length; // Length of text1
  const n = text2.length; // Length of text2

  // Create a 2D array (m+1) x (n+1) initialized with zeros
  const dp = Array.from({length: m + 1}, () => new Array(n + 1).fill(0));

  // Iterate through each character of text1 and text2
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // If characters match, add 1 to the LCS of the previous characters
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        // If no match, take the maximum LCS found so far from either string
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // The value in dp[m][n] is the length of the longest common subsequence
  return dp[m][n];
}

/* 
576. Out of Boundary Paths

There is an m x n grid with a ball. The ball is initially at the position [startRow, startColumn]. You are allowed to move the ball to one of the four adjacent cells in the grid (possibly out of the grid crossing the grid boundary). You can apply at most maxMove moves to the ball.

Given the five integers m, n, maxMove, startRow, startColumn, return the number of paths to move the ball out of the grid boundary. Since the answer can be very large, return it modulo 109 + 7.


Example 1:
Input: m = 2, n = 2, maxMove = 2, startRow = 0, startColumn = 0
Output: 6


Example 2:
Input: m = 1, n = 3, maxMove = 3, startRow = 0, startColumn = 1
Output: 12


Constraints:

1 <= m, n <= 50
0 <= maxMove <= 50
0 <= startRow < m
0 <= startColumn < n

</> Typescript Code:
*/

function findPaths(
  m: number,
  n: number,
  maxMove: number,
  startRow: number,
  startColumn: number,
): number {
  const MOD = 1000000007; // Modulo to avoid overflow

  // Initialize dp array with zeros
  let dp = new Array(m).fill(0).map(() => new Array(n).fill(0));
  dp[startRow][startColumn] = 1; // Starting cell

  let count = 0; // Number of ways to move out of boundary

  // Iterate for each move
  for (let move = 1; move <= maxMove; move++) {
    // Temporary array for the current move's calculations
    const temp = new Array(m).fill(0).map(() => new Array(n).fill(0));
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        // Count paths exiting the boundary
        if (i === 0) count = (count + dp[i][j]) % MOD;
        if (i === m - 1) count = (count + dp[i][j]) % MOD;
        if (j === 0) count = (count + dp[i][j]) % MOD;
        if (j === n - 1) count = (count + dp[i][j]) % MOD;

        // Calculate paths for next move based on adjacent cells
        const up = i > 0 ? dp[i - 1][j] : 0;
        const down = i < m - 1 ? dp[i + 1][j] : 0;
        const left = j > 0 ? dp[i][j - 1] : 0;
        const right = j < n - 1 ? dp[i][j + 1] : 0;

        temp[i][j] = (up + down + left + right) % MOD;
      }
    }
    dp = temp; // Update dp array for the next move
  }

  return count; // Return total count
}

/* 
150. Evaluate Reverse Polish Notation

You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation.

Evaluate the expression. Return an integer that represents the value of the expression.

Note that:

The valid operators are '+', '-', '*', and '/'.
Each operand may be an integer or another expression.
The division between two integers always truncates toward zero.
There will not be any division by zero.
The input represents a valid arithmetic expression in a reverse polish notation.
The answer and all the intermediate calculations can be represented in a 32-bit integer.


Example 1:
Input: tokens = ["2","1","+","3","*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9


Example 2:
Input: tokens = ["4","13","5","/","+"]
Output: 6
Explanation: (4 + (13 / 5)) = 6


Example 3:
Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
Output: 22
Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22


Constraints:

1 <= tokens.length <= 104
tokens[i] is either an operator: "+", "-", "*", or "/", or an integer in the range [-200, 200].

</> Typescript Code:
*/

function evalRPN(tokens: string[]): number {
  const stack: number[] = []; // Initialize an empty stack to store numbers

  for (const token of tokens) {
    // Iterate over each token in the input array
    if (token === '+' || token === '-' || token === '*' || token === '/') {
      // Check if the token is an operator
      const secondOperand = stack.pop(); // Pop the second operand from the stack
      const firstOperand = stack.pop(); // Pop the first operand from the stack

      // Check if operands are not undefined before performing operations
      if (firstOperand !== undefined && secondOperand !== undefined) {
        if (token === '+') {
          stack.push(firstOperand + secondOperand); // Perform addition
        } else if (token === '-') {
          stack.push(firstOperand - secondOperand); // Perform subtraction
        } else if (token === '*') {
          stack.push(firstOperand * secondOperand); // Perform multiplication
        } else if (token === '/') {
          stack.push(Math.trunc(firstOperand / secondOperand)); // Perform division and truncate towards zero
        }
      }
    } else {
      stack.push(parseInt(token)); // If token is a number, convert it to integer and push onto the stack
    }
  }

  // Assuming valid RPN expression, the final result should be the only item in the stack
  return stack.pop() ?? 0; // Return the result or 0 if the stack is somehow empty
}

/* 
739. Daily Temperatures

Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.

Example 1:
Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]

Example 2:
Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]

Example 3:
Input: temperatures = [30,60,90]
Output: [1,1,0]

Constraints:
1 <= temperatures.length <= 105
30 <= temperatures[i] <= 100

</> Typescript Code:
*/

function dailyTemperatures(temperatures: number[]): number[] {
  // Initialize result array with zeros
  const result = new Array(temperatures.length).fill(0);
  // Stack to keep track of temperatures and their indices
  const stack: [number, number][] = [];

  // Iterate through each temperature
  for (let i = 0; i < temperatures.length; i++) {
    // Pop elements from the stack as long as the current temperature is higher
    while (stack.length > 0 && temperatures[i] > stack[stack.length - 1][1]) {
      // Get the index of the temperature from the stack
      const [idx, _] = stack.pop()!;
      // Update the result for that index with the difference in days
      result[idx] = i - idx;
    }
    // Push the current temperature and its index onto the stack
    stack.push([i, temperatures[i]]);
  }

  // Return the result array
  return result;
}

/* 
2966. Divide Array Into Arrays With Max Difference

You are given an integer array nums of size n and a positive integer k.

Divide the array into one or more arrays of size 3 satisfying the following conditions:

Each element of nums should be in exactly one array.
The difference between any two elements in one array is less than or equal to k.
Return a 2D array containing all the arrays. If it is impossible to satisfy the conditions, return an empty array. And if there are multiple answers, return any of them.

Example 1:
Input: nums = [1,3,4,8,7,9,3,5,1], k = 2
Output: [[1,1,3],[3,4,5],[7,8,9]]
Explanation: We can divide the array into the following arrays: [1,1,3], [3,4,5] and [7,8,9].
The difference between any two elements in each array is less than or equal to 2.
Note that the order of elements is not important.

Example 2:
Input: nums = [1,3,3,2,7,3], k = 3
Output: []
Explanation: It is not possible to divide the array satisfying all the conditions.

Constraints:
n == nums.length
1 <= n <= 105
n is a multiple of 3.
1 <= nums[i] <= 105
1 <= k <= 105

</> Typescript Code:
*/

function divideArray(nums: number[], k: number): number[][] {
  // Sort the array to ensure elements are in ascending order for comparison
  nums.sort((a, b) => a - b);
  // Initialize the result array to hold sub-arrays
  const result: number[][] = [];

  // Iterate through the array in steps of 3 since each sub-array is of size 3
  for (let i = 0; i < nums.length; i += 3) {
    // If the difference between the first and last elements in the current group of 3 exceeds k, return empty array
    if (nums[i + 2] - nums[i] > k) return [];
    // Add the current group of 3 to the result array
    result.push([nums[i], nums[i + 1], nums[i + 2]]);
  }
  // Return the result array containing all valid sub-arrays
  return result;
}

/* 
1291. Sequential Digits

An integer has sequential digits if and only if each digit in the number is one more than the previous digit.

Return a sorted list of all the integers in the range [low, high] inclusive that have sequential digits.

Example 1:
Input: low = 100, high = 300
Output: [123,234]

Example 2:
Input: low = 1000, high = 13000
Output: [1234,2345,3456,4567,5678,6789,12345]

Constraints:
10 <= low <= high <= 10^9

</> Typescript Code:
*/

function sequentialDigits(low: number, high: number): number[] {
  // Initialize an array to store all possible sequential digit numbers
  const allSequentialDigits: number[] = [];
  // Define a string of all digits in sequence for easy access
  const startDigits = '123456789';

  // Loop through possible lengths of sequential digits from 2 to 9
  for (let length = 2; length <= 9; length++) {
    // Iterate through the `startDigits` string to slice sequences of the current length
    for (let start = 0; start <= 9 - length; start++) {
      // Extract a substring of the specified length and convert it to a number
      const num = parseInt(startDigits.substring(start, start + length));
      // If the number is within the [low, high] range, add it to the result array
      if (num >= low && num <= high) {
        allSequentialDigits.push(num);
      }
    }
  }
  // Sort and return the array of valid sequential digit numbers
  return allSequentialDigits.sort((a, b) => a - b);
}

/* 
1043. Partition Array for Maximum Sum

Given an integer array arr, partition the array into (contiguous) subarrays of length at most k. After partitioning, each subarray has their values changed to become the maximum value of that subarray.

Return the largest sum of the given array after partitioning. Test cases are generated so that the answer fits in a 32-bit integer.

Example 1:
Input: arr = [1,15,7,9,2,5,10], k = 3
Output: 84
Explanation: arr becomes [15,15,15,9,10,10,10]

Example 2:
Input: arr = [1,4,1,5,7,3,6,1,9,9,3], k = 4
Output: 83

Example 3:
Input: arr = [1], k = 1
Output: 1

Constraints:
1 <= arr.length <= 500
0 <= arr[i] <= 109
1 <= k <= arr.length

</> Typescript Code:
*/

function maxSumAfterPartitioning(arr: number[], k: number): number {
  // dp array to store the maximum sum till ith index
  let dp = new Array(arr.length + 1).fill(0);
  // iterate through the array to fill dp
  for (let i = 1; i <= arr.length; i++) {
    let max = 0; // to keep track of the maximum element in the current partition
    // try partitions of all lengths up to k
    for (let j = 1; j <= k && i - j >= 0; j++) {
      max = Math.max(max, arr[i - j]); // update max for the current partition
      // dp[i] is the max of itself and the sum of the max element of the current partition times its length plus the best of previous partitions
      dp[i] = Math.max(dp[i], dp[i - j] + max * j);
    }
  }
  // the last element of dp gives the answer
  return dp[arr.length];
}

/* 
49. Group Anagrams

Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

Example 1:
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Example 2:
Input: strs = [""]
Output: [[""]]

Example 3:
Input: strs = ["a"]
Output: [["a"]]

Constraints:
1 <= strs.length <= 104
0 <= strs[i].length <= 100
strs[i] consists of lowercase English letters.

</> Typescript Code:
*/

// Define the function groupAnagrams which takes an array of strings and returns a 2D array of strings
function groupAnagrams(strs: string[]): string[][] {
  // Initialize a Map to store arrays of anagrams, keyed by sorted versions of the anagrams
  const map = new Map<string, string[]>();
  // Iterate through each string in the input array
  for (const str of strs) {
    // Sort the characters of the string to form the key for the anagrams
    const sorted = str.split('').sort().join('');
    // If the sorted version of the string is not already a key in the map, add it with an empty array
    if (!map.has(sorted)) map.set(sorted, []);
    // Add the original string to the array associated with the sorted key
    map.get(sorted)?.push(str);
  }
  // Convert the map's values (arrays of anagrams) into a 2D array and return it
  return Array.from(map.values());
}

/* 
451. Sort Characters By Frequency

Given a string s, sort it in decreasing order based on the frequency of the characters. The frequency of a character is the number of times it appears in the string.

Return the sorted string. If there are multiple answers, return any of them.

Example 1:
Input: s = "tree"
Output: "eert"
Explanation: 'e' appears twice while 'r' and 't' both appear once.
So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.

Example 2:
Input: s = "cccaaa"
Output: "aaaccc"
Explanation: Both 'c' and 'a' appear three times, so both "cccaaa" and "aaaccc" are valid answers.
Note that "cacaca" is incorrect, as the same characters must be together.

Example 3:
Input: s = "Aabb"
Output: "bbAa"
Explanation: "bbaA" is also a valid answer, but "Aabb" is incorrect.
Note that 'A' and 'a' are treated as two different characters.

Constraints:
1 <= s.length <= 5 * 105
s consists of uppercase and lowercase English letters and digits.

</> Typescript Code:
*/

// Define the function frequencySort which takes a string s and returns a string
function frequencySort(s: string): string {
  // Initialize a frequency map with character keys and number values to count occurrences
  const freqMap: {[key: string]: number} = {};
  // Loop over each character in the input string
  for (const char of s) {
    // Update the frequency map, incrementing the count for the current character
    // If the character doesn't exist in the map, initialize it with 0 and then add 1
    freqMap[char] = (freqMap[char] || 0) + 1;
  }
  // Convert the frequency map into an array of [character, frequency] pairs,
  // sort them based on frequency in descending order,
  // then map each pair to a string of the character repeated according to its frequency
  return Object.entries(freqMap)
    .sort((a, b) => b[1] - a[1]) // Sort based on frequency
    .map(([char, freq]) => char.repeat(freq)) // Repeat each character by its frequency
    .join(''); // Join all character strings into a single string
}

/* 
279. Perfect Squares

Given an integer n, return the least number of perfect square numbers that sum to n.

A perfect square is an integer that is the square of an integer; in other words, it is the product of some integer with itself. For example, 1, 4, 9, and 16 are perfect squares while 3 and 11 are not.

Example 1:
Input: n = 12
Output: 3
Explanation: 12 = 4 + 4 + 4.

Example 2:
Input: n = 13
Output: 2
Explanation: 13 = 4 + 9.

Constraints:
1 <= n <= 104

</> Typescript Code:
*/

// Function to determine the least number of perfect square numbers that sum to n
function numSquares(n: number): number {
  // Initialize a dynamic programming array with Infinity, as we are looking for the minimum value
  let dp = Array(n + 1).fill(Infinity);
  // Base case: 0 can be represented by 0 numbers
  dp[0] = 0;
  // Loop through all numbers from 1 to n
  for (let i = 1; i <= n; i++) {
    // Try all square numbers less than or equal to i
    for (let j = 1; j * j <= i; j++) {
      // Update the dp array to the minimum number of squares required to represent i
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
    }
  }
  // Return the minimum number of squares that sum to n
  return dp[n];
}

/* 
368. Largest Divisible Subset

Given a set of distinct positive integers nums, return the largest subset answer such that every pair (answer[i], answer[j]) of elements in this subset satisfies:

answer[i] % answer[j] == 0, or
answer[j] % answer[i] == 0
If there are multiple solutions, return any of them.

Example 1:
Input: nums = [1,2,3]
Output: [1,2]
Explanation: [1,3] is also accepted.

Example 2:
Input: nums = [1,2,4,8]
Output: [1,2,4,8]

Constraints:
1 <= nums.length <= 1000
1 <= nums[i] <= 2 * 109
All the integers in nums are unique.

</> Typescript Code:
*/

// Define the function to find the largest divisible subset
function largestDivisibleSubset(nums: number[]): number[] {
  // Sort the numbers in ascending order to ensure divisibility checks are linear
  nums.sort((a, b) => a - b);
  // Initialize a DP array to store the size of the largest subset ending with nums[i]
  const dp = Array(nums.length).fill(1);
  // Initialize a previous index array to reconstruct the subset
  const prev = Array(nums.length).fill(-1);
  // Keep track of the index with the maximum subset size
  let maxIndex = 0;

  // Loop through the numbers to fill dp and prev arrays
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      // If nums[i] is divisible by nums[j] and it leads to a larger subset
      if (nums[i] % nums[j] === 0 && dp[i] < dp[j] + 1) {
        dp[i] = dp[j] + 1; // Update the size of the subset
        prev[i] = j; // Record the previous index
      }
    }
    // Update maxIndex if a larger subset is found
    if (dp[maxIndex] < dp[i]) {
      maxIndex = i;
    }
  }

  // Reconstruct the subset from the prev array
  const result: number[] = [];
  for (let i = maxIndex; i !== -1; i = prev[i]) {
    result.push(nums[i]);
  }
  // The subset is built in reverse, so return it after reversing
  return result.reverse();
}

/* 
647. Palindromic Substrings

Given a string s, return the number of palindromic substrings in it.

A string is a palindrome when it reads the same backward as forward.

A substring is a contiguous sequence of characters within the string.

Example 1:
Input: s = "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".

Example 2:
Input: s = "aaa"
Output: 6
Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".

Constraints:
1 <= s.length <= 1000
s consists of lowercase English letters.

</> Typescript Code:
*/

// Define the function to count palindromic substrings in a given string
function countSubstrings(s: string): number {
  let count = 0; // Initialize count of palindromic substrings

  // Iterate over each character in the string as a potential center of palindromes
  for (let i = 0; i < s.length; i++) {
    // Count palindromes centered at one character (odd length palindromes)
    count += countPalindromesAroundCenter(s, i, i);
    // Count palindromes centered between two characters (even length palindromes)
    count += countPalindromesAroundCenter(s, i, i + 1);
  }

  // Return the total count of palindromic substrings
  return count;
}

// Helper function to count palindromes given a center
function countPalindromesAroundCenter(s: string, left: number, right: number): number {
  let count = 0; // Initialize count of palindromes for the current center
  // Expand around the center as long as the substring is a palindrome
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    count++; // Increment count for each palindrome found
    left--; // Expand to the left
    right++; // Expand to the right
  }
  // Return the count of palindromes for the current center
  return count;
}

/* 
2149. Rearrange Array Elements by Sign

You are given a 0-indexed integer array nums of even length consisting of an equal number of positive and negative integers.

You should rearrange the elements of nums such that the modified array follows the given conditions:

Every consecutive pair of integers have opposite signs.
For all integers with the same sign, the order in which they were present in nums is preserved.
The rearranged array begins with a positive integer.
Return the modified array after rearranging the elements to satisfy the aforementioned conditions.

Example 1:
Input: nums = [3,1,-2,-5,2,-4]
Output: [3,-2,1,-5,2,-4]
Explanation:
The positive integers in nums are [3,1,2]. The negative integers are [-2,-5,-4].
The only possible way to rearrange them such that they satisfy all conditions is [3,-2,1,-5,2,-4].
Other ways such as [1,-2,2,-5,3,-4], [3,1,2,-2,-5,-4], [-2,3,-5,1,-4,2] are incorrect because they do not satisfy one or more conditions.  

Example 2:
Input: nums = [-1,1]
Output: [1,-1]
Explanation:
1 is the only positive integer and -1 the only negative integer in nums.
So nums is rearranged to [1,-1].

Constraints:
2 <= nums.length <= 2 * 105
nums.length is even
1 <= |nums[i]| <= 105
nums consists of equal number of positive and negative integers.

</> Typescript Code:
*/

// Define the function to rearrange array elements by sign according to the given conditions
function rearrangeArray(nums: number[]): number[] {
  // Filter out positive numbers from the original array
  const positive = nums.filter(n => n > 0);
  // Filter out negative numbers from the original array
  const negative = nums.filter(n => n < 0);
  // Initialize the result array to hold the rearranged elements
  const result: number[] = [];
  // Loop through the arrays of positive and negative numbers
  for (let i = 0; i < positive.length; i++) {
    // Add one positive and one negative number in order to the result array
    result.push(positive[i], negative[i]);
  }
  // Return the rearranged array
  return result;
}

/* 
2971. Find Polygon With the Largest Perimeter

You are given an array of positive integers nums of length n.

A polygon is a closed plane figure that has at least 3 sides. The longest side of a polygon is smaller than the sum of its other sides.

Conversely, if you have k (k >= 3) positive real numbers a1, a2, a3, ..., ak where a1 <= a2 <= a3 <= ... <= ak and a1 + a2 + a3 + ... + ak-1 > ak, then there always exists a polygon with k sides whose lengths are a1, a2, a3, ..., ak.

The perimeter of a polygon is the sum of lengths of its sides.

Return the largest possible perimeter of a polygon whose sides can be formed from nums, or -1 if it is not possible to create a polygon.

Example 1:
Input: nums = [5,5,5]
Output: 15
Explanation: The only possible polygon that can be made from nums has 3 sides: 5, 5, and 5. The perimeter is 5 + 5 + 5 = 15.

Example 2:
Input: nums = [1,12,1,2,5,50,3]
Output: 12
Explanation: The polygon with the largest perimeter which can be made from nums has 5 sides: 1, 1, 2, 3, and 5. The perimeter is 1 + 1 + 2 + 3 + 5 = 12.
We cannot have a polygon with either 12 or 50 as the longest side because it is not possible to include 2 or more smaller sides that have a greater sum than either of them.
It can be shown that the largest possible perimeter is 12.

Example 3:
Input: nums = [5,5,50]
Output: -1
Explanation: There is no possible way to form a polygon from nums, as a polygon has at least 3 sides and 50 > 5 + 5.

Constraints:
3 <= n <= 105
1 <= nums[i] <= 109

</> Typescript Code:
*/

// Define the function to find the largest perimeter of a polygon from given side lengths
function largestPerimeter(nums: number[]): number {
  // Sort the side lengths in ascending order
  nums.sort((a, b) => a - b);

  // Initialize a variable to hold the sum of all side lengths
  let sum = 0;

  // Calculate the total sum of all side lengths
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
  }

  // Iterate over the side lengths from largest to smallest
  for (let i = nums.length - 1; i >= 0; i--) {
    // Calculate the sum of the rest of the side lengths by subtracting the current side length from the total sum
    let rest = sum - nums[i];

    // Check if the sum of the rest of the side lengths is greater than the current side length
    if (rest > nums[i]) {
      // If so, return the total sum as the largest possible perimeter
      // This implies that a valid polygon can be formed with the remaining sides
      return sum;
    } else {
      // If not, subtract the current side length from the total sum and continue checking
      sum -= nums[i];
    }
  }

  // If no valid polygon can be formed, return -1
  return -1;
}

/* 
1481. Least Number of Unique Integers after K Removals

Given an array of integers arr and an integer k. Find the least number of unique integers after removing exactly k elements.

Example 1:
Input: arr = [5,5,4], k = 1
Output: 1
Explanation: Remove the single 4, only 5 is left.

Example 2:
Input: arr = [4,3,1,1,3,3,2], k = 3
Output: 2
Explanation: Remove 4, 2 and either one of the two 1s or three 3s. 1 and 3 will be left.

Constraints:
1 <= arr.length <= 10^5
1 <= arr[i] <= 10^9
0 <= k <= arr.length

</> Typescript Code:
*/

function findLeastNumOfUniqueInts(arr: number[], k: number): number {
  // Create a map to count the frequency of each number in the array
  const countMap = arr.reduce((acc, val) => acc.set(val, (acc.get(val) || 0) + 1), new Map());
  // Convert the frequency map to an array of counts and sort it in ascending order
  const sortedCounts = Array.from(countMap.values()).sort((a, b) => a - b);
  let removed = 0; // Initialize the count of unique numbers removed
  // Iterate through the sorted frequency counts
  for (let count of sortedCounts) {
    // If k is less than the current count, we cannot remove this number completely, so break the loop
    if (k < count) break;
    // Subtract the current count from k (number of elements to remove)
    k -= count;
    // Increment the count of unique numbers removed
    removed++;
  }
  // Return the difference between the total unique numbers and the count of unique numbers removed
  return countMap.size - removed;
}

/*
1642. Furthest Building You Can Reach

You are given an integer array heights representing the heights of buildings, some bricks, and some ladders.

You start your journey from building 0 and move to the next building by possibly using bricks or ladders.

While moving from building i to building i+1 (0-indexed),

If the current building's height is greater than or equal to the next building's height, you do not need a ladder or bricks.
If the current building's height is less than the next building's height, you can either use one ladder or (h[i+1] - h[i]) bricks.
Return the furthest building index (0-indexed) you can reach if you use the given ladders and bricks optimally.

Example 1:
Input: heights = [4,2,7,6,9,14,12], bricks = 5, ladders = 1
Output: 4
Explanation: Starting at building 0, you can follow these steps:
- Go to building 1 without using ladders nor bricks since 4 >= 2.
- Go to building 2 using 5 bricks. You must use either bricks or ladders because 2 < 7.
- Go to building 3 without using ladders nor bricks since 7 >= 6.
- Go to building 4 using your only ladder. You must use either bricks or ladders because 6 < 9.
It is impossible to go beyond building 4 because you do not have any more bricks or ladders.

Example 2:
Input: heights = [4,12,2,7,3,18,20,3,19], bricks = 10, ladders = 2
Output: 7

Example 3:
Input: heights = [14,3,19,3], bricks = 17, ladders = 0
Output: 3

Constraints:
1 <= heights.length <= 105
1 <= heights[i] <= 106
0 <= bricks <= 109
0 <= ladders <= heights.length

</> Typescript Code:
*/

function furthestBuilding(heights: number[], bricks: number, ladders: number): number {
  // Inicializa un arreglo para almacenar las diferencias máximas de altura que pueden ser superadas con escaleras.
  const maxDiffs: number[] = Array(ladders).fill(0);

  // Define una función para encontrar el índice donde insertar una nueva diferencia de altura dentro del arreglo maxDiffs.
  function findInfInd(target: number): number {
    // Si el último elemento de maxDiffs es mayor o igual al objetivo, devuelve la longitud de maxDiffs.
    if (maxDiffs[maxDiffs.length - 1] >= target) return maxDiffs.length;

    // Inicializa los índices de inicio y fin para la búsqueda binaria.
    let start = 0;
    let end = maxDiffs.length - 1;

    // Ejecuta una búsqueda binaria para encontrar el índice de inserción.
    while (start < end) {
      const mid = (start + end) >> 1; // Calcula el punto medio con desplazamiento a la derecha para dividir entre 2.
      if (target >= maxDiffs[mid]) {
        // Si el objetivo es mayor o igual al elemento en el punto medio, ajusta el final.
        end = mid;
      } else {
        // Si el objetivo es menor, ajusta el inicio.
        start = mid + 1;
      }
    }
    return start; // Devuelve el índice de inserción encontrado.
  }

  // Suma acumulativa de las diferencias de altura que necesitan ladrillos para ser superadas.
  let diffSum = 0;

  // Itera sobre el arreglo de alturas para calcular las diferencias de altura entre edificios consecutivos.
  for (let i = 1; i < heights.length; i++) {
    const diff = Math.max(0, heights[i] - heights[i - 1]); // Calcula la diferencia de altura (ignora las diferencias negativas).
    const infInd = findInfInd(diff); // Encuentra el índice donde se debería insertar la diferencia actual en maxDiffs.

    // Si el índice encontrado no es igual a la longitud de maxDiffs, inserta la diferencia y elimina el último elemento.
    if (infInd !== maxDiffs.length) {
      maxDiffs.splice(infInd, 0, diff); // Inserta la diferencia en el índice encontrado.
      diffSum += maxDiffs.pop()!; // Elimina el último elemento de maxDiffs y lo suma a diffSum.
    } else {
      // Si la diferencia actual es menor o igual a todas en maxDiffs, simplemente suma la diferencia a diffSum.
      diffSum += diff;
    }
    // Si la suma acumulativa de diferencias supera la cantidad de ladrillos disponibles, devuelve el índice del último edificio alcanzable.
    if (diffSum > bricks) return i - 1;
  }

  // Si se pueden superar todas las diferencias con los ladrillos y escaleras disponibles, devuelve el índice del último edificio.
  return heights.length - 1;
}

/* 
201. Bitwise AND of Numbers Range

Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.

Example 1:
Input: left = 5, right = 7
Output: 4

Example 2:
Input: left = 0, right = 0
Output: 0

Example 3:
Input: left = 1, right = 2147483647
Output: 0

Constraints:
0 <= left <= right <= 231 - 1

</> Typescript Code:
*/

function rangeBitwiseAnd(left: number, right: number): number {
  // Keep removing the least significant bit from 'right' until
  // 'right' is less than or equal to 'left'. This is because
  // if there is a bit difference within the range, the AND operation
  // for that bit will result in 0. Thus, we can ignore all bits
  // beyond the most significant common bit of 'left' and 'right'.
  while (right > left) {
    right &= right - 1; // Remove the least significant bit from 'right'.
  }
  // At this point, 'right' is either equal to 'left' or has become less than 'left'.
  // The remaining bits in 'right' represent the common bits in the range.
  // Performing AND with 'left' ensures we only get the bits common to all numbers in the range.
  return left & right;
}

/* 
787. Cheapest Flights Within K Stops

There are n cities connected by some number of flights. You are given an array flights where flights[i] = [fromi, toi, pricei] indicates that there is a flight from city fromi to city toi with cost pricei.

You are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops. If there is no such route, return -1.

Example 1:
Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
Output: 700
Explanation:
The graph is shown above.
The optimal path with at most 1 stop from city 0 to 3 is marked in red and has cost 100 + 600 = 700.
Note that the path through cities [0,1,2,3] is cheaper but is invalid because it uses 2 stops.

Example 2:
Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
Output: 200
Explanation:
The graph is shown above.
The optimal path with at most 1 stop from city 0 to 2 is marked in red and has cost 100 + 100 = 200.

Example 3:
Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0
Output: 500
Explanation:
The graph is shown above.
The optimal path with no stops from city 0 to 2 is marked in red and has cost 500.

Constraints:
1 <= n <= 100
0 <= flights.length <= (n * (n - 1) / 2)
flights[i].length == 3
0 <= fromi, toi < n
fromi != toi
1 <= pricei <= 104
There will not be any multiple flights between two cities.
0 <= src, dst, k < n
src != dst

</> Typescript Code:
*/

function findCheapestPrice(
  n: number,
  flights: number[][],
  src: number,
  dst: number,
  k: number,
): number {
  // Initialize an array to track the cheapest price to each city. Set all to Infinity initially.
  let prices = Array(n).fill(Infinity);
  // The price to reach the source city from itself is always 0.
  prices[src] = 0;

  // Loop through the flights up to k stops.
  for (let i = 0; i <= k; i++) {
    // Temporary array to store updated prices for this iteration, to avoid overwriting.
    let tmpPrices = [...prices];
    for (let [from, to, price] of flights) {
      // If the city 'from' is unreachable in the previous iteration, skip.
      if (prices[from] === Infinity) continue;
      // Update the price to reach 'to' if the new price is cheaper.
      tmpPrices[to] = Math.min(tmpPrices[to], prices[from] + price);
    }
    // Update the prices with the prices found in this iteration.
    prices = tmpPrices;
  }

  // If the destination is still Infinity, it means it's unreachable within k stops.
  return prices[dst] === Infinity ? -1 : prices[dst];
}

/* 
513. Find Bottom Left Tree Value

Given the root of a binary tree, return the leftmost value in the last row of the tree.

Example 1:
Input: root = [2,1,3]
Output: 1

Example 2:
Input: root = [1,2,3,4,null,5,6,null,null,7]
Output: 7

Constraints:
The number of nodes in the tree is in the range [1, 104].
-231 <= Node.val <= 231 - 1

</> Typescript Code:
*/

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function findBottomLeftValue(root: TreeNode | null): number {
  let queue = [root]; // Use a queue to perform level order traversal.
  let current; // To keep track of the current node being processed.
  while (queue.length) {
    // While there are nodes to process,
    current = queue.shift(); // remove the front of the queue.
    // Right child is enqueued before the left child to ensure
    // the leftmost node is the last processed of the last level.
    if (current.right) queue.push(current.right); // Enqueue right child if it exists.
    if (current.left) queue.push(current.left); // Enqueue left child if it exists.
  }
  // After the loop, current will point to the leftmost node of the last level.
  return current.val; // Return the value of the leftmost node.
}

/* 
1609. Even Odd Tree

A binary tree is named Even-Odd if it meets the following conditions:

The root of the binary tree is at level index 0, its children are at level index 1, their children are at level index 2, etc.
For every even-indexed level, all nodes at the level have odd integer values in strictly increasing order (from left to right).
For every odd-indexed level, all nodes at the level have even integer values in strictly decreasing order (from left to right).
Given the root of a binary tree, return true if the binary tree is Even-Odd, otherwise return false.

Example 1:
Input: root = [1,10,4,3,null,7,9,12,8,6,null,null,2]
Output: true
Explanation: The node values on each level are:
Level 0: [1]
Level 1: [10,4]
Level 2: [3,7,9]
Level 3: [12,8,6,2]
Since levels 0 and 2 are all odd and increasing and levels 1 and 3 are all even and decreasing, the tree is Even-Odd.

Example 2:
Input: root = [5,4,2,3,3,7]
Output: false
Explanation: The node values on each level are:
Level 0: [5]
Level 1: [4,2]
Level 2: [3,3,7]
Node values in level 2 must be in strictly increasing order, so the tree is not Even-Odd.

Example 3:
Input: root = [5,9,1,3,5,7]
Output: false
Explanation: Node values in the level 1 should be even integers.

Constraints:
The number of nodes in the tree is in the range [1, 105].
1 <= Node.val <= 106

</> Typescript Code:
*/

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

// Function to determine if a binary tree is an Even-Odd tree
function isEvenOddTree(root: TreeNode | null): boolean {
  if (!root) return false; // If the tree is empty, it's not an Even-Odd tree
  let level = 0; // Start at level 0
  let queue: TreeNode[] = [root]; // Initialize a queue with the root node for level order traversal

  // Perform level order traversal
  while (queue.length > 0) {
    const size = queue.length; // Number of nodes at the current level
    // Initialize the previous value based on the level
    let prevValue = level % 2 === 0 ? Number.MIN_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;

    // Process all nodes at the current level
    for (let i = 0; i < size; ++i) {
      const node = queue.shift(); // Get the next node from the queue
      // Check the Even-Odd property based on the level
      if (node && level % 2 === 0) {
        // For even levels, values must be odd and strictly increasing
        if (node.val % 2 === 0 || node.val <= prevValue) return false;
      } else if (node) {
        // For odd levels, values must be even and strictly decreasing
        if (node.val % 2 !== 0 || node.val >= prevValue) return false;
      }
      if (node) prevValue = node.val; // Update the previous value for comparison
      // Add child nodes to the queue for the next level
      if (node && node.left) queue.push(node.left);
      if (node && node.right) queue.push(node.right);
    }
    level++; // Move to the next level
  }
  return true; // If all levels meet the Even-Odd property, return true
}

/* 
19. Remove Nth Node From End of List

Given the head of a linked list, remove the nth node from the end of the list and return its head.

Example 1:
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]

Example 2:
Input: head = [1], n = 1
Output: []

Example 3:
Input: head = [1,2], n = 1
Output: [1]

Constraints:
The number of nodes in the list is sz.
1 <= sz <= 30
0 <= Node.val <= 100
1 <= n <= sz

Follow up: Could you do this in one pass?

</> Typescript Code:
*/

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  let dummy = new ListNode(0); // Create a dummy node to simplify edge cases
  dummy.next = head; // Point dummy node to head to maintain the list structure
  let first: ListNode | null = dummy; // Pointer to advance n steps ahead
  let second: ListNode | null = dummy; // Pointer to find the node before the nth node from the end
  for (let i = 0; i <= n; i++)
    if (first !== null) {
      first = first.next; // Move first pointer n+1 steps ahead to maintain the gap
    }
  while (first != null && second != null) {
    // Traverse until the first pointer reaches the end
    first = first.next; // Move first pointer
    second = second.next; // Move second pointer simultaneously
  }
  if (second !== null && second.next !== null) {
    second.next = second.next.next;
  } // Remove the nth node by skipping it
  return dummy.next; // Return the modified list, excluding the dummy node
}

/* 
948. Bag of Tokens

You start with an initial power of power, an initial score of 0, and a bag of tokens given as an integer array tokens, where each tokens[i] donates the value of tokeni.

Your goal is to maximize the total score by strategically playing these tokens. In one move, you can play an unplayed token in one of the two ways (but not both for the same token):

Face-up: If your current power is at least tokens[i], you may play tokeni, losing tokens[i] power and gaining 1 score.
Face-down: If your current score is at least 1, you may play tokeni, gaining tokens[i] power and losing 1 score.
Return the maximum possible score you can achieve after playing any number of tokens.

Example 1:
Input: tokens = [100], power = 50
Output: 0
Explanation: Since your score is 0 initially, you cannot play the token face-down. You also cannot play it face-up since your power (50) is less than tokens[0] (100).

Example 2:
Input: tokens = [200,100], power = 150
Output: 1
Explanation: Play token1 (100) face-up, reducing your power to 50 and increasing your score to 1.
There is no need to play token0, since you cannot play it face-up to add to your score. The maximum score achievable is 1.

Example 3:
Input: tokens = [100,200,300,400], power = 200
Output: 2
Explanation: Play the tokens in this order to get a score of 2:
Play token0 (100) face-up, reducing power to 100 and increasing score to 1.
Play token3 (400) face-down, increasing power to 500 and reducing score to 0.
Play token1 (200) face-up, reducing power to 300 and increasing score to 1.
Play token2 (300) face-up, reducing power to 0 and increasing score to 2.
The maximum score achievable is 2.

Constraints:
0 <= tokens.length <= 1000
0 <= tokens[i], power < 104

</> Typescript Code:
*/

function bagOfTokensScore(tokens: number[], power: number): number {
  tokens.sort((a, b) => a - b); // Sort tokens in ascending order
  let score = 0,
    maxScore = 0; // Initialize score and maxScore
  let i = 0,
    j = tokens.length - 1; // Two pointers, start and end of the tokens array
  while (i <= j) {
    // Loop until the two pointers meet
    if (power >= tokens[i]) {
      // If current power is enough to play the token face-up
      power -= tokens[i++]; // Play the token face-up, reduce power, move the start pointer
      maxScore = Math.max(maxScore, ++score); // Increase score and update maxScore if needed
    } else if (score > 0) {
      // If not enough power but have score to play token face-down
      power += tokens[j--]; // Play the token face-down, gain power, move the end pointer
      --score; // Reduce score since we played face-down
    } else {
      break; // Can't play any token, exit loop
    }
  }
  return maxScore; // Return the maximum score achieved
}

/* 
1750. Minimum Length of String After Deleting Similar Ends

Given a string s consisting only of characters 'a', 'b', and 'c'. You are asked to apply the following algorithm on the string any number of times:

Pick a non-empty prefix from the string s where all the characters in the prefix are equal.
Pick a non-empty suffix from the string s where all the characters in this suffix are equal.
The prefix and the suffix should not intersect at any index.
The characters from the prefix and suffix must be the same.
Delete both the prefix and the suffix.
Return the minimum length of s after performing the above operation any number of times (possibly zero times).

Example 1:
Input: s = "ca"
Output: 2
Explanation: You can't remove any characters, so the string stays as is.

Example 2:
Input: s = "cabaabac"
Output: 0
Explanation: An optimal sequence of operations is:
- Take prefix = "c" and suffix = "c" and remove them, s = "abaaba".
- Take prefix = "a" and suffix = "a" and remove them, s = "baab".
- Take prefix = "b" and suffix = "b" and remove them, s = "aa".
- Take prefix = "a" and suffix = "a" and remove them, s = "".

Example 3:
Input: s = "aabccabba"
Output: 3
Explanation: An optimal sequence of operations is:
- Take prefix = "aa" and suffix = "a" and remove them, s = "bccabb".
- Take prefix = "b" and suffix = "bb" and remove them, s = "cca".

Constraints:
1 <= s.length <= 105
s only consists of characters 'a', 'b', and 'c'.

</> Typescript Code:
*/

function minimumLength(s: string): number {
  let left = 0; // Initialize left pointer
  let right = s.length - 1; // Initialize right pointer
  // Loop until left and right pointers meet
  while (left < right && s[left] === s[right]) {
    const char = s[left]; // Store the current character for comparison
    // Move left pointer to the right past all identical characters
    while (left <= right && s[left] === char) left++;
    // Move right pointer to the left past all identical characters
    while (left <= right && s[right] === char) right--;
  }
  // Calculate and return the length of the remaining string
  return right - left + 1;
}

/* 
791. Custom Sort String

You are given two strings order and s. All the characters of order are unique and were sorted in some custom order previously.

Permute the characters of s so that they match the order that order was sorted. More specifically, if a character x occurs before a character y in order, then x should occur before y in the permuted string.

Return any permutation of s that satisfies this property.

Example 1:
Input:  order = "cba", s = "abcd" 
Output:  "cbad" 
Explanation: "a", "b", "c" appear in order, so the order of "a", "b", "c" should be "c", "b", and "a".
Since "d" does not appear in order, it can be at any position in the returned string. "dcba", "cdba", "cbda" are also valid outputs.

Example 2:
Input:  order = "bcafg", s = "abcd" 
Output:  "bcad" 
Explanation: The characters "b", "c", and "a" from order dictate the order for the characters in s. The character "d" in s does not appear in order, so its position is flexible.
Following the order of appearance in order, "b", "c", and "a" from s should be arranged as "b", "c", "a". "d" can be placed at any position since it's not in order. The output "bcad" correctly follows this rule. Other arrangements like "bacd" or "bcda" would also be valid, as long as "b", "c", "a" maintain their order.

Constraints:
1 <= order.length <= 26
1 <= s.length <= 200
order and s consist of lowercase English letters.
All the characters of order are unique.

</> Typescript Code:
*/

// Define the customSortString function with order and s as input strings
function customSortString(order: string, s: string): string {
  // Initialize an object to keep count of each character's occurrences in s
  const count = {};
  // Iterate over the string s to populate the count object
  for (const char of s) {
    // Increase the count for each character, initializing it to 0 if not present
    count[char] = (count[char] || 0) + 1;
  }
  // Initialize the result string that will store the final sorted string
  let result = '';
  // Iterate over the order string to add characters to the result in the specified order
  for (const char of order) {
    // Repeat the character by its count in s and add to the result string
    result += char.repeat(count[char] || 0);
    // Remove the character from the count object once it's added to the result
    delete count[char];
  }
  // Add remaining characters (those not in order) to the result string
  for (const char in count) {
    // Repeat each remaining character by its count and add to the result
    result += char.repeat(count[char]);
  }
  // Return the sorted string that respects the order defined by the 'order' string
  return result;
}

/* 
1171. Remove Zero Sum Consecutive Nodes from Linked List

Given the head of a linked list, we repeatedly delete consecutive sequences of nodes that sum to 0 until there are no such sequences.

After doing so, return the head of the final linked list.  You may return any such answer.

(Note that in the examples below, all sequences are serializations of ListNode objects.)

Example 1:
Input: head = [1,2,-3,3,1]
Output: [3,1]
Note: The answer [1,2,1] would also be accepted.

Example 2:
Input: head = [1,2,3,-3,4]
Output: [1,2,4]

Example 3:
Input: head = [1,2,3,-3,-2]
Output: [1]

Constraints:
The given linked list will contain between 1 and 1000 nodes.
Each node in the linked list has -1000 <= node.val <= 1000.

</> Typescript Code:
*/

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function removeZeroSumSublists(head: ListNode | null): ListNode | null {
  let dummy = new ListNode(0, head); // Create a dummy node to handle edge cases smoothly
  let prefixSum = new Map(); // To store cumulative sum up to each node
  let sum = 0;
  for (let node: ListNode | null = dummy; node != null; node = node.next) {
    // Calculate prefix sum for all nodes
    sum += node.val;
    prefixSum.set(sum, node); // Map current sum to the node
  }
  sum = 0;
  for (let node: ListNode | null = dummy; node != null; node = node.next) {
    // Reset sum to use it for removing nodes
    sum += node.val;
    node.next = prefixSum.get(sum)?.next; // Link current node to the next non-zero sum node
  }
  return dummy.next; // Return head of the modified list
}

/* 
930. Binary Subarrays With Sum

Given a binary array nums and an integer goal, return the number of non-empty subarrays with a sum goal.

A subarray is a contiguous part of the array.

Example 1:
Input: nums = [1,0,1,0,1], goal = 2
Output: 4
Explanation: The 4 subarrays are bolded and underlined below:
[1,0,1,0,1]
[1,0,1,0,1]
[1,0,1,0,1]
[1,0,1,0,1]

Example 2:
Input: nums = [0,0,0,0,0], goal = 0
Output: 15

Constraints:
1 <= nums.length <= 3 * 104
nums[i] is either 0 or 1.
0 <= goal <= nums.length

</> Typescript Code:
*/

function numSubarraysWithSum(nums: number[], goal: number): number {
  let count = 0; // Initialize count of valid subarrays
  let sum = 0; // Initialize current sum of elements
  const map = new Map<number, number>(); // Create a map to store the frequency of sums
  map.set(0, 1); // Base case: a sum of 0 has occurred once
  for (let num of nums) {
    // Iterate through each number in the array
    sum += num; // Add current number to sum
    count += map.get(sum - goal) || 0; // If (sum - goal) exists in map, add its frequency to count
    map.set(sum, (map.get(sum) || 0) + 1); // Update the frequency of the current sum in the map
  }
  return count; // Return the total count of valid subarrays
}

/* 
238. Product of Array Except Self

Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

Example 1:
Input: nums = [1,2,3,4]
Output: [24,12,8,6]

Example 2:
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]

Constraints:
2 <= nums.length <= 105
-30 <= nums[i] <= 30
The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

Follow up: Can you solve the problem in O(1) extra space complexity? (The output array does not count as extra space for space complexity analysis.)

</> Typescript Code:
*/

function productExceptSelf(nums: number[]): number[] {
  // Get the length of the input array.
  let n = nums.length;
  // Initialize the answer array with 1s.
  let answer = Array(n).fill(1);

  // Initialize prefix product as 1.
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    // For each element, set the answer at i to the current prefix product.
    answer[i] = prefix;
    // Update the prefix product by multiplying it with the current element.
    prefix *= nums[i];
  }

  // Initialize suffix product as 1.
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    // Multiply the answer at i with the current suffix product.
    answer[i] *= suffix;
    // Update the suffix product by multiplying it with the current element.
    suffix *= nums[i];
  }

  // Return the answer array.
  return answer;
}

/* 
525. Contiguous Array

Given a binary array nums, return the maximum length of a contiguous subarray with an equal number of 0 and 1.

Example 1:
Input: nums = [0,1]
Output: 2
Explanation: [0, 1] is the longest contiguous subarray with an equal number of 0 and 1.

Example 2:
Input: nums = [0,1,0]
Output: 2
Explanation: [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.

Constraints:
1 <= nums.length <= 105
nums[i] is either 0 or 1.

</> Typescript Code:
*/

// Define the function findMaxLength that takes an array of numbers as input and returns a number.
function findMaxLength(nums: number[]): number {
  // Initialize count to track the difference between the number of 0's and 1's encountered.
  let count = 0;
  // Initialize maxLength to keep track of the maximum length of a subarray with equal number of 0's and 1's.
  let maxLength = 0;
  // Initialize a map to store the first occurrence index of each count value with a base case of count 0 at index -1.
  const countMap = new Map([[0, -1]]);

  // Iterate through the nums array.
  for (let i = 0; i < nums.length; i++) {
    // Update the count: increment for 1, decrement for 0.
    count += nums[i] === 1 ? 1 : -1;
    // If the count already exists in the map, calculate the length of the current subarray and update maxLength if it's greater.
    if (countMap.has(count)) {
      maxLength = Math.max(maxLength, i - countMap.get(count)!);
    } else {
      // If the count does not exist in the map, add it with its corresponding index.
      countMap.set(count, i);
    }
  }
  // Return the maximum length of a contiguous subarray with equal number of 0's and 1's.
  return maxLength;
}

/* 
57. Insert Interval

You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.

Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return intervals after the insertion.

Note that you don't need to modify intervals in-place. You can make a new array and return it.

Example 1:
Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]

Example 2:
Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

Constraints:
0 <= intervals.length <= 104
intervals[i].length == 2
0 <= starti <= endi <= 105
intervals is sorted by starti in ascending order.
newInterval.length == 2
0 <= start <= end <= 105

</> Typescript Code:
*/

function insert(intervals: number[][], newInterval: number[]): number[][] {
  let result: number[][] = [],
    i = 0;
  // Loop through intervals, add to result those that end before newInterval starts
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
  }
  // Loop through overlaps, merge with newInterval
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    // Update newInterval to the merged boundaries
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  // Add the merged interval to the result
  result.push(newInterval);
  // Add the rest of the intervals to result
  while (i < intervals.length) {
    result.push(intervals[i]);
    i++;
  }
  return result; // Return the modified intervals array
}

/* 
452. Minimum Number of Arrows to Burst Balloons

There are some spherical balloons taped onto a flat wall that represents the XY-plane. The balloons are represented as a 2D integer array points where points[i] = [xstart, xend] denotes a balloon whose horizontal diameter stretches between xstart and xend. You do not know the exact y-coordinates of the balloons.

Arrows can be shot up directly vertically (in the positive y-direction) from different points along the x-axis. A balloon with xstart and xend is burst by an arrow shot at x if xstart <= x <= xend. There is no limit to the number of arrows that can be shot. A shot arrow keeps traveling up infinitely, bursting any balloons in its path.

Given the array points, return the minimum number of arrows that must be shot to burst all balloons.

Example 1:
Input: points = [[10,16],[2,8],[1,6],[7,12]]
Output: 2
Explanation: The balloons can be burst by 2 arrows:
- Shoot an arrow at x = 6, bursting the balloons [2,8] and [1,6].
- Shoot an arrow at x = 11, bursting the balloons [10,16] and [7,12].

Example 2:
Input: points = [[1,2],[3,4],[5,6],[7,8]]
Output: 4
Explanation: One arrow needs to be shot for each balloon for a total of 4 arrows.

Example 3:
Input: points = [[1,2],[2,3],[3,4],[4,5]]
Output: 2
Explanation: The balloons can be burst by 2 arrows:
- Shoot an arrow at x = 2, bursting the balloons [1,2] and [2,3].
- Shoot an arrow at x = 4, bursting the balloons [3,4] and [4,5].

Constraints:
1 <= points.length <= 105
points[i].length == 2
-231 <= xstart < xend <= 231 - 1

</> Typescript Code:
*/

function findMinArrowShots(points: number[][]): number {
  points.sort((a, b) => a[1] - b[1]); // Sort balloons by their end position
  let arrows = 1; // Start with one arrow for the first balloon
  let end = points[0][1]; // Initialize the end to the end of the first balloon
  for (let i = 1; i < points.length; i++) {
    // If the start of the next balloon is greater than the end of the last burst balloon
    if (points[i][0] > end) {
      arrows++; // Need another arrow for this balloon
      end = points[i][1]; // Update the end to the end of this balloon
    }
  }
  return arrows; // Return the minimum number of arrows needed
}

/* 
621. Task Scheduler

You are given an array of CPU tasks, each represented by letters A to Z, and a cooling time, n. Each cycle or interval allows the completion of one task. Tasks can be completed in any order, but there's a constraint: identical tasks must be separated by at least n intervals due to cooling time.

​Return the minimum number of intervals required to complete all tasks.

Example 1:
Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation: A possible sequence is: A -> B -> idle -> A -> B -> idle -> A -> B.
After completing task A, you must wait two cycles before doing A again. The same applies to task B. In the 3rd interval, neither A nor B can be done, so you idle. By the 4th cycle, you can do A again as 2 intervals have passed.

Example 2:
Input: tasks = ["A","C","A","B","D","B"], n = 1
Output: 6
Explanation: A possible sequence is: A -> B -> C -> D -> A -> B.
With a cooling interval of 1, you can repeat a task after just one other task.

Example 3:
Input: tasks = ["A","A","A", "B","B","B"], n = 3
Output: 10
Explanation: A possible sequence is: A -> B -> idle -> idle -> A -> B -> idle -> idle -> A -> B.
There are only two types of tasks, A and B, which need to be separated by 3 intervals. This leads to idling twice between repetitions of these tasks.

Constraints:
1 <= tasks.length <= 104
tasks[i] is an uppercase English letter.
0 <= n <= 100

</> Typescript Code:
*/

// Define the function with its parameters: an array of tasks and the cooldown period n
function leastInterval(tasks: string[], n: number): number {
  // Initialize an array of 26 elements to count the frequency of each task
  const taskCounts = new Array(26).fill(0);
  // Loop through the tasks to count the occurrences of each
  for (const task of tasks) {
    taskCounts[task.charCodeAt(0) - 'A'.charCodeAt(0)]++;
  }
  // Sort the counts in descending order to prioritize tasks with higher frequency
  taskCounts.sort((a, b) => b - a);
  // Calculate the maximum number of idle slots needed based on the most frequent task
  let maxVal = taskCounts[0] - 1,
    idleSlots = maxVal * n;
  // Reduce the number of idle slots by filling them with other tasks
  for (let i = 1; i < taskCounts.length; i++) {
    idleSlots -= Math.min(taskCounts[i], maxVal);
  }
  // Return the total time taken, adding the idle slots if necessary, or just the length of tasks if no idling is needed
  return idleSlots > 0 ? idleSlots + tasks.length : tasks.length;
}

/* 
1669. Merge In Between Linked Lists

You are given two linked lists: list1 and list2 of sizes n and m respectively.

Remove list1's nodes from the ath node to the bth node, and put list2 in their place.

The blue edges and nodes in the following figure indicate the result:

Build the result list and return its head.

Example 1:
Input: list1 = [10,1,13,6,9,5], a = 3, b = 4, list2 = [1000000,1000001,1000002]
Output: [10,1,13,1000000,1000001,1000002,5]
Explanation: We remove the nodes 3 and 4 and put the entire list2 in their place. The blue edges and nodes in the above figure indicate the result.

Example 2:
Input: list1 = [0,1,2,3,4,5,6], a = 2, b = 5, list2 = [1000000,1000001,1000002,1000003,1000004]
Output: [0,1,1000000,1000001,1000002,1000003,1000004,6]
Explanation: The blue edges and nodes in the above figure indicate the result.

Constraints:
3 <= list1.length <= 104
1 <= a <= b < list1.length - 1
1 <= list2.length <= 104

</> Typescript Code:
*/

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function mergeInBetween(
  list1: ListNode | null,
  a: number,
  b: number,
  list2: ListNode | null,
): ListNode | null {
  // Create a dummy node to simplify edge case handling
  let dummy = new ListNode(0, list1);
  // Use prev to find the node just before 'a'
  let prev = dummy;
  for (let i = 0; i < a && prev.next !== null; i++) prev = prev.next;
  // 'start' will be the node before where 'list2' should be merged
  let start = prev;
  // 'end' will be the node just after 'b', where the merge ends
  let end: ListNode | null = start.next;
  for (let i = a; i <= b && end !== null; i++) end = end.next; // Navigate to the node after 'b'
  // Connect 'start' to the head of 'list2'
  if (start !== null) start.next = list2;
  // Navigate through 'list2' to find its end
  while (list2 !== null && list2.next !== null) list2 = list2.next;
  // Connect the end of 'list2' to 'end'
  if (list2 !== null) list2.next = end;
  // Return the modified list starting from the node after dummy
  return dummy.next;
}

/* 
143. Reorder List

You are given the head of a singly linked-list. The list can be represented as:

L0 → L1 → … → Ln - 1 → Ln
Reorder the list to be on the following form:

L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
You may not modify the values in the list's nodes. Only nodes themselves may be changed.

Example 1:
Input: head = [1,2,3,4]
Output: [1,4,2,3]

Example 2:
Input: head = [1,2,3,4,5]
Output: [1,5,2,4,3]

Constraints:
The number of nodes in the list is in the range [1, 5 * 104].
1 <= Node.val <= 1000

</> Typescript Code:
*/

// Commented version explaining each line
function reorderList(head: ListNode | null): void {
  if (!head || !head.next) return; // Return immediately if the list is too short to reorder
  let slow: ListNode | null = head,
    fast: ListNode | null = head,
    prev: ListNode | null = null,
    temp: ListNode | null;
  // Use the fast and slow pointer technique to find the midpoint of the list
  while (fast && fast.next) {
    prev = slow; // Keep track of the node before slow
    slow = slow!.next; // Move slow one step
    fast = fast.next.next; // Move fast two steps
  }
  prev!.next = null; // Cut the list at the midpoint
  prev = null;
  // Reverse the second half of the list
  while (slow) {
    temp = slow.next; // Store the next node
    slow.next = prev; // Reverse the link
    prev = slow; // Move prev to slow
    slow = temp; // Move slow to the next node
  }
  // Interleave the first half and the reversed second half
  let first = head,
    second = prev; // Start with the first node and the head of the reversed second half
  while (second) {
    temp = first.next; // Store the next node of the first half
    first.next = second; // Point the current node of the first half to the current node of the second half
    first = second; // Move first to point to the current node of the second half
    second = temp; // Move second to the next node in the original first half (stored in temp)
  }
}

/* 
287. Find the Duplicate Number

Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.

There is only one repeated number in nums, return this repeated number.

You must solve the problem without modifying the array nums and uses only constant extra space.

Example 1:
Input: nums = [1,3,4,2,2]
Output: 2

Example 2:
Input: nums = [3,1,3,4,2]
Output: 3

Example 3:
Input: nums = [3,3,3,3,3]
Output: 3

Constraints:
1 <= n <= 105
nums.length == n + 1
1 <= nums[i] <= n
All the integers in nums appear only once except for precisely one integer which appears two or more times.

Follow up:
How can we prove that at least one duplicate number must exist in nums?
Can you solve the problem in linear runtime complexity?

</> Typescript Code:
*/

// Defines a function to find the duplicate number in an array
function findDuplicate(nums: number[]): number {
  // Initialize two pointers for the "tortoise and hare" approach
  let slow = nums[0];
  let fast = nums[nums[0]];

  // Loop until the two pointers meet
  while (slow != fast) {
    // Move the slow pointer by one step
    slow = nums[slow];
    // Move the fast pointer by two steps
    fast = nums[nums[fast]];
  }

  // Reset the slow pointer to the start of the array
  slow = 0;

  // Loop again until the two pointers meet
  // This time, both pointers move at the same speed
  while (slow != fast) {
    // Move both pointers by one step
    slow = nums[slow];
    fast = nums[fast];
  }

  // When the pointers meet, the meeting point is the duplicate number
  return slow;
}

/* 
442. Find All Duplicates in an Array

Given an integer array nums of length n where all the integers of nums are in the range [1, n] and each integer appears once or twice, return an array of all the integers that appears twice.

You must write an algorithm that runs in O(n) time and uses only constant extra space.

Example 1:
Input: nums = [4,3,2,7,8,2,3,1]
Output: [2,3]

Example 2:
Input: nums = [1,1,2]
Output: [1]

Example 3:
Input: nums = [1]
Output: []

Constraints:
n == nums.length
1 <= n <= 10^5
1 <= nums[i] <= n
Each element in nums appears once or twice.

</> Typescript Code:
*/

// Defines a function to find all duplicates in the given array
function findDuplicates(nums: number[]): number[] {
  // Initialize an empty array to store the duplicates
  const output: number[] = [];
  // Iterate over each element in the array
  for (let i = 0; i < nums.length; i++) {
    // Calculate the index based on the current element's value
    // Use Math.abs to ensure the index is positive
    const index = Math.abs(nums[i]) - 1;
    // If the value at the calculated index is negative,
    // it means we've seen this number before, so it's a duplicate
    if (nums[index] < 0) output.push(Math.abs(nums[i]));
    // Mark the value at the calculated index as seen by making it negative
    nums[index] = -nums[index];
  }
  // Return the array containing all duplicates
  return output;
}

/* 
713. Subarray Product Less Than K

Given an array of integers nums and an integer k, return the number of contiguous subarrays where the product of all the elements in the subarray is strictly less than k.

Example 1:
Input: nums = [10,5,2,6], k = 100
Output: 8
Explanation: The 8 subarrays that have product less than 100 are:
[10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6]
Note that [10, 5, 2] is not included as the product of 100 is not strictly less than k.

Example 2:
Input: nums = [1,2,3], k = 0
Output: 0

Constraints:
1 <= nums.length <= 3 * 10^4
1 <= nums[i] <= 1000
0 <= k <= 10^6

</> Typescript Code:
*/

function numSubarrayProductLessThanK(nums: number[], k: number): number {
  // Return 0 immediately if k is 1 or less because no product can be strictly less than k in such cases
  if (k <= 1) return 0;
  // Initialize the count of subarrays found
  let count = 0;
  // Initialize the product of elements in the current subarray
  let product = 1;
  // Initialize the left pointer for the sliding window
  let left = 0;
  // Iterate over the array with a right pointer to examine each subarray
  for (let right = 0; right < nums.length; right++) {
    // Multiply the current product by the element at the right pointer
    product *= nums[right];
    // If the product equals or exceeds k, shrink the window from the left until it's less than k again
    while (product >= k) {
      product /= nums[left++];
    }
    // Count the number of subarrays ending at right by adding the difference between right and left pointers plus one
    count += right - left + 1;
  }
  // Return the total count of qualifying subarrays
  return count;
}

/* 
2958. Length of Longest Subarray With at Most K Frequency

You are given an integer array nums and an integer k.

The frequency of an element x is the number of times it occurs in an array.

An array is called good if the frequency of each element in this array is less than or equal to k.

Return the length of the longest good subarray of nums.

A subarray is a contiguous non-empty sequence of elements within an array.

Example 1:
Input: nums = [1,2,3,1,2,3,1,2], k = 2
Output: 6
Explanation: The longest possible good subarray is [1,2,3,1,2,3] since the values 1, 2, and 3 occur at most twice in this subarray. Note that the subarrays [2,3,1,2,3,1] and [3,1,2,3,1,2] are also good.
It can be shown that there are no good subarrays with length more than 6.

Example 2:
Input: nums = [1,2,1,2,1,2,1,2], k = 1
Output: 2
Explanation: The longest possible good subarray is [1,2] since the values 1 and 2 occur at most once in this subarray. Note that the subarray [2,1] is also good.
It can be shown that there are no good subarrays with length more than 2.

Example 3:
Input: nums = [5,5,5,5,5,5,5], k = 4
Output: 4
Explanation: The longest possible good subarray is [5,5,5,5] since the value 5 occurs 4 times in this subarray.
It can be shown that there are no good subarrays with length more than 4.

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^9
1 <= k <= nums.length

</> Typescript Code:
*/

// Define the function maxSubarrayLength, accepting an array of numbers and an integer k
function maxSubarrayLength(nums: number[], k: number): number {
  // Initialize left pointer for the sliding window, maxLength to track the longest subarray, and a frequency map
  let left = 0,
    maxLength = 0,
    freq = new Map();
  // Iterate through the array with right pointer to define the end of the sliding window
  for (let right = 0; right < nums.length; right++) {
    // Update the frequency map for the current element, incrementing its count
    freq.set(nums[right], (freq.get(nums[right]) || 0) + 1);
    // If the frequency of the current element exceeds k, shrink the window from the left until it's good again
    while (freq.get(nums[right]) > k) {
      freq.set(nums[left], freq.get(nums[left]) - 1);
      left++;
    }
    // Update maxLength if the current window size is greater than previous maxLength
    maxLength = Math.max(maxLength, right - left + 1);
  }
  // Return the length of the longest good subarray
  return maxLength;
}

/* 
2962. Count Subarrays Where Max Element Appears at Least K Times

You are given an integer array nums and a positive integer k.

Return the number of subarrays where the maximum element of nums appears at least k times in that subarray.

A subarray is a contiguous sequence of elements within an array.

Example 1:
Input: nums = [1,3,2,3,3], k = 2
Output: 6
Explanation: The subarrays that contain the element 3 at least 2 times are: [1,3,2,3], [1,3,2,3,3], [3,2,3], [3,2,3,3], [2,3,3] and [3,3].

Example 2:
Input: nums = [1,4,2,1], k = 3
Output: 0
Explanation: No subarray contains the element 4 at least 3 times.

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^6
1 <= k <= 10^5

</> Typescript Code:
*/

function countSubarrays(nums: number[], k: number): number {
  if (!nums?.length) return 0; // If the input array is empty, return 0 as there are no subarrays to count.

  const maximumNum = Math.max(...nums); // Calculate the maximum element in the array, which is the focus of our subarray criteria.
  let frequency = 0; // This variable tracks the frequency of the maximum element within the current sliding window.
  let leftIndex = 0; // The left index of the sliding window.
  let rightIndex = 0; // The right index of the sliding window, initially set to the start of the array.
  let count = 0; // Accumulator for the count of valid subarrays.

  // Iterate through the array with the right index of the sliding window.
  while (rightIndex < nums.length) {
    if (nums[rightIndex] === maximumNum) {
      // If the current element is the maximum, increment its frequency counter.
      frequency++;
    }

    // If the frequency of the maximum element in the window reaches or exceeds k, shrink the window from the left.
    while (frequency >= k) {
      if (nums[leftIndex] === maximumNum) {
        // Before shrinking the window, decrement the frequency if the leftmost element is the maximum.
        frequency--;
      }

      leftIndex++; // Shrink the window by moving the left index to the right.
    }

    // Add the number of valid subarrays ending at the current right index.
    // This works because for any right index, the number of valid subarrays is the distance between the current right index and the left index.
    // It effectively counts all subarrays that include nums[rightIndex] and have the maximum element appearing at least k times.
    count += leftIndex;
    rightIndex++; // Expand the window by moving the right index to the right.
  }

  return count; // Return the total count of valid subarrays.
}

/* 
79. Word Search

Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

Example 1:
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true

Example 2:
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true

Example 3:
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false

Constraints:
m == board.length
n = board[i].length
1 <= m, n <= 6
1 <= word.length <= 15
board and word consists of only lowercase and uppercase English letters.

Follow up: Could you use search pruning to make your solution faster with a larger board?

</> Typescript Code:
*/

// Defines a function to determine if a word exists in a given grid
function exist(board: string[][], word: string): boolean {
  const rows = board.length; // Number of rows in the board
  const cols = board[0].length; // Number of columns in the board

  // Helper function for depth-first search (DFS) starting from a cell
  const dfs = (r, c, i) => {
    if (i === word.length) return true; // If all characters are found
    // Return false if out of bounds, or current cell does not match the word character at i
    if (r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] !== word[i]) return false;
    board[r][c] = '#'; // Temporarily mark the cell as visited
    // Explore all four directions
    const exists =
      dfs(r + 1, c, i + 1) || dfs(r - 1, c, i + 1) || dfs(r, c + 1, i + 1) || dfs(r, c - 1, i + 1);
    board[r][c] = word[i]; // Reset the cell back to its original value
    return exists; // Return true if word is found
  };

  // Iterate over every cell in the board
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) return true; // If word is found starting from (r, c), return true
    }
  }
  return false; // If the word is not found in any path, return false
}

/* 
1249. Minimum Remove to Make Valid Parentheses

Given a string s of '(' , ')' and lowercase English characters.

Your task is to remove the minimum number of parentheses ( '(' or ')', in any positions ) so that the resulting parentheses string is valid and return any valid string.

Formally, a parentheses string is valid if and only if:

It is the empty string, contains only lowercase characters, or
It can be written as AB (A concatenated with B), where A and B are valid strings, or
It can be written as (A), where A is a valid string.

Example 1:
Input: s = "lee(t(c)o)de)"
Output: "lee(t(c)o)de"
Explanation: "lee(t(co)de)" , "lee(t(c)ode)" would also be accepted.

Example 2:
Input: s = "a)b(c)d"
Output: "ab(c)d"

Example 3:
Input: s = "))(("
Output: ""
Explanation: An empty string is also valid.

Constraints:
1 <= s.length <= 105
s[i] is either'(' , ')', or lowercase English letter.

</> Typescript Code:
*/

// Define a function to remove the minimum number of parentheses to make a string valid
function minRemoveToMakeValid(s: string): string {
  // Use a stack to keep track of the indices of '(' characters that might need to be removed
  const stack: number[] = [];
  // Convert the string into an array for easy manipulation
  const sArray = s.split('');
  // Iterate over the array
  for (let i = 0; i < sArray.length; i++) {
    if (sArray[i] === '(') {
      // If the current character is '(', push its index onto the stack
      stack.push(i);
    } else if (sArray[i] === ')') {
      // If the current character is ')'
      if (stack.length) stack.pop(); // If there's an unmatched '(', pop the stack (match found)
      else sArray[i] = ''; // If there's no unmatched '(', mark this ')' for removal
    }
  }
  // Remove any unmatched '(' by setting them to '' using the indices left in the stack
  while (stack.length) {
    sArray[stack.pop()!] = '';
  }
  // Join the array back into a string and return it
  return sArray.join('');
}

/* 
678. Valid Parenthesis String

Given a string s containing only three types of characters: '(', ')' and '*', return true if s is valid.

The following rules define a valid string:

Any left parenthesis '(' must have a corresponding right parenthesis ')'.
Any right parenthesis ')' must have a corresponding left parenthesis '('.
Left parenthesis '(' must go before the corresponding right parenthesis ')'.
'*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string "".

Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "(*)"
Output: true

Example 3:
Input: s = "(*))"
Output: true

Constraints:
1 <= s.length <= 100
s[i] is '(', ')' or '*'.

</> Typescript Code:
*/

// This function checks if the input string s is a valid parenthesis string according to the given rules
function checkValidString(s: string): boolean {
  // low represents the lowest possible number of open parentheses, high represents the highest possible number
  let low = 0,
    high = 0;
  // Iterate through each character in the string
  for (const char of s) {
    // If the character is '(', it could potentially increase the number of unmatched open parentheses
    low += char === '(' ? 1 : -1;
    // If the character is not ')', it could potentially act as '(' or be ignored, increasing the possibility of unmatched open parentheses
    high += char !== ')' ? 1 : -1;
    // If high becomes negative, it means there are too many ')' without matching '(' before it, thus the string is invalid
    if (high < 0) break;
    // Low cannot be negative; a negative low would mean we are considering more closing ')' than opening '(', which is invalid
    low = Math.max(low, 0);
  }
  // If low is 0, it means we have a valid configuration where all '(' can be matched with ')' considering '*' placements
  return low === 0;
}

/* 
950. Reveal Cards In Increasing Order

You are given an integer array deck. There is a deck of cards where every card has a unique integer. The integer on the ith card is deck[i].

You can order the deck in any order you want. Initially, all the cards start face down (unrevealed) in one deck.

You will do the following steps repeatedly until all cards are revealed:

1. Take the top card of the deck, reveal it, and take it out of the deck.
2. If there are still cards in the deck then put the next top card of the deck at the bottom of the deck.
3. If there are still unrevealed cards, go back to step 1. Otherwise, stop.

Return an ordering of the deck that would reveal the cards in increasing order.

Note that the first entry in the answer is considered to be the top of the deck.

Example 1:
Input: deck = [17,13,11,2,3,5,7]
Output: [2,13,3,11,5,17,7]
Explanation: 
We get the deck in the order [17,13,11,2,3,5,7] (this order does not matter), and reorder it.
After reordering, the deck starts as [2,13,3,11,5,17,7], where 2 is the top of the deck.
We reveal 2, and move 13 to the bottom.  The deck is now [3,11,5,17,7,13].
We reveal 3, and move 11 to the bottom.  The deck is now [5,17,7,13,11].
We reveal 5, and move 17 to the bottom.  The deck is now [7,13,11,17].
We reveal 7, and move 13 to the bottom.  The deck is now [11,17,13].
We reveal 11, and move 17 to the bottom.  The deck is now [13,17].
We reveal 13, and move 17 to the bottom.  The deck is now [17].
We reveal 17.
Since all the cards revealed are in increasing order, the answer is correct.

Example 2:
Input: deck = [1,1000]
Output: [1,1000]

Constraints:
1 <= deck.length <= 1000
1 <= deck[i] <= 10^6
All the values of deck are unique.

</> Typescript Code:
*/

function deckRevealedIncreasing(deck: number[]): number[] {
  // First, sort the deck in ascending order.
  deck.sort((a, b) => a - b);

  // Initialize an empty array to store the final ordering of the deck.
  const result: number[] = [];

  // Loop until all cards from the sorted deck are processed.
  while (deck.length) {
    // Remove the last card from the sorted deck and place it at the front of the result array.
    // This simulates the reveal action.
    result.unshift(deck.pop()!);

    // If there are still cards left in the deck,
    // remove the last card from the result array and place it at the front.
    // This simulates putting the next top card at the bottom of the deck.
    if (deck.length) result.unshift(result.pop()!);
  }

  // Return the reordered deck, which reveals cards in increasing order.
  return result;
}

/* 
402. Remove K Digits

Given string num representing a non-negative integer num, and an integer k, return the smallest possible integer after removing k digits from num.


Example 1:
Input: num = "1432219", k = 3
Output: "1219"
Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.

Example 2:
Input: num = "10200", k = 1
Output: "200"
Explanation: Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.

Example 3:
Input: num = "10", k = 2
Output: "0"
Explanation: Remove all the digits from the number and it is left with nothing which is 0.

Constraints:
1 <= k <= num.length <= 10^5
num consists of only digits.
num does not have any leading zeros except for the zero itself.

</> Typescript Code:
*/

function removeKdigits(num: string, k: number): string {
  // Initialize a stack to keep track of digits
  const stack: string[] = [];

  // Iterate through each digit in the number
  for (let digit of num) {
    // While there are digits in the stack, we haven't removed k digits yet,
    // and the last digit in the stack is greater than the current digit
    while (stack.length && k && stack[stack.length - 1] > digit) {
      // Pop the last digit off the stack to remove it
      stack.pop();
      // Decrement k as we've removed a digit
      k--;
    }
    // Add the current digit to the stack
    stack.push(digit);
  }

  // If we haven't removed k digits, remove the remaining digits from the end
  while (k--) stack.pop();

  // Remove leading zeros
  while (stack.length && stack[0] === '0') stack.shift();

  // If the stack is empty, return '0', otherwise join the stack to form the number
  return stack.length ? stack.join('') : '0';
}

/* 
129. Sum Root to Leaf Numbers

You are given the root of a binary tree containing digits from 0 to 9 only.

Each root-to-leaf path in the tree represents a number.

For example, the root-to-leaf path 1 -> 2 -> 3 represents the number 123.
Return the total sum of all root-to-leaf numbers. Test cases are generated so that the answer will fit in a 32-bit integer.

A leaf node is a node with no children.

Example 1:
Input: root = [1,2,3]
Output: 25
Explanation:
The root-to-leaf path 1->2 represents the number 12.
The root-to-leaf path 1->3 represents the number 13.
Therefore, sum = 12 + 13 = 25.

Example 2:
Input: root = [4,9,0,5,1]
Output: 1026
Explanation:
The root-to-leaf path 4->9->5 represents the number 495.
The root-to-leaf path 4->9->1 represents the number 491.
The root-to-leaf path 4->0 represents the number 40.
Therefore, sum = 495 + 491 + 40 = 1026.

Constraints:
The number of nodes in the tree is in the range [1, 1000].
0 <= Node.val <= 9
The depth of the tree will not exceed 10.

</> Typescript Code:
*/

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

// Function to calculate the total sum of all root-to-leaf numbers.
function sumNumbers(root: TreeNode | null, currentSum: number = 0): number {
  if (!root) return 0; // Base case: if the current node is null, return 0.
  currentSum = currentSum * 10 + root.val; // Calculate the current sum by appending the current node's value.
  // Check if the current node is a leaf node.
  if (!root.left && !root.right) return currentSum; // If it is, return the current sum.
  // Recursive call for left and right children, adding up their sums.
  return sumNumbers(root.left, currentSum) + sumNumbers(root.right, currentSum);
}

/* 
623. Add One Row to Tree

Given the root of a binary tree and two integers val and depth, add a row of nodes with value val at the given depth depth.

Note that the root node is at depth 1.

The adding rule is:

Given the integer depth, for each not null tree node cur at the depth depth - 1, create two tree nodes with value val as cur's left subtree root and right subtree root.
cur's original left subtree should be the left subtree of the new left subtree root.
cur's original right subtree should be the right subtree of the new right subtree root.
If depth == 1 that means there is no depth depth - 1 at all, then create a tree node with value val as the new root of the whole original tree, and the original tree is the new root's left subtree.

Example 1:
Input: root = [4,2,6,3,1,5], val = 1, depth = 2
Output: [4,1,1,2,null,null,6,3,1,5]

Example 2:
Input: root = [4,2,null,3,1], val = 1, depth = 3
Output: [4,2,null,1,1,3,null,null,1]

Constraints:
The number of nodes in the tree is in the range [1, 10^4].
The depth of the tree is in the range [1, 10^4].
-100 <= Node.val <= 100
-10^5 <= val <= 10^5
1 <= depth <= the depth of tree + 1

</> Typescript Code:
*/

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

// Define the function addOneRow with the parameters root, val, and depth
function addOneRow(root: TreeNode | null, val: number, depth: number): TreeNode | null {
  // Handle the special case where the new row is added at the root
  if (depth === 1) {
    const newNode = new TreeNode(val); // Create a new node with the given value
    newNode.left = root; // Set the original tree as the left subtree of the new node
    return newNode; // Return the new node as the new root
  }
  const queue = [root]; // Initialize a queue with the root node for level-order traversal
  let currentDepth = 1; // Start with depth 1 (root level)
  // Traverse the tree until reaching the level just above where the new row is to be added
  while (queue.length && currentDepth < depth - 1) {
    let size = queue.length; // The number of nodes at the current level
    while (size--) {
      // Process all nodes at the current level
      const node = queue.shift(); // Remove the next node from the queue
      if (node && node.left) queue.push(node.left); // Add the left child to the queue if it exists
      if (node && node.right) queue.push(node.right); // Add the right child to the queue if it exists
    }
    currentDepth++; // Move to the next level
  }
  // Add the new row of nodes at the specified depth
  queue.forEach(node => {
    const left = new TreeNode(val, node!.left, null); // Create a new node for the left child
    const right = new TreeNode(val, null, node!.right); // Create a new node for the right child
    node!.left = left; // Insert the new left child
    node!.right = right; // Insert the new right child
  });
  return root; // Return the modified tree
}

/* 
988. Smallest String Starting From Leaf

You are given the root of a binary tree where each node has a value in the range [0, 25] representing the letters 'a' to 'z'.

Return the lexicographically smallest string that starts at a leaf of this tree and ends at the root.

As a reminder, any shorter prefix of a string is lexicographically smaller.

For example, "ab" is lexicographically smaller than "aba".
A leaf of a node is a node that has no children.

Example 1:
Input: root = [0,1,2,3,4,3,4]
Output: "dba"

Example 2:
Input: root = [25,1,3,1,3,0,2]
Output: "adz"

Example 3:
Input: root = [2,2,1,null,1,0,null,0]
Output: "abc"

Constraints:
The number of nodes in the tree is in the range [1, 8500].
0 <= Node.val <= 25

</> Typescript Code:
*/

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function smallestFromLeaf(root: TreeNode | null): string {
  if (!root) return ''; // Handle the case when the tree is empty.
  let smallest = '{'; // Initialize the smallest string with a character that's lexicographically greater than 'z'.

  function dfs(node: TreeNode, path: string): void {
    // Depth-first search to traverse the tree.
    if (!node) return; // Base case: if the node is null, return.
    const currentChar = String.fromCharCode(97 + node.val); // Convert node value to corresponding character.
    if (!node.left && !node.right) {
      // If the node is a leaf, check if the constructed string is the smallest.
      const candidate = currentChar + path;
      if (candidate < smallest) smallest = candidate; // Update the smallest string if a smaller one is found.
    }
    dfs(node.left!, currentChar + path); // Recursively search the left subtree.
    dfs(node.right!, currentChar + path); // Recursively search the right subtree.
  }

  dfs(root, ''); // Start DFS from the root.
  return smallest; // Return the lexicographically smallest string.
}

/* 
200. Number of Islands

Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

Example 1:
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1

Example 2:
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3

Constraints:
m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] is '0' or '1'.

</> Typescript Code:
*/

function numIslands(grid: string[][]): number {
  // Define the Depth-First Search (DFS) function to mark the visited land ('1') as water ('0')
  function dfs(i: number, j: number) {
    // Check for out-of-bounds or if the current cell is water ('0') and return if any condition is true
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === '0') {
      return;
    }
    // Mark the current cell as visited by setting it to '0'
    grid[i][j] = '0';
    // Recursively call dfs for all adjacent cells (up, down, left, right)
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  }

  // Initialize a counter for islands
  let count = 0;
  // Iterate over each cell in the grid
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      // If the cell is land ('1'), perform DFS from that cell
      if (grid[i][j] === '1') {
        dfs(i, j);
        // After returning from DFS, increment the island count
        count++;
      }
    }
  }
  // Return the total number of islands found
  return count;
}

/* 
1992. Find All Groups of Farmland

You are given a 0-indexed m x n binary matrix land where a 0 represents a hectare of forested land and a 1 represents a hectare of farmland.

To keep the land organized, there are designated rectangular areas of hectares that consist entirely of farmland. These rectangular areas are called groups. No two groups are adjacent, meaning farmland in one group is not four-directionally adjacent to another farmland in a different group.

land can be represented by a coordinate system where the top left corner of land is (0, 0) and the bottom right corner of land is (m-1, n-1). Find the coordinates of the top left and bottom right corner of each group of farmland. A group of farmland with a top left corner at (r1, c1) and a bottom right corner at (r2, c2) is represented by the 4-length array [r1, c1, r2, c2].

Return a 2D array containing the 4-length arrays described above for each group of farmland in land. If there are no groups of farmland, return an empty array. You may return the answer in any order.

Example 1:
Input: land = [[1,0,0],[0,1,1],[0,1,1]]
Output: [[0,0,0,0],[1,1,2,2]]
Explanation:
The first group has a top left corner at land[0][0] and a bottom right corner at land[0][0].
The second group has a top left corner at land[1][1] and a bottom right corner at land[2][2].

Example 2:
Input: land = [[1,1],[1,1]]
Output: [[0,0,1,1]]
Explanation:
The first group has a top left corner at land[0][0] and a bottom right corner at land[1][1].

Example 3:
Input: land = [[0]]
Output: []
Explanation:
There are no groups of farmland.

Constraints:
m == land.length
n == land[i].length
1 <= m, n <= 300
land consists of only 0's and 1's.
Groups of farmland are rectangular in shape.

</> Typescript Code:
*/

function findFarmland(land: number[][]): number[][] {
  const groups: number[][] = []; // To store the top left and bottom right corners of each group
  const m = land.length,
    n = land[0].length; // Dimensions of the land matrix
  // Iterate through each hectare of the land
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // Find a hectare of farmland
      if (land[i][j] === 1) {
        let bottomRightI = i,
          bottomRightJ = j; // Initialize the bottom right corner
        // Expand the group downwards as far as possible
        while (bottomRightI + 1 < m && land[bottomRightI + 1][j] === 1) bottomRightI++;
        // Expand the group rightwards as far as possible
        while (bottomRightJ + 1 < n && land[i][bottomRightJ + 1] === 1) bottomRightJ++;
        // Mark all hectares in the current group as visited by setting them to 0
        for (let x = i; x <= bottomRightI; x++)
          for (let y = j; y <= bottomRightJ; y++) land[x][y] = 0;
        // Add the top left and bottom right corners of the current group to the list
        groups.push([i, j, bottomRightI, bottomRightJ]);
      }
    }
  }
  return groups; // Return the list of groups
}

/* 
752. Open the Lock

You have a lock in front of you with 4 circular wheels. Each wheel has 10 slots: '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'. The wheels can rotate freely and wrap around: for example we can turn '9' to be '0', or '0' to be '9'. Each move consists of turning one wheel one slot.

The lock initially starts at '0000', a string representing the state of the 4 wheels.

You are given a list of deadends dead ends, meaning if the lock displays any of these codes, the wheels of the lock will stop turning and you will be unable to open it.

Given a target representing the value of the wheels that will unlock the lock, return the minimum total number of turns required to open the lock, or -1 if it is impossible.

Example 1:
Input: deadends = ["0201","0101","0102","1212","2002"], target = "0202"
Output: 6
Explanation: 
A sequence of valid moves would be "0000" -> "1000" -> "1100" -> "1200" -> "1201" -> "1202" -> "0202".
Note that a sequence like "0000" -> "0001" -> "0002" -> "0102" -> "0202" would be invalid,
because the wheels of the lock become stuck after the display becomes the dead end "0102".

Example 2:
Input: deadends = ["8888"], target = "0009"
Output: 1
Explanation: We can turn the last wheel in reverse to move from "0000" -> "0009".

Example 3:
Input: deadends = ["8887","8889","8878","8898","8788","8988","7888","9888"], target = "8888"
Output: -1
Explanation: We cannot reach the target without getting stuck.

Constraints:
1 <= deadends.length <= 500
deadends[i].length == 4
target.length == 4
target will not be in the list deadends.
target and deadends[i] consist of digits only.

</> Typescript Code:
*/

// Define the function with deadends and target parameters
function openLock(deadends: string[], target: string): number {
  // Convert the list of deadends into a Set for efficient lookups
  const dead = new Set(deadends);
  // Initialize the queue with the starting point ('0000') and the number of turns (0)
  const queue: [string, number][] = [['0000', 0]];
  // Keep track of visited combinations to avoid cycles
  const seen = new Set(['0000']);

  // Process each state in the queue until it's empty
  while (queue.length) {
    // Dequeue the current state and the number of turns taken to reach it
    const [node, turns] = queue.shift()!;
    // Skip this state if it's a deadend
    if (dead.has(node)) continue;
    // Return the number of turns if the current state is the target
    if (node === target) return turns;
    // Try all possible single digit changes to the current combination
    for (let i = 0; i < 4; i++) {
      // Each wheel can be moved forward or backward
      for (let d = -1; d <= 1; d += 2) {
        // Calculate the next digit, wrapping around with modulo 10
        const y = (parseInt(node[i]) + d + 10) % 10;
        // Form the new combination by replacing the i-th digit with the new value
        const next = node.substring(0, i) + y + node.substring(i + 1);
        // If this new combination hasn't been seen yet, add it to the queue and mark as seen
        if (!seen.has(next)) {
          seen.add(next);
          queue.push([next, turns + 1]);
        }
      }
    }
  }
  // Return -1 if the target can't be reached
  return -1;
}

/* 
310. Minimum Height Trees

A tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree.

Given a tree of n nodes labelled from 0 to n - 1, and an array of n - 1 edges where edges[i] = [ai, bi] indicates that there is an undirected edge between the two nodes ai and bi in the tree, you can choose any node of the tree as the root. When you select a node x as the root, the result tree has height h. Among all possible rooted trees, those with minimum height (i.e. min(h))  are called minimum height trees (MHTs).

Return a list of all MHTs' root labels. You can return the answer in any order.

The height of a rooted tree is the number of edges on the longest downward path between the root and a leaf.

Example 1:
Input: n = 4, edges = [[1,0],[1,2],[1,3]]
Output: [1]
Explanation: As shown, the height of the tree is 1 when the root is the node with label 1 which is the only MHT.

Example 2:
Input: n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
Output: [3,4]

Constraints:
1 <= n <= 2 * 104
edges.length == n - 1
0 <= ai, bi < n
ai != bi
All the pairs (ai, bi) are distinct.
The given input is guaranteed to be a tree and there will be no repeated edges.

</> Typescript Code:
*/

function findMinHeightTrees(n: number, edges: number[][]): number[] {
  // Handle cases where the graph is very small
  if (n < 2) return n === 1 ? [0] : [];
  // Initialize adjacency list
  let adj: number[][] = new Array(n).fill(0).map(() => []);
  // Build the adjacency list from edges
  for (let [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }
  // Find all initial leaves
  let leaves: number[] = [];
  for (let i = 0; i < n; ++i) {
    if (adj[i].length === 1) leaves.push(i);
  }
  // Prune leaves until 2 or fewer nodes remain
  while (n > 2) {
    n -= leaves.length;
    let newLeaves: number[] = [];
    for (let i of leaves) {
      let neighbor = adj[i].pop();
      if (neighbor) {
        adj[neighbor] = adj[neighbor].filter(j => j !== i);
        if (adj[neighbor].length === 1) newLeaves.push(neighbor);
      }
    }
    leaves = newLeaves;
  }
  // The remaining nodes are the roots of the MHTs
  return leaves;
}

/* 
2370. Longest Ideal Subsequence

You are given a string s consisting of lowercase letters and an integer k. We call a string t ideal if the following conditions are satisfied:

t is a subsequence of the string s.
The absolute difference in the alphabet order of every two adjacent letters in t is less than or equal to k.
Return the length of the longest ideal string.

A subsequence is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.

Note that the alphabet order is not cyclic. For example, the absolute difference in the alphabet order of 'a' and 'z' is 25, not 1.

Example 1:
Input: s = "acfgbd", k = 2
Output: 4
Explanation: The longest ideal string is "acbd". The length of this string is 4, so 4 is returned.
Note that "acfgbd" is not ideal because 'c' and 'f' have a difference of 3 in alphabet order.

Example 2:
Input: s = "abcd", k = 3
Output: 4
Explanation: The longest ideal string is "abcd". The length of this string is 4, so 4 is returned.

Constraints:
1 <= s.length <= 10^5
0 <= k <= 25
s consists of lowercase English letters.

</> Typescript Code:
*/

// Function to determine the length of the longest ideal subsequence
function longestIdealString(s: string, k: number): number {
  // dp array to store the longest subsequence length ending with each letter of the alphabet
  const dp = new Array(26).fill(0);
  // Iterate through each character in the string
  for (const char of s) {
    // Convert the character to its alphabet position (0 for 'a', 1 for 'b', etc.)
    const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
    // Initialize max to keep track of the maximum length of subsequence before this character
    let max = 0;
    // Check all possible characters within the allowed distance k
    for (let j = Math.max(0, index - k); j <= Math.min(25, index + k); j++) {
      // Update max to the greatest length of subsequence found
      max = Math.max(max, dp[j]);
    }
    // Update the dp value for this character's position to max + 1 (including this char)
    dp[index] = max + 1;
  }
  // Return the maximum value from the dp array, which gives the length of the longest ideal subsequence
  return Math.max(...dp);
}

/* 
2997. Minimum Number of Operations to Make Array XOR Equal to K

You are given a 0-indexed integer array nums and a positive integer k.

You can apply the following operation on the array any number of times:

Choose any element of the array and flip a bit in its binary representation. Flipping a bit means changing a 0 to 1 or vice versa.
Return the minimum number of operations required to make the bitwise XOR of all elements of the final array equal to k.

Note that you can flip leading zero bits in the binary representation of elements. For example, for the number (101)2 you can flip the fourth bit and obtain (1101)2.

Example 1:
Input: nums = [2,1,3,4], k = 1
Output: 2
Explanation: We can do the following operations:
- Choose element 2 which is 3 == (011)2, we flip the first bit and we obtain (010)2 == 2. nums becomes [2,1,2,4].
- Choose element 0 which is 2 == (010)2, we flip the third bit and we obtain (110)2 = 6. nums becomes [6,1,2,4].
The XOR of elements of the final array is (6 XOR 1 XOR 2 XOR 4) == 1 == k.
It can be shown that we cannot make the XOR equal to k in less than 2 operations.

Example 2:
Input: nums = [2,0,2,0], k = 0
Output: 0
Explanation: The XOR of elements of the array is (2 XOR 0 XOR 2 XOR 0) == 0 == k. So no operation is needed.

Constraints:
1 <= nums.length <= 10^5
0 <= nums[i] <= 10^6
0 <= k <= 10^6

</> Typescript Code:
*/

function minOperations(nums: number[], k: number): number {
  // Reduce the array to a single XOR value starting with an initial value of 0,
  // then XOR each element of the array (`c`) with the accumulator (`acc`).
  return (
    nums.reduce((acc, c) => acc ^ c, 0) ^ // Calculate the XOR of all elements in nums.
    k
  ) // XOR the result with k to find the difference needed.
    .toString(2) // Convert the resulting number to a binary string.
    .split('') // Split the binary string into an array of characters.
    .filter(x => x === '1').length; // Filter out all '1's and count them.
  // The count of '1's represents the minimum number of bit flips needed
  // because each '1' in the binary representation indicates a bit that must be flipped.
}

/* 
1915. Number of Wonderful Substrings

A wonderful string is a string where at most one letter appears an odd number of times.

For example, "ccjjc" and "abab" are wonderful, but "ab" is not.
Given a string word that consists of the first ten lowercase English letters ('a' through 'j'), return the number of wonderful non-empty substrings in word. If the same substring appears multiple times in word, then count each occurrence separately.

A substring is a contiguous sequence of characters in a string.

Example 1:
Input: word = "aba"
Output: 4
Explanation: The four wonderful substrings are underlined below:
- "aba" -> "a"
- "aba" -> "b"
- "aba" -> "a"
- "aba" -> "aba"

Example 2:
Input: word = "aabb"
Output: 9
Explanation: The nine wonderful substrings are underlined below:
- "aabb" -> "a"
- "aabb" -> "aa"
- "aabb" -> "aab"
- "aabb" -> "aabb"
- "aabb" -> "a"
- "aabb" -> "abb"
- "aabb" -> "b"
- "aabb" -> "bb"
- "aabb" -> "b"

Example 3:
Input: word = "he"
Output: 2
Explanation: The two wonderful substrings are underlined below:
- "he" -> "h"
- "he" -> "e"

Constraints:
1 <= word.length <= 105
word consists of lowercase English letters from 'a' to 'j'.

</> Typescript Code:
*/

function wonderfulSubstrings(word: string): number {
  let count = 0; // Initialize the count of wonderful substrings
  let freq = new Array(1024).fill(0); // Frequency array to track occurrence of each bitmask
  let mask = 0; // Current bitmask representing the parity of character counts
  freq[0] = 1; // Initialize with the empty substring

  for (let char of word) {
    // Update the bitmask for the current character, flipping the bit corresponding to the character
    mask ^= 1 << (char.charCodeAt(0) - 'a'.charCodeAt(0));
    // Add the number of times this mask has been seen, as it represents a valid wonderful substring ending at current character
    count += freq[mask];
    // Check for substrings that have exactly one character with an odd count
    for (let i = 0; i < 10; i++) {
      // Check masks that differ by exactly one bit (one character with an odd count)
      count += freq[mask ^ (1 << i)];
    }
    // Increment the frequency of this mask
    freq[mask]++;
  }
  return count; // Return the total count of wonderful substrings
}

/* 
165. Compare Version Numbers

Given two version numbers, version1 and version2, compare them.

Version numbers consist of one or more revisions joined by a dot '.'. Each revision consists of digits and may contain leading zeros. Every revision contains at least one character. Revisions are 0-indexed from left to right, with the leftmost revision being revision 0, the next revision being revision 1, and so on. For example 2.5.33 and 0.1 are valid version numbers.

To compare version numbers, compare their revisions in left-to-right order. Revisions are compared using their integer value ignoring any leading zeros. This means that revisions 1 and 001 are considered equal. If a version number does not specify a revision at an index, then treat the revision as 0. For example, version 1.0 is less than version 1.1 because their revision 0s are the same, but their revision 1s are 0 and 1 respectively, and 0 < 1.

Return the following:
If version1 < version2, return -1.
If version1 > version2, return 1.
Otherwise, return 0.

Example 1:
Input: version1 = "1.01", version2 = "1.001"
Output: 0
Explanation: Ignoring leading zeroes, both "01" and "001" represent the same integer "1".

Example 2:
Input: version1 = "1.0", version2 = "1.0.0"
Output: 0
Explanation: version1 does not specify revision 2, which means it is treated as "0".

Example 3:
Input: version1 = "0.1", version2 = "1.1"
Output: -1
Explanation: version1's revision 0 is "0", while version2's revision 0 is "1". 0 < 1, so version1 < version2.

Constraints:
1 <= version1.length, version2.length <= 500
version1 and version2 only contain digits and '.'.
version1 and version2 are valid version numbers.
All the given revisions in version1 and version2 can be stored in a 32-bit integer.

</> Typescript Code:
*/

// Function to compare two version numbers and return -1, 0, or 1
function compareVersion(version1: string, version2: string): number {
  // Split the version strings into arrays of numbers
  const v1 = version1.split('.').map(Number);
  const v2 = version2.split('.').map(Number);
  // Determine the maximum length to iterate over
  const length = Math.max(v1.length, v2.length);

  for (let i = 0; i < length; i++) {
    // Get the current part of each version, defaulting to 0 if it doesn't exist
    const num1 = i < v1.length ? v1[i] : 0;
    const num2 = i < v2.length ? v2[i] : 0;
    // Compare parts and return accordingly
    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }

  // If all parts are equal, return 0
  return 0;
}

/* 
881. Boats to Save People

You are given an array people where people[i] is the weight of the ith person, and an infinite number of boats where each boat can carry a maximum weight of limit. Each boat carries at most two people at the same time, provided the sum of the weight of those people is at most limit.

Return the minimum number of boats to carry every given person.

Example 1:
Input: people = [1,2], limit = 3
Output: 1
Explanation: 1 boat (1, 2)

Example 2:
Input: people = [3,2,2,1], limit = 3
Output: 3
Explanation: 3 boats (1, 2), (2) and (3)

Example 3:
Input: people = [3,5,3,4], limit = 5
Output: 4
Explanation: 4 boats (3), (3), (4), (5)

Constraints:
1 <= people.length <= 5 * 10^4
1 <= people[i] <= limit <= 3 * 10^4

</> Typescript Code:
*/

// Function to determine the minimum number of boats needed to rescue all people
function numRescueBoats(people: number[], limit: number): number {
  // Sort people by weight to maximize the number of two-person boats
  people.sort((a, b) => a - b);
  let i = 0; // Start pointer
  let j = people.length - 1; // End pointer
  let boats = 0; // Boat count

  // Loop through the people array with two pointers
  while (i <= j) {
    // Check if the lightest and heaviest person can share a boat
    if (people[i] + people[j] <= limit) {
      i++; // If they can share a boat, move the lighter person pointer
    }
    j--; // Always move the heavier person pointer
    boats++; // Each iteration represents one boat
  }
  // Return the total number of boats used
  return boats;
}

/* 
237. Delete Node in a Linked List

There is a singly-linked list head and we want to delete a node node in it.

You are given the node to be deleted node. You will not be given access to the first node of head.

All the values of the linked list are unique, and it is guaranteed that the given node node is not the last node in the linked list.

Delete the given node. Note that by deleting the node, we do not mean removing it from memory. We mean:

The value of the given node should not exist in the linked list.
The number of nodes in the linked list should decrease by one.
All the values before node should be in the same order.
All the values after node should be in the same order.

Custom testing:
For the input, you should provide the entire linked list head and the node to be given node. node should not be the last node of the list and should be an actual node in the list.
We will build the linked list and pass the node to your function.
The output will be the entire list after calling your function.

Example 1:
Input: head = [4,5,1,9], node = 5
Output: [4,1,9]
Explanation: You are given the second node with value 5, the linked list should become 4 -> 1 -> 9 after calling your function.

Example 2:
Input: head = [4,5,1,9], node = 1
Output: [4,5,9]
Explanation: You are given the third node with value 1, the linked list should become 4 -> 5 -> 9 after calling your function.

Constraints:
The number of the nodes in the given list is in the range [2, 1000].
-1000 <= Node.val <= 1000
The value of each node in the list is unique.
The node to be deleted is in the list and is not a tail node.

</> Typescript Code:
*/

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

/**
 Do not return anything, modify it in-place instead.
 */

function deleteNode(node: ListNode | null): void {
  // Guard clause for edge cases where node is null or next node is null
  if (node === null || node.next === null) return;
  // Copy the value from the next node to the current node
  node.val = node.next.val;
  // Point the current node's link to the next next node, effectively deleting the next node
  node.next = node.next.next;
}

/* 
2487. Remove Nodes From Linked List

You are given the head of a linked list.

Remove every node which has a node with a greater value anywhere to the right side of it.

Return the head of the modified linked list.

Example 1:
Input: head = [5,2,13,3,8]
Output: [13,8]
Explanation: The nodes that should be removed are 5, 2 and 3.
- Node 13 is to the right of node 5.
- Node 13 is to the right of node 2.
- Node 8 is to the right of node 3.

Example 2:
Input: head = [1,1,1,1]
Output: [1,1,1,1]
Explanation: Every node has value 1, so no nodes are removed.

Constraints:
The number of the nodes in the given list is in the range [1, 10^5].
1 <= Node.val <= 10^5

</> Typescript Code:
*/

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function removeNodes(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head; // If the list is empty or has only one node, return it.

  // Reverse the linked list to start evaluation from the end
  let prev: ListNode | null = null;
  let current: ListNode | null = head;
  while (current) {
    let next = current.next;
    current.next = prev; // Reverse the current node's pointer
    prev = current; // Move prev and current forward
    current = next;
  }

  // Start filtering nodes from the reversed list
  let newHead = prev; // This will be the new head of the reversed list
  let max = prev && prev.val; // Initialize max with the value of the new head
  let node = prev;
  while (node && node.next) {
    if (max && node.next.val >= max) {
      // If the next node should be kept
      max = node.next.val; // Update max
      node = node.next; // Move to the next node
    } else {
      // If the next node should be removed
      node.next = node.next.next; // Remove the next node
    }
  }

  // Reverse the list again to restore original order
  prev = null;
  current = newHead;
  while (current) {
    let next = current.next;
    current.next = prev; // Reverse the current node's pointer
    prev = current; // Move prev and current forward
    current = next;
  }

  return prev; // Return the head of the modified list
}

/* 
2816. Double a Number Represented as a Linked List

You are given the head of a non-empty linked list representing a non-negative integer without leading zeroes.

Return the head of the linked list after doubling it.

Example 1:
Input: head = [1,8,9]
Output: [3,7,8]
Explanation: The figure above corresponds to the given linked list which represents the number 189. Hence, the returned linked list represents the number 189 * 2 = 378.

Example 2:
Input: head = [9,9,9]
Output: [1,9,9,8]
Explanation: The figure above corresponds to the given linked list which represents the number 999. Hence, the returned linked list reprersents the number 999 * 2 = 1998. 

Constraints:
The number of nodes in the list is in the range [1, 10^4]
0 <= Node.val <= 9
The input is generated such that the list represents a number that does not have leading zeros, except the number 0 itself.

</> Typescript Code:
*/

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function doubleIt(head: ListNode | null): ListNode | null {
  // Return null if the linked list is empty
  if (!head) return null;

  // Initialize an empty string to accumulate the digits of the number
  let num = '';
  let curr: ListNode | null = head;

  // Traverse the linked list and build the number as a string
  while (curr) {
    num += curr.val;
    curr = curr.next;
  }

  // Convert the string to a bigint, double it, and convert back to string
  let doubled = BigInt(num) * BigInt(2);

  // Create a dummy node to simplify the list construction
  let result = new ListNode(0);
  let node = result;

  // Create new nodes for each digit of the doubled number and append to the list
  for (let char of doubled.toString()) {
    node.next = new ListNode(Number(char));
    node = node.next;
  }

  // Return the head of the new list, skipping the dummy node
  return result.next;
}

/* 
3075. Maximize Happiness of Selected Children

You are given an array happiness of length n, and a positive integer k.

There are n children standing in a queue, where the ith child has happiness value happiness[i]. You want to select k children from these n children in k turns.

In each turn, when you select a child, the happiness value of all the children that have not been selected till now decreases by 1. Note that the happiness value cannot become negative and gets decremented only if it is positive.

Return the maximum sum of the happiness values of the selected children you can achieve by selecting k children.

Example 1:
Input: happiness = [1,2,3], k = 2
Output: 4
Explanation: We can pick 2 children in the following way:
- Pick the child with the happiness value == 3. The happiness value of the remaining children becomes [0,1].
- Pick the child with the happiness value == 1. The happiness value of the remaining child becomes [0]. Note that the happiness value cannot become less than 0.
The sum of the happiness values of the selected children is 3 + 1 = 4.

Example 2:
Input: happiness = [1,1,1,1], k = 2
Output: 1
Explanation: We can pick 2 children in the following way:
- Pick any child with the happiness value == 1. The happiness value of the remaining children becomes [0,0,0].
- Pick the child with the happiness value == 0. The happiness value of the remaining child becomes [0,0].
The sum of the happiness values of the selected children is 1 + 0 = 1.

Example 3:
Input: happiness = [2,3,4,5], k = 1
Output: 5
Explanation: We can pick 1 child in the following way:
- Pick the child with the happiness value == 5. The happiness value of the remaining children becomes [1,2,3].
The sum of the happiness values of the selected children is 5.

Constraints:
1 <= n == happiness.length <= 2 * 10^5
1 <= happiness[i] <= 10^8
1 <= k <= n

</> Typescript Code:
*/

function maximumHappinessSum(happiness: number[], k: number): number {
  // Sort the happiness values in descending order
  happiness.sort((a, b) => b - a);

  let total = 0; // To store the total maximum happiness
  let cumulativeLoss = 0; // To track the total decrement each child faces per turn

  // Iterate over the first k elements since we're selecting k children
  for (let i = 0; i < k; i++) {
    // Add the maximum of zero or the adjusted happiness to the total
    // This ensures we do not add negative values to total happiness
    total += Math.max(0, happiness[i] - cumulativeLoss);

    // Increment the cumulative loss after each selection
    cumulativeLoss++;
  }

  return total; // Return the calculated total happiness
}

/* 
786. K-th Smallest Prime Fraction

You are given a sorted integer array arr containing 1 and prime numbers, where all the integers of arr are unique. You are also given an integer k.

For every i and j where 0 <= i < j < arr.length, we consider the fraction arr[i] / arr[j].

Return the kth smallest fraction considered. Return your answer as an array of integers of size 2, where answer[0] == arr[i] and answer[1] == arr[j].

Example 1:
Input: arr = [1,2,3,5], k = 3
Output: [2,5]
Explanation: The fractions to be considered in sorted order are:
1/5, 1/3, 2/5, 1/2, 3/5, and 2/3.
The third fraction is 2/5.

Example 2:
Input: arr = [1,7], k = 1
Output: [1,7]

Constraints:
2 <= arr.length <= 1000
1 <= arr[i] <= 3 * 10^4
arr[0] == 1
arr[i] is a prime number for i > 0.
All the numbers of arr are unique and sorted in strictly increasing order.
1 <= k <= arr.length * (arr.length - 1) / 2

Follow up: Can you solve the problem with better than O(n2) complexity?

</> Typescript Code:
*/

/* 
  npm install @datastructures-js/priority-queue 
  import { MinPriorityQueue } from '@datastructures-js/priority-queue';
*/

function kthSmallestPrimeFraction(arr: number[], k: number): number[] {
  // Priority queue to store the fractions, sorting by the value of the fraction
  const minHeap = new MinPriorityQueue({
    priority: (entry: [number, number]) => arr[entry[0]] / arr[entry[1]],
  });

  // Initialize the heap with the smallest possible fractions, i.e., arr[0] / arr[j] for all j
  for (let j = 1; j < arr.length; j++) {
    minHeap.enqueue([0, j]);
  }

  // Extract the smallest fraction k-1 times to get to the k-th smallest
  for (let i = 1; i < k; i++) {
    const [num, den] = minHeap.dequeue().element;
    // Enqueue the next fraction in the row, ensuring not to go out of the bounds
    if (num + 1 < den) {
      minHeap.enqueue([num + 1, den]);
    }
  }

  // The k-th smallest fraction
  const [num, den] = minHeap.dequeue().element;
  return [arr[num], arr[den]];
}

/* 
861. Score After Flipping Matrix

You are given an m x n binary matrix grid.

A move consists of choosing any row or column and toggling each value in that row or column (i.e., changing all 0's to 1's, and all 1's to 0's).

Every row of the matrix is interpreted as a binary number, and the score of the matrix is the sum of these numbers.

Return the highest possible score after making any number of moves (including zero moves).

Example 1:
Input: grid = [[0,0,1,1],[1,0,1,0],[1,1,0,0]]
Output: 39
Explanation: 0b1111 + 0b1001 + 0b1111 = 15 + 9 + 15 = 39

Example 2:
Input: grid = [[0]]
Output: 1

Constraints:
m == grid.length
n == grid[i].length
1 <= m, n <= 20
grid[i][j] is either 0 or 1.

</> Typescript Code:
*/

function matrixScore(grid: number[][]): number {
  const m = grid.length; // Number of rows
  const n = grid[0].length; // Number of columns
  // Initial score assuming all rows start with 1, which is the highest value for the first column
  let score = m * (1 << (n - 1));

  // Iterate over each column starting from the second
  for (let j = 1; j < n; j++) {
    let colCount = 0; // To count the number of 1s in the column
    // Calculate the number of 1s in the current column considering the first column toggle
    for (let i = 0; i < m; i++) {
      // Add to colCount if the current cell is the same as the first cell in the row
      colCount += grid[i][0] === grid[i][j] ? 1 : 0;
    }
    // Maximize the number of 1s; compare direct count and inverted count
    score += Math.max(colCount, m - colCount) * (1 << (n - 1 - j));
  }
  return score; // Return the calculated maximum score
}

/* 
1219. Path with Maximum Gold

In a gold mine grid of size m x n, each cell in this mine has an integer representing the amount of gold in that cell, 0 if it is empty.

Return the maximum amount of gold you can collect under the conditions:

Every time you are located in a cell you will collect all the gold in that cell.
From your position, you can walk one step to the left, right, up, or down.
You can't visit the same cell more than once.
Never visit a cell with 0 gold.
You can start and stop collecting gold from any position in the grid that has some gold.

Example 1:
Input: grid = [[0,6,0],[5,8,7],[0,9,0]]
Output: 24
Explanation:
[[0,6,0],
 [5,8,7],
 [0,9,0]]
Path to get the maximum gold, 9 -> 8 -> 7.

Example 2:
Input: grid = [[1,0,7],[2,0,6],[3,4,5],[0,3,0],[9,0,20]]
Output: 28
Explanation:
[[1,0,7],
 [2,0,6],
 [3,4,5],
 [0,3,0],
 [9,0,20]]
Path to get the maximum gold, 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7.

Constraints:
m == grid.length
n == grid[i].length
1 <= m, n <= 15
0 <= grid[i][j] <= 100
There are at most 25 cells containing gold.

</> Typescript Code:
*/

function getMaximumGold(grid: number[][]): number {
  const m = grid.length,
    n = grid[0].length; // Get dimensions of the grid
  let maxGold = 0; // Initialize variable to track the maximum gold collected

  // Depth-first search function to explore all paths from a given cell
  function dfs(x: number, y: number, currentGold: number): number {
    // Base case: return current gold if out of bounds or cell has no gold
    if (x < 0 || x >= m || y < 0 || y >= n || grid[x][y] === 0) return currentGold;

    const gold = grid[x][y]; // Collect gold from the current cell
    grid[x][y] = 0; // Mark this cell as visited by setting it to 0

    // Initialize maxPathGold with the current collected gold
    let maxPathGold = currentGold;

    // Explore all four directions (down, up, right, left)
    maxPathGold = Math.max(maxPathGold, dfs(x + 1, y, currentGold + gold));
    maxPathGold = Math.max(maxPathGold, dfs(x - 1, y, currentGold + gold));
    maxPathGold = Math.max(maxPathGold, dfs(x, y + 1, currentGold + gold));
    maxPathGold = Math.max(maxPathGold, dfs(x, y - 1, currentGold + gold));

    grid[x][y] = gold; // Unmark this cell (backtrack) for other paths
    return maxPathGold; // Return the maximum gold collected from this path
  }

  // Iterate through each cell in the grid
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] > 0) {
        // If the cell contains gold, start DFS from this cell
        maxGold = Math.max(maxGold, dfs(i, j, 0)); // Update maxGold with the maximum collected gold
      }
    }
  }

  return maxGold; // Return the overall maximum gold collected
}

/* 
2812. Find the Safest Path in a Grid

You are given a 0-indexed 2D matrix grid of size n x n, where (r, c) represents:

A cell containing a thief if grid[r][c] = 1
An empty cell if grid[r][c] = 0
You are initially positioned at cell (0, 0). In one move, you can move to any adjacent cell in the grid, including cells containing thieves.

The safeness factor of a path on the grid is defined as the minimum manhattan distance from any cell in the path to any thief in the grid.

Return the maximum safeness factor of all paths leading to cell (n - 1, n - 1).

An adjacent cell of cell (r, c), is one of the cells (r, c + 1), (r, c - 1), (r + 1, c) and (r - 1, c) if it exists.

The Manhattan distance between two cells (a, b) and (x, y) is equal to |a - x| + |b - y|, where |val| denotes the absolute value of val.

Example 1:
Input: grid = [[1,0,0],[0,0,0],[0,0,1]]
Output: 0
Explanation: All paths from (0, 0) to (n - 1, n - 1) go through the thieves in cells (0, 0) and (n - 1, n - 1).

Example 2:
Input: grid = [[0,0,1],[0,0,0],[0,0,0]]
Output: 2
Explanation: The path depicted in the picture above has a safeness factor of 2 since:
- The closest cell of the path to the thief at cell (0, 2) is cell (0, 0). The distance between them is | 0 - 0 | + | 0 - 2 | = 2.
It can be shown that there are no other paths with a higher safeness factor.

Example 3:
Input: grid = [[0,0,0,1],[0,0,0,0],[0,0,0,0],[1,0,0,0]]
Output: 2
Explanation: The path depicted in the picture above has a safeness factor of 2 since:
- The closest cell of the path to the thief at cell (0, 3) is cell (1, 2). The distance between them is | 0 - 1 | + | 3 - 2 | = 2.
- The closest cell of the path to the thief at cell (3, 0) is cell (3, 2). The distance between them is | 3 - 3 | + | 0 - 2 | = 2.
It can be shown that there are no other paths with a higher safeness factor.

Constraints:
1 <= grid.length == n <= 400
grid[i].length == n
grid[i][j] is either 0 or 1.
There is at least one thief in the grid.

</> Typescript Code:
*/

function maximumSafenessFactor(grid: number[][]): number {
  const n = grid.length;
  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  const queue: number[][] = [];
  const dist = Array.from({length: n}, () => Array(n).fill(Infinity));

  // Initialize BFS from all thief positions
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) {
        queue.push([r, c]);
        dist[r][c] = 0; // Distance from thief to itself is zero
      }
    }
  }

  // Perform BFS to calculate minimum distance to nearest thief for each cell
  while (queue.length) {
    const [x, y] = queue.shift() || [];
    for (const [dx, dy] of directions) {
      const nx = x + dx,
        ny = y + dy;
      if (nx >= 0 && nx < n && ny >= 0 && ny < n && dist[nx][ny] === Infinity) {
        dist[nx][ny] = dist[x][y] + 1;
        queue.push([nx, ny]);
      }
    }
  }

  // Using a similar BFS, compute the maximum safeness factor of the path from (0, 0) to (n-1, n-1)
  const pathDist = Array.from({length: n}, () => Array(n).fill(-1));
  pathDist[0][0] = dist[0][0]; // Starting point safeness
  const pq = [[0, 0]];
  while (pq.length) {
    const [x, y] = pq.shift() || [];
    for (const [dx, dy] of directions) {
      const nx = x + dx,
        ny = y + dy;
      if (nx >= 0 && nx < n && ny >= 0 && ny < n) {
        const safeDist = Math.min(pathDist[x][y], dist[nx][ny]);
        if (safeDist > pathDist[nx][ny]) {
          pathDist[nx][ny] = safeDist;
          pq.push([nx, ny]);
        }
      }
    }
  }

  return pathDist[n - 1][n - 1]; // Return the safeness of the last cell
}

/* 
1325. Delete Leaves With a Given Value

Given a binary tree root and an integer target, delete all the leaf nodes with value target.

Note that once you delete a leaf node with value target, if its parent node becomes a leaf node and has the value target, it should also be deleted (you need to continue doing that until you cannot).

Example 1:
Input: root = [1,2,3,2,null,2,4], target = 2
Output: [1,null,3,null,4]
Explanation: Leaf nodes in green with value (target = 2) are removed (Picture in left). 
After removing, new nodes become leaf nodes with value (target = 2) (Picture in center).

Example 2:
Input: root = [1,3,3,3,2], target = 3
Output: [1,3,null,null,2]

Example 3:
Input: root = [1,2,null,2,null,2], target = 2
Output: [1]
Explanation: Leaf nodes in green with value (target = 2) are removed at each step.

Constraints:
The number of nodes in the tree is in the range [1, 3000].
1 <= Node.val, target <= 1000

</> Typescript Code:
*/

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function removeLeafNodes(root: TreeNode | null, target: number): TreeNode | null {
  // Base case: if the root is null, return null
  if (root === null) return null;
  // Recursively remove target leaf nodes from the left subtree
  root.left = removeLeafNodes(root.left, target);
  // Recursively remove target leaf nodes from the right subtree
  root.right = removeLeafNodes(root.right, target);
  // If the current node becomes a leaf and its value equals the target, delete it
  if (root.left === null && root.right === null && root.val === target) {
    return null;
  }
  // Return the modified root
  return root;
}

/* 
979. Distribute Coins in Binary Tree

You are given the root of a binary tree with n nodes where each node in the tree has node.val coins. There are n coins in total throughout the whole tree.

In one move, we may choose two adjacent nodes and move one coin from one node to another. A move may be from parent to child, or from child to parent.

Return the minimum number of moves required to make every node have exactly one coin.

Example 1:
Input: root = [3,0,0]
Output: 2
Explanation: From the root of the tree, we move one coin to its left child, and one coin to its right child.

Example 2:
Input: root = [0,3,0]
Output: 3
Explanation: From the left child of the root, we move two coins to the root [taking two moves]. Then, we move one coin from the root of the tree to the right child.

Constraints:
The number of nodes in the tree is n.
1 <= n <= 100
0 <= Node.val <= n
The sum of all Node.val is n.

</> Typescript Code:
*/

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function distributeCoins(root: TreeNode | null): number {
  // Initialize the number of moves to 0
  let moves = 0;

  // Helper function to perform post-order traversal
  function postOrder(node: TreeNode | null): number {
    // Base case: if the node is null, return 0
    if (node === null) return 0;

    // Recursively compute the balance of coins in the left subtree
    const left = postOrder(node.left);
    // Recursively compute the balance of coins in the right subtree
    const right = postOrder(node.right);

    // The number of moves needed is the sum of absolute balances of left and right subtrees
    moves += Math.abs(left) + Math.abs(right);

    // Return the net balance of coins: current node's coins + left subtree balance + right subtree balance - 1 (for the node itself)
    return node.val + left + right - 1;
  }

  // Start the post-order traversal from the root
  postOrder(root);

  // Return the total number of moves
  return moves;
}

/* 
78. Subsets

Given an integer array nums of unique elements, return all possible 
subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

Example 1:
Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

Example 2:
Input: nums = [0]
Output: [[],[0]]

Constraints:
1 <= nums.length <= 10
-10 <= nums[i] <= 10
All the numbers of nums are unique.

</> Typescript Code:
*/

function subsets(nums: number[]): number[][] {
  // Initialize the result array to store all subsets
  const result: number[][] = [];

  // Helper function for Depth-First Search (DFS)
  function dfs(index: number, current: number[]): void {
    // Base case: if index equals the length of nums, add the current subset to the result
    if (index === nums.length) {
      result.push([...current]);
      return;
    }

    // Recur without including the current element
    dfs(index + 1, current);

    // Include the current element in the subset
    current.push(nums[index]);

    // Recur with including the current element
    dfs(index + 1, current);

    // Backtrack to remove the current element
    current.pop();
  }

  // Initialize the DFS with starting index 0 and empty current subset
  dfs(0, []);

  // Return the result containing all subsets
  return result;
}

/* 
131. Palindrome Partitioning

Given a string s, partition s such that every substring of the partition is a palindrome. 
Return all possible palindrome partitioning of s.

Example 1:
Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]

Example 2:
Input: s = "a"
Output: [["a"]]

Constraints:
1 <= s.length <= 16
s contains only lowercase English letters.

</> Typescript Code:
*/

function partition(s: string): string[][] {
  // Initialize the result array to store all possible palindrome partitions
  const result: string[][] = [];

  // Helper function to check if a substring is a palindrome
  function isPalindrome(sub: string): boolean {
    let left = 0;
    let right = sub.length - 1;
    // Check characters from both ends towards the center
    while (left < right) {
      if (sub[left] !== sub[right]) return false;
      left++;
      right--;
    }
    return true;
  }

  // Helper function for Depth-First Search (DFS)
  function dfs(start: number, current: string[]): void {
    // Base case: if the starting index reaches the end of the string, add the current partition to the result
    if (start === s.length) {
      result.push([...current]);
      return;
    }

    // Iterate over possible end indices to create substrings
    for (let end = start + 1; end <= s.length; end++) {
      const substring = s.slice(start, end);
      // If the substring is a palindrome, add it to the current partition
      if (isPalindrome(substring)) {
        current.push(substring);
        // Recur with the next starting index
        dfs(end, current);
        // Backtrack to remove the last added substring
        current.pop();
      }
    }
  }

  // Initialize DFS with starting index 0 and empty current partition
  dfs(0, []);

  // Return the result containing all possible palindrome partitions
  return result;
}

/* 
2597. The Number of Beautiful Subsets

You are given an array nums of positive integers and a positive integer k.

A subset of nums is beautiful if it does not contain two integers with an absolute difference equal to k.

Return the number of non-empty beautiful subsets of the array nums.

A subset of nums is an array that can be obtained by deleting some (possibly none) elements from nums. Two subsets are different if and only if the chosen indices to delete are different.

Example 1:
Input: nums = [2,4,6], k = 2
Output: 4
Explanation: The beautiful subsets of the array nums are: [2], [4], [6], [2, 6].
It can be proved that there are only 4 beautiful subsets in the array [2,4,6].

Example 2:
Input: nums = [1], k = 1
Output: 1
Explanation: The beautiful subset of the array nums is [1].
It can be proved that there is only 1 beautiful subset in the array [1].

Constraints:
1 <= nums.length <= 20
1 <= nums[i], k <= 1000

</> Typescript Code:
*/

function beautifulSubsets(nums: number[], k: number): number {
  // Initialize the count of beautiful subsets
  let count = 0;

  // Array to hold the current subset
  const subset: number[] = [];

  // Helper function for Depth-First Search (DFS)
  function dfs(index: number) {
    // If we have considered all elements
    if (index === nums.length) {
      // If the subset is non-empty, increment the count
      if (subset.length > 0) count++;
      return;
    }

    // Recursive call without including the current element
    dfs(index + 1);

    // Check if adding the current element maintains the beautiful subset property
    if (subset.every(num => Math.abs(num - nums[index]) !== k)) {
      // Include the current element in the subset
      subset.push(nums[index]);
      // Recursive call including the current element
      dfs(index + 1);
      // Backtrack to remove the last added element
      subset.pop();
    }
  }

  // Start DFS with the first element
  dfs(0);

  // Return the total count of beautiful subsets
  return count;
}

/* 
1208. Get Equal Substrings Within Budget

You are given two strings s and t of the same length and an integer maxCost.

You want to change s to t. Changing the ith character of s to ith character of t costs |s[i] - t[i]| (i.e., the absolute difference between the ASCII values of the characters).

Return the maximum length of a substring of s that can be changed to be the same as the corresponding substring of t with a cost less than or equal to maxCost. If there is no substring from s that can be changed to its corresponding substring from t, return 0.

Example 1:
Input: s = "abcd", t = "bcdf", maxCost = 3
Output: 3
Explanation: "abc" of s can change to "bcd".
That costs 3, so the maximum length is 3.

Example 2:
Input: s = "abcd", t = "cdef", maxCost = 3
Output: 1
Explanation: Each character in s costs 2 to change to character in t,  so the maximum length is 1.

Example 3:
Input: s = "abcd", t = "acde", maxCost = 0
Output: 1
Explanation: You cannot make any change, so the maximum length is 1.

Constraints:
1 <= s.length <= 10^5
t.length == s.length
0 <= maxCost <= 10^6
s and t consist of only lowercase English letters.

</> Typescript Code:
*/

function equalSubstring(s: string, t: string, maxCost: number): number {
  // Initialize variables for the maximum length of the substring, current cost, and the starting index of the sliding window
  let maxLength = 0,
    currentCost = 0,
    start = 0;

  // Iterate over each character in the string 's' using the ending index of the sliding window
  for (let end = 0; end < s.length; end++) {
    // Calculate the cost of changing the current character in 's' to the corresponding character in 't'
    currentCost += Math.abs(s.charCodeAt(end) - t.charCodeAt(end));

    // If the current cost exceeds the allowed maximum cost, move the start index to the right to reduce the cost
    while (currentCost > maxCost) {
      currentCost -= Math.abs(s.charCodeAt(start) - t.charCodeAt(start));
      start++;
    }

    // Update the maximum length of the substring that can be changed within the allowed cost
    maxLength = Math.max(maxLength, end - start + 1);
  }

  // Return the maximum length of the valid substring
  return maxLength;
}

/* 
1404. Number of Steps to Reduce a Number in Binary Representation to One

Given the binary representation of an integer as a string s, return the number of steps to reduce it to 1 under the following rules:

If the current number is even, you have to divide it by 2.

If the current number is odd, you have to add 1 to it.

It is guaranteed that you can always reach one for all test cases.

Example 1:
Input: s = "1101"
Output: 6
Explanation: "1101" corressponds to number 13 in their decimal representation.
Step 1) 13 is odd, add 1 and obtain 14. 
Step 2) 14 is even, divide by 2 and obtain 7.
Step 3) 7 is odd, add 1 and obtain 8.
Step 4) 8 is even, divide by 2 and obtain 4.  
Step 5) 4 is even, divide by 2 and obtain 2. 
Step 6) 2 is even, divide by 2 and obtain 1.  

Example 2:
Input: s = "10"
Output: 1
Explanation: "10" corressponds to number 2 in their decimal representation.
Step 1) 2 is even, divide by 2 and obtain 1.  

Example 3:
Input: s = "1"
Output: 0

Constraints:
1 <= s.length <= 500
s consists of characters '0' or '1'
s[0] == '1'

</> Typescript Code:
*/

function numSteps(s: string): number {
  // Initialize the number of steps to 0
  let steps = 0;
  // Initialize carry to handle binary addition when encountering '1'
  let carry = 0;

  // Iterate from the end of the string towards the beginning
  for (let i = s.length - 1; i > 0; i--) {
    // Check if the current bit plus the carry is equal to 1 (odd)
    if (parseInt(s[i]) + carry === 1) {
      // If odd, we need to add 1 (which makes it even) and then divide by 2
      carry = 1; // Set carry to 1 for the next iteration
      steps += 2; // Two operations: add 1 and divide by 2
    } else {
      // If even, we just need to divide by 2
      steps += 1; // One operation: divide by 2
    }
  }

  // If there is a carry left, add one more step
  return steps + carry;
}

/* 
1442. Count Triplets That Can Form Two Arrays of Equal XOR

Given an array of integers arr.

We want to select three indices i, j and k where (0 <= i < j <= k < arr.length).

Let's define a and b as follows:

a = arr[i] ^ arr[i + 1] ^ ... ^ arr[j - 1]
b = arr[j] ^ arr[j + 1] ^ ... ^ arr[k]
Note that ^ denotes the bitwise-xor operation.

Return the number of triplets (i, j and k) Where a == b.

Example 1:
Input: arr = [2,3,1,6,7]
Output: 4
Explanation: The triplets are (0,1,2), (0,2,2), (2,3,4) and (2,4,4)

Example 2:
Input: arr = [1,1,1,1,1]
Output: 10

Constraints:
1 <= arr.length <= 300
1 <= arr[i] <= 10^8

</> Typescript Code:
*/

function countTriplets(arr: number[]): number {
  // Initialize the count of triplets
  let count = 0;
  const n = arr.length;

  // Iterate over each possible starting index i
  for (let i = 0; i < n; i++) {
    // Initialize xor to 0 for the subarray starting at i
    let xor = 0;

    // Iterate over each possible ending index j
    for (let j = i; j < n; j++) {
      // Calculate the xor from index i to j
      xor ^= arr[j];

      // If xor is 0 and j is greater than i, then we found a valid triplet
      if (xor === 0 && j > i) {
        // Number of valid triplets is (j - i) since we can choose any k between i and j
        count += j - i;
      }
    }
  }

  // Return the total count of triplets
  return count;
}

/* 
260. Single Number III

Given an integer array nums, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once. You can return the answer in any order.

You must write an algorithm that runs in linear runtime complexity and uses only constant extra space.

Example 1:
Input: nums = [1,2,1,3,2,5]
Output: [3,5]
Explanation:  [5, 3] is also a valid answer.

Example 2:
Input: nums = [-1,0]
Output: [-1,0]

Example 3:
Input: nums = [0,1]
Output: [1,0]

Constraints:
2 <= nums.length <= 3 * 10^4
-231 <= nums[i] <= 231 - 1
Each integer in nums will appear twice, only two integers will appear once.

</> Typescript Code:
*/

function singleNumber(nums: number[]): number[] {
  // Initialize xor to 0 to compute the XOR of all numbers
  let xor = 0;

  // Compute the XOR of all numbers in the array
  for (const num of nums) {
    xor ^= num;
  }

  // Get the rightmost set bit in the xor result (diff)
  const diff = xor & -xor;
  // Initialize two variables to hold the two unique numbers
  let x = 0,
    y = 0;

  // Separate the numbers into two groups and compute the XOR for each group
  for (const num of nums) {
    // Group based on the rightmost set bit
    if ((num & diff) === 0) {
      x ^= num; // XOR for the group where the bit is not set
    } else {
      y ^= num; // XOR for the group where the bit is set
    }
  }

  // Return the two unique numbers
  return [x, y];
}

/* 
2486. Append Characters to String to Make Subsequence

You are given two strings s and t consisting of only lowercase English letters.

Return the minimum number of characters that need to be appended to the end of s so that t becomes a subsequence of s.

A subsequence is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.

Example 1:
Input: s = "coaching", t = "coding"
Output: 4
Explanation: Append the characters "ding" to the end of s so that s = "coachingding".
Now, t is a subsequence of s ("coachingding").
It can be shown that appending any 3 characters to the end of s will never make t a subsequence.

Example 2:
Input: s = "abcde", t = "a"
Output: 0
Explanation: t is already a subsequence of s ("abcde").

Example 3:
Input: s = "z", t = "abcde"
Output: 5
Explanation: Append the characters "abcde" to the end of s so that s = "zabcde".
Now, t is a subsequence of s ("zabcde").
It can be shown that appending any 4 characters to the end of s will never make t a subsequence.

Constraints:
1 <= s.length, t.length <= 10^5
s and t consist only of lowercase English letters.


</> Typescript Code:
*/

function appendCharacters(s: string, t: string): number {
  // Initialize a pointer for the string t
  let i = 0;

  // Iterate over each character in the string s
  for (const char of s) {
    // If the current character in s matches the current character in t, move the pointer in t
    if (i < t.length && char === t[i]) {
      i++;
    }
  }

  // The number of characters needed to be appended to s is the remaining length of t
  return t.length - i;
}

/* 
846. Hand of Straights

Alice has some number of cards and she wants to rearrange the cards into groups so that each group is of size groupSize, and consists of groupSize consecutive cards.
Given an integer array hand where hand[i] is the value written on the ith card and an integer groupSize, return true if she can rearrange the cards, or false otherwise.

Example 1:
Input: hand = [1,2,3,6,2,3,4,7,8], groupSize = 3
Output: true
Explanation: Alice's hand can be rearranged as [1,2,3],[2,3,4],[6,7,8]

Example 2:
Input: hand = [1,2,3,4,5], groupSize = 4
Output: false
Explanation: Alice's hand can not be rearranged into groups of 4.

Constraints:
1 <= hand.length <= 10^4
0 <= hand[i] <= 10^9
1 <= groupSize <= hand.length

</> Typescript Code:
*/

function isNStraightHand(hand: number[], groupSize: number): boolean {
  // Check if the hand can be evenly divided into groups of groupSize
  if (hand.length % groupSize !== 0) return false;

  // Create a map to count the occurrences of each card
  const countMap = new Map<number, number>();
  for (const card of hand) {
    countMap.set(card, (countMap.get(card) || 0) + 1);
  }

  // Sort the hand to facilitate grouping of consecutive cards
  const sortedHand = hand.slice().sort((a, b) => a - b);
  for (const card of sortedHand) {
    // If the current card is still available in the map
    if (countMap.get(card)! > 0) {
      // Attempt to create a group of consecutive cards starting from the current card
      for (let i = 0; i < groupSize; i++) {
        const currentCard = card + i;
        // Check if the current card is available and has enough count
        if (countMap.get(currentCard) === undefined || countMap.get(currentCard)! <= 0) {
          return false; // Return false if we can't form a valid group
        }
        // Decrease the count of the current card in the map
        countMap.set(currentCard, countMap.get(currentCard)! - 1);
      }
    }
  }

  // Return true if all cards can be grouped as required
  return true;
}

/* 
648. Replace Words

In English, we have a concept called root, which can be followed by some other word to form another longer word - let's call this word derivative. For example, when the root "help" is followed by the word "ful", we can form a derivative "helpful".

Given a dictionary consisting of many roots and a sentence consisting of words separated by spaces, replace all the derivatives in the sentence with the root forming it. If a derivative can be replaced by more than one root, replace it with the root that has the shortest length.

Return the sentence after the replacement.

Example 1:
Input: dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"
Output: "the cat was rat by the bat"

Example 2:
Input: dictionary = ["a","b","c"], sentence = "aadsfasf absbs bbab cadsfafs"
Output: "a a b c"

Constraints:
1 <= dictionary.length <= 1000
1 <= dictionary[i].length <= 100
dictionary[i] consists of only lower-case letters.
1 <= sentence.length <= 106
sentence consists of only lower-case letters and spaces.
The number of words in sentence is in the range [1, 1000]
The length of each word in sentence is in the range [1, 1000]
Every two consecutive words in sentence will be separated by exactly one space.
sentence does not have leading or trailing spaces.

</> Typescript Code:
*/

function replaceWords(dictionary: string[], sentence: string): string {
  // Convert the dictionary array to a set for fast lookup
  const rootSet = new Set(dictionary);
  // Split the sentence into individual words
  const words = sentence.split(' ');

  // Iterate over each word in the sentence
  for (let i = 0; i < words.length; i++) {
    // Check each possible prefix of the word
    for (let j = 1; j <= words[i].length; j++) {
      // Get the current prefix
      const prefix = words[i].substring(0, j);
      // If the prefix is in the root set, replace the word with the prefix
      if (rootSet.has(prefix)) {
        words[i] = prefix;
        break; // Exit the loop once the word is replaced
      }
    }
  }

  // Join the words back into a sentence and return it
  return words.join(' ');
}

/* 
523. Continuous Subarray Sum

Given an integer array nums and an integer k, return true if nums has a good subarray or false otherwise.

A good subarray is a subarray where:

its length is at least two, and
the sum of the elements of the subarray is a multiple of k.

Note that:
A subarray is a contiguous part of the array.
An integer x is a multiple of k if there exists an integer n such that x = n * k. 0 is always a multiple of k.

Example 1:
Input: nums = [23,2,4,6,7], k = 6
Output: true
Explanation: [2, 4] is a continuous subarray of size 2 whose elements sum up to 6.

Example 2:
Input: nums = [23,2,6,4,7], k = 6
Output: true
Explanation: [23, 2, 6, 4, 7] is an continuous subarray of size 5 whose elements sum up to 42.
42 is a multiple of 6 because 42 = 7 * 6 and 7 is an integer.

Example 3:
Input: nums = [23,2,6,4,7], k = 13
Output: false

Constraints:
1 <= nums.length <= 10^5
0 <= nums[i] <= 10^9
0 <= sum(nums[i]) <= 2^31 - 1
1 <= k <= 2^31 - 1

</> Typescript Code:
*/

function checkSubarraySum(nums: number[], k: number): boolean {
  // Create a map to store the remainder when sum is divided by k and its index
  const sumMap = new Map<number, number>();
  // Initialize with the remainder 0 at index -1 to handle the case when the subarray starts from index 0
  sumMap.set(0, -1);
  // Initialize the running sum
  let sum = 0;

  // Iterate through the array
  for (let i = 0; i < nums.length; i++) {
    // Update the running sum
    sum += nums[i];
    // Calculate the remainder of the running sum when divided by k
    const mod = sum % k;

    // Check if the remainder has been seen before
    if (sumMap.has(mod)) {
      // If the subarray length is at least 2, return true
      if (i - sumMap.get(mod)! > 1) {
        return true;
      }
    } else {
      // Store the index of the first occurrence of this remainder
      sumMap.set(mod, i);
    }
  }

  // If no such subarray is found, return false
  return false;
}

/* 
974. Subarray Sums Divisible by K

Given an integer array nums and an integer k, return the number of non-empty subarrays that have a sum divisible by k.

A subarray is a contiguous part of an array.

Example 1:
Input: nums = [4,5,0,-2,-3,1], k = 5
Output: 7
Explanation: There are 7 subarrays with a sum divisible by k = 5:
[4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]

Example 2:
Input: nums = [5], k = 9
Output: 0

Constraints:
1 <= nums.length <= 3 * 10^4
-10^4 <= nums[i] <= 10^4
2 <= k <= 10^4

</> Typescript Code:
*/

function subarraysDivByK(nums: number[], k: number): number {
  // Initialize a map to count occurrences of each remainder
  const modCount = new Map<number, number>();
  // Initialize the count of remainder 0 to 1 (to handle subarrays that are themselves divisible by k)
  modCount.set(0, 1);
  // Initialize the cumulative sum and the result counter
  let sum = 0;
  let result = 0;

  // Iterate through each number in the array
  for (const num of nums) {
    // Update the cumulative sum
    sum += num;
    // Compute the remainder of the cumulative sum when divided by k
    const mod = ((sum % k) + k) % k;
    // If the remainder has been seen before, it means there are subarrays that sum to a multiple of k
    if (modCount.has(mod)) {
      // Increment the result by the number of times this remainder has been seen
      result += modCount.get(mod)!;
    }
    // Update the count of this remainder in the map
    modCount.set(mod, (modCount.get(mod) || 0) + 1);
  }

  // Return the total count of subarrays whose sum is divisible by k
  return result;
}

/* 
75. Sort Colors

Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.

Example 1:
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]

Example 2:
Input: nums = [2,0,1]
Output: [0,1,2]

Constraints:
n == nums.length
1 <= n <= 300
nums[i] is either 0, 1, or 2.

Follow up: Could you come up with a one-pass algorithm using only constant extra space?

</> Typescript Code:
*/

/**
  Do not return anything, modify nums in-place instead.
 */

function sortColors(nums: number[]): void {
  // Initialize three pointers for low, mid, and high colors (0, 1, and 2)
  let low = 0; // Low color pointer starts at the beginning
  let mid = 0; // Mid color pointer starts at the beginning
  let high = nums.length - 1; // High color pointer starts at the end

  while (mid <= high) {
    // Continue until all colors are sorted
    switch (nums[mid]) {
      case 0: // If current color is low (0), swap with low and increment both pointers
        swap(nums, low++, mid++);
        break;
      case 1: // If current color is mid (1), just move the mid pointer forward
        mid++;
        break;
      case 2: // If current color is high (2), swap with high and decrement the high pointer
        swap(nums, mid, high--);
        break;
    }
  }
}

function swap(nums: number[], i: number, j: number): void {
  const temp = nums[i]; // Store low color in temporary variable
  nums[i] = nums[j]; // Move high color to the current position (i)
  nums[j] = temp; // Put low color at the original position of high color
}

/* 
945. Minimum Increment to Make Array Unique

You are given an integer array nums. In one move, you can pick an index i where 0 <= i < nums.length and increment nums[i] by 1.

Return the minimum number of moves to make every value in nums unique.

The test cases are generated so that the answer fits in a 32-bit integer.

Example 1:
Input: nums = [1,2,2]
Output: 1
Explanation: After 1 move, the array could be [1, 2, 3].

Example 2:
Input: nums = [3,2,1,2,1,7]
Output: 6
Explanation: After 6 moves, the array could be [3, 4, 1, 2, 5, 7].
It can be shown with 5 or less moves that it is impossible for the array to have all unique values.

Constraints:
1 <= nums.length <= 10^5
0 <= nums[i] <= 10^5

</> Typescript Code:
*/

function minIncrementForUnique(nums: number[]): number {
  // Sort the array in ascending order
  nums.sort((a, b) => a - b);

  // Initialize the moves counter
  let moves = 0;

  // Iterate through the array starting from the second element
  for (let i = 1; i < nums.length; i++) {
    // If the current element is less than or equal to the previous element
    if (nums[i] <= nums[i - 1]) {
      // Calculate the increment needed to make the current element unique
      const increment = nums[i - 1] - nums[i] + 1;
      // Increment the current element
      nums[i] += increment;
      // Add the increment to the moves counter
      moves += increment;
    }
  }

  // Return the total number of moves
  return moves;
}

/* 
633. Sum of Square Numbers

Given a non-negative integer c, decide whether there're two integers a and b such that a2 + b2 = c.

Example 1:
Input: c = 5
Output: true
Explanation: 1 * 1 + 2 * 2 = 5

Example 2:
Input: c = 3
Output: false

Constraints:
0 <= c <= 2^31 - 1

*/

function judgeSquareSum(c: number): boolean {
  // Iterate through possible values of 'a' starting from 0
  for (let a = 0; a * a <= c; a++) {
    // Calculate 'b' such that a^2 + b^2 = c
    const b = Math.sqrt(c - a * a);
    // Check if 'b' is an integer
    if (b === Math.floor(b)) {
      return true; // If 'b' is an integer, return true
    }
  }
  // If no such pair (a, b) is found, return false
  return false;
}
