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
  const newImg: number[][] = Array.from({length: m}, () => new Array(n).fill(0));

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
    if (char === '1') {
      onesCount++;
    }
  }

  // Iterate through the string until the second-to-last character
  // The last character must be part of the right substring, so it's not included in the loop
  for (let i = 0; i < s.length - 1; i++) {
    if (s[i] === '0') {
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
      case 'N':
        y++;
        break; // Move north: increment y coordinate
      case 'S':
        y--;
        break; // Move south: decrement y coordinate
      case 'E':
        x++;
        break; // Move east: increment x coordinate
      case 'W':
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

function minOperations(s: string): number {
  // Initialize two counters to track mismatches with the two possible alternating patterns
  let count1 = 0; // Count mismatches for pattern '0101...'
  let count2 = 0; // Count mismatches for pattern '1010...'

  // Loop through each character of the string
  for (let i = 0; i < s.length; i++) {
    // Check if the current index is even
    if (i % 2 === 0) {
      // If the character at the even index is '1', it mismatches with '0101...' pattern
      if (s[i] === '1') {
        count1++; // Increment count1 for pattern '0101...'
      } else {
        // Otherwise, it mismatches with '1010...' pattern
        count2++; // Increment count2 for pattern '1010...'
      }
    } else {
      // If the current index is odd
      // If the character at the odd index is '0', it mismatches with '0101...' pattern
      if (s[i] === '0') {
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
function rangeSumBST(root: TreeNode | null, low: number, high: number): number {
  if (!root) return 0; // Base case: if the node is null, return 0

  // If current node's value is greater than high, we only need to consider the left subtree
  if (root.val > high) return rangeSumBST(root.left, low, high);

  // If current node's value is less than low, we only need to consider the right subtree
  if (root.val < low) return rangeSumBST(root.right, low, high);

  // If current node's value is within the range, include it in sum and check both subtrees
  return root.val + rangeSumBST(root.left, low, high) + rangeSumBST(root.right, low, high);
}
