/*
2566. Maximum Difference by Remapping a Digit

You are given an integer num. You know that Bob will sneakily remap one of the 10 possible digits (0 to 9) to another digit.
Return the difference between the maximum and minimum values Bob can make by remapping exactly one digit in num.

Notes:
When Bob remaps a digit d1 to another digit d2, Bob replaces all occurrences of d1 in num with d2.
Bob can remap a digit to itself, in which case num does not change.
Bob can remap different digits for obtaining minimum and maximum values respectively.
The resulting number after remapping can contain leading zeroes.
 
Example 1:
Input: num = 11891
Output: 99009
Explanation: 
To achieve the maximum value, Bob can remap the digit 1 to the digit 9 to yield 99899.
To achieve the minimum value, Bob can remap the digit 1 to the digit 0, yielding 890.
The difference between these two numbers is 99009.

Example 2:
Input: num = 90
Output: 99
Explanation:
The maximum value that can be returned by the function is 99 (if 0 is replaced by 9) and the minimum value that can be returned by the function is 0 (if 9 is replaced by 0).
Thus, we return 99.
 
Constraints:
1 <= num <= 10^8

</> Typescript code:
*/

function minMaxDifference(num: number): number {
  // Convert the input number to a string to easily manipulate its digits.
  const s = String(num);

  // --- Calculate the maximum possible value ---
  // Initialize maxS with the original number string.
  let maxS = s;
  // This variable will store the first digit (from left) that is not '9'.
  let digitToReplaceForMax = "";

  // Iterate through the digits of the number string to find the first digit that is not '9'.
  for (const char of s) {
    if (char !== "9") {
      digitToReplaceForMax = char;
      break; // Once found, break the loop as we only need the first one.
    }
  }

  // If a digit to replace was found (meaning the original number was not all '9's).
  if (digitToReplaceForMax !== "") {
    // Create a new string by replacing all occurrences of 'digitToReplaceForMax' with '9'.
    // RegExp is used for a global replacement.
    maxS = s.replace(new RegExp(digitToReplaceForMax, "g"), "9");
  }
  // If digitToReplaceForMax is empty, it means all digits were already '9', so maxS remains the original string.

  // --- Calculate the minimum possible value ---
  // Initialize minS with the original number string.
  let minS = s;
  // The digit to replace for the minimum value is always the first digit of the number.
  const digitToReplaceForMin = s[0];
  // Create a new string by replacing all occurrences of 'digitToReplaceForMin' with '0'.
  // RegExp is used for a global replacement.
  minS = s.replace(new RegExp(digitToReplaceForMin, "g"), "0");

  // Convert the modified strings back to numbers.
  const maxVal = parseInt(maxS);
  const minVal = parseInt(minS);

  // Return the difference between the maximum and minimum values.
  return maxVal - minVal;
}
