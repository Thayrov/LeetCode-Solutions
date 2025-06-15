/*
1432. Max Difference You Can Get From Changing an Integer

You are given an integer num. You will apply the following steps to num two separate times:
Pick a digit x (0 <= x <= 9).
Pick another digit y (0 <= y <= 9). Note y can be equal to x.
Replace all the occurrences of x in the decimal representation of num by y.
Let a and b be the two results from applying the operation to num independently.
Return the max difference between a and b.
Note that neither a nor b may have any leading zeros, and must not be 0.

Example 1:
Input: num = 555
Output: 888
Explanation: The first time pick x = 5 and y = 9 and store the new integer in a.
The second time pick x = 5 and y = 1 and store the new integer in b.
We have now a = 999 and b = 111 and max difference = 888

Example 2:
Input: num = 9
Output: 8
Explanation: The first time pick x = 9 and y = 9 and store the new integer in a.
The second time pick x = 9 and y = 1 and store the new integer in b.
We have now a = 9 and b = 1 and max difference = 8
 
Constraints:
1 <= num <= 10^8

</> Typescript code:
*/

function maxDiff(num: number): number {
  // Convert the input number to a string for easier digit manipulation.
  const s = String(num);
  // Initialize a string variable to store the number that will result in the maximum value ('a').
  let maxStr = "";
  // Initialize a string variable to store the number that will result in the minimum value ('b').
  let minStr = "";

  // --- Calculate maxStr (to get the largest possible number) ---
  // This logic aims to transform the number into its largest possible variant by replacing a digit with '9'.
  // Initialize a variable to hold the digit that will be replaced.
  let charToReplaceForMax = "";
  // Iterate through the digits of the number string from left to right.
  for (let i = 0; i < s.length; i++) {
    // Find the first digit that is not '9'. This is the optimal digit to change to '9' to maximize the number.
    if (s[i] !== "9") {
      charToReplaceForMax = s[i];
      // Once found, break the loop as we only need the first such digit.
      break;
    }
  }
  // If 'charToReplaceForMax' is still empty, it means all digits in the original number were already '9'.
  if (charToReplaceForMax === "") {
    // In this scenario, the maximum number is the original number itself.
    maxStr = s;
  } else {
    // Otherwise, replace all occurrences of the identified digit ('charToReplaceForMax') with '9'.
    // A RegExp is used with 'g' flag to replace all occurrences globally.
    maxStr = s.replace(new RegExp(charToReplaceForMax, "g"), "9");
  }

  // --- Calculate minStr (to get the smallest possible number) ---
  // This logic aims to transform the number into its smallest possible variant by replacing a digit with '0' or '1'.
  // Initialize variables to hold the digit to be replaced and its replacement value.
  let charToReplaceForMin = "";
  let replacementForMin = "";

  // Iterate through the digits of the number string from left to right.
  for (let i = 0; i < s.length; i++) {
    // Special handling for the first digit to avoid leading zeros.
    if (i === 0) {
      // If the first digit is not '1', we want to change it to '1' to minimize it.
      // This is because changing it to '0' would create a leading zero (unless it's a single digit '0', which is ruled out by constraints).
      if (s[i] !== "1") {
        charToReplaceForMin = s[i];
        replacementForMin = "1";
        // Once found, break the loop.
        break;
      }
    } else {
      // For subsequent digits (not the first one):
      // If the digit is neither '0' nor '1', we want to change it to '0' to minimize the number.
      // Changing it to '0' is allowed for non-leading digits.
      if (s[i] !== "0" && s[i] !== "1") {
        charToReplaceForMin = s[i];
        replacementForMin = "0";
        // Once found, break the loop.
        break;
      }
    }
  }

  // After iterating, check if a digit was found to replace for minimization.
  if (charToReplaceForMin === "") {
    // If 'charToReplaceForMin' is still empty, it implies that the number's digits are
    // composed entirely of '1's (if the first digit) and '0's or '1's for subsequent digits (e.g., "101", "111", "100").
    // In such cases, the number is already in its minimal form according to the problem's rules (no leading zeros, not 0).
    // Therefore, the minimum string is the original string itself.
    minStr = s;
  } else {
    // Otherwise, replace all occurrences of the identified digit ('charToReplaceForMin') with its determined replacement value ('replacementForMin').
    minStr = s.replace(new RegExp(charToReplaceForMin, "g"), replacementForMin);
  }

  // Convert the resulting maximum and minimum strings back to integers.
  const a = parseInt(maxStr);
  const b = parseInt(minStr);

  // Return the absolute difference between the two numbers.
  return a - b;
}
