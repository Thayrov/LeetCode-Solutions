/*
788. Rotated Digits

An integer x is a good if after rotating each digit individually by 180 degrees, we get a valid number that is different from x. Each digit must be rotated - we cannot choose to leave it alone.
A number is valid if each digit remains a digit after rotation. For example:
0, 1, and 8 rotate to themselves,
2 and 5 rotate to each other (in this case they are rotated in a different direction, in other words, 2 or 5 gets mirrored),
6 and 9 rotate to each other, and
the rest of the numbers do not rotate to any other number and become invalid.
Given an integer n, return the number of good integers in the range [1, n].

Example 1:
Input: n = 10
Output: 4
Explanation: There are four good numbers in the range [1, 10] : 2, 5, 6, 9.
Note that 1 and 10 are not good numbers, since they remain unchanged after rotating.

Example 2:
Input: n = 1
Output: 0

Example 3:
Input: n = 2
Output: 1

Constraints:
1 <= n <= 10^4

</> Typescript code:
*/

function rotatedDigits(n: number): number {
  // Stores how many integers in [1, n] are good after rotation.
  let ans = 0;

  // Checks every number from 1 through n.
  for (let x = 1; x <= n; x++) {
    // Copies x so we can inspect its digits without losing the original value.
    let y = x;

    // Tracks whether at least one digit changes after rotation.
    let changed = false;

    // Tracks whether all digits are valid after rotation.
    let valid = true;

    // Processes each digit of y from right to left.
    while (y > 0) {
      // Gets the last digit of y.
      const d = y % 10;

      // Digits 3, 4, and 7 become invalid after rotation.
      if (d === 3 || d === 4 || d === 7) {
        // Marks the current number as invalid.
        valid = false;

        // Stops checking this number because one invalid digit is enough.
        break;
      }

      // Digits 2, 5, 6, and 9 rotate into a different digit.
      if (d === 2 || d === 5 || d === 6 || d === 9) {
        // Marks that the rotated number differs from the original.
        changed = true;
      }

      // Removes the last digit so the next iteration checks the next digit.
      y = Math.floor(y / 10);
    }

    // A number is good only if every digit is valid and at least one digit changes.
    if (valid && changed) ans++;
  }

  // Returns the total count of good numbers.
  return ans;
}
