/*
2839. Check if Strings Can be Made Equal With Operations I

You are given two strings s1 and s2, both of length 4, consisting of lowercase English letters.
You can apply the following operation on any of the two strings any number of times:
Choose any two indices i and j such that j - i = 2, then swap the two characters at those indices in the string.
Return true if you can make the strings s1 and s2 equal, and false otherwise.

Example 1:
Input: s1 = "abcd", s2 = "cdab"
Output: true
Explanation: We can do the following operations on s1:
- Choose the indices i = 0, j = 2. The resulting string is s1 = "cbad".
- Choose the indices i = 1, j = 3. The resulting string is s1 = "cdab" = s2.

Example 2:
Input: s1 = "abcd", s2 = "dacb"
Output: false
Explanation: It is not possible to make the two strings equal.

Constraints:
s1.length == s2.length == 4
s1 and s2 consist only of lowercase English letters.

</> Typescript code:
*/

function canBeEqual(s1: string, s2: string): boolean {
  /**
   * Since the length is fixed at 4 and we can only swap indices with a distance of 2:
   * - Index 0 can only swap with Index 2.
   * - Index 1 can only swap with Index 3.
   * We create a helper to check if two positions can be matched via a swap.
   */
  const check = (i: number): boolean =>
    // Case A: The characters are already in the correct positions.
    (s1[i] === s2[i] && s1[i + 2] === s2[i + 2]) ||
    // Case B: The characters match if we perform one swap between i and i+2.
    (s1[i] === s2[i + 2] && s1[i + 2] === s2[i]);

  /**
   * The strings can be equal only if both the even-index pair (0, 2)
   * and the odd-index pair (1, 3) can be made to match.
   */
  return check(0) && check(1);
}
