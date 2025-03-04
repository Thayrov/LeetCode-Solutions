/* 
1780. Check if Number is a Sum of Powers of Three

Given an integer n, return true if it is possible to represent n as the sum of distinct powers of three. Otherwise, return false.

An integer y is a power of three if there exists an integer x such that y == 3x.

Example 1:
Input: n = 12
Output: true
Explanation: 12 = 31 + 32

Example 2:
Input: n = 91
Output: true
Explanation: 91 = 30 + 32 + 34

Example 3:
Input: n = 21
Output: false

Constraints:
1 <= n <= 107

</> Typescript code:
*/

function checkPowersOfThree(n: number): boolean {
  // Loop until n becomes 0.
  while (n > 0) {
    // Check if the remainder when dividing n by 3 is 2.
    // If it is, it means n cannot be represented as the sum of distinct powers of 3.
    if (n % 3 === 2) {
      return false;
    }
    // Divide n by 3 and take the floor to move to the next "digit" in base 3.
    n = Math.floor(n / 3);
  }
  // If the loop completes without finding a remainder of 2, it means n can be represented as the sum of distinct powers of 3.
  return true;
}
