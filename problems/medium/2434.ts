/*
2434. Using a Robot to Print the Lexicographically Smallest String

You are given a string s and a robot that currently holds an empty string t. Apply one of the following operations until s and t are both empty:
Remove the first character of a string s and give it to the robot. The robot will append this character to the string t.
Remove the last character of a string t and give it to the robot. The robot will write this character on paper.
Return the lexicographically smallest string that can be written on the paper.

Example 1:
Input: s = "zza"
Output: "azz"
Explanation: Let p denote the written string.
Initially p="", s="zza", t="".
Perform first operation three times p="", s="", t="zza".
Perform second operation three times p="azz", s="", t="".

Example 2:
Input: s = "bac"
Output: "abc"
Explanation: Let p denote the written string.
Perform first operation twice p="", s="c", t="ba". 
Perform second operation twice p="ab", s="c", t="". 
Perform first operation p="ab", s="", t="c". 
Perform second operation p="abc", s="", t="".

Example 3:
Input: s = "bdda"
Output: "addb"
Explanation: Let p denote the written string.
Initially p="", s="bdda", t="".
Perform first operation four times p="", s="", t="bdda".
Perform second operation four times p="addb", s="", t="".

Constraints:
1 <= s.length <= 10^5
s consists of only English lowercase letters.

</> Typescript code:
*/

function robotWithString(s: string): string {
  // Result string that will be written on paper
  let result = "";

  // Using array as stack to represent string t (robot's buffer)
  // This is more efficient than string operations for large inputs
  const t: string[] = [];

  // Array to store the minimum character from index i to the end of s
  // This helps us decide when to write characters from t to paper
  const minChar = new Array(s.length + 1);

  // Set sentinel value for index after the end
  // '{' is the character after 'z' in ASCII, ensuring we empty t at the end
  minChar[s.length] = "{";

  // Precompute minimum characters from right to left
  // This allows O(1) lookup of minimum character in remaining string
  for (let i = s.length - 1; i >= 0; i--) {
    minChar[i] = s[i] < minChar[i + 1] ? s[i] : minChar[i + 1];
  }

  // Process each character in the input string
  for (let i = 0; i < s.length; i++) {
    // Add current character to the robot's buffer (operation 1)
    t.push(s[i]);

    // Write characters to paper when optimal (operation 2)
    // If current character in t is <= minimum character in remaining s,
    // we should write it now to ensure lexicographically smallest result
    while (t.length > 0 && t[t.length - 1] <= minChar[i + 1]) {
      result += t.pop();
    }
  }

  return result;
}
