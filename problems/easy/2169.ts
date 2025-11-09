/*
2169. Count Operations to Obtain Zero

You are given two non-negative integers num1 and num2.
In one operation, if num1 >= num2, you must subtract num2 from num1, otherwise subtract num1 from num2.
    For example, if num1 = 5 and num2 = 4, subtract num2 from num1, thus obtaining num1 = 1 and num2 = 4. However, if num1 = 4 and num2 = 5, after one operation, num1 = 4 and num2 = 1.
Return the number of operations required to make either num1 = 0 or num2 = 0.

Example 1:
Input: num1 = 2, num2 = 3
Output: 3
Explanation: 
- Operation 1: num1 = 2, num2 = 3. Since num1 < num2, we subtract num1 from num2 and get num1 = 2, num2 = 3 - 2 = 1.
- Operation 2: num1 = 2, num2 = 1. Since num1 > num2, we subtract num2 from num1.
- Operation 3: num1 = 1, num2 = 1. Since num1 == num2, we subtract num2 from num1.
Now num1 = 0 and num2 = 1. Since num1 == 0, we do not need to perform any further operations.
So the total number of operations required is 3.

Example 2:
Input: num1 = 10, num2 = 10
Output: 1
Explanation: 
- Operation 1: num1 = 10, num2 = 10. Since num1 == num2, we subtract num2 from num1 and get num1 = 10 - 10 = 0.
Now num1 = 0 and num2 = 10. Since num1 == 0, we are done.
So the total number of operations required is 1.

Constraints:
    0 <= num1, num2 <= 10^5

</> Typescript code:
*/

function countOperations(num1: number, num2: number): number {
    // Initialize operation counter
    let ops = 0;
    
    // Continue until one of the numbers becomes zero
    while (num1 > 0 && num2 > 0) {
        // If num1 is greater than or equal to num2
        if (num1 >= num2) {
            // Calculate how many times we can subtract num2 from num1
            // This is equivalent to doing multiple individual subtractions at once
            ops += Math.floor(num1 / num2);
            
            // Update num1 to the remainder after all those subtractions
            // This is what would be left after subtracting num2 multiple times
            num1 %= num2;
        } else {
            // If num2 is greater, calculate how many times we can subtract num1 from num2
            ops += Math.floor(num2 / num1);
            
            // Update num2 to the remainder after all those subtractions
            num2 %= num1;
        }
    }
    
    // Return the total number of operations performed
    return ops;
}
