/*
3614. Process String with Special Operations II

Hint
You are given a string s consisting of lowercase English letters and the special characters: '*', '#', and '%'.
You are also given an integer k.
Build a new string result by processing s according to the following rules from left to right:
If the letter is a lowercase English letter append it to result.
A '*' removes the last character from result, if it exists.
A '#' duplicates the current result and appends it to itself.
A '%' reverses the current result.
Return the kth character of the final string result. If k is out of the bounds of result, return '.'.

Example 1:
Input: s = "a#b%*", k = 1
Output: "a"
Explanation:
i	s[i]	Operation	Current result
0	'a'	Append 'a'	"a"
1	'#'	Duplicate result	"aa"
2	'b'	Append 'b'	"aab"
3	'%'	Reverse result	"baa"
4	'*'	Remove the last character	"ba"
The final result is "ba". The character at index k = 1 is 'a'.

Example 2:
Input: s = "cd%#*#", k = 3
Output: "d"
Explanation:
i	s[i]	Operation	Current result
0	'c'	Append 'c'	"c"
1	'd'	Append 'd'	"cd"
2	'%'	Reverse result	"dc"
3	'#'	Duplicate result	"dcdc"
4	'*'	Remove the last character	"dcd"
5	'#'	Duplicate result	"dcddcd"
The final result is "dcddcd". The character at index k = 3 is 'd'.

Example 3:
Input: s = "z*#", k = 0
Output: "."
Explanation:
i	s[i]	Operation	Current result
0	'z'	Append 'z'	"z"
1	'*'	Remove the last character	""
2	'#'	Duplicate the string	""
The final result is "". Since index k = 0 is out of bounds, the output is '.'.

Constraints:
1 <= s.length <= 10^5
s consists of only lowercase English letters and special characters '*', '#', and '%'.
0 <= k <= 10^15
The length of result after processing s will not exceed 1015.

</> Typescript code:
*/

function processStr(s: string, k: number): string {
  // Stores the result length before and after every operation.
  const lengths = new Array<number>(s.length + 1).fill(0);

  // Processes every operation once to calculate all intermediate lengths.
  for (let i = 0; i < s.length; i++) {
    // Gets the numeric code of the current character.
    const char = s.charCodeAt(i);

    // Gets the result length before applying the current operation.
    const length = lengths[i];

    // Checks whether the current character is a lowercase letter.
    if (char >= 97 && char <= 122) {
      // Appending a letter increases the length by one.
      lengths[i + 1] = length + 1;
      // Checks whether the current operation is '*'.
    } else if (char === 42) {
      // Removes one character when the result is non-empty.
      lengths[i + 1] = Math.max(0, length - 1);
      // Checks whether the current operation is '#'.
    } else if (char === 35) {
      // Duplicating the result doubles its length.
      lengths[i + 1] = length * 2;
      // The remaining possible operation is '%'.
    } else {
      // Reversing the result does not change its length.
      lengths[i + 1] = length;
    }
  }

  // Returns '.' when k is outside the final result.
  if (k >= lengths[s.length]) return ".";

  // Reverses the operations to trace the requested index to its source letter.
  for (let i = s.length - 1; i >= 0; i--) {
    // Gets the numeric code of the current operation.
    const char = s.charCodeAt(i);

    // Gets the result length before the current operation was applied.
    const previousLength = lengths[i];

    // Checks whether this operation appended a lowercase letter.
    if (char >= 97 && char <= 122) {
      // The appended letter occupies exactly the previous result length index.
      if (k === previousLength) return s[i];
      // Checks whether this operation duplicated a non-empty result.
    } else if (char === 35 && previousLength > 0) {
      // Maps either copy back to the corresponding index in the original result.
      k %= previousLength;
      // Checks whether this operation reversed the result.
    } else if (char === 37) {
      // Maps the reversed index back to its original mirrored position.
      k = previousLength - 1 - k;
    }
  }

  // Handles the theoretically unreachable case where no source letter is found.
  return ".";
}
