/*
2081. Sum of k-Mirror Numbers

A k-mirror number is a positive integer without leading zeros that reads the same both forward and backward in base-10 as well as in base-k.
For example, 9 is a 2-mirror number. The representation of 9 in base-10 and base-2 are 9 and 1001 respectively, which read the same both forward and backward.
On the contrary, 4 is not a 2-mirror number. The representation of 4 in base-2 is 100, which does not read the same both forward and backward.
Given the base k and the number n, return the sum of the n smallest k-mirror numbers.

Example 1:
Input: k = 2, n = 5
Output: 25
Explanation:
The 5 smallest 2-mirror numbers and their representations in base-2 are listed as follows:
  base-10    base-2
    1          1
    3          11
    5          101
    7          111
    9          1001
Their sum = 1 + 3 + 5 + 7 + 9 = 25. 

Example 2:
Input: k = 3, n = 7
Output: 499
Explanation:
The 7 smallest 3-mirror numbers are and their representations in base-3 are listed as follows:
  base-10    base-3
    1          1
    2          2
    4          11
    8          22
    121        11111
    151        12121
    212        21212
Their sum = 1 + 2 + 4 + 8 + 121 + 151 + 212 = 499.

Example 3:
Input: k = 7, n = 17
Output: 20379000
Explanation: The 17 smallest 7-mirror numbers are:
1, 2, 3, 4, 5, 6, 8, 121, 171, 242, 292, 16561, 65656, 2137312, 4602064, 6597956, 6958596
 
Constraints:
2 <= k <= 9
1 <= n <= 30

</> Typescript code:
*/

/**
 * Calculates the sum of the first n k-mirror numbers.
 * A k-mirror number is a positive integer that is palindromic in base-10 and base-k.
 * @param k The base to check for palindromicity, in addition to base-10.
 * @param n The number of k-mirror numbers to find and sum.
 * @returns The sum of the n smallest k-mirror numbers.
 */
function kMirror(k: number, n: number): number {
  // Use BigInt for the sum to prevent overflow, as the numbers can get very large.
  let sum = 0n;
  // Keep track of how many k-mirror numbers have been found.
  let count = 0;
  // Start by generating base-10 palindromes of length 1.
  let len = 1;

  /**
   * A helper function to check if a given BigInt is a palindrome in base-k.
   * @param num The number to check.
   * @returns True if the number's base-k representation is a palindrome, false otherwise.
   */
  const isBaseKPalindrome = (num: bigint): boolean => {
    let baseKStr = "";
    // Handle the edge case of the number being zero.
    if (num === 0n) {
      baseKStr = "0";
    } else {
      // Create a temporary variable to not modify the original number.
      let tempNum = num;
      // Convert the numeric base to a BigInt for calculations.
      const bigK = BigInt(k);
      // Convert the number to a base-k string by repeatedly taking the modulo and dividing.
      while (tempNum > 0n) {
        // Prepend the remainder to the string.
        baseKStr = (tempNum % bigK).toString() + baseKStr;
        // Perform integer division.
        tempNum /= bigK;
      }
    }
    // Check if the resulting base-k string is a palindrome using a two-pointer approach.
    for (let i = 0, j = baseKStr.length - 1; i < j; i++, j--) {
      // If any characters don't match, it's not a palindrome.
      if (baseKStr[i] !== baseKStr[j]) {
        return false;
      }
    }
    // If the loop completes, the string is a palindrome.
    return true;
  };

  // Loop until we have found the required number (n) of k-mirror numbers.
  while (count < n) {
    // Determine the length of the "first half" of the palindrome we are generating.
    const halfLen = Math.ceil(len / 2);
    // Calculate the starting number for the first half (e.g., for half-length 2, start is 10).
    const start = Math.pow(10, halfLen - 1);
    // Calculate the ending number for the first half (e.g., for half-length 2, end is 99).
    const end = Math.pow(10, halfLen) - 1;

    // Iterate through all possible "first half" numbers to construct palindromes.
    for (let i = start; i <= end; i++) {
      // Convert the first half number to a string.
      const firstHalf = i.toString();
      // Construct the second half by reversing the first half.
      const secondHalf =
        len % 2 === 0
          ? // For even length palindromes, reverse the entire first half. (e.g., 12 -> 21)
            firstHalf.split("").reverse().join("")
          : // For odd length palindromes, reverse all but the last character. (e.g., 12 -> 1)
            firstHalf.slice(0, -1).split("").reverse().join("");

      // Concatenate the two halves to form the full palindrome string.
      // Create a BigInt from the palindrome string.
      const palindromeNum = BigInt(firstHalf + secondHalf);

      // Check if this base-10 palindrome is also a palindrome in base-k.
      if (isBaseKPalindrome(palindromeNum)) {
        // If it is, add it to our sum.
        sum += palindromeNum;
        // Increment the count of found numbers.
        count++;
        // If we have found n numbers, we are done.
        if (count === n) {
          // Return the total sum, converted back to a standard number.
          return Number(sum);
        }
      }
    }
    // Move on to generating palindromes of the next length.
    len++;
  }

  // This is theoretically unreachable if n > 0 but required for type safety.
  return Number(sum);
}
