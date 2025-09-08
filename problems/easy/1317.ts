/*
1317. Convert Integer to the Sum of Two No-Zero Integers

No-Zero integer is a positive integer that does not contain any 0 in its decimal representation.
Given an integer n, return a list of two integers [a, b] where:
a and b are No-Zero integers.
a + b = n
The test cases are generated so that there is at least one valid solution. If there are many valid solutions, you can return any of them.

Example 1:
Input: n = 2
Output: [1,1]
Explanation: Let a = 1 and b = 1.
Both a and b are no-zero integers, and a + b = 2 = n.

Example 2:
Input: n = 11
Output: [2,9]
Explanation: Let a = 2 and b = 9.
Both a and b are no-zero integers, and a + b = 11 = n.
Note that there are other valid answers as [8, 3] that can be accepted.

Constraints:
2 <= n <= 10^4

</> Typescript code:
*/

function getNoZeroIntegers(n: number): number[] {
    // Iterate through all possible values of first integer starting from 1
    for (let a = 1; a < n; a++) {
        // Calculate the second integer that makes the sum equal to n
        const b = n - a;
        
        // Check if both integers contain no zero digits
        if (hasNoZero(a) && hasNoZero(b)) {
            // Return the first valid pair found (guaranteed to exist per constraints)
            return [a, b];
        }
    }
    
    // Fallback return (should never be reached given problem constraints)
    return [1, n - 1];
}

// Helper function to check if a number contains no zero digits
function hasNoZero(num: number): boolean {
    // Process each digit of the number from right to left
    while (num > 0) {
        // Check if the current rightmost digit is zero
        if (num % 10 === 0) return false;
        
        // Remove the rightmost digit by integer division
        num = Math.floor(num / 10);
    }
    
    // If we've processed all digits without finding a zero, return true
    return true;
}
