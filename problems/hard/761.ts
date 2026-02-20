/*
761. Special Binary String

Special binary strings are binary strings with the following two properties:
The number of 0's is equal to the number of 1's.
Every prefix of the binary string has at least as many 1's as 0's.
You are given a special binary string s.
A move consists of choosing two consecutive, non-empty, special substrings of s, and swapping them. Two strings are consecutive if the last character of the first string is exactly one index before the first character of the second string.
Return the lexicographically largest resulting string possible after applying the mentioned operations on the string.

Example 1:
Input: s = "11011000"
Output: "11100100"
Explanation: The strings "10" [occuring at s[1]] and "1100" [at s[3]] are swapped.
This is the lexicographically largest string possible after some number of swaps.

Example 2:
Input: s = "10"
Output: "10"

Constraints:
1 <= s.length <= 50
s[i] is either '0' or '1'.
s is a special binary string.

</> Typescript code:
*/

function makeLargestSpecial(s: string): string {
  // Base case: Any valid string of length 2 or less must be merely "" or "10", which already peak lexicographically.
  if (s.length <= 2) return s;

  // Counter to mathematically track the balance limits of '1's and '0's (functions identically to bracket tracking)
  let count = 0;

  // Fast pointer tracking the starting index of the current valid contiguous block of special substring
  let i = 0;

  // Dedicated string array to store our fully evaluated, maximized top-level splits
  const substrings: string[] = [];

  // Iterate dynamically over the string sequentially. N's upper constraint is 50, limiting stack impacts.
  for (let j = 0; j < s.length; j++) {
    // Add 1 for an opening bound '1', subtract 1 for an ending bound '0'
    count += s[j] === "1" ? 1 : -1;

    // When count bottoms to perfectly 0, we've successfully isolated a cohesive, independent special substring block
    if (count === 0) {
      // A special rule restricts string blocks to essentially start with '1' and end with '0'.
      // Recursively evaluate and maximize the "inner" string strictly nested inside the outer elements.
      const maximizedInner = makeLargestSpecial(s.substring(i + 1, j));

      // Re-concatenate the isolated outer '1' and '0' to the maximized payload block and stage to array
      substrings.push("1" + maximizedInner + "0");

      // Shift the start bound pointer `i` exactly right past the evaluated substring, targeting the next sequence
      i = j + 1;
    }
  }

  // Sort natively descending applying raw relational ASCII bounds (faster than checking strict locales).
  // Concatenate the freshly structured, weight-distributed string partitions back together and pipeline the returned output.
  return substrings.sort((a, b) => (a > b ? -1 : 1)).join("");
}
