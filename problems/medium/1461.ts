/*
1461. Check If a String Contains All Binary Codes of Size K

Given a binary string s and an integer k, return true if every binary code of length k is a substring of s. Otherwise, return false.

Example 1:
Input: s = "00110110", k = 2
Output: true
Explanation: The binary codes of length 2 are "00", "01", "10" and "11". They can be all found as substrings at indices 0, 1, 3 and 2 respectively.

Example 2:
Input: s = "0110", k = 1
Output: true
Explanation: The binary codes of length 1 are "0" and "1", it is clear that both exist as a substring. 

Example 3:
Input: s = "0110", k = 2
Output: false
Explanation: The binary code "00" is of length 2 and does not exist in the array.

Constraints:
1 <= s.length <= 5 * 10^5
s[i] is either '0' or '1'.
1 <= k <= 20

</> Typescript code:
*/

function hasAllCodes(s: string, k: number): boolean {
  // Calculate 2^k using bitwise shift; this is the number of unique binary codes needed.
  const totalRequired = 1 << k;

  // Quick exit: if the string is too short to possibly contain all unique codes, return false.
  if (s.length < totalRequired + k - 1) return false;

  // Use Uint8Array for memory efficiency over a Set or a standard Boolean array.
  const seen = new Uint8Array(totalRequired);
  // Track how many unique codes we have encountered so far.
  let count = 0;
  // Store the integer representation of the current sliding window of length k.
  let currentHash = 0;
  // A bitmask (e.g., for k=3, mask is 111 in binary) to keep the hash within k bits.
  const mask = totalRequired - 1;

  for (let i = 0; i < s.length; i++) {
    // Shift left, apply mask to remove the bit falling out of the window, and add the new bit.
    currentHash = ((currentHash << 1) & mask) | (s[i] === "1" ? 1 : 0);

    // Once the index reaches k-1, we have our first valid window of size k.
    if (i >= k - 1) {
      // If this integer code has not been seen before:
      if (seen[currentHash] === 0) {
        // Mark as seen.
        seen[currentHash] = 1;
        // Increment our unique counter.
        count++;
        // If we've found every possible code, we can return true immediately.
        if (count === totalRequired) return true;
      }
    }
  }

  // If the loop finishes without finding all codes, return false.
  return false;
}
