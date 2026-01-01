/*
66. Plus One

You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.
Increment the large integer by one and return the resulting array of digits.

Example 1:
Input: digits = [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.
Incrementing by one gives 123 + 1 = 124.
Thus, the result should be [1,2,4].

Example 2:
Input: digits = [4,3,2,1]
Output: [4,3,2,2]
Explanation: The array represents the integer 4321.
Incrementing by one gives 4321 + 1 = 4322.
Thus, the result should be [4,3,2,2].

Example 3:
Input: digits = [9]
Output: [1,0]
Explanation: The array represents the integer 9.
Incrementing by one gives 9 + 1 = 10.
Thus, the result should be [1,0].

Constraints:
1 <= digits.length <= 100
0 <= digits[i] <= 9
digits does not contain any leading 0's.

</> Typescript code:
*/

function plusOne(digits: number[]): number[] {
    // Iterate from the last element (least significant digit) to the first
    for (let i = digits.length - 1; i >= 0; i--) {
        // If the current digit is less than 9, we can increment and return immediately
        if (digits[i] < 9) {
            digits[i]++; // Increment the digit by 1
            return digits; // No carry needed further, return the modified array
        }
        // If the digit is 9, it becomes 0 and we continue to the next significant digit
        digits[i] = 0;
    }

    // If the loop finishes, it means all digits were 9 (e.g., [9, 9, 9])
    // We need to add a 1 at the beginning of the array (e.g., [1, 0, 0, 0])
    digits.unshift(1);
    return digits;
}
