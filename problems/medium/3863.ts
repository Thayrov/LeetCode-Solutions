/*
3863. Minimum Operations to Sort a String

You are given a string s consisting of lowercase English letters.
In one operation, you can select any substring of s that is not the entire string and sort it in non-descending alphabetical order.
Return the minimum number of operations required to make s sorted in non-descending order. If it is not possible, return -1.

Example 1:
Input: s = "dog"
Output: 1
Explanation:
Sort substring "og" to "go".
Now, s = "dgo", which is sorted in ascending order. Thus, the answer is 1.

Example 2:
Input: s = "card"
Output: 2
Explanation:
Sort substring "car" to "acr", so s = "acrd".
Sort substring "rd" to "dr", making s = "acdr", which is sorted in ascending order. Thus, the answer is 2.

Example 3:
Input: s = "gf"
Output: -1
Explanation:
It is impossible to sort s under the given constraints. Thus, the answer is -1.

Constraints:
1 <= s.length <= 10^5
s consists of only lowercase English letters.

</> Typescript code:
*/

function minOperations(s: string): number {
  // Cache length for repeated bounds checks.
  const n = s.length;
  // Single character is trivially sorted.
  if (n <= 1) return 0;
  // Frequency table for 26 lowercase letters.
  const f = new Array<number>(26).fill(0);
  // Cache first char code for linear scan.
  let prev = s.charCodeAt(0);
  // Count first character in frequency table.
  f[prev - 97]++;
  // Assume sorted until an inversion is found.
  let isSorted = true;
  // Single pass to fill counts and detect any inversion.
  for (let i = 1; i < n; i++) {
    // Read current character code.
    const c = s.charCodeAt(i);
    // Tally current character.
    f[c - 97]++;
    // Mark unsorted on any descending adjacent pair.
    if (c < prev) isSorted = false;
    // Advance previous pointer for next comparison.
    prev = c;
  }
  // Already sorted needs zero operations.
  if (isSorted) return 0;
  // Length two unsorted has no effective proper substring.
  if (n === 2) return -1;
  // Leftmost mismatch index against sorted order.
  let L = -1;
  // Pointer to expected sorted character from the left.
  let p = 0;
  // Remaining count of current expected character.
  let rem = f[0];
  // Scan from left to find first position differing from sorted.
  for (let i = 0; i < n; i++) {
    // Advance to next present character when exhausted.
    while (rem === 0) {
      // Move expected character pointer forward.
      p++;
      // Load its remaining frequency.
      rem = f[p];
    }
    // Record first mismatch and stop the scan.
    if (s.charCodeAt(i) - 97 !== p) {
      // Store left boundary of the unsorted region.
      L = i;
      // Exit once the left mismatch is found.
      break;
    }
    // Consume one occurrence of the matched character.
    rem--;
  }
  // Rightmost mismatch index against sorted order.
  let R = -1;
  // Pointer to expected sorted character from the right.
  let q = 25;
  // Remaining count of current expected character.
  let rem2 = f[25];
  // Scan from right to find last position differing from sorted.
  for (let i = n - 1; i >= 0; i--) {
    // Retreat to next present character when exhausted.
    while (rem2 === 0) {
      // Move expected character pointer backward.
      q--;
      // Load its remaining frequency.
      rem2 = f[q];
    }
    // Record last mismatch and stop the scan.
    if (s.charCodeAt(i) - 97 !== q) {
      // Store right boundary of the unsorted region.
      R = i;
      // Exit once the right mismatch is found.
      break;
    }
    // Consume one occurrence of the matched character.
    rem2--;
  }
  // Proper subsegment covering mismatches sorts in one operation.
  if (L > 0 || R < n - 1) return 1;
  // Find smallest present character for uniqueness test.
  let mn = 0;
  // Skip absent characters from the bottom.
  while (f[mn] === 0) mn++;
  // Find largest present character for uniqueness test.
  let mx = 25;
  // Skip absent characters from the top.
  while (f[mx] === 0) mx--;
  // Unique max at front plus unique min at back needs three ops.
  if (s.charCodeAt(0) - 97 === mx && f[mx] === 1 && s.charCodeAt(n - 1) - 97 === mn && f[mn] === 1) return 3;
  // Otherwise prefix-then-suffix or suffix-then-prefix sorts in two.
  return 2;
}
