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
    if (s[i] === "a") {
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
