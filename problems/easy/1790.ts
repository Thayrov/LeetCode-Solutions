/* 
1790. Check if One String Swap Can Make Strings Equal

You are given two strings s1 and s2 of equal length. A string swap is an operation where you choose two indices in a string (not necessarily different) and swap the characters at these indices.

Return true if it is possible to make both strings equal by performing at most one string swap on exactly one of the strings. Otherwise, return false.

Example 1:
Input: s1 = "bank", s2 = "kanb"
Output: true
Explanation: For example, swap the first character with the last character of s2 to make "bank".

Example 2:
Input: s1 = "attack", s2 = "defend"
Output: false
Explanation: It is impossible to make them equal with one string swap.

Example 3:
Input: s1 = "kelb", s2 = "kelb"
Output: true
Explanation: The two strings are already equal, so no string swap operation is required.

Constraints:
1 <= s1.length, s2.length <= 100
s1.length == s2.length
s1 and s2 consist of only lowercase English letters.

</> Typescript code:
*/

function areAlmostEqual(s1: string, s2: string): boolean {
  // If both strings are identical, no swap is needed; return true immediately.
  if (s1 === s2) return true;
  // Initialize an array to store indices where the characters of s1 and s2 differ.
  const diff: number[] = [];
  // Iterate over every index of the strings.
  for (let i = 0; i < s1.length; i++) {
    // When the characters at the current index differ, record the index.
    if (s1[i] !== s2[i]) {
      diff.push(i);
      // If more than two differences are found, it's impossible to equalize with a single swap; return false.
      if (diff.length > 2) return false;
    }
  }
  // Return true if exactly two differences exist and swapping these characters makes the strings equal.
  return diff.length === 2 && s1[diff[0]] === s2[diff[1]] && s1[diff[1]] === s2[diff[0]];
}
