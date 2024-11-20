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

</> Typescript Code:
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

/* 
826. Most Profit Assigning Work

You have n jobs and m workers. You are given three arrays: difficulty, profit, and worker where: difficulty[i] and profit[i] are the difficulty and the profit of the ith job, and
worker[j] is the ability of jth worker (i.e., the jth worker can only complete a job with difficulty at most worker[j]).
Every worker can be assigned at most one job, but one job can be completed multiple times.

For example, if three workers attempt the same job that pays $1, then the total profit will be $3. If a worker cannot complete any job, their profit is $0.
Return the maximum profit we can achieve after assigning the workers to the jobs.

Example 1:
Input: difficulty = [2,4,6,8,10], profit = [10,20,30,40,50], worker = [4,5,6,7]
Output: 100
Explanation: Workers are assigned jobs of difficulty [4,4,6,6] and they get a profit of [20,20,30,30] separately.

Example 2:
Input: difficulty = [85,47,57], profit = [24,66,99], worker = [40,25,25]
Output: 0

Constraints:
n == difficulty.length
n == profit.length
m == worker.length
1 <= n, m <= 10^4
1 <= difficulty[i], profit[i], worker[i] <= 105

</> Typescript Code:
*/

function maxProfitAssignment(difficulty: number[], profit: number[], worker: number[]): number {
  // Combine difficulty and profit into a single array of jobs
  const jobs = difficulty.map((d, i) => [d, profit[i]]);
  // Sort the jobs based on difficulty in ascending order
  jobs.sort((a, b) => a[0] - b[0]);
  // Sort the workers based on their ability in ascending order
  worker.sort((a, b) => a - b);

  let maxProfit = 0; // Initialize the total maximum profit to 0
  let best = 0; // Initialize the best profit that can be achieved so far
  let i = 0; // Initialize the index to traverse the jobs

  // Iterate through each worker based on their ability
  for (const ability of worker) {
    // Update the best profit for the current worker's ability
    while (i < jobs.length && ability >= jobs[i][0]) {
      best = Math.max(best, jobs[i][1]);
      i++;
    }
    // Add the best profit to the total maximum profit
    maxProfit += best;
  }

  // Return the total maximum profit after assigning all workers
  return maxProfit;
}

/* 
1482. Minimum Number of Days to Make m Bouquets

You are given an integer array bloomDay, an integer m and an integer k.

You want to make m bouquets. To make a bouquet, you need to use k adjacent flowers from the garden.

The garden consists of n flowers, the ith flower will bloom in the bloomDay[i] and then can be used in exactly one bouquet.

Return the minimum number of days you need to wait to be able to make m bouquets from the garden. If it is impossible to make m bouquets return -1.

Example 1:
Input: bloomDay = [1,10,3,10,2], m = 3, k = 1
Output: 3
Explanation: Let us see what happened in the first three days. x means flower bloomed and _ means flower did not bloom in the garden.
We need 3 bouquets each should contain 1 flower.
After day 1: [x, _, _, _, _]   // we can only make one bouquet.
After day 2: [x, _, _, _, x]   // we can only make two bouquets.
After day 3: [x, _, x, _, x]   // we can make 3 bouquets. The answer is 3.

Example 2:
Input: bloomDay = [1,10,3,10,2], m = 3, k = 2
Output: -1
Explanation: We need 3 bouquets each has 2 flowers, that means we need 6 flowers. We only have 5 flowers so it is impossible to get the needed bouquets and we return -1.

Example 3:
Input: bloomDay = [7,7,7,7,12,7,7], m = 2, k = 3
Output: 12
Explanation: We need 2 bouquets each should have 3 flowers.
Here is the garden after the 7 and 12 days:
After day 7: [x, x, x, x, _, x, x]
We can make one bouquet of the first three flowers that bloomed. We cannot make another bouquet from the last three flowers that bloomed because they are not adjacent.
After day 12: [x, x, x, x, x, x, x]
It is obvious that we can make two bouquets in different ways.

Constraints:
bloomDay.length == n
1 <= n <= 10^5
1 <= bloomDay[i] <= 10^9
1 <= m <= 10^6
1 <= k <= n

</> Typescript Code:
*/

function minDays(bloomDay: number[], m: number, k: number): number {
  // If the number of required bouquets is more than the number of flowers available, return -1
  if (m * k > bloomDay.length) return -1;

  // Initialize the binary search range
  let left = Math.min(...bloomDay);
  let right = Math.max(...bloomDay);

  // Function to check if we can make the required number of bouquets by a certain day
  const canMakeBouquets = (days: number): boolean => {
    let bouquets = 0; // Count of bouquets made
    let flowers = 0; // Count of consecutive flowers available

    // Iterate over each flower's bloom day
    for (const day of bloomDay) {
      if (day <= days) {
        flowers++; // If the flower blooms by 'days', count it
        if (flowers == k) {
          bouquets++; // If we have enough flowers for one bouquet, count it
          flowers = 0; // Reset the flower count for the next bouquet
        }
      } else {
        flowers = 0; // If a flower doesn't bloom by 'days', reset the flower count
      }
    }

    return bouquets >= m; // Return true if we can make the required number of bouquets
  };

  // Binary search to find the minimum number of days required
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (canMakeBouquets(mid)) {
      right = mid; // Try to find a smaller number of days
    } else {
      left = mid + 1; // Increase the number of days
    }
  }

  return left; // The minimum number of days required
}

/* 
1552. Magnetic Force Between Two Balls

In the universe Earth C-137, Rick discovered a special form of magnetic force between two balls if they are put in his new invented basket. Rick has n empty baskets, the ith basket is at position[i], Morty has m balls and needs to distribute the balls into the baskets such that the minimum magnetic force between any two balls is maximum.

Rick stated that magnetic force between two different balls at positions x and y is |x - y|.

Given the integer array position and the integer m. Return the required force.

Example 1:
Input: position = [1,2,3,4,7], m = 3
Output: 3
Explanation: Distributing the 3 balls into baskets 1, 4 and 7 will make the magnetic force between ball pairs [3, 3, 6]. The minimum magnetic force is 3. We cannot achieve a larger minimum magnetic force than 3.

Example 2:
Input: position = [5,4,3,2,1,1000000000], m = 2
Output: 999999999
Explanation: We can use baskets 1 and 1000000000.

Constraints:
n == position.length
2 <= n <= 10^5
1 <= position[i] <= 10^9
All integers in position are distinct.
2 <= m <= position.length

</> Typescript Code:
*/

function maxDistance(position: number[], m: number): number {
  // Sort the basket positions in ascending order
  position.sort((a, b) => a - b);

  // Helper function to check if we can place 'm' balls with at least 'minDist' distance apart
  const canPlaceBalls = (minDist: number): boolean => {
    let count = 1; // Place the first ball in the first basket
    let lastPos = position[0]; // Track the position of the last placed ball

    // Iterate through the remaining basket positions
    for (let i = 1; i < position.length; i++) {
      // If the current basket position is at least 'minDist' away from the last placed ball
      if (position[i] - lastPos >= minDist) {
        count++; // Place a ball in the current basket
        lastPos = position[i]; // Update the position of the last placed ball
        if (count === m) return true; // If we've placed all 'm' balls, return true
      }
    }
    return false; // Return false if we cannot place all 'm' balls with the given minimum distance
  };

  // Initialize the binary search range
  let left = 1; // Minimum possible distance
  let right = position[position.length - 1] - position[0]; // Maximum possible distance
  let result = 0;

  // Perform binary search to find the maximum minimum distance
  while (left <= right) {
    const mid = Math.floor((left + right) / 2); // Calculate the midpoint of the current range
    if (canPlaceBalls(mid)) {
      // Check if we can place balls with at least 'mid' distance apart
      result = mid; // Update the result with the current midpoint
      left = mid + 1; // Move to the right half to find a larger minimum distance
    } else {
      right = mid - 1; // Move to the left half to find a smaller minimum distance
    }
  }

  return result; // Return the maximum minimum distance found
}

/* 
1052. Grumpy Bookstore Owner

There is a bookstore owner that has a store open for n minutes. Every minute, some number of customers enter the store. You are given an integer array customers of length n where customers[i] is the number of the customer that enters the store at the start of the ith minute and all those customers leave after the end of that minute.

On some minutes, the bookstore owner is grumpy. You are given a binary array grumpy where grumpy[i] is 1 if the bookstore owner is grumpy during the ith minute, and is 0 otherwise.

When the bookstore owner is grumpy, the customers of that minute are not satisfied, otherwise, they are satisfied.

The bookstore owner knows a secret technique to keep themselves not grumpy for minutes consecutive minutes, but can only use it once.

Return the maximum number of customers that can be satisfied throughout the day.

Example 1:
Input: customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], minutes = 3
Output: 16
Explanation: The bookstore owner keeps themselves not grumpy for the last 3 minutes. 
The maximum number of customers that can be satisfied = 1 + 1 + 1 + 1 + 7 + 5 = 16.

Example 2:
Input: customers = [1], grumpy = [0], minutes = 1
Output: 1

Constraints:
n == customers.length == grumpy.length
1 <= minutes <= n <= 2 * 10^4
0 <= customers[i] <= 1000
grumpy[i] is either 0 or 1.

</> Typescript Code:
*/

function maxSatisfied(customers: number[], grumpy: number[], minutes: number): number {
  // Initialize total satisfied customers without using the technique
  let totalSatisfied = 0;
  // Initialize the additional satisfied customers by using the technique
  let additionalSatisfied = 0;
  // Initialize the maximum additional satisfied customers
  let maxAdditionalSatisfied = 0;

  for (let i = 0; i < customers.length; i++) {
    if (grumpy[i] === 0) {
      // Add customers to totalSatisfied if the owner is not grumpy
      totalSatisfied += customers[i];
    } else {
      // Add customers to additionalSatisfied if the owner is grumpy
      additionalSatisfied += customers[i];
    }

    if (i >= minutes) {
      // Remove the effect of the customers who are out of the sliding window
      additionalSatisfied -= customers[i - minutes] * grumpy[i - minutes];
    }

    // Update the maximum additional satisfied customers
    maxAdditionalSatisfied = Math.max(maxAdditionalSatisfied, additionalSatisfied);
  }

  // Return the sum of always satisfied customers and the best additional satisfied customers
  return totalSatisfied + maxAdditionalSatisfied;
}

/* 
1248. Count Number of Nice Subarrays

Given an array of integers nums and an integer k. A continuous subarray is called nice if there are k odd numbers on it.

Return the number of nice sub-arrays.

Example 1:
Input: nums = [1,1,2,1,1], k = 3
Output: 2
Explanation: The only sub-arrays with 3 odd numbers are [1,1,2,1] and [1,2,1,1].

Example 2:
Input: nums = [2,4,6], k = 1
Output: 0
Explanation: There are no odd numbers in the array.

Example 3:
Input: nums = [2,2,2,1,2,2,1,2,2,2], k = 2
Output: 16

Constraints:
1 <= nums.length <= 50000
1 <= nums[i] <= 10^5
1 <= k <= nums.length

</> Typescript Code:
*/

function numberOfSubarrays(nums: number[], k: number): number {
  let count = 0; // Initialize the count of nice subarrays
  let prefixCounts = new Map<number, number>(); // Map to store counts of odd numbers encountered
  prefixCounts.set(0, 1); // Base case to handle subarrays starting from the beginning
  let oddCount = 0; // Counter for the number of odd numbers

  for (let num of nums) {
    // Iterate through each number in the array
    if (num % 2 !== 0) oddCount++; // Increment oddCount if the number is odd
    if (prefixCounts.has(oddCount - k))
      // Check if there is a prefix with (oddCount - k) odds
      count += prefixCounts.get(oddCount - k) ?? 0; // Add the number of such prefixes to the count
    prefixCounts.set(oddCount, (prefixCounts.get(oddCount) || 0) + 1); // Update the map with the current oddCount
  }

  return count; // Return the total count of nice subarrays
}

/* 
1438. Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit

Given an array of integers nums and an integer limit, return the size of the longest non-empty subarray such that the absolute difference between any two elements of this subarray is less than or equal to limit.

Example 1:
Input: nums = [8,2,4,7], limit = 4
Output: 2 
Explanation: All subarrays are: 
[8] with maximum absolute diff |8-8| = 0 <= 4.
[8,2] with maximum absolute diff |8-2| = 6 > 4. 
[8,2,4] with maximum absolute diff |8-2| = 6 > 4.
[8,2,4,7] with maximum absolute diff |8-2| = 6 > 4.
[2] with maximum absolute diff |2-2| = 0 <= 4.
[2,4] with maximum absolute diff |2-4| = 2 <= 4.
[2,4,7] with maximum absolute diff |2-7| = 5 > 4.
[4] with maximum absolute diff |4-4| = 0 <= 4.
[4,7] with maximum absolute diff |4-7| = 3 <= 4.
[7] with maximum absolute diff |7-7| = 0 <= 4. 
Therefore, the size of the longest subarray is 2.

Example 2:
Input: nums = [10,1,2,4,7,2], limit = 5
Output: 4 
Explanation: The subarray [2,4,7,2] is the longest since the maximum absolute diff is |2-7| = 5 <= 5.

Example 3:
Input: nums = [4,2,2,2,4,4,2,2], limit = 0
Output: 3

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^9
0 <= limit <= 10^9

</> Typescript Code:
*/

function longestSubarray(nums: number[], limit: number): number {
  let maxDeque: number[] = []; // Deque to store indices of the current window's max values
  let minDeque: number[] = []; // Deque to store indices of the current window's min values
  let left = 0; // Left pointer for the sliding window
  let result = 0; // Variable to keep track of the longest subarray length

  for (let right = 0; right < nums.length; right++) {
    // Iterate through the array with the right pointer
    // Maintain the maxDeque to always have the maximum element at the front
    while (maxDeque.length && nums[maxDeque[maxDeque.length - 1]] <= nums[right]) {
      maxDeque.pop();
    }
    // Maintain the minDeque to always have the minimum element at the front
    while (minDeque.length && nums[minDeque[minDeque.length - 1]] >= nums[right]) {
      minDeque.pop();
    }

    maxDeque.push(right); // Add the current element's index to the maxDeque
    minDeque.push(right); // Add the current element's index to the minDeque

    // If the current window's absolute difference exceeds the limit, shrink the window from the left
    while (nums[maxDeque[0]] - nums[minDeque[0]] > limit) {
      left++; // Move the left pointer to the right
      // Remove indices from the deques if they are out of the current window
      if (maxDeque[0] < left) maxDeque.shift();
      if (minDeque[0] < left) minDeque.shift();
    }

    // Update the result with the maximum window size found
    result = Math.max(result, right - left + 1);
  }

  return result; // Return the length of the longest subarray
}

/* 
1038. Binary Search Tree to Greater Sum Tree

Given the root of a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus the sum of all keys greater than the original key in BST.

As a reminder, a binary search tree is a tree that satisfies these constraints:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.

Example 1:
Input: root = [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
Output: [30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]

Example 2:
Input: root = [0,null,1]
Output: [1,null,1]

Constraints:
The number of nodes in the tree is in the range [1, 100].
0 <= Node.val <= 100
All the values in the tree are unique.

Note: This question is the same as 538: https://leetcode.com,/problems/convert-bst-to-greater-tree/

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

function bstToGst(root: TreeNode | null): TreeNode | null {
  let sum = 0; // Initialize sum to accumulate the node values

  function traverse(node: TreeNode | null) {
    if (!node) return; // Base case: if the node is null, return
    traverse(node.right); // Recurse on the right subtree
    sum += node.val; // Update the sum with the current node's value
    node.val = sum; // Modify the current node's value to the accumulated sum
    traverse(node.left); // Recurse on the left subtree
  }

  traverse(root); // Start the traversal from the root
  return root; // Return the modified tree root
}

/* 
1382. Balance a Binary Search Tree

Given the root of a binary search tree, return a balanced binary search tree with the same node values. If there is more than one answer, return any of them.

A binary search tree is balanced if the depth of the two subtrees of every node never differs by more than 1.

Example 1:
Input: root = [1,null,2,null,3,null,4,null,null]
Output: [2,1,3,null,null,null,4]
Explanation: This is not the only correct answer, [3,1,4,null,2] is also correct.

Example 2:
Input: root = [2,1,3]
Output: [2,1,3]

Constraints:
The number of nodes in the tree is in the range [1, 10^4].
1 <= Node.val <= 10^5

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

function balanceBST(root: TreeNode | null): TreeNode | null {
  const values: number[] = []; // Array to store the node values in sorted order

  function inorder(node: TreeNode | null) {
    if (!node) return; // Base case: if the node is null, return
    inorder(node.left); // Recurse on the left subtree
    values.push(node.val); // Add the node's value to the values array
    inorder(node.right); // Recurse on the right subtree
  }

  function sortedArrayToBST(start: number, end: number): TreeNode | null {
    if (start > end) return null; // Base case: if the start index is greater than the end index, return null
    const mid = Math.floor((start + end) / 2); // Find the middle index
    const node = new TreeNode(values[mid]); // Create a new TreeNode with the middle value
    node.left = sortedArrayToBST(start, mid - 1); // Recurse to create the left subtree
    node.right = sortedArrayToBST(mid + 1, end); // Recurse to create the right subtree
    return node; // Return the newly created node
  }

  inorder(root); // Perform an inorder traversal to get the sorted node values
  return sortedArrayToBST(0, values.length - 1); // Convert the sorted array to a balanced BST and return the root
}

/* 
2285. Maximum Total Importance of Roads

You are given an integer n denoting the number of cities in a country. The cities are numbered from 0 to n - 1.

You are also given a 2D integer array roads where roads[i] = [ai, bi] denotes that there exists a bidirectional road connecting cities ai and bi.

You need to assign each city with an integer value from 1 to n, where each value can only be used once. The importance of a road is then defined as the sum of the values of the two cities it connects.

Return the maximum total importance of all roads possible after assigning the values optimally.

Example 1:
Input: n = 5, roads = [[0,1],[1,2],[2,3],[0,2],[1,3],[2,4]]
Output: 43
Explanation: The figure above shows the country and the assigned values of [2,4,5,3,1].
- The road (0,1) has an importance of 2 + 4 = 6.
- The road (1,2) has an importance of 4 + 5 = 9.
- The road (2,3) has an importance of 5 + 3 = 8.
- The road (0,2) has an importance of 2 + 5 = 7.
- The road (1,3) has an importance of 4 + 3 = 7.
- The road (2,4) has an importance of 5 + 1 = 6.
The total importance of all roads is 6 + 9 + 8 + 7 + 7 + 6 = 43.
It can be shown that we cannot obtain a greater total importance than 43.

Example 2:
Input: n = 5, roads = [[0,3],[2,4],[1,3]]
Output: 20
Explanation: The figure above shows the country and the assigned values of [4,3,2,5,1].
- The road (0,3) has an importance of 4 + 5 = 9.
- The road (2,4) has an importance of 2 + 1 = 3.
- The road (1,3) has an importance of 3 + 5 = 8.
The total importance of all roads is 9 + 3 + 8 = 20.
It can be shown that we cannot obtain a greater total importance than 20.

Constraints:
2 <= n <= 5 * 10^4
1 <= roads.length <= 5 * 10^4
roads[i].length == 2
0 <= ai, bi <= n - 1
ai != bi
There are no duplicate roads.

</> Typescript Code:
*/

function maximumImportance(n: number, roads: number[][]): number {
  const degree = new Array(n).fill(0); // Initialize an array to store the degree of each city

  // Calculate the degree of each city
  for (const [a, b] of roads) {
    degree[a]++; // Increment the degree of city a
    degree[b]++; // Increment the degree of city b
  }

  degree.sort((a, b) => b - a); // Sort the degrees in descending order

  let totalImportance = 0; // Variable to store the total importance

  // Assign values to cities based on their degrees
  for (let i = 0; i < n; i++) {
    totalImportance += degree[i] * (n - i); // Calculate the total importance
  }

  return totalImportance; // Return the maximum total importance
}

/* 
2192. All Ancestors of a Node in a Directed Acyclic Graph

You are given a positive integer n representing the number of nodes of a Directed Acyclic Graph (DAG). The nodes are numbered from 0 to n - 1 (inclusive).

You are also given a 2D integer array edges, where edges[i] = [fromi, toi] denotes that there is a unidirectional edge from fromi to toi in the graph.

Return a list answer, where answer[i] is the list of ancestors of the ith node, sorted in ascending order.

A node u is an ancestor of another node v if u can reach v via a set of edges.

Example 1:
Input: n = 8, edgeList = [[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]]
Output: [[],[],[],[0,1],[0,2],[0,1,3],[0,1,2,3,4],[0,1,2,3]]
Explanation:
The above diagram represents the input graph.
- Nodes 0, 1, and 2 do not have any ancestors.
- Node 3 has two ancestors 0 and 1.
- Node 4 has two ancestors 0 and 2.
- Node 5 has three ancestors 0, 1, and 3.
- Node 6 has five ancestors 0, 1, 2, 3, and 4.
- Node 7 has four ancestors 0, 1, 2, and 3.

Example 2:
Input: n = 5, edgeList = [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
Output: [[],[0],[0,1],[0,1,2],[0,1,2,3]]
Explanation:
The above diagram represents the input graph.
- Node 0 does not have any ancestor.
- Node 1 has one ancestor 0.
- Node 2 has two ancestors 0 and 1.
- Node 3 has three ancestors 0, 1, and 2.
- Node 4 has four ancestors 0, 1, 2, and 3.

Constraints:
1 <= n <= 1000
0 <= edges.length <= min(2000, n * (n - 1) / 2)
edges[i].length == 2
0 <= fromi, toi <= n - 1
fromi != toi
There are no duplicate edges.
The graph is directed and acyclic.

</> Typescript Code:
*/

function getAncestors(n: number, edges: number[][]): number[][] {
  const ancestors: Set<number>[] = Array.from({length: n}, () => new Set()); // Array of sets to store ancestors of each node
  const graph: number[][] = Array.from({length: n}, () => []); // Adjacency list to represent the graph
  const inDegree: number[] = new Array(n).fill(0); // Array to store the in-degrees of each node

  // Build the graph and in-degree array
  for (const [from, to] of edges) {
    graph[from].push(to); // Add edge to the graph
    inDegree[to]++; // Increment the in-degree of the destination node
  }

  const queue: number[] = []; // Queue for topological sorting
  for (let i = 0; i < n; i++) {
    if (inDegree[i] === 0) queue.push(i); // Add nodes with zero in-degree to the queue
  }

  // Perform topological sorting
  while (queue.length > 0) {
    const node = queue.shift()!; // Get the node from the front of the queue
    for (const neighbor of graph[node]) {
      // Traverse all neighbors of the current node
      ancestors[neighbor].add(node); // Add the current node as an ancestor to the neighbor
      for (const ancestor of ancestors[node]) {
        // Add all ancestors of the current node to the neighbor
        ancestors[neighbor].add(ancestor);
      }
      inDegree[neighbor]--; // Decrement the in-degree of the neighbor
      if (inDegree[neighbor] === 0) queue.push(neighbor); // If in-degree becomes zero, add the neighbor to the queue
    }
  }

  // Convert sets to sorted arrays
  return ancestors.map(ancestorSet => Array.from(ancestorSet).sort((a, b) => a - b)); // Return the sorted list of ancestors for each node
}

/* 
1509. Minimum Difference Between Largest and Smallest Value in Three Moves

You are given an integer array nums.

In one move, you can choose one element of nums and change it to any value.

Return the minimum difference between the largest and smallest value of nums after performing at most three moves.

Example 1:
Input: nums = [5,3,2,4]
Output: 0
Explanation: We can make at most 3 moves.
In the first move, change 2 to 3. nums becomes [5,3,3,4].
In the second move, change 4 to 3. nums becomes [5,3,3,3].
In the third move, change 5 to 3. nums becomes [3,3,3,3].
After performing 3 moves, the difference between the minimum and maximum is 3 - 3 = 0.

Example 2:
Input: nums = [1,5,0,10,14]
Output: 1
Explanation: We can make at most 3 moves.
In the first move, change 5 to 0. nums becomes [1,0,0,10,14].
In the second move, change 10 to 0. nums becomes [1,0,0,0,14].
In the third move, change 14 to 1. nums becomes [1,0,0,0,1].
After performing 3 moves, the difference between the minimum and maximum is 1 - 0 = 1.
It can be shown that there is no way to make the difference 0 in 3 moves.

Example 3:
Input: nums = [3,100,20]
Output: 0
Explanation: We can make at most 3 moves.
In the first move, change 100 to 7. nums becomes [3,7,20].
In the second move, change 20 to 7. nums becomes [3,7,7].
In the third move, change 3 to 7. nums becomes [7,7,7].
After performing 3 moves, the difference between the minimum and maximum is 7 - 7 = 0.

Constraints:
1 <= nums.length <= 10^5
-109 <= nums[i] <= 10^9

</> Typescript Code:
*/

function minDifference(nums: number[]): number {
  // Get the length of the array
  const n = nums.length;

  // If there are 4 or fewer elements, we can make all elements the same
  // by modifying at most 3 elements, hence the minimum difference is 0
  if (n <= 4) return 0;

  // Sort the array to easily access the smallest and largest elements
  nums.sort((a, b) => a - b);

  // Initialize a variable to store the minimum difference
  let minDifference = Infinity;

  // We can perform at most 3 moves, so we iterate over the last 4 elements
  // (which will give us the largest elements after sorting) and the first 4 elements
  // (which will give us the smallest elements after sorting)
  for (let i = 0; i <= 3; i++) {
    // Calculate the current difference between the largest and smallest elements
    const currentDifference = nums[n - 1 - i] - nums[3 - i];

    // Update the minimum difference found so far
    minDifference = Math.min(minDifference, currentDifference);
  }

  // Return the minimum difference found
  return minDifference;
}

/* 
2181. Merge Nodes in Between Zeros

You are given the head of a linked list, which contains a series of integers separated by 0's. The beginning and end of the linked list will have Node.val == 0.

For every two consecutive 0's, merge all the nodes lying in between them into a single node whose value is the sum of all the merged nodes. The modified list should not contain any 0's.

Return the head of the modified linked list.


Example 1:
Input: head = [0,3,1,0,4,5,2,0]
Output: [4,11]
Explanation: 
The above figure represents the given linked list. The modified list contains
- The sum of the nodes marked in green: 3 + 1 = 4.
- The sum of the nodes marked in red: 4 + 5 + 2 = 11.

Example 2:
Input: head = [0,1,0,3,0,2,2,0]
Output: [1,3,4]
Explanation: 
The above figure represents the given linked list. The modified list contains
- The sum of the nodes marked in green: 1 = 1.
- The sum of the nodes marked in red: 3 = 3.
- The sum of the nodes marked in yellow: 2 + 2 = 4.

Constraints:
The number of nodes in the list is in the range [3, 2 * 10^5].
0 <= Node.val <= 1000
There are no two consecutive nodes with Node.val == 0.
The beginning and end of the linked list have Node.val == 0.

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

function mergeNodes(head: ListNode | null): ListNode | null {
  // Create a dummy node to serve as the new head of the resulting list
  let dummy = new ListNode(0);
  // Initialize a pointer to construct the new list
  let current = dummy;
  // Initialize a sum variable to accumulate node values
  let sum = 0;

  // Skip the initial zero in the list
  if (head !== null) {
    head = head.next;
  }
  // Traverse the entire linked list
  while (head !== null) {
    // When a zero is encountered, it indicates the end of a segment
    if (head.val === 0) {
      // Create a new node with the accumulated sum and attach it to the new list
      current.next = new ListNode(sum);
      // Move the current pointer to the new node
      current = current.next;
      // Reset the sum for the next segment
      sum = 0;
    } else {
      // Accumulate the value of the current node
      sum += head.val;
    }
    // Move to the next node in the original list
    head = head.next;
  }

  // Return the next node of the dummy, which is the head of the new list
  return dummy.next;
}

/* 
2058. Find the Minimum and Maximum Number of Nodes Between Critical Points

A critical point in a linked list is defined as either a local maxima or a local minima.

A node is a local maxima if the current node has a value strictly greater than the previous node and the next node.

A node is a local minima if the current node has a value strictly smaller than the previous node and the next node.

Note that a node can only be a local maxima/minima if there exists both a previous node and a next node.

Given a linked list head, return an array of length 2 containing [minDistance, maxDistance] where minDistance is the minimum distance between any two distinct critical points and maxDistance is the maximum distance between any two distinct critical points. If there are fewer than two critical points, return [-1, -1].

Example 1:
Input: head = [3,1]
Output: [-1,-1]
Explanation: There are no critical points in [3,1].

Example 2:
Input: head = [5,3,1,2,5,1,2]
Output: [1,3]
Explanation: There are three critical points:
- [5,3,1,2,5,1,2]: The third node is a local minima because 1 is less than 3 and 2.
- [5,3,1,2,5,1,2]: The fifth node is a local maxima because 5 is greater than 2 and 1.
- [5,3,1,2,5,1,2]: The sixth node is a local minima because 1 is less than 5 and 2.
The minimum distance is between the fifth and the sixth node. minDistance = 6 - 5 = 1.
The maximum distance is between the third and the sixth node. maxDistance = 6 - 3 = 3.

Example 3:
Input: head = [1,3,2,2,3,2,2,2,7]
Output: [3,3]
Explanation: There are two critical points:
- [1,3,2,2,3,2,2,2,7]: The second node is a local maxima because 3 is greater than 1 and 2.
- [1,3,2,2,3,2,2,2,7]: The fifth node is a local maxima because 3 is greater than 2 and 2.
Both the minimum and maximum distances are between the second and the fifth node.
Thus, minDistance and maxDistance is 5 - 2 = 3.
Note that the last node is not considered a local maxima because it does not have a next node.

Constraints:
The number of nodes in the list is in the range [2, 10^5].
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

function nodesBetweenCriticalPoints(head: ListNode | null): number[] {
  // If the list has fewer than 3 nodes, no critical points can exist
  if (!head || !head.next || !head.next.next) return [-1, -1];

  let firstCP = -1; // Position of the first critical point
  let lastCP = -1; // Position of the last critical point
  let minDistance = Number.MAX_SAFE_INTEGER; // Initialize minimum distance to a large value
  let prev = head; // Previous node
  let curr = head.next; // Current node
  let next = head.next.next; // Next node
  let index = 1; // Current index in the list

  // Iterate through the linked list
  while (next) {
    // Check if current node is a local maxima or minima
    if (
      (curr.val > prev.val && curr.val > next.val) ||
      (curr.val < prev.val && curr.val < next.val)
    ) {
      if (firstCP === -1) {
        firstCP = index; // Mark the first critical point
      } else {
        minDistance = Math.min(minDistance, index - lastCP); // Update minimum distance
      }
      lastCP = index; // Update the position of the last critical point
    }
    prev = curr; // Move to the next set of nodes
    curr = next;
    next = next.next!;
    index++;
  }

  // If there are fewer than 2 critical points
  if (firstCP === -1 || firstCP === lastCP) return [-1, -1];

  // Return the minimum and maximum distances between critical points
  return [minDistance, lastCP - firstCP];
}

/* 
1823. Find the Winner of the Circular Game

There are n friends that are playing a game. The friends are sitting in a circle and are numbered from 1 to n in clockwise order. More formally, moving clockwise from the ith friend brings you to the (i+1)th friend for 1 <= i < n, and moving clockwise from the nth friend brings you to the 1st friend.

The rules of the game are as follows:

Start at the 1st friend.
Count the next k friends in the clockwise direction including the friend you started at. The counting wraps around the circle and may count some friends more than once.
The last friend you counted leaves the circle and loses the game.
If there is still more than one friend in the circle, go back to step 2 starting from the friend immediately clockwise of the friend who just lost and repeat.
Else, the last friend in the circle wins the game.
Given the number of friends, n, and an integer k, return the winner of the game.

Example 1:
Input: n = 5, k = 2
Output: 3
Explanation: Here are the steps of the game:
1) Start at friend 1.
2) Count 2 friends clockwise, which are friends 1 and 2.
3) Friend 2 leaves the circle. Next start is friend 3.
4) Count 2 friends clockwise, which are friends 3 and 4.
5) Friend 4 leaves the circle. Next start is friend 5.
6) Count 2 friends clockwise, which are friends 5 and 1.
7) Friend 1 leaves the circle. Next start is friend 3.
8) Count 2 friends clockwise, which are friends 3 and 5.
9) Friend 5 leaves the circle. Only friend 3 is left, so they are the winner.

Example 2:
Input: n = 6, k = 5
Output: 1
Explanation: The friends leave in this order: 5, 4, 6, 2, 3. The winner is friend 1.

Constraints:

1 <= k <= n <= 500

Follow up:
Could you solve this problem in linear time with constant space?

</> Typescript Code:
*/

function findTheWinner(n: number, k: number): number {
  // Initialize the winner variable to 0
  let winner = 0;

  // Loop through each number from 1 to n
  for (let i = 1; i <= n; i++) {
    // Calculate the new winner index using the formula
    winner = (winner + k) % i;
  }

  // Return the final winner index adjusted for 1-based indexing
  return winner + 1;
}

/* 
1701. Average Waiting Time

There is a restaurant with a single chef. You are given an array customers, where customers[i] = [arrivali, timei]:

arrivali is the arrival time of the ith customer. The arrival times are sorted in non-decreasing order.
timei is the time needed to prepare the order of the ith customer.
When a customer arrives, he gives the chef his order, and the chef starts preparing it once he is idle. The customer waits till the chef finishes preparing his order. The chef does not prepare food for more than one customer at a time. The chef prepares food for customers in the order they were given in the input.

Return the average waiting time of all customers. Solutions within 10^-5 from the actual answer are considered accepted.

Example 1:
Input: customers = [[1,2],[2,5],[4,3]]
Output: 5.00000
Explanation:
1) The first customer arrives at time 1, the chef takes his order and starts preparing it immediately at time 1, and finishes at time 3, so the waiting time of the first customer is 3 - 1 = 2.
2) The second customer arrives at time 2, the chef takes his order and starts preparing it at time 3, and finishes at time 8, so the waiting time of the second customer is 8 - 2 = 6.
3) The third customer arrives at time 4, the chef takes his order and starts preparing it at time 8, and finishes at time 11, so the waiting time of the third customer is 11 - 4 = 7.
So the average waiting time = (2 + 6 + 7) / 3 = 5.

Example 2:
Input: customers = [[5,2],[5,4],[10,3],[20,1]]
Output: 3.25000
Explanation:
1) The first customer arrives at time 5, the chef takes his order and starts preparing it immediately at time 5, and finishes at time 7, so the waiting time of the first customer is 7 - 5 = 2.
2) The second customer arrives at time 5, the chef takes his order and starts preparing it at time 7, and finishes at time 11, so the waiting time of the second customer is 11 - 5 = 6.
3) The third customer arrives at time 10, the chef takes his order and starts preparing it at time 11, and finishes at time 14, so the waiting time of the third customer is 14 - 10 = 4.
4) The fourth customer arrives at time 20, the chef takes his order and starts preparing it immediately at time 20, and finishes at time 21, so the waiting time of the fourth customer is 21 - 20 = 1.
So the average waiting time = (2 + 6 + 4 + 1) / 4 = 3.25.

Constraints:

1 <= customers.length <= 10^5
1 <= arrivali, timei <= 10^4
arrivali <= arrivali+1

</> Typescript Code:
*/

function averageWaitingTime(customers: number[][]): number {
  let totalWaitTime = 0; // Initialize total waiting time
  let currentTime = 0; // Initialize current time

  for (const [arrival, time] of customers) {
    if (currentTime < arrival) {
      currentTime = arrival; // If the chef is idle, update current time to customer's arrival
    }
    currentTime += time; // Add the time needed to prepare the order to the current time
    totalWaitTime += currentTime - arrival; // Calculate the waiting time for the customer and add it to the total waiting time
  }

  return totalWaitTime / customers.length; // Calculate and return the average waiting time
}

/* 
1190. Reverse Substrings Between Each Pair of Parentheses

You are given a string s that consists of lower case English letters and brackets.

Reverse the strings in each pair of matching parentheses, starting from the innermost one.

Your result should not contain any brackets.

Example 1:
Input: s = "(abcd)"
Output: "dcba"

Example 2:
Input: s = "(u(love)i)"
Output: "iloveu"
Explanation: The substring "love" is reversed first, then the whole string is reversed.

Example 3:
Input: s = "(ed(et(oc))el)"
Output: "leetcode"
Explanation: First, we reverse the substring "oc", then "etco", and finally, the whole string.

Constraints:
1 <= s.length <= 2000
s only contains lower case English characters and parentheses.
It is guaranteed that all parentheses are balanced.

</> Typescript Code:
*/

function reverseParentheses(s: string): string {
  // Initialize a stack to keep characters
  let stack: string[] = [];

  // Iterate through each character in the string
  for (let char of s) {
    if (char === ')') {
      // Temporary string to hold characters inside the parentheses
      let temp = '';

      // Pop characters until '(' is found
      while (stack.length && stack[stack.length - 1] !== '(') {
        temp += stack.pop();
      }

      // Pop the '(' from the stack
      stack.pop();

      // Push the reversed substring back onto the stack
      for (let revChar of temp) {
        stack.push(revChar);
      }
    } else {
      // Push all other characters onto the stack
      stack.push(char);
    }
  }

  // Join the stack into a final string without parentheses
  return stack.join('');
}

/* 
1717. Maximum Score From Removing Substrings

You are given a string s and two integers x and y. You can perform two types of operations any number of times.

Remove substring "ab" and gain x points.
For example, when removing "ab" from "cabxbae" it becomes "cxbae".
Remove substring "ba" and gain y points.
For example, when removing "ba" from "cabxbae" it becomes "cabxe".
Return the maximum points you can gain after applying the above operations on s.

Example 1:
Input: s = "cdbcbbaaabab", x = 4, y = 5
Output: 19
Explanation:
- Remove the "ba" underlined in "cdbcbbaaabab". Now, s = "cdbcbbaaab" and 5 points are added to the score.
- Remove the "ab" underlined in "cdbcbbaaab". Now, s = "cdbcbbaa" and 4 points are added to the score.
- Remove the "ba" underlined in "cdbcbbaa". Now, s = "cdbcba" and 5 points are added to the score.
- Remove the "ba" underlined in "cdbcba". Now, s = "cdbc" and 5 points are added to the score.
Total score = 5 + 4 + 5 + 5 = 19.

Example 2:
Input: s = "aabbaaxybbaabb", x = 5, y = 4
Output: 20

Constraints:
1 <= s.length <= 10^5
1 <= x, y <= 10^4
s consists of lowercase English letters.

</> Typescript Code:
*/

function maximumGain(s: string, x: number, y: number): number {
  // Initialize the maximum points counter
  let maxPoints = 0;

  // Helper function to remove substrings and score points
  function removeAndScore(pattern: string, points: number): string {
    let stack: string[] = [];
    // Iterate over each character in the string
    for (let char of s) {
      // Check if the current character and the last character in the stack form the pattern
      if (stack.length && stack[stack.length - 1] === pattern[0] && char === pattern[1]) {
        stack.pop(); // Remove the last character in the stack
        maxPoints += points; // Add points to the score
      } else {
        stack.push(char); // Add the current character to the stack
      }
    }
    // Join the stack into a new string and return it
    s = stack.join('');
    return s;
  }

  // Prioritize the operation with the higher points
  if (x > y) {
    // Remove "ab" substrings first
    s = removeAndScore('ab', x);
    // Then remove "ba" substrings
    s = removeAndScore('ba', y);
  } else {
    // Remove "ba" substrings first
    s = removeAndScore('ba', y);
    // Then remove "ab" substrings
    s = removeAndScore('ab', x);
  }

  // Return the total maximum points
  return maxPoints;
}

/* 
2196. Create Binary Tree From Descriptions

You are given a 2D integer array descriptions where descriptions[i] = [parenti, childi, isLefti] indicates that parenti is the parent of childi in a binary tree of unique values. Furthermore,

If isLefti == 1, then childi is the left child of parenti.
If isLefti == 0, then childi is the right child of parenti.
Construct the binary tree described by descriptions and return its root.

The test cases will be generated such that the binary tree is valid.

Example 1:
Input: descriptions = [[20,15,1],[20,17,0],[50,20,1],[50,80,0],[80,19,1]]
Output: [50,20,80,15,17,19]
Explanation: The root node is the node with value 50 since it has no parent.
The resulting binary tree is shown in the diagram.

Example 2:
Input: descriptions = [[1,2,1],[2,3,0],[3,4,1]]
Output: [1,2,null,null,3,4]
Explanation: The root node is the node with value 1 since it has no parent.
The resulting binary tree is shown in the diagram.

Constraints:
1 <= descriptions.length <= 10^4
descriptions[i].length == 3
1 <= parenti, childi <= 10^5
0 <= isLefti <= 1
The binary tree described by descriptions is valid.

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

function createBinaryTree(descriptions: number[][]): TreeNode | null {
  // Map to store created nodes
  const nodes: Map<number, TreeNode> = new Map();
  // Set to keep track of child nodes
  const children: Set<number> = new Set();

  // Iterate over each description
  for (const [parentVal, childVal, isLeft] of descriptions) {
    // If the parent node doesn't exist, create it
    if (!nodes.has(parentVal)) nodes.set(parentVal, new TreeNode(parentVal));
    // If the child node doesn't exist, create it
    if (!nodes.has(childVal)) nodes.set(childVal, new TreeNode(childVal));

    // Retrieve the parent and child nodes from the map
    const parent = nodes.get(parentVal)!;
    const child = nodes.get(childVal)!;

    // Link the child to the parent appropriately
    if (isLeft) {
      parent.left = child;
    } else {
      parent.right = child;
    }

    // Mark the child node
    children.add(childVal);
  }

  // Find the root node (the one not marked as any child)
  for (const [parentVal, ,] of descriptions) {
    if (!children.has(parentVal)) {
      return nodes.get(parentVal)!;
    }
  }

  // In case no root is found, return null
  return null;
}

/* 
2096. Step-By-Step Directions From a Binary Tree Node to Another

You are given the root of a binary tree with n nodes. Each node is uniquely assigned a value from 1 to n. You are also given an integer startValue representing the value of the start node s, and a different integer destValue representing the value of the destination node t.

Find the shortest path starting from node s and ending at node t. Generate step-by-step directions of such path as a string consisting of only the uppercase letters 'L', 'R', and 'U'. Each letter indicates a specific direction:

'L' means to go from a node to its left child node.
'R' means to go from a node to its right child node.
'U' means to go from a node to its parent node.
Return the step-by-step directions of the shortest path from node s to node t.

Example 1:
Input: root = [5,1,2,3,null,6,4], startValue = 3, destValue = 6
Output: "UURL"
Explanation: The shortest path is: 3 → 1 → 5 → 2 → 6.

Example 2:
Input: root = [2,1], startValue = 2, destValue = 1
Output: "L"
Explanation: The shortest path is: 2 → 1.

Constraints:
The number of nodes in the tree is n.
2 <= n <= 10^5
1 <= Node.val <= n
All the values in the tree are unique.
1 <= startValue, destValue <= n
startValue != destValue


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

function getDirections(root: TreeNode | null, startValue: number, destValue: number): string {
  // Helper function to find the path from root to the given value node
  const findPath = (node: TreeNode | null, value: number, path: string[]): boolean => {
    if (!node) return false; // If node is null, return false
    if (node.val === value) return true; // If the node's value matches the target, return true
    path.push('L'); // Try the left path
    if (findPath(node.left, value, path)) return true; // If left path leads to target, return true
    path.pop(); // Backtrack if left path does not lead to target
    path.push('R'); // Try the right path
    if (findPath(node.right, value, path)) return true; // If right path leads to target, return true
    path.pop(); // Backtrack if right path does not lead to target
    return false; // Return false if neither path leads to the target
  };

  const startPath: string[] = []; // Path from root to startValue
  const destPath: string[] = []; // Path from root to destValue
  findPath(root, startValue, startPath); // Find path to startValue
  findPath(root, destValue, destPath); // Find path to destValue

  let i = 0; // Index to find the common path length
  while (i < startPath.length && i < destPath.length && startPath[i] === destPath[i]) {
    i++; // Increment while both paths are the same
  }

  // Construct the result: 'U' for going up from startValue to the common ancestor, and then follow the path to destValue
  return 'U'.repeat(startPath.length - i) + destPath.slice(i).join('');
}

/* 
1110. Delete Nodes And Return Forest

Given the root of a binary tree, each node in the tree has a distinct value.

After deleting all nodes with a value in to_delete, we are left with a forest (a disjoint union of trees).

Return the roots of the trees in the remaining forest. You may return the result in any order.

Example 1:
Input: root = [1,2,3,4,5,6,7], to_delete = [3,5]
Output: [[1,2,null,4],[6],[7]]

Example 2:
Input: root = [1,2,4,null,3], to_delete = [3]
Output: [[1,2,4]]

Constraints:
The number of nodes in the given tree is at most 1000.
Each node has a distinct value between 1 and 1000.
to_delete.length <= 1000
to_delete contains distinct values between 1 and 1000.

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

function delNodes(root: TreeNode | null, to_delete: number[]): Array<TreeNode | null> {
  // Convert the list of nodes to delete into a set for O(1) look-up times.
  const toDeleteSet = new Set(to_delete);
  // Initialize the result array to store the roots of the remaining trees.
  const result: Array<TreeNode | null> = [];

  // Helper function to traverse the tree.
  function traverse(node: TreeNode | null, isRoot: boolean): TreeNode | null {
    // Base case: if the node is null, return null.
    if (!node) return null;
    // Determine if the current node should be deleted.
    const shouldDelete = toDeleteSet.has(node.val);
    // If the node is a root and should not be deleted, add it to the result.
    if (isRoot && !shouldDelete) result.push(node);
    // Recursively traverse the left subtree. If the current node is deleted, the child nodes are new roots.
    node.left = traverse(node.left, shouldDelete);
    // Recursively traverse the right subtree. If the current node is deleted, the child nodes are new roots.
    node.right = traverse(node.right, shouldDelete);
    // Return null if the current node should be deleted; otherwise, return the current node.
    return shouldDelete ? null : node;
  }

  // Start the traversal from the root, considering it as a potential root of a new tree.
  traverse(root, true);
  // Return the roots of the remaining trees.
  return result;
}

/* 
1530. Number of Good Leaf Nodes Pairs

You are given the root of a binary tree and an integer distance. A pair of two different leaf nodes of a binary tree is said to be good if the length of the shortest path between them is less than or equal to distance.

Return the number of good leaf node pairs in the tree.

Example 1:
Input: root = [1,2,3,null,4], distance = 3
Output: 1
Explanation: The leaf nodes of the tree are 3 and 4 and the length of the shortest path between them is 3. This is the only good pair.

Example 2:
Input: root = [1,2,3,4,5,6,7], distance = 3
Output: 2
Explanation: The good pairs are [4,5] and [6,7] with shortest path = 2. The pair [4,6] is not good because the length of ther shortest path between them is 4.

Example 3:
Input: root = [7,1,4,6,null,5,3,null,null,null,null,null,2], distance = 3
Output: 1
Explanation: The only good pair is [2,5].

Constraints:
The number of nodes in the tree is in the range [1, 210].
1 <= Node.val <= 100
1 <= distance <= 10

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

function countPairs(root: TreeNode | null, distance: number): number {
  let count = 0; // Initialize the count of good pairs to 0

  // Depth-first search (DFS) function that returns an array of distances to leaf nodes
  function dfs(node: TreeNode | null): number[] {
    if (!node) return []; // Return empty array for null nodes
    if (!node.left && !node.right) return [1]; // Return [1] for leaf nodes (distance from leaf to itself is 1)

    const leftDistances = dfs(node.left); // Get distances from the left subtree
    const rightDistances = dfs(node.right); // Get distances from the right subtree

    // Check pairs from left and right subtrees
    for (let l of leftDistances) {
      for (let r of rightDistances) {
        if (l + r <= distance) {
          count++; // Increment count if the sum of distances is within the given distance
        }
      }
    }

    const distances: number[] = [];
    // Collect updated distances from left subtree
    for (let l of leftDistances) {
      if (l + 1 < distance) distances.push(l + 1); // Increment distances by 1 and check if within the limit
    }
    // Collect updated distances from right subtree
    for (let r of rightDistances) {
      if (r + 1 < distance) distances.push(r + 1); // Increment distances by 1 and check if within the limit
    }
    return distances; // Return the updated distances
  }

  dfs(root); // Start DFS from the root
  return count; // Return the final count of good pairs
}

/* 
2191. Sort the Jumbled Numbers

You are given a 0-indexed integer array mapping which represents the mapping rule of a shuffled decimal system. mapping[i] = j means digit i should be mapped to digit j in this system.

The mapped value of an integer is the new integer obtained by replacing each occurrence of digit i in the integer with mapping[i] for all 0 <= i <= 9.

You are also given another integer array nums. Return the array nums sorted in non-decreasing order based on the mapped values of its elements.

Notes:
Elements with the same mapped values should appear in the same relative order as in the input.
The elements of nums should only be sorted based on their mapped values and not be replaced by them.

Example 1:
Input: mapping = [8,9,4,0,2,1,3,5,7,6], nums = [991,338,38]
Output: [338,38,991]
Explanation: 
Map the number 991 as follows:
1. mapping[9] = 6, so all occurrences of the digit 9 will become 6.
2. mapping[1] = 9, so all occurrences of the digit 1 will become 9.
Therefore, the mapped value of 991 is 669.
338 maps to 007, or 7 after removing the leading zeros.
38 maps to 07, which is also 7 after removing leading zeros.
Since 338 and 38 share the same mapped value, they should remain in the same relative order, so 338 comes before 38.
Thus, the sorted array is [338,38,991].

Example 2:
Input: mapping = [0,1,2,3,4,5,6,7,8,9], nums = [789,456,123]
Output: [123,456,789]
Explanation: 789 maps to 789, 456 maps to 456, and 123 maps to 123. Thus, the sorted array is [123,456,789].

Constraints:
mapping.length == 10
0 <= mapping[i] <= 9
All the values of mapping[i] are unique.
1 <= nums.length <= 3 * 10^4
0 <= nums[i] < 10^9

</> Typescript Code:
*/

function sortJumbled(mapping: number[], nums: number[]): number[] {
  // Sort the nums array based on the mapped values
  return nums.sort((a, b) => {
    // Calculate the mapped values of numbers a and b
    const mappedA = mapNumber(a, mapping); // Calculate mapped value for number a
    const mappedB = mapNumber(b, mapping); // Calculate mapped value for number b

    // Compare mapped values for sorting
    if (mappedA < mappedB) return -1; // a should come before b
    if (mappedA > mappedB) return 1; // b should come before a
    return 0; // a and b are equivalent in terms of mapped value
  });
}

// Function to calculate mapped value of a number based on mapping array
function mapNumber(num: number, mapping: number[]): number {
  const numStr = num.toString(); // Convert number to string to process each digit
  let mappedStr = ''; // Initialize mapped string

  // Iterate through each digit of the number
  for (let i = 0; i < numStr.length; i++) {
    const digit = parseInt(numStr[i]); // Get the current digit as integer
    mappedStr += mapping[digit]; // Append mapped digit based on mapping array
  }

  return parseInt(mappedStr); // Convert mapped string back to integer and return
}

/* 912. Sort an Array

Given an array of integers nums, sort the array in ascending order and return it.

You must solve the problem without using any built-in functions in O(nlog(n)) time complexity and with the smallest space complexity possible.

Example 1:
Input: nums = [5,2,3,1]
Output: [1,2,3,5]
Explanation: After sorting the array, the positions of some numbers are not changed (for example, 2 and 3), while the positions of other numbers are changed (for example, 1 and 5).

Example 2:
Input: nums = [5,1,1,2,0,0]
Output: [0,0,1,1,2,5]
Explanation: Note that the values of nums are not necessairly unique.

Constraints:
1 <= nums.length <= 5 * 10^4
-5 * 104 <= nums[i] <= 5 * 10^4

</> Typescript Code:
*/

function sortArray(nums: number[]): number[] {
  // Base case: If the array has 0 or 1 element, it's already sorted
  if (nums.length <= 1) {
    return nums;
  }

  // Helper function to perform merge sort
  const mergeSort = (arr: number[]): number[] => {
    // Base case: if the array has 1 or no elements, it's already sorted
    if (arr.length <= 1) {
      return arr;
    }

    // Find the middle index
    const mid = Math.floor(arr.length / 2);
    // Split the array into left and right halves
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    // Recursively sort both halves and merge them
    return merge(mergeSort(left), mergeSort(right));
  };

  // Helper function to merge two sorted arrays
  const merge = (left: number[], right: number[]): number[] => {
    const sortedArray: number[] = [];
    let i = 0;
    let j = 0;

    // Merge elements from left and right arrays in sorted order
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        sortedArray.push(left[i]);
        i++;
      } else {
        sortedArray.push(right[j]);
        j++;
      }
    }

    // If there are remaining elements in the left array, add them
    while (i < left.length) {
      sortedArray.push(left[i]);
      i++;
    }

    // If there are remaining elements in the right array, add them
    while (j < right.length) {
      sortedArray.push(right[j]);
      j++;
    }

    // Return the merged sorted array
    return sortedArray;
  };

  // Initial call to merge sort to start the sorting process
  return mergeSort(nums);
}

/* 
1334. Find the City With the Smallest Number of Neighbors at a Threshold Distance

There are n cities numbered from 0 to n-1. Given the array edges where edges[i] = [fromi, toi, weighti] represents a bidirectional and weighted edge between cities fromi and toi, and given the integer distanceThreshold.

Return the city with the smallest number of cities that are reachable through some path and whose distance is at most distanceThreshold, If there are multiple such cities, return the city with the greatest number.

Notice that the distance of a path connecting cities i and j is equal to the sum of the edges' weights along that path.

Example 1:
Input: n = 4, edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold = 4
Output: 3
Explanation: The figure above describes the graph. 
The neighboring cities at a distanceThreshold = 4 for each city are:
City 0 -> [City 1, City 2] 
City 1 -> [City 0, City 2, City 3] 
City 2 -> [City 0, City 1, City 3] 
City 3 -> [City 1, City 2] 
Cities 0 and 3 have 2 neighboring cities at a distanceThreshold = 4, but we have to return city 3 since it has the greatest number.

Example 2:
Input: n = 5, edges = [[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]], distanceThreshold = 2
Output: 0
Explanation: The figure above describes the graph. 
The neighboring cities at a distanceThreshold = 2 for each city are:
City 0 -> [City 1] 
City 1 -> [City 0, City 4] 
City 2 -> [City 3, City 4] 
City 3 -> [City 2, City 4]
City 4 -> [City 1, City 2, City 3] 
The city 0 has 1 neighboring city at a distanceThreshold = 2.

Constraints:
2 <= n <= 100
1 <= edges.length <= n * (n - 1) / 2
edges[i].length == 3
0 <= fromi < toi < n
1 <= weighti, distanceThreshold <= 10^4
All pairs (fromi, toi) are distinct.

</> Typescript Code:
*/

function findTheCity(n: number, edges: number[][], distanceThreshold: number): number {
  // Initialize a 2D array to store distances between each pair of cities
  const distances: number[][] = Array.from({length: n}, () => Array(n).fill(Infinity));

  // Initialize distances for direct edges
  edges.forEach(([from, to, weight]) => {
    distances[from][to] = weight;
    distances[to][from] = weight;
  });

  // Floyd-Warshall algorithm to compute shortest paths between all pairs of nodes
  for (let k = 0; k < n; k++) {
    // Intermediate node
    for (let i = 0; i < n; i++) {
      // Source node
      for (let j = 0; j < n; j++) {
        // Destination node
        // Update the shortest path from i to j through k
        if (i !== j && distances[i][k] + distances[k][j] < distances[i][j]) {
          distances[i][j] = distances[i][k] + distances[k][j];
        }
      }
    }
  }

  // Find the city with the smallest number of reachable cities within distanceThreshold
  let minCities = Infinity; // To track the minimum number of reachable cities
  let resultCity = -1; // The city with the smallest number of reachable cities

  for (let i = 0; i < n; i++) {
    let reachableCount = 0; // Count reachable cities for city i
    for (let j = 0; j < n; j++) {
      if (distances[i][j] <= distanceThreshold) {
        reachableCount++;
      }
    }
    // If current city has fewer reachable cities, or the same but is larger, update result
    if (reachableCount <= minCities) {
      minCities = reachableCount;
      resultCity = i;
    }
  }

  return resultCity; // Return the city with the smallest number of reachable cities
}

/* 
2976. Minimum Cost to Convert String I

You are given two 0-indexed strings source and target, both of length n and consisting of lowercase English letters. You are also given two 0-indexed character arrays original and changed, and an integer array cost, where cost[i] represents the cost of changing the character original[i] to the character changed[i].

You start with the string source. In one operation, you can pick a character x from the string and change it to the character y at a cost of z if there exists any index j such that cost[j] == z, original[j] == x, and changed[j] == y.

Return the minimum cost to convert the string source to the string target using any number of operations. If it is impossible to convert source to target, return -1.

Note that there may exist indices i, j such that original[j] == original[i] and changed[j] == changed[i].

Example 1:
Input: source = "abcd", target = "acbe", original = ["a","b","c","c","e","d"], changed = ["b","c","b","e","b","e"], cost = [2,5,5,1,2,20]
Output: 28
Explanation: To convert the string "abcd" to string "acbe":
- Change value at index 1 from 'b' to 'c' at a cost of 5.
- Change value at index 2 from 'c' to 'e' at a cost of 1.
- Change value at index 2 from 'e' to 'b' at a cost of 2.
- Change value at index 3 from 'd' to 'e' at a cost of 20.
The total cost incurred is 5 + 1 + 2 + 20 = 28.
It can be shown that this is the minimum possible cost.

Example 2:
Input: source = "aaaa", target = "bbbb", original = ["a","c"], changed = ["c","b"], cost = [1,2]
Output: 12
Explanation: To change the character 'a' to 'b' change the character 'a' to 'c' at a cost of 1, followed by changing the character 'c' to 'b' at a cost of 2, for a total cost of 1 + 2 = 3. To change all occurrences of 'a' to 'b', a total cost of 3 * 4 = 12 is incurred.

Example 3:
Input: source = "abcd", target = "abce", original = ["a"], changed = ["e"], cost = [10000]
Output: -1
Explanation: It is impossible to convert source to target because the value at index 3 cannot be changed from 'd' to 'e'.

Constraints:
1 <= source.length == target.length <= 10^5
source, target consist of lowercase English letters.
1 <= cost.length == original.length == changed.length <= 2000
original[i], changed[i] are lowercase English letters.
1 <= cost[i] <= 10^6
original[i] != changed[i]

</> Typescript Code:
*/

function minimumCost(
  source: string,
  target: string,
  original: string[],
  changed: string[],
  cost: number[],
): number {
  const n = source.length; // Get the length of the source string
  const m = original.length; // Get the number of transformations

  // Create a graph to store the transformations and their costs
  const graph = new Map<string, Map<string, number>>();

  // Populate the graph with the transformations
  for (let i = 0; i < m; i++) {
    if (!graph.has(original[i])) graph.set(original[i], new Map());
    const current = graph.get(original[i]);
    if (current && (!current.has(changed[i]) || cost[i] < current.get(changed[i])!)) {
      current.set(changed[i], cost[i]); // Store the minimum cost for each transformation
    }
  }

  // Create a map to store the minimum costs for each transformation
  const minCosts = new Map<string, number>();

  // Function to find the minimum cost using Dijkstra's algorithm
  function dijkstra(start: string, end: string): number {
    if (start === end) return 0; // No cost if the characters are the same
    if (minCosts.has(start + end)) return minCosts.get(start + end)!; // Return the precomputed cost if available

    const pq: [string, number][] = [];
    pq.push([start, 0]); // Priority queue to store the nodes to visit

    const visited = new Set<string>(); // Set to store the visited nodes

    while (pq.length > 0) {
      pq.sort((a, b) => a[1] - b[1]); // Sort the queue based on the cost
      const [current, currentCost] = pq.shift()!; // Get the node with the minimum cost

      if (current === end) {
        minCosts.set(start + end, currentCost); // Store the minimum cost
        return currentCost;
      }

      if (visited.has(current)) continue; // Skip if the node has already been visited
      visited.add(current);

      if (graph.has(current)) {
        for (const [neighbor, cost] of graph.get(current)!) {
          if (!visited.has(neighbor)) {
            pq.push([neighbor, currentCost + cost]); // Add the neighbor to the queue
          }
        }
      }
    }

    minCosts.set(start + end, Infinity); // Store infinity if the transformation is not possible
    return Infinity;
  }

  let totalCost = 0; // Initialize the total cost

  // Iterate over each character in the source string
  for (let i = 0; i < n; i++) {
    if (source[i] === target[i]) continue; // If the characters are the same, skip

    const cost = dijkstra(source[i], target[i]); // Get the minimum cost for the transformation

    if (cost === Infinity) return -1; // If the transformation is not possible, return -1
    totalCost += cost; // Add the cost to the total cost
  }

  return totalCost; // Return the total cost
}

/* 
1395. Count Number of Teams

There are n soldiers standing in a line. Each soldier is assigned a unique rating value.

You have to form a team of 3 soldiers amongst them under the following rules:

Choose 3 soldiers with index (i, j, k) with rating (rating[i], rating[j], rating[k]).
A team is valid if: (rating[i] < rating[j] < rating[k]) or (rating[i] > rating[j] > rating[k]) where (0 <= i < j < k < n).
Return the number of teams you can form given the conditions. (soldiers can be part of multiple teams).

Example 1:
Input: rating = [2,5,3,4,1]
Output: 3
Explanation: We can form three teams given the conditions. (2,3,4), (5,4,1), (5,3,1). 

Example 2:
Input: rating = [2,1,3]
Output: 0
Explanation: We can't form any team given the conditions.

Example 3:
Input: rating = [1,2,3,4]
Output: 4

Constraints:
n == rating.length
3 <= n <= 1000
1 <= rating[i] <= 10^5
All the integers in rating are unique.

</> Typescript Code:
*/

function numTeams(rating: number[]): number {
  let count = 0; // Initialize the counter for valid teams
  const n = rating.length; // Get the length of the rating array

  for (let j = 0; j < n; j++) {
    // Loop through each soldier as the middle soldier
    let less_left = 0,
      more_left = 0,
      less_right = 0,
      more_right = 0;

    // Count soldiers less and more than the current soldier to the left
    for (let i = 0; i < j; i++) {
      if (rating[i] < rating[j]) less_left++;
      if (rating[i] > rating[j]) more_left++;
    }

    // Count soldiers less and more than the current soldier to the right
    for (let k = j + 1; k < n; k++) {
      if (rating[k] < rating[j]) less_right++;
      if (rating[k] > rating[j]) more_right++;
    }

    // Calculate the valid teams using the counts
    count += less_left * more_right + more_left * less_right;
  }

  return count; // Return the total number of valid teams
}

/* 
1653. Minimum Deletions to Make String Balanced

You are given a string s consisting only of characters 'a' and 'b'​​​​.

You can delete any number of characters in s to make s balanced. s is balanced if there is no pair of indices (i,j) such that i < j and s[i] = 'b' and s[j]= 'a'.

Return the minimum number of deletions needed to make s balanced.

Example 1:
Input: s = "aababbab"
Output: 2
Explanation: You can either:
Delete the characters at 0-indexed positions 2 and 6 ("aababbab" -> "aaabbb"), or
Delete the characters at 0-indexed positions 3 and 6 ("aababbab" -> "aabbbb").

Example 2:
Input: s = "bbaaaaabb"
Output: 2
Explanation: The only solution is to delete the first two characters.

Constraints:
1 <= s.length <= 10^5
s[i] is 'a' or 'b'​​.

</> Typescript Code:
*/

function minimumDeletions(s: string): number {
  let deletions = 0; // To count the minimum deletions needed
  let balanceB = 0; // To keep track of 'b' characters that haven't been matched with 'a'

  for (let i = 0; i < s.length; i++) {
    if (s[i] === 'a') {
      if (balanceB > 0) {
        // We found an unbalanced 'ba' pair, so we need to delete the 'b' to balance it
        deletions++;
        balanceB--; // Decrease the count of unmatched 'b'
      }
    } else {
      // s[i] === 'b'
      balanceB++; // Increase the count of unmatched 'b'
    }
  }

  return deletions;
}

/* 
1105. Filling Bookcase Shelves

You are given an array books where books[i] = [thicknessi, heighti] indicates the thickness and height of the ith book. You are also given an integer shelfWidth.

We want to place these books in order onto bookcase shelves that have a total width shelfWidth.

We choose some of the books to place on this shelf such that the sum of their thickness is less than or equal to shelfWidth, then build another level of the shelf of the bookcase so that the total height of the bookcase has increased by the maximum height of the books we just put down. We repeat this process until there are no more books to place.

Note that at each step of the above process, the order of the books we place is the same order as the given sequence of books.

For example, if we have an ordered list of 5 books, we might place the first and second book onto the first shelf, the third book on the second shelf, and the fourth and fifth book on the last shelf.
Return the minimum possible height that the total bookshelf can be after placing shelves in this manner.

Example 1:
Input: books = [[1,1],[2,3],[2,3],[1,1],[1,1],[1,1],[1,2]], shelfWidth = 4
Output: 6
Explanation:
The sum of the heights of the 3 shelves is 1 + 3 + 2 = 6.
Notice that book number 2 does not have to be on the first shelf.

Example 2:
Input: books = [[1,3],[2,4],[3,2]], shelfWidth = 6
Output: 4

Constraints:
1 <= books.length <= 1000
1 <= thicknessi <= shelfWidth <= 1000
1 <= heighti <= 1000

</> Typescript Code:
*/

function minHeightShelves(books: number[][], shelfWidth: number): number {
  // Number of books
  const n = books.length;
  // Array to store minimum heights
  const dp = new Array(n + 1).fill(0);

  // Loop through each book
  for (let i = 1; i <= n; i++) {
    // Initialize variables for current book's width and height
    let width = books[i - 1][0];
    let height = books[i - 1][1];
    // Initially, set dp[i] to the height of placing only this book on a new shelf
    dp[i] = dp[i - 1] + height;

    // Try placing current book with previous books to minimize shelf height
    for (let j = i - 1; j > 0 && width + books[j - 1][0] <= shelfWidth; j--) {
      // Update the maximum height encountered in this configuration
      height = Math.max(height, books[j - 1][1]);
      // Accumulate width of books being placed on the current shelf
      width += books[j - 1][0];
      // Update dp[i] to the minimum height of the current configuration
      dp[i] = Math.min(dp[i], dp[j - 1] + height);
    }
  }

  // Return the minimum possible height of the bookshelf
  return dp[n];
}

/* 
2134. Minimum Swaps to Group All 1's Together II

A swap is defined as taking two distinct positions in an array and swapping the values in them.

A circular array is defined as an array where we consider the first element and the last element to be adjacent.

Given a binary circular array nums, return the minimum number of swaps required to group all 1's present in the array together at any location.

Example 1:
Input: nums = [0,1,0,1,1,0,0]
Output: 1
Explanation: Here are a few of the ways to group all the 1's together:
[0,0,1,1,1,0,0] using 1 swap.
[0,1,1,1,0,0,0] using 1 swap.
[1,1,0,0,0,0,1] using 2 swaps (using the circular property of the array).
There is no way to group all 1's together with 0 swaps.
Thus, the minimum number of swaps required is 1.

Example 2:
Input: nums = [0,1,1,1,0,0,1,1,0]
Output: 2
Explanation: Here are a few of the ways to group all the 1's together:
[1,1,1,0,0,0,0,1,1] using 2 swaps (using the circular property of the array).
[1,1,1,1,1,0,0,0,0] using 2 swaps.
There is no way to group all 1's together with 0 or 1 swaps.
Thus, the minimum number of swaps required is 2.

Example 3:
Input: nums = [1,1,0,0,1]
Output: 0
Explanation: All the 1's are already grouped together due to the circular property of the array.
Thus, the minimum number of swaps required is 0.

Constraints:
1 <= nums.length <= 10^5
nums[i] is either 0 or 1.

</> Typescript Code:
*/

function minSwaps(nums: number[]): number {
  // Calculate the total number of 1's in the array
  const totalOnes = nums.reduce((sum, num) => sum + num, 0);
  const n = nums.length; // Length of the array
  let currentOnes = 0; // Initialize the count of 1's in the current window

  // Calculate the number of 1's in the first window of size totalOnes
  for (let i = 0; i < totalOnes; i++) {
    currentOnes += nums[i];
  }

  let maxOnesInWindow = currentOnes; // Store the maximum number of 1's in any window of size totalOnes

  // Slide the window through the array to find the maximum number of 1's in any window of size totalOnes
  for (let i = 1; i < n; i++) {
    // Update the current window's count of 1's by removing the first element of the previous window and adding the next element
    currentOnes = currentOnes - nums[i - 1] + nums[(i + totalOnes - 1) % n];
    // Update the maximum number of 1's found in any window
    maxOnesInWindow = Math.max(maxOnesInWindow, currentOnes);
  }

  // The minimum swaps needed is the difference between the total number of 1's and the maximum number of 1's in any window
  return totalOnes - maxOnesInWindow;
}

/* 
1508. Range Sum of Sorted Subarray Sums

You are given the array nums consisting of n positive integers. You computed the sum of all non-empty continuous subarrays from the array and then sorted them in non-decreasing order, creating a new array of n * (n + 1) / 2 numbers.

Return the sum of the numbers from index left to index right (indexed from 1), inclusive, in the new array. Since the answer can be a huge number return it modulo 109 + 7.

Example 1:
Input: nums = [1,2,3,4], n = 4, left = 1, right = 5
Output: 13 
Explanation: All subarray sums are 1, 3, 6, 10, 2, 5, 9, 3, 7, 4. After sorting them in non-decreasing order we have the new array [1, 2, 3, 3, 4, 5, 6, 7, 9, 10]. The sum of the numbers from index le = 1 to ri = 5 is 1 + 2 + 3 + 3 + 4 = 13. 

Example 2:
Input: nums = [1,2,3,4], n = 4, left = 3, right = 4
Output: 6
Explanation: The given array is the same as example 1. We have the new array [1, 2, 3, 3, 4, 5, 6, 7, 9, 10]. The sum of the numbers from index le = 3 to ri = 4 is 3 + 3 = 6.

Example 3:
Input: nums = [1,2,3,4], n = 4, left = 1, right = 10
Output: 50

Constraints:
n == nums.length
1 <= nums.length <= 1000
1 <= nums[i] <= 100
1 <= left <= right <= n * (n + 1) / 2

</> Typescript Code:
*/

function rangeSum(nums: number[], n: number, left: number, right: number): number {
  const MOD = 1_000_000_007; // Define the modulus to handle large numbers
  const minHeap: number[] = []; // Array to store all subarray sums
  let result = 0; // Variable to store the final result

  // Generate all possible subarray sums
  for (let i = 0; i < n; i++) {
    let sum = 0; // Variable to accumulate the sum of the current subarray
    for (let j = i; j < n; j++) {
      sum += nums[j]; // Add current element to the subarray sum
      minHeap.push(sum); // Store the sum of the current subarray
    }
  }

  minHeap.sort((a, b) => a - b); // Sort the list of subarray sums

  // Compute the sum of elements from index left to right (1-based indexing)
  for (let i = left - 1; i < right; i++) {
    result = (result + minHeap[i]) % MOD; // Add the current element to the result and apply modulus
  }

  return result; // Return the final result
}

/* 
3016. Minimum Number of Pushes to Type Word II

You are given a string word containing lowercase English letters.

Telephone keypads have keys mapped with distinct collections of lowercase English letters, which can be used to form words by pushing them. For example, the key 2 is mapped with ["a","b","c"], we need to push the key one time to type "a", two times to type "b", and three times to type "c" .

It is allowed to remap the keys numbered 2 to 9 to distinct collections of letters. The keys can be remapped to any amount of letters, but each letter must be mapped to exactly one key. You need to find the minimum number of times the keys will be pushed to type the string word.

Return the minimum number of pushes needed to type word after remapping the keys.

An example mapping of letters to keys on a telephone keypad is given below. Note that 1, *, #, and 0 do not map to any letters.

Example 1:
Input: word = "abcde"
Output: 5
Explanation: The remapped keypad given in the image provides the minimum cost.
"a" -> one push on key 2
"b" -> one push on key 3
"c" -> one push on key 4
"d" -> one push on key 5
"e" -> one push on key 6
Total cost is 1 + 1 + 1 + 1 + 1 = 5.
It can be shown that no other mapping can provide a lower cost.

Example 2:
Input: word = "xyzxyzxyzxyz"
Output: 12
Explanation: The remapped keypad given in the image provides the minimum cost.
"x" -> one push on key 2
"y" -> one push on key 3
"z" -> one push on key 4
Total cost is 1 * 4 + 1 * 4 + 1 * 4 = 12
It can be shown that no other mapping can provide a lower cost.
Note that the key 9 is not mapped to any letter: it is not necessary to map letters to every key, but to map all the letters.

Example 3:
Input: word = "aabbccddeeffgghhiiiiii"
Output: 24
Explanation: The remapped keypad given in the image provides the minimum cost.
"a" -> one push on key 2
"b" -> one push on key 3
"c" -> one push on key 4
"d" -> one push on key 5
"e" -> one push on key 6
"f" -> one push on key 7
"g" -> one push on key 8
"h" -> two pushes on key 9
"i" -> one push on key 9
Total cost is 1 * 2 + 1 * 2 + 1 * 2 + 1 * 2 + 1 * 2 + 1 * 2 + 1 * 2 + 2 * 2 + 6 * 1 = 24.
It can be shown that no other mapping can provide a lower cost.

Constraints:
1 <= word.length <= 10^5
word consists of lowercase English letters.

</> Typescript Code:
*/

function minimumPushes(word: string): number {
  // Calculate the frequencies of each letter in the word
  const frequencies: number[] = new Array(26).fill(0); // Frequency array for letters 'a' to 'z'
  const offset = 'a'.charCodeAt(0); // Character code offset for 'a'
  for (let i = 0; i < word.length; ++i) {
    const index = word.charCodeAt(i) - offset; // Calculate index for the letter
    frequencies[index]++; // Increment frequency count for the letter
  }

  // Sort the frequencies in descending order
  frequencies.sort((a, b) => b - a);

  // Initialize variables to track key mappings and total pushes
  const numKeyMappings: number[] = new Array(9).fill(0); // There are 9 keys (2 to 9)
  let minPushes = 0; // Total pushes required
  for (let i = 0; i < frequencies.length; ++i) {
    const frequency = frequencies[i];
    if (frequency === 0) break; // Break if no more characters to account for

    // Map the current letter frequency to a key, counting pushes
    const keyPosition = Math.floor(i / 9); // Determine which key this letter will map to
    minPushes += (keyPosition + 1) * frequency; // Accumulate pushes (1 push for first key, 2 for second, etc.)
  }
  return minPushes; // Return the total pushes required
}

/* 
885. Spiral Matrix III

You start at the cell (rStart, cStart) of an rows x cols grid facing east. The northwest corner is at the first row and column in the grid, and the southeast corner is at the last row and column.

You will walk in a clockwise spiral shape to visit every position in this grid. Whenever you move outside the grid's boundary, we continue our walk outside the grid (but may return to the grid boundary later.). Eventually, we reach all rows * cols spaces of the grid.

Return an array of coordinates representing the positions of the grid in the order you visited them.

Example 1:
Input: rows = 1, cols = 4, rStart = 0, cStart = 0
Output: [[0,0],[0,1],[0,2],[0,3]]

Example 2:
Input: rows = 5, cols = 6, rStart = 1, cStart = 4
Output: [[1,4],[1,5],[2,5],[2,4],[2,3],[1,3],[0,3],[0,4],[0,5],[3,5],[3,4],[3,3],[3,2],[2,2],[1,2],[0,2],[4,5],[4,4],[4,3],[4,2],[4,1],[3,1],[2,1],[1,1],[0,1],[4,0],[3,0],[2,0],[1,0],[0,0]]

Constraints:
1 <= rows, cols <= 100
0 <= rStart < rows
0 <= cStart < cols

</> Typescript Code:
*/

function spiralMatrixIII(rows: number, cols: number, rStart: number, cStart: number): number[][] {
  // Initialize the result array to store the coordinates in the spiral order
  const result: number[][] = [];

  // Calculate the total number of cells to visit
  const totalCells = rows * cols;

  // Define the directions for movement: right, down, left, up
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  // Initialize the number of steps to take in the current direction
  let steps = 1;

  // Initialize the index to keep track of the current direction
  let directionIndex = 0;

  // Start at the given starting position
  let currentRow = rStart;
  let currentCol = cStart;

  // Add the starting position to the result
  result.push([currentRow, currentCol]);

  // Continue until all cells are visited
  while (result.length < totalCells) {
    // Perform two iterations for each steps count
    for (let i = 0; i < 2; i++) {
      // Move in the current direction for the current number of steps
      for (let j = 0; j < steps; j++) {
        currentRow += directions[directionIndex][0];
        currentCol += directions[directionIndex][1];

        // Check if the current position is within the grid bounds
        if (currentRow >= 0 && currentRow < rows && currentCol >= 0 && currentCol < cols) {
          // Add the current position to the result
          result.push([currentRow, currentCol]);
        }
      }
      // Change direction to the next in the sequence
      directionIndex = (directionIndex + 1) % 4;
    }
    // Increase the number of steps for the next set of movements
    steps++;
  }

  // Return the result array with the coordinates in spiral order
  return result;
}

/* 
840. Magic Squares In Grid

A 3 x 3 magic square is a 3 x 3 grid filled with distinct numbers from 1 to 9 such that each row, column, and both diagonals all have the same sum.

Given a row x col grid of integers, how many 3 x 3 contiguous magic square subgrids are there?

Note: while a magic square can only contain numbers from 1 to 9, grid may contain numbers up to 15.

Example 1:
Input: grid = [[4,3,8,4],[9,5,1,9],[2,7,6,2]]
Output: 1
Explanation: 
The following subgrid is a 3 x 3 magic square:
while this one is not:
In total, there is only one magic square inside the given grid.

Example 2:
Input: grid = [[8]]
Output: 0

Constraints:
row == grid.length
col == grid[i].length
1 <= row, col <= 10
0 <= grid[i][j] <= 15

</> Typescript Code:
*/

function numMagicSquaresInside(grid: number[][]): number {
  let count = 0; // Initialize the count of magic squares found
  const isMagicSquare = (x: number, y: number): boolean => {
    const nums = new Set<number>(); // Set to store unique numbers
    let sum = 0; // Variable to store the sum of the first row
    for (let i = 0; i < 3; i++) {
      // Iterate through 3 rows
      for (let j = 0; j < 3; j++) {
        // Iterate through 3 columns
        const val = grid[x + i][y + j]; // Get the current value
        if (val < 1 || val > 9 || nums.has(val)) return false; // Check if the value is out of range or duplicate
        nums.add(val); // Add value to the set
        if (i === 0) sum += val; // Add to sum only from the first row
      }
    }
    // Check sums of rows and columns
    for (let i = 0; i < 3; i++) {
      let rowSum = 0,
        colSum = 0; // Initialize sums for current row and column
      for (let j = 0; j < 3; j++) {
        rowSum += grid[x + i][y + j]; // Sum the current row
        colSum += grid[x + j][y + i]; // Sum the current column
      }
      if (rowSum !== sum || colSum !== sum) return false; // Check if sums match the first row
    }
    // Check sums of the two diagonals
    const diag1 = grid[x][y] + grid[x + 1][y + 1] + grid[x + 2][y + 2]; // Sum of left-to-right diagonal
    const diag2 = grid[x][y + 2] + grid[x + 1][y + 1] + grid[x + 2][y]; // Sum of right-to-left diagonal
    return diag1 === sum && diag2 === sum; // Return true if both diagonals match the sum
  };
  // Iterate through the grid to check every 3x3 subgrid
  for (let i = 0; i <= grid.length - 3; i++) {
    for (let j = 0; j <= grid[0].length - 3; j++) {
      if (isMagicSquare(i, j)) count++; // Increment count if a magic square is found
    }
  }
  return count; // Return the total count of magic squares found
}

/* 
959. Regions Cut By Slashes

An n x n grid is composed of 1 x 1 squares where each 1 x 1 square consists of a '/', '\', or blank space ' '. These characters divide the square into contiguous regions.

Given the grid grid represented as a string array, return the number of regions.

Note that backslash characters are escaped, so a '\' is represented as '\\'.

Example 1:
Input: grid = [" /","/ "]
Output: 2

Example 2:
Input: grid = [" /","  "]
Output: 1

Example 3:
Input: grid = ["/\\","\\/"]
Output: 5
Explanation: Recall that because \ characters are escaped, "\\/" refers to \/, and "/\\" refers to /\.

Constraints:
n == grid.length == grid[i].length
1 <= n <= 30
grid[i][j] is either '/', '\', or ' '.

</> Typescript Code:
*/

function regionsBySlashes(grid: string[]): number {
  const n = grid.length; // Determine the size of the grid.
  const parent = new Array(4 * n * n).fill(0).map((_, i) => i); // Initialize the Union-Find structure for 4 regions per cell.

  // Function to find the root of a component with path compression.
  const find = (x: number): number => {
    if (parent[x] !== x) {
      // If x is not its own parent, recursively find the root.
      parent[x] = find(parent[x]); // Path compression for optimization.
    }
    return parent[x]; // Return the root.
  };

  // Function to unify two components.
  const union = (x: number, y: number) => {
    const rootX = find(x); // Find the root of x.
    const rootY = find(y); // Find the root of y.
    if (rootX !== rootY) {
      // If they are not already unified,
      parent[rootY] = rootX; // unify them by setting one root to the other.
    }
  };

  // Traverse each cell in the grid.
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const root = 4 * (i * n + j); // Calculate the index of the top-left part of the current cell in the Union-Find structure.
      const char = grid[i][j]; // Get the character in the current cell.

      // Union parts within the same cell based on the character.
      if (char === '/') {
        union(root + 0, root + 3); // Connect top to left.
        union(root + 1, root + 2); // Connect right to bottom.
      } else if (char === '\\') {
        union(root + 0, root + 1); // Connect top to right.
        union(root + 2, root + 3); // Connect bottom to left.
      } else {
        union(root + 0, root + 1); // Connect top to right.
        union(root + 1, root + 2); // Connect right to bottom.
        union(root + 2, root + 3); // Connect bottom to left.
      }

      // Union parts between adjacent cells.
      if (i > 0) union(root + 0, root - 4 * n + 2); // Connect top of current cell to bottom of the cell above.
      if (j > 0) union(root + 3, root - 4 + 1); // Connect left of current cell to right of the cell on the left.
    }
  }

  let regions = 0; // Initialize the region counter.
  for (let i = 0; i < 4 * n * n; i++) {
    // Traverse all components in the Union-Find structure.
    if (find(i) === i) regions++; // Count the number of unique regions.
  }

  return regions; // Return the total number of regions.
}

/* 
40. Combination Sum II

Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

Each number in candidates may only be used once in the combination.

Note: The solution set must not contain duplicate combinations.

Example 1:
Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: 
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]

Example 2:
Input: candidates = [2,5,2,1,2], target = 5
Output: 
[
[1,2,2],
[5]
]

Constraints:
1 <= candidates.length <= 100
1 <= candidates[i] <= 50
1 <= target <= 30

</> Typescript Code:
*/

function combinationSum2(candidates: number[], target: number): number[][] {
  // Sort the candidates array to help with skipping duplicates and early termination
  candidates.sort((a, b) => a - b);
  // Initialize the results array to store the valid combinations
  const results: number[][] = [];

  // Define the backtrack function to explore combinations
  const backtrack = (start: number, target: number, path: number[]) => {
    // If the target is 0, we found a valid combination, add it to the results
    if (target === 0) {
      results.push([...path]);
      return;
    }
    // Loop through the candidates starting from the 'start' index
    for (let i = start; i < candidates.length; i++) {
      // Skip duplicates by checking if the current candidate is the same as the previous one
      if (i > start && candidates[i] === candidates[i - 1]) continue;
      // If the current candidate exceeds the target, break the loop (early termination)
      if (candidates[i] > target) break;
      // Add the current candidate to the path and backtrack with the reduced target
      path.push(candidates[i]);
      backtrack(i + 1, target - candidates[i], path);
      // Remove the last candidate from the path to explore other combinations
      path.pop();
    }
  };

  // Start backtracking with the initial parameters
  backtrack(0, target, []);
  // Return the list of valid combinations
  return results;
}

/* 
624. Maximum Distance in Arrays

You are given m arrays, where each array is sorted in ascending order.

You can pick up two integers from two different arrays (each array picks one) and calculate the distance. We define the distance between two integers a and b to be their absolute difference |a - b|.

Return the maximum distance.

Example 1:
Input: arrays = [[1,2,3],[4,5],[1,2,3]]
Output: 4
Explanation: One way to reach the maximum distance 4 is to pick 1 in the first or third array and pick 5 in the second array.

Example 2:
Input: arrays = [[1],[1]]
Output: 0

Constraints:
m == arrays.length
2 <= m <= 10^5
1 <= arrays[i].length <= 500
-10^4 <= arrays[i][j] <= 10^4
arrays[i] is sorted in ascending order.
There will be at most 105 integers in all the arrays.

</> Typescript Code:
*/

function maxDistance(arrays: number[][]): number {
  // Initialize min and max with the first array's values
  let min = arrays[0][0];
  let max = arrays[0][arrays[0].length - 1];

  // Initialize the result to track the maximum distance found
  let result = 0;

  // Iterate through each subsequent array
  for (let i = 1; i < arrays.length; i++) {
    // Get the current array's minimum and maximum values
    const currentMin = arrays[i][0];
    const currentMax = arrays[i][arrays[i].length - 1];

    // Update result with the maximum distance found
    result = Math.max(result, Math.abs(currentMax - min));
    result = Math.max(result, Math.abs(currentMin - max));

    // Update min and max for the next iteration
    min = Math.min(min, currentMin);
    max = Math.max(max, currentMax);
  }

  // Return the maximum distance found
  return result;
}

/* 
1937. Maximum Number of Points with Cost

You are given an m x n integer matrix points (0-indexed). Starting with 0 points, you want to maximize the number of points you can get from the matrix.

To gain points, you must pick one cell in each row. Picking the cell at coordinates (r, c) will add points[r][c] to your score.

However, you will lose points if you pick a cell too far from the cell that you picked in the previous row. For every two adjacent rows r and r + 1 (where 0 <= r < m - 1), picking cells at coordinates (r, c1) and (r + 1, c2) will subtract abs(c1 - c2) from your score.

Return the maximum number of points you can achieve.

abs(x) is defined as:
x for x >= 0.
-x for x < 0.

Example 1:
Input: points = [[1,2,3],[1,5,1],[3,1,1]]
Output: 9
Explanation:
The blue cells denote the optimal cells to pick, which have coordinates (0, 2), (1, 1), and (2, 0).
You add 3 + 5 + 3 = 11 to your score.
However, you must subtract abs(2 - 1) + abs(1 - 0) = 2 from your score.
Your final score is 11 - 2 = 9.

Example 2:
Input: points = [[1,5],[2,3],[4,2]]
Output: 11
Explanation:
The blue cells denote the optimal cells to pick, which have coordinates (0, 1), (1, 1), and (2, 0).
You add 5 + 3 + 4 = 12 to your score.
However, you must subtract abs(1 - 1) + abs(1 - 0) = 1 from your score.
Your final score is 12 - 1 = 11.

Constraints:
m == points.length
n == points[r].length
1 <= m, n <= 10^5
1 <= m * n <= 10^5
0 <= points[r][c] <= 10^5

</> Typescript Code:
*/

function maxPoints(points: number[][]): number {
  // Number of rows
  const m = points.length;
  // Number of columns
  const n = points[0].length;

  // Array to store the maximum points attainable from the previous row
  let previousRow = points[0].slice();

  // Loop over each row starting from the second row
  for (let i = 1; i < m; i++) {
    // Arrays to store max points considering left and right movements
    const left = new Array(n).fill(0);
    const right = new Array(n).fill(0);
    // Copy of the current row's points
    const currentRow = points[i].slice();

    // Calculate the maximum points if we move left-to-right
    left[0] = previousRow[0];
    for (let j = 1; j < n; j++) {
      left[j] = Math.max(left[j - 1] - 1, previousRow[j]);
    }

    // Calculate the maximum points if we move right-to-left
    right[n - 1] = previousRow[n - 1];
    for (let j = n - 2; j >= 0; j--) {
      right[j] = Math.max(right[j + 1] - 1, previousRow[j]);
    }

    // Calculate the optimal points for the current row by considering both directions
    for (let j = 0; j < n; j++) {
      currentRow[j] += Math.max(left[j], right[j]);
    }

    // Update the previous row to the current one
    previousRow = currentRow;
  }

  // The final result is the maximum value in the last row
  return Math.max(...previousRow);
}

/* 
264. Ugly Number II

An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5.

Given an integer n, return the nth ugly number.

Example 1:
Input: n = 10
Output: 12
Explanation: [1, 2, 3, 4, 5, 6, 8, 9, 10, 12] is the sequence of the first 10 ugly numbers.

Example 2:
Input: n = 1
Output: 1
Explanation: 1 has no prime factors, therefore all of its prime factors are limited to 2, 3, and 5.

Constraints:
1 <= n <= 1690

</> Typescript Code:
*/

function nthUglyNumber(n: number): number {
  // Initialize the list with the first ugly number, which is 1
  const uglyNumbers: number[] = [1];

  // Initialize indices for the multiples of 2, 3, and 5
  let i2 = 0,
    i3 = 0,
    i5 = 0;

  // Iterate until we find the nth ugly number
  while (uglyNumbers.length < n) {
    // Calculate the next potential ugly number from the smallest multiple of 2, 3, or 5
    const nextUgly = Math.min(uglyNumbers[i2] * 2, uglyNumbers[i3] * 3, uglyNumbers[i5] * 5);

    // Add the next ugly number to the list
    uglyNumbers.push(nextUgly);

    // Increment the index corresponding to the factor that produced the next ugly number
    if (nextUgly === uglyNumbers[i2] * 2) i2++;
    if (nextUgly === uglyNumbers[i3] * 3) i3++;
    if (nextUgly === uglyNumbers[i5] * 5) i5++;
  }

  // Return the nth ugly number
  return uglyNumbers[n - 1];
}

/* 
650. 2 Keys Keyboard

There is only one character 'A' on the screen of a notepad. You can perform one of two operations on this notepad for each step:

Copy All: You can copy all the characters present on the screen (a partial copy is not allowed).
Paste: You can paste the characters which are copied last time.
Given an integer n, return the minimum number of operations to get the character 'A' exactly n times on the screen.

Example 1:
Input: n = 3
Output: 3
Explanation: Initially, we have one character 'A'.
In step 1, we use Copy All operation.
In step 2, we use Paste operation to get 'AA'.
In step 3, we use Paste operation to get 'AAA'.

Example 2:
Input: n = 1
Output: 0

Constraints:
1 <= n <= 1000

</> Typescript Code:
*/

function minSteps(n: number): number {
  // Base case: if n is 1, no operations are needed.
  if (n === 1) return 0;

  // Initialize the step counter.
  let steps = 0;

  // Start checking from 2 up to n.
  for (let i = 2; i <= n; i++) {
    // While i is a factor of n,
    // this means we can perform 'Copy All' and 'Paste' operations.
    while (n % i === 0) {
      // Add the number of operations needed to make i copies (Copy All + Paste).
      steps += i;
      // Divide n by i to process the next factor.
      n /= i;
    }
  }

  // Return the total number of operations needed.
  return steps;
}

/* 
1140. Stone Game II

Alice and Bob continue their games with piles of stones.  There are a number of piles arranged in a row, and each pile has a positive integer number of stones piles[i].  The objective of the game is to end with the most stones. 

Alice and Bob take turns, with Alice starting first.  Initially, M = 1.

On each player's turn, that player can take all the stones in the first X remaining piles, where 1 <= X <= 2M.  Then, we set M = max(M, X).

The game continues until all the stones have been taken.

Assuming Alice and Bob play optimally, return the maximum number of stones Alice can get.

Example 1:
Input: piles = [2,7,9,4,4]
Output: 10
Explanation:  If Alice takes one pile at the beginning, Bob takes two piles, then Alice takes 2 piles again. Alice can get 2 + 4 + 4 = 10 piles in total. If Alice takes two piles at the beginning, then Bob can take all three piles left. In this case, Alice get 2 + 7 = 9 piles in total. So we return 10 since it's larger. 

Example 2:
Input: piles = [1,2,3,4,5,100]
Output: 104

Constraints:
1 <= piles.length <= 100
1 <= piles[i] <= 10^4

</> Typescript Code:
*/

function stoneGameII(piles: number[]): number {
  // Number of piles
  const n = piles.length;

  // DP table initialized with 0, where dp[i][m] represents the maximum stones Alice can get
  // if starting from index i with M value m
  const dp = Array.from({length: n + 1}, () => Array(n + 1).fill(0));

  // Suffix sum array to quickly calculate the total remaining stones from index i to the end
  const suffixSum = piles.slice();

  // Compute suffix sums in reverse order
  for (let i = n - 2; i >= 0; i--) {
    suffixSum[i] += suffixSum[i + 1];
  }

  // Recursive function with memoization to solve the problem
  function dfs(i: number, m: number): number {
    // Base case: no more piles to take
    if (i >= n) return 0;

    // If all remaining piles can be taken, return their sum
    if (2 * m >= n - i) return suffixSum[i];

    // Return already computed result to avoid recomputation
    if (dp[i][m] > 0) return dp[i][m];

    // Minimize the opponent's stones to maximize Alice's stones
    let minOpponentStones = Infinity;

    // Try all valid x values (1 <= x <= 2 * m)
    for (let x = 1; x <= 2 * m; x++) {
      // Calculate the stones opponent can get in the worst case
      minOpponentStones = Math.min(minOpponentStones, dfs(i + x, Math.max(m, x)));
    }

    // Maximize Alice's stones by subtracting opponent's minimum possible stones from total
    dp[i][m] = suffixSum[i] - minOpponentStones;
    return dp[i][m];
  }

  // Start the game from index 0 with M = 1
  return dfs(0, 1);
}

/* 
592. Fraction Addition and Subtraction

Given a string expression representing an expression of fraction addition and subtraction, return the calculation result in string format.

The final result should be an irreducible fraction. If your final result is an integer, change it to the format of a fraction that has a denominator 1. So in this case, 2 should be converted to 2/1.

Example 1:
Input: expression = "-1/2+1/2"
Output: "0/1"

Example 2:
Input: expression = "-1/2+1/2+1/3"
Output: "1/3"

Example 3:
Input: expression = "1/3-1/2"
Output: "-1/6"

Constraints:
The input string only contains '0' to '9', '/', '+' and '-'. So does the output.
Each fraction (input and output) has the format ±numerator/denominator. If the first input fraction or the output is positive, then '+' will be omitted.
The input only contains valid irreducible fractions, where the numerator and denominator of each fraction will always be in the range [1, 10]. If the denominator is 1, it means this fraction is actually an integer in a fraction format defined above.
The number of given fractions will be in the range [1, 10].
The numerator and denominator of the final result are guaranteed to be valid and in the range of 32-bit int.

</> Typescript Code:
*/

function fractionAddition(expression: string): string {
  // Helper function to compute the Greatest Common Divisor (GCD)
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

  // Initialize the numerator to 0 and the denominator to 1 for the final fraction
  let numerator = 0,
    denominator = 1,
    i = 0;

  // Iterate through the expression string
  while (i < expression.length) {
    let sign = 1;

    // Check for a sign at the current position (either '+' or '-')
    if (expression[i] === '+' || expression[i] === '-') {
      // Adjust the sign based on the current character
      sign = expression[i] === '-' ? -1 : 1;
      i++;
    }

    // Initialize numerator and denominator for the current fraction
    let num = 0,
      denom = 0;

    // Parse the numerator part of the fraction
    while (i < expression.length && expression[i] !== '/') {
      num = num * 10 + Number(expression[i]);
      i++;
    }
    i++; // Skip the '/' character

    // Parse the denominator part of the fraction
    while (i < expression.length && expression[i] >= '0' && expression[i] <= '9') {
      denom = denom * 10 + Number(expression[i]);
      i++;
    }

    // Update the global numerator and denominator using the current fraction
    numerator = numerator * denom + sign * num * denominator;
    denominator *= denom;

    // Simplify the fraction by dividing by the GCD
    const divisor = gcd(Math.abs(numerator), denominator);
    numerator /= divisor;
    denominator /= divisor;
  }

  // Return the result as a string in the format "numerator/denominator"
  return `${numerator}/${denominator}`;
}

/* 
1514. Path with Maximum Probability

You are given an undirected weighted graph of n nodes (0-indexed), represented by an edge list where edges[i] = [a, b] is an undirected edge connecting the nodes a and b with a probability of success of traversing that edge succProb[i].

Given two nodes start and end, find the path with the maximum probability of success to go from start to end and return its success probability.

If there is no path from start to end, return 0. Your answer will be accepted if it differs from the correct answer by at most 1e-5.

Example 1:
Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2
Output: 0.25000
Explanation: There are two paths from start to end, one having a probability of success = 0.2 and the other has 0.5 * 0.5 = 0.25.

Example 2:
Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start = 0, end = 2
Output: 0.30000

Example 3:
Input: n = 3, edges = [[0,1]], succProb = [0.5], start = 0, end = 2
Output: 0.00000
Explanation: There is no path between 0 and 2.

Constraints:
2 <= n <= 10^4
0 <= start, end < n
start != end
0 <= a, b < n
a != b
0 <= succProb.length == edges.length <= 2*10^4
0 <= succProb[i] <= 1
There is at most one edge between every two nodes.

</> Typescript Code:
*/

class MaxHeap {
  heap: [number, number][];

  constructor() {
    this.heap = [];
  }

  // Insert a node into the heap and adjust its position to maintain the heap property.
  insert(node: [number, number]) {
    this.heap.push(node);
    this.bubbleUp();
  }

  // Extract the maximum element from the heap (the root) and adjust the heap.
  extractMax(): [number, number] | undefined {
    if (this.heap.length === 1) return this.heap.pop();
    const max = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.bubbleDown();
    return max;
  }

  // Move the last inserted node up to maintain the max-heap property.
  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index][0] <= this.heap[parentIndex][0]) break;
      [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
      index = parentIndex;
    }
  }

  // Move the root node down to maintain the max-heap property after extraction.
  bubbleDown() {
    let index = 0;
    const length = this.heap.length;
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let swapIndex: number | null = null;

      if (leftChildIndex < length) {
        if (this.heap[leftChildIndex][0] > this.heap[index][0]) {
          swapIndex = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        if (
          (swapIndex === null && this.heap[rightChildIndex][0] > this.heap[index][0]) ||
          (swapIndex !== null && this.heap[rightChildIndex][0] > this.heap[leftChildIndex][0])
        ) {
          swapIndex = rightChildIndex;
        }
      }

      if (swapIndex === null) break;
      [this.heap[index], this.heap[swapIndex]] = [this.heap[swapIndex], this.heap[index]];
      index = swapIndex;
    }
  }

  // Return the size of the heap.
  size() {
    return this.heap.length;
  }
}

// Function to calculate the maximum probability path using Dijkstra's algorithm and a max-heap.
function maxProbability(
  n: number,
  edges: number[][],
  succProb: number[],
  start_node: number,
  end_node: number,
): number {
  // Build the graph as an adjacency list.
  const graph: Map<number, [number, number][]> = new Map();
  for (let i = 0; i < edges.length; i++) {
    const [a, b] = edges[i];
    if (!graph.has(a)) graph.set(a, []);
    if (!graph.has(b)) graph.set(b, []);
    graph.get(a)!.push([b, succProb[i]]);
    graph.get(b)!.push([a, succProb[i]]);
  }

  // Array to store the maximum probability of reaching each node.
  const probabilities: number[] = Array(n).fill(0);
  probabilities[start_node] = 1;

  // Priority queue (max-heap) to manage the traversal of nodes by their probability.
  const maxHeap = new MaxHeap();
  maxHeap.insert([1, start_node]);

  while (maxHeap.size()) {
    // Extract the node with the highest probability.
    const [current_prob, current_node] = maxHeap.extractMax()!;
    if (current_node === end_node) return current_prob;

    // Traverse all neighbors of the current node.
    for (const [neighbor, prob] of graph.get(current_node) || []) {
      const new_prob = current_prob * prob;
      // If a higher probability path is found, update and insert into the heap.
      if (new_prob > probabilities[neighbor]) {
        probabilities[neighbor] = new_prob;
        maxHeap.insert([new_prob, neighbor]);
      }
    }
  }

  // If no path is found, return 0.
  return 0;
}

/* 
1905. Count Sub Islands

You are given two m x n binary matrices grid1 and grid2 containing only 0's (representing water) and 1's (representing land). An island is a group of 1's connected 4-directionally (horizontal or vertical). Any cells outside of the grid are considered water cells.

An island in grid2 is considered a sub-island if there is an island in grid1 that contains all the cells that make up this island in grid2.

Return the number of islands in grid2 that are considered sub-islands.

Example 1:
Input: grid1 = [[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]], grid2 = [[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]]
Output: 3
Explanation: In the picture above, the grid on the left is grid1 and the grid on the right is grid2.
The 1s colored red in grid2 are those considered to be part of a sub-island. There are three sub-islands.

Example 2:
Input: grid1 = [[1,0,1,0,1],[1,1,1,1,1],[0,0,0,0,0],[1,1,1,1,1],[1,0,1,0,1]], grid2 = [[0,0,0,0,0],[1,1,1,1,1],[0,1,0,1,0],[0,1,0,1,0],[1,0,0,0,1]]
Output: 2 
Explanation: In the picture above, the grid on the left is grid1 and the grid on the right is grid2.
The 1s colored red in grid2 are those considered to be part of a sub-island. There are two sub-islands.

Constraints:
m == grid1.length == grid2.length
n == grid1[i].length == grid2[i].length
1 <= m, n <= 500
grid1[i][j] and grid2[i][j] are either 0 or 1.

</> Typescript Code:
*/

function countSubIslands(grid1: number[][], grid2: number[][]): number {
  const m = grid1.length,
    n = grid1[0].length; // Dimensions of the grids
  let count = 0; // Counter for sub-islands

  // Depth-First Search function to check if all parts of the island in grid2 are in grid1
  const dfs = (i: number, j: number): boolean => {
    if (i < 0 || j < 0 || i >= m || j >= n || grid2[i][j] === 0) return true; // Out of bounds or water
    if (grid1[i][j] === 0) return false; // If grid1 doesn't have land, it's not a sub-island
    grid2[i][j] = 0; // Mark the current cell as visited in grid2
    const up = dfs(i - 1, j); // Check up
    const down = dfs(i + 1, j); // Check down
    const left = dfs(i, j - 1); // Check left
    const right = dfs(i, j + 1); // Check right
    return up && down && left && right; // Return true if all parts are valid sub-islands
  };

  // Iterate through all cells in the grid
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid2[i][j] === 1 && dfs(i, j)) {
        // If part of an island is found in grid2 and it's a sub-island
        count++; // Increment the sub-island counter
      }
    }
  }

  return count; // Return the total number of sub-islands
}

/* 
947. Most Stones Removed with Same Row or Column

On a 2D plane, we place n stones at some integer coordinate points. Each coordinate point may have at most one stone.

A stone can be removed if it shares either the same row or the same column as another stone that has not been removed.

Given an array stones of length n where stones[i] = [xi, yi] represents the location of the ith stone, return the largest possible number of stones that can be removed.

Example 1:
Input: stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]
Output: 5
Explanation: One way to remove 5 stones is as follows:
1. Remove stone [2,2] because it shares the same row as [2,1].
2. Remove stone [2,1] because it shares the same column as [0,1].
3. Remove stone [1,2] because it shares the same row as [1,0].
4. Remove stone [1,0] because it shares the same column as [0,0].
5. Remove stone [0,1] because it shares the same row as [0,0].
Stone [0,0] cannot be removed since it does not share a row/column with another stone still on the plane.

Example 2:
Input: stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]
Output: 3
Explanation: One way to make 3 moves is as follows:
1. Remove stone [2,2] because it shares the same row as [2,0].
2. Remove stone [2,0] because it shares the same column as [0,0].
3. Remove stone [0,2] because it shares the same row as [0,0].
Stones [0,0] and [1,1] cannot be removed since they do not share a row/column with another stone still on the plane.

Example 3:
Input: stones = [[0,0]]
Output: 0
Explanation: [0,0] is the only stone on the plane, so you cannot remove it.

Constraints:
1 <= stones.length <= 1000
0 <= xi, yi <= 10^4
No two stones are at the same coordinate point.

</> Typescript Code:
*/

function removeStones(stones: number[][]): number {
  // Map to store the parent of each node in the union-find structure
  const parent: Map<string, string> = new Map();
  // Map to store the rank of each node, used for union by rank
  const rank: Map<string, number> = new Map();

  // Function to find the root parent of a node with path compression
  function find(x: string): string {
    // If the current node's parent is not itself, find the root parent recursively
    if (parent.get(x) !== x) {
      // Path compression optimization
      parent.set(x, find(parent.get(x)!));
    }
    // Return the root parent
    return parent.get(x)!;
  }

  // Function to unite two nodes (x and y) in the union-find structure
  function union(x: string, y: string): void {
    // Find the root parents of x and y
    const rootX = find(x);
    const rootY = find(y);
    // If they are not already in the same set, unite them by rank
    if (rootX !== rootY) {
      if (rank.get(rootX)! > rank.get(rootY)!) {
        // Attach smaller tree under larger tree
        parent.set(rootY, rootX);
      } else if (rank.get(rootX)! < rank.get(rootY)!) {
        parent.set(rootX, rootY);
      } else {
        // If ranks are equal, choose one as root and increment its rank
        parent.set(rootY, rootX);
        rank.set(rootX, rank.get(rootX)! + 1);
      }
    }
  }

  // Iterate through each stone and union the row and column positions
  for (let [x, y] of stones) {
    if (!parent.has(`${x}r`)) {
      // Initialize row parent and rank
      parent.set(`${x}r`, `${x}r`);
      rank.set(`${x}r`, 0);
    }
    if (!parent.has(`${y}c`)) {
      // Initialize column parent and rank
      parent.set(`${y}c`, `${y}c`);
      rank.set(`${y}c`, 0);
    }
    // Union the row and column indices
    union(`${x}r`, `${y}c`);
  }

  // Find the unique parents, representing the number of connected components
  const uniqueParents = new Set(stones.map(([x, y]) => find(`${x}r`)));

  // The result is the total number of stones minus the number of connected components
  return stones.length - uniqueParents.size;
}

/* 
1894. Find the Student that Will Replace the Chalk

There are n students in a class numbered from 0 to n - 1. The teacher will give each student a problem starting with the student number 0, then the student number 1, and so on until the teacher reaches the student number n - 1. After that, the teacher will restart the process, starting with the student number 0 again.

You are given a 0-indexed integer array chalk and an integer k. There are initially k pieces of chalk. When the student number i is given a problem to solve, they will use chalk[i] pieces of chalk to solve that problem. However, if the current number of chalk pieces is strictly less than chalk[i], then the student number i will be asked to replace the chalk.

Return the index of the student that will replace the chalk pieces.

Example 1:
Input: chalk = [5,1,5], k = 22
Output: 0
Explanation: The students go in turns as follows:
- Student number 0 uses 5 chalk, so k = 17.
- Student number 1 uses 1 chalk, so k = 16.
- Student number 2 uses 5 chalk, so k = 11.
- Student number 0 uses 5 chalk, so k = 6.
- Student number 1 uses 1 chalk, so k = 5.
- Student number 2 uses 5 chalk, so k = 0.
Student number 0 does not have enough chalk, so they will have to replace it.

Example 2:
Input: chalk = [3,4,1,2], k = 25
Output: 1
Explanation: The students go in turns as follows:
- Student number 0 uses 3 chalk so k = 22.
- Student number 1 uses 4 chalk so k = 18.
- Student number 2 uses 1 chalk so k = 17.
- Student number 3 uses 2 chalk so k = 15.
- Student number 0 uses 3 chalk so k = 12.
- Student number 1 uses 4 chalk so k = 8.
- Student number 2 uses 1 chalk so k = 7.
- Student number 3 uses 2 chalk so k = 5.
- Student number 0 uses 3 chalk so k = 2.
Student number 1 does not have enough chalk, so they will have to replace it.

Constraints:
chalk.length == n
1 <= n <= 10^5
1 <= chalk[i] <= 10^5
1 <= k <= 10^9

</> Typescript Code:
*/

function chalkReplacer(chalk: number[], k: number): number {
  // Calculate the total amount of chalk used in one full round of distribution
  const totalChalk = chalk.reduce((sum, val) => sum + val, 0);

  // Use modulo to reduce k to a value within one round
  // This step optimizes the function by avoiding unnecessary iterations
  k %= totalChalk;

  // Iterate over each student
  for (let i = 0; i < chalk.length; i++) {
    // If the remaining chalk is less than the chalk needed by the current student
    if (k < chalk[i]) {
      // The current student will be the one to replace the chalk
      return i;
    }
    // Otherwise, subtract the chalk used by the current student from k
    k -= chalk[i];
  }

  // This return statement is a safeguard, although according to the problem constraints,
  // the loop will always find a valid student to replace the chalk
  return -1;
}

/* 
874. Walking Robot Simulation

A robot on an infinite XY-plane starts at point (0, 0) facing north. The robot can receive a sequence of these three possible types of commands:

-2: Turn left 90 degrees.
-1: Turn right 90 degrees.
1 <= k <= 9: Move forward k units, one unit at a time.
Some of the grid squares are obstacles. The ith obstacle is at grid point obstacles[i] = (xi, yi). If the robot runs into an obstacle, then it will instead stay in its current location and move on to the next command.

Return the maximum Euclidean distance that the robot ever gets from the origin squared (i.e. if the distance is 5, return 25).

Note:
North means +Y direction.
East means +X direction.
South means -Y direction.
West means -X direction.
There can be obstacle in [0,0].

Example 1:
Input: commands = [4,-1,3], obstacles = []
Output: 25
Explanation: The robot starts at (0, 0):
1. Move north 4 units to (0, 4).
2. Turn right.
3. Move east 3 units to (3, 4).
The furthest point the robot ever gets from the origin is (3, 4), which squared is 32 + 42 = 25 units away.

Example 2:
Input: commands = [4,-1,4,-2,4], obstacles = [[2,4]]
Output: 65
Explanation: The robot starts at (0, 0):
1. Move north 4 units to (0, 4).
2. Turn right.
3. Move east 1 unit and get blocked by the obstacle at (2, 4), robot is at (1, 4).
4. Turn left.
5. Move north 4 units to (1, 8).
The furthest point the robot ever gets from the origin is (1, 8), which squared is 12 + 82 = 65 units away.

Example 3:
Input: commands = [6,-1,-1,6], obstacles = []
Output: 36
Explanation: The robot starts at (0, 0):
1. Move north 6 units to (0, 6).
2. Turn right.
3. Turn right.
4. Move south 6 units to (0, 0).
The furthest point the robot ever gets from the origin is (0, 6), which squared is 62 = 36 units away.

Constraints:
1 <= commands.length <= 10^4
commands[i] is either -2, -1, or an integer in the range [1, 9].
0 <= obstacles.length <= 10^4
-3 * 104 <= xi, yi <= 3 * 10^4
The answer is guaranteed to be less than 2^31.

</> Typescript Code:
*/

function robotSim(commands: number[], obstacles: number[][]): number {
  // Define movement vectors for the four possible directions: North, East, South, West.
  const directionVectors = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]; // [x, y] increments
  let direction = 0; // Start facing North (0 index in directionVectors)
  let x = 0,
    y = 0; // Initial position of the robot
  let maxDistance = 0; // Track the maximum squared distance from origin

  // Convert obstacles to a set for O(1) lookup time
  const obstacleSet = new Set(obstacles.map(([ox, oy]) => `${ox},${oy}`));

  // Iterate over each command
  for (const command of commands) {
    if (command === -2) {
      // Turn left: decrement direction index (counterclockwise)
      direction = (direction + 3) % 4;
    } else if (command === -1) {
      // Turn right: increment direction index (clockwise)
      direction = (direction + 1) % 4;
    } else {
      // Move forward k units in the current direction
      const [dx, dy] = directionVectors[direction];
      for (let i = 0; i < command; i++) {
        const newX = x + dx,
          newY = y + dy;
        // Check if next position is an obstacle
        if (obstacleSet.has(`${newX},${newY}`)) break;
        // Update the position
        x = newX;
        y = newY;
        // Update maxDistance if current distance is larger
        maxDistance = Math.max(maxDistance, x * x + y * y);
      }
    }
  }

  return maxDistance; // Return the maximum squared distance found
}

/* 
2028. Find Missing Observations

You have observations of n + m 6-sided dice rolls with each face numbered from 1 to 6. n of the observations went missing, and you only have the observations of m rolls. Fortunately, you have also calculated the average value of the n + m rolls.

You are given an integer array rolls of length m where rolls[i] is the value of the ith observation. You are also given the two integers mean and n.

Return an array of length n containing the missing observations such that the average value of the n + m rolls is exactly mean. If there are multiple valid answers, return any of them. If no such array exists, return an empty array.

The average value of a set of k numbers is the sum of the numbers divided by k.

Note that mean is an integer, so the sum of the n + m rolls should be divisible by n + m.

Example 1:
Input: rolls = [3,2,4,3], mean = 4, n = 2
Output: [6,6]
Explanation: The mean of all n + m rolls is (3 + 2 + 4 + 3 + 6 + 6) / 6 = 4.

Example 2:
Input: rolls = [1,5,6], mean = 3, n = 4
Output: [2,3,2,2]
Explanation: The mean of all n + m rolls is (1 + 5 + 6 + 2 + 3 + 2 + 2) / 7 = 3.

Example 3:
Input: rolls = [1,2,3,4], mean = 6, n = 4
Output: []
Explanation: It is impossible for the mean to be 6 no matter what the 4 missing rolls are.

Constraints:
m == rolls.length
1 <= n, m <= 10^5
1 <= rolls[i], mean <= 6

</> Typescript Code:
*/

function missingRolls(rolls: number[], mean: number, n: number): number[] {
  // Get the number of given rolls
  const m = rolls.length;

  // Calculate the total desired sum of all (n + m) rolls
  const totalSum = mean * (n + m) - rolls.reduce((a, b) => a + b, 0);

  // Check if the total sum is achievable:
  // 1. It can't be less than `n` because the minimum for each missing roll is 1.
  // 2. It can't be more than `6 * n` because the maximum for each missing roll is 6.
  if (totalSum < n || totalSum > 6 * n) {
    return []; // No valid solution
  }

  // Initialize result array with all values set to 1 (minimum possible roll value)
  const result = Array(n).fill(1);

  // Calculate the remaining sum we need to distribute after assigning 1 to each roll
  let remaining = totalSum - n;

  // Distribute the remaining sum as evenly as possible, but no value can exceed 6
  for (let i = 0; i < n && remaining > 0; i++) {
    // Add as much as possible to each element, but no more than 5 (because 1 is already assigned)
    const add = Math.min(remaining, 5);
    result[i] += add;
    remaining -= add;
  }

  return result; // Return the final array of missing rolls
}

/* 
3217. Delete Nodes From Linked List Present in Array

You are given an array of integers nums and the head of a linked list. Return the head of the modified linked list after removing all nodes from the linked list that have a value that exists in nums.

Example 1:
Input: nums = [1,2,3], head = [1,2,3,4,5]
Output: [4,5]
Explanation:
Remove the nodes with values 1, 2, and 3.

Example 2:
Input: nums = [1], head = [1,2,1,2,1,2]
Output: [2,2,2]
Explanation:
Remove the nodes with value 1.

Example 3:
Input: nums = [5], head = [1,2,3,4]
Output: [1,2,3,4]
Explanation:
No node has value 5.


Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^5
All elements in nums are unique.
The number of nodes in the given list is in the range [1, 10^5].
1 <= Node.val <= 10^5
The input is generated such that there is at least one node in the linked list that has a value not present in nums.


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

function modifiedList(nums: number[], head: ListNode | null): ListNode | null {
  // Create a Set to store values that need to be removed for O(1) lookup times
  const toRemove = new Set(nums);

  // Create a dummy node to simplify edge cases, such as removing the head
  let dummy = new ListNode(0, head);
  let current = dummy;

  // Traverse the list starting from the dummy node
  while (current.next) {
    // If the next node's value is in the set of values to remove
    if (toRemove.has(current.next.val)) {
      // Skip the node by pointing to the next of next node
      current.next = current.next.next;
    } else {
      // Move to the next node if it is not removed
      current = current.next;
    }
  }

  // Return the new head, which is the next of the dummy node
  return dummy.next;
}

/* 
1367. Linked List in Binary Tree

Given a binary tree root and a linked list with head as the first node. 

Return True if all the elements in the linked list starting from the head correspond to some downward path connected in the binary tree otherwise return False.

In this context downward path means a path that starts at some node and goes downwards.

Example 1:
Input: head = [4,2,8], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: true
Explanation: Nodes in blue form a subpath in the binary Tree.  

Example 2:
Input: head = [1,4,2,6], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: true

Example 3:
Input: head = [1,4,2,6,8], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: false
Explanation: There is no path in the binary tree that contains all the elements of the linked list from head.

Constraints:
The number of nodes in the tree will be in the range [1, 2500].
The number of nodes in the list will be in the range [1, 100].
1 <= Node.val <= 100 for each node in the linked list and binary tree.

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

function isSubPath(head: ListNode | null, root: TreeNode | null): boolean {
  // Base case: If the root is null, no path can exist, return false
  if (!root) return false;

  // Check if the current root node can start a matching path using the dfs helper
  if (dfs(root, head)) return true;

  // Recursively check the left and right subtrees to see if the linked list starts there
  return isSubPath(head, root.left) || isSubPath(head, root.right);
}

// Helper function to check if a path starting from the current tree node matches the linked list
function dfs(root: TreeNode | null, head: ListNode | null): boolean {
  // Base case: If we've reached the end of the linked list, the path matches, return true
  if (!head) return true;

  // If the tree node is null or values don't match, return false
  if (!root || root.val !== head.val) return false;

  // Recursively check both left and right children for continuing the matching path
  return dfs(root.left, head.next) || dfs(root.right, head.next);
}

/* 
725. Split Linked List in Parts

Given the head of a singly linked list and an integer k, split the linked list into k consecutive linked list parts.

The length of each part should be as equal as possible: no two parts should have a size differing by more than one. This may lead to some parts being null.

The parts should be in the order of occurrence in the input list, and parts occurring earlier should always have a size greater than or equal to parts occurring later.

Return an array of the k parts.

Example 1:
Input: head = [1,2,3], k = 5
Output: [[1],[2],[3],[],[]]
Explanation:
The first element output[0] has output[0].val = 1, output[0].next = null.
The last element output[4] is null, but its string representation as a ListNode is [].

Example 2:
Input: head = [1,2,3,4,5,6,7,8,9,10], k = 3
Output: [[1,2,3,4],[5,6,7],[8,9,10]]
Explanation:
The input has been split into consecutive parts with size difference at most 1, and earlier parts are a larger size than the later parts.

Constraints:
The number of nodes in the list is in the range [0, 1000].
0 <= Node.val <= 1000
1 <= k <= 50

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

function splitListToParts(head: ListNode | null, k: number): Array<ListNode | null> {
  // Initialize variables: length to track the list length and current to iterate the list
  let length = 0,
    current = head;

  // Calculate total length of the linked list
  while (current) {
    length++;
    current = current.next; // Move to next node
  }

  // Calculate base part size and extra nodes to distribute evenly
  const partSize = Math.floor(length / k);
  let extra = length % k; // Extra parts to distribute

  // Initialize result array with nulls, size of k
  const result: Array<ListNode | null> = new Array(k).fill(null);

  // Reset current pointer to head to start the splitting process
  current = head;

  // Iterate over each part (k times)
  for (let i = 0; i < k && current; i++) {
    result[i] = current; // Assign current node as the start of the part

    // Calculate the size of the current part (larger parts get an extra node)
    let currentPartSize = partSize + (extra > 0 ? 1 : 0);
    extra--; // Decrease extra node counter

    // Move current pointer to the last node of the current part
    for (let j = 1; j < currentPartSize; j++) {
      current = current!.next;
    }

    // Break the list after the current part
    let next = current!.next;
    current!.next = null; // Disconnect the current part from the next one
    current = next; // Move to the next node to continue splitting
  }

  return result; // Return the array of parts
}

/* 
2326. Spiral Matrix IV

You are given two integers m and n, which represent the dimensions of a matrix.

You are also given the head of a linked list of integers.

Generate an m x n matrix that contains the integers in the linked list presented in spiral order (clockwise), starting from the top-left of the matrix. If there are remaining empty spaces, fill them with -1.

Return the generated matrix.

Example 1:
Input: m = 3, n = 5, head = [3,0,2,6,8,1,7,9,4,2,5,5,0]
Output: [[3,0,2,6,8],[5,0,-1,-1,1],[5,2,4,9,7]]
Explanation: The diagram above shows how the values are printed in the matrix.
Note that the remaining spaces in the matrix are filled with -1.

Example 2:
Input: m = 1, n = 4, head = [0,1,2]
Output: [[0,1,2,-1]]
Explanation: The diagram above shows how the values are printed from left to right in the matrix.
The last space in the matrix is set to -1.

Constraints:
1 <= m, n <= 10^5
1 <= m * n <= 10^5
The number of nodes in the list is in the range [1, m * n].
0 <= Node.val <= 1000

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

function spiralMatrix(m: number, n: number, head: ListNode | null): number[][] {
  // Initialize result matrix with -1
  const result: number[][] = Array.from({length: m}, () => Array(n).fill(-1));

  // Define boundaries
  let left = 0,
    right = n - 1,
    top = 0,
    bottom = m - 1;
  let current = head; // Pointer to traverse the linked list

  // Continue until boundaries meet
  while (left <= right && top <= bottom) {
    // Traverse from left to right along the top boundary
    for (let i = left; i <= right; i++) {
      if (current) {
        result[top][i] = current.val;
        current = current.next;
      }
    }
    top++; // Move the top boundary downwards

    // Traverse from top to bottom along the right boundary
    for (let i = top; i <= bottom; i++) {
      if (current) {
        result[i][right] = current.val;
        current = current.next;
      }
    }
    right--; // Move the right boundary to the left

    // Traverse from right to left along the bottom boundary
    if (top <= bottom) {
      // Check if there is a row left
      for (let i = right; i >= left; i--) {
        if (current) {
          result[bottom][i] = current.val;
          current = current.next;
        }
      }
      bottom--; // Move the bottom boundary upwards
    }

    // Traverse from bottom to top along the left boundary
    if (left <= right) {
      // Check if there is a column left
      for (let i = bottom; i >= top; i--) {
        if (current) {
          result[i][left] = current.val;
          current = current.next;
        }
      }
      left++; // Move the left boundary to the right
    }
  }

  return result;
}

/* 
2807. Insert Greatest Common Divisors in Linked List

Given the head of a linked list head, in which each node contains an integer value.

Between every pair of adjacent nodes, insert a new node with a value equal to the greatest common divisor of them.

Return the linked list after insertion.

The greatest common divisor of two numbers is the largest positive integer that evenly divides both numbers.

Example 1:
Input: head = [18,6,10,3]
Output: [18,6,6,2,10,1,3]
Explanation: The 1st diagram denotes the initial linked list and the 2nd diagram denotes the linked list after inserting the new nodes (nodes in blue are the inserted nodes).
- We insert the greatest common divisor of 18 and 6 = 6 between the 1st and the 2nd nodes.
- We insert the greatest common divisor of 6 and 10 = 2 between the 2nd and the 3rd nodes.
- We insert the greatest common divisor of 10 and 3 = 1 between the 3rd and the 4th nodes.
There are no more adjacent nodes, so we return the linked list.

Example 2:
Input: head = [7]
Output: [7]
Explanation: The 1st diagram denotes the initial linked list and the 2nd diagram denotes the linked list after inserting the new nodes.
There are no pairs of adjacent nodes, so we return the initial linked list.

Constraints:
The number of nodes in the list is in the range [1, 5000].
1 <= Node.val <= 1000

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

// Helper function to calculate the GCD of two numbers using the Euclidean algorithm
function gcd(a: number, b: number): number {
  while (b !== 0) {
    // Continue until b becomes 0
    const temp = b; // Store the current value of b
    b = a % b; // Update b to be the remainder of a divided by b
    a = temp; // Update a to the previous value of b
  }
  return a; // Return the GCD
}

// Main function to insert GCD nodes in the linked list
function insertGreatestCommonDivisors(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head; // If the list is empty or has only one node, return it as is

  let current: ListNode | null = head; // Initialize the current node to the head of the list

  while (current && current.next) {
    // Iterate through the list as long as there are at least two nodes left
    const gcdValue = gcd(current.val, current.next.val); // Compute the GCD of the current and next node values
    const newNode = new ListNode(gcdValue, current.next); // Create a new node with the GCD value
    current.next = newNode; // Insert the new node between current and next nodes
    current = newNode.next; // Move to the next node in the list
  }

  return head; // Return the modified list
}

/* 
1310. XOR Queries of a Subarray

You are given an array arr of positive integers. You are also given the array queries where queries[i] = [lefti, righti].

For each query i compute the XOR of elements from lefti to righti (that is, arr[lefti] XOR arr[lefti + 1] XOR ... XOR arr[righti] ).

Return an array answer where answer[i] is the answer to the ith query.

Example 1:
Input: arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3],[3,3]]
Output: [2,7,14,8] 
Explanation: 
The binary representation of the elements in the array are:
1 = 0001 
3 = 0011 
4 = 0100 
8 = 1000 
The XOR values for queries are:
[0,1] = 1 xor 3 = 2 
[1,2] = 3 xor 4 = 7 
[0,3] = 1 xor 3 xor 4 xor 8 = 14 
[3,3] = 8

Example 2:
Input: arr = [4,8,2,10], queries = [[2,3],[1,3],[0,0],[0,3]]
Output: [8,0,4,4]

Constraints:
1 <= arr.length, queries.length <= 3 * 10^4
1 <= arr[i] <= 10^9
queries[i].length == 2
0 <= lefti <= righti < arr.length

</> Typescript Code:
*/

function xorQueries(arr: number[], queries: number[][]): number[] {
  // Create an array to store the prefix XOR values with an extra element for convenience
  const prefixXOR = new Array(arr.length + 1).fill(0);

  // Compute prefix XORs
  for (let i = 0; i < arr.length; i++) {
    // Update the prefixXOR array where each element at index i+1 stores
    // the XOR of all elements from the start up to index i
    prefixXOR[i + 1] = prefixXOR[i] ^ arr[i];
  }

  // For each query, compute the XOR of the subarray from left to right
  return queries.map(
    ([left, right]) =>
      // The XOR of subarray from left to right can be computed by
      // XORing prefixXOR[right + 1] (up to right) with prefixXOR[left] (up to left-1)
      prefixXOR[right + 1] ^ prefixXOR[left],
  );
}

/* 
2419. Longest Subarray With Maximum Bitwise AND

You are given an integer array nums of size n.

Consider a non-empty subarray from nums that has the maximum possible bitwise AND.

In other words, let k be the maximum value of the bitwise AND of any subarray of nums. Then, only subarrays with a bitwise AND equal to k should be considered.
Return the length of the longest such subarray.

The bitwise AND of an array is the bitwise AND of all the numbers in it.

A subarray is a contiguous sequence of elements within an array.

Example 1:
Input: nums = [1,2,3,3,2,2]
Output: 2
Explanation:
The maximum possible bitwise AND of a subarray is 3.
The longest subarray with that value is [3,3], so we return 2.

Example 2:
Input: nums = [1,2,3,4]
Output: 1
Explanation:
The maximum possible bitwise AND of a subarray is 4.
The longest subarray with that value is [4], so we return 1.

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^6

</> Typescript Code:
*/

function longestSubarray(nums: number[]): number {
  // Step 1: Find the maximum value in the array, since we are interested
  // only in subarrays where the bitwise AND is equal to this max value.
  let maxVal = Math.max(...nums);

  // Step 2: Initialize variables to keep track of the longest subarray and
  // the current subarray length where the bitwise AND equals the maximum value.
  let longest = 0;
  let currentLen = 0;

  // Step 3: Iterate through the array to find subarrays where each element
  // equals the max value and calculate the longest length.
  for (let num of nums) {
    if (num === maxVal) {
      // If the current number equals the max value, increase the current subarray length.
      currentLen++;
      // Update the longest subarray if the current one is longer.
      longest = Math.max(longest, currentLen);
    } else {
      // Reset the current subarray length if the number doesn't match the max value.
      currentLen = 0;
    }
  }

  // Step 4: Return the longest subarray length where all elements equal the maximum value.
  return longest;
}

/* 
1371. Find the Longest Substring Containing Vowels in Even Counts

Given the string s, return the size of the longest substring containing each vowel an even number of times. That is, 'a', 'e', 'i', 'o', and 'u' must appear an even number of times.

Example 1:
Input: s = "eleetminicoworoep"
Output: 13
Explanation: The longest substring is "leetminicowor" which contains two each of the vowels: e, i and o and zero of the vowels: a and u.

Example 2:
Input: s = "leetcodeisgreat"
Output: 5
Explanation: The longest substring is "leetc" which contains two e's.

Example 3:
Input: s = "bcbcbc"
Output: 6
Explanation: In this case, the given string "bcbcbc" is the longest because all vowels: a, e, i, o and u appear zero times.

Constraints:
1 <= s.length <= 5 x 10^5
s contains only lowercase English letters.

</> Typescript Code:
*/

function findTheLongestSubstring(s: string): number {
  // Define a string containing all vowels for easy lookup.
  const vowels = 'aeiou';

  // A map to track the first occurrence of each mask state.
  // The mask represents the parity (even/odd count) of vowels.
  const maskMap = new Map<number, number>();

  // Variable to keep track of the current state of the vowel counts.
  // Each bit in 'mask' represents one of the vowels; the bit is 1 if
  // the vowel has been seen an odd number of times, 0 if even.
  let mask = 0;

  // Variable to store the maximum length of the substring that meets the condition.
  let maxLength = 0;

  // Initialize the maskMap with mask 0 at position -1 to handle cases where
  // the valid substring starts from index 0.
  maskMap.set(0, -1);

  // Iterate over the string characters.
  for (let i = 0; i < s.length; i++) {
    // Check if the current character is a vowel.
    const charIndex = vowels.indexOf(s[i]);

    // If it is a vowel, toggle the corresponding bit in the mask.
    if (charIndex !== -1) {
      mask ^= 1 << charIndex;
    }

    // If the current mask has been seen before, calculate the length
    // of the substring between the first occurrence of this mask and now.
    if (maskMap.has(mask)) {
      maxLength = Math.max(maxLength, i - maskMap.get(mask)!);
    }
    // If the mask has not been seen, store the current index.
    else {
      maskMap.set(mask, i);
    }
  }

  // Return the maximum length of the valid substring.
  return maxLength;
}

/* 
539. Minimum Time Difference

Given a list of 24-hour clock time points in "HH:MM" format, return the minimum minutes difference between any two time-points in the list.

Example 1:
Input: timePoints = ["23:59","00:00"]
Output: 1

Example 2:
Input: timePoints = ["00:00","23:59","00:00"]
Output: 0

Constraints:
2 <= timePoints.length <= 2 * 10^4
timePoints[i] is in the format "HH:MM".

</> Typescript Code:
*/

function findMinDifference(timePoints: string[]): number {
  // Convert each time point to the total minutes from midnight
  const minutes: number[] = timePoints
    .map(t => {
      const [h, m] = t.split(':').map(Number); // Split "HH:MM" into hours and minutes, then convert to numbers
      return h * 60 + m; // Convert hours and minutes to total minutes since midnight
    })
    .sort((a, b) => a - b); // Sort the minutes in ascending order

  let minDiff = Infinity; // Initialize minimum difference to a very large number
  for (let i = 0; i < minutes.length; i++) {
    // Loop through sorted minutes
    // Calculate difference between consecutive time points
    const diff =
      i === minutes.length - 1
        ? 1440 - (minutes[i] - minutes[0]) // For the last element, calculate difference with the first element considering the wrap-around at midnight
        : minutes[i + 1] - minutes[i]; // For other elements, just subtract the current from the next

    minDiff = Math.min(minDiff, diff); // Update the minimum difference if a smaller one is found
  }

  return minDiff; // Return the smallest time difference found
}

/* 
179. Largest Number

Given a list of non-negative integers nums, arrange them such that they form the largest number and return it.

Since the result may be very large, so you need to return a string instead of an integer.

Example 1:
Input: nums = [10,2]
Output: "210"

Example 2:
Input: nums = [3,30,34,5,9]
Output: "9534330"

Constraints:
1 <= nums.length <= 100
0 <= nums[i] <= 10^9

</> Typescript Code:
*/

function largestNumber(nums: number[]): string {
  // Convert each number to a string for custom comparison
  const strNums = nums.map(String); // Create an array of string representations of nums

  // Sort the string array based on which combination forms a larger number
  strNums.sort((a, b) => (b + a).localeCompare(a + b));
  // Compare concatenated strings in both possible orders to determine the larger one

  // If the largest number after sorting is "0", return "0" (handles cases with leading zeros)
  if (strNums[0] === '0') return '0';

  // Concatenate sorted string numbers into the final result
  return strNums.join(''); // Join the sorted array into a single string
}

/* 
241. Different Ways to Add Parentheses

Given a string expression of numbers and operators, return all possible results from computing all the different possible ways to group numbers and operators. You may return the answer in any order.

The test cases are generated such that the output values fit in a 32-bit integer and the number of different results does not exceed 104.

Example 1:
Input: expression = "2-1-1"
Output: [0,2]
Explanation:
((2-1)-1) = 0 
(2-(1-1)) = 2

Example 2:
Input: expression = "2*3-4*5"
Output: [-34,-14,-10,-10,10]
Explanation:
(2*(3-(4*5))) = -34 
((2*3)-(4*5)) = -14 
((2*(3-4))*5) = -10 
(2*((3-4)*5)) = -10 
(((2*3)-4)*5) = 10

Constraints:
1 <= expression.length <= 20
expression consists of digits and the operator '+', '-', and '*'.
All the integer values in the input expression are in the range [0, 99].

</> Typescript Code:
*/

function diffWaysToCompute(expression: string): number[] {
  // Initialize a memoization map to cache results for sub-expressions
  const memo = new Map<string, number[]>();

  // Tokenize the expression into numbers and operators
  const tokens: (number | string)[] = [];
  let num = '';
  for (let c of expression) {
    if (c === '+' || c === '-' || c === '*') {
      tokens.push(parseInt(num)); // Add the parsed number to tokens
      tokens.push(c); // Add the operator to tokens
      num = ''; // Reset the number string
    } else {
      num += c; // Build the number string
    }
  }
  tokens.push(parseInt(num)); // Add the last number to tokens

  // Recursive function to compute results for tokens from start to end indices
  function compute(start: number, end: number): number[] {
    // Create a unique key for memoization
    const key = `${start},${end}`;

    // Return cached result if available
    if (memo.has(key)) return memo.get(key)!;

    // Base case: only one number in this sub-expression
    if (start === end) {
      return [tokens[start] as number];
    }

    // Initialize an array to store results
    const results: number[] = [];

    // Iterate over operators in the current sub-expression
    for (let i = start + 1; i < end; i += 2) {
      const op = tokens[i] as string;

      // Recursively compute all possible results from left and right sub-expressions
      const left = compute(start, i - 1);
      const right = compute(i + 1, end);

      // Compute all combinations of left and right results with the current operator
      for (let l of left) {
        for (let r of right) {
          let val = 0;
          if (op === '+') val = l + r;
          else if (op === '-') val = l - r;
          else if (op === '*') val = l * r;
          results.push(val);
        }
      }
    }

    // Cache the computed results
    memo.set(key, results);

    return results;
  }

  // Compute and return all possible results for the entire expression
  return compute(0, tokens.length - 1);
}

/* 
386. Lexicographical Numbers

Given an integer n, return all the numbers in the range [1, n] sorted in lexicographical order.

You must write an algorithm that runs in O(n) time and uses O(1) extra space. 

Example 1:
Input: n = 13
Output: [1,10,11,12,13,2,3,4,5,6,7,8,9]

Example 2:
Input: n = 2
Output: [1,2]

Constraints:
1 <= n <= 5 * 10^4

</> Typescript Code:
*/

function lexicalOrder(n: number): number[] {
  // Array to store the result in lexicographical order
  const result: number[] = [];

  // Start the traversal with the first number '1'
  let current = 1;

  // Loop n times, since we need to generate exactly n numbers
  for (let i = 0; i < n; i++) {
    // Add the current number to the result array
    result.push(current);

    // If current * 10 is within bounds, move to the next lexicographical level
    // For example, after 1, we move to 10, 100, etc.
    if (current * 10 <= n) {
      current *= 10;
    } else {
      // If current exceeds the limit, we need to backtrack
      // Move to the next valid number in lexicographical order
      if (current >= n) current = Math.floor(current / 10);

      // Increment the current number to the next in sequence
      current++;

      // Skip trailing zeros in the lexicographical path
      while (current % 10 == 0) {
        current = Math.floor(current / 10);
      }
    }
  }

  // Return the final lexicographically ordered array
  return result;
}

/* 
2707. Extra Characters in a String

You are given a 0-indexed string s and a dictionary of words dictionary. You have to break s into one or more non-overlapping substrings such that each substring is present in dictionary. There may be some extra characters in s which are not present in any of the substrings.

Return the minimum number of extra characters left over if you break up s optimally.

Example 1:
Input: s = "leetscode", dictionary = ["leet","code","leetcode"]
Output: 1
Explanation: We can break s in two substrings: "leet" from index 0 to 3 and "code" from index 5 to 8. There is only 1 unused character (at index 4), so we return 1.

Example 2:
Input: s = "sayhelloworld", dictionary = ["hello","world"]
Output: 3
Explanation: We can break s in two substrings: "hello" from index 3 to 7 and "world" from index 8 to 12. The characters at indices 0, 1, 2 are not used in any substring and thus are considered as extra characters. Hence, we return 3.

Constraints:
1 <= s.length <= 50
1 <= dictionary.length <= 50
1 <= dictionary[i].length <= 50
dictionary[i] and s consists of only lowercase English letters
dictionary contains distinct words

</> Typescript Code:
*/

function minExtraChar(s: string, dictionary: string[]): number {
  // Create a set from the dictionary for O(1) lookups
  const dictSet = new Set(dictionary);

  // Initialize a dp array where dp[i] stores the minimum extra characters for the substring s[0...i-1]
  const dp = new Array(s.length + 1).fill(0);

  // Iterate through each position in the string s
  for (let i = 1; i <= s.length; i++) {
    // Initially assume the minimum extra characters at dp[i] is dp[i-1] + 1 (i.e., one more character is unused)
    dp[i] = dp[i - 1] + 1;

    // Check each word in the dictionary
    for (let word of dictionary) {
      const len = word.length; // Get the length of the word
      // If the current position i can accommodate the word and the substring matches the word
      if (i >= len && dictSet.has(s.slice(i - len, i))) {
        // Update dp[i] to be the minimum of its current value and dp[i - len] (which assumes we can use the word)
        dp[i] = Math.min(dp[i], dp[i - len]);
      }
    }
  }

  // Return the minimum extra characters for the entire string
  return dp[s.length];
}

/* 
3043. Find the Length of the Longest Common Prefix

You are given two arrays with positive integers arr1 and arr2.

A prefix of a positive integer is an integer formed by one or more of its digits, starting from its leftmost digit. For example, 123 is a prefix of the integer 12345, while 234 is not.

A common prefix of two integers a and b is an integer c, such that c is a prefix of both a and b. For example, 5655359 and 56554 have a common prefix 565 while 1223 and 43456 do not have a common prefix.

You need to find the length of the longest common prefix between all pairs of integers (x, y) such that x belongs to arr1 and y belongs to arr2.

Return the length of the longest common prefix among all pairs. If no common prefix exists among them, return 0.

Example 1:
Input: arr1 = [1,10,100], arr2 = [1000]
Output: 3
Explanation: There are 3 pairs (arr1[i], arr2[j]):
- The longest common prefix of (1, 1000) is 1.
- The longest common prefix of (10, 1000) is 10.
- The longest common prefix of (100, 1000) is 100.
The longest common prefix is 100 with a length of 3.

Example 2:
Input: arr1 = [1,2,3], arr2 = [4,4,4]
Output: 0
Explanation: There exists no common prefix for any pair (arr1[i], arr2[j]), hence we return 0.
Note that common prefixes between elements of the same array do not count.

Constraints:
1 <= arr1.length, arr2.length <= 5 * 10^4
1 <= arr1[i], arr2[i] <= 10^8

</> Typescript Code:
*/

function longestCommonPrefix(arr1: number[], arr2: number[]): number {
  // Step 1: Convert all numbers in arr1 to strings and store their prefixes in a set for fast lookup
  let prefixSet = new Set<string>();

  for (let num1 of arr1) {
    let str1 = num1.toString(); // Convert the number to a string
    // Generate and store all prefixes of this number in the set
    for (let i = 1; i <= str1.length; i++) {
      prefixSet.add(str1.slice(0, i)); // Slice the string to get each prefix
    }
  }

  // Initialize the maximum prefix length found across all pairs
  let maxPrefixLength = 0;

  // Step 2: Loop through each number in arr2 and find the longest prefix match in the set
  for (let num2 of arr2) {
    let str2 = num2.toString(); // Convert number to string
    let currentPrefixLength = 0; // Track the prefix length for this pair

    // Check for the longest prefix in arr2 that exists in the prefixSet
    for (let i = 1; i <= str2.length; i++) {
      if (prefixSet.has(str2.slice(0, i))) {
        currentPrefixLength = i; // If a match is found, update the current prefix length
      } else {
        break; // Early exit if no match is found for the current prefix
      }
    }

    // Update the max prefix length with the largest found so far
    maxPrefixLength = Math.max(maxPrefixLength, currentPrefixLength);
  }

  // Return the maximum common prefix length found
  return maxPrefixLength;
}

/* 
729. My Calendar I

You are implementing a program to use as your calendar. We can add a new event if adding the event will not cause a double booking.

A double booking happens when two events have some non-empty intersection (i.e., some moment is common to both events.).

The event can be represented as a pair of integers start and end that represents a booking on the half-open interval [start, end), the range of real numbers x such that start <= x < end.

Implement the MyCalendar class:

MyCalendar() Initializes the calendar object.
boolean book(int start, int end) Returns true if the event can be added to the calendar successfully without causing a double booking. Otherwise, return false and do not add the event to the calendar.

Example 1:
Input
["MyCalendar", "book", "book", "book"]
[[], [10, 20], [15, 25], [20, 30]]
Output
[null, true, false, true]
Explanation
MyCalendar myCalendar = new MyCalendar();
myCalendar.book(10, 20); // return True
myCalendar.book(15, 25); // return False, It can not be booked because time 15 is already booked by another event.
myCalendar.book(20, 30); // return True, The event can be booked, as the first event takes every time less than 20, but not including 20.

Constraints:
0 <= start < end <= 10^9
At most 1000 calls will be made to book.

</> Typescript Code:
*/

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(start,end)
 */

class MyCalendar {
  // We store the events as an array of tuples (start, end)
  private events: [number, number][];

  constructor() {
    // Initialize the list of events
    this.events = [];
  }

  book(start: number, end: number): boolean {
    // Iterate through each existing event
    for (let [s, e] of this.events) {
      // Check if the new event [start, end) overlaps with any existing event [s, e)
      if (start < e && end > s) {
        // Overlap detected, return false as we can't book this event
        return false;
      }
    }

    // If no overlap, add the new event to the list
    this.events.push([start, end]);

    // Return true indicating the event was successfully booked
    return true;
  }
}

/* 
731. My Calendar II

You are implementing a program to use as your calendar. We can add a new event if adding the event will not cause a triple booking.

A triple booking happens when three events have some non-empty intersection (i.e., some moment is common to all the three events.).

The event can be represented as a pair of integers start and end that represents a booking on the half-open interval [start, end), the range of real numbers x such that start <= x < end.

Implement the MyCalendarTwo class:

MyCalendarTwo() Initializes the calendar object.
boolean book(int start, int end) Returns true if the event can be added to the calendar successfully without causing a triple booking. Otherwise, return false and do not add the event to the calendar.

Example 1:
Input
["MyCalendarTwo", "book", "book", "book", "book", "book", "book"]
[[], [10, 20], [50, 60], [10, 40], [5, 15], [5, 10], [25, 55]]
Output
[null, true, true, true, false, true, true]
Explanation
MyCalendarTwo myCalendarTwo = new MyCalendarTwo();
myCalendarTwo.book(10, 20); // return True, The event can be booked. 
myCalendarTwo.book(50, 60); // return True, The event can be booked. 
myCalendarTwo.book(10, 40); // return True, The event can be double booked. 
myCalendarTwo.book(5, 15);  // return False, The event cannot be booked, because it would result in a triple booking.
myCalendarTwo.book(5, 10); // return True, The event can be booked, as it does not use time 10 which is already double booked.
myCalendarTwo.book(25, 55); // return True, The event can be booked, as the time in [25, 40) will be double booked with the third event, the time [40, 50) will be single booked, and the time [50, 55) will be double booked with the second event.

Constraints:
0 <= start < end <= 10^9
At most 1000 calls will be made to book.

</> Typescript Code:
*/

/**
 * Your MyCalendarTwo object will be instantiated and called as such:
 * var obj = new MyCalendarTwo()
 * var param_1 = obj.book(start,end)
 */

class MyCalendarTwo {
  private events: [number, number][] = []; // List to store all the booked events
  private overlaps: [number, number][] = []; // List to store all the overlapping events (double-booked time slots)

  // The book method to add an event if it doesn't cause a triple booking
  book(start: number, end: number): boolean {
    // First, check if the new event would cause a triple booking
    for (let [s, e] of this.overlaps) {
      // If the new event overlaps with an already double-booked time range, reject it
      if (start < e && end > s) return false;
    }

    // Then, check for overlaps with already existing single events
    for (let [s, e] of this.events) {
      // If there is an overlap with any single event, we push the overlap range to the overlaps list
      if (start < e && end > s) {
        this.overlaps.push([Math.max(start, s), Math.min(end, e)]); // The overlap range is the maximum of the starts and the minimum of the ends
      }
    }

    // After handling overlaps, add the current event to the event list
    this.events.push([start, end]);

    // Return true indicating the booking was successful without causing a triple booking
    return true;
  }
}

/* 
641. Design Circular Deque

Design your implementation of the circular double-ended queue (deque).

Implement the MyCircularDeque class:
MyCircularDeque(int k) Initializes the deque with a maximum size of k.
boolean insertFront() Adds an item at the front of Deque. Returns true if the operation is successful, or false otherwise.
boolean insertLast() Adds an item at the rear of Deque. Returns true if the operation is successful, or false otherwise.
boolean deleteFront() Deletes an item from the front of Deque. Returns true if the operation is successful, or false otherwise.
boolean deleteLast() Deletes an item from the rear of Deque. Returns true if the operation is successful, or false otherwise.
int getFront() Returns the front item from the Deque. Returns -1 if the deque is empty.
int getRear() Returns the last item from Deque. Returns -1 if the deque is empty.
boolean isEmpty() Returns true if the deque is empty, or false otherwise.
boolean isFull() Returns true if the deque is full, or false otherwise.

Example 1:
Input
["MyCircularDeque", "insertLast", "insertLast", "insertFront", "insertFront", "getRear", "isFull", "deleteLast", "insertFront", "getFront"]
[[3], [1], [2], [3], [4], [], [], [], [4], []]
Output
[null, true, true, true, false, 2, true, true, true, 4]
Explanation
MyCircularDeque myCircularDeque = new MyCircularDeque(3);
myCircularDeque.insertLast(1);  // return True
myCircularDeque.insertLast(2);  // return True
myCircularDeque.insertFront(3); // return True
myCircularDeque.insertFront(4); // return False, the queue is full.
myCircularDeque.getRear();      // return 2
myCircularDeque.isFull();       // return True
myCircularDeque.deleteLast();   // return True
myCircularDeque.insertFront(4); // return True
myCircularDeque.getFront();     // return 4

Constraints:
1 <= k <= 1000
0 <= value <= 1000
At most 2000 calls will be made to insertFront, insertLast, deleteFront, deleteLast, getFront, getRear, isEmpty, isFull.

</> Typescript Code:
*/

/**
 * Your MyCircularDeque object will be instantiated and called as such:
 * var obj = new MyCircularDeque(k)
 * var param_1 = obj.insertFront(value)
 * var param_2 = obj.insertLast(value)
 * var param_3 = obj.deleteFront()
 * var param_4 = obj.deleteLast()
 * var param_5 = obj.getFront()
 * var param_6 = obj.getRear()
 * var param_7 = obj.isEmpty()
 * var param_8 = obj.isFull()
 */

class MyCircularDeque {
  private deque: number[]; // Array to store elements in deque
  private maxSize: number; // Maximum size allowed for deque

  // Constructor initializes the deque with a max size 'k'
  constructor(k: number) {
    this.deque = []; // Initialize deque as an empty array
    this.maxSize = k; // Set the max size to the input value 'k'
  }

  // Inserts an item at the front of the deque
  insertFront(value: number): boolean {
    // If deque is full, return false
    if (this.isFull()) return false;
    // Add the item to the front of the deque
    this.deque.unshift(value);
    // Return true to indicate successful insertion
    return true;
  }

  // Inserts an item at the rear of the deque
  insertLast(value: number): boolean {
    // If deque is full, return false
    if (this.isFull()) return false;
    // Add the item to the rear of the deque
    this.deque.push(value);
    // Return true to indicate successful insertion
    return true;
  }

  // Deletes an item from the front of the deque
  deleteFront(): boolean {
    // If deque is empty, return false
    if (this.isEmpty()) return false;
    // Remove the item from the front of the deque
    this.deque.shift();
    // Return true to indicate successful deletion
    return true;
  }

  // Deletes an item from the rear of the deque
  deleteLast(): boolean {
    // If deque is empty, return false
    if (this.isEmpty()) return false;
    // Remove the item from the rear of the deque
    this.deque.pop();
    // Return true to indicate successful deletion
    return true;
  }

  // Returns the front item from the deque
  getFront(): number {
    // Return -1 if deque is empty, otherwise return the front item
    return this.isEmpty() ? -1 : this.deque[0];
  }

  // Returns the last item from the deque
  getRear(): number {
    // Return -1 if deque is empty, otherwise return the rear item
    return this.isEmpty() ? -1 : this.deque[this.deque.length - 1];
  }

  // Returns true if the deque is empty
  isEmpty(): boolean {
    // Check if the deque has no elements
    return this.deque.length === 0;
  }

  // Returns true if the deque is full
  isFull(): boolean {
    // Check if the deque has reached its maximum size
    return this.deque.length === this.maxSize;
  }
}

/* 
1381. Design a Stack With Increment Operation

Design a stack that supports increment operations on its elements.

Implement the CustomStack class:

CustomStack(int maxSize) Initializes the object with maxSize which is the maximum number of elements in the stack.
void push(int x) Adds x to the top of the stack if the stack has not reached the maxSize.
int pop() Pops and returns the top of the stack or -1 if the stack is empty.
void inc(int k, int val) Increments the bottom k elements of the stack by val. If there are less than k elements in the stack, increment all the elements in the stack.

Example 1:
Input
["CustomStack","push","push","pop","push","push","push","increment","increment","pop","pop","pop","pop"]
[[3],[1],[2],[],[2],[3],[4],[5,100],[2,100],[],[],[],[]]
Output
[null,null,null,2,null,null,null,null,null,103,202,201,-1]
Explanation
CustomStack stk = new CustomStack(3); // Stack is Empty []
stk.push(1);                          // stack becomes [1]
stk.push(2);                          // stack becomes [1, 2]
stk.pop();                            // return 2 --> Return top of the stack 2, stack becomes [1]
stk.push(2);                          // stack becomes [1, 2]
stk.push(3);                          // stack becomes [1, 2, 3]
stk.push(4);                          // stack still [1, 2, 3], Do not add another elements as size is 4
stk.increment(5, 100);                // stack becomes [101, 102, 103]
stk.increment(2, 100);                // stack becomes [201, 202, 103]
stk.pop();                            // return 103 --> Return top of the stack 103, stack becomes [201, 202]
stk.pop();                            // return 202 --> Return top of the stack 202, stack becomes [201]
stk.pop();                            // return 201 --> Return top of the stack 201, stack becomes []
stk.pop();                            // return -1 --> Stack is empty return -1.

Constraints:
1 <= maxSize, x, k <= 1000
0 <= val <= 100
At most 1000 calls will be made to each method of increment, push and pop each separately.

</> Typescript Code:
*/

/**
 * Your CustomStack object will be instantiated and called as such:
 * var obj = new CustomStack(maxSize)
 * obj.push(x)
 * var param_2 = obj.pop()
 * obj.increment(k,val)
 */

class CustomStack {
  private stack: number[]; // Array to hold the stack elements
  private increments: number[]; // Array to keep track of increments for each index
  private maxSize: number; // Maximum size of the stack

  constructor(maxSize: number) {
    this.maxSize = maxSize; // Initialize maxSize
    this.stack = []; // Initialize stack array
    this.increments = new Array(maxSize).fill(0); // Initialize increments array to zero
  }

  push(x: number): void {
    if (this.stack.length < this.maxSize) {
      // Check if stack has space
      this.stack.push(x); // Add element to the top of the stack
    }
  }

  pop(): number {
    if (this.stack.length === 0) return -1; // Return -1 if the stack is empty
    const index = this.stack.length - 1; // Get the index of the top element
    const value = this.stack.pop()! + this.increments[index]; // Pop the top element and add any increments
    if (index > 0) this.increments[index - 1] += this.increments[index]; // Propagate the increment to the next element
    this.increments[index] = 0; // Reset the increment for the popped element
    return value; // Return the value of the popped element
  }

  increment(k: number, val: number): void {
    const limit = Math.min(k, this.stack.length); // Determine how many elements to increment
    if (limit > 0) this.increments[limit - 1] += val; // Increment the bottom `limit` elements
  }
}

/* 
1497. Check If Array Pairs Are Divisible by k

Given an array of integers arr of even length n and an integer k.

We want to divide the array into exactly n / 2 pairs such that the sum of each pair is divisible by k.

Return true If you can find a way to do that or false otherwise.

Example 1:
Input: arr = [1,2,3,4,5,10,6,7,8,9], k = 5
Output: true
Explanation: Pairs are (1,9),(2,8),(3,7),(4,6) and (5,10).

Example 2:
Input: arr = [1,2,3,4,5,6], k = 7
Output: true
Explanation: Pairs are (1,6),(2,5) and(3,4).

Example 3:
Input: arr = [1,2,3,4,5,6], k = 10
Output: false
Explanation: You can try all possible pairs to see that there is no way to divide arr into 3 pairs each with sum divisible by 10.

Constraints:
arr.length == n
1 <= n <= 10^5
n is even.
-10^9 <= arr[i] <= 10^9
1 <= k <= 10^5

</> Typescript Code:
*/

function canArrange(arr: number[], k: number): boolean {
  // Create an array to count occurrences of each remainder when divided by k
  const remainderCount = new Array(k).fill(0);

  // Iterate through each number in the input array
  for (const num of arr) {
    // Calculate the normalized remainder (non-negative)
    const remainder = ((num % k) + k) % k;
    // Increment the count for this remainder
    remainderCount[remainder]++;
  }

  // If the count of numbers that have a remainder of 0 is odd, we cannot form pairs
  if (remainderCount[0] % 2 !== 0) return false;

  // Check if for each remainder i, the count of i matches the count of (k - i)
  for (let i = 1; i <= k / 2; i++) {
    // If counts do not match, we cannot form valid pairs
    if (remainderCount[i] !== remainderCount[k - i]) return false;
  }

  // All conditions satisfied, we can form pairs
  return true;
}

/* 
1590. Make Sum Divisible by P

Given an array of positive integers nums, remove the smallest subarray (possibly empty) such that the sum of the remaining elements is divisible by p. It is not allowed to remove the whole array.

Return the length of the smallest subarray that you need to remove, or -1 if it's impossible.

A subarray is defined as a contiguous block of elements in the array.

Example 1:
Input: nums = [3,1,4,2], p = 6
Output: 1
Explanation: The sum of the elements in nums is 10, which is not divisible by 6. We can remove the subarray [4], and the sum of the remaining elements is 6, which is divisible by 6.

Example 2:
Input: nums = [6,3,5,2], p = 9
Output: 2
Explanation: We cannot remove a single element to get a sum divisible by 9. The best way is to remove the subarray [5,2], leaving us with [6,3] with sum 9.

Example 3:
Input: nums = [1,2,3], p = 3
Output: 0
Explanation: Here the sum is 6. which is already divisible by 3. Thus we do not need to remove anything.

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^9
1 <= p <= 10^9

</> Typescript Code:
*/

function minSubarray(nums: number[], p: number): number {
  // Calculate the total sum modulo p
  const totalSum = nums.reduce((acc, num) => (acc + num) % p, 0);
  const remainder = totalSum % p;

  // If the total sum is already divisible by p, return 0
  if (remainder === 0) return 0;

  // Map to store the earliest index of each modulo value
  const map = new Map<number, number>();

  // Variable to track the current cumulative sum modulo p
  let currentSum = 0;

  // Variable to store the minimum length of the subarray found
  let minLength = Infinity;

  // Initialize map to handle cases where the subarray starts from index 0
  map.set(0, -1);

  // Loop through the array
  for (let i = 0; i < nums.length; i++) {
    // Update the cumulative sum modulo p
    currentSum = (currentSum + nums[i]) % p;

    // Calculate the needed modulo to make the remaining sum divisible by p
    const neededMod = (currentSum - remainder + p) % p;

    // If the needed modulo is found in the map, update the minimum length
    if (map.has(neededMod)) {
      minLength = Math.min(minLength, i - map.get(neededMod)!);
    }

    // Update the map with the current modulo and index
    map.set(currentSum, i);
  }

  // If no valid subarray is found or the entire array needs to be removed, return -1
  return minLength === Infinity || minLength === nums.length ? -1 : minLength;
}

/* 
2491. Divide Players Into Teams of Equal Skill

You are given a positive integer array skill of even length n where skill[i] denotes the skill of the ith player. Divide the players into n / 2 teams of size 2 such that the total skill of each team is equal.

The chemistry of a team is equal to the product of the skills of the players on that team.

Return the sum of the chemistry of all the teams, or return -1 if there is no way to divide the players into teams such that the total skill of each team is equal.

Example 1:
Input: skill = [3,2,5,1,3,4]
Output: 22
Explanation: 
Divide the players into the following teams: (1, 5), (2, 4), (3, 3), where each team has a total skill of 6.
The sum of the chemistry of all the teams is: 1 * 5 + 2 * 4 + 3 * 3 = 5 + 8 + 9 = 22.

Example 2:
Input: skill = [3,4]
Output: 12
Explanation: 
The two players form a team with a total skill of 7.
The chemistry of the team is 3 * 4 = 12.

Example 3:
Input: skill = [1,1,2,3]
Output: -1
Explanation: 
There is no way to divide the players into teams such that the total skill of each team is equal.

Constraints:
2 <= skill.length <= 10^5
skill.length is even.
1 <= skill[i] <= 1000

</> Typescript Code:
*/

function dividePlayers(skill: number[]): number {
  // Store the number of players, which is always an even number
  const n = skill.length;

  // Sort the array in ascending order so that we can easily pair the weakest with the strongest
  skill.sort((a, b) => a - b);

  // Calculate the expected total skill of the first team (smallest + largest value)
  let totalSkill = skill[0] + skill[n - 1];

  // Initialize a variable to store the sum of the chemistry of all teams
  let chemistrySum = 0;

  // Iterate through the first half of the array, pairing weakest with strongest
  for (let i = 0; i < n / 2; i++) {
    // If the sum of the pair is not equal to the total skill, return -1 (not possible to divide teams)
    if (skill[i] + skill[n - 1 - i] !== totalSkill) {
      return -1;
    }

    // If valid, add the chemistry (product of their skills) to the total chemistry sum
    chemistrySum += skill[i] * skill[n - 1 - i];
  }

  // Return the sum of all chemistry values of valid teams
  return chemistrySum;
}

/* 
567. Permutation in String

Given two strings s1 and s2, return true if s2 contains a 
permutation of s1, or false otherwise.

In other words, return true if one of s1's permutations is the substring of s2.

Example 1:
Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").

Example 2:
Input: s1 = "ab", s2 = "eidboaoo"
Output: false

Constraints:
1 <= s1.length, s2.length <= 10^4
s1 and s2 consist of lowercase English letters.

</> Typescript Code:
*/

function checkInclusion(s1: string, s2: string): boolean {
  // Edge case: if s1 is longer than s2, there can be no valid permutation
  if (s1.length > s2.length) return false;

  // Arrays to store the frequency of each character (26 letters in the alphabet)
  const s1Count = new Array(26).fill(0);
  const s2Count = new Array(26).fill(0);

  // Populate frequency counts for the first 's1.length' characters in both strings
  for (let i = 0; i < s1.length; i++) {
    s1Count[s1.charCodeAt(i) - 97]++; // count chars in s1
    s2Count[s2.charCodeAt(i) - 97]++; // count first window of chars in s2
  }

  // Variable to track how many characters have matching frequencies between s1 and current window of s2
  let matches = 0;
  for (let i = 0; i < 26; i++) {
    if (s1Count[i] === s2Count[i]) matches++; // count initial matches
  }

  // Sliding window starts after the first 's1.length' characters in s2
  for (let i = s1.length; i < s2.length; i++) {
    // If all 26 character frequencies match, we have found a valid permutation
    if (matches === 26) return true;

    // Add new character to the window (right end)
    const indexNew = s2.charCodeAt(i) - 97; // get index for new char
    s2Count[indexNew]++;
    // Update match count based on the new char
    if (s2Count[indexNew] === s1Count[indexNew]) {
      matches++; // if new char matches s1's count
    } else if (s2Count[indexNew] === s1Count[indexNew] + 1) {
      matches--; // if new char frequency exceeds s1's count
    }

    // Remove old character from the window (left end)
    const indexOld = s2.charCodeAt(i - s1.length) - 97; // get index for old char
    s2Count[indexOld]--;
    // Update match count based on the removed char
    if (s2Count[indexOld] === s1Count[indexOld]) {
      matches++; // if old char count returns to match s1
    } else if (s2Count[indexOld] === s1Count[indexOld] - 1) {
      matches--; // if old char count drops below s1's
    }
  }

  // Final check after the loop completes
  return matches === 26;
}

/* 
1813. Sentence Similarity III

You are given two strings sentence1 and sentence2, each representing a sentence composed of words. A sentence is a list of words that are separated by a single space with no leading or trailing spaces. Each word consists of only uppercase and lowercase English characters.

Two sentences s1 and s2 are considered similar if it is possible to insert an arbitrary sentence (possibly empty) inside one of these sentences such that the two sentences become equal. Note that the inserted sentence must be separated from existing words by spaces.

For example,

s1 = "Hello Jane" and s2 = "Hello my name is Jane" can be made equal by inserting "my name is" between "Hello" and "Jane" in s1.
s1 = "Frog cool" and s2 = "Frogs are cool" are not similar, since although there is a sentence "s are" inserted into s1, it is not separated from "Frog" by a space.
Given two sentences sentence1 and sentence2, return true if sentence1 and sentence2 are similar. Otherwise, return false.

Example 1:
Input: sentence1 = "My name is Haley", sentence2 = "My Haley"
Output: true
Explanation:
sentence2 can be turned to sentence1 by inserting "name is" between "My" and "Haley".

Example 2:
Input: sentence1 = "of", sentence2 = "A lot of words"
Output: false
Explanation:
No single sentence can be inserted inside one of the sentences to make it equal to the other.

Example 3:
Input: sentence1 = "Eating right now", sentence2 = "Eating"
Output: true
Explanation:
sentence2 can be turned to sentence1 by inserting "right now" at the end of the sentence.


Constraints:
1 <= sentence1.length, sentence2.length <= 100
sentence1 and sentence2 consist of lowercase and uppercase English letters and spaces.
The words in sentence1 and sentence2 are separated by a single space.

</> Typescript Code:
*/

function areSentencesSimilar(sentence1: string, sentence2: string): boolean {
  // Split both sentences into arrays of words for comparison
  const s1 = sentence1.split(' ');
  const s2 = sentence2.split(' ');

  // Initialize pointers for the front comparison (i) and rear comparison (j)
  let i = 0,
    j = 0;

  // Move the front pointer i while both arrays' words match from the start
  while (i < s1.length && i < s2.length && s1[i] === s2[i]) i++;

  // Move the rear pointer j while both arrays' words match from the end
  while (j < s1.length - i && j < s2.length - i && s1[s1.length - 1 - j] === s2[s2.length - 1 - j])
    j++;

  // Check if the total matched words (from the front and rear) cover the length of the smaller sentence
  return i + j >= Math.min(s1.length, s2.length);
}

/* 
1963. Minimum Number of Swaps to Make the String Balanced

You are given a 0-indexed string s of even length n. The string consists of exactly n / 2 opening brackets '[' and n / 2 closing brackets ']'.

A string is called balanced if and only if:

It is the empty string, or
It can be written as AB, where both A and B are balanced strings, or
It can be written as [C], where C is a balanced string.
You may swap the brackets at any two indices any number of times.

Return the minimum number of swaps to make s balanced.

Example 1:
Input: s = "][]["
Output: 1
Explanation: You can make the string balanced by swapping index 0 with index 3.
The resulting string is "[[]]".

Example 2:
Input: s = "]]][[["
Output: 2
Explanation: You can do the following to make the string balanced:
- Swap index 0 with index 4. s = "[]][][".
- Swap index 1 with index 5. s = "[[][]]".
The resulting string is "[[][]]".

Example 3:
Input: s = "[]"
Output: 0
Explanation: The string is already balanced.

Constraints:
n == s.length
2 <= n <= 10^6
n is even.
s[i] is either '[' or ']'.
The number of opening brackets '[' equals n / 2, and the number of closing brackets ']' equals n / 2.

</> Typescript Code:
*/

function minSwaps(s: string): number {
  let imbalance = 0; // Tracks how many more opening brackets are needed to balance the string
  let swaps = 0; // Tracks the minimum number of swaps needed

  // Loop through each character in the string
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '[') {
      // If an opening bracket is found, increase imbalance since we now need one more closing bracket
      imbalance++;
    } else {
      // If a closing bracket is found
      if (imbalance > 0) {
        // If there is an opening bracket to balance it with, decrease the imbalance
        imbalance--;
      } else {
        // If there's no imbalance (no preceding opening bracket), we need a swap
        swaps++;
        // After the swap, we assume that this unbalanced ']' has been balanced with a new '['
        imbalance = 1;
      }
    }
  }

  // The final value of swaps will give the minimum number of swaps needed
  return swaps;
}

/* 
921. Minimum Add to Make Parentheses Valid

A parentheses string is valid if and only if:

It is the empty string,
It can be written as AB (A concatenated with B), where A and B are valid strings, or
It can be written as (A), where A is a valid string.
You are given a parentheses string s. In one move, you can insert a parenthesis at any position of the string.

For example, if s = "()))", you can insert an opening parenthesis to be "(()))" or a closing parenthesis to be "())))".
Return the minimum number of moves required to make s valid.

Example 1:
Input: s = "())"
Output: 1

Example 2:
Input: s = "((("
Output: 3

Constraints:
1 <= s.length <= 1000
s[i] is either '(' or ')'.

</> Typescript Code:
*/

function minAddToMakeValid(s: string): number {
  let open = 0; // To keep track of unclosed '(' parentheses
  let close = 0; // To track unmatched ')' parentheses

  // Iterate through each character in the string
  for (let char of s) {
    if (char === '(') {
      open++; // Increment 'open' for each '(' found
    } else if (open > 0) {
      open--; // If there is an unmatched '(', pair it with the current ')'
    } else {
      close++; // If no '(' available, increase 'close' for unmatched ')'
    }
  }

  // The result is the sum of unclosed '(' and unmatched ')'
  return open + close;
}

/* 
962. Maximum Width Ramp

A ramp in an integer array nums is a pair (i, j) for which i < j and nums[i] <= nums[j]. The width of such a ramp is j - i.

Given an integer array nums, return the maximum width of a ramp in nums. If there is no ramp in nums, return 0.

Example 1:
Input: nums = [6,0,8,2,1,5]
Output: 4
Explanation: The maximum width ramp is achieved at (i, j) = (1, 5): nums[1] = 0 and nums[5] = 5.

Example 2:
Input: nums = [9,8,1,0,1,9,4,0,4,1]
Output: 7
Explanation: The maximum width ramp is achieved at (i, j) = (2, 9): nums[2] = 1 and nums[9] = 1.

Constraints:
2 <= nums.length <= 5 * 10^4
0 <= nums[i] <= 5 * 10^4

</> Typescript Code:
*/

function maxWidthRamp(nums: number[]): number {
  const n = nums.length; // Store the length of the input array
  const stack: number[] = []; // Stack to store indices of decreasing values

  // First pass to build the stack
  for (let i = 0; i < n; i++) {
    // If the stack is empty or the last element in the stack is greater than nums[i]
    // we push the index because we're looking for potential starting points of a ramp
    if (stack.length === 0 || nums[stack[stack.length - 1]] > nums[i]) {
      stack.push(i); // Push the index into the stack
    }
  }

  let maxRamp = 0; // Variable to store the maximum width of a ramp

  // Second pass: Iterate from the end to find the maximum ramp
  for (let j = n - 1; j >= 0; j--) {
    // Check the top of the stack to see if a valid ramp can be made with nums[j]
    // Keep popping from the stack as long as nums[j] is larger than or equal to nums[stack top]
    while (stack.length > 0 && nums[stack[stack.length - 1]] <= nums[j]) {
      // Calculate the ramp width as j - stack.pop()
      maxRamp = Math.max(maxRamp, j - stack.pop()!);
    }
  }

  return maxRamp; // Return the maximum width ramp found
}

/* 
1942. The Number of the Smallest Unoccupied Chair

There is a party where n friends numbered from 0 to n - 1 are attending. There is an infinite number of chairs in this party that are numbered from 0 to infinity. When a friend arrives at the party, they sit on the unoccupied chair with the smallest number.

For example, if chairs 0, 1, and 5 are occupied when a friend comes, they will sit on chair number 2.
When a friend leaves the party, their chair becomes unoccupied at the moment they leave. If another friend arrives at that same moment, they can sit in that chair.

You are given a 0-indexed 2D integer array times where times[i] = [arrivali, leavingi], indicating the arrival and leaving times of the ith friend respectively, and an integer targetFriend. All arrival times are distinct.

Return the chair number that the friend numbered targetFriend will sit on.

Example 1:
Input: times = [[1,4],[2,3],[4,6]], targetFriend = 1
Output: 1
Explanation: 
- Friend 0 arrives at time 1 and sits on chair 0.
- Friend 1 arrives at time 2 and sits on chair 1.
- Friend 1 leaves at time 3 and chair 1 becomes empty.
- Friend 0 leaves at time 4 and chair 0 becomes empty.
- Friend 2 arrives at time 4 and sits on chair 0.
Since friend 1 sat on chair 1, we return 1.

Example 2:
Input: times = [[3,10],[1,5],[2,6]], targetFriend = 0
Output: 2
Explanation: 
- Friend 1 arrives at time 1 and sits on chair 0.
- Friend 2 arrives at time 2 and sits on chair 1.
- Friend 0 arrives at time 3 and sits on chair 2.
- Friend 1 leaves at time 5 and chair 0 becomes empty.
- Friend 2 leaves at time 6 and chair 1 becomes empty.
- Friend 0 leaves at time 10 and chair 2 becomes empty.
Since friend 0 sat on chair 2, we return 2.

Constraints:
n == times.length
2 <= n <= 10^4
times[i].length == 2
1 <= arrivali < leavingi <= 105
0 <= targetFriend <= n - 1
Each arrivali time is distinct.

</> Typescript Code:
*/

function smallestChair(times: number[][], targetFriend: number): number {
  const n = times.length; // Number of friends
  const events: [number, number, number][] = []; // Events array

  // Create arrival and leaving events
  for (let i = 0; i < n; i++) {
    events.push([times[i][0], 1, i]); // Arrival event: time, type=1, friend index
    events.push([times[i][1], 0, i]); // Leaving event: time, type=0, friend index
  }

  // Sort events by time, then by type (leaving before arrival)
  events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  const availableChairs = new MinHeap(); // Min-heap for available chairs
  let nextChair = 0; // Next chair number to assign if no chairs are available
  const friendToChair = new Array(n); // Map friend index to chair number

  // Process each event in order
  for (let i = 0; i < events.length; i++) {
    const [_, type, friend] = events[i];
    if (type === 0) {
      // Leaving event: add chair back to available chairs
      availableChairs.insert(friendToChair[friend]);
    } else {
      // Arrival event: assign a chair
      const chair = availableChairs.size > 0 ? availableChairs.extractMin() : nextChair++;
      friendToChair[friend] = chair; // Map friend to chair
      if (friend === targetFriend) return chair; // Return if target friend
    }
  }
  return -1; // Should not reach here
}

// Min-heap implementation
class MinHeap {
  heap: number[] = [];

  // Get size of the heap
  get size() {
    return this.heap.length;
  }

  // Insert value into heap
  insert(val: number) {
    const heap = this.heap;
    heap.push(val); // Add value to the end
    let i = heap.length - 1; // Start from the last index

    // Bubble up the value to maintain heap property
    while (i > 0) {
      const parent = (i - 1) >> 1; // Parent index
      if (heap[parent] <= heap[i]) break; // Correct position found
      [heap[i], heap[parent]] = [heap[parent], heap[i]]; // Swap with parent
      i = parent; // Move to parent's index
    }
  }

  // Extract minimum value from heap
  extractMin(): number {
    const heap = this.heap;
    const min = heap[0]; // Minimum is at root
    const last = heap.pop(); // Remove last element

    if (heap.length > 0) {
      heap[0] = last!; // Move last element to root
      let i = 0;

      // Bubble down to maintain heap property
      while (true) {
        let left = (i << 1) + 1; // Left child index
        let right = left + 1; // Right child index
        let smallest = i;

        if (left < heap.length && heap[left] < heap[smallest]) smallest = left;
        if (right < heap.length && heap[right] < heap[smallest]) smallest = right;
        if (smallest === i) break; // Heap property restored

        [heap[i], heap[smallest]] = [heap[smallest], heap[i]]; // Swap with smallest child
        i = smallest; // Move to smallest child's index
      }
    }
    return min; // Return minimum value
  }
}

/* 
2406. Divide Intervals Into Minimum Number of Groups

You are given a 2D integer array intervals where intervals[i] = [lefti, righti] represents the inclusive interval [lefti, righti].

You have to divide the intervals into one or more groups such that each interval is in exactly one group, and no two intervals that are in the same group intersect each other.

Return the minimum number of groups you need to make.

Two intervals intersect if there is at least one common number between them. For example, the intervals [1, 5] and [5, 8] intersect.

Example 1:
Input: intervals = [[5,10],[6,8],[1,5],[2,3],[1,10]]
Output: 3
Explanation: We can divide the intervals into the following groups:
- Group 1: [1, 5], [6, 8].
- Group 2: [2, 3], [5, 10].
- Group 3: [1, 10].
It can be proven that it is not possible to divide the intervals into fewer than 3 groups.

Example 2:
Input: intervals = [[1,3],[5,6],[8,10],[11,13]]
Output: 1
Explanation: None of the intervals overlap, so we can put all of them in one group.

Constraints:
1 <= intervals.length <= 10^5
intervals[i].length == 2
1 <= lefti <= righti <= 10^6

</> Typescript Code:
*/

function minGroups(intervals: number[][]): number {
  // Initialize an array to hold all start and end events
  const events: [number, number][] = [];
  // Iterate over each interval to populate events
  for (const [start, end] of intervals) {
    events.push([start, 0]); // Start event marked with type 0
    events.push([end, 1]); // End event marked with type 1
  }
  // Sort events by time; if times are equal, start events come first
  events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  // Initialize counters for current overlap and maximum overlap
  let overlap = 0,
    maxOverlap = 0;
  // Process each event in chronological order
  for (const [_, type] of events) {
    if (type === 0) {
      // Start event: increment overlap count
      overlap++;
      // Update maximum overlap if current overlap is greater
      if (overlap > maxOverlap) maxOverlap = overlap;
    } else {
      // End event: decrement overlap count
      overlap--;
    }
  }
  // Return the maximum number of overlaps found
  return maxOverlap;
}

/* 
2530. Maximal Score After Applying K Operations

You are given a 0-indexed integer array nums and an integer k. You have a starting score of 0.

In one operation:

choose an index i such that 0 <= i < nums.length,
increase your score by nums[i], and
replace nums[i] with ceil(nums[i] / 3).
Return the maximum possible score you can attain after applying exactly k operations.

The ceiling function ceil(val) is the least integer greater than or equal to val.

Example 1:
Input: nums = [10,10,10,10,10], k = 5
Output: 50
Explanation: Apply the operation to each array element exactly once. The final score is 10 + 10 + 10 + 10 + 10 = 50.

Example 2:
Input: nums = [1,10,3,3,3], k = 3
Output: 17
Explanation: You can do the following operations:
Operation 1: Select i = 1, so nums becomes [1,4,3,3,3]. Your score increases by 10.
Operation 2: Select i = 1, so nums becomes [1,2,3,3,3]. Your score increases by 4.
Operation 3: Select i = 2, so nums becomes [1,1,1,3,3]. Your score increases by 3.
The final score is 10 + 4 + 3 = 17.

Constraints:
1 <= nums.length, k <= 10^5
1 <= nums[i] <= 10^9

</> Typescript Code:
*/

function maxKelements(nums: number[], k: number): number {
  // Define a MaxHeap class to manage the elements efficiently
  class MaxHeap {
    heap: number[];

    constructor(data: number[]) {
      this.heap = [];
      // Build the heap by inserting all elements
      for (let num of data) {
        this.insert(num);
      }
    }

    // Insert a new value into the heap
    insert(value: number) {
      this.heap.push(value);
      this.bubbleUp(this.heap.length - 1);
    }

    // Move the newly added element up to maintain heap property
    bubbleUp(index: number) {
      while (index > 0) {
        let parent = Math.floor((index - 1) / 2);
        // If parent is greater or equal, the heap property is satisfied
        if (this.heap[parent] >= this.heap[index]) break;
        // Swap parent and child
        [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
        index = parent; // Move up to the parent's index
      }
    }

    // Extract the maximum element from the heap
    extractMax(): number {
      const max = this.heap[0]; // The root of the heap is the maximum element
      const end = this.heap.pop(); // Remove the last element
      if (this.heap.length > 0 && end !== undefined) {
        this.heap[0] = end; // Move the last element to the root
        this.sinkDown(0); // Restore the heap property by sinking down the new root
      }
      return max; // Return the maximum value
    }

    // Move the element at index down to maintain heap property
    sinkDown(index: number) {
      const length = this.heap.length;
      const element = this.heap[index];
      while (true) {
        let left = 2 * index + 1; // Left child index
        let right = 2 * index + 2; // Right child index
        let swap: number | null = null;

        // Check if left child exists and is greater than the current element
        if (left < length && this.heap[left] > element) {
          swap = left;
        }
        // Check if right child exists and is greater than both the current element and left child
        if (right < length && this.heap[right] > (swap === null ? element : this.heap[left])) {
          swap = right;
        }
        // If no swap needed, the heap property is satisfied
        if (swap === null) break;
        // Swap the current element with the larger child
        [this.heap[index], this.heap[swap]] = [this.heap[swap], this.heap[index]];
        index = swap; // Move down to the child's index
      }
    }

    // Check if the heap is empty
    isEmpty(): boolean {
      return this.heap.length === 0;
    }
  }

  // Initialize the max heap with the given numbers
  let maxHeap = new MaxHeap(nums);
  let score = 0; // Initialize the total score

  // Perform k operations
  for (let i = 0; i < k; i++) {
    let maxVal = maxHeap.extractMax(); // Get the maximum value
    score += maxVal; // Increase the score by the maximum value

    // Compute the new value as ceil(maxVal / 3)
    let newVal = Math.floor((maxVal + 2) / 3);
    maxHeap.insert(newVal); // Insert the new value back into the heap
  }
  return score; // Return the maximum possible score after k operations
}

/* 
2938. Separate Black and White Balls

There are n balls on a table, each ball has a color black or white.

You are given a 0-indexed binary string s of length n, where 1 and 0 represent black and white balls, respectively.

In each step, you can choose two adjacent balls and swap them.

Return the minimum number of steps to group all the black balls to the right and all the white balls to the left.

Example 1:
Input: s = "101"
Output: 1
Explanation: We can group all the black balls to the right in the following way:
- Swap s[0] and s[1], s = "011".
Initially, 1s are not grouped together, requiring at least 1 step to group them to the right.

Example 2:
Input: s = "100"
Output: 2
Explanation: We can group all the black balls to the right in the following way:
- Swap s[0] and s[1], s = "010".
- Swap s[1] and s[2], s = "001".
It can be proven that the minimum number of steps needed is 2.

Example 3:
Input: s = "0111"
Output: 0
Explanation: All the black balls are already grouped to the right.

Constraints:
1 <= n == s.length <= 10^5
s[i] is either '0' or '1'.

</> Typescript Code:
*/

function minimumSteps(s: string): number {
  // Initialize a counter for the number of black balls encountered (1s)
  let blackCount = 0;

  // Initialize the minimum number of steps to 0
  let minSteps = 0;

  // Loop through the binary string s
  for (let i = 0; i < s.length; i++) {
    // If the current ball is black (1)
    if (s[i] === '1') {
      // Increment the black ball count
      blackCount++;
    } else {
      // If the current ball is white (0), accumulate steps by adding the
      // number of black balls encountered so far since they need to be moved
      minSteps += blackCount;
    }
  }

  // Return the total minimum steps needed to group all black balls on the right
  return minSteps;
}

/* 
1405. Longest Happy String

A string s is called happy if it satisfies the following conditions:

s only contains the letters 'a', 'b', and 'c'.
s does not contain any of "aaa", "bbb", or "ccc" as a substring.
s contains at most a occurrences of the letter 'a'.
s contains at most b occurrences of the letter 'b'.
s contains at most c occurrences of the letter 'c'.
Given three integers a, b, and c, return the longest possible happy string. If there are multiple longest happy strings, return any of them. If there is no such string, return the empty string "".

A substring is a contiguous sequence of characters within a string.

Example 1:
Input: a = 1, b = 1, c = 7
Output: "ccaccbcc"
Explanation: "ccbccacc" would also be a correct answer.

Example 2:
Input: a = 7, b = 1, c = 0
Output: "aabaa"
Explanation: It is the only correct answer in this case.

Constraints:
0 <= a, b, c <= 100
a + b + c > 0

</> Typescript Code:
*/

function longestDiverseString(a: number, b: number, c: number): string {
  let result = ''; // Initialize the result string
  let counts = [
    // Create an array to hold counts and corresponding characters
    {char: 'a', count: a},
    {char: 'b', count: b},
    {char: 'c', count: c},
  ];
  while (true) {
    // Loop until we cannot add any more characters
    counts.sort((x, y) => y.count - x.count); // Sort counts in descending order
    let hasNext = false; // Flag to check if a character was added in this iteration
    for (let i = 0; i < 3; i++) {
      // Iterate over the counts
      if (counts[i].count <= 0) {
        // Skip if count is zero
        continue;
      }
      let len = result.length; // Get current length of result
      if (len >= 2 && result[len - 1] === counts[i].char && result[len - 2] === counts[i].char) {
        continue; // Avoid adding a character that would make three in a row
      }
      result += counts[i].char; // Append the character to result
      counts[i].count--; // Decrement the count
      hasNext = true; // Set flag to true
      break; // Break to re-sort and start over
    }
    if (!hasNext) {
      // If no character was added, break the loop
      break;
    }
  }
  return result; // Return the constructed happy string
}

/* 
670. Maximum Swap

You are given an integer num. You can swap two digits at most once to get the maximum valued number.

Return the maximum valued number you can get.

Example 1:
Input: num = 2736
Output: 7236
Explanation: Swap the number 2 and the number 7.

Example 2:
Input: num = 9973
Output: 9973
Explanation: No swap.

Constraints:
0 <= num <= 10^8

</> Typescript Code:
*/

function maximumSwap(num: number): number {
  // Convert the number into an array of its digits
  const digits = num.toString().split('').map(Number);
  // Create an array to keep track of the last occurrence of each digit
  const last = new Array(10).fill(-1);
  // Populate the last occurrence array
  for (let i = 0; i < digits.length; i++) last[digits[i]] = i;
  // Iterate over each digit in the number
  for (let i = 0; i < digits.length; i++) {
    // Check for a larger digit to swap with, starting from 9 down to current digit + 1
    for (let d = 9; d > digits[i]; d--) {
      // If a larger digit exists and is positioned after the current digit
      if (last[d] > i) {
        // Swap the current digit with the larger digit found
        [digits[i], digits[last[d]]] = [digits[last[d]], digits[i]];
        // Return the new number formed after the swap
        return parseInt(digits.join(''));
      }
    }
  }
  // Return the original number if no swap can make it larger
  return num;
}

/* 
2044. Count Number of Maximum Bitwise-OR Subsets

Given an integer array nums, find the maximum possible bitwise OR of a subset of nums and return the number of different non-empty subsets with the maximum bitwise OR.

An array a is a subset of an array b if a can be obtained from b by deleting some (possibly zero) elements of b. Two subsets are considered different if the indices of the elements chosen are different.

The bitwise OR of an array a is equal to a[0] OR a[1] OR ... OR a[a.length - 1] (0-indexed).

Example 1:
Input: nums = [3,1]
Output: 2
Explanation: The maximum possible bitwise OR of a subset is 3. There are 2 subsets with a bitwise OR of 3:
- [3]
- [3,1]

Example 2:
Input: nums = [2,2,2]
Output: 7
Explanation: All non-empty subsets of [2,2,2] have a bitwise OR of 2. There are 23 - 1 = 7 total subsets.

Example 3:
Input: nums = [3,2,1,5]
Output: 6
Explanation: The maximum possible bitwise OR of a subset is 7. There are 6 subsets with a bitwise OR of 7:
- [3,5]
- [3,1,5]
- [3,2,5]
- [3,2,1,5]
- [2,5]
- [2,1,5]

Constraints:
1 <= nums.length <= 16
1 <= nums[i] <= 10^5

</> Typescript Code:
*/

function countMaxOrSubsets(nums: number[]): number {
  // Initialize the maximum possible OR value
  let max_or = 0;
  for (let num of nums) {
    max_or |= num; // Compute the bitwise OR of all elements
  }

  // Initialize a map to store counts of subsets resulting in a particular OR value
  let dp = new Map<number, number>();
  dp.set(0, 1); // Start with an empty subset having OR value 0

  // Iterate over each number in the input array
  for (let num of nums) {
    let new_dp = new Map(dp); // Create a copy of the current dp map
    // For each existing OR value in dp
    for (let [or_val, count] of dp.entries()) {
      let new_or = or_val | num; // Compute new OR value by including num
      // Update the count for the new OR value
      new_dp.set(new_or, (new_dp.get(new_or) || 0) + count);
    }
    dp = new_dp; // Update dp with new_dp for the next iteration
  }

  // Return the count of subsets that result in the maximum OR value
  return dp.get(max_or) || 0;
}

/* 
1545. Find Kth Bit in Nth Binary String

Given two positive integers n and k, the binary string Sn is formed as follows:

S1 = "0"
Si = Si - 1 + "1" + reverse(invert(Si - 1)) for i > 1
Where + denotes the concatenation operation, reverse(x) returns the reversed string x, and invert(x) inverts all the bits in x (0 changes to 1 and 1 changes to 0).

For example, the first four strings in the above sequence are:

S1 = "0"
S2 = "011"
S3 = "0111001"
S4 = "011100110110001"
Return the kth bit in Sn. It is guaranteed that k is valid for the given n.

Example 1:
Input: n = 3, k = 1
Output: "0"
Explanation: S3 is "0111001".
The 1st bit is "0".

Example 2:
Input: n = 4, k = 11
Output: "1"
Explanation: S4 is "011100110110001".
The 11th bit is "1".

Constraints:
1 <= n <= 20
1 <= k <= 2n - 1

</> Typescript Code:
*/

function findKthBit(n: number, k: number): string {
  // Base case: S1 is "0"
  if (n === 1) return '0';

  // Calculate length of Sn: length = 2^n - 1
  const len = (1 << n) - 1;

  // Middle position of Sn
  const mid = len >> 1;

  // If k is at the middle, return "1"
  if (k === mid + 1) return '1';

  // If k is in the first half, recursively find kth bit in Sn-1
  if (k <= mid) return findKthBit(n - 1, k);

  // If k is in the second half, find mirrored position
  // Mirrored position in Sn-1 is (len - k + 1)
  // Invert the bit found in Sn-1
  const mirroredBit = findKthBit(n - 1, len - k + 1) === '0' ? '1' : '0';

  // Return the inverted mirrored bit
  return mirroredBit;
}

/* 
1593. Split a String Into the Max Number of Unique Substrings

Given a string s, return the maximum number of unique substrings that the given string can be split into.

You can split string s into any list of non-empty substrings, where the concatenation of the substrings forms the original string. However, you must split the substrings such that all of them are unique.

A substring is a contiguous sequence of characters within a string.

Example 1:
Input: s = "ababccc"
Output: 5
Explanation: One way to split maximally is ['a', 'b', 'ab', 'c', 'cc']. Splitting like ['a', 'b', 'a', 'b', 'c', 'cc'] is not valid as you have 'a' and 'b' multiple times.

Example 2:
Input: s = "aba"
Output: 2
Explanation: One way to split maximally is ['a', 'ba'].

Example 3:
Input: s = "aa"
Output: 1
Explanation: It is impossible to split the string any further.

Constraints:
1 <= s.length <= 16
s contains only lower case English letters.

</> Typescript Code:
*/

function maxUniqueSplit(s: string): number {
  let maxCount = 0; // Initialize the maximum count of unique substrings
  function backtrack(startIndex: number, used: Set<string>): void {
    // Prune branches where the maximum possible substrings can't exceed current maxCount
    if (used.size + s.length - startIndex <= maxCount) return;
    if (startIndex === s.length) {
      // If we've reached the end of the string
      maxCount = Math.max(maxCount, used.size); // Update maxCount if current used size is larger
      return;
    }
    for (let i = startIndex + 1; i <= s.length; i++) {
      // Iterate over possible end indices
      const substr = s.substring(startIndex, i); // Extract substring from startIndex to i
      if (!used.has(substr)) {
        // Check if the substring is unique
        used.add(substr); // Add substring to the set of used substrings
        backtrack(i, used); // Recurse with the new start index
        used.delete(substr); // Backtrack: remove substring from the set
      }
    }
  }
  backtrack(0, new Set()); // Start backtracking from index 0 with an empty set
  return maxCount; // Return the maximum count of unique substrings found
}

/* 
2583. Kth Largest Sum in a Binary Tree

You are given the root of a binary tree and a positive integer k.

The level sum in the tree is the sum of the values of the nodes that are on the same level.

Return the kth largest level sum in the tree (not necessarily distinct). If there are fewer than k levels in the tree, return -1.

Note that two nodes are on the same level if they have the same distance from the root.

Example 1:
Input: root = [5,8,9,2,1,3,7,4,6], k = 2
Output: 13
Explanation: The level sums are the following:
- Level 1: 5.
- Level 2: 8 + 9 = 17.
- Level 3: 2 + 1 + 3 + 7 = 13.
- Level 4: 4 + 6 = 10.
The 2nd largest level sum is 13.

Example 2:
Input: root = [1,2,null,3], k = 1
Output: 3
Explanation: The largest level sum is 3.

Constraints:
The number of nodes in the tree is n.
2 <= n <= 10^5
1 <= Node.val <= 10^6
1 <= k <= n

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

function kthLargestLevelSum(root: TreeNode | null, k: number): number {
  // If the tree is empty, return -1
  if (!root) return -1;

  // Array to store the sum of each level
  const sums: number[] = [];
  // Initialize queue for BFS with the root node
  let queue: TreeNode[] = [root];

  // Perform BFS traversal to compute level sums
  while (queue.length > 0) {
    // Next level's queue
    const nextQueue: TreeNode[] = [];
    // Sum of the current level
    let levelSum = 0;
    // Iterate over nodes in the current level
    for (const node of queue) {
      // Add current node's value to level sum
      levelSum += node.val;
      // Add left child to nextQueue if it exists
      if (node.left) nextQueue.push(node.left);
      // Add right child to nextQueue if it exists
      if (node.right) nextQueue.push(node.right);
    }
    // Append the level sum to sums array
    sums.push(levelSum);
    // Move to the next level
    queue = nextQueue;
  }

  // If there are fewer levels than k, return -1
  if (sums.length < k) return -1;

  // Quickselect algorithm to find the kth largest level sum
  function quickSelect(nums: number[], k: number): number {
    const n = nums.length;
    // Adjust k to find (n - k)th smallest element
    k = n - k;
    // Recursive function to perform quickselect
    function select(left: number, right: number): number {
      const pivot = nums[right];
      let p = left;
      // Partition the array
      for (let i = left; i < right; i++) {
        if (nums[i] <= pivot) {
          [nums[i], nums[p]] = [nums[p], nums[i]];
          p++;
        }
      }
      // Place pivot in its correct position
      [nums[p], nums[right]] = [nums[right], nums[p]];
      // If pivot is at the kth position, return it
      if (p === k) {
        return nums[p];
      } else if (p < k) {
        // Recurse on the right partition
        return select(p + 1, right);
      } else {
        // Recurse on the left partition
        return select(left, p - 1);
      }
    }
    // Start quickselect on the full array
    return select(0, n - 1);
  }

  // Return the kth largest level sum
  return quickSelect(sums, k);
}

/* 
2641. Cousins in Binary Tree II

Given the root of a binary tree, replace the value of each node in the tree with the sum of all its cousins' values.

Two nodes of a binary tree are cousins if they have the same depth with different parents.

Return the root of the modified tree.

Note that the depth of a node is the number of edges in the path from the root node to it.

Example 1:
Input: root = [5,4,9,1,10,null,7]
Output: [0,0,0,7,7,null,11]
Explanation: The diagram above shows the initial binary tree and the binary tree after changing the value of each node.
- Node with value 5 does not have any cousins so its sum is 0.
- Node with value 4 does not have any cousins so its sum is 0.
- Node with value 9 does not have any cousins so its sum is 0.
- Node with value 1 has a cousin with value 7 so its sum is 7.
- Node with value 10 has a cousin with value 7 so its sum is 7.
- Node with value 7 has cousins with values 1 and 10 so its sum is 11.

Example 2:
Input: root = [3,1,2]
Output: [0,0,0]
Explanation: The diagram above shows the initial binary tree and the binary tree after changing the value of each node.
- Node with value 3 does not have any cousins so its sum is 0.
- Node with value 1 does not have any cousins so its sum is 0.
- Node with value 2 does not have any cousins so its sum is 0.

Constraints:
The number of nodes in the tree is in the range [1, 10^5].
1 <= Node.val <= 10^4

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

function replaceValueInTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null; // If the tree is empty, return null

  const nodeToParent = new Map<TreeNode, TreeNode | null>(); // Map to store each node's parent
  const queue: TreeNode[] = [root]; // Initialize queue for BFS traversal
  nodeToParent.set(root, null); // Root node has no parent

  while (queue.length > 0) {
    const levelSize = queue.length; // Number of nodes at the current level
    let totalSum = 0; // Sum of all node values at the current level
    const parentToChildrenSum = new Map<TreeNode | null, number>(); // Map to store sum of children values for each parent
    const nodesAtLevel: TreeNode[] = []; // List to keep track of nodes at current level

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!; // Dequeue the next node
      nodesAtLevel.push(node); // Add node to current level list
      const parent = nodeToParent.get(node); // Retrieve node's parent

      totalSum += node.val; // Add node's value to total sum
      // Update the sum of values for the parent
      parentToChildrenSum.set(parent, (parentToChildrenSum.get(parent) || 0) + node.val);

      if (node.left) {
        nodeToParent.set(node.left, node); // Map left child to its parent
        queue.push(node.left); // Enqueue left child
      }
      if (node.right) {
        nodeToParent.set(node.right, node); // Map right child to its parent
        queue.push(node.right); // Enqueue right child
      }
    }

    // Update each node's value to the sum of its cousins' values
    for (const node of nodesAtLevel) {
      const parent = nodeToParent.get(node); // Get node's parent
      const sumOfSiblings = parentToChildrenSum.get(parent)!; // Sum of sibling nodes (including itself)
      node.val = totalSum - sumOfSiblings; // Set node's value to total sum minus siblings' sum
    }
  }

  return root; // Return the modified tree
}

/* 
951. Flip Equivalent Binary Trees

For a binary tree T, we can define a flip operation as follows: choose any node, and swap the left and right child subtrees.

A binary tree X is flip equivalent to a binary tree Y if and only if we can make X equal to Y after some number of flip operations.

Given the roots of two binary trees root1 and root2, return true if the two trees are flip equivalent or false otherwise.

Example 1:
Flipped Trees Diagram
Input: root1 = [1,2,3,4,5,6,null,null,null,7,8], root2 = [1,3,2,null,6,4,5,null,null,null,null,8,7]
Output: true
Explanation: We flipped at nodes with values 1, 3, and 5.

Example 2:
Input: root1 = [], root2 = []
Output: true

Example 3:
Input: root1 = [], root2 = [1]
Output: false

Constraints:
The number of nodes in each tree is in the range [0, 100].
Each tree will have unique node values in the range [0, 99].

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

function flipEquiv(root1: TreeNode | null, root2: TreeNode | null): boolean {
  // Base case: If both nodes are null, they are flip equivalent
  if (root1 === root2) return true;

  // If one node is null or values are different, not flip equivalent
  if (root1 === null || root2 === null || root1.val !== root2.val) return false;

  // Recursively check two possibilities:
  // 1. Without flipping: left with left and right with right
  // 2. With flipping: left with right and right with left
  return (
    (flipEquiv(root1.left, root2.left) && flipEquiv(root1.right, root2.right)) ||
    (flipEquiv(root1.left, root2.right) && flipEquiv(root1.right, root2.left))
  );
}

/* 
1233. Remove Sub-Folders from the Filesystem

Given a list of folders folder, return the folders after removing all sub-folders in those folders. You may return the answer in any order.

If a folder[i] is located within another folder[j], it is called a sub-folder of it. A sub-folder of folder[j] must start with folder[j], followed by a "/". For example, "/a/b" is a sub-folder of "/a", but "/b" is not a sub-folder of "/a/b/c".

The format of a path is one or more concatenated strings of the form: '/' followed by one or more lowercase English letters.

For example, "/leetcode" and "/leetcode/problems" are valid paths while an empty string and "/" are not.

Example 1:
Input: folder = ["/a","/a/b","/c/d","/c/d/e","/c/f"]
Output: ["/a","/c/d","/c/f"]
Explanation: Folders "/a/b" is a subfolder of "/a" and "/c/d/e" is inside of folder "/c/d" in our filesystem.

Example 2:
Input: folder = ["/a","/a/b/c","/a/b/d"]
Output: ["/a"]
Explanation: Folders "/a/b/c" and "/a/b/d" will be removed because they are subfolders of "/a".

Example 3:
Input: folder = ["/a/b/c","/a/b/ca","/a/b/d"]
Output: ["/a/b/c","/a/b/ca","/a/b/d"]

Constraints:
1 <= folder.length <= 4 * 10^4
2 <= folder[i].length <= 100
folder[i] contains only lowercase letters and '/'.
folder[i] always starts with the character '/'.
Each folder name is unique.

</> Typescript Code:
*/

function removeSubfolders(folder: string[]): string[] {
  // Sort the folder paths lexicographically
  folder.sort();
  // Initialize the result array
  const res: string[] = [];
  // Initialize the previous folder variable
  let prev = '';
  // Iterate over each folder path
  for (const f of folder) {
    // If the current folder is not a subfolder of the previous
    if (!prev || !(f.startsWith(prev) && f[prev.length] === '/')) {
      // Add the current folder to the result
      res.push(f);
      // Update the previous folder to the current one
      prev = f;
    }
  }
  // Return the filtered list of folders
  return res;
}

/* 
1277. Count Square Submatrices with All Ones

Given a m * n matrix of ones and zeros, return how many square submatrices have all ones.

Example 1:
Input: matrix =
[
  [0,1,1,1],
  [1,1,1,1],
  [0,1,1,1]
]
Output: 15
Explanation: 
There are 10 squares of side 1.
There are 4 squares of side 2.
There is  1 square of side 3.
Total number of squares = 10 + 4 + 1 = 15.

Example 2:
Input: matrix = 
[
  [1,0,1],
  [1,1,0],
  [1,1,0]
]
Output: 7
Explanation: 
There are 6 squares of side 1.  
There is 1 square of side 2. 
Total number of squares = 6 + 1 = 7.

Constraints:
1 <= arr.length <= 300
1 <= arr[0].length <= 300
0 <= arr[i][j] <= 1

</> Typescript Code:
*/

function countSquares(matrix: number[][]): number {
  let m = matrix.length,
    n = matrix[0].length; // Get matrix dimensions
  let result = 0; // Initialize result counter
  for (let i = 0; i < m; i++) {
    // Loop over rows
    for (let j = 0; j < n; j++) {
      // Loop over columns
      if (matrix[i][j] > 0 && i > 0 && j > 0) {
        // If cell is 1 and not on first row or column
        // Update cell with size of largest square ending at (i, j)
        matrix[i][j] = Math.min(matrix[i - 1][j - 1], matrix[i - 1][j], matrix[i][j - 1]) + 1;
      }
      result += matrix[i][j]; // Accumulate total squares
    }
  }
  return result; // Return total number of squares
}

/* 
2501. Longest Square Streak in an Array

You are given an integer array nums. A subsequence of nums is called a square streak if:

The length of the subsequence is at least 2, and
after sorting the subsequence, each element (except the first element) is the square of the previous number.
Return the length of the longest square streak in nums, or return -1 if there is no square streak.

A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

Example 1:
Input: nums = [4,3,6,16,8,2]
Output: 3
Explanation: Choose the subsequence [4,16,2]. After sorting it, it becomes [2,4,16].
- 4 = 2 * 2.
- 16 = 4 * 4.
Therefore, [4,16,2] is a square streak.
It can be shown that every subsequence of length 4 is not a square streak.

Example 2:
Input: nums = [2,3,5,6,7]
Output: -1
Explanation: There is no square streak in nums so return -1.

Constraints:
2 <= nums.length <= 10^5
2 <= nums[i] <= 10^5

</> Typescript Code:
*/

function longestSquareStreak(nums: number[]): number {
  // Create a set for constant-time number lookup
  const numsSet = new Set(nums);
  // Sort the array to process numbers in ascending order
  nums.sort((a, b) => a - b);
  // Initialize a map to store the longest streak ending with a number
  const dp = new Map<number, number>();
  // Variable to keep track of the maximum streak length
  let maxLength = -1;

  // Iterate over each number in the sorted array
  for (const x of nums) {
    // Get the current streak length for x or initialize it to 1
    const currLength = dp.get(x) ?? 1;
    // Calculate the square of the current number
    const squared = x * x;
    // Check if the squared number exists in the array
    if (numsSet.has(squared)) {
      // Calculate the new streak length
      const newLength = currLength + 1;
      // Update the streak length for the squared number if it's longer
      dp.set(squared, Math.max(dp.get(squared) ?? 1, newLength));
      // Update the maximum streak length found so far
      maxLength = Math.max(maxLength, dp.get(squared)!);
    }
  }

  // Return the maximum streak length if it's at least 2, else return -1
  return maxLength >= 2 ? maxLength : -1;
}

/* 
2684. Maximum Number of Moves in a Grid

You are given a 0-indexed m x n matrix grid consisting of positive integers.

You can start at any cell in the first column of the matrix, and traverse the grid in the following way:

From a cell (row, col), you can move to any of the cells: (row - 1, col + 1), (row, col + 1) and (row + 1, col + 1) such that the value of the cell you move to, should be strictly bigger than the value of the current cell.
Return the maximum number of moves that you can perform.

Example 1:
Input: grid = [[2,4,3,5],[5,4,9,3],[3,4,2,11],[10,9,13,15]]
Output: 3
Explanation: We can start at the cell (0, 0) and make the following moves:
- (0, 0) -> (0, 1).
- (0, 1) -> (1, 2).
- (1, 2) -> (2, 3).
It can be shown that it is the maximum number of moves that can be made.

Example 2:
Input: grid = [[3,2,4],[2,1,9],[1,1,7]]
Output: 0
Explanation: Starting from any cell in the first column we cannot perform any moves.

Constraints:
m == grid.length
n == grid[i].length
2 <= m, n <= 1000
4 <= m * n <= 10^5
1 <= grid[i][j] <= 10^6

</> Typescript Code:
*/

function maxMoves(grid: number[][]): number {
  // Get the number of rows and columns in the grid
  const m = grid.length;
  const n = grid[0].length;

  // Initialize a DP array with dimensions m x n, filled with -1
  const dp = Array.from({length: m}, () => new Array(n).fill(-1));

  // Set the initial moves for the first column to 0
  for (let row = 0; row < m; row++) {
    dp[row][0] = 0;
  }

  // Variable to keep track of the maximum number of moves
  let maxMoves = 0;

  // Iterate over each column starting from the second one
  for (let col = 1; col < n; col++) {
    // Iterate over each row in the current column
    for (let row = 0; row < m; row++) {
      // Check all possible previous rows (-1, 0, +1)
      for (let deltaRow = -1; deltaRow <= 1; deltaRow++) {
        const prevRow = row + deltaRow;

        // Validate the previous row and check the increasing condition
        if (
          prevRow >= 0 &&
          prevRow < m &&
          dp[prevRow][col - 1] !== -1 &&
          grid[prevRow][col - 1] < grid[row][col]
        ) {
          // Update the DP value for the current cell
          dp[row][col] = Math.max(dp[row][col], dp[prevRow][col - 1] + 1);

          // Update the maximum number of moves if necessary
          maxMoves = Math.max(maxMoves, dp[row][col]);
        }
      }
    }
  }

  // Return the maximum number of moves found
  return maxMoves;
}

/* 
1957. Delete Characters to Make Fancy String

A fancy string is a string where no three consecutive characters are equal.

Given a string s, delete the minimum possible number of characters from s to make it fancy.

Return the final string after the deletion. It can be shown that the answer will always be unique.

Example 1:
Input: s = "leeetcode"
Output: "leetcode"
Explanation:
Remove an 'e' from the first group of 'e's to create "leetcode".
No three consecutive characters are equal, so return "leetcode".

Example 2:
Input: s = "aaabaaaa"
Output: "aabaa"
Explanation:
Remove an 'a' from the first group of 'a's to create "aabaaaa".
Remove two 'a's from the second group of 'a's to create "aabaa".
No three consecutive characters are equal, so return "aabaa".

Example 3:
Input: s = "aab"
Output: "aab"
Explanation: No three consecutive characters are equal, so return "aab".

Constraints:
1 <= s.length <= 10^5
s consists only of lowercase English letters.

</> Typescript Code:
*/

function makeFancyString(s: string): string {
  const res: string[] = []; // Initialize an array to store the resulting characters
  let count = 0; // Initialize count of consecutive identical characters
  let prev = ''; // Initialize previous character tracker

  for (let i = 0; i < s.length; i++) {
    // Iterate over each character in the string
    const c = s[i]; // Current character
    if (c === prev) {
      // If current character is the same as previous
      count++; // Increment the count
    } else {
      prev = c; // Update the previous character
      count = 1; // Reset count
    }
    if (count < 3) {
      // If count is less than 3
      res.push(c); // Append character to result
    }
    // Else, skip the character to prevent three consecutive identical characters
  }
  return res.join(''); // Join the result array into a string and return
}

/* 
3163. String Compression III

Given a string word, compress it using the following algorithm:

Begin with an empty string comp. While word is not empty, use the following operation:
Remove a maximum length prefix of word made of a single character c repeating at most 9 times.
Append the length of the prefix followed by c to comp.
Return the string comp.

Example 1:
Input: word = "abcde"
Output: "1a1b1c1d1e"
Explanation:
Initially, comp = "". Apply the operation 5 times, choosing "a", "b", "c", "d", and "e" as the prefix in each operation.
For each prefix, append "1" followed by the character to comp.

Example 2:
Input: word = "aaaaaaaaaaaaaabb"
Output: "9a5a2b"
Explanation:
Initially, comp = "". Apply the operation 3 times, choosing "aaaaaaaaa", "aaaaa", and "bb" as the prefix in each operation.
For prefix "aaaaaaaaa", append "9" followed by "a" to comp.
For prefix "aaaaa", append "5" followed by "a" to comp.
For prefix "bb", append "2" followed by "b" to comp.

Constraints:
1 <= word.length <= 2 * 10^5
word consists only of lowercase English letters.

</> Typescript Code:
*/

function compressedString(word: string): string {
  // Initialize the compressed string
  let comp = '';
  // Index to traverse the word
  let i = 0;
  // Length of the word
  const n = word.length;
  // Iterate through the word
  while (i < n) {
    // Current character to process
    const current_char = word[i];
    // Counter for the character occurrences, max 9
    let count = 0;
    // Count consecutive occurrences of the current character up to 9
    while (i < n && word[i] === current_char && count < 9) {
      count++;
      i++;
    }
    // Append the count and character to the compressed string
    comp += `${count}${current_char}`;
  }
  // Return the compressed result
  return comp;
}

/* 
2914. Minimum Number of Changes to Make Binary String Beautiful

You are given a 0-indexed binary string s having an even length.

A string is beautiful if it's possible to partition it into one or more substrings such that:

Each substring has an even length.
Each substring contains only 1's or only 0's.
You can change any character in s to 0 or 1.

Return the minimum number of changes required to make the string s beautiful.

Example 1:
Input: s = "1001"
Output: 2
Explanation: We change s[1] to 1 and s[3] to 0 to get string "1100".
It can be seen that the string "1100" is beautiful because we can partition it into "11|00".
It can be proven that 2 is the minimum number of changes needed to make the string beautiful.

Example 2:
Input: s = "10"
Output: 1
Explanation: We change s[1] to 1 to get string "11".
It can be seen that the string "11" is beautiful because we can partition it into "11".
It can be proven that 1 is the minimum number of changes needed to make the string beautiful.

Example 3:
Input: s = "0000"
Output: 0
Explanation: We don't need to make any changes as the string "0000" is beautiful already.

Constraints:
2 <= s.length <= 10^5
s has an even length.
s[i] is either '0' or '1'.

</> Typescript Code:
*/

function minChanges(s: string): number {
  let changes = 0; // Initialize the counter for required changes
  for (let i = 0; i < s.length; i += 2) {
    // Iterate over the string in steps of 2
    if (s[i] !== s[i + 1]) {
      // Check if the pair of characters are different
      changes += 1; // Increment changes if the pair is not identical
    }
  }
  return changes; // Return the total number of changes needed
}

/* 
3011. Find if Array Can Be Sorted

You are given a 0-indexed array of positive integers nums.

In one operation, you can swap any two adjacent elements if they have the same number of 
set bits
. You are allowed to do this operation any number of times (including zero).

Return true if you can sort the array, else return false.

Example 1:
Input: nums = [8,4,2,30,15]
Output: true
Explanation: Let's look at the binary representation of every element. The numbers 2, 4, and 8 have one set bit each with binary representation "10", "100", and "1000" respectively. The numbers 15 and 30 have four set bits each with binary representation "1111" and "11110".
We can sort the array using 4 operations:
- Swap nums[0] with nums[1]. This operation is valid because 8 and 4 have one set bit each. The array becomes [4,8,2,30,15].
- Swap nums[1] with nums[2]. This operation is valid because 8 and 2 have one set bit each. The array becomes [4,2,8,30,15].
- Swap nums[0] with nums[1]. This operation is valid because 4 and 2 have one set bit each. The array becomes [2,4,8,30,15].
- Swap nums[3] with nums[4]. This operation is valid because 30 and 15 have four set bits each. The array becomes [2,4,8,15,30].
The array has become sorted, hence we return true.
Note that there may be other sequences of operations which also sort the array.

Example 2:
Input: nums = [1,2,3,4,5]
Output: true
Explanation: The array is already sorted, hence we return true.

Example 3:
Input: nums = [3,16,8,4,2]
Output: false
Explanation: It can be shown that it is not possible to sort the input array using any number of operations.

Constraints:
1 <= nums.length <= 100
1 <= nums[i] <= 28

</> Typescript Code:
*/

function canSortArray(nums: number[]): boolean {
  const n = nums.length; // Get the length of the array
  const bits = nums.map(countBits); // Count set bits for each number
  const components: number[][] = []; // Store connected components
  let i = 0;
  while (i < n) {
    let j = i;
    // Find contiguous segment where adjacent elements have same set bits count
    while (j + 1 < n && bits[j] === bits[j + 1]) {
      j++;
    }
    components.push(nums.slice(i, j + 1)); // Add segment to components
    i = j + 1; // Move to next segment
  }

  const sortedNums = nums.slice().sort((a, b) => a - b); // Sorted copy of nums
  const sortedBits = sortedNums.map(countBits); // Set bits for sorted array

  const sortedComponents: number[][] = []; // Components in sorted array
  let k = 0;
  while (k < n) {
    let l = k;
    // Find contiguous segments in sorted array with same set bits count
    while (l + 1 < n && sortedBits[l] === sortedBits[l + 1]) {
      l++;
    }
    sortedComponents.push(sortedNums.slice(k, l + 1)); // Add to sorted components
    k = l + 1; // Move to next segment
  }

  if (components.length !== sortedComponents.length) return false; // Components count must match

  for (let m = 0; m < components.length; m++) {
    const compOrig = components[m].sort((a, b) => a - b); // Sort original component
    const compSorted = sortedComponents[m]; // Get sorted component
    if (compOrig.length !== compSorted.length) return false; // Lengths must match
    for (let n = 0; n < compOrig.length; n++) {
      if (compOrig[n] !== compSorted[n]) return false; // Elements must match
    }
  }
  return true; // All components can be sorted, return true
}

function countBits(num: number): number {
  let count = 0; // Initialize set bits count
  while (num > 0) {
    count += num & 1; // Add the least significant bit
    num >>= 1; // Shift right to process next bit
  }
  return count; // Return total set bits
}

/* 
2275. Largest Combination With Bitwise AND Greater Than Zero

The bitwise AND of an array nums is the bitwise AND of all integers in nums.

For example, for nums = [1, 5, 3], the bitwise AND is equal to 1 & 5 & 3 = 1.
Also, for nums = [7], the bitwise AND is 7.
You are given an array of positive integers candidates. Evaluate the bitwise AND of every combination of numbers of candidates. Each number in candidates may only be used once in each combination.

Return the size of the largest combination of candidates with a bitwise AND greater than 0.

Example 1:
Input: candidates = [16,17,71,62,12,24,14]
Output: 4
Explanation: The combination [16,17,62,24] has a bitwise AND of 16 & 17 & 62 & 24 = 16 > 0.
The size of the combination is 4.
It can be shown that no combination with a size greater than 4 has a bitwise AND greater than 0.
Note that more than one combination may have the largest size.
For example, the combination [62,12,24,14] has a bitwise AND of 62 & 12 & 24 & 14 = 8 > 0.

Example 2:
Input: candidates = [8,8]
Output: 2
Explanation: The largest combination [8,8] has a bitwise AND of 8 & 8 = 8 > 0.
The size of the combination is 2, so we return 2.

Constraints:
1 <= candidates.length <= 10^5
1 <= candidates[i] <= 10^7

</> Typescript Code:
*/

function largestCombination(candidates: number[]): number {
  const counts = new Array(24).fill(0); // Initialize counts for each bit position (0 to 23)
  for (const num of candidates) {
    for (let i = 0; i < 24; i++) {
      // Iterate over each bit position
      if (num & (1 << i)) {
        // Check if the i-th bit is set in num
        counts[i]++; // Increment the count for this bit position
      }
    }
  }
  return Math.max(...counts); // Return the maximum count among all bit positions
}

/* 
1829. Maximum XOR for Each Query

You are given a sorted array nums of n non-negative integers and an integer maximumBit. You want to perform the following query n times:

Find a non-negative integer k < 2maximumBit such that nums[0] XOR nums[1] XOR ... XOR nums[nums.length-1] XOR k is maximized. k is the answer to the ith query.
Remove the last element from the current array nums.
Return an array answer, where answer[i] is the answer to the ith query.

Example 1:
Input: nums = [0,1,1,3], maximumBit = 2
Output: [0,3,2,3]
Explanation: The queries are answered as follows:
1st query: nums = [0,1,1,3], k = 0 since 0 XOR 1 XOR 1 XOR 3 XOR 0 = 3.
2nd query: nums = [0,1,1], k = 3 since 0 XOR 1 XOR 1 XOR 3 = 3.
3rd query: nums = [0,1], k = 2 since 0 XOR 1 XOR 2 = 3.
4th query: nums = [0], k = 3 since 0 XOR 3 = 3.

Example 2:
Input: nums = [2,3,4,7], maximumBit = 3
Output: [5,2,6,5]
Explanation: The queries are answered as follows:
1st query: nums = [2,3,4,7], k = 5 since 2 XOR 3 XOR 4 XOR 7 XOR 5 = 7.
2nd query: nums = [2,3,4], k = 2 since 2 XOR 3 XOR 4 XOR 2 = 7.
3rd query: nums = [2,3], k = 6 since 2 XOR 3 XOR 6 = 7.
4th query: nums = [2], k = 5 since 2 XOR 5 = 7.

Example 3:
Input: nums = [0,1,2,2,5,7], maximumBit = 3
Output: [4,3,6,4,6,7]

Constraints:
nums.length == n
1 <= n <= 10^5
1 <= maximumBit <= 20
0 <= nums[i] < 2maximumBit
nums​​​ is sorted in ascending order.

</> Typescript Code:
*/

function getMaximumXor(nums: number[], maximumBit: number): number[] {
  const n = nums.length; // Length of the input array
  const max = (1 << maximumBit) - 1; // Maximum value with maximumBit bits (all bits set to 1)
  const result = new Array(n); // Initialize the result array
  let xor = 0; // Initialize cumulative XOR of all elements
  for (const num of nums) {
    xor ^= num; // Compute cumulative XOR
  }
  for (let i = n - 1; i >= 0; i--) {
    // Iterate from the end to the beginning
    result[n - 1 - i] = xor ^ max; // Calculate k and store in result
    xor ^= nums[i]; // Remove the last element from cumulative XOR
  }
  return result; // Return the array of answers
}

/* 
3133. Minimum Array End

You are given two integers n and x. You have to construct an array of positive integers nums of size n where for every 0 <= i < n - 1, nums[i + 1] is greater than nums[i], and the result of the bitwise AND operation between all elements of nums is x.

Return the minimum possible value of nums[n - 1].

Example 1:
Input: n = 3, x = 4
Output: 6
Explanation:
nums can be [4,5,6] and its last element is 6.

Example 2:
Input: n = 2, x = 7
Output: 15
Explanation:
nums can be [7,15] and its last element is 15.


Constraints:
1 <= n, x <= 10^8

</> Typescript Code:
*/

function minEnd(n: number, x: number): number {
  // Convert x to BigInt for handling large integers beyond the safe integer limit
  let result: bigint = BigInt(x);
  // Compute n - 1 and convert it to BigInt
  let remaining: bigint = BigInt(n - 1);
  // Initialize position as 1n (BigInt) to represent the current bit position (starting from LSB)
  let position: bigint = 1n;

  // Loop until all bits in 'remaining' have been processed
  while (remaining > 0n) {
    // Check if the bit at 'position' in x is 0
    if ((BigInt(x) & position) === 0n) {
      // If the least significant bit of 'remaining' is 1, set the bit at 'position' in 'result'
      result |= (remaining & 1n) * position;
      // Right-shift 'remaining' to process the next bit in the next iteration
      remaining >>= 1n;
    }
    // Left-shift 'position' to move to the next higher bit position
    position <<= 1n;
  }

  // Convert the result back to a Number and return it
  return Number(result);
}

/* 
3097. Shortest Subarray With OR at Least K II

You are given an array nums of non-negative integers and an integer k.

An array is called special if the bitwise OR of all of its elements is at least k.

Return the length of the shortest special non-empty 
subarray of nums, or return -1 if no special subarray exists.


Example 1:
Input: nums = [1,2,3], k = 2
Output: 1
Explanation:
The subarray [3] has OR value of 3. Hence, we return 1.

Example 2:
Input: nums = [2,1,8], k = 10
Output: 3
Explanation:
The subarray [2,1,8] has OR value of 11. Hence, we return 3.

Example 3:
Input: nums = [1,2], k = 0
Output: 1
Explanation:
The subarray [1] has OR value of 1. Hence, we return 1.

Constraints:
1 <= nums.length <= 2 * 10^5
0 <= nums[i] <= 10^9
0 <= k <= 10^9

</> Typescript Code:
*/

function minimumSubarrayLength(nums: number[], k: number): number {
  let res = Infinity; // Initialize the minimum length to Infinity
  let prev = new Map<number, number>(); // Map to store OR values and their minimum lengths
  for (let i = 0; i < nums.length; i++) {
    let curr = new Map<number, number>(); // Map for current index
    curr.set(nums[i], 1); // Start a new subarray with nums[i]
    for (let [orVal, length] of prev) {
      let newOr = orVal | nums[i]; // Calculate new OR value
      let newLen = length + 1; // Increment length by 1
      if (!curr.has(newOr) || curr.get(newOr)! > newLen) {
        curr.set(newOr, newLen); // Update curr map with shorter length
      }
    }
    for (let [orVal, length] of curr) {
      if (orVal >= k) {
        res = Math.min(res, length); // Update result if OR value meets or exceeds k
      }
    }
    prev = curr; // Set prev to curr for next iteration
  }
  return res === Infinity ? -1 : res; // Return -1 if no valid subarray found
}

/* 
2601. Prime Subtraction Operation

You are given a 0-indexed integer array nums of length n.

You can perform the following operation as many times as you want:

Pick an index i that you haven’t picked before, and pick a prime p strictly less than nums[i], then subtract p from nums[i].
Return true if you can make nums a strictly increasing array using the above operation and false otherwise.

A strictly increasing array is an array whose each element is strictly greater than its preceding element.

Example 1:
Input: nums = [4,9,6,10]
Output: true
Explanation: In the first operation: Pick i = 0 and p = 3, and then subtract 3 from nums[0], so that nums becomes [1,9,6,10].
In the second operation: i = 1, p = 7, subtract 7 from nums[1], so nums becomes equal to [1,2,6,10].
After the second operation, nums is sorted in strictly increasing order, so the answer is true.

Example 2:
Input: nums = [6,8,11,12]
Output: true
Explanation: Initially nums is sorted in strictly increasing order, so we don't need to make any operations.

Example 3:
Input: nums = [5,8,3]
Output: false
Explanation: It can be proven that there is no way to perform operations to make nums sorted in strictly increasing order, so the answer is false.

Constraints:
1 <= nums.length <= 1000
1 <= nums[i] <= 1000
nums.length == n

</> Typescript Code:
*/

function primeSubOperation(nums: number[]): boolean {
  const MAX = 1000; // Maximum possible value in nums
  const isPrime = new Array(MAX + 1).fill(true); // Initialize array to mark prime numbers
  isPrime[0] = isPrime[1] = false; // 0 and 1 are not prime

  // Sieve of Eratosthenes to find all primes up to MAX
  for (let i = 2; i * i <= MAX; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= MAX; j += i) {
        isPrime[j] = false; // Mark multiples of prime as non-prime
      }
    }
  }

  let prev = 0; // Variable to keep track of previous number in the array
  for (let i = 0; i < nums.length; i++) {
    let adjusted = false; // Flag to indicate if current number was adjusted
    // Try to adjust nums[i] to the smallest possible value greater than prev
    for (let target = prev + 1; target < nums[i]; target++) {
      let p = nums[i] - target; // Calculate potential prime to subtract
      if (p >= 2 && isPrime[p]) {
        // Check if p is a valid prime
        nums[i] = target; // Adjust nums[i] by subtracting p
        adjusted = true; // Mark as adjusted
        break; // Exit loop since adjustment is done
      }
    }
    if (!adjusted) {
      if (nums[i] > prev) {
        prev = nums[i]; // Update prev if current number is greater
      } else {
        return false; // Cannot make array strictly increasing
      }
    } else {
      prev = nums[i]; // Update prev with adjusted value
    }
  }
  return true; // Successfully made the array strictly increasing
}

/* 
2070. Most Beautiful Item for Each Query

You are given a 2D integer array items where items[i] = [pricei, beautyi] denotes the price and beauty of an item respectively.

You are also given a 0-indexed integer array queries. For each queries[j], you want to determine the maximum beauty of an item whose price is less than or equal to queries[j]. If no such item exists, then the answer to this query is 0.

Return an array answer of the same length as queries where answer[j] is the answer to the jth query.

Example 1:
Input: items = [[1,2],[3,2],[2,4],[5,6],[3,5]], queries = [1,2,3,4,5,6]
Output: [2,4,5,5,6,6]
Explanation:
- For queries[0]=1, [1,2] is the only item which has price <= 1. Hence, the answer for this query is 2.
- For queries[1]=2, the items which can be considered are [1,2] and [2,4]. 
  The maximum beauty among them is 4.
- For queries[2]=3 and queries[3]=4, the items which can be considered are [1,2], [3,2], [2,4], and [3,5].
  The maximum beauty among them is 5.
- For queries[4]=5 and queries[5]=6, all items can be considered.
  Hence, the answer for them is the maximum beauty of all items, i.e., 6.

  Example 2:
Input: items = [[1,2],[1,2],[1,3],[1,4]], queries = [1]
Output: [4]
Explanation: 
The price of every item is equal to 1, so we choose the item with the maximum beauty 4. 
Note that multiple items can have the same price and/or beauty.  

Example 3:
Input: items = [[10,1000]], queries = [5]
Output: [0]
Explanation:
No item has a price less than or equal to 5, so no item can be chosen.
Hence, the answer to the query is 0.

Constraints:
1 <= items.length, queries.length <= 10^5
items[i].length == 2
1 <= pricei, beautyi, queries[j] <= 10^9

</> Typescript Code:
*/

function maximumBeauty(items: number[][], queries: number[]): number[] {
  // Sort items by price in ascending order
  items.sort((a, b) => a[0] - b[0]);

  // Pair each query with its original index and sort by query value
  const queriesWithIndex = queries.map((q, idx) => [q, idx] as [number, number]);
  queriesWithIndex.sort((a, b) => a[0] - b[0]);

  // Initialize the answer array to store results for each query
  const answer = new Array(queries.length);
  let maxBeautySoFar = 0; // Tracks the maximum beauty found so far
  let idx = 0; // Index to iterate over the sorted items

  // Iterate over each query in sorted order
  for (let i = 0; i < queriesWithIndex.length; i++) {
    const [q, originalIndex] = queriesWithIndex[i];

    // Update maxBeautySoFar for all items with price less than or equal to the query
    while (idx < items.length && items[idx][0] <= q) {
      maxBeautySoFar = Math.max(maxBeautySoFar, items[idx][1]);
      idx++;
    }

    // Store the maximum beauty found for this query
    answer[originalIndex] = maxBeautySoFar;
  }

  // Return the array of answers corresponding to each original query
  return answer;
}

/* 
2563. Count the Number of Fair Pairs

Given a 0-indexed integer array nums of size n and two integers lower and upper, return the number of fair pairs.

A pair (i, j) is fair if:
0 <= i < j < n, and
lower <= nums[i] + nums[j] <= upper

Example 1:
Input: nums = [0,1,7,4,4,5], lower = 3, upper = 6
Output: 6
Explanation: There are 6 fair pairs: (0,3), (0,4), (0,5), (1,3), (1,4), and (1,5).

Example 2:
Input: nums = [1,7,9,2,5], lower = 11, upper = 11
Output: 1
Explanation: There is a single fair pair: (2,3).

Constraints:
1 <= nums.length <= 10^5
nums.length == n
-109 <= nums[i] <= 10^9
-109 <= lower <= upper <= 10^9

</> Typescript Code:
*/

function countFairPairs(nums: number[], lower: number, upper: number): number {
  nums.sort((a, b) => a - b); // Sort the array in ascending order
  let count = 0; // Initialize the count of fair pairs
  for (let i = 0; i < nums.length; i++) {
    let l = lower - nums[i]; // Calculate the lower bound for nums[j]
    let u = upper - nums[i]; // Calculate the upper bound for nums[j]
    let left = lowerBound(nums, l, i + 1); // Find first index where nums[j] >= l
    let right = upperBound(nums, u, i + 1); // Find first index where nums[j] > u
    count += right - left; // Add the number of valid pairs to count
  }
  return count; // Return the total count of fair pairs
}

// Function to find the first index where arr[i] >= target starting from 'start'
function lowerBound(arr: number[], target: number, start: number): number {
  let left = start,
    right = arr.length;
  while (left < right) {
    let mid = (left + right) >> 1; // Calculate middle index
    if (arr[mid] < target) left = mid + 1; // Move left boundary to the right
    else right = mid; // Move right boundary to mid
  }
  return left; // Return the lower bound index
}

// Function to find the first index where arr[i] > target starting from 'start'
function upperBound(arr: number[], target: number, start: number): number {
  let left = start,
    right = arr.length;
  while (left < right) {
    let mid = (left + right) >> 1; // Calculate middle index
    if (arr[mid] <= target) left = mid + 1; // Move left boundary to the right
    else right = mid; // Move right boundary to mid
  }
  return left; // Return the upper bound index
}

/* 
2064. Minimized Maximum of Products Distributed to Any Store

You are given an integer n indicating there are n specialty retail stores. There are m product types of varying amounts, which are given as a 0-indexed integer array quantities, where quantities[i] represents the number of products of the ith product type.

You need to distribute all products to the retail stores following these rules:

A store can only be given at most one product type but can be given any amount of it.
After distribution, each store will have been given some number of products (possibly 0). Let x represent the maximum number of products given to any store. You want x to be as small as possible, i.e., you want to minimize the maximum number of products that are given to any store.
Return the minimum possible x.

Example 1:
Input: n = 6, quantities = [11,6]
Output: 3
Explanation: One optimal way is:
- The 11 products of type 0 are distributed to the first four stores in these amounts: 2, 3, 3, 3
- The 6 products of type 1 are distributed to the other two stores in these amounts: 3, 3
The maximum number of products given to any store is max(2, 3, 3, 3, 3, 3) = 3.

Example 2:
Input: n = 7, quantities = [15,10,10]
Output: 5
Explanation: One optimal way is:
- The 15 products of type 0 are distributed to the first three stores in these amounts: 5, 5, 5
- The 10 products of type 1 are distributed to the next two stores in these amounts: 5, 5
- The 10 products of type 2 are distributed to the last two stores in these amounts: 5, 5
The maximum number of products given to any store is max(5, 5, 5, 5, 5, 5, 5) = 5.

Example 3:
Input: n = 1, quantities = [100000]
Output: 100000
Explanation: The only optimal way is:
- The 100000 products of type 0 are distributed to the only store.
The maximum number of products given to any store is max(100000) = 100000.

Constraints:
m == quantities.length
1 <= m <= n <= 10^5
1 <= quantities[i] <= 10^5

</> Typescript Code:
*/

function minimizedMaximum(n: number, quantities: number[]): number {
  // Initialize the left and right boundaries for binary search
  let left = 1;
  let right = Math.max(...quantities);
  // Perform binary search to find the minimized maximum value
  while (left < right) {
    // Calculate the middle value
    let mid = Math.floor((left + right) / 2);
    // Initialize the total required stores
    let requiredStores = 0;
    for (let q of quantities) {
      // Calculate stores needed for current product with max 'mid' products per store
      requiredStores += Math.ceil(q / mid);
    }
    // If the total required stores is within the limit
    if (requiredStores <= n) {
      // Try to minimize the maximum by searching the left half
      right = mid;
    } else {
      // Need to increase the maximum by searching the right half
      left = mid + 1;
    }
  }
  // Return the minimized maximum number of products per store
  return left;
}

/* 
1574. Shortest Subarray to be Removed to Make Array Sorted

Given an integer array arr, remove a subarray (can be empty) from arr such that the remaining elements in arr are non-decreasing.

Return the length of the shortest subarray to remove.

A subarray is a contiguous subsequence of the array.

Example 1:
Input: arr = [1,2,3,10,4,2,3,5]
Output: 3
Explanation: The shortest subarray we can remove is [10,4,2] of length 3. The remaining elements after that will be [1,2,3,3,5] which are sorted.
Another correct solution is to remove the subarray [3,10,4].

Example 2:
Input: arr = [5,4,3,2,1]
Output: 4
Explanation: Since the array is strictly decreasing, we can only keep a single element. Therefore we need to remove a subarray of length 4, either [5,4,3,2] or [4,3,2,1].

Example 3:
Input: arr = [1,2,3]
Output: 0
Explanation: The array is already non-decreasing. We do not need to remove any elements.

Constraints:
1 <= arr.length <= 10^5
0 <= arr[i] <= 10^9

</> Typescript Code:
*/

function findLengthOfShortestSubarray(arr: number[]): number {
  let n = arr.length;
  // Initialize left pointer to find non-decreasing prefix
  let left = 0;
  while (left + 1 < n && arr[left] <= arr[left + 1]) {
    left++;
  }
  // If the entire array is non-decreasing, return 0
  if (left == n - 1) return 0;
  // Initialize right pointer to find non-decreasing suffix
  let right = n - 1;
  while (right > left && arr[right - 1] <= arr[right]) {
    right--;
  }
  // Initialize result with minimal removal from either end
  let result = Math.min(n - left - 1, right);
  let i = 0;
  let j = right;
  // Try to find minimal subarray to remove by merging prefix and suffix
  while (i <= left && j < n) {
    if (arr[j] >= arr[i]) {
      // Update result with the minimal length
      result = Math.min(result, j - i - 1);
      i++;
    } else {
      j++;
    }
  }
  return result;
}

/* 
3254. Find the Power of K-Size Subarrays I

You are given an array of integers nums of length n and a positive integer k.

The power of an array is defined as:

Its maximum element if all of its elements are consecutive and sorted in ascending order.
-1 otherwise.
You need to find the power of all 
subarrays of nums of size k.

Return an integer array results of size n - k + 1, where results[i] is the power of nums[i..(i + k - 1)].

Example 1:
Input: nums = [1,2,3,4,3,2,5], k = 3
Output: [3,4,-1,-1,-1]
Explanation:
There are 5 subarrays of nums of size 3:
[1, 2, 3] with the maximum element 3.
[2, 3, 4] with the maximum element 4.
[3, 4, 3] whose elements are not consecutive.
[4, 3, 2] whose elements are not sorted.
[3, 2, 5] whose elements are not consecutive.

Example 2:
Input: nums = [2,2,2,2,2], k = 4
Output: [-1,-1]

Example 3:
Input: nums = [3,2,3,2,3,2], k = 2
Output: [-1,3,-1,3,-1]


Constraints:
1 <= n == nums.length <= 500
1 <= nums[i] <= 10^5
1 <= k <= n

</> Typescript Code:
*/

function resultsArray(nums: number[], k: number): number[] {
  const n = nums.length; // Get the length of the array
  const results: number[] = []; // Initialize the results array
  for (let i = 0; i <= n - k; i++) {
    // Loop over all subarrays of size k
    let isValid = true; // Flag to check if the current subarray is valid
    for (let j = i; j < i + k - 1; j++) {
      // Check consecutive elements in subarray
      if (nums[j + 1] - nums[j] !== 1) {
        // If elements are not consecutive
        isValid = false; // Set flag to false
        break; // Exit the loop early
      }
    }
    if (isValid) {
      // If subarray is valid
      results.push(nums[i + k - 1]); // Add the maximum element to results
    } else {
      results.push(-1); // Otherwise, add -1 to results
    }
  }
  return results; // Return the results array
}

/* 
2461. Maximum Sum of Distinct Subarrays With Length K

You are given an integer array nums and an integer k. Find the maximum subarray sum of all the subarrays of nums that meet the following conditions:

The length of the subarray is k, and
All the elements of the subarray are distinct.
Return the maximum subarray sum of all the subarrays that meet the conditions. If no subarray meets the conditions, return 0.

A subarray is a contiguous non-empty sequence of elements within an array.

Example 1:
Input: nums = [1,5,4,2,9,9,9], k = 3
Output: 15
Explanation: The subarrays of nums with length 3 are:
- [1,5,4] which meets the requirements and has a sum of 10.
- [5,4,2] which meets the requirements and has a sum of 11.
- [4,2,9] which meets the requirements and has a sum of 15.
- [2,9,9] which does not meet the requirements because the element 9 is repeated.
- [9,9,9] which does not meet the requirements because the element 9 is repeated.
We return 15 because it is the maximum subarray sum of all the subarrays that meet the conditions

Example 2:
Input: nums = [4,4,4], k = 3
Output: 0
Explanation: The subarrays of nums with length 3 are:
- [4,4,4] which does not meet the requirements because the element 4 is repeated.
We return 0 because no subarrays meet the conditions.

Constraints:
1 <= k <= nums.length <= 10^5
1 <= nums[i] <= 10^5

</> Typescript Code:
 */

function maximumSubarraySum(nums: number[], k: number): number {
  const counts = new Map<number, number>(); // Stores counts of elements in the current window
  let sum = 0; // Sum of elements in the current window
  let maxSum = 0; // Maximum sum of valid subarrays found so far
  let left = 0; // Left boundary of the window

  for (let right = 0; right < nums.length; right++) {
    const num = nums[right]; // Current element
    counts.set(num, (counts.get(num) || 0) + 1); // Increment count of current element
    sum += num; // Add current element to sum

    while (counts.get(num)! > 1) {
      // If duplicate is found
      const leftNum = nums[left]; // Element at the left boundary
      counts.set(leftNum, counts.get(leftNum)! - 1); // Decrement count of left element
      if (counts.get(leftNum) === 0) counts.delete(leftNum); // Remove if count is zero
      sum -= leftNum; // Subtract left element from sum
      left++; // Move left boundary to the right
    }

    if (right - left + 1 === k) {
      // If window size equals k
      maxSum = Math.max(maxSum, sum); // Update maximum sum
      const leftNum = nums[left]; // Element at the left boundary
      counts.set(leftNum, counts.get(leftNum)! - 1); // Decrement count of left element
      if (counts.get(leftNum) === 0) counts.delete(leftNum); // Remove if count is zero
      sum -= leftNum; // Subtract left element from sum
      left++; // Move left boundary to maintain window size
    }
  }

  return maxSum; // Return the maximum sum found
}

/* 
2516. Take K of Each Character From Left and Right

You are given a string s consisting of the characters 'a', 'b', and 'c' and a non-negative integer k. Each minute, you may take either the leftmost character of s, or the rightmost character of s.

Return the minimum number of minutes needed for you to take at least k of each character, or return -1 if it is not possible to take k of each character.

Example 1:
Input: s = "aabaaaacaabc", k = 2
Output: 8
Explanation: 
Take three characters from the left of s. You now have two 'a' characters, and one 'b' character.
Take five characters from the right of s. You now have four 'a' characters, two 'b' characters, and two 'c' characters.
A total of 3 + 5 = 8 minutes is needed.
It can be proven that 8 is the minimum number of minutes needed.

Example 2:
Input: s = "a", k = 1
Output: -1
Explanation: It is not possible to take one 'b' or 'c' so return -1.

Constraints:
1 <= s.length <= 10^5
s consists of only the letters 'a', 'b', and 'c'.
0 <= k <= s.length

</> Typescript Code:
*/

function takeCharacters(s: string, k: number): number {
  const n = s.length; // Get the length of the string
  const count = [0, 0, 0]; // Initialize counts for 'a', 'b', and 'c'
  for (let c of s) {
    count[c.charCodeAt(0) - 97]++; // Count total occurrences of each character
  }
  if (count[0] < k || count[1] < k || count[2] < k) return -1; // If any character occurs less than k times, return -1
  const required = [count[0] - k, count[1] - k, count[2] - k]; // Calculate required counts within the window
  let maxWindow = 0; // Maximum length of valid window
  let left = 0; // Left pointer for sliding window
  const windowCount = [0, 0, 0]; // Counts of 'a', 'b', and 'c' in the current window
  for (let right = 0; right < n; right++) {
    const idx = s.charCodeAt(right) - 97; // Index for current character
    windowCount[idx]++; // Increment count for current character
    while (windowCount[idx] > required[idx]) {
      // If count exceeds required, shrink window
      windowCount[s.charCodeAt(left) - 97]--; // Decrement count at left pointer
      left++; // Move left pointer to the right
    }
    maxWindow = Math.max(maxWindow, right - left + 1); // Update maximum window size
  }
  return n - maxWindow; // Minimum minutes needed is total length minus maximum window size
}
