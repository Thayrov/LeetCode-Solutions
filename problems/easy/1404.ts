/*
1404. Number of Steps to Reduce a Number in Binary Representation to One

Given the binary representation of an integer as a string s, return the number of steps to reduce it to 1 under the following rules:
If the current number is even, you have to divide it by 2.
If the current number is odd, you have to add 1 to it.
It is guaranteed that you can always reach one for all test cases.

Example 1:
Input: s = "1101"
Output: 6
Explanation: "1101" corressponds to number 13 in their decimal representation.
Step 1) 13 is odd, add 1 and obtain 14.
Step 2) 14 is even, divide by 2 and obtain 7.
Step 3) 7 is odd, add 1 and obtain 8.
Step 4) 8 is even, divide by 2 and obtain 4.
Step 5) 4 is even, divide by 2 and obtain 2.
Step 6) 2 is even, divide by 2 and obtain 1.

Example 2:
Input: s = "10"
Output: 1
Explanation: "10" corressponds to number 2 in their decimal representation.
Step 1) 2 is even, divide by 2 and obtain 1.

Example 3:
Input: s = "1"
Output: 0

Constraints:
1 <= s.length <= 500
s consists of characters '0' or '1'
s[0] == '1'

</> Typescript Code:
*/

function numSteps(s: string): number {
  // Initialize the number of steps to 0
  let steps = 0;
  // Initialize carry to handle binary addition when encountering '1'
  let carry = 0;

  // Iterate from the end of the string towards the beginning
  for (let i = s.length - 1; i > 0; i--) {
    // Check if the current bit plus the carry is equal to 1 (odd)
    if (parseInt(s[i]) + carry === 1) {
      // If odd, we need to add 1 (which makes it even) and then divide by 2
      carry = 1; // Set carry to 1 for the next iteration
      steps += 2; // Two operations: add 1 and divide by 2
    } else {
      // If even, we just need to divide by 2
      steps += 1; // One operation: divide by 2
    }
  }

  // If there is a carry left, add one more step
  return steps + carry;
}
