/*
921. Minimum Add to Make Parentheses Valid

A parentheses string is valid if and only if:

It is the empty string,
It can be written as AB (A concatenated with B), where A and B are valid strings, or
It can be written as (A), where A is a valid string.

You are given a parentheses string s. In one move, you can insert a parenthesis at any position of the string.

For example, if s = "()))", you can insert an opening parenthesis to be "(()))" or a closing parenthesis to be "())))".

Return the minimum number of moves required to make s valid.

Example 1:
Input: s = "())"
Output: 1

Example 2:
Input: s = "((("
Output: 3

Constraints:
1 <= s.length <= 1000
s[i] is either '(' or ')'.

</> Typescript code:
*/

function minAddToMakeValid(s: string): number {
  // Count unmatched opening parentheses.
  let open = 0;
  // Count insertions needed for unmatched closing parentheses.
  let need = 0;
  // Scan every character once.
  for (let i = 0; i < s.length; i++) {
    // Opening parenthesis increases open balance.
    if (s.charCodeAt(i) === 40) open++;
    // Closing parenthesis matches a prior opening when available.
    else if (open > 0) open--;
    // No opening to match, so an insertion is required.
    else need++;
  }
  // Total insertions close remaining opens plus unmatched closes.
  return open + need;
}
