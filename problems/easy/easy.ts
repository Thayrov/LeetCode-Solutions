/* 
1913. Maximum Product Difference Between Two Pairs

The product difference between two pairs (a, b) and (c, d) is defined as (a * b) - (c * d).

For example, the product difference between (5, 6) and (2, 7) is (5 * 6) - (2 * 7) = 16.
Given an integer array nums, choose four distinct indices w, x, y, and z such that the product difference between pairs (nums[w], nums[x]) and (nums[y], nums[z]) is maximized.

Return the maximum such product difference.

Example 1:

Input: nums = [5,6,2,7,4]
Output: 34
Explanation: We can choose indices 1 and 3 for the first pair (6, 7) and indices 2 and 4 for the second pair (2, 4).
The product difference is (6 * 7) - (2 * 4) = 34.
Example 2:

Input: nums = [4,2,5,9,7,4,8]
Output: 64
Explanation: We can choose indices 3 and 6 for the first pair (9, 8) and indices 1 and 5 for the second pair (2, 4).
The product difference is (9 * 8) - (2 * 4) = 64.


Constraints:

4 <= nums.length <= 104
1 <= nums[i] <= 104

</>Code:
*/

function maxProductDifference(nums: number[]): number {
  nums.sort((a, b) => a - b);
  let a = nums[nums.length - 1];
  let b = nums[nums.length - 2];
  let c = nums[0];
  let d = nums[1];
  return a * b - c * d;
}

/* 
661. Image Smoother

An image smoother is a filter of the size 3 x 3 that can be applied to each cell of an image by rounding down the average of the cell and the eight surrounding cells (i.e., the average of the nine cells in the blue smoother). If one or more of the surrounding cells of a cell is not present, we do not consider it in the average (i.e., the average of the four cells in the red smoother).

Given an m x n integer matrix img representing the grayscale of an image, return the image after applying the smoother on each cell of it.

Example 1:

Input: img = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[0,0,0],[0,0,0],[0,0,0]]
Explanation:
For the points (0,0), (0,2), (2,0), (2,2): floor(3/4) = floor(0.75) = 0
For the points (0,1), (1,0), (1,2), (2,1): floor(5/6) = floor(0.83333333) = 0
For the point (1,1): floor(8/9) = floor(0.88888889) = 0

Example 2:

Input: img = [[100,200,100],[200,50,200],[100,200,100]]
Output: [[137,141,137],[141,138,141],[137,141,137]]
Explanation:
For the points (0,0), (0,2), (2,0), (2,2): floor((100+200+200+50)/4) = floor(137.5) = 137
For the points (0,1), (1,0), (1,2), (2,1): floor((200+200+50+200+100+100)/6) = floor(141.666667) = 141
For the point (1,1): floor((50+200+200+200+200+100+100+100+100)/9) = floor(138.888889) = 138

Constraints:

m == img.length
n == img[i].length
1 <= m, n <= 200
0 <= img[i][j] <= 255

</>Code:
*/

// Define the function 'imageSmoother' with 'img' as a parameter of type number[][].
function imageSmoother(img: number[][]): number[][] {
  // Get the number of rows 'm' and columns 'n' from the image.
  const m = img.length;
  const n = img[0].length;

  // Initialize 'newImg' as a two-dimensional array filled with zeros.
  const newImg: number[][] = Array.from({ length: m }, () =>
    new Array(n).fill(0)
  );

  // Iterate over each row of the image.
  for (let i = 0; i < m; i++) {
    // Iterate over each column of the image.
    for (let j = 0; j < n; j++) {
      // Initialize 'sum' to accumulate the values of the neighboring pixels.
      let sum = 0;
      // Initialize 'count' to count the number of neighboring pixels considered.
      let count = 0;

      // Iterate over the neighbors of the current pixel in the 3x3 grid.
      for (let x = i - 1; x <= i + 1; x++) {
        for (let y = j - 1; y <= j + 1; y++) {
          // Check if the neighbor is within the bounds of the image.
          if (x >= 0 && x < m && y >= 0 && y < n) {
            // Add the value of the neighbor to 'sum'.
            sum += img[x][y];
            // Increment 'count' for each valid neighbor.
            count++;
          }
        }
      }
      // Calculate the average value by dividing 'sum' by 'count' and use 'Math.floor' to round down.
      newImg[i][j] = Math.floor(sum / count);
    }
  }

  // Return the new image matrix after smoothing.
  return newImg;
}

/* 2706. Buy Two Chocolates

You are given an integer array prices representing the prices of various chocolates in a store. You are also given a single integer money, which represents your initial amount of money.

You must buy exactly two chocolates in such a way that you still have some non-negative leftover money. You would like to minimize the sum of the prices of the two chocolates you buy.

Return the amount of money you will have leftover after buying the two chocolates. If there is no way for you to buy two chocolates without ending up in debt, return money. Note that the leftover must be non-negative.

Example 1:

Input: prices = [1,2,2], money = 3
Output: 0
Explanation: Purchase the chocolates priced at 1 and 2 units respectively. You will have 3 - 3 = 0 units of money afterwards. Thus, we return 0.
Example 2:

Input: prices = [3,2,3], money = 3
Output: 3
Explanation: You cannot buy 2 chocolates without going in debt, so we return 3.

Constraints:

2 <= prices.length <= 50
1 <= prices[i] <= 100
1 <= money <= 100

</>Code:
*/

function buyChoco(prices: number[], money: number): number {
  // Initialize minCost to a very large number to easily compare with other sums
  let minCost = Number.MAX_SAFE_INTEGER;

  // Declare variables to store the total cost of a pair of chocolates and the leftover money
  let cost, leftover;

  // Outer loop: iterate through each chocolate in the prices array
  for (let i = 0; i < prices.length; i++) {
    // Inner loop: iterate through the chocolates following the current chocolate in the outer loop
    for (let j = i + 1; j < prices.length; j++) {
      // Calculate the sum of the current pair of chocolates
      cost = prices[i] + prices[j];
      // Check if the sum is less than or equal to the money and also if it's the smallest sum found so far
      if (cost <= money && cost < minCost) {
        // Update minCost with the cost of the current pair
        minCost = cost;
      }
    }
  }

  // Check if a valid pair is found (minCost is updated)
  if (minCost != Number.MAX_SAFE_INTEGER) {
    // Calculate the leftover money after buying the pair of chocolates
    leftover = money - minCost;
  } else {
    // If no valid pair is found, return the original amount of money
    leftover = money;
  }

  // Return the leftover money
  return leftover;
}

/* 
1422. Maximum Score After Splitting a String
Easy
Topics
Companies
Hint
Given a string s of zeros and ones, return the maximum score after splitting the string into two non-empty substrings (i.e. left substring and right substring).

The score after splitting a string is the number of zeros in the left substring plus the number of ones in the right substring.



Example 1:

Input: s = "011101"
Output: 5 
Explanation: 
All possible ways of splitting s into two non-empty substrings are:
left = "0" and right = "11101", score = 1 + 4 = 5 
left = "01" and right = "1101", score = 1 + 3 = 4 
left = "011" and right = "101", score = 1 + 2 = 3 
left = "0111" and right = "01", score = 1 + 1 = 2 
left = "01110" and right = "1", score = 2 + 1 = 3


Example 2:

Input: s = "00111"
Output: 5
Explanation: When left = "00" and right = "111", we get the maximum score = 2 + 3 = 5


Example 3:

Input: s = "1111"
Output: 3


Constraints:

2 <= s.length <= 500
The string s consists of characters '0' and '1' only.


</> Typescript Code:
*/

function maxScore(s: string): number {
  let maxScore = 0; // Initialize maxScore to keep track of the highest score found
  let onesCount = 0; // Initialize onesCount to count the number of '1's in the string
  let zerosCount = 0; // Initialize zerosCount to count the number of '0's in the left substring

  // Count the total number of '1's in the string since they will contribute to the score of every right substring
  for (const char of s) {
    if (char === "1") {
      onesCount++;
    }
  }

  // Iterate through the string until the second-to-last character
  // The last character must be part of the right substring, so it's not included in the loop
  for (let i = 0; i < s.length - 1; i++) {
    if (s[i] === "0") {
      zerosCount++; // If the current character is '0', increment zerosCount for the left substring
    } else {
      onesCount--; // If the current character is '1', decrement onesCount as it's now part of the left substring
    }
    // Calculate the score for the current split and update maxScore if this score is greater
    maxScore = Math.max(maxScore, zerosCount + onesCount);
  }

  // Return the maximum score found after checking all possible splits
  return maxScore;
}

/* 
1496. Path Crossing

Easy
Topics
Companies
Hint

Given a string path, where path[i] = 'N', 'S', 'E' or 'W', each representing moving one unit north, south, east, or west, respectively. You start at the origin (0, 0) on a 2D plane and walk on the path specified by path.

Return true if the path crosses itself at any point, that is, if at any time you are on a location you have previously visited. Return false otherwise.


Example 1:

Input: path = "NES"
Output: false 
Explanation: Notice that the path doesn't cross any point more than once.


Example 2:

Input: path = "NESWW"
Output: true
Explanation: Notice that the path visits the origin twice.


Constraints:

1 <= path.length <= 104
path[i] is either 'N', 'S', 'E', or 'W'.

</> Typescript Code:
*/

function isPathCrossing(path: string): boolean {
  // Initialize the starting point at the origin (0,0)
  let x = 0;
  let y = 0;

  // A Set to keep track of all visited coordinates in the format "x,y"
  let visited = new Set<string>();
  visited.add(`${x},${y}`); // Add the starting point to the visited Set

  // Loop through the path string to move the current position
  for (let i = 0; i < path.length; i++) {
    switch (path[i]) {
      case "N":
        y++;
        break; // Move north: increment y coordinate
      case "S":
        y--;
        break; // Move south: decrement y coordinate
      case "E":
        x++;
        break; // Move east: increment x coordinate
      case "W":
        x--;
        break; // Move west: decrement x coordinate
    }

    // Create a string representation of the current coordinate
    const current = `${x},${y}`;

    // Check if the current coordinate has already been visited
    if (visited.has(current)) {
      return true; // The path crosses itself, return true
    }

    // If not visited, add the current coordinate to the Set
    visited.add(current);
  }

  // If no coordinates have been visited more than once, return false
  return false;
}

/* 1758. Minimum Changes To Make Alternating Binary String
Easy
Topics
Companies
Hint
You are given a string s consisting only of the characters '0' and '1'. In one operation, you can change any '0' to '1' or vice versa.

The string is called alternating if no two adjacent characters are equal. For example, the string "010" is alternating, while the string "0100" is not.

Return the minimum number of operations needed to make s alternating.

Example 1:

Input: s = "0100"
Output: 1
Explanation: If you change the last character to '1', s will be "0101", which is alternating.

Example 2:

Input: s = "10"
Output: 0
Explanation: s is already alternating.

Example 3:

Input: s = "1111"
Output: 2
Explanation: You need two operations to reach "0101" or "1010".

Constraints:

1 <= s.length <= 104
s[i] is either '0' or '1'.

</> Typescript Code:
*/

function minOperationsBT(s: string): number {
  // Initialize two counters to track mismatches with the two possible alternating patterns
  let count1 = 0; // Count mismatches for pattern '0101...'
  let count2 = 0; // Count mismatches for pattern '1010...'

  // Loop through each character of the string
  for (let i = 0; i < s.length; i++) {
    // Check if the current index is even
    if (i % 2 === 0) {
      // If the character at the even index is '1', it mismatches with '0101...' pattern
      if (s[i] === "1") {
        count1++; // Increment count1 for pattern '0101...'
      } else {
        // Otherwise, it mismatches with '1010...' pattern
        count2++; // Increment count2 for pattern '1010...'
      }
    } else {
      // If the current index is odd
      // If the character at the odd index is '0', it mismatches with '0101...' pattern
      if (s[i] === "0") {
        count1++; // Increment count1 for pattern '0101...'
      } else {
        // Otherwise, it mismatches with '1010...' pattern
        count2++; // Increment count2 for pattern '1010...'
      }
    }
  }

  // Finally, return the minimum of the two mismatch counts
  // This represents the minimum number of changes needed to make the string alternating
  return Math.min(count1, count2);
}

/* 
1897. Redistribute Characters to Make All Strings Equal

You are given an array of strings words (0-indexed).

In one operation, pick two distinct indices i and j, where words[i] is a non-empty string, and move any character from words[i] to any position in words[j].

Return true if you can make every string in words equal using any number of operations, and false otherwise.

Example 1:

Input: words = ["abc","aabc","bc"]
Output: true
Explanation: Move the first 'a' in words[1] to the front of words[2],
to make words[1] = "abc" and words[2] = "abc".
All the strings are now equal to "abc", so return true.

Example 2:

Input: words = ["ab","a"]
Output: false
Explanation: It is impossible to make all the strings equal using the operation.


Constraints:

1 <= words.length <= 100
1 <= words[i].length <= 100
words[i] consists of lowercase English letters.

</> Typescript Code:
*/

function makeEqual(words: string[]): boolean {
  // Create a map to store the frequency of each character across all words
  const charCount = new Map<string, number>();

  // Iterate over each word in the words array
  for (const word of words) {
    // Iterate over each character in the current word
    for (const char of word) {
      // Update the count for each character in the map
      // If the character doesn't exist in the map, initialize its count to 0 and then add 1
      charCount.set(char, (charCount.get(char) || 0) + 1);
    }
  }

  // Iterate over each character in the map
  for (const [char, count] of charCount) {
    // Check if the count of the character is divisible by the number of words
    // If not, return false, as we cannot evenly distribute this character across all words
    if (count % words.length !== 0) {
      return false;
    }
  }

  // If all character counts are divisible by the number of words, return true
  // This means we can redistribute the characters to make all strings equal
  return true;
}

/* 
1624. Largest Substring Between Two Equal Characters

Given a string s, return the length of the longest substring between two equal characters, excluding the two characters. If there is no such substring return -1.

A substring is a contiguous sequence of characters within a string.

Example 1:

Input: s = "aa"
Output: 0
Explanation: The optimal substring here is an empty substring between the two 'a's.

Example 2:

Input: s = "abca"
Output: 2
Explanation: The optimal substring here is "bc".
Example 3:

Input: s = "cbzxy"
Output: -1
Explanation: There are no characters that appear twice in s.

Constraints:

1 <= s.length <= 300
s contains only lowercase English letters.

</> Typescript Code:
 */

function maxLengthBetweenEqualCharacters(s: string): number {
  // Create a map to store the first occurrence index of each character
  const firstOccurrence = new Map<string, number>();
  // Initialize maxLength to -1, which is the default return value if no valid substring is found
  let maxLength = -1;

  // Iterate over each character in the string
  for (let i = 0; i < s.length; i++) {
    // Get the current character
    const char = s[i];

    // Check if the character has been seen before
    if (firstOccurrence.has(char)) {
      // Calculate the length of the substring between the two occurrences of the character
      // Subtract 1 to exclude the characters themselves
      // Update maxLength if this length is greater than the current maxLength
      maxLength = Math.max(maxLength, i - firstOccurrence.get(char)! - 1);
    } else {
      // If it's the first occurrence of the character, record its index in the map
      firstOccurrence.set(char, i);
    }
  }

  // Return the length of the longest substring between two equal characters, or -1 if not found
  return maxLength;
}

/* 
455. Assign Cookies

Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one cookie.

Each child i has a greed factor g[i], which is the minimum size of a cookie that the child will be content with; and each cookie j has a size s[j]. If s[j] >= g[i], we can assign the cookie j to the child i, and the child i will be content. Your goal is to maximize the number of your content children and output the maximum number.

Example 1:

Input: g = [1,2,3], s = [1,1]
Output: 1
Explanation: You have 3 children and 2 cookies. The greed factors of 3 children are 1, 2, 3. 
And even though you have 2 cookies, since their size is both 1, you could only make the child whose greed factor is 1 content.
You need to output 1.

Example 2:

Input: g = [1,2], s = [1,2,3]
Output: 2
Explanation: You have 2 children and 3 cookies. The greed factors of 2 children are 1, 2. 
You have 3 cookies and their sizes are big enough to gratify all of the children, 
You need to output 2.

Constraints:

1 <= g.length <= 3 * 104
0 <= s.length <= 3 * 104
1 <= g[i], s[j] <= 231 - 1

</> Typescript Code:
*/

function findContentChildren(g: number[], s: number[]): number {
  // Sort the greed factors array in ascending order
  g.sort((a, b) => a - b);
  // Sort the cookies sizes array in ascending order
  s.sort((a, b) => a - b);

  // Initialize a counter for the number of content children
  let contentChildren = 0;
  // Initialize a pointer to iterate through the greed factors array
  let i = 0;

  // Loop through the cookies sizes array
  for (let j = 0; j < s.length && i < g.length; j++) {
    // If the current cookie size is greater than or equal to the greed factor of the current child
    if (s[j] >= g[i]) {
      // Increment the number of content children
      contentChildren++;
      // Move the pointer to the next child
      i++;
    }
  }

  // Return the final count of content children
  return contentChildren;
}

/* 
938. Range Sum of BST

Given the root node of a binary search tree and two integers low and high, return the sum of values of all nodes with a value in the inclusive range [low, high].


Example 1:

Input: root = [10,5,15,3,7,null,18], low = 7, high = 15
Output: 32
Explanation: Nodes 7, 10, and 15 are in the range [7, 15]. 7 + 10 + 15 = 32.


Example 2:

Input: root = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10
Output: 23
Explanation: Nodes 6, 7, and 10 are in the range [6, 10]. 6 + 7 + 10 = 23.


Constraints:

The number of nodes in the tree is in the range [1, 2 * 104].
1 <= Node.val <= 105
1 <= low <= high <= 105
All Node.val are unique.

</> Typescript Code:
*/

/* Definition for a binary tree node. */
/* class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
} */
function rangeSumBST(root: TreeNode | null, low: number, high: number): number {
  if (!root) return 0; // Base case: if the node is null, return 0

  // If current node's value is greater than high, we only need to consider the left subtree
  if (root.val > high) return rangeSumBST(root.left, low, high);

  // If current node's value is less than low, we only need to consider the right subtree
  if (root.val < low) return rangeSumBST(root.right, low, high);

  // If current node's value is within the range, include it in sum and check both subtrees
  return (
    root.val +
    rangeSumBST(root.left, low, high) +
    rangeSumBST(root.right, low, high)
  );
}

/* 
872. Leaf-Similar Trees

Consider all the leaves of a binary tree, from left to right order, the values of those leaves form a leaf value sequence.

For example, in the given tree above, the leaf value sequence is (6, 7, 4, 9, 8).

Two binary trees are considered leaf-similar if their leaf value sequence is the same.

Return true if and only if the two given trees with head nodes root1 and root2 are leaf-similar.


Example 1:

Input: root1 = [3,5,1,6,2,9,8,null,null,7,4], root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
Output: true


Example 2:

Input: root1 = [1,2,3], root2 = [1,3,2]
Output: false


Constraints:

The number of nodes in each tree will be in the range [1, 200].
Both of the given trees will have values in the range [0, 200].

</> Typescript Code:
*/

/* Definition for a binary tree node. */
/* class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
} */

function leafSimilar(root1: TreeNode | null, root2: TreeNode | null): boolean {
  // Arrays to store leaf values of each tree
  const leaves1: number[] = [];
  const leaves2: number[] = [];

  // Depth-first search to collect leaf values
  dfs(root1, leaves1);
  dfs(root2, leaves2);

  // Check if leaf sequences are identical
  return (
    leaves1.length === leaves2.length &&
    leaves1.every((val, index) => val === leaves2[index])
  );
}

// Helper function to perform DFS and collect leaf values
function dfs(node: TreeNode | null, leaves: number[]) {
  if (!node) return; // Base case: if node is null
  if (!node.left && !node.right) leaves.push(node.val); // If leaf node, add its value to leaves array
  dfs(node.left, leaves); // Recur for left subtree
  dfs(node.right, leaves); // Recur for right subtree
}

/* 
1704. Determine if String Halves Are Alike

You are given a string s of even length. Split this string into two halves of equal lengths, and let a be the first half and b be the second half.

Two strings are alike if they have the same number of vowels ('a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'). Notice that s contains uppercase and lowercase letters.

Return true if a and b are alike. Otherwise, return false.


Example 1:

Input: s = "book"
Output: true
Explanation: a = "bo" and b = "ok". a has 1 vowel and b has 1 vowel. Therefore, they are alike.


Example 2:

Input: s = "textbook"
Output: false
Explanation: a = "text" and b = "book". a has 1 vowel whereas b has 2. Therefore, they are not alike.
Notice that the vowel o is counted twice.


Constraints:

2 <= s.length <= 1000
s.length is even.
s consists of uppercase and lowercase letters.

</> Typescript Code:
*/

function halvesAreAlike(s: string): boolean {
  // Helper function to check if a character is a vowel
  const isVowel = (c: string) => "aeiouAEIOU".includes(c);

  // Helper function to count the number of vowels in a string
  const countVowels = (str: string) =>
    [...str].filter((c) => isVowel(c)).length;

  // Calculate the length of each half
  const half = s.length / 2;

  // Compare the number of vowels in the first half to the second half
  // Return true if they are the same, otherwise false
  return countVowels(s.substring(0, half)) === countVowels(s.substring(half));
}

/* 
1207. Unique Number of Occurrences

Given an array of integers arr, return true if the number of occurrences of each value in the array is unique or false otherwise.


Example 1:

Input: arr = [1,2,2,1,1,3]
Output: true
Explanation: The value 1 has 3 occurrences, 2 has 2 and 3 has 1. No two values have the same number of occurrences.


Example 2:

Input: arr = [1,2]
Output: false


Example 3:

Input: arr = [-3,0,1,-3,1,1,1,-3,10,0]
Output: true


Constraints:

1 <= arr.length <= 1000
-1000 <= arr[i] <= 1000

</> Typescript Code:
*/

function uniqueOccurrences(arr: number[]): boolean {
  // Initialize a map to store the frequency of each number in the array
  const occurrenceMap = new Map();

  // Iterate over the array
  for (const num of arr) {
    // Update the frequency of the current number
    // If the number is not in the map, get(num) returns undefined, so we use 0 as the default value
    occurrenceMap.set(num, (occurrenceMap.get(num) || 0) + 1);
  }

  // Create a set from the values of the map (i.e., frequencies of numbers)
  // This will remove any duplicate frequencies
  const occurrenceSet = new Set(occurrenceMap.values());

  // If the size of the set and the map are the same, it means all frequencies were unique
  return occurrenceSet.size === occurrenceMap.size;
}

/* 
70. Climbing Stairs

You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?


Example 1:

Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps


Example 2:

Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step


Constraints:

1 <= n <= 45

</> Typescript Code:
*/

function climbStairs(n: number): number {
  // Base cases: if n is 1 or 2
  if (n <= 2) return n;

  // Initialize the first two steps
  let first = 1,
    second = 2;

  // Starting from step 3, calculate the number of ways to climb to each step
  for (let i = 3; i <= n; i++) {
    // The current step's ways is the sum of the ways to the two previous steps
    const current = first + second;
    // Update the first and second for the next iteration
    first = second;
    second = current;
  }

  // Return the number of ways to climb to the nth step
  return second;
}

/* 
645. Set Mismatch

You have a set of integers s, which originally contains all the numbers from 1 to n. Unfortunately, due to some error, one of the numbers in s got duplicated to another number in the set, which results in repetition of one number and loss of another number.

You are given an integer array nums representing the data status of this set after the error.

Find the number that occurs twice and the number that is missing and return them in the form of an array.


Example 1:

Input: nums = [1,2,2,4]
Output: [2,3]


Example 2:

Input: nums = [1,1]
Output: [1,2]


Constraints:

2 <= nums.length <= 104
1 <= nums[i] <= 104

</> Typescript Code:
*/

function findErrorNums(nums: number[]): number[] {
  let xor = 0,
    xor0 = 0,
    xor1 = 0;

  // XOR all the elements in the array
  for (const num of nums) {
    xor ^= num;
  }

  // XOR all numbers from 1 to n
  for (let i = 1; i <= nums.length; i++) {
    xor ^= i;
  }

  // Get the rightmost set bit in xor
  let rightmostbit = xor & ~(xor - 1);

  // Divide the numbers into two groups and XOR them separately
  for (const num of nums) {
    if ((num & rightmostbit) !== 0) xor1 ^= num;
    else xor0 ^= num;
  }

  // Do the same for numbers from 1 to n
  for (let i = 1; i <= nums.length; i++) {
    if ((i & rightmostbit) !== 0) xor1 ^= i;
    else xor0 ^= i;
  }

  // Determine which one is the duplicate and which one is missing
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === xor1) return [xor1, xor0];
  }
  return [xor0, xor1];
}

/* 
232. Implement Queue using Stacks

Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).

Implement the MyQueue class:

void push(int x) Pushes element x to the back of the queue.
int pop() Removes the element from the front of the queue and returns it.
int peek() Returns the element at the front of the queue.
boolean empty() Returns true if the queue is empty, false otherwise.


Notes:
You must use only standard operations of a stack, which means only push to top, peek/pop from top, size, and is empty operations are valid.
Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.


Example 1:
Input
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
Output
[null, null, null, 1, 1, false]

Explanation
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false


Constraints:
1 <= x <= 9
At most 100 calls will be made to push, pop, peek, and empty.
All the calls to pop and peek are valid.


Follow-up: Can you implement the queue such that each operation is amortized O(1) time complexity? In other words, performing n operations will take overall O(n) time even if one of those operations may take longer.

</> Typescript Code:
*/

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */

class MyQueue {
  // Two stacks to simulate the queue
  private stack1: number[];
  private stack2: number[];

  constructor() {
    this.stack1 = []; // Stack for enqueue operation
    this.stack2 = []; // Stack for dequeue operation
  }

  // Push element into the queue
  push(x: number): void {
    this.stack1.push(x);
  }

  // Pop the element from the front of the queue
  pop(): number {
    // If stack2 is empty, move all elements from stack1 to stack2, reversing their order
    if (this.stack2.length === 0) {
      while (this.stack1.length) {
        this.stack2.push(this.stack1.pop()!);
      }
    }
    // Pop the top element from stack2
    return this.stack2.pop()!;
  }

  // Get the front element
  peek(): number {
    // If stack2 is empty, move all elements from stack1 to stack2
    if (this.stack2.length === 0) {
      while (this.stack1.length) {
        this.stack2.push(this.stack1.pop()!);
      }
    }
    // Return the top element of stack2
    return this.stack2[this.stack2.length - 1];
  }

  // Check whether the queue is empty
  empty(): boolean {
    // The queue is empty if both stacks are empty
    return this.stack1.length === 0 && this.stack2.length === 0;
  }
}

/* 
387. First Unique Character in a String

Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.

Example 1:
Input: s = "leetcode"
Output: 0

Example 2:
Input: s = "loveleetcode"
Output: 2

Example 3:
Input: s = "aabb"
Output: -1

Constraints:
1 <= s.length <= 105
s consists of only lowercase English letters.

</> Typescript Code:
*/

function firstUniqChar(s: string): number {
  // Initialize a map to store character counts
  const charCount = new Map();
  // First pass: count occurrences of each character
  for (let i = 0; i < s.length; i++) {
    // Increment the count for character s[i], or set to 1 if not exist
    charCount.set(s[i], (charCount.get(s[i]) || 0) + 1);
  }
  // Second pass: find the first unique character
  for (let i = 0; i < s.length; i++) {
    // If the count of the character is 1, return its index
    if (charCount.get(s[i]) === 1) {
      return i;
    }
  }
  // If no unique character found, return -1
  return -1;
}

/* 
169. Majority Element

Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

Example 1:
Input: nums = [3,2,3]
Output: 3

Example 2:
Input: nums = [2,2,1,1,1,2,2]
Output: 2

Constraints:
n == nums.length
1 <= n <= 5 * 104
-109 <= nums[i] <= 109

Follow-up: Could you solve the problem in linear time and in O(1) space?

</> Typescript Code:
*/

// Function to find the majority element in the array
function majorityElement(nums: number[]): number {
  let count = 0; // Initialize count to keep track of the number of occurrences
  let candidate: number | null = null; // Initialize candidate to null

  // Iterate through each number in the array
  for (let num of nums) {
    // If count is 0, we select a new candidate
    if (count === 0) {
      candidate = num;
    }
    // If the current number is the same as the candidate, increment count, else decrement
    count += num === candidate ? 1 : -1;
  }

  // Return the candidate as the majority element
  return candidate!;
}

/* 
2108. Find First Palindromic String in the Array

Given an array of strings words, return the first palindromic string in the array. If there is no such string, return an empty string "".

A string is palindromic if it reads the same forward and backward.

Example 1:
Input: words = ["abc","car","ada","racecar","cool"]
Output: "ada"
Explanation: The first string that is palindromic is "ada".
Note that "racecar" is also palindromic, but it is not the first.

Example 2:
Input: words = ["notapalindrome","racecar"]
Output: "racecar"
Explanation: The first and only string that is palindromic is "racecar".

Example 3:
Input: words = ["def","ghi"]
Output: ""
Explanation: There are no palindromic strings, so the empty string is returned.

Constraints:
1 <= words.length <= 100
1 <= words[i].length <= 100
words[i] consists only of lowercase English letters.

</> Typescript Code:
*/

// Define the function to find the first palindromic string in an array
function firstPalindrome(words: string[]): string {
  // Iterate through each word in the array
  for (const word of words) {
    // Check if the word is a palindrome
    // A word is a palindrome if it is equal to its reverse
    if (word === word.split("").reverse().join("")) {
      // If the word is a palindrome, return it as the first palindromic string
      return word;
    }
  }
  // If no palindromic string is found in the array, return an empty string
  return "";
}

/* 
268. Missing Number

Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.

Example 1:
Input: nums = [3,0,1]
Output: 2
Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.

Example 2:
Input: nums = [0,1]
Output: 2
Explanation: n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums.

Example 3:
Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8
Explanation: n = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 8 is the missing number in the range since it does not appear in nums.

Constraints:
n == nums.length
1 <= n <= 104
0 <= nums[i] <= n
All the numbers of nums are unique.

Follow up: Could you implement a solution using only O(1) extra space complexity and O(n) runtime complexity?

</> Typescript Code:
*/

function missingNumber(nums: number[]): number {
  // Calculate the expected sum of numbers from 0 to n using the formula n*(n+1)/2
  let sum = (nums.length * (nums.length + 1)) / 2;

  // Calculate the actual sum of numbers in the array
  let actualSum = nums.reduce((a, b) => a + b, 0);

  // The missing number is the difference between the expected sum and the actual sum
  return sum - actualSum;
}

/* 
231. Power of Two

Given an integer n, return true if it is a power of two. Otherwise, return false.

An integer n is a power of two, if there exists an integer x such that n == 2x.

Example 1:
Input: n = 1
Output: true
Explanation: 20 = 1

Example 2:
Input: n = 16
Output: true
Explanation: 24 = 16

Example 3:
Input: n = 3
Output: false

Constraints:
-231 <= n <= 231 - 1

Follow up: Could you solve it without loops/recursion?

</> Typescript Code:
*/

function isPowerOfTwo(n: number): boolean {
  // A number is a power of two if it is greater than 0 and
  // the binary representation of n and n-1 has no common set bits.
  // This is because powers of two in binary form have only one set bit,
  // and n-1 will have all bits set to the right of the original set bit in n.
  // The bitwise AND operation of n and n-1 will thus be 0 for powers of two.
  return n > 0 && (n & (n - 1)) === 0;
}

/* 
997. Find the Town Judge

In a town, there are n people labeled from 1 to n. There is a rumor that one of these people is secretly the town judge.

If the town judge exists, then:

The town judge trusts nobody.
Everybody (except for the town judge) trusts the town judge.
There is exactly one person that satisfies properties 1 and 2.
You are given an array trust where trust[i] = [ai, bi] representing that the person labeled ai trusts the person labeled bi. If a trust relationship does not exist in trust array, then such a trust relationship does not exist.

Return the label of the town judge if the town judge exists and can be identified, or return -1 otherwise.

Example 1:
Input: n = 2, trust = [[1,2]]
Output: 2

Example 2:
Input: n = 3, trust = [[1,3],[2,3]]
Output: 3

Example 3:
Input: n = 3, trust = [[1,3],[2,3],[3,1]]
Output: -1

Constraints:
1 <= n <= 1000
0 <= trust.length <= 104
trust[i].length == 2
All the pairs of trust are unique.
ai != bi
1 <= ai, bi <= n
*/

function findJudge(n: number, trust: number[][]): number {
  // Initialize an array to keep track of each person's trust count.
  // trustCounts[i] represents the net trust for person i.
  // Positive value means more people trust i, negative means i trusts others.
  const trustCounts = new Array(n + 1).fill(0);

  // Iterate through the trust relationships to update trustCounts.
  // If person a trusts person b, decrement a's trust count and increment b's.
  for (const [a, b] of trust) {
    trustCounts[a]--;
    trustCounts[b]++;
  }

  // Find the index (person) whose trust count is exactly n-1,
  // which means everyone else trusts them, and they trust no one.
  // We start from index 1 since there's no person labeled 0.
  return trustCounts.findIndex((count, i) => count === n - 1 && i !== 0);
}

/* 
100. Same Tree

Given the roots of two binary trees p and q, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

Example 1:
Input: p = [1,2,3], q = [1,2,3]
Output: true

Example 2:
Input: p = [1,2], q = [1,null,2]
Output: false

Example 3:
Input: p = [1,2,1], q = [1,1,2]
Output: false

Constraints:
The number of nodes in both trees is in the range [0, 100].
-104 <= Node.val <= 104

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

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  // Check if both trees are empty, which means they are the same.
  if (!p && !q) return true;
  // If one tree is empty and the other is not, or if the current nodes' values don't match,
  // the trees are not the same.
  if (!p || !q || p.val !== q.val) return false;
  // Recursively check if the left subtrees are the same and if the right subtrees are the same.
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

/*  
543. Diameter of Binary Tree

Given the root of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

The length of a path between two nodes is represented by the number of edges between them.

Example 1:
Input: root = [1,2,3,4,5]
Output: 3
Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].

Example 2:
Input: root = [1,2]
Output: 1

Constraints:
The number of nodes in the tree is in the range [1, 104].
-100 <= Node.val <= 100

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

function diameterOfBinaryTree(root: TreeNode | null): number {
  let diameter = 0; // Holds the maximum diameter found during traversal.

  // Recursive function to find the depth of the tree. It also updates the diameter.
  function depth(node: TreeNode | null): number {
    if (!node) return 0; // Base case: if the node is null, return depth of 0.
    const left = depth(node.left); // Recursively find the depth of the left subtree.
    const right = depth(node.right); // Recursively find the depth of the right subtree.
    diameter = Math.max(diameter, left + right); // Update the diameter if the path through this node is longer.
    return Math.max(left, right) + 1; // Return the depth of the node, which is max depth of its children plus one for the current node.
  }

  depth(root); // Begin the depth-first search from the root.
  return diameter; // Return the maximum diameter found.
}

/* 
2864. Maximum Odd Binary Number

You are given a binary string s that contains at least one '1'.

You have to rearrange the bits in such a way that the resulting binary number is the maximum odd binary number that can be created from this combination.

Return a string representing the maximum odd binary number that can be created from the given combination.

Note that the resulting string can have leading zeros.

Example 1:
Input: s = "010"
Output: "001"
Explanation: Because there is just one '1', it must be in the last position. So the answer is "001".

Example 2:
Input: s = "0101"
Output: "1001"
Explanation: One of the '1's must be in the last position. The maximum number that can be made with the remaining digits is "100". So the answer is "1001".

Constraints:
1 <= s.length <= 100
s consists only of '0' and '1'.
s contains at least one '1'.

</> Typescript Code:
*/

function maximumOddBinaryNumber(s: string): string {
  // Count the number of '1's in the string and subtract one to ensure the last digit is '1'
  let ones = s.split("").filter((c) => c === "1").length - 1;
  // Count the number of '0's by subtracting the number of '1's (excluding the last '1') from the total length
  let zeros = s.length - ones - 1;
  // Construct the maximum odd binary number:
  // - Use all but one '1' at the beginning
  // - Follow with all '0's
  // - Ensure the last digit is '1' to make it odd
  return "1".repeat(ones) + "0".repeat(zeros) + "1";
}

/* 
977. Squares of a Sorted Array

Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.

Example 1:
Input: nums = [-4,-1,0,3,10]
Output: [0,1,9,16,100]
Explanation: After squaring, the array becomes [16,1,0,9,100].
After sorting, it becomes [0,1,9,16,100].

Example 2:
Input: nums = [-7,-3,2,3,11]
Output: [4,9,9,49,121]

Constraints:
1 <= nums.length <= 104
-104 <= nums[i] <= 104
nums is sorted in non-decreasing order.

Follow up: Squaring each element and sorting the new array is very trivial, could you find an O(n) solution using a different approach?

</> Typescript Code:
*/

// Define the function with the type signature expecting an array of numbers and returning an array of numbers.
function sortedSquares(nums: number[]): number[] {
  // Initialize two pointers, one at the start and one at the end of the array.
  let left = 0,
    right = nums.length - 1;
  // Create a result array of the same length as the input array.
  const result = new Array(nums.length);
  // Iterate from the end of the result array towards the start.
  for (let i = nums.length - 1; i >= 0; i--) {
    // Check if the absolute value of the left pointer is greater than the right pointer.
    if (Math.abs(nums[left]) > Math.abs(nums[right])) {
      // If so, square the value at the left pointer and assign it to the current position in result array.
      result[i] = nums[left] * nums[left];
      // Move the left pointer towards the right.
      left++;
    } else {
      // Otherwise, square the value at the right pointer and assign it to the current position in result array.
      result[i] = nums[right] * nums[right];
      // Move the right pointer towards the left.
      right--;
    }
  }
  // Return the result array, now fully populated and sorted.
  return result;
}

/* 
141. Linked List Cycle

Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.

Example 1:
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).

Example 2:
Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.

Example 3:
Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.

Constraints:
The number of the nodes in the list is in the range [0, 104].
-105 <= Node.val <= 105
pos is -1 or a valid index in the linked-list.

Follow up: Can you solve it using O(1) (i.e. constant) memory?

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

function hasCycle(head: ListNode | null): boolean {
  let slow = head,
    fast = head; // Initialize two pointers, slow and fast, both at the head of the list
  while (fast && fast.next) {
    // Continue looping as long as fast and fast.next are not null
    slow && (slow = slow.next); // Move slow pointer one step
    fast = fast.next.next; // Move fast pointer two steps
    if (slow === fast) return true; // If slow and fast meet, a cycle exists
  }
  return false; // If the loop ends, no cycle exists
}

/* 
876. Middle of the Linked List

Given the head of a singly linked list, return the middle node of the linked list.

If there are two middle nodes, return the second middle node.

Example 1:
Input: head = [1,2,3,4,5]
Output: [3,4,5]
Explanation: The middle node of the list is node 3.

Example 2:
Input: head = [1,2,3,4,5,6]
Output: [4,5,6]
Explanation: Since the list has two middle nodes with values 3 and 4, we return the second one.

Constraints:
The number of nodes in the list is in the range [1, 100].
1 <= Node.val <= 100

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

function middleNode(head: ListNode | null): ListNode | null {
  // Initialize two pointers, slow and fast, both starting from the head
  let slow: ListNode | null = head,
    fast = head;

  // Loop until fast reaches the end of the list
  while (fast !== null && fast.next !== null) {
    // Move slow one step
    if (slow) slow = slow.next;
    // Move fast two steps
    fast = fast.next.next;
  }

  // When fast reaches the end, slow is at the middle
  // If the list has even number of elements, this will be the second middle node due to the fast pointer's speed
  return slow;
}

/* 
3005. Count Elements With Maximum Frequency

You are given an array nums consisting of positive integers.

Return the total frequencies of elements in nums such that those elements all have the maximum frequency.

The frequency of an element is the number of occurrences of that element in the array.

Example 1:
Input: nums = [1,2,2,3,1,4]
Output: 4
Explanation: The elements 1 and 2 have a frequency of 2 which is the maximum frequency in the array.
So the number of elements in the array with maximum frequency is 4.

Example 2:
Input: nums = [1,2,3,4,5]
Output: 5
Explanation: All elements of the array have a frequency of 1 which is the maximum.
So the number of elements in the array with maximum frequency is 5.

Constraints:
1 <= nums.length <= 100
1 <= nums[i] <= 100

</> Typescript Code:
*/

function maxFrequencyElements(nums: number[]): number {
  // Create a map to keep track of the frequency of each element.
  const frequencyMap = {};
  // Variables to store the maximum frequency found and the total elements having that frequency.
  let maxFrequency = 0,
    totalMaxFrequencyElements = 0;
  // Loop through each element in the array to populate the frequency map.
  for (const num of nums) {
    // If the element is already in the map, increment its count, otherwise set it to 1.
    frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    // Update the maximum frequency found so far.
    maxFrequency = Math.max(maxFrequency, frequencyMap[num]);
  }
  // Loop through the frequency map to count how many elements have the maximum frequency.
  for (const freq of Object.values(frequencyMap)) {
    // If the frequency of an element matches the maximum frequency, add it to the total count.
    if (freq === maxFrequency) totalMaxFrequencyElements += freq;
  }
  // Return the total count of elements with maximum frequency.
  return totalMaxFrequencyElements;
}

/* 
2540. Minimum Common Value

Given two integer arrays nums1 and nums2, sorted in non-decreasing order, return the minimum integer common to both arrays. If there is no common integer amongst nums1 and nums2, return -1.

Note that an integer is said to be common to nums1 and nums2 if both arrays have at least one occurrence of that integer.

Example 1:
Input: nums1 = [1,2,3], nums2 = [2,4]
Output: 2
Explanation: The smallest element common to both arrays is 2, so we return 2.

Example 2:
Input: nums1 = [1,2,3,6], nums2 = [2,3,4,5]
Output: 2
Explanation: There are two common elements in the array 2 and 3 out of which 2 is the smallest, so 2 is returned.

Constraints:
1 <= nums1.length, nums2.length <= 105
1 <= nums1[i], nums2[j] <= 109
Both nums1 and nums2 are sorted in non-decreasing order.

</> Typescript Code:
*/

function getCommon(nums1: number[], nums2: number[]): number {
  // Initialize two pointers for each array starting from the beginning
  let i = 0,
    j = 0;

  // Loop until one of the pointers reaches the end of its respective array
  while (i < nums1.length && j < nums2.length) {
    // If the current element in nums1 is less than that in nums2, move the nums1 pointer forward
    if (nums1[i] < nums2[j]) {
      i++;
    }
    // If the current element in nums2 is less than that in nums1, move the nums2 pointer forward
    else if (nums1[i] > nums2[j]) {
      j++;
    }
    // If the elements pointed by both pointers are equal, we've found a common element
    else {
      return nums1[i]; // Return the common element
    }
  }
  // If no common element is found by the end of either array, return -1
  return -1;
}

/* 
349. Intersection of Two Arrays

Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.

Example 1:
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]

Example 2:
Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [9,4]
Explanation: [4,9] is also accepted.

Constraints:
1 <= nums1.length, nums2.length <= 1000
0 <= nums1[i], nums2[i] <= 1000

</> Typescript Code:
*/

function intersection(nums1: number[], nums2: number[]): number[] {
  // Convert nums1 to a Set to remove duplicates and retain only unique values.
  const setNums1 = new Set(nums1);
  // Filter setNums1 to include only those numbers that are also present in nums2.
  // This effectively computes the intersection of nums1 and nums2.
  const intersection = [...setNums1].filter((n) => nums2.includes(n));
  // Convert the intersection array back into a Set to ensure all values are unique.
  const uniqueIntersection = new Set(intersection);
  // Spread the uniqueIntersection Set into an array and return it.
  // This array contains only unique elements present in both nums1 and nums2.
  return [...uniqueIntersection];
}

/* 
2485. Find the Pivot Integer

Given a positive integer n, find the pivot integer x such that:

The sum of all elements between 1 and x inclusively equals the sum of all elements between x and n inclusively.
Return the pivot integer x. If no such integer exists, return -1. It is guaranteed that there will be at most one pivot index for the given input.

Example 1:
Input: n = 8
Output: 6
Explanation: 6 is the pivot integer since: 1 + 2 + 3 + 4 + 5 + 6 = 6 + 7 + 8 = 21.

Example 2:
Input: n = 1
Output: 1
Explanation: 1 is the pivot integer since: 1 = 1.

Example 3:
Input: n = 4
Output: -1
Explanation: It can be proved that no such integer exist.

Constraints:
1 <= n <= 1000

</> Typescript Code:
 */

// Defines a function to find the pivot integer within a given range
function pivotInteger(n: number): number {
  // Calculate the total sum of numbers from 1 to n using the formula for the sum of an arithmetic series
  let totalSum = (n * (n + 1)) / 2;
  // Initialize leftSum to keep track of the sum of numbers from 1 to x
  let leftSum = 0;
  // Iterate through each number from 1 to n to find the pivot
  for (let x = 1; x <= n; x++) {
    // Add the current number to the leftSum
    leftSum += x;
    // Check if the current number is the pivot: when the sum of numbers from 1 to x equals the sum of numbers from x to n
    if (leftSum * 2 == totalSum + x) return x;
  }
  // Return -1 if no pivot integer is found
  return -1;
}

/* 
206. Reverse Linked List

Given the head of a singly linked list, reverse the list, and return the reversed list.

Example 1:
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

Example 2:
Input: head = [1,2]
Output: [2,1]

Example 3:
Input: head = []
Output: []

Constraints:
The number of nodes in the list is the range [0, 5000].
-5000 <= Node.val <= 5000

Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?

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

function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null; // Initialize previous pointer to null
  while (head) {
    // Iterate over the list until head is null
    const next = head.next; // Store the next node
    head.next = prev; // Reverse the current node's pointer
    prev = head; // Move prev to the current node
    head = next; // Move head to the next node
  }
  return prev; // Return the new head of the reversed list
}

/* 
234. Palindrome Linked List

Given the head of a singly linked list, return true if it is a 
palindrome or false otherwise.

Example 1:
Input: head = [1,2,2,1]
Output: true

Example 2:
Input: head = [1,2]
Output: false

Constraints:
The number of nodes in the list is in the range [1, 105].
0 <= Node.val <= 9

Follow up: Could you do it in O(n) time and O(1) space?

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

// Commented version explaining each line
function isPalindrome(head: ListNode | null): boolean {
  if (!head || !head.next) return true; // A single node or empty list is always a palindrome
  let slow: ListNode | null = head,
    fast: ListNode | null = head,
    prev: ListNode | null,
    temp: ListNode | null;
  // Use two pointers to find the midpoint of the list
  while (fast && fast.next) {
    slow = slow!.next; // Move slow pointer one step
    fast = fast.next.next; // Move fast pointer two steps
  }
  // Reverse the second half of the list
  prev = slow; // Set prev to the midpoint
  slow = slow!.next; // Move slow to the start of the second half
  prev!.next = null; // Break the list into two parts
  while (slow) {
    temp = slow.next; // Temporary store the next node
    slow.next = prev; // Reverse the link
    prev = slow; // Move prev forward
    slow = temp; // Move slow forward
  }
  // Compare the first and the second half
  fast = head; // Reset fast to the start of the list
  slow = prev; // Set slow to the start of the reversed second half
  while (slow) {
    // Traverse the second half
    if (fast!.val !== slow.val) return false; // Compare values
    fast = fast!.next; // Move forward in the first half
    slow = slow.next; // Move forward in the second half
  }
  return true; // If all nodes matched, it's a palindrome
}

/* 
58. Length of Last Word

Given a string s consisting of words and spaces, return the length of the last word in the string.

A word is a maximal substring consisting of non-space characters only.

Example 1:
Input: s = "Hello World"
Output: 5
Explanation: The last word is "World" with length 5.
Example 2:
Input: s = "   fly me   to   the moon  "
Output: 4
Explanation: The last word is "moon" with length 4.

Example 3:
Input: s = "luffy is still joyboy"
Output: 6
Explanation: The last word is "joyboy" with length 6.

Constraints:
1 <= s.length <= 10^4
s consists of only English letters and spaces ' '.
There will be at least one word in s.

</> Typescript Code:
*/

function lengthOfLastWord(s: string): number {
  // Trim the input string to remove leading and trailing spaces.
  s = s.trim();
  // Split the trimmed string into an array of words.
  const words = s.split(" ");
  // Pop the last word from the array.
  const lastWord = words.pop();
  // Return the length of the last word. The '!' asserts that 'lastWord' is not undefined.
  return lastWord!.length;
}

/* 
205. Isomorphic Strings

Given two strings s and t, determine if they are isomorphic.

Two strings s and t are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

Example 1:
Input: s = "egg", t = "add"
Output: true

Example 2:
Input: s = "foo", t = "bar"
Output: false

Example 3:
Input: s = "paper", t = "title"
Output: true

Constraints:
1 <= s.length <= 5 * 104
t.length == s.length
s and t consist of any valid ascii character.

</> Typescript Code:
*/

// Defines a function to determine if two strings are isomorphic
function isIsomorphic(s: string, t: string): boolean {
  // Create two maps to track character mappings from s to t and t to s
  const mapST = {};
  const mapTS = {};
  // Iterate through each character of the strings
  for (let i = 0; i < s.length; i++) {
    const x = s[i],
      y = t[i]; // Get the current characters from each string
    // Check if the current mapping violates the isomorphic conditions
    if ((mapST[x] && mapST[x] !== y) || (mapTS[y] && mapTS[y] !== x))
      return false;
    // Record the mappings
    mapST[x] = y;
    mapTS[y] = x;
  }
  // If all characters comply with the isomorphic rules, return true
  return true;
}

/* 
1614. Maximum Nesting Depth of the Parentheses

A string is a valid parentheses string (denoted VPS) if it meets one of the following:

It is an empty string "", or a single character not equal to "(" or ")",
It can be written as AB (A concatenated with B), where A and B are VPS's, or
It can be written as (A), where A is a VPS.
We can similarly define the nesting depth depth(S) of any VPS S as follows:

depth("") = 0
depth(C) = 0, where C is a string with a single character not equal to "(" or ")".
depth(A + B) = max(depth(A), depth(B)), where A and B are VPS's.
depth("(" + A + ")") = 1 + depth(A), where A is a VPS.
For example, "", "()()", and "()(()())" are VPS's (with nesting depths 0, 1, and 2), and ")(" and "(()" are not VPS's.

Given a VPS represented as string s, return the nesting depth of s.

Example 1:
Input: s = "(1+(2*3)+((8)/4))+1"
Output: 3
Explanation: Digit 8 is inside of 3 nested parentheses in the string.

Example 2:
Input: s = "(1)+((2))+(((3)))"
Output: 3


Constraints:
1 <= s.length <= 100
s consists of digits 0-9 and characters '+', '-', '*', '/', '(', and ')'.
It is guaranteed that parentheses expression s is a VPS.

</> Typescript Code:
*/

// Define the function maxDepth, which calculates the maximum nesting depth of parentheses in a string
function maxDepth(s: string): number {
  // Initialize currentDepth to track the depth of nested parentheses at any point
  let currentDepth = 0;
  // Initialize maxDepth to track the maximum depth of nesting encountered
  let maxDepth = 0;
  // Iterate through each character in the string s
  for (const char of s) {
    // If the character is an opening parenthesis, increment currentDepth
    if (char === "(") {
      currentDepth++;
      // Update maxDepth if the currentDepth exceeds it
      maxDepth = Math.max(maxDepth, currentDepth);
      // If the character is a closing parenthesis, decrement currentDepth
    } else if (char === ")") {
      currentDepth--;
    }
  }
  // Return the maximum depth encountered
  return maxDepth;
}

/* 
1544. Make The String Great

Given a string s of lower and upper case English letters.

A good string is a string which doesn't have two adjacent characters s[i] and s[i + 1] where:

0 <= i <= s.length - 2
s[i] is a lower-case letter and s[i + 1] is the same letter but in upper-case or vice-versa.
To make the string good, you can choose two adjacent characters that make the string bad and remove them. You can keep doing this until the string becomes good.

Return the string after making it good. The answer is guaranteed to be unique under the given constraints.

Notice that an empty string is also good.

Example 1:
Input: s = "leEeetcode"
Output: "leetcode"
Explanation: In the first step, either you choose i = 1 or i = 2, both will result "leEeetcode" to be reduced to "leetcode".

Example 2:
Input: s = "abBAcC"
Output: ""
Explanation: We have many possible scenarios, and all lead to the same answer. For example:
"abBAcC" --> "aAcC" --> "cC" --> ""
"abBAcC" --> "abBA" --> "aA" --> ""

Example 3:
Input: s = "s"
Output: "s"

Constraints:
1 <= s.length <= 100
s contains only lower and upper case English letters.

</> Typescript Code:
*/

// Define the function makeGood to transform the input string into a "good" string by removing certain adjacent characters
function makeGood(s: string): string {
  // Use a stack to keep track of characters that are not yet part of a "bad" pair
  let stack: string[] = [];
  // Iterate over each character in the string
  for (let char of s) {
    // Check if the stack is not empty and the absolute difference in char codes between
    // the current character and the last one in the stack is 32 (difference between upper and lower case)
    if (
      stack.length > 0 &&
      Math.abs(char.charCodeAt(0) - stack[stack.length - 1].charCodeAt(0)) ===
        32
    ) {
      // If so, remove the last character from the stack as the pair is "bad"
      stack.pop();
    } else {
      // Otherwise, add the current character to the stack
      stack.push(char);
    }
  }
  // Join the characters in the stack to form the final "good" string and return it
  return stack.join("");
}

/* 
1700. Number of Students Unable to Eat Lunch

The school cafeteria offers circular and square sandwiches at lunch break, referred to by numbers 0 and 1 respectively. All students stand in a queue. Each student either prefers square or circular sandwiches.

The number of sandwiches in the cafeteria is equal to the number of students. The sandwiches are placed in a stack. At each step:

If the student at the front of the queue prefers the sandwich on the top of the stack, they will take it and leave the queue.
Otherwise, they will leave it and go to the queue's end.
This continues until none of the queue students want to take the top sandwich and are thus unable to eat.

You are given two integer arrays students and sandwiches where sandwiches[i] is the type of the i​​​​​​th sandwich in the stack (i = 0 is the top of the stack) and students[j] is the preference of the j​​​​​​th student in the initial queue (j = 0 is the front of the queue). Return the number of students that are unable to eat.

Example 1:
Input: students = [1,1,0,0], sandwiches = [0,1,0,1]
Output: 0 
Explanation:
- Front student leaves the top sandwich and returns to the end of the line making students = [1,0,0,1].
- Front student leaves the top sandwich and returns to the end of the line making students = [0,0,1,1].
- Front student takes the top sandwich and leaves the line making students = [0,1,1] and sandwiches = [1,0,1].
- Front student leaves the top sandwich and returns to the end of the line making students = [1,1,0].
- Front student takes the top sandwich and leaves the line making students = [1,0] and sandwiches = [0,1].
- Front student leaves the top sandwich and returns to the end of the line making students = [0,1].
- Front student takes the top sandwich and leaves the line making students = [1] and sandwiches = [1].
- Front student takes the top sandwich and leaves the line making students = [] and sandwiches = [].
Hence all students are able to eat.

Example 2:
Input: students = [1,1,1,0,0,1], sandwiches = [1,0,0,0,1,1]
Output: 3

Constraints:
1 <= students.length, sandwiches.length <= 100
students.length == sandwiches.length
sandwiches[i] is 0 or 1.
students[i] is 0 or 1.

</> Typescript Code:
*/

// Define the function countStudents with parameters students and sandwiches, both are arrays of numbers
function countStudents(students: number[], sandwiches: number[]): number {
  // Loop until there are no sandwiches left or no student wants the top sandwich
  while (sandwiches.length && students.includes(sandwiches[0])) {
    // If the first student prefers the sandwich on top of the stack
    if (students[0] === sandwiches[0]) {
      // Remove the student from the queue and the sandwich from the stack
      students.shift();
      sandwiches.shift();
    } else {
      // Move the student to the end of the queue if they don't prefer the top sandwich
      students.push(students.shift()!);
    }
  }
  // Return the number of students left in the queue
  return students.length;
}

/* 
2073. Time Needed to Buy Tickets

There are n people in a line queuing to buy tickets, where the 0th person is at the front of the line and the (n - 1)th person is at the back of the line.

You are given a 0-indexed integer array tickets of length n where the number of tickets that the ith person would like to buy is tickets[i].

Each person takes exactly 1 second to buy a ticket. A person can only buy 1 ticket at a time and has to go back to the end of the line (which happens instantaneously) in order to buy more tickets. If a person does not have any tickets left to buy, the person will leave the line.

Return the time taken for the person at position k (0-indexed) to finish buying tickets.

Example 1:
Input: tickets = [2,3,2], k = 2
Output: 6
Explanation: 
- In the first pass, everyone in the line buys a ticket and the line becomes [1, 2, 1].
- In the second pass, everyone in the line buys a ticket and the line becomes [0, 1, 0].
The person at position 2 has successfully bought 2 tickets and it took 3 + 3 = 6 seconds.

Example 2:
Input: tickets = [5,1,1,1], k = 0
Output: 8
Explanation:
- In the first pass, everyone in the line buys a ticket and the line becomes [4, 0, 0, 0].
- In the next 4 passes, only the person in position 0 is buying tickets.
The person at position 0 has successfully bought 5 tickets and it took 4 + 1 + 1 + 1 + 1 = 8 seconds.

Constraints:
n == tickets.length
1 <= n <= 100
1 <= tickets[i] <= 100
0 <= k < n

</> Typescript Code:
*/

// Define a function timeRequiredToBuy that takes an array of integers 'tickets' and an integer 'k'
function timeRequiredToBuy(tickets: number[], k: number): number {
  // Initialize 'time' to store the total time required for the person at position k to buy all tickets
  let time = 0;
  // Loop through each person in the line
  for (let i = 0; i < tickets.length; i++) {
    // If the person is before or at position k, add the minimum of their tickets or the tickets of person k
    if (i <= k) {
      time += Math.min(tickets[i], tickets[k]);
    } else {
      // If the person is after position k, add the minimum of their tickets or one less than the tickets of person k
      // This accounts for the fact that person k will have bought their last ticket by the time it's these people's turn
      time += Math.min(tickets[i], tickets[k] - 1);
    }
  }
  // Return the total time calculated
  return time;
}

/* 
404. Sum of Left Leaves

Given the root of a binary tree, return the sum of all left leaves.

A leaf is a node with no children. A left leaf is a leaf that is the left child of another node.

Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: 24
Explanation: There are two left leaves in the binary tree, with values 9 and 15 respectively.

Example 2:
Input: root = [1]
Output: 0

Constraints:
The number of nodes in the tree is in the range [1, 1000].
-1000 <= Node.val <= 1000

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

// Function to sum the values of all left leaves in a binary tree
function sumOfLeftLeaves(
  root: TreeNode | null,
  isLeft: boolean = false
): number {
  // Base case: if the current node is null, return 0
  if (!root) return 0;
  // Check if the current node is a left leaf (a leaf and is the left child)
  if (!root.left && !root.right && isLeft) return root.val;
  // Recursive call on the left child (pass true as it is a left child) and
  // on the right child (pass false as it is not a left child),
  // then sum their results to get the total sum of left leaves
  return sumOfLeftLeaves(root.left, true) + sumOfLeftLeaves(root.right, false);
}

/* 
463. Island Perimeter

You are given row x col grid representing a map where grid[i][j] = 1 represents land and grid[i][j] = 0 represents water.

Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells).

The island doesn't have "lakes", meaning the water inside isn't connected to the water around the island. One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.

Example 1:
Input: grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
Output: 16
Explanation: The perimeter is the 16 yellow stripes in the image above.

Example 2:
Input: grid = [[1]]
Output: 4

Example 3:
Input: grid = [[1,0]]
Output: 4

Constraints:
row == grid.length
col == grid[i].length
1 <= row, col <= 100
grid[i][j] is 0 or 1.
There is exactly one island in grid.

</> Typescript Code:
*/

// Define the function islandPerimeter that takes a 2D array grid as input and returns a number
function islandPerimeter(grid: number[][]): number {
  // Initialize the perimeter to 0
  let perimeter = 0;
  // Loop through each row of the grid
  for (let i = 0; i < grid.length; i++) {
    // Loop through each column of the grid
    for (let j = 0; j < grid[0].length; j++) {
      // If the current cell is land (1), then calculate its contribution to the perimeter
      if (grid[i][j] == 1) {
        // Each land cell contributes 4 to the perimeter
        perimeter += 4;
        // If the cell above is also land, subtract 2 from the perimeter (for the shared edge)
        if (i > 0 && grid[i - 1][j] == 1) perimeter -= 2;
        // If the cell to the left is also land, subtract 2 from the perimeter (for the shared edge)
        if (j > 0 && grid[i][j - 1] == 1) perimeter -= 2;
      }
    }
  }
  // Return the calculated perimeter
  return perimeter;
}

/* 
1971. Find if Path Exists in Graph

There is a bi-directional graph with n vertices, where each vertex is labeled from 0 to n - 1 (inclusive). The edges in the graph are represented as a 2D integer array edges, where each edges[i] = [ui, vi] denotes a bi-directional edge between vertex ui and vertex vi. Every vertex pair is connected by at most one edge, and no vertex has an edge to itself.

You want to determine if there is a valid path that exists from vertex source to vertex destination.

Given edges and the integers n, source, and destination, return true if there is a valid path from source to destination, or false otherwise.

Example 1:
Input: n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2
Output: true
Explanation: There are two paths from vertex 0 to vertex 2:
- 0 → 1 → 2
- 0 → 2

Example 2:
Input: n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5
Output: false
Explanation: There is no path from vertex 0 to vertex 5.

Constraints:
1 <= n <= 2 * 105
0 <= edges.length <= 2 * 105
edges[i].length == 2
0 <= ui, vi <= n - 1
ui != vi
0 <= source, destination <= n - 1
There are no duplicate edges.
There are no self edges.

</> Typescript Code:
*/

// Function to determine if there is a valid path in a graph
function validPath(
  n: number,
  edges: number[][],
  source: number,
  destination: number
): boolean {
  // Initialize an adjacency list to represent the graph
  const adjList = new Map();
  // Populate the adjacency list with edges
  for (let [u, v] of edges) {
    if (!adjList.has(u)) adjList.set(u, []); // If vertex u is not in the list, add it
    if (!adjList.has(v)) adjList.set(v, []); // If vertex v is not in the list, add it
    adjList.get(u).push(v); // Add v to the list of u's neighbors
    adjList.get(v).push(u); // Since the graph is bidirectional, add u to the list of v's neighbors
  }
  // Set to keep track of visited vertices to prevent cycles
  const visited = new Set();
  // Stack for DFS traversal, starting from the source vertex
  const stack = [source];
  // Perform DFS until the stack is empty
  while (stack.length) {
    const node = stack.pop(); // Take the last vertex from the stack
    if (node === destination) return true; // If the current vertex is the destination, a path exists
    if (visited.has(node)) continue; // If the vertex has been visited, skip it
    visited.add(node); // Mark the current vertex as visited
    // Add all unvisited neighbors of the current vertex to the stack
    for (let neighbor of adjList.get(node) || []) {
      stack.push(neighbor);
    }
  }
  // If the function hasn't returned true at this point, no path exists
  return false;
}

/* 
1137. N-th Tribonacci Number

The Tribonacci sequence Tn is defined as follows: 

T0 = 0, T1 = 1, T2 = 1, and Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0.

Given n, return the value of Tn.

Example 1:
Input: n = 4
Output: 4
Explanation:
T_3 = 0 + 1 + 1 = 2
T_4 = 1 + 1 + 2 = 4

Example 2:
Input: n = 25
Output: 1389537

Constraints:
0 <= n <= 37
The answer is guaranteed to fit within a 32-bit integer, ie. answer <= 2^31 - 1.

</> Typescript Code:
*/

// Function to compute the n-th number in the Tribonacci sequence
function tribonacci(n: number): number {
  // Base cases for the first three Tribonacci numbers
  if (n === 0) return 0;
  if (n === 1 || n === 2) return 1;
  // Variables to hold the last three computed values of the Tribonacci sequence
  let t0 = 0,
    t1 = 1,
    t2 = 1;
  // Iterate from the fourth element to the n-th element
  for (let i = 3; i <= n; i++) {
    // Calculate the next Tribonacci number
    let t3 = t0 + t1 + t2;
    // Shift the last three numbers to the next three in the sequence
    t0 = t1;
    t1 = t2;
    t2 = t3;
  }
  // Return the n-th Tribonacci number
  return t2;
}

/* 
2000. Reverse Prefix of Word

Given a 0-indexed string word and a character ch, reverse the segment of word that starts at index 0 and ends at the index of the first occurrence of ch (inclusive). If the character ch does not exist in word, do nothing.

For example, if word = "abcdefd" and ch = "d", then you should reverse the segment that starts at 0 and ends at 3 (inclusive). The resulting string will be "dcbaefd".
Return the resulting string.

Example 1:
Input: word = "abcdefd", ch = "d"
Output: "dcbaefd"
Explanation: The first occurrence of "d" is at index 3. 
Reverse the part of word from 0 to 3 (inclusive), the resulting string is "dcbaefd".

Example 2:
Input: word = "xyxzxe", ch = "z"
Output: "zxyxxe"
Explanation: The first and only occurrence of "z" is at index 3.
Reverse the part of word from 0 to 3 (inclusive), the resulting string is "zxyxxe".

Example 3:
Input: word = "abcd", ch = "z"
Output: "abcd"
Explanation: "z" does not exist in word.
You should not do any reverse operation, the resulting string is "abcd".

Constraints:
1 <= word.length <= 250
word consists of lowercase English letters.
ch is a lowercase English letter.

</> Typescript Code:
*/

// Function to reverse the prefix of a string up to the first occurrence of a given character
function reversePrefix(word: string, ch: string): string {
  // Find the index of the first occurrence of ch in word
  const index = word.indexOf(ch);
  // If ch is not found, return the original word unmodified
  if (index === -1) return word;
  // Reverse the substring from the start to the found index, then concatenate the rest of the word
  return (
    word
      .substring(0, index + 1)
      .split("")
      .reverse()
      .join("") + word.substring(index + 1)
  );
}

/* 
2441. Largest Positive Integer That Exists With Its Negative

Given an integer array nums that does not contain any zeros, find the largest positive integer k such that -k also exists in the array.

Return the positive integer k. If there is no such integer, return -1.

Example 1:
Input: nums = [-1,2,-3,3]
Output: 3
Explanation: 3 is the only valid k we can find in the array.

Example 2:
Input: nums = [-1,10,6,7,-7,1]
Output: 7
Explanation: Both 1 and 7 have their corresponding negative values in the array. 7 has a larger value.

Example 3:
Input: nums = [-10,8,6,7,-2,-3]
Output: -1
Explanation: There is no a single valid k, we return -1.

Constraints:
1 <= nums.length <= 1000
-1000 <= nums[i] <= 1000
nums[i] != 0

</> Typescript Code:
*/

// Function to find the largest positive integer that exists with its negative
function findMaxK(nums: number[]): number {
  // Create a set from nums for O(1) look-up times
  const numSet = new Set(nums);
  // Initialize maxK to -1, which is the default return value if no k is found
  let maxK = -1;
  // Loop through each number in the array
  for (const num of nums) {
    // Check if the number is positive and the set contains its negative
    if (num > 0 && numSet.has(-num)) {
      // Update maxK to be the maximum of maxK and the current number
      maxK = Math.max(maxK, num);
    }
  }
  // Return the largest positive integer k that has its negative in the array
  return maxK;
}

/* 
506. Relative Ranks

You are given an integer array score of size n, where score[i] is the score of the ith athlete in a competition. All the scores are guaranteed to be unique.

The athletes are placed based on their scores, where the 1st place athlete has the highest score, the 2nd place athlete has the 2nd highest score, and so on. The placement of each athlete determines their rank:

The 1st place athlete's rank is "Gold Medal".
The 2nd place athlete's rank is "Silver Medal".
The 3rd place athlete's rank is "Bronze Medal".
For the 4th place to the nth place athlete, their rank is their placement number (i.e., the xth place athlete's rank is "x").
Return an array answer of size n where answer[i] is the rank of the ith athlete.

Example 1:
Input: score = [5,4,3,2,1]
Output: ["Gold Medal","Silver Medal","Bronze Medal","4","5"]
Explanation: The placements are [1st, 2nd, 3rd, 4th, 5th].

Example 2:
Input: score = [10,3,8,9,4]
Output: ["Gold Medal","5","Bronze Medal","Silver Medal","4"]
Explanation: The placements are [1st, 5th, 3rd, 2nd, 4th].

Constraints:
n == score.length
1 <= n <= 10^4
0 <= score[i] <= 10^6
All the values in score are unique.

</> Typescript Code:
*/

function findRelativeRanks(score: number[]): string[] {
  // Map each score to its index, then sort these pairs by score in descending order
  const sortedIndices = score
    .map((s, index) => [s, index])
    .sort((a, b) => b[0] - a[0]);

  // Create an array to hold the ranks corresponding to the original indices
  const result = new Array(score.length);

  // Assign medals or numeric ranks based on sorted positions
  sortedIndices.forEach((value, index) => {
    if (index === 0) result[value[1]] = "Gold Medal"; // First place
    else if (index === 1) result[value[1]] = "Silver Medal"; // Second place
    else if (index === 2) result[value[1]] = "Bronze Medal"; // Third place
    else result[value[1]] = (index + 1).toString(); // Other places
  });

  // Return the array of ranks
  return result;
}

/* 
2373. Largest Local Values in a Matrix

You are given an n x n integer matrix grid.

Generate an integer matrix maxLocal of size (n - 2) x (n - 2) such that:

maxLocal[i][j] is equal to the largest value of the 3 x 3 matrix in grid centered around row i + 1 and column j + 1.
In other words, we want to find the largest value in every contiguous 3 x 3 matrix in grid.

Return the generated matrix.

Example 1:
Input: grid = [[9,9,8,1],[5,6,2,6],[8,2,6,4],[6,2,2,2]]
Output: [[9,9],[8,6]]
Explanation: The diagram above shows the original matrix and the generated matrix.
Notice that each value in the generated matrix corresponds to the largest value of a contiguous 3 x 3 matrix in grid.

Example 2:
Input: grid = [[1,1,1,1,1],[1,1,1,1,1],[1,1,2,1,1],[1,1,1,1,1],[1,1,1,1,1]]
Output: [[2,2,2],[2,2,2],[2,2,2]]
Explanation: Notice that the 2 is contained within every contiguous 3 x 3 matrix in grid.

Constraints:
n == grid.length == grid[i].length
3 <= n <= 100
1 <= grid[i][j] <= 100

</> Typescript Code:
*/

function largestLocal(grid: number[][]): number[][] {
  const n = grid.length; // Size of the given grid
  // Create an output matrix of size (n-2)x(n-2)
  const result = Array.from({ length: n - 2 }, () => Array(n - 2));

  // Iterate through each possible top-left corner of a 3x3 sub-matrix
  for (let i = 0; i <= n - 3; i++) {
    for (let j = 0; j <= n - 3; j++) {
      let max = 0; // Initialize the maximum value found in the 3x3 matrix

      // Iterate over the 3x3 sub-matrix to find the maximum value
      for (let x = i; x < i + 3; x++) {
        for (let y = j; y < j + 3; y++) {
          max = Math.max(max, grid[x][y]); // Update max if a larger value is found
        }
      }

      // Set the maximum value found to the corresponding position in the result matrix
      result[i][j] = max;
    }
  }

  return result; // Return the resulting matrix
}

/* 
2331. Evaluate Boolean Binary Tree

You are given the root of a full binary tree with the following properties:

Leaf nodes have either the value 0 or 1, where 0 represents False and 1 represents True.
Non-leaf nodes have either the value 2 or 3, where 2 represents the boolean OR and 3 represents the boolean AND.
The evaluation of a node is as follows:

If the node is a leaf node, the evaluation is the value of the node, i.e. True or False.
Otherwise, evaluate the node's two children and apply the boolean operation of its value with the children's evaluations.
Return the boolean result of evaluating the root node.

A full binary tree is a binary tree where each node has either 0 or 2 children.

A leaf node is a node that has zero children.

Example 1:
Input: root = [2,1,3,null,null,0,1]
Output: true
Explanation: The above diagram illustrates the evaluation process.
The AND node evaluates to False AND True = False.
The OR node evaluates to True OR False = True.
The root node evaluates to True, so we return true.

Example 2:
Input: root = [0]
Output: false
Explanation: The root node is a leaf node and it evaluates to false, so we return false.

Constraints:
The number of nodes in the tree is in the range [1, 1000].
0 <= Node.val <= 3
Every node has either 0 or 2 children.
Leaf nodes have a value of 0 or 1.
Non-leaf nodes have a value of 2 or 3.

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

function evaluateTree(root: TreeNode | null): boolean {
  // Base case: if the root is null, return false
  if (root === null) return false;
  // If the node's value is 0, it represents False
  if (root.val === 0) return false;
  // If the node's value is 1, it represents True
  if (root.val === 1) return true;
  // Recursively evaluate the left child
  const left = evaluateTree(root.left);
  // Recursively evaluate the right child
  const right = evaluateTree(root.right);
  // If the node's value is 2, it represents the boolean OR operation
  if (root.val === 2) return left || right;
  // If the node's value is 3, it represents the boolean AND operation
  if (root.val === 3) return left && right;
  // Default return value (should not reach here if the input is valid)
  return false;
}

/*  
1863. Sum of All Subset XOR Totals

The XOR total of an array is defined as the bitwise XOR of all its elements, or 0 if the array is empty.

For example, the XOR total of the array [2,5,6] is 2 XOR 5 XOR 6 = 1.
Given an array nums, return the sum of all XOR totals for every subset of nums. 

Note: Subsets with the same elements should be counted multiple times.

An array a is a subset of an array b if a can be obtained from b by deleting some (possibly zero) elements of b.

Example 1:
Input: nums = [1,3]
Output: 6
Explanation: The 4 subsets of [1,3] are:
- The empty subset has an XOR total of 0.
- [1] has an XOR total of 1.
- [3] has an XOR total of 3.
- [1,3] has an XOR total of 1 XOR 3 = 2.
0 + 1 + 3 + 2 = 6

Example 2:
Input: nums = [5,1,6]
Output: 28
Explanation: The 8 subsets of [5,1,6] are:
- The empty subset has an XOR total of 0.
- [5] has an XOR total of 5.
- [1] has an XOR total of 1.
- [6] has an XOR total of 6.
- [5,1] has an XOR total of 5 XOR 1 = 4.
- [5,6] has an XOR total of 5 XOR 6 = 3.
- [1,6] has an XOR total of 1 XOR 6 = 7.
- [5,1,6] has an XOR total of 5 XOR 1 XOR 6 = 2.
0 + 5 + 1 + 6 + 4 + 3 + 7 + 2 = 28

Example 3:
Input: nums = [3,4,5,6,7,8]
Output: 480
Explanation: The sum of all XOR totals for every subset is 480.

Constraints:
1 <= nums.length <= 12
1 <= nums[i] <= 20

</> Typescript Code:
*/

function subsetXORSum(nums: number[]): number {
  // Helper function for Depth-First Search (DFS)
  function dfs(index: number, currentXOR: number): number {
    // Base case: if index is equal to the length of nums, return the current XOR total
    if (index === nums.length) return currentXOR;

    // Recur for the next index without including the current element
    const withoutCurrent = dfs(index + 1, currentXOR);
    // Recur for the next index including the current element
    const withCurrent = dfs(index + 1, currentXOR ^ nums[index]);

    // Return the sum of both recursive calls
    return withoutCurrent + withCurrent;
  }

  // Initialize DFS with starting index 0 and initial XOR value 0
  return dfs(0, 0);
}

/* 
1608. Special Array With X Elements Greater Than or Equal X

You are given an array nums of non-negative integers. nums is considered special if there exists a number x such that there are exactly x numbers in nums that are greater than or equal to x.

Notice that x does not have to be an element in nums.

Return x if the array is special, otherwise, return -1. It can be proven that if nums is special, the value for x is unique.

Example 1:
Input: nums = [3,5]
Output: 2
Explanation: There are 2 values (3 and 5) that are greater than or equal to 2.

Example 2:
Input: nums = [0,0]
Output: -1
Explanation: No numbers fit the criteria for x.
If x = 0, there should be 0 numbers >= x, but there are 2.
If x = 1, there should be 1 number >= x, but there are 0.
If x = 2, there should be 2 numbers >= x, but there are 0.
x cannot be greater since there are only 2 numbers in nums.

Example 3:
Input: nums = [0,4,3,0,4]
Output: 3
Explanation: There are 3 values that are greater than or equal to 3.

Constraints:
1 <= nums.length <= 100
0 <= nums[i] <= 1000

</> Typescript Code:
*/

function specialArray(nums: number[]): number {
  // Sort the array in ascending order
  nums.sort((a, b) => a - b);

  // Iterate over all possible values of x from 0 to the length of the array
  for (let x = 0; x <= nums.length; x++) {
    // Count how many numbers are greater than or equal to x
    const count = nums.filter((num) => num >= x).length;

    // Check if the count matches x
    if (count === x) {
      return x; // Return x if the condition is met
    }
  }

  // Return -1 if no such x is found
  return -1;
}

/* 
3110. Score of a String

You are given a string s. The score of a string is defined as the sum of the absolute difference between the ASCII values of adjacent characters. Return the score of s.

Example 1:
Input: s = "hello"
Output: 13
Explanation:
The ASCII values of the characters in s are: 'h' = 104, 'e' = 101, 'l' = 108, 'o' = 111. So, the score of s would be |104 - 101| + |101 - 108| + |108 - 108| + |108 - 111| = 3 + 7 + 0 + 3 = 13.

Example 2:
Input: s = "zaz"
Output: 50
Explanation:
The ASCII values of the characters in s are: 'z' = 122, 'a' = 97. So, the score of s would be |122 - 97| + |97 - 122| = 25 + 25 = 50.

Constraints:
2 <= s.length <= 100
s consists only of lowercase English letters.

</> Typescript Code:
*/

function scoreOfString(s: string): number {
  // Initialize the score to 0
  let score = 0;

  // Iterate through the string starting from the second character
  for (let i = 1; i < s.length; i++) {
    // Calculate the absolute difference between the ASCII values of adjacent characters
    score += Math.abs(s.charCodeAt(i) - s.charCodeAt(i - 1));
  }

  // Return the total score
  return score;
}

/* 
344. Reverse String

Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.

Example 1:
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]

Example 2:
Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]

Constraints:
1 <= s.length <= 105
s[i] is a printable ascii character.

</> Typescript Code:
*/

/**
  Do not return anything, modify s in-place instead.
 */
function reverseString(s: string[]): void {
  // Initialize two pointers, one at the start of the array and one at the end
  let left = 0;
  let right = s.length - 1;

  // Loop until the two pointers meet in the middle
  while (left < right) {
    // Swap the elements at the left and right pointers
    [s[left], s[right]] = [s[right], s[left]];
    // Move the left pointer towards the center
    left++;
    // Move the right pointer towards the center
    right--;
  }
}

/* 
409. Longest Palindrome

Given a string s which consists of lowercase or uppercase letters, return the length of the longest 
palindrome that can be built with those letters.

Letters are case sensitive, for example, "Aa" is not considered a palindrome.

Example 1:
Input: s = "abccccdd"
Output: 7
Explanation: One longest palindrome that can be built is "dccaccd", whose length is 7.

Example 2:
Input: s = "a"
Output: 1
Explanation: The longest palindrome that can be built is "a", whose length is 1.

Constraints:
1 <= s.length <= 2000
s consists of lowercase and/or uppercase English letters only.

</> Typescript Code:
*/

function longestPalindrome(s: string): number {
  // Initialize a map to count occurrences of each character
  const charCount = new Map<string, number>();
  // Count each character in the string
  for (const char of s) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }

  let length = 0; // Variable to store the length of the longest palindrome
  let hasOdd = false; // Flag to check if there is any character with an odd count

  // Iterate through the character counts
  for (const count of charCount.values()) {
    if (count % 2 === 0) {
      // If the count is even, it can fully contribute to the palindrome length
      length += count;
    } else {
      // If the count is odd, use the even part and leave one character out
      length += count - 1;
      hasOdd = true;
    }
  }

  // If there was any character with an odd count, we can place one odd character in the center
  return hasOdd ? length + 1 : length;
}

/* 
1002. Find Common Characters

Given a string array words, return an array of all characters that show up in all strings within the words (including duplicates). You may return the answer in any order.

Example 1:
Input: words = ["bella","label","roller"]
Output: ["e","l","l"]

Example 2:
Input: words = ["cool","lock","cook"]
Output: ["c","o"]

Constraints:
1 <= words.length <= 100
1 <= words[i].length <= 100
words[i] consists of lowercase English letters.

</> Typescript Code:
*/

function commonChars(words: string[]): string[] {
  // Initialize an array to keep track of the minimum frequency of each character in all words
  const minFreq = new Array(26).fill(Infinity);

  // Iterate over each word in the words array
  for (const word of words) {
    // Initialize a frequency array for the current word
    const freq = new Array(26).fill(0);
    // Count the frequency of each character in the current word
    for (const char of word) {
      freq[char.charCodeAt(0) - 97]++;
    }
    // Update the minimum frequency array with the current word's frequencies
    for (let i = 0; i < 26; i++) {
      minFreq[i] = Math.min(minFreq[i], freq[i]);
    }
  }

  // Initialize the result array to store common characters
  const result: string[] = [];
  // Iterate over the minimum frequency array
  for (let i = 0; i < 26; i++) {
    // Add the character to the result array the number of times it appears in all words
    while (minFreq[i] > 0) {
      result.push(String.fromCharCode(i + 97));
      minFreq[i]--;
    }
  }

  // Return the result array containing common characters
  return result;
}

/* 
1051. Height Checker

A school is trying to take an annual photo of all the students. The students are asked to stand in a single file line in non-decreasing order by height. Let this ordering be represented by the integer array expected where expected[i] is the expected height of the ith student in line.

You are given an integer array heights representing the current order that the students are standing in. Each heights[i] is the height of the ith student in line (0-indexed).

Return the number of indices where heights[i] != expected[i].

Example 1:
Input: heights = [1,1,4,2,1,3]
Output: 3
Explanation: 
heights:  [1,1,4,2,1,3]
expected: [1,1,1,2,3,4]
Indices 2, 4, and 5 do not match.

Example 2:
Input: heights = [5,1,2,3,4]
Output: 5
Explanation:
heights:  [5,1,2,3,4]
expected: [1,2,3,4,5]
All indices do not match.

Example 3:
Input: heights = [1,2,3,4,5]
Output: 0
Explanation:
heights:  [1,2,3,4,5]
expected: [1,2,3,4,5]
All indices match.

Constraints:
1 <= heights.length <= 100
1 <= heights[i] <= 100

</> Typescript Code:
*/

function heightChecker(heights: number[]): number {
  // Create a copy of the heights array and sort it in non-decreasing order
  const expected = heights.slice().sort((a, b) => a - b);

  let mismatchCount = 0; // Initialize a variable to count the number of mismatches

  for (let i = 0; i < heights.length; i++) {
    // Iterate through the original heights array
    if (heights[i] !== expected[i]) {
      // Check if the height at the current index in the original array is different from the expected height
      mismatchCount++;
      // If it's different, increment the mismatch count
    }
  }

  return mismatchCount; // Return the total number of mismatches
}

/* 
1122. Relative Sort Array

Given two arrays arr1 and arr2, the elements of arr2 are distinct, and all elements in arr2 are also in arr1.

Sort the elements of arr1 such that the relative ordering of items in arr1 are the same as in arr2. Elements that do not appear in arr2 should be placed at the end of arr1 in ascending order.

Example 1:
Input: arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
Output: [2,2,2,1,4,3,3,9,6,7,19]

Example 2:
Input: arr1 = [28,6,22,8,44,17], arr2 = [22,28,8,6]
Output: [22,28,8,6,17,44]

Constraints:
1 <= arr1.length, arr2.length <= 1000
0 <= arr1[i], arr2[i] <= 1000
All the elements of arr2 are distinct.
Each arr2[i] is in arr1.

</> Typescript Code:
*/

function relativeSortArray(arr1: number[], arr2: number[]): number[] {
  // Create a map to store the order of elements in arr2
  const orderMap = new Map<number, number>();
  // Fill the map with elements from arr2 and their respective indices
  arr2.forEach((num, index) => orderMap.set(num, index));

  // Sort arr1 based on the custom order defined by arr2
  return arr1.sort((a, b) => {
    // If both elements are in arr2, sort them according to their order in arr2
    if (orderMap.has(a) && orderMap.has(b)) {
      return orderMap.get(a)! - orderMap.get(b)!;
      // If only a is in arr2, a should come before b
    } else if (orderMap.has(a)) {
      return -1;
      // If only b is in arr2, b should come before a
    } else if (orderMap.has(b)) {
      return 1;
      // If neither are in arr2, sort them in ascending order
    } else {
      return a - b;
    }
  });
}

/* 
2037. Minimum Number of Moves to Seat Everyone

There are n seats and n students in a room. You are given an array seats of length n, where seats[i] is the position of the ith seat. You are also given the array students of length n, where students[j] is the position of the jth student.

You may perform the following move any number of times:

Increase or decrease the position of the ith student by 1 (i.e., moving the ith student from position x to x + 1 or x - 1)
Return the minimum number of moves required to move each student to a seat such that no two students are in the same seat.

Note that there may be multiple seats or students in the same position at the beginning.

Example 1:
Input: seats = [3,1,5], students = [2,7,4]
Output: 4
Explanation: The students are moved as follows:
- The first student is moved from from position 2 to position 1 using 1 move.
- The second student is moved from from position 7 to position 5 using 2 moves.
- The third student is moved from from position 4 to position 3 using 1 move.
In total, 1 + 2 + 1 = 4 moves were used.

Example 2:
Input: seats = [4,1,5,9], students = [1,3,2,6]
Output: 7
Explanation: The students are moved as follows:
- The first student is not moved.
- The second student is moved from from position 3 to position 4 using 1 move.
- The third student is moved from from position 2 to position 5 using 3 moves.
- The fourth student is moved from from position 6 to position 9 using 3 moves.
In total, 0 + 1 + 3 + 3 = 7 moves were used.

Example 3:
Input: seats = [2,2,6,6], students = [1,3,2,6]
Output: 4
Explanation: Note that there are two seats at position 2 and two seats at position 6.
The students are moved as follows:
- The first student is moved from from position 1 to position 2 using 1 move.
- The second student is moved from from position 3 to position 6 using 3 moves.
- The third student is not moved.
- The fourth student is not moved.
In total, 1 + 3 + 0 + 0 = 4 moves were used.

Constraints:
n == seats.length == students.length
1 <= n <= 100
1 <= seats[i], students[j] <= 100

</> Typescript Code:
*/

function minMovesToSeat(seats: number[], students: number[]): number {
  // Sort the seats array in ascending order
  seats.sort((a, b) => a - b);
  // Sort the students array in ascending order
  students.sort((a, b) => a - b);

  // Initialize the moves counter
  let moves = 0;
  // Calculate the total number of moves required to match each student to a seat
  for (let i = 0; i < seats.length; i++) {
    // Add the absolute difference between the seat position and the student position to the moves counter
    moves += Math.abs(seats[i] - students[i]);
  }

  // Return the total number of moves
  return moves;
}

/* 
1791. Find Center of Star Graph

There is an undirected star graph consisting of n nodes labeled from 1 to n. A star graph is a graph where there is one center node and exactly n - 1 edges that connect the center node with every other node.

You are given a 2D integer array edges where each edges[i] = [ui, vi] indicates that there is an edge between the nodes ui and vi. Return the center of the given star graph.

Example 1:
Input: edges = [[1,2],[2,3],[4,2]]
Output: 2
Explanation: As shown in the figure above, node 2 is connected to every other node, so 2 is the center.

Example 2:
Input: edges = [[1,2],[5,1],[1,3],[1,4]]
Output: 1

Constraints:
3 <= n <= 10^5
edges.length == n - 1
edges[i].length == 2
1 <= ui, vi <= n
ui != vi
The given edges represent a valid star graph.

</> Typescript Code:
*/

function findCenter(edges: number[][]): number {
  // Check if the first node of the first edge is the center node
  if (edges[0][0] === edges[1][0] || edges[0][0] === edges[1][1]) {
    return edges[0][0]; // Return the first node of the first edge
  } else {
    // Otherwise, the second node of the first edge is the center node
    return edges[0][1]; // Return the second node of the first edge
  }
}

/* 
350. Intersection of Two Arrays II

Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays and you may return the result in any order.

Example 1:
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2,2]

Example 2:
Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [4,9]
Explanation: [9,4] is also accepted.

Constraints:
1 <= nums1.length, nums2.length <= 1000
0 <= nums1[i], nums2[i] <= 1000

Follow up:
What if the given array is already sorted? How would you optimize your algorithm?
What if nums1's size is small compared to nums2's size? Which algorithm is better?
What if elements of nums2 are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?

</> Typescript Code:
*/

function intersect(nums1: number[], nums2: number[]): number[] {
  // Create a map to count occurrences of each number in nums1
  const countMap = new Map<number, number>();
  // Initialize an array to store the intersection result
  const result: number[] = [];

  // Populate the map with counts of each number in nums1
  for (const num of nums1) {
    // Get the current count of num or set it to 0 if it doesn't exist, then increment by 1
    countMap.set(num, (countMap.get(num) || 0) + 1);
  }

  // Iterate through nums2 to find common elements
  for (const num of nums2) {
    // Get the count of the current number from the map
    const count = countMap.get(num);
    // If the number is in the map and its count is greater than 0
    if (count && count > 0) {
      // Add the number to the result array
      result.push(num);
      // Decrement the count of the number in the map
      countMap.set(num, count - 1);
    }
  }

  // Return the result array containing the intersection of nums1 and nums2
  return result;
}

/* 
2582. Pass the Pillow

There are n people standing in a line labeled from 1 to n. The first person in the line is holding a pillow initially. Every second, the person holding the pillow passes it to the next person standing in the line. Once the pillow reaches the end of the line, the direction changes, and people continue passing the pillow in the opposite direction.

For example, once the pillow reaches the nth person they pass it to the n - 1th person, then to the n - 2th person and so on.
Given the two positive integers n and time, return the index of the person holding the pillow after time seconds.

Example 1:
Input: n = 4, time = 5
Output: 2
Explanation: People pass the pillow in the following way: 1 -> 2 -> 3 -> 4 -> 3 -> 2.
After five seconds, the 2nd person is holding the pillow.

Example 2:
Input: n = 3, time = 2
Output: 3
Explanation: People pass the pillow in the following way: 1 -> 2 -> 3.
After two seconds, the 3rd person is holding the pillow.

Constraints:
2 <= n <= 1000
1 <= time <= 1000


</> Typescript Code:
*/

function passThePillow(n: number, time: number): number {
  // Calculate the length of one complete pass cycle (forward and backward)
  const cycle = (n - 1) * 2;

  // Find the effective time within the current cycle
  const t = time % cycle;

  // Determine the position based on the effective time
  if (t < n) {
    // If t is within the forward pass, return the direct position
    return t + 1;
  } else {
    // If t is within the backward pass, return the calculated position
    return cycle - t + 1;
  }
}

/* 
1518. Water Bottles

There are numBottles water bottles that are initially full of water. You can exchange numExchange empty water bottles from the market with one full water bottle.

The operation of drinking a full water bottle turns it into an empty bottle.

Given the two integers numBottles and numExchange, return the maximum number of water bottles you can drink.

Example 1:
Input: numBottles = 9, numExchange = 3
Output: 13
Explanation: You can exchange 3 empty bottles to get 1 full water bottle.
Number of water bottles you can drink: 9 + 3 + 1 = 13.

Example 2:
Input: numBottles = 15, numExchange = 4
Output: 19
Explanation: You can exchange 4 empty bottles to get 1 full water bottle. 
Number of water bottles you can drink: 15 + 3 + 1 = 19.

Constraints:
1 <= numBottles <= 100
2 <= numExchange <= 100

</> Typescript Code:
*/

function numWaterBottles(numBottles: number, numExchange: number): number {
  // Initialize totalBottles with the initial number of full bottles
  let totalBottles = numBottles;
  // Initialize emptyBottles with the same number as numBottles since drinking them turns them into empty bottles
  let emptyBottles = numBottles;

  // Loop until there are fewer empty bottles than required to exchange for a full bottle
  while (emptyBottles >= numExchange) {
    // Calculate the number of new full bottles we can get by exchanging empty bottles
    const newBottles = Math.floor(emptyBottles / numExchange);
    // Add the new full bottles to the total count of bottles
    totalBottles += newBottles;
    // Update the count of empty bottles: remaining empty bottles plus new full bottles we just got and drank
    emptyBottles = (emptyBottles % numExchange) + newBottles;
  }

  // Return the total number of bottles we can drink
  return totalBottles;
}

/* 
1598. Crawler Log Folder

The Leetcode file system keeps a log each time some user performs a change folder operation.

The operations are described below:

"../" : Move to the parent folder of the current folder. (If you are already in the main folder, remain in the same folder).
"./" : Remain in the same folder.
"x/" : Move to the child folder named x (This folder is guaranteed to always exist).
You are given a list of strings logs where logs[i] is the operation performed by the user at the ith step.

The file system starts in the main folder, then the operations in logs are performed.

Return the minimum number of operations needed to go back to the main folder after the change folder operations.

Example 1:
Input: logs = ["d1/","d2/","../","d21/","./"]
Output: 2
Explanation: Use this change folder operation "../" 2 times and go back to the main folder.

Example 2:
Input: logs = ["d1/","d2/","./","d3/","../","d31/"]
Output: 3

Example 3:
Input: logs = ["d1/","../","../","../"]
Output: 0


Constraints:
1 <= logs.length <= 10^3
2 <= logs[i].length <= 10
logs[i] contains lowercase English letters, digits, '.', and '/'.
logs[i] follows the format described in the statement.
Folder names consist of lowercase English letters and digits.

</> Typescript Code:
*/

function minOperations(logs: string[]): number {
  // Initialize depth to keep track of current folder level
  let depth = 0;

  // Iterate through each log entry
  for (const log of logs) {
    // If the log entry is to move to the parent folder
    if (log === "../") {
      // Decrease depth if we are not already at the root level
      if (depth > 0) depth--;
    }
    // If the log entry is to remain in the same folder
    else if (log === "./") {
      // Do nothing
      continue;
    }
    // If the log entry is to move to a child folder
    else {
      // Increase depth to indicate moving into a subfolder
      depth++;
    }
  }

  // Return the number of operations needed to return to the main folder
  return depth;
}

/* 
1380. Lucky Numbers in a Matrix

Given an m x n matrix of distinct numbers, return all lucky numbers in the matrix in any order.

A lucky number is an element of the matrix such that it is the minimum element in its row and maximum in its column.

Example 1:
Input: matrix = [[3,7,8],[9,11,13],[15,16,17]]
Output: [15]
Explanation: 15 is the only lucky number since it is the minimum in its row and the maximum in its column.

Example 2:
Input: matrix = [[1,10,4,2],[9,3,8,7],[15,16,17,12]]
Output: [12]
Explanation: 12 is the only lucky number since it is the minimum in its row and the maximum in its column.

Example 3:
Input: matrix = [[7,8],[1,2]]
Output: [7]
Explanation: 7 is the only lucky number since it is the minimum in its row and the maximum in its column.

Constraints:
m == mat.length
n == mat[i].length
1 <= n, m <= 50
1 <= matrix[i][j] <= 10^5.
All elements in the matrix are distinct.

</> Typescript Code:
*/

function luckyNumbers(matrix: number[][]): number[] {
  // Find the minimum value in each row
  const minRowValues = matrix.map((row) => Math.min(...row));

  // Initialize an array to store the maximum values in each column
  const maxColValues = Array(matrix[0].length).fill(Number.MIN_SAFE_INTEGER);

  // Traverse each column to find the maximum value in each column
  for (let col = 0; col < matrix[0].length; col++) {
    for (let row = 0; row < matrix.length; row++) {
      maxColValues[col] = Math.max(maxColValues[col], matrix[row][col]);
    }
  }

  // Array to store the lucky numbers
  const luckyNumbers: number[] = [];

  // Traverse the matrix to find elements that are both minimum in their row and maximum in their column
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      if (
        matrix[row][col] === minRowValues[row] &&
        matrix[row][col] === maxColValues[col]
      ) {
        luckyNumbers.push(matrix[row][col]);
      }
    }
  }

  // Return the array of lucky numbers
  return luckyNumbers;
}

/* 
1605. Find Valid Matrix Given Row and Column Sums

You are given two arrays rowSum and colSum of non-negative integers where rowSum[i] is the sum of the elements in the ith row and colSum[j] is the sum of the elements of the jth column of a 2D matrix. In other words, you do not know the elements of the matrix, but you do know the sums of each row and column.

Find any matrix of non-negative integers of size rowSum.length x colSum.length that satisfies the rowSum and colSum requirements.

Return a 2D array representing any matrix that fulfills the requirements. It's guaranteed that at least one matrix that fulfills the requirements exists.

Example 1:
Input: rowSum = [3,8], colSum = [4,7]
Output: [[3,0],
         [1,7]]
Explanation: 
0th row: 3 + 0 = 3 == rowSum[0]
1st row: 1 + 7 = 8 == rowSum[1]
0th column: 3 + 1 = 4 == colSum[0]
1st column: 0 + 7 = 7 == colSum[1]
The row and column sums match, and all matrix elements are non-negative.
Another possible matrix is: [[1,2],
                             [3,5]]

Example 2:
Input: rowSum = [5,7,10], colSum = [8,6,8]
Output: [[0,5,0],
         [6,1,0],
         [2,0,8]]
 

Constraints:
1 <= rowSum.length, colSum.length <= 500
0 <= rowSum[i], colSum[i] <= 108
sum(rowSum) == sum(colSum)

</> Typescript Code:
*/

function restoreMatrix(rowSum: number[], colSum: number[]): number[][] {
  // Initialize the matrix with all zeros
  let matrix: number[][] = Array.from({ length: rowSum.length }, () =>
    Array(colSum.length).fill(0)
  );

  // Initialize row and column pointers
  let i = 0,
    j = 0;

  // Iterate until all rows and columns are processed
  while (i < rowSum.length && j < colSum.length) {
    // Find the minimum value between the current rowSum and colSum
    let minValue = Math.min(rowSum[i], colSum[j]);

    // Set the cell to this minimum value
    matrix[i][j] = minValue;

    // Decrease the rowSum and colSum by this minimum value
    rowSum[i] -= minValue;
    colSum[j] -= minValue;

    // Move to the next row if the current rowSum is 0
    if (rowSum[i] === 0) i++;

    // Move to the next column if the current colSum is 0
    if (colSum[j] === 0) j++;
  }

  // Return the constructed matrix
  return matrix;
}

/* 
2418. Sort the People

You are given an array of strings names, and an array heights that consists of distinct positive integers. Both arrays are of length n.

For each index i, names[i] and heights[i] denote the name and height of the ith person.

Return names sorted in descending order by the people's heights.

Example 1:
Input: names = ["Mary","John","Emma"], heights = [180,165,170]
Output: ["Mary","Emma","John"]
Explanation: Mary is the tallest, followed by Emma and John.

Example 2:
Input: names = ["Alice","Bob","Bob"], heights = [155,185,150]
Output: ["Bob","Alice","Bob"]
Explanation: The first Bob is the tallest, followed by Alice and the second Bob.

Constraints:
n == names.length == heights.length
1 <= n <= 10^3
1 <= names[i].length <= 20
1 <= heights[i] <= 105
names[i] consists of lower and upper case English letters.
All the values of heights are distinct.

</> Typescript Code:
*/

function sortPeople(names: string[], heights: number[]): string[] {
  // Calculate the length of the arrays
  const n = names.length;

  // Create an array of objects where each object contains the name and height of a person
  const indexedNames = names.map((name, index) => ({
    name,
    height: heights[index],
  }));

  // Sort the array of objects based on height in descending order
  indexedNames.sort((a, b) => b.height - a.height);

  // Extract and return only the names from the sorted array
  return indexedNames.map((person) => person.name);
}

/* 
1636. Sort Array by Increasing Frequency

Given an array of integers nums, sort the array in increasing order based on the frequency of the values. If multiple values have the same frequency, sort them in decreasing order.

Return the sorted array.

Example 1:
Input: nums = [1,1,2,2,2,3]
Output: [3,1,1,2,2,2]
Explanation: '3' has a frequency of 1, '1' has a frequency of 2, and '2' has a frequency of 3.

Example 2:
Input: nums = [2,3,1,3,2]
Output: [1,3,3,2,2]
Explanation: '2' and '3' both have a frequency of 2, so they are sorted in decreasing order.

Example 3:
Input: nums = [-1,1,-6,4,5,-6,1,4,1]
Output: [5,-1,4,4,-6,-6,1,1,1]

Constraints:
1 <= nums.length <= 100
-100 <= nums[i] <= 100

</> Typescript Code:
*/

function frequencySort(nums: number[]): number[] {
  // Create a frequency map to count occurrences of each number
  const freqMap = new Map<number, number>();

  // Populate the frequency map with counts of each number
  nums.forEach((num) => freqMap.set(num, (freqMap.get(num) || 0) + 1));

  // Sort the array based on the frequency map and required conditions
  return nums.sort((a, b) => {
    const freqA = freqMap.get(a)!; // Get the frequency of element a
    const freqB = freqMap.get(b)!; // Get the frequency of element b

    // If frequencies are the same, sort by value in decreasing order
    if (freqA === freqB) return b - a;

    // Otherwise, sort by frequency in increasing order
    return freqA - freqB;
  });
}

/* 
2678. Number of Senior Citizens

You are given a 0-indexed array of strings details. Each element of details provides information about a given passenger compressed into a string of length 15. The system is such that:

The first ten characters consist of the phone number of passengers.
The next character denotes the gender of the person.
The following two characters are used to indicate the age of the person.
The last two characters determine the seat allotted to that person.
Return the number of passengers who are strictly more than 60 years old.

Example 1:
Input: details = ["7868190130M7522","5303914400F9211","9273338290F4010"]
Output: 2
Explanation: The passengers at indices 0, 1, and 2 have ages 75, 92, and 40. Thus, there are 2 people who are over 60 years old.

Example 2:
Input: details = ["1313579440F2036","2921522980M5644"]
Output: 0
Explanation: None of the passengers are older than 60.

Constraints:
1 <= details.length <= 100
details[i].length == 15
details[i] consists of digits from '0' to '9'.
details[i][10] is either 'M' or 'F' or 'O'.
The phone numbers and seat numbers of the passengers are distinct.

</> Typescript Code:
*/

function countSeniors(details: string[]): number {
  // Reduce the array to count the number of senior citizens
  return details.reduce((count, detail) => {
    // Extract the age part from the detail string (11th and 12th characters)
    const age = parseInt(detail.slice(11, 13), 10);

    // If age is greater than 60, increment the count
    return age > 60 ? count + 1 : count;
  }, 0); // Initial count is 0
}

/* 
1460. Make Two Arrays Equal by Reversing Subarrays

You are given two integer arrays of equal length target and arr. In one step, you can select any non-empty subarray of arr and reverse it. You are allowed to make any number of steps.

Return true if you can make arr equal to target or false otherwise.

Example 1:
Input: target = [1,2,3,4], arr = [2,4,1,3]
Output: true
Explanation: You can follow the next steps to convert arr to target:
1- Reverse subarray [2,4,1], arr becomes [1,4,2,3]
2- Reverse subarray [4,2], arr becomes [1,2,4,3]
3- Reverse subarray [4,3], arr becomes [1,2,3,4]
There are multiple ways to convert arr to target, this is not the only way to do so.

Example 2:
Input: target = [7], arr = [7]
Output: true
Explanation: arr is equal to target without any reverses.

Example 3:
Input: target = [3,7,9], arr = [3,7,11]
Output: false
Explanation: arr does not have value 9 and it can never be converted to target.

Constraints:
target.length == arr.length
1 <= target.length <= 1000
1 <= target[i] <= 1000
1 <= arr[i] <= 1000

</> Typescript Code:
*/

function canBeEqual(target: number[], arr: number[]): boolean {
  // Check if the lengths of the arrays are different
  if (target.length !== arr.length) return false;

  // Create maps to count occurrences of each number in target and arr
  const targetCount = new Map<number, number>();
  const arrCount = new Map<number, number>();

  // Count occurrences of each number in target array
  for (const num of target) {
    targetCount.set(num, (targetCount.get(num) || 0) + 1);
  }

  // Count occurrences of each number in arr array
  for (const num of arr) {
    arrCount.set(num, (arrCount.get(num) || 0) + 1);
  }

  // Compare counts of each number in target and arr
  for (const [key, value] of targetCount) {
    if (arrCount.get(key) !== value) return false;
  }

  // If all counts match, the arrays can be made equal
  return true;
}

/* 
2053. Kth Distinct String in an Array

A distinct string is a string that is present only once in an array.

Given an array of strings arr, and an integer k, return the kth distinct string present in arr. If there are fewer than k distinct strings, return an empty string "".

Note that the strings are considered in the order in which they appear in the array.

Example 1:
Input: arr = ["d","b","c","b","c","a"], k = 2
Output: "a"
Explanation:
The only distinct strings in arr are "d" and "a".
"d" appears 1st, so it is the 1st distinct string.
"a" appears 2nd, so it is the 2nd distinct string.
Since k == 2, "a" is returned. 

Example 2:
Input: arr = ["aaa","aa","a"], k = 1
Output: "aaa"
Explanation:
All strings in arr are distinct, so the 1st string "aaa" is returned.

Example 3:
Input: arr = ["a","b","a"], k = 3
Output: ""
Explanation:
The only distinct string is "b". Since there are fewer than 3 distinct strings, we return an empty string "".

Constraints:
1 <= k <= arr.length <= 1000
1 <= arr[i].length <= 5
arr[i] consists of lowercase English letters.

</> Typescript Code:
*/

function kthDistinct(arr: string[], k: number): string {
  // Create a frequency map to count occurrences of each string
  const freqMap: { [key: string]: number } = {};

  // Populate the frequency map
  for (const str of arr) {
    freqMap[str] = (freqMap[str] || 0) + 1;
  }

  // Create an array to store distinct strings
  const distinctStrings: string[] = [];

  // Collect strings that appear only once
  for (const str of arr) {
    if (freqMap[str] === 1) {
      distinctStrings.push(str);
    }
  }

  // Return the k-th distinct string or an empty string if there aren't enough
  return distinctStrings[k - 1] || "";
}

/* 
703. Kth Largest Element in a Stream

Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.

Implement KthLargest class:

KthLargest(int k, int[] nums) Initializes the object with the integer k and the stream of integers nums.
int add(int val) Appends the integer val to the stream and returns the element representing the kth largest element in the stream.

Example 1:
Input
["KthLargest", "add", "add", "add", "add", "add"]
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
Output
[null, 4, 5, 5, 8, 8]
Explanation
KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
kthLargest.add(3);   // return 4
kthLargest.add(5);   // return 5
kthLargest.add(10);  // return 5
kthLargest.add(9);   // return 8
kthLargest.add(4);   // return 8

Constraints:
1 <= k <= 10^4
0 <= nums.length <= 10^4
-104 <= nums[i] <= 10^4
-104 <= val <= 10^4
At most 104 calls will be made to add.
It is guaranteed that there will be at least k elements in the array when you search for the kth element.

</> Typescript Code:
*/

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

class KthLargest {
  private minHeap: number[]; // This array will function as a min-heap to track the k largest elements
  private k: number; // Store the value of k to know which kth largest element to return

  constructor(k: number, nums: number[]) {
    this.k = k;
    this.minHeap = [];

    // Build a min-heap with at most k elements from the nums array
    for (let num of nums) {
      this.add(num); // Add each number to the heap using the add method
    }
  }

  add(val: number): number {
    // If the heap has fewer than k elements, simply add the new value
    if (this.minHeap.length < this.k) {
      this.minHeap.push(val);
      this.minHeap.sort((a, b) => a - b); // Sort the array to maintain the min-heap property
    }
    // If the new value is greater than the smallest value in the heap, replace it
    else if (val > this.minHeap[0]) {
      this.minHeap[0] = val;
      this.minHeap.sort((a, b) => a - b); // Sort again to maintain the heap property
    }
    // Return the smallest value in the heap, which is the kth largest element
    return this.minHeap[0];
  }
}

/* 
860. Lemonade Change

At a lemonade stand, each lemonade costs $5. Customers are standing in a queue to buy from you and order one at a time (in the order specified by bills). Each customer will only buy one lemonade and pay with either a $5, $10, or $20 bill. You must provide the correct change to each customer so that the net transaction is that the customer pays $5.

Note that you do not have any change in hand at first.

Given an integer array bills where bills[i] is the bill the ith customer pays, return true if you can provide every customer with the correct change, or false otherwise.

Example 1:
Input: bills = [5,5,5,10,20]
Output: true
Explanation: 
From the first 3 customers, we collect three $5 bills in order.
From the fourth customer, we collect a $10 bill and give back a $5.
From the fifth customer, we give a $10 bill and a $5 bill.
Since all customers got correct change, we output true.

Example 2:
Input: bills = [5,5,10,10,20]
Output: false
Explanation: 
From the first two customers in order, we collect two $5 bills.
For the next two customers in order, we collect a $10 bill and give back a $5 bill.
For the last customer, we can not give the change of $15 back because we only have two $10 bills.
Since not every customer received the correct change, the answer is false.

Constraints:
1 <= bills.length <= 10^5
bills[i] is either 5, 10, or 20

</> Typescript Code:
*/

function lemonadeChange(bills: number[]): boolean {
  let five = 0,
    ten = 0; // Initialize counters for $5 and $10 bills

  for (let bill of bills) {
    // Iterate through each customer's bill
    if (bill === 5) {
      // If the customer pays with a $5 bill
      five++; // Increment the count of $5 bills
    } else if (bill === 10) {
      // If the customer pays with a $10 bill
      if (five === 0) return false; // Check if change can be given, return false if not
      five--; // Give back a $5 bill as change
      ten++; // Increment the count of $10 bills
    } else {
      // If the customer pays with a $20 bill
      if (ten > 0 && five > 0) {
        // Prioritize giving $15 as $10 + $5 if possible
        ten--; // Decrease the count of $10 bills
        five--; // Decrease the count of $5 bills
      } else if (five >= 3) {
        // If not possible, check if three $5 bills can be given
        five -= 3; // Decrease the count of $5 bills by 3
      } else {
        return false; // If neither option is possible, return false
      }
    }
  }

  return true; // If all customers received correct change, return true
}

/* 
476. Number Complement
The complement of an integer is the integer you get when you flip all the 0's to 1's and all the 1's to 0's in its binary representation.

For example, The integer 5 is "101" in binary and its complement is "010" which is the integer 2.
Given an integer num, return its complement.

Example 1:
Input: num = 5
Output: 2
Explanation: The binary representation of 5 is 101 (no leading zero bits), and its complement is 010. So you need to output 2.

Example 2:
Input: num = 1
Output: 0
Explanation: The binary representation of 1 is 1 (no leading zero bits), and its complement is 0. So you need to output 0.

Constraints:
1 <= num < 2^31

</> Typescript Code:
*/

function findComplement(num: number): number {
  // Determine the number of bits required to represent the number in binary
  const bitLength = num.toString(2).length;

  // Create a mask with all bits set to 1 of the same length as the number's binary representation
  const mask = (1 << bitLength) - 1;

  // XOR the original number with the mask to flip all bits
  return num ^ mask;
}

/* 
145. Binary Tree Postorder Traversal

Given the root of a binary tree, return the postorder traversal of its nodes' values.

Example 1:
Input: root = [1,null,2,3]
Output: [3,2,1]

Example 2:
Input: root = []
Output: []

Example 3:
Input: root = [1]
Output: [1]

Constraints:
The number of the nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100

Follow up: Recursive solution is trivial, could you do it iteratively?

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

function postorderTraversal(root: TreeNode | null): number[] {
  // Edge case: if the tree is empty, return an empty array.
  if (!root) return [];

  // Initialize a stack with the root node and a result array to store postorder traversal.
  const stack: TreeNode[] = [root];
  const result: number[] = [];

  // Traverse the tree using an iterative approach.
  while (stack.length) {
    // Pop the current node from the stack.
    const node = stack.pop();

    if (node) {
      // Push the current node's value to the result array.
      result.push(node.val);

      // Push the left child first (if exists) so that it's processed after the right child.
      if (node.left) stack.push(node.left);

      // Push the right child (if exists) so that it's processed first.
      if (node.right) stack.push(node.right);
    }
  }

  // Since the order of processing was root-right-left, reverse the result array to get left-right-root.
  return result.reverse();
}

/* 
590. N-ary Tree Postorder Traversal

Given the root of an n-ary tree, return the postorder traversal of its nodes' values.

Nary-Tree input serialization is represented in their level order traversal. Each group of children is separated by the null value (See examples)

Example 1:
Input: root = [1,null,3,2,4,null,5,6]
Output: [5,6,3,2,4,1]

Example 2:
Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: [2,6,14,11,7,3,12,8,4,13,9,10,5,1]

Constraints:
The number of nodes in the tree is in the range [0, 10^4].
0 <= Node.val <= 10^4
The height of the n-ary tree is less than or equal to 1000.

Follow up: Recursive solution is trivial, could you do it iteratively?

</> Typescript Code:
*/

class _Node {
  val: number;
  children: _Node[];
  constructor(val?: number) {
    this.val = val === undefined ? 0 : val;
    this.children = [];
  }
}

function postorder(root: _Node | null): number[] {
  // If the root is null, return an empty array (base case).
  if (!root) return [];

  // Stack to manage nodes for postorder traversal, output to store final result.
  const stack = [root],
    output: number[] = [];

  // While there are nodes to process in the stack.
  while (stack.length) {
    // Pop the last node from the stack.
    const node = stack.pop();

    // Add the node's value to the output.
    output.push(node!.val);

    // Push all children of the node to the stack (left-to-right).
    for (const child of node!.children) {
      stack.push(child);
    }
  }

  // Reverse the output array to achieve postorder (children processed before the root).
  return output.reverse();
}

/* 
2022. Convert 1D Array Into 2D Array

You are given a 0-indexed 1-dimensional (1D) integer array original, and two integers, m and n. You are tasked with creating a 2-dimensional (2D) array with  m rows and n columns using all the elements from original.

The elements from indices 0 to n - 1 (inclusive) of original should form the first row of the constructed 2D array, the elements from indices n to 2 * n - 1 (inclusive) should form the second row of the constructed 2D array, and so on.

Return an m x n 2D array constructed according to the above procedure, or an empty 2D array if it is impossible.

Example 1:
Input: original = [1,2,3,4], m = 2, n = 2
Output: [[1,2],[3,4]]
Explanation: The constructed 2D array should contain 2 rows and 2 columns.
The first group of n=2 elements in original, [1,2], becomes the first row in the constructed 2D array.
The second group of n=2 elements in original, [3,4], becomes the second row in the constructed 2D array.

Example 2:
Input: original = [1,2,3], m = 1, n = 3
Output: [[1,2,3]]
Explanation: The constructed 2D array should contain 1 row and 3 columns.
Put all three elements in original into the first row of the constructed 2D array.

Example 3:
Input: original = [1,2], m = 1, n = 1
Output: []
Explanation: There are 2 elements in original.
It is impossible to fit 2 elements in a 1x1 2D array, so return an empty 2D array.

Constraints:
1 <= original.length <= 5 * 10^4
1 <= original[i] <= 10^5
1 <= m, n <= 4 * 10^4

</> Typescript Code:
*/

function construct2DArray(
  original: number[],
  m: number,
  n: number
): number[][] {
  // Check if the total number of elements can be exactly divided into m rows and n columns
  if (original.length !== m * n) return [];

  // Initialize the 2D array that will hold the final result
  const result: number[][] = [];

  // Loop through each row index from 0 to m-1
  for (let i = 0; i < m; i++) {
    // Slice out the segment of the array that corresponds to the current row
    // Start index: i * n
    // End index: (i + 1) * n
    result.push(original.slice(i * n, (i + 1) * n));
  }

  // Return the constructed 2D array
  return result;
}

/* 
1945. Sum of Digits of String After Convert

You are given a string s consisting of lowercase English letters, and an integer k.

First, convert s into an integer by replacing each letter with its position in the alphabet (i.e., replace 'a' with 1, 'b' with 2, ..., 'z' with 26). Then, transform the integer by replacing it with the sum of its digits. Repeat the transform operation k times in total.

For example, if s = "zbax" and k = 2, then the resulting integer would be 8 by the following operations:

Convert: "zbax" ➝ "(26)(2)(1)(24)" ➝ "262124" ➝ 262124
Transform #1: 262124 ➝ 2 + 6 + 2 + 1 + 2 + 4 ➝ 17
Transform #2: 17 ➝ 1 + 7 ➝ 8
Return the resulting integer after performing the operations described above.

Example 1:
Input: s = "iiii", k = 1
Output: 36
Explanation: The operations are as follows:
- Convert: "iiii" ➝ "(9)(9)(9)(9)" ➝ "9999" ➝ 9999
- Transform #1: 9999 ➝ 9 + 9 + 9 + 9 ➝ 36
Thus the resulting integer is 36.

Example 2:
Input: s = "leetcode", k = 2
Output: 6
Explanation: The operations are as follows:
- Convert: "leetcode" ➝ "(12)(5)(5)(20)(3)(15)(4)(5)" ➝ "12552031545" ➝ 12552031545
- Transform #1: 12552031545 ➝ 1 + 2 + 5 + 5 + 2 + 0 + 3 + 1 + 5 + 4 + 5 ➝ 33
- Transform #2: 33 ➝ 3 + 3 ➝ 6
Thus the resulting integer is 6.

Example 3:
Input: s = "zbax", k = 2
Output: 8

Constraints:
1 <= s.length <= 100
1 <= k <= 10
s consists of lowercase English letters.

</> Typescript Code:
*/

function getLucky(s: string, k: number): number {
  // Convert the string into its corresponding numeric string by mapping each character to its position in the alphabet
  let numStr = s
    .split("")
    .map((c) => c.charCodeAt(0) - 96)
    .join("");

  // Calculate the initial sum of the digits of the numeric string
  let sum = numStr.split("").reduce((acc, digit) => acc + parseInt(digit), 0);

  // Repeat the digit sum transformation for k-1 times
  for (let i = 1; i < k; i++) {
    sum = sum
      .toString()
      .split("")
      .reduce((acc, digit) => acc + parseInt(digit), 0);
  }

  // Return the final result after k transformations
  return sum;
}

/* 
2220. Minimum Bit Flips to Convert Number

A bit flip of a number x is choosing a bit in the binary representation of x and flipping it from either 0 to 1 or 1 to 0.

For example, for x = 7, the binary representation is 111 and we may choose any bit (including any leading zeros not shown) and flip it. We can flip the first bit from the right to get 110, flip the second bit from the right to get 101, flip the fifth bit from the right (a leading zero) to get 10111, etc.
Given two integers start and goal, return the minimum number of bit flips to convert start to goal.

Example 1:
Input: start = 10, goal = 7
Output: 3
Explanation: The binary representation of 10 and 7 are 1010 and 0111 respectively. We can convert 10 to 7 in 3 steps:
- Flip the first bit from the right: 1010 -> 1011.
- Flip the third bit from the right: 1011 -> 1111.
- Flip the fourth bit from the right: 1111 -> 0111.
It can be shown we cannot convert 10 to 7 in less than 3 steps. Hence, we return 3.

Example 2:
Input: start = 3, goal = 4
Output: 3
Explanation: The binary representation of 3 and 4 are 011 and 100 respectively. We can convert 3 to 4 in 3 steps:
- Flip the first bit from the right: 011 -> 010.
- Flip the second bit from the right: 010 -> 000.
- Flip the third bit from the right: 000 -> 100.
It can be shown we cannot convert 3 to 4 in less than 3 steps. Hence, we return 3.

Constraints:
0 <= start, goal <= 10^9

</> Typescript Code:
*/

function minBitFlips(start: number, goal: number): number {
  // XOR the two numbers to find differing bits
  const differingBits = start ^ goal; // Bits where start and goal differ will be set to 1

  // Count the number of 1s in the binary representation of differingBits
  // Convert differingBits to binary string, split by '1', and count segments
  return (
    differingBits
      .toString(2) // Convert differingBits to binary string
      .split("1").length - 1 // Split by '1' to get an array where each segment represents consecutive '0's
  ); // Length of array - 1 gives the count of '1's which are the flips needed
}

/* 
1684. Count the Number of Consistent Strings

You are given a string allowed consisting of distinct characters and an array of strings words. A string is consistent if all characters in the string appear in the string allowed.

Return the number of consistent strings in the array words.

Example 1:
Input: allowed = "ab", words = ["ad","bd","aaab","baa","badab"]
Output: 2
Explanation: Strings "aaab" and "baa" are consistent since they only contain characters 'a' and 'b'.

Example 2:
Input: allowed = "abc", words = ["a","b","c","ab","ac","bc","abc"]
Output: 7
Explanation: All strings are consistent.

Example 3:
Input: allowed = "cad", words = ["cc","acd","b","ba","bac","bad","ac","d"]
Output: 4
Explanation: Strings "cc", "acd", "ac", and "d" are consistent.

Constraints:
1 <= words.length <= 10^4
1 <= allowed.length <= 26
1 <= words[i].length <= 10
The characters in allowed are distinct.
words[i] and allowed contain only lowercase English letters.

</> Typescript Code:
*/

function countConsistentStrings(allowed: string, words: string[]): number {
  // Create a Set from the allowed string for O(1) lookups
  const allowedSet = new Set(allowed);

  // Filter the words array to include only those strings that are consistent
  // A word is consistent if all its characters are in the allowed set
  return words.filter((word) =>
    // Convert the word to an array of characters and check if all are in the allowed set
    Array.from(word).every((char) => allowedSet.has(char))
  ).length; // Return the count of consistent strings
}

/* 
884. Uncommon Words from Two Sentences

A sentence is a string of single-space separated words where each word consists only of lowercase letters.

A word is uncommon if it appears exactly once in one of the sentences, and does not appear in the other sentence.

Given two sentences s1 and s2, return a list of all the uncommon words. You may return the answer in any order.

Example 1:
Input: s1 = "this apple is sweet", s2 = "this apple is sour"
Output: ["sweet","sour"]
Explanation:
The word "sweet" appears only in s1, while the word "sour" appears only in s2.

Example 2:
Input: s1 = "apple apple", s2 = "banana"
Output: ["banana"]


Constraints:
1 <= s1.length, s2.length <= 200
s1 and s2 consist of lowercase English letters and spaces.
s1 and s2 do not have leading or trailing spaces.
All the words in s1 and s2 are separated by a single space

</> Typescript Code:
*/

function uncommonFromSentences(s1: string, s2: string): string[] {
  // Create a frequency map to count occurrences of each word
  const count: Record<string, number> = {};

  // Split s1 into words and count occurrences
  for (const word of s1.split(" ")) {
    count[word] = (count[word] || 0) + 1; // If word not in map, initialize to 0 and add 1
  }

  // Split s2 into words and count occurrences
  for (const word of s2.split(" ")) {
    count[word] = (count[word] || 0) + 1; // Same as above for s2
  }

  // Filter and return words that appear exactly once in the combined sentences
  return Object.keys(count).filter((word) => count[word] === 1);
}

/* 
1331. Rank Transform of an Array

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

</> Typescript Code:
*/

function arrayRankTransform(arr: number[]): number[] {
  // If the array is empty, return an empty array immediately.
  if (arr.length === 0) return [];

  // Step 1: Create a sorted array of unique elements from `arr`.
  // We use `Set` to remove duplicates, then sort the array in ascending order.
  const sortedUnique = [...new Set(arr)].sort((a, b) => a - b);

  // Step 2: Create a map to store the rank for each unique element.
  // The map will store the element as the key and its rank (1-based index) as the value.
  const rankMap = new Map<number, number>();

  // Step 3: Populate the rank map by iterating over the sorted unique array.
  // Each unique value gets assigned a rank based on its position in the sorted array.
  sortedUnique.forEach((val, index) => rankMap.set(val, index + 1));

  // Step 4: Transform the original array by replacing each value with its corresponding rank.
  // We use the rank map to find the rank for each value in the original array.
  return arr.map((val) => rankMap.get(val)!);
}

/* 
2696. Minimum String Length After Removing Substrings

You are given a string s consisting only of uppercase English letters.

You can apply some operations to this string where, in one operation, you can remove any occurrence of one of the substrings "AB" or "CD" from s.

Return the minimum possible length of the resulting string that you can obtain.

Note that the string concatenates after removing the substring and could produce new "AB" or "CD" substrings.

Example 1:
Input: s = "ABFCACDB"
Output: 2
Explanation: We can do the following operations:
- Remove the substring "ABFCACDB", so s = "FCACDB".
- Remove the substring "FCACDB", so s = "FCAB".
- Remove the substring "FCAB", so s = "FC".
So the resulting length of the string is 2.
It can be shown that it is the minimum length that we can obtain.

Example 2:
Input: s = "ACBBD"
Output: 5
Explanation: We cannot do any operations on the string so the length remains the same.

Constraints:
1 <= s.length <= 100
s consists only of uppercase English letters.


</> Typescript Code:
*/

function minLength(s: string): number {
  // Initialize a stack to keep track of the characters in the string
  const stack: string[] = [];

  // Iterate through each character in the string
  for (const char of s) {
    // Get the last character in the stack (if any)
    const last = stack[stack.length - 1];

    // If the current character forms a valid "AB" or "CD" with the last character, pop the stack
    if ((last === "A" && char === "B") || (last === "C" && char === "D")) {
      stack.pop(); // Remove the last character since the pair is removed
    } else {
      // If no valid pair is found, push the current character onto the stack
      stack.push(char);
    }
  }

  // The final length of the string is the size of the stack after all removals
  return stack.length;
}

/* 
2490. Circular Sentence

A sentence is a list of words that are separated by a single space with no leading or trailing spaces.

For example, "Hello World", "HELLO", "hello world hello world" are all sentences.
Words consist of only uppercase and lowercase English letters. Uppercase and lowercase English letters are considered different.

A sentence is circular if:

The last character of a word is equal to the first character of the next word.
The last character of the last word is equal to the first character of the first word.
For example, "leetcode exercises sound delightful", "eetcode", "leetcode eats soul" are all circular sentences. However, "Leetcode is cool", "happy Leetcode", "Leetcode" and "I like Leetcode" are not circular sentences.

Given a string sentence, return true if it is circular. Otherwise, return false.

Example 1:
Input: sentence = "leetcode exercises sound delightful"
Output: true
Explanation: The words in sentence are ["leetcode", "exercises", "sound", "delightful"].
- leetcode's last character is equal to exercises's first character.
- exercises's last character is equal to sound's first character.
- sound's last character is equal to delightful's first character.
- delightful's last character is equal to leetcode's first character.
The sentence is circular.

Example 2:
Input: sentence = "eetcode"
Output: true
Explanation: The words in sentence are ["eetcode"].
- eetcode's last character is equal to eetcode's first character.
The sentence is circular.

Example 3:
Input: sentence = "Leetcode is cool"
Output: false
Explanation: The words in sentence are ["Leetcode", "is", "cool"].
- Leetcode's last character is not equal to is's first character.
The sentence is not circular.

Constraints:
1 <= sentence.length <= 500
sentence consist of only lowercase and uppercase English letters and spaces.
The words in sentence are separated by a single space.
There are no leading or trailing spaces.

</> Typescript Code:
*/

function isCircularSentence(sentence: string): boolean {
  const n = sentence.length; // Get the length of the sentence
  let prevChar = sentence[n - 1]; // Initialize prevChar to the last character of the sentence
  for (let i = 0; i < n; i++) {
    const currChar = sentence[i]; // Current character in the sentence
    if (currChar === " ") {
      // Check if current character is a space
      if (prevChar !== sentence[i + 1]) {
        // Compare prevChar with first character of next word
        return false; // Return false if they are not equal
      }
    } else {
      prevChar = currChar; // Update prevChar to the current character
    }
  }
  return prevChar === sentence[0]; // Check if last character equals first character
}

/* 
796. Rotate String

Given two strings s and goal, return true if and only if s can become goal after some number of shifts on s.

A shift on s consists of moving the leftmost character of s to the rightmost position.

For example, if s = "abcde", then it will be "bcdea" after one shift.

Example 1:
Input: s = "abcde", goal = "cdeab"
Output: true

Example 2:
Input: s = "abcde", goal = "abced"
Output: false

Constraints:
1 <= s.length, goal.length <= 100
s and goal consist of lowercase English letters.

</> Typescript Code:
*/

function rotateString(s: string, goal: string): boolean {
  // Check if both strings have the same length
  if (s.length !== goal.length) {
    return false;
  }
  // Concatenate string s with itself
  const doubled = s + s;
  // Check if goal is a substring of the doubled string
  return doubled.includes(goal);
}

/* 
1652. Defuse the Bomb

You have a bomb to defuse, and your time is running out! Your informer will provide you with a circular array code of length of n and a key k.

To decrypt the code, you must replace every number. All the numbers are replaced simultaneously.

If k > 0, replace the ith number with the sum of the next k numbers.
If k < 0, replace the ith number with the sum of the previous k numbers.
If k == 0, replace the ith number with 0.
As code is circular, the next element of code[n-1] is code[0], and the previous element of code[0] is code[n-1].

Given the circular array code and an integer key k, return the decrypted code to defuse the bomb!

Example 1:
Input: code = [5,7,1,4], k = 3
Output: [12,10,16,13]
Explanation: Each number is replaced by the sum of the next 3 numbers. The decrypted code is [7+1+4, 1+4+5, 4+5+7, 5+7+1]. Notice that the numbers wrap around.

Example 2:
Input: code = [1,2,3,4], k = 0
Output: [0,0,0,0]
Explanation: When k is zero, the numbers are replaced by 0. 

Example 3:
Input: code = [2,4,9,3], k = -2
Output: [12,5,6,13]
Explanation: The decrypted code is [3+9, 2+3, 4+2, 9+4]. Notice that the numbers wrap around again. If k is negative, the sum is of the previous numbers.

Constraints:
n == code.length
1 <= n <= 100
1 <= code[i] <= 100
-(n - 1) <= k <= n - 1

</> Typescript Code:
*/

function decrypt(code: number[], k: number): number[] {
  const n = code.length; // Get the length of the code array
  const result = new Array(n).fill(0); // Initialize result array with zeros
  if (k === 0) {
    return result; // If k is 0, return array of zeros
  }
  for (let i = 0; i < n; i++) {
    let sum = 0; // Initialize sum for current index
    if (k > 0) {
      // If k is positive, sum the next k elements
      for (let j = 1; j <= k; j++) {
        sum += code[(i + j) % n]; // Use modulo for circular indexing
      }
    } else {
      // If k is negative, sum the previous k elements
      for (let j = 1; j <= -k; j++) {
        sum += code[(i - j + n) % n]; // Use modulo for circular indexing
      }
    }
    result[i] = sum; // Assign sum to result array
  }
  return result; // Return the decrypted code
}

/* 
1346. Check If N and Its Double Exist

Given an array arr of integers, check if there exist two indices i and j such that :

i != j
0 <= i, j < arr.length
arr[i] == 2 * arr[j]

Example 1:
Input: arr = [10,2,5,3]
Output: true
Explanation: For i = 0 and j = 2, arr[i] == 10 == 2 * 5 == 2 * arr[j]

Example 2:
Input: arr = [3,1,7,11]
Output: false
Explanation: There is no i and j that satisfy the conditions.

Constraints:
2 <= arr.length <= 500
-10^3 <= arr[i] <= 10^3

</> Typescript Code:
*/

function checkIfExist(arr: number[]): boolean {
  const numSet = new Set<number>(); // Initialize a set to store numbers
  let zeroCount = 0; // Initialize counter for zeros
  for (const num of arr) {
    // Loop through each number in the array
    if (num === 0) {
      // If the number is zero
      zeroCount++; // Increment zero counter
      if (zeroCount === 2) {
        // If there are at least two zeros
        return true; // Return true since 0 * 2 == 0
      }
    } else if (numSet.has(num * 2) || (num % 2 === 0 && numSet.has(num / 2))) {
      // Check if double or half of the number exists in the set
      return true; // Return true if condition is met
    }
    numSet.add(num); // Add the number to the set
  }
  return false; // Return false if no valid pair is found
}

/* 
1455. Check If a Word Occurs As a Prefix of Any Word in a Sentence

Given a sentence that consists of some words separated by a single space, and a searchWord, check if searchWord is a prefix of any word in sentence.

Return the index of the word in sentence (1-indexed) where searchWord is a prefix of this word. If searchWord is a prefix of more than one word, return the index of the first word (minimum index). If there is no such word return -1.

A prefix of a string s is any leading contiguous substring of s.

Example 1:
Input: sentence = "i love eating burger", searchWord = "burg"
Output: 4
Explanation: "burg" is prefix of "burger" which is the 4th word in the sentence.

Example 2:
Input: sentence = "this problem is an easy problem", searchWord = "pro"
Output: 2
Explanation: "pro" is prefix of "problem" which is the 2nd and the 6th word in the sentence, but we return 2 as it's the minimal index.

Example 3:
Input: sentence = "i am tired", searchWord = "you"
Output: -1
Explanation: "you" is not a prefix of any word in the sentence.

Constraints:
1 <= sentence.length <= 100
1 <= searchWord.length <= 10
sentence consists of lowercase English letters and spaces.
searchWord consists of lowercase English letters.

</> Typescript Code:
*/

function isPrefixOfWord(sentence: string, searchWord: string): number {
  let index = 1, // Initialize word index to 1
    i = 0, // Pointer to traverse the sentence
    n = sentence.length; // Length of the sentence
  while (i < n) {
    // Skip spaces to find the start of the word
    while (i < n && sentence[i] === " ") i++;
    if (i >= n) break; // If end of sentence, break
    let start = i; // Mark the start of the current word
    let match = true; // Flag to check for prefix match
    // Check each character of searchWord
    for (let j = 0; j < searchWord.length; j++) {
      // If characters don't match or index out of bounds
      if (i + j >= n || sentence[i + j] !== searchWord[j]) {
        match = false; // Set match to false
        break; // Exit the loop
      }
    }
    if (match) return index; // If prefix matches, return current index
    // Move to the end of the current word
    while (i < n && sentence[i] !== " ") i++;
    index++; // Increment word index
  }
  return -1; // Return -1 if no prefix match is found
}

/* 
2558. Take Gifts From the Richest Pile

You are given an integer array gifts denoting the number of gifts in various piles. Every second, you do the following:

Choose the pile with the maximum number of gifts.
If there is more than one pile with the maximum number of gifts, choose any.
Leave behind the floor of the square root of the number of gifts in the pile. Take the rest of the gifts.
Return the number of gifts remaining after k seconds.

Example 1:
Input: gifts = [25,64,9,4,100], k = 4
Output: 29
Explanation: 
The gifts are taken in the following way:
- In the first second, the last pile is chosen and 10 gifts are left behind.
- Then the second pile is chosen and 8 gifts are left behind.
- After that the first pile is chosen and 5 gifts are left behind.
- Finally, the last pile is chosen again and 3 gifts are left behind.
The final remaining gifts are [5,8,9,4,3], so the total number of gifts remaining is 29.

Example 2:
Input: gifts = [1,1,1,1], k = 4
Output: 4
Explanation: 
In this case, regardless which pile you choose, you have to leave behind 1 gift in each pile. 
That is, you can't take any pile with you. 
So, the total gifts remaining are 4.

Constraints:
1 <= gifts.length <= 10^3
1 <= gifts[i] <= 10^9
1 <= k <= 10^3

</> Typescript Code:
*/

function pickGifts(gifts: number[], k: number): number {
  // Initialize a max heap with the gifts array
  const maxHeap = new MaxHeap(gifts);
  // Perform k iterations
  for (let i = 0; i < k; i++) {
    // Extract the maximum gift pile
    let maxGift = maxHeap.extractMax();
    // Calculate the remaining gifts after taking
    let remain = Math.floor(Math.sqrt(maxGift));
    // Insert the remaining gifts back into the heap
    maxHeap.insert(remain);
  }
  // Sum all remaining gift piles
  return maxHeap.heap.reduce((acc, val) => acc + val, 0);
}

class MaxHeap {
  heap: number[];
  constructor(arr: number[]) {
    // Initialize the heap array
    this.heap = [];
    // Insert all elements into the heap
    for (let num of arr) {
      this.insert(num);
    }
  }
  insert(val: number) {
    // Add the new value to the end of the heap
    this.heap.push(val);
    let curr = this.heap.length - 1;
    // Bubble up the new value to maintain max heap property
    while (curr > 0) {
      let parent = Math.floor((curr - 1) / 2);
      if (this.heap[parent] < this.heap[curr]) {
        // Swap if parent is smaller than current
        [this.heap[parent], this.heap[curr]] = [
          this.heap[curr],
          this.heap[parent],
        ];
        curr = parent; // Move up to the parent index
      } else {
        break; // Heap property satisfied
      }
    }
  }
  extractMax(): number {
    if (this.heap.length === 0) return 0;
    // The maximum value is at the root of the heap
    const max = this.heap[0];
    // Remove the last element
    const end = this.heap.pop();
    if (this.heap.length > 0 && end !== undefined) {
      // Move the last element to the root
      this.heap[0] = end;
      // Sink down to maintain heap property
      this.sinkDown(0);
    }
    return max;
  }
  sinkDown(idx: number) {
    let largest = idx;
    while (true) {
      let left = 2 * idx + 1;
      let right = 2 * idx + 2;
      // Check if left child is larger
      if (left < this.heap.length && this.heap[left] > this.heap[largest]) {
        largest = left;
      }
      // Check if right child is larger
      if (right < this.heap.length && this.heap[right] > this.heap[largest]) {
        largest = right;
      }
      // If largest is not parent, swap and continue
      if (largest !== idx) {
        [this.heap[idx], this.heap[largest]] = [
          this.heap[largest],
          this.heap[idx],
        ];
        idx = largest;
      } else {
        break; // Heap property satisfied
      }
    }
  }
}

/* 
3264. Final Array State After K Multiplication Operations I

You are given an integer array nums, an integer k, and an integer multiplier.

You need to perform k operations on nums. In each operation:

Find the minimum value x in nums. If there are multiple occurrences of the minimum value, select the one that appears first.
Replace the selected minimum value x with x * multiplier.
Return an integer array denoting the final state of nums after performing all k operations.

Example 1:
Input: nums = [2,1,3,5,6], k = 5, multiplier = 2
Output: [8,4,6,5,6]
Explanation:
Operation	Result
After operation 1	[2, 2, 3, 5, 6]
After operation 2	[4, 2, 3, 5, 6]
After operation 3	[4, 4, 3, 5, 6]
After operation 4	[4, 4, 6, 5, 6]
After operation 5	[8, 4, 6, 5, 6]

Example 2:
Input: nums = [1,2], k = 3, multiplier = 4
Output: [16,8]
Explanation:
Operation	Result
After operation 1	[4, 2]
After operation 2	[4, 8]
After operation 3	[16, 8]

Constraints:
1 <= nums.length <= 100
1 <= nums[i] <= 100
1 <= k <= 10
1 <= multiplier <= 5

</> Typescript Code:
*/

function getFinalState(
  nums: number[],
  k: number,
  multiplier: number
): number[] {
  // Perform k operations
  for (let op = 0; op < k; op++) {
    let minVal = Infinity; // Initialize minimum value
    let minIndex = -1; // Initialize index of the minimum value
    // Find the minimum value and its first occurrence
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] < minVal) {
        minVal = nums[i];
        minIndex = i;
      }
    }
    // Multiply the minimum value by the multiplier
    nums[minIndex] *= multiplier;
  }
  // Return the final state of the array
  return nums;
}

/* 
1475. Final Prices With a Special Discount in a Shop

You are given an integer array prices where prices[i] is the price of the ith item in a shop.

There is a special discount for items in the shop. If you buy the ith item, then you will receive a discount equivalent to prices[j] where j is the minimum index such that j > i and prices[j] <= prices[i]. Otherwise, you will not receive any discount at all.

Return an integer array answer where answer[i] is the final price you will pay for the ith item of the shop, considering the special discount.

Example 1:
Input: prices = [8,4,6,2,3]
Output: [4,2,4,2,3]
Explanation: 
For item 0 with price[0]=8 you will receive a discount equivalent to prices[1]=4, therefore, the final price you will pay is 8 - 4 = 4.
For item 1 with price[1]=4 you will receive a discount equivalent to prices[3]=2, therefore, the final price you will pay is 4 - 2 = 2.
For item 2 with price[2]=6 you will receive a discount equivalent to prices[3]=2, therefore, the final price you will pay is 6 - 2 = 4.
For items 3 and 4 you will not receive any discount at all.

Example 2:
Input: prices = [1,2,3,4,5]
Output: [1,2,3,4,5]
Explanation: In this case, for all items, you will not receive any discount at all.

Example 3:
Input: prices = [10,1,1,6]
Output: [9,0,1,6]

Constraints:
1 <= prices.length <= 500
1 <= prices[i] <= 1000

</> Typescript Code:
*/

function finalPrices(prices: number[]): number[] {
  const n = prices.length; // Get the length of the prices array
  const result = prices.slice(); // Make a copy of the prices array to store the final prices
  const stack: number[] = []; // Initialize an empty stack to keep track of indices of prices

  for (let i = 0; i < n; i++) {
    // Iterate over each price in the array
    while (stack.length > 0 && prices[stack[stack.length - 1]] >= prices[i]) {
      // Check if current price is less than or equal to the price at index on top of the stack
      const idx = stack.pop()!; // Pop the index from the stack
      result[idx] -= prices[i]; // Subtract current price from the price at the popped index
    }
    stack.push(i); // Push the current index onto the stack
  }
  return result; // Return the array of final prices
}
