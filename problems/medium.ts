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
function minOperations(nums: number[]): number {
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
