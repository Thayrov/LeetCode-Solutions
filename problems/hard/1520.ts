/*
1520. Maximum Number of Non-Overlapping Substrings

Given a string s of lowercase letters, you need to find the maximum number of non-empty substrings of s that meet the following conditions:

The substrings do not overlap, that is for any two substrings s[i..j] and s[x..y], either j < x or i > y is true.
A substring that contains a certain character c must also contain all occurrences of c.
Find the maximum number of substrings that meet the above conditions. If there are multiple solutions with the same number of substrings, return the one with minimum total length. It can be shown that there exists a unique solution of minimum total length.

Notice that you can return the substrings in any order.

Example 1:
Input: s = "adefaddaccc"
Output: ["e","f","ccc"]
Explanation:
The following are all the possible substrings that meet the conditions:
[
  "adefaddaccc"
  "adefadda",
  "ef",
  "e",
  "f",
  "ccc",
]
If we choose the first string, we cannot choose anything else and we'd get only 1. If we choose "adefadda", we are left with "ccc" which is the only one that doesn't overlap, thus obtaining 2 substrings. Notice also, that it's not optimal to choose "ef" since it can be split into two. Therefore, the optimal way is to choose ["e","f","ccc"] which gives us 3 substrings. No other solution of the same number of substrings exist.

Example 2:
Input: s = "abbaccd"
Output: ["d","bb","cc"]
Explanation:
Notice that while the set of substrings ["d","abba","cc"] also has length 3, it's considered incorrect since it has larger total length.

Constraints:
1 <= s.length <= 10^5
s contains only lowercase English letters.

Hint 1: Notice that it's impossible for any two valid substrings to overlap unless one is inside another.
Hint 2: We can start by finding the starting and ending index for each character.
Hint 3: From these indices, we can form the substrings by expanding each character's range if necessary (if another character exists in the range with smaller/larger starting/ending index).
Hint 4: Sort the valid substrings by length and greedily take those with the smallest length, discarding the ones that overlap those we took.

</> Typescript code:
*/

function maxNumOfSubstrings(s: string): string[] {
  // Cache string length for first/last tables and interval scans.
  const n = s.length;
  // Store first occurrence of each lowercase letter.
  const first = new Int32Array(26).fill(n);
  // Store last occurrence of each lowercase letter.
  const last = new Int32Array(26).fill(-1);
  // Record boundary positions in one linear pass.
  for (let i = 0; i < n; i++) {
    // Map current character to 0-25.
    const c = s.charCodeAt(i) - 97;
    // Keep earliest index for this character.
    if (i < first[c]) first[c] = i;
    // Keep latest index for this character.
    last[c] = i;
  }
  // Collect minimal valid intervals, at most one per letter.
  const segs: Array<[number, number]> = [];
  // Try each present character as an interval anchor.
  for (let c = 0; c < 26; c++) {
    // Skip absent letters.
    if (last[c] === -1) continue;
    // Start from first occurrence.
    let l = first[c];
    // Expandable right boundary from last occurrence.
    let r = last[c];
    // Assume valid until a left violation appears.
    let ok = true;
    // Scan enclosed range, extending right when needed.
    for (let i = l; i <= r; i++) {
      // Map enclosed character to 0-25.
      const d = s.charCodeAt(i) - 97;
      // Needs a smaller start, so no valid interval starts here.
      if (first[d] < l) { ok = false; break; }
      // Extend interval to cover all occurrences.
      if (last[d] > r) r = last[d];
    }
    // Keep only intervals that never needed left expansion.
    if (ok) segs.push([l, r]);
  }
  // Process smallest intervals first for max count and min total length.
  segs.sort((a, b) => (a[1] - a[0]) - (b[1] - b[0]));
  // Hold pairwise non-overlapping chosen intervals.
  const picked: Array<[number, number]> = [];
  // Greedily take each interval that avoids overlap.
  for (const seg of segs) {
    // Assume disjoint until a conflict is found.
    let overlap = false;
    // Compare against already chosen intervals.
    for (const p of picked) {
      // Mark overlap when ranges intersect.
      if (!(seg[1] < p[0] || seg[0] > p[1])) { overlap = true; break; }
    }
    // Keep disjoint interval.
    if (!overlap) picked.push(seg);
  }
  // Allocate output array for chosen substrings.
  const ans: string[] = new Array(picked.length);
  // Materialize each interval as a substring.
  for (let i = 0; i < picked.length; i++) ans[i] = s.slice(picked[i][0], picked[i][1] + 1);
  // Return substrings in any order.
  return ans;
}
