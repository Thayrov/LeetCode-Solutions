/* 
1910. Remove All Occurrences of a Substring

Given two strings s and part, perform the following operation on s until all occurrences of the substring part are removed:

Find the leftmost occurrence of the substring part and remove it from s.
Return s after removing all occurrences of part.

A substring is a contiguous sequence of characters in a string.

Example 1:
Input: s = "daabcbaabcbc", part = "abc"
Output: "dab"
Explanation: The following operations are done:
- s = "daabcbaabcbc", remove "abc" starting at index 2, so s = "dabaabcbc".
- s = "dabaabcbc", remove "abc" starting at index 4, so s = "dababc".
- s = "dababc", remove "abc" starting at index 3, so s = "dab".
Now s has no occurrences of "abc".

Example 2:
Input: s = "axxxxyyyyb", part = "xy"
Output: "ab"
Explanation: The following operations are done:
- s = "axxxxyyyyb", remove "xy" starting at index 4 so s = "axxxyyyb".
- s = "axxxyyyb", remove "xy" starting at index 3 so s = "axxyyb".
- s = "axxyyb", remove "xy" starting at index 2 so s = "axyb".
- s = "axyb", remove "xy" starting at index 1 so s = "ab".
Now s has no occurrences of "xy".

Constraints:
1 <= s.length <= 1000
1 <= part.length <= 1000
s​​​​​​ and part consists of lowercase English letters.

</> Typescript Code:
*/

function removeOccurrences(s: string, part: string): string {
  // Create an empty array to simulate a stack for storing characters.
  let stack: string[] = [];
  // Store the length of the substring 'part' to avoid recalculating it.
  const pLen = part.length;
  // Loop through each character in the input string 's'.
  for (let i = 0; i < s.length; i++) {
    // Add the current character to the stack.
    stack.push(s[i]);
    // If the current stack has enough characters to potentially match 'part'
    if (stack.length >= pLen) {
      // Assume that a potential match exists.
      let match = true;
      // Check if the end of the stack matches the substring 'part'.
      for (let j = 0; j < pLen; j++) {
        // If any character does not match, mark as no match.
        if (stack[stack.length - pLen + j] !== part[j]) {
          match = false;
          break;
        }
      }
      // If a match was found, remove the last 'pLen' characters from the stack.
      if (match) {
        stack.length = stack.length - pLen;
      }
    }
  }
  // Combine the stack into a final string to return.
  return stack.join('');
}
