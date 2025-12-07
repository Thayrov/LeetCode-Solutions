/*
1523. Count Odd Numbers in an Interval Range

Given two non-negative integers low and high. Return the count of odd numbers between low and high (inclusive).

Example 1:
Input: low = 3, high = 7
Output: 3
Explanation: The odd numbers between 3 and 7 are [3,5,7].

Example 2:
Input: low = 8, high = 10
Output: 1
Explanation: The odd numbers between 8 and 10 are [9].

Constraints:
0 <= low <= high <= 10^9

</> Typescript code:
*/

function countOdds(low: number, high: number): number {
    // Calculate count of odd numbers from 0 to high (inclusive)
    // Dividing (high + 1) by 2 gives us the count of odd numbers from 0 to high
    // For example: high = 7 → (7 + 1) / 2 = 4 → odds are [1, 3, 5, 7]
    // For example: high = 8 → (8 + 1) / 2 = 4.5 → floor(4.5) = 4 → odds are [1, 3, 5, 7]
    const oddsUpToHigh = Math.floor((high + 1) / 2);
    
    // Calculate count of odd numbers from 0 to (low - 1) (inclusive)
    // Dividing low by 2 gives us the count of odd numbers before low
    // For example: low = 3 → 3 / 2 = 1.5 → floor(1.5) = 1 → odds are [1]
    // For example: low = 8 → 8 / 2 = 4 → odds are [1, 3, 5, 7]
    const oddsBeforeLow = Math.floor(low / 2);
    
    // Subtract the count of odds before low from the count of odds up to high
    // This gives us the count of odd numbers in the range [low, high] inclusive
    return oddsUpToHigh - oddsBeforeLow;
}
