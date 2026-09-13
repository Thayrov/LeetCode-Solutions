/*
835. Image Overlap

You are given two images, img1 and img2, represented as binary, square matrices of size n x n. A binary matrix has only 0s and 1s as values.

We translate one image however we choose by sliding all the 1 bits left, right, up, and/or down any number of units. We then place it on top of the other image. We can then calculate the overlap by counting the number of positions that have a 1 in both images.

Note also that a translation does not include any kind of rotation. Any 1 bits that are translated outside of the matrix borders are erased.

Return the largest possible overlap.

Example 1:
Input: img1 = [[1,1,0],[0,1,0],[0,1,0]], img2 = [[0,0,0],[0,1,1],[0,0,1]]
Output: 3
Explanation:
We translate img1 to right by 1 unit and down by 1 unit.

The number of positions that have a 1 in both images is 3 (shown in red).

Example 2:
Input: img1 = [[1]], img2 = [[1]]
Output: 1

Example 3:
Input: img1 = [[0]], img2 = [[0]]
Output: 0

Constraints:
1 <= n == img1.length == img1[i].length <= 30
1 <= n == img2.length == img2[i].length <= 30
img1[i][j] is either 0 or 1.
img2[i][j] is either 0 or 1.

</> Typescript code:
*/

function largestOverlap(img1: number[][], img2: number[][]): number {
  // Cache the side length of the square images.
  const n = img1.length;
  // Store each image row as a compact bitmask.
  const rows1 = new Int32Array(n);
  const rows2 = new Int32Array(n);

  // Encode both images row by row.
  for (let r = 0; r < n; r++) {
    // Start each row mask empty.
    let mask1 = 0;
    let mask2 = 0;
    // Put column c into bit c of each mask.
    for (let c = 0; c < n; c++) {
      // Encode the corresponding bit from img1.
      mask1 |= img1[r][c] << c;
      // Encode the corresponding bit from img2.
      mask2 |= img2[r][c] << c;
    }
    // Save the encoded rows for translation comparisons.
    rows1[r] = mask1;
    rows2[r] = mask2;
  }

  // Count set bits using constant-time 32-bit bit operations.
  const popcount = (value: number): number => {
    // Combine adjacent pairs of bits.
    value -= (value >>> 1) & 0x55555555;
    // Combine adjacent groups of four bits.
    value = (value & 0x33333333) + ((value >>> 2) & 0x33333333);
    // Sum each byte and return the total bit count.
    return (((value + (value >>> 4)) & 0x0f0f0f0f) * 0x01010101) >>> 24;
  };

  // Track the greatest overlap found for any translation.
  let best = 0;
  // Enumerate every possible vertical translation of img1.
  for (let dr = 1 - n; dr < n; dr++) {
    // Limit row indices to the part that remains inside img2.
    const rowStart = dr < 0 ? -dr : 0;
    const rowEnd = dr < 0 ? n : n - dr;
    // Enumerate every possible horizontal translation of img1.
    for (let dc = 1 - n; dc < n; dc++) {
      // Keep only bits that will remain in bounds before shifting left.
      const mask = dc > 0 ? (1 << (n - dc)) - 1 : 0;
      // Accumulate the overlap for this translation.
      let overlap = 0;
      // Compare every pair of vertically aligned rows.
      for (let r = rowStart; r < rowEnd; r++) {
        // Shift without allowing left shifts to wrap around 32 bits.
        const shifted = dc > 0 ? (rows1[r] & mask) << dc : rows1[r] >>> -dc;
        // Count the set bits shared with the corresponding img2 row.
        overlap += popcount(shifted & rows2[r + dr]);
      }
      // Retain the best overlap across all translations.
      if (overlap > best) best = overlap;
    }
  }
  // Return the maximum valid overlap.
  return best;
}
