/*
1807. Evaluate the Bracket Pairs of a String

You are given a string s that contains some bracket pairs, with each pair containing a non-empty key.
For example, in the string "(name)is(age)yearsold", there are two bracket pairs that contain the keys "name" and "age".
You know the values of a wide range of keys. This is represented by a 2D string array knowledge where each knowledge[i] = [keyi, valuei] indicates that key keyi has a value of valuei.
You are tasked to evaluate all of the bracket pairs. When you evaluate a bracket pair that contains some key keyi, you will:
Replace keyi and the bracket pair with the key's corresponding valuei.
If you do not know the value of the key, you will replace keyi and the bracket pair with a question mark "?" (without the quotation marks).
Each key will appear at most once in your knowledge. There will not be any nested brackets in s.
Return the resulting string after evaluating all of the bracket pairs.

Example 1:
Input: s = "(name)is(age)yearsold", knowledge = [["name","bob"],["age","two"]]
Output: "bobistwoyearsold"
Explanation:
The key "name" has a value of "bob", so replace "(name)" with "bob".
The key "age" has a value of "two", so replace "(age)" with "two".

Example 2:
Input: s = "hi(name)", knowledge = [["a","b"]]
Output: "hi?"
Explanation: As you do not know the value of the key "name", replace "(name)" with "?".

Example 3:
Input: s = "(a)(a)(a)aaa", knowledge = [["a","yes"]]
Output: "yesyesyesaaa"
Explanation: The same key can appear multiple times.
The key "a" has a value of "yes", so replace all occurrences of "(a)" with "yes".
Notice that the "a"s not in a bracket pair are not evaluated.

Constraints:
1 <= s.length <= 10^5
0 <= knowledge.length <= 10^5
knowledge[i].length == 2
1 <= keyi.length, valuei.length <= 10
s consists of lowercase English letters and round brackets '(' and ')'.
Every open bracket '(' in s will have a corresponding close bracket ')'.
The key in each bracket pair of s will be non-empty.
There will not be any nested bracket pairs in s.
keyi and valuei consist of lowercase English letters.
Each keyi in knowledge is unique.

</> Typescript code:
*/

function evaluate(s: string, knowledge: string[][]): string {
  // Build key to value map for O(1) lookups.
  const dict = new Map<string, string>();
  // Insert every knowledge pair exactly once.
  for (let i = 0; i < knowledge.length; i++) dict.set(knowledge[i][0], knowledge[i][1]);
  // Collect output chunks to avoid repeated string concatenation.
  const parts: string[] = [];
  // Cache input length for the scan bound.
  const n = s.length;
  // Current scan position in s.
  let i = 0;
  // Scan until the whole string is consumed.
  while (i < n) {
    // Jump to the next bracket with native search.
    const open = s.indexOf("(", i);
    // No more brackets means only plain text remains.
    if (open === -1) {
      // Flush the trailing plain text.
      parts.push(s.slice(i));
      // Scanning is complete.
      break;
    }
    // Emit plain text before the bracket.
    if (open > i) parts.push(s.slice(i, open));
    // Find matching close; guaranteed to exist by constraints.
    const close = s.indexOf(")", open + 1);
    // Slice the key and look it up.
    const v = dict.get(s.slice(open + 1, close));
    // Push the value or the unknown-key fallback.
    parts.push(v === undefined ? "?" : v);
    // Continue scanning past the close bracket.
    i = close + 1;
  }
  // Join chunks into the final evaluated string.
  return parts.join("");
}
