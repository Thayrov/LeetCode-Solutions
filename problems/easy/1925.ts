/*
1925. Count Square Sum Triples

A square triple (a,b,c) is a triple where a, b, and c are integers and a2 + b2 = c2.
Given an integer n, return the number of square triples such that 1 <= a, b, c <= n.

Example 1:
Input: n = 5
Output: 2
Explanation: The square triples are (3,4,5) and (4,3,5).

Example 2:
Input: n = 10
Output: 4
Explanation: The square triples are (3,4,5), (4,3,5), (6,8,10), and (8,6,10).

Constraints:
1 <= n <= 250

</> Typescript code:
*/

function countTriples(n: number): number {
    // Initialize counter for valid Pythagorean triples
    let count = 0;
    
    // Precompute n^2 to avoid repeated multiplication in comparisons
    const maxC = n * n;
    
    // Iterate through all possible values of 'a' from 1 to n-1
    for (let a = 1; a < n; a++) {
        // Precompute a^2 to avoid repeated multiplication in inner loop
        const a2 = a * a;
        
        // Iterate through values of 'b' starting from 'a' to avoid duplicate pairs
        // This optimization cuts search space in half since (a,b,c) and (b,a,c) are both counted
        for (let b = a; b < n; b++) {
            // Calculate a^2 + b^2
            const sum = a2 + b * b;
            
            // Early termination: if sum exceeds n^2, no valid c exists for larger b values
            if (sum > maxC) break;
            
            // Check if sqrt(a^2 + b^2) is a perfect square
            const c = Math.sqrt(sum);
            
            // Verify c is an integer (perfect square) and within bounds [1, n]
            if (c === Math.floor(c) && c <= n) {
                // If a equals b, only count once (e.g., if a=b=1, only (1,1,√2) not both orders)
                // Otherwise count twice to account for both (a,b,c) and (b,a,c)
                count += (a === b) ? 1 : 2;
            }
        }
    }
    
    // Return total count of valid square triples
    return count;
}
