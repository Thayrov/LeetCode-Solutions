/*
2311. Longest Binary Subsequence Less Than or Equal to K

You are given a binary string s and a positive integer k.
Return the length of the longest subsequence of s that makes up a binary number less than or equal to k.

Note:
The subsequence can contain leading zeroes.
The empty string is considered to be equal to 0.
A subsequence is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.
 
Example 1:
Input: s = "1001010", k = 5
Output: 5
Explanation: The longest subsequence of s that makes up a binary number less than or equal to 5 is "00010", as this number is equal to 2 in decimal.
Note that "00100" and "00101" are also possible, which are equal to 4 and 5 in decimal, respectively.
The length of this subsequence is 5, so 5 is returned.

Example 2:
Input: s = "00101001", k = 1
Output: 6
Explanation: "000001" is the longest subsequence of s that makes up a binary number less than or equal to 1, as this number is equal to 1 in decimal.
The length of this subsequence is 6, so 6 is returned.
 
Constraints:
1 <= s.length <= 1000
s[i] is either '0' or '1'.
1 <= k <= 10^9

</> Typescript code:
*/

function longestSubsequence(s: string, k: number): number {
  // 'val' will store the numerical value of the subsequence of '1's we've chosen.
  let val = 0;
  // 'len' will store the total length of the valid subsequence found so far.
  let len = 0;

  // We iterate through the string from right to left (from least significant to most significant positions).
  for (let i = s.length - 1; i >= 0; i--) {
    // If the current character is a '0'.
    if (s[i] === "0") {
      // We can always prepend a '0' to our subsequence.
      // It increases the length by one but does not change the numerical value.
      // This is a greedy choice to maximize length.
      len++;
    } else {
      // If the current character is a '1'.
      // A '1' will increase the value of our subsequence. We must check if we can afford it.

      // Optimization: The maximum value for k is 10^9, and 2^30 > 10^9.
      // If the current subsequence length (`len`) is 30 or more, prepending a '1'
      // would add at least 2^30 to the value, which will always exceed k.
      // So, we can safely skip adding any '1' if the current length is too great.
      if (len >= 30) {
        continue;
      }

      // Calculate the value this '1' would add. If the current subsequence has length `len`,
      // this new '1' would be at position `len` (0-indexed from the right), contributing 2^len.
      const powerOf2 = Math.pow(2, len);

      // Check if adding this '1' keeps the total value at or below k.
      if (val + powerOf2 <= k) {
        // If it's affordable, add its value to our total and increment the length.
        val += powerOf2;
        len++;
      }
    }
  }

  // Return the total length of the longest valid subsequence found.
  return len;
}
