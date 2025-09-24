/*
166. Fraction to Recurring Decimal

Given two integers representing the numerator and denominator of a fraction, return the fraction in string format.
If the fractional part is repeating, enclose the repeating part in parentheses.
If multiple answers are possible, return any of them.
It is guaranteed that the length of the answer string is less than 104 for all the given inputs.

Example 1:
Input: numerator = 1, denominator = 2
Output: "0.5"

Example 2:
Input: numerator = 2, denominator = 1
Output: "2"

Example 3:
Input: numerator = 4, denominator = 333
Output: "0.(012)"

Constraints:
-2^31 <= numerator, denominator <= 2^31 - 1
denominator != 0

</> Typescript code:
*/

function fractionToDecimal(numerator: number, denominator: number): string {
    // Handle the edge case where numerator is 0
    if (numerator === 0) return "0";
    
    // Determine the sign of the result - if signs differ, result is negative
    let sign = "";
    if ((numerator < 0 && denominator > 0) || (numerator > 0 && denominator < 0)) {
        sign = "-";
    }
    
    // Work with absolute values to simplify division logic
    numerator = Math.abs(numerator);
    denominator = Math.abs(denominator);
    
    // Calculate the integer part using floor division
    let integerPart = Math.floor(numerator / denominator).toString();
    let result = sign + integerPart;
    
    // Get the remainder after integer division
    let remainder = numerator % denominator;
    
    // If no remainder, we're done - no decimal part needed
    if (remainder === 0) return result;
    
    // Start building the decimal part
    result += ".";
    let decimalPart = "";
    
    // Create a map to track seen remainders and their positions for cycle detection
    const seen: {[key: number]: number} = {};
    let position = 0;
    
    // Simulate long division for the decimal part
    while (remainder !== 0 && !seen[remainder]) {
        // Record the current remainder and its position in the decimal
        seen[remainder] = position;
        
        // Multiply remainder by 10 (next step in long division)
        remainder *= 10;
        
        // Get the next digit by dividing the new remainder by denominator
        let digit = Math.floor(remainder / denominator);
        
        // Append the digit to our decimal part
        decimalPart += digit.toString();
        
        // Update remainder for next iteration (equivalent to % in long division)
        remainder %= denominator;
        position++;
    }
    
    // If we hit a remainder of 0, decimal terminates
    // If we see a previously seen remainder, there's a repeating cycle
    if (remainder !== 0) {
        // Find where the repeating part begins
        let repeatStart = seen[remainder];
        
        // Split decimal into non-repeating prefix and repeating part
        // Format as "prefix(repeating_digits)"
        decimalPart = decimalPart.slice(0, repeatStart) + "(" + decimalPart.slice(repeatStart) + ")";
    }
    
    // Combine integer and decimal parts
    return result + decimalPart;
}
