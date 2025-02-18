/* 
2375. Construct Smallest Number From DI String

You are given a 0-indexed string pattern of length n consisting of the characters 'I' meaning increasing and 'D' meaning decreasing.

A 0-indexed string num of length n + 1 is created using the following conditions:

num consists of the digits '1' to '9', where each digit is used at most once.
If pattern[i] == 'I', then num[i] < num[i + 1].
If pattern[i] == 'D', then num[i] > num[i + 1].
Return the lexicographically smallest possible string num that meets the conditions.

Example 1:
Input: pattern = "IIIDIDDD"
Output: "123549876"
Explanation:
At indices 0, 1, 2, and 4 we must have that num[i] < num[i+1].
At indices 3, 5, 6, and 7 we must have that num[i] > num[i+1].
Some possible values of num are "245639871", "135749862", and "123849765".
It can be proven that "123549876" is the smallest possible num that meets the conditions.
Note that "123414321" is not possible because the digit '1' is used more than once.

Example 2:
Input: pattern = "DDD"
Output: "4321"
Explanation:
Some possible values of num are "9876", "7321", and "8742".
It can be proven that "4321" is the smallest possible num that meets the conditions.

Constraints:
1 <= pattern.length <= 8
pattern consists of only the letters 'I' and 'D'.

</> Typescript Code:
*/

function smallestNumber(pattern: string): string {
  // Initialize an empty string to accumulate the final result.
  let result = '';
  // Create a stack to temporarily store numbers.
  let stack: number[] = [];
  // Iterate from 0 to the length of pattern (inclusive) to cover all digits.
  for (let i = 0; i <= pattern.length; i++) {
    // Add the current number (i+1) into the stack.
    stack.push(i + 1);
    // If we've reached the end of the pattern or the current pattern character is 'I',
    // it's time to pop all numbers from the stack.
    if (i === pattern.length || pattern[i] === 'I') {
      // Pop all numbers from the stack and append them to the result.
      while (stack.length) {
        result += stack.pop();
      }
    }
  }
  // Return the constructed lexicographically smallest number string.
  return result;
}
