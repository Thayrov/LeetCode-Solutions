/*
2147. Number of Ways to Divide a Long Corridor

Along a long library corridor, there is a line of seats and decorative plants. You are given a 0-indexed string corridor of length n consisting of letters 'S' and 'P' where each 'S' represents a seat and each 'P' represents a plant.
One room divider has already been installed to the left of index 0, and another to the right of index n - 1. Additional room dividers can be installed. For each position between indices i - 1 and i (1 <= i <= n - 1), at most one divider can be installed.
Divide the corridor into non-overlapping sections, where each section has exactly two seats with any number of plants. There may be multiple ways to perform the division. Two ways are different if there is a position with a room divider installed in the first way but not in the second way.
Return the number of ways to divide the corridor. Since the answer may be very large, return it modulo 109 + 7. If there is no way, return 0.

Example 1:
Input: corridor = "SSPPSPS"
Output: 3
Explanation: There are 3 different ways to divide the corridor.
The black bars in the above image indicate the two room dividers already installed.
Note that in each of the ways, each section has exactly two seats.

Example 2:
Input: corridor = "PPSPSP"
Output: 1
Explanation: There is only 1 way to divide the corridor, by not installing any additional dividers.
Installing any would create some section that does not have exactly two seats.

Example 3:
Input: corridor = "S"
Output: 0
Explanation: There is no way to divide the corridor because there will always be a section that does not have exactly two seats.

Constraints:
n == corridor.length
1 <= n <= 10^5
corridor[i] is either 'S' or 'P'.

</> Typescript code:
*/

function numberOfWays(corridor: string): number {
    // Modulo constant as defined by the problem
    const MOD = 1_000_000_007;
    
    // Result accumulator, starts at 1 (multiplicative identity)
    let res = 1;
    
    // Counter for the total number of seats encountered
    let seats = 0;
    
    // Tracks the index of the previously found seat
    let prevSeatIdx = -1;

    // Iterate through the corridor string once (Linear Time O(N))
    for (let i = 0; i < corridor.length; i++) {
        // Check if current character is a Seat
        if (corridor[i] === 'S') {
            seats++;

            // Logic: A valid section must contain exactly 2 seats.
            // Dividers can only be placed between the end of one pair 
            // and the start of the next pair.
            // This condition checks if we are at the start of a NEW pair (3rd, 5th, 7th seat, etc.)
            if (seats > 2 && seats % 2 === 1) {
                // The number of ways to place a divider between the previous pair and this new pair
                // is equal to the number of indices between them (the gap length).
                // Gap length = current_index (start of new pair) - prev_index (end of old pair).
                // We multiply this count into our result modulo 10^9 + 7.
                // Note: JS Numbers are safe up to 9e15, and our max product is roughly 1e14, so BigInt is not strictly needed.
                res = (res * (i - prevSeatIdx)) % MOD;
            }

            // Update the previous seat index to the current one for the next iteration
            prevSeatIdx = i;
        }
    }

    // Edge Case Check:
    // 1. We must have at least one pair of seats (seats > 0).
    // 2. The total number of seats must be even (seats % 2 === 0).
    // If either fails, no valid division is possible, return 0.
    return (seats > 0 && seats % 2 === 0) ? res : 0;
};
