/*
2264. Largest 3-Same-Digit Number in String

You are given a string num representing a large integer. An integer is good if it meets the following conditions:
It is a substring of num with length 3.
It consists of only one unique digit.
Return the maximum good integer as a string or an empty string "" if no such integer exists.

Note:
A substring is a contiguous sequence of characters within a string.
There may be leading zeroes in num or a good integer.

Example 1:
Input: num = "6777133339"
Output: "777"
Explanation: There are two distinct good integers: "777" and "333".
"777" is the largest, so we return "777".

Example 2:
Input: num = "2300019"
Output: "000"
Explanation: "000" is the only good integer.

Example 3:
Input: num = "42352338"
Output: ""
Explanation: No substring of length 3 consists of only one unique digit. Therefore, there are no good integers.

Constraints:
3 <= num.length <= 1000
num only consists of digits.

</> Typescript code:
*/

function largestGoodInteger(num: string): string {
    // Track the highest digit found in any valid 3-same-digit sequence
    let maxDigit = '';
    
    // Iterate through all possible starting positions for 3-character substrings
    for (let i = 0; i <= num.length - 3; i++) {
        // Check if current position and next two positions have the same digit
        if (num[i] === num[i + 1] && num[i] === num[i + 2]) {
            // If this digit is larger than our current maximum, update maxDigit
            // String comparison works for single digits since '9' > '8' > ... > '0'
            if (num[i] > maxDigit) {
                maxDigit = num[i];
            }
        }
    }
    
    // If we found at least one valid sequence, return it repeated 3 times
    // Otherwise return empty string
    return maxDigit ? maxDigit.repeat(3) : '';
}
