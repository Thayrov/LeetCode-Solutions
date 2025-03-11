/* 
1358. Number of Substrings Containing All Three Characters

Given a string s consisting only of characters a, b and c.

Return the number of substrings containing at least one occurrence of all these characters a, b and c.

Example 1:
Input: s = "abcabc"
Output: 10
Explanation: The substrings containing at least one occurrence of the characters a, b and c are "abc", "abca", "abcab", "abcabc", "bca", "bcab", "bcabc", "cab", "cabc" and "abc" (again). 

Example 2:
Input: s = "aaacb"
Output: 3
Explanation: The substrings containing at least one occurrence of the characters a, b and c are "aaacb", "aacb" and "acb". 

Example 3:
Input: s = "abc"
Output: 1

Constraints:
3 <= s.length <= 5 x 10^4
s only consists of a, b or c characters.

</> Typescript code:
*/

// Define a function to count substrings that contain at least one 'a', 'b', and 'c'
function numberOfSubstrings(s: string): number {
  // Initialize the result accumulator and the left pointer for the sliding window
  let res = 0,
    left = 0;
  // Create an object to track the frequency of 'a', 'b', and 'c' in the current window
  const count = {a: 0, b: 0, c: 0};
  // Get the length of the input string for further calculations
  const n = s.length;

  // Iterate over the string using 'right' as the end pointer of the sliding window
  for (let right = 0; right < n; right++) {
    // Increase the count for the current character in the window
    count[s[right] as 'a' | 'b' | 'c']++;

    // Check if the current window [left, right] contains at least one 'a', 'b', and 'c'
    while (count['a'] > 0 && count['b'] > 0 && count['c'] > 0) {
      // Once valid, every substring starting from 'left' to the rest of the string is valid,
      // so add the count of all possible ending positions from 'right' to 'n-1'
      res += n - right;
      // Shrink the window from the left by decrementing the count of its character
      count[s[left] as 'a' | 'b' | 'c']--;
      // Move the left pointer forward to attempt a smaller valid window
      left++;
    }
  }
  // Return the total number of valid substrings found throughout the iteration
  return res;
}
