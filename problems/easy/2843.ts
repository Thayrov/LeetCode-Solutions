/* 
2843. Count Symmetric Integers

You are given two positive integers low and high.

An integer x consisting of 2 * n digits is symmetric if the sum of the first n digits of x is equal to the sum of the last n digits of x. Numbers with an odd number of digits are never symmetric.

Return the number of symmetric integers in the range [low, high].

Example 1:
Input: low = 1, high = 100
Output: 9
Explanation: There are 9 symmetric integers between 1 and 100: 11, 22, 33, 44, 55, 66, 77, 88, and 99.

Example 2:
Input: low = 1200, high = 1230
Output: 4
Explanation: There are 4 symmetric integers between 1200 and 1230: 1203, 1212, 1221, and 1230.

Constraints:
1 <= low <= high <= 10^4

</> Typescript code:
*/

// Define a function to count symmetric integers in the given range [low, high]
function countSymmetricIntegers(low: number, high: number): number {
  // Initialize a counter to store the number of symmetric integers found.
  let count = 0;

  // Iterate over every integer x from low to high (inclusive)
  for (let x = low; x <= high; x++) {
    let digits: number; // Variable to hold the number of digits in x

    // Determine the digit count based on x's value.
    if (x < 10) digits = 1; // x is a single-digit number.
    else if (x < 100) digits = 2; // x is a two-digit number.
    else if (x < 1000) digits = 3; // x is a three-digit number.
    else if (x < 10000) digits = 4; // x is a four-digit number.
    else digits = 5; // x is a five-digit number (only 10000 in this constraint).

    // Skip processing if x has an odd number of digits, as it cannot be symmetric.
    if (digits % 2 !== 0) continue;

    // For a two-digit number, the symmetric condition is that both digits are the same.
    if (digits === 2) {
      // Extract the tens digit.
      const left = Math.floor(x / 10);
      // Extract the ones digit.
      const right = x % 10;
      // If both digits are equal, increment the symmetric integer counter.
      if (left === right) count++;
    }
    // For a four-digit number, symmetry means the sum of the first two digits equals the sum of the last two.
    else if (digits === 4) {
      // Extract the thousands digit.
      const a = Math.floor(x / 1000);
      // Extract the hundreds digit.
      const b = Math.floor((x % 1000) / 100);
      // Extract the tens digit.
      const c = Math.floor((x % 100) / 10);
      // Extract the ones digit.
      const d = x % 10;
      // If the sum of the first two digits equals the sum of the last two, count it.
      if (a + b === c + d) count++;
    }
  }
  // Return the total count of symmetric integers found in the given range.
  return count;
}
