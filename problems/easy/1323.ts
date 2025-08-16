/*
1323. Maximum 69 Number

You are given a positive integer num consisting only of digits 6 and 9.
Return the maximum number you can get by changing at most one digit (6 becomes 9, and 9 becomes 6).

Example 1:
Input: num = 9669
Output: 9969
Explanation: 
Changing the first digit results in 6669.
Changing the second digit results in 9969.
Changing the third digit results in 9699.
Changing the fourth digit results in 9666.
The maximum number is 9969.

Example 2:
Input: num = 9996
Output: 9999
Explanation: Changing the last digit 6 to 9 results in the maximum number.

Example 3:
Input: num = 9999
Output: 9999
Explanation: It is better not to apply any change.

Constraints:
1 <= num <= 10^4
num consists of only 6 and 9 digits.

</> Typescript code:
*/

function maximum69Number (num: number): number {
    // Convert the input number to its string representation to easily manipulate its digits.
    const numAsString = num.toString();

    // Replace the first '6' with a '9'. This works because to maximize the number,
    // we need to change the leftmost '6', and string.replace() targets the first occurrence.
    const newNumAsString = numAsString.replace('6', '9');

    // Convert the modified string back into a number and return it.
    return Number(newNumAsString);
};
