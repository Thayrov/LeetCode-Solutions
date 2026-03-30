/*
2840. Check if Strings Can be Made Equal With Operations II

You are given two strings s1 and s2, both of length n, consisting of lowercase English letters.
You can apply the following operation on any of the two strings any number of times:
Choose any two indices i and j such that i < j and the difference j - i is even, then swap the two characters at those indices in the string.
Return true if you can make the strings s1 and s2 equal, and false otherwise.

Example 1:
Input: s1 = "abcdba", s2 = "cabdab"
Output: true
Explanation: We can apply the following operations on s1:
- Choose the indices i = 0, j = 2. The resulting string is s1 = "cbadba".
- Choose the indices i = 2, j = 4. The resulting string is s1 = "cbbdaa".
- Choose the indices i = 1, j = 5. The resulting string is s1 = "cabdab" = s2.

Example 2:
Input: s1 = "abe", s2 = "bea"
Output: false
Explanation: It is not possible to make the two strings equal.

Constraints:
n == s1.length == s2.length
1 <= n <= 10^5
s1 and s2 consist only of lowercase English letters.

</> Typescript code:
*/

function checkStrings(s1: string, s2: string): boolean {
  const n = s1.length;
  // Using Int32Array for better performance and fixed memory allocation over standard objects/maps
  const even1 = new Int32Array(26); // Counts for characters at even indices in s1
  const odd1 = new Int32Array(26); // Counts for characters at odd indices in s1
  const even2 = new Int32Array(26); // Counts for characters at even indices in s2
  const odd2 = new Int32Array(26); // Counts for characters at odd indices in s2

  // Single pass O(n) to populate frequency arrays
  for (let i = 0; i < n; i++) {
    if (i % 2 === 0) {
      // charCodeAt(i) - 97 maps 'a'-'z' to 0-25 efficiently
      even1[s1.charCodeAt(i) - 97]++;
      even2[s2.charCodeAt(i) - 97]++;
    } else {
      odd1[s1.charCodeAt(i) - 97]++;
      odd2[s2.charCodeAt(i) - 97]++;
    }
  }

  // Compare the frequency distributions; if they differ, the strings cannot be made equal
  for (let i = 0; i < 26; i++) {
    if (even1[i] !== even2[i] || odd1[i] !== odd2[i]) {
      return false;
    }
  }

  // If all character counts match for both parities, transformation is possible
  return true;
}
