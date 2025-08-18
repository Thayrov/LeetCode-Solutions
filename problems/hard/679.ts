/*
679. 24 Game

You are given an integer array cards of length 4. You have four cards, each containing a number in the range [1, 9]. You should arrange the numbers on these cards in a mathematical expression using the operators ['+', '-', '*', '/'] and the parentheses '(' and ')' to get the value 24.
You are restricted with the following rules:
The division operator '/' represents real division, not integer division.
For example, 4 / (1 - 2 / 3) = 4 / (1 / 3) = 12.
Every operation done is between two numbers. In particular, we cannot use '-' as a unary operator.
For example, if cards = [1, 1, 1, 1], the expression "-1 - 1 - 1 - 1" is not allowed.
You cannot concatenate numbers together
For example, if cards = [1, 2, 1, 2], the expression "12 + 12" is not valid.
Return true if you can get such expression that evaluates to 24, and false otherwise.

Example 1:
Input: cards = [4,1,8,7]
Output: true
Explanation: (8-4) * (7-1) = 24

Example 2:
Input: cards = [1,2,1,2]
Output: false

Constraints:
cards.length == 4
1 <= cards[i] <= 9

</> Typescript code:
*/

function judgePoint24(cards: number[]): boolean {
    // Define epsilon for floating-point comparison to handle precision issues
    const EPS = 1e-6;
    
    // Recursive function that tries to solve the 24-game with given numbers
    function solve(nums: number[]): boolean {
        // Base case: if only one number left, check if it equals 24 (within epsilon)
        if (nums.length === 1) return Math.abs(nums[0] - 24) < EPS;
        
        // Try all pairs of numbers in the current array
        for (let i = 0; i < nums.length; i++) {
            for (let j = i + 1; j < nums.length; j++) {
                // Extract the two numbers to combine
                const a = nums[i], b = nums[j];
                
                // Create array with remaining numbers (excluding indices i and j)
                const remaining = nums.filter((_, k) => k !== i && k !== j);
                
                // Generate all possible results from combining a and b with different operations
                const candidates = [
                    a + b,    // Addition (commutative)
                    a - b,    // Subtraction a - b
                    b - a,    // Subtraction b - a (non-commutative)
                    a * b,    // Multiplication (commutative)
                    // Division operations with zero-division protection
                    ...(Math.abs(b) > EPS ? [a / b] : []),  // a / b if b != 0
                    ...(Math.abs(a) > EPS ? [b / a] : [])   // b / a if a != 0
                ];
                
                // Try each possible result by recursively solving with the new number set
                for (const candidate of candidates) {
                    // If any recursive call succeeds, we found a solution
                    if (solve([...remaining, candidate])) return true;
                }
            }
        }
        
        // No valid combination found with current numbers
        return false;
    }
    
    // Start the recursive solving process with the initial cards
    return solve(cards);
}
