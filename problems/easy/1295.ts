/* 
1295. Find Numbers with Even Number of Digits

Given an array nums of integers, return how many of them contain an even number of digits.

Example 1:
Input: nums = [12,345,2,6,7896]
Output: 2
Explanation: 
12 contains 2 digits (even number of digits). 
345 contains 3 digits (odd number of digits). 
2 contains 1 digit (odd number of digits). 
6 contains 1 digit (odd number of digits). 
7896 contains 4 digits (even number of digits). 
Therefore only 12 and 7896 contain an even number of digits.

Example 2:
Input: nums = [555,901,482,1771]
Output: 1 
Explanation: 
Only 1771 contains an even number of digits.
 
Constraints:
1 <= nums.length <= 500
1 <= nums[i] <= 10^5

</> Typescript code:
*/

function findNumbers(nums: number[]): number {
  // Initialize counter for even-digit numbers
  let count = 0;
  // Loop through each number in the array
  for (let n of nums) {
    // Check if the number has 2, 4, or 6 digits via numeric ranges
    if (
      (n >= 10 && n <= 99) || // 2-digit numbers (10–99)
      (n >= 1000 && n <= 9999) || // 4-digit numbers (1000–9999)
      n === 100000 // 6-digit number (100000)
    ) {
      count++; // Increment if even-digit
    }
  }
  // Return the count of numbers with even number of digits
  return count;
}
