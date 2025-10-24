/*
2048. Next Greater Numerically Balanced Number

An integer x is numerically balanced if for every digit d in the number x, there are exactly d occurrences of that digit in x.
Given an integer n, return the smallest numerically balanced number strictly greater than n.

Example 1:
Input: n = 1
Output: 22
Explanation: 
22 is numerically balanced since:
- The digit 2 occurs 2 times. 
It is also the smallest numerically balanced number strictly greater than 1.

Example 2:
Input: n = 1000
Output: 1333
Explanation: 
1333 is numerically balanced since:
- The digit 1 occurs 1 time.
- The digit 3 occurs 3 times. 
It is also the smallest numerically balanced number strictly greater than 1000.
Note that 1022 cannot be the answer because 0 appeared more than 0 times.

Example 3:
Input: n = 3000
Output: 3133
Explanation: 
3133 is numerically balanced since:
- The digit 1 occurs 1 time.
- The digit 3 occurs 3 times.
It is also the smallest numerically balanced number strictly greater than 3000.

Constraints:
0 <= n <= 10^6

</> Typescript code:
*/
function nextBeautifulNumber(n: number): number {

    /**
     * Helper function to determine if a number is "numerically balanced".
     * A number is balanced if for every digit 'd' in it, 'd' appears 'd' times.
     * This implementation uses math operations instead of string conversion for performance.
     * @param num The number to check.
     * @returns true if the number is numerically balanced, false otherwise.
     */
    const isNumericallyBalanced = (num: number): boolean => {
        // Create an array to store the frequency of each digit (0-9).
        const counts = new Array(10).fill(0);
        // Use a temporary variable to avoid modifying the original number (though not strictly needed).
        let temp = num;

        // Loop through each digit of the number using modulo arithmetic.
        while (temp > 0) {
            // Get the last digit.
            const digit = temp % 10;
            
            // A numerically balanced number cannot contain the digit 0,
            // because 0 would have to appear 0 times, which is a contradiction.
            if (digit === 0) {
                return false;
            }
            
            // Increment the count for this digit.
            counts[digit]++;
            
            // Remove the last digit from the number.
            temp = Math.floor(temp / 10);
        }

        // After counting all digits, check if the counts satisfy the balanced rule.
        // We only need to check digits 1 through 9.
        for (let d = 1; d < 10; d++) {
            // If a digit 'd' was present in the number (its count is > 0)...
            if (counts[d] > 0) {
                // ...its count must be exactly equal to 'd'.
                if (counts[d] !== d) {
                    // If not, the number is not balanced.
                    return false;
                }
            }
        }
        
        // If all present digits passed the check, the number is balanced.
        return true;
    };

    // Start checking from the number immediately greater than n.
    let num = n + 1;
    
    // Given n <= 10^6, the next balanced number is at most 1,224,444.
    // This means the loop will run a maximum of ~1.2M times (for n=0)
    // or ~225k times (for n=10^6), which is well within performance limits.
    while (true) {
        // Check if the current number is balanced.
        if (isNumericallyBalanced(num)) {
            // If it is, we found our answer.
            return num;
        }
        // If not, increment and check the next number.
        num++;
    }
}
