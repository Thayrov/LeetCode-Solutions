/*
3713. Longest Balanced Substring I

You are given a string s consisting of lowercase English letters.
A substring of s is called balanced if all distinct characters in the substring appear the same number of times.
Return the length of the longest balanced substring of s.

Example 1:
Input: s = "abbac"
Output: 4
Explanation:
The longest balanced substring is "abba" because both distinct characters 'a' and 'b' each appear exactly 2 times.

Example 2:
Input: s = "zzabccy"
Output: 4
Explanation:
The longest balanced substring is "zabc" because the distinct characters 'z', 'a', 'b', and 'c' each appear exactly 1 time.​​​​​​​

Example 3:
Input: s = "aba"
Output: 2
Explanation:
​​​​​​​One of the longest balanced substrings is "ab" because both distinct characters 'a' and 'b' each appear exactly 1 time. Another longest balanced substring is "ba".

Constraints:
1 <= s.length <= 1000
s consists of lowercase English letters.

</> Typescript code:
*/

function longestBalanced(s: string): number {
  // Cache the string length for faster repeated access.
  const n = s.length;
  // ASCII code for 'a' to convert chars to indices [0..25].
  const base = 97;
  // Track the maximum balanced substring length found so far.
  let best = 0;
  // Try every possible left boundary of a substring.
  for (let l = 0; l < n; l++) {
    // If remaining length cannot beat current best, stop early.
    if (n - l <= best) break;
    // charCount[c] = occurrences of character c in current window [l..r].
    const charCount = new Int16Array(26);
    // freqCount[f] = how many distinct characters currently appear exactly f times.
    const freqCount = new Int16Array(n + 1);
    // Number of positive frequency values that are currently present.
    let activeFreqValues = 0;
    // Expand the right boundary one character at a time.
    for (let r = l; r < n; r++) {
      // Convert current character to 0-based alphabet index.
      const idx = s.charCodeAt(r) - base;
      // Read previous count of this character before adding s[r].
      const prev = charCount[idx];
      // New count after adding s[r].
      const next = prev + 1;
      // If the character was already present, it leaves frequency bucket "prev".
      if (prev > 0) {
        // Decrease amount of chars at frequency prev; if bucket becomes empty, active frequencies drop by 1.
        if (--freqCount[prev] === 0) activeFreqValues--;
      }
      // Character enters frequency bucket "next"; if bucket was empty, active frequencies increase by 1.
      if (freqCount[next]++ === 0) activeFreqValues++;
      // Persist updated character count.
      charCount[idx] = next;
      // Balanced window condition: all distinct chars share one identical positive frequency.
      if (activeFreqValues === 1) {
        // Current window length.
        const len = r - l + 1;
        // Update global best if current balanced window is longer.
        if (len > best) best = len;
      }
    }
  }
  // Return the longest balanced substring length.
  return best;
}
