/*
67. Add Binary

Given two binary strings a and b, return their sum as a binary string.

Example 1:
Input: a = "11", b = "1"
Output: "100"

Example 2:
Input: a = "1010", b = "1011"
Output: "10101"

Constraints:
1 <= a.length, b.length <= 10^4
a and b consist only of '0' or '1' characters.
Each string does not contain leading zeros except for the zero itself.

</> Typescript code:
*/

function addBinary(a: string, b: string): string {
  // Define the function that returns the binary sum string.
  let i = a.length - 1; // Start pointer i at the last character of a (least significant bit).
  let j = b.length - 1; // Start pointer j at the last character of b (least significant bit).
  let k = Math.max(a.length, b.length); // Set write index to the end position of the preallocated result buffer.
  const out = new Array<string>(k + 1); // Preallocate result buffer with one extra slot for a possible final carry.
  let carry = 0; // Initialize carry to 0 before processing digits.
  while (i >= 0 || j >= 0) {
    // Keep processing while at least one string still has digits left.
    let sum = carry; // Begin current column sum with incoming carry.
    if (i >= 0) sum += a.charCodeAt(i--) & 1; // Add current bit from a (ASCII parity gives 0/1) and move i left.
    if (j >= 0) sum += b.charCodeAt(j--) & 1; // Add current bit from b (ASCII parity gives 0/1) and move j left.
    out[k--] = (sum & 1) === 1 ? "1" : "0"; // Write resulting bit for this column, then move write index left.
    carry = sum >> 1; // Compute next carry (0 or 1) from the column sum.
  } // End per-column addition loop.
  if (carry === 1)
    out[k] = "1"; // If one carry remains, write it into the extra leading slot.
  else k++; // If no carry remains, advance k so slicing skips the unused leading slot.
  return out.slice(k).join(""); // Return only the filled portion of the buffer as the final binary string.
} // End function definition.
