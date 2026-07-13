/*
1291. Sequential Digits

Hint
An integer has sequential digits if and only if each digit in the number is one more than the previous digit.
Return a sorted list of all the integers in the range [low, high] inclusive that have sequential digits.

Example 1:
Input: low = 100, high = 300
Output: [123,234]

Example 2:
Input: low = 1000, high = 13000
Output: [1234,2345,3456,4567,5678,6789,12345]

Constraints:
10 <= low <= high <= 10^9

</> Typescript code:
*/

// Declares the function and returns all sequential-digit numbers in the range.
function sequentialDigits(low: number, high: number): number[] {
  // Stores every possible non-zero digit in sequential order.
  const digits = "123456789";

  // Stores the valid sequential-digit numbers in ascending order.
  const result: number[] = [];

  // Tries every possible sequential-digit length from 2 through 9.
  for (let length = 2; length <= 9; length++) {
    // Tries every valid starting position for the current length.
    for (let start = 0; start + length <= 9; start++) {
      // Extracts a sequential substring and converts it into a number.
      const value = Number(digits.slice(start, start + length));

      // Stops because every following generated number will be larger.
      if (value > high) return result;

      // Adds the number when it lies inside the requested range.
      if (value >= low) result.push(value);
    }
  }

  // Returns all valid numbers in ascending order.
  return result;
}
