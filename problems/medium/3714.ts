/*
3714. Longest Balanced Substring II

You are given a string s consisting only of the characters 'a', 'b', and 'c'.
A substring of s is called balanced if all distinct characters in the substring appear the same number of times.
Return the length of the longest balanced substring of s.

Example 1:
Input: s = "abbac"
Output: 4
Explanation:
The longest balanced substring is "abba" because both distinct characters 'a' and 'b' each appear exactly 2 times.

Example 2:
Input: s = "aabcc"
Output: 3
Explanation:
The longest balanced substring is "abc" because all distinct characters 'a', 'b' and 'c' each appear exactly 1 time.

Example 3:
Input: s = "aba"
Output: 2
Explanation:
One of the longest balanced substrings is "ab" because both distinct characters 'a' and 'b' each appear exactly 1 time. Another longest balanced substring is "ba".

Constraints:
1 <= s.length <= 10^5
s contains only the characters 'a', 'b', and 'c'.

</> Typescript code:
*/

function longestBalanced(s: string): number {
  // Store the input length once for O(1) reuse.
  const n = s.length;
  // Convert characters to compact numeric codes (a->0, b->1, c->2) for faster repeated passes.
  const chars = new Uint8Array(n);
  // Fill the numeric array using ASCII math.
  for (let i = 0; i < n; i++) chars[i] = s.charCodeAt(i) - 97;
  // Track the best balanced length found so far; at least 1 because n >= 1.
  let answer = 1;
  // Track current run length of equal characters (single-distinct-char substrings are balanced).
  let run = 1;
  // Scan runs to handle all one-character balanced substrings in O(n).
  for (let i = 1; i < n; i++) {
    // Extend run if current char equals previous one.
    if (chars[i] === chars[i - 1]) run++;
    // Otherwise restart run at current position.
    else run = 1;
    // Update global answer with the longest run.
    if (run > answer) answer = run;
  }
  // Helper for two-character balance inside segments that exclude one blocker character.
  const longestTwo = (x: number, blocker: number): number => {
    // Best length for this specific pair scenario.
    let best = 0;
    // Prefix difference count(x) - count(other non-blocker char) inside current segment.
    let diff = 0;
    // Earliest index where each diff first appears in current segment.
    const first = new Map<number, number>();
    // diff=0 exists before segment starts (virtual prefix index).
    first.set(0, -1);
    // Linear scan of the whole string.
    for (let i = 0; i < n; i++) {
      // Current encoded character.
      const ch = chars[i];
      // If blocker appears, no valid two-char substring can cross it.
      if (ch === blocker) {
        // Reset difference for next segment.
        diff = 0;
        // Drop previous segment states.
        first.clear();
        // Initialize new segment prefix base at current index.
        first.set(0, i);
        // Move to next character.
        continue;
      }
      // Update difference: +1 for x, -1 for the only other allowed char.
      if (ch === x) diff++;
      else diff--;
      // Check if this diff was seen before in the segment.
      const prev = first.get(diff);
      // Repeated diff means equal counts between prev+1..i.
      if (prev !== undefined) {
        // Candidate balanced length.
        const len = i - prev;
        // Keep the maximum for this pair.
        if (len > best) best = len;
      } else {
        // Store earliest occurrence to maximize future lengths.
        first.set(diff, i);
      }
    }
    // Return the best two-char balanced length for this setup.
    return best;
  };
  // Evaluate pair (a,b) with c blocked.
  const ab = longestTwo(0, 2);
  // Merge into global answer.
  if (ab > answer) answer = ab;
  // Evaluate pair (a,c) with b blocked.
  const ac = longestTwo(0, 1);
  // Merge into global answer.
  if (ac > answer) answer = ac;
  // Evaluate pair (b,c) with a blocked.
  const bc = longestTwo(1, 0);
  // Merge into global answer.
  if (bc > answer) answer = bc;
  // Prefix count of 'a'.
  let a = 0;
  // Prefix count of 'b'.
  let b = 0;
  // Prefix count of 'c'.
  let c = 0;
  // Offset to shift negative differences to non-negative coordinates.
  const offset = n;
  // Grid width for unique packing of two differences into one numeric key.
  const base = 2 * n + 1;
  // Earliest index for each packed state (a-b, a-c).
  const firstState = new Map<number, number>();
  // Initial state before processing any character.
  firstState.set(offset * base + offset, -1);
  // Scan once for three-character balance.
  for (let i = 0; i < n; i++) {
    // Current encoded character.
    const ch = chars[i];
    // Update the corresponding prefix counter.
    if (ch === 0) a++;
    // Update b counter when current char is 'b'.
    else if (ch === 1) b++;
    // Otherwise current char is 'c', so update c counter.
    else c++;
    // First invariant difference for equal-all-three detection.
    const d1 = a - b;
    // Second invariant difference for equal-all-three detection.
    const d2 = a - c;
    // Pack both differences into one numeric key for Map lookup.
    const key = (d1 + offset) * base + (d2 + offset);
    // Check if this state appeared earlier.
    const prev = firstState.get(key);
    // Same state means substring between indices has equal increments in a,b,c.
    if (prev !== undefined) {
      // Candidate length for balanced substring with all three chars equal.
      const len = i - prev;
      // Update global answer if larger.
      if (len > answer) answer = len;
    } else {
      // Store earliest occurrence to maximize future substring lengths.
      firstState.set(key, i);
    }
  }
  // Return the maximum balanced substring length across all valid distinct-char sets.
  return answer;
}
