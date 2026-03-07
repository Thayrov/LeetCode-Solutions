/*
1888. Minimum Number of Flips to Make the Binary String Alternating

You are given a binary string s. You are allowed to perform two types of operations on the string in any sequence:
Type-1: Remove the character at the start of the string s and append it to the end of the string.
Type-2: Pick any character in s and flip its value, i.e., if its value is '0' it becomes '1' and vice-versa.
Return the minimum number of type-2 operations you need to perform such that s becomes alternating.
The string is called alternating if no two adjacent characters are equal.
For example, the strings "010" and "1010" are alternating, while the string "0100" is not.

Example 1:
Input: s = "111000"
Output: 2
Explanation: Use the first operation two times to make s = "100011".
Then, use the second operation on the third and sixth elements to make s = "101010".

Example 2:
Input: s = "010"
Output: 0
Explanation: The string is already alternating.

Example 3:
Input: s = "1110"
Output: 1
Explanation: Use the second operation on the second element to make s = "1010".

Constraints:
1 <= s.length <= 10^5
s[i] is either '0' or '1'.

</> Typescript code:
*/

function minFlips(s: string): number {
  const n = s.length;
  // Type-1 operations (rotations) are simulated by doubling the string to handle circular shifts via a sliding window.
  const doubled = s + s;
  // diff0 tracks flips needed to match pattern '0101...'
  let diff0 = 0;
  // diff1 tracks flips needed to match pattern '1010...'
  let diff1 = 0;
  // Initialize result with the maximum possible flips (the length of the string).
  let minFlips = n;

  // Iterate through the doubled string up to 2*n to cover all rotational windows of size n.
  for (let i = 0; i < 2 * n; i++) {
    // Increment diff counts if current character doesn't match the expected bit in the alternating patterns.
    if (doubled[i] !== (i % 2 === 0 ? "0" : "1")) diff0++;
    if (doubled[i] !== (i % 2 === 0 ? "1" : "0")) diff1++;

    // Once the index exceeds the original length, we slide the window by removing the element that left the window.
    if (i >= n) {
      // If the character that is now outside the window (at i - n) was a mismatch, decrement the diff counters.
      if (doubled[i - n] !== ((i - n) % 2 === 0 ? "0" : "1")) diff0--;
      if (doubled[i - n] !== ((i - n) % 2 === 0 ? "1" : "0")) diff1--;
    }

    // Once the first full window of size n is reached, start tracking the minimum flips found so far.
    if (i >= n - 1) {
      // The answer is the minimum of flips required for either of the two alternating patterns across all rotations.
      minFlips = Math.min(minFlips, diff0, diff1);
    }
  }

  return minFlips;
}
