/*
3483. Unique 3-Digit Even Numbers

You are given an array of digits called digits. Your task is to determine the number of distinct three-digit even numbers that can be formed using these digits.

Note: Each copy of a digit can only be used once per number, and there may not be leading zeros.

Example 1:
Input: digits = [1,2,3,4]
Output: 12
Explanation: The 12 distinct 3-digit even numbers that can be formed are 124, 132, 134, 142, 214, 234, 312, 314, 324, 342, 412, and 432. Note that 222 cannot be formed because there is only 1 copy of the digit 2.

Example 2:
Input: digits = [0,2,2]
Output: 2
Explanation: The only 3-digit even numbers that can be formed are 202 and 220. Note that the digit 2 can be used twice because it appears twice in the array.

Example 3:
Input: digits = [6,6,6]
Output: 1
Explanation: Only 666 can be formed.

Example 4:
Input: digits = [1,3,5]
Output: 0
Explanation: No even 3-digit numbers can be formed.

Constraints:
3 <= digits.length <= 10
0 <= digits[i] <= 9

</> Typescript code:
*/

function totalNumbers(digits: number[]): number {
  // Count the available copies of every decimal digit.
  const count = new Uint8Array(10);
  // Record each input digit in the fixed-size frequency table.
  for (const digit of digits) count[digit]++;

  // Accumulate the number of distinct feasible values.
  let total = 0;
  // Choose a nonzero hundreds digit so the number has three digits.
  for (let hundreds = 1; hundreds <= 9; hundreds++) {
    // Skip hundreds digits that are unavailable.
    if (count[hundreds] === 0) continue;
    // Reserve one copy for the hundreds place.
    count[hundreds]--;

    // Choose every possible tens digit once.
    for (let tens = 0; tens <= 9; tens++) {
      // Skip tens digits with no unreserved copy.
      if (count[tens] === 0) continue;
      // Reserve one copy for the tens place.
      count[tens]--;

      // Try each even units digit to guarantee an even number.
      for (let units = 0; units <= 8; units += 2) {
        // Count the value when an unreserved units copy remains.
        if (count[units] > 0) total++;
      }

      // Restore the tens digit for the next choice.
      count[tens]++;
    }

    // Restore the hundreds digit for the next choice.
    count[hundreds]++;
  }

  // Return the number of distinct constructible values.
  return total;
}
