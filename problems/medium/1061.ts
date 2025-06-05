/*
1061. Lexicographically Smallest Equivalent String

You are given two strings of the same length s1 and s2 and a string baseStr.
We say s1[i] and s2[i] are equivalent characters.
For example, if s1 = "abc" and s2 = "cde", then we have 'a' == 'c', 'b' == 'd', and 'c' == 'e'.
Equivalent characters follow the usual rules of any equivalence relation:
Reflexivity: 'a' == 'a'.
Symmetry: 'a' == 'b' implies 'b' == 'a'.
Transitivity: 'a' == 'b' and 'b' == 'c' implies 'a' == 'c'.
For example, given the equivalency information from s1 = "abc" and s2 = "cde", "acd" and "aab" are equivalent strings of baseStr = "eed", and "aab" is the lexicographically smallest equivalent string of baseStr.
Return the lexicographically smallest equivalent string of baseStr by using the equivalency information from s1 and s2.

Example 1:
Input: s1 = "parker", s2 = "morris", baseStr = "parser"
Output: "makkek"
Explanation: Based on the equivalency information in s1 and s2, we can group their characters as [m,p], [a,o], [k,r,s], [e,i].
The characters in each group are equivalent and sorted in lexicographical order.
So the answer is "makkek".

Example 2:
Input: s1 = "hello", s2 = "world", baseStr = "hold"
Output: "hdld"
Explanation: Based on the equivalency information in s1 and s2, we can group their characters as [h,w], [d,e,o], [l,r].
So only the second letter 'o' in baseStr is changed to 'd', the answer is "hdld".

Example 3:
Input: s1 = "leetcode", s2 = "programs", baseStr = "sourcecode"
Output: "aauaaaaada"
Explanation: We group the equivalent characters in s1 and s2 as [a,o,e,r,s,c], [l,p], [g,t] and [d,m], thus all letters in baseStr except 'u' and 'd' are transformed to 'a', the answer is "aauaaaaada".
 
Constraints:
1 <= s1.length, s2.length, baseStr <= 1000
s1.length == s2.length
s1, s2, and baseStr consist of lowercase English letters.

</> Typescript code:
*/

function smallestEquivalentString(
  s1: string,
  s2: string,
  baseStr: string
): string {
  // Initialize parent array for Union-Find data structure
  // Each character (a-z) starts as its own parent (0-25)
  const parent = new Array(26).fill(0).map((_, i) => i);

  // Find function with path compression
  // Returns the root parent of a character
  const find = (x: number): number => {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]); // Path compression
    }
    return parent[x];
  };

  // Union function that always keeps the smaller character as parent
  // This ensures we get the lexicographically smallest equivalent
  const union = (x: number, y: number): void => {
    const px = find(x);
    const py = find(y);
    if (px < py) {
      parent[py] = px; // Make smaller character the parent
    } else {
      parent[px] = py;
    }
  };

  // Process all character pairs from s1 and s2
  // Convert characters to 0-25 range (a=0, b=1, etc.)
  for (let i = 0; i < s1.length; i++) {
    union(s1.charCodeAt(i) - 97, s2.charCodeAt(i) - 97);
  }

  // Transform baseStr using the equivalence relationships
  // Convert each character to its smallest equivalent
  return baseStr
    .split("")
    .map((char) => String.fromCharCode(find(char.charCodeAt(0) - 97) + 97))
    .join("");
}
