/*
342. Power of Four

Given an integer n, return true if it is a power of four. Otherwise, return false.
An integer n is a power of four, if there exists an integer x such that n == 4x.

Example 1:
Input: n = 16
Output: true

Example 2:
Input: n = 5
Output: false

Example 3:
Input: n = 1
Output: true

Constraints:
-2^31 <= n <= 2^31 - 1

Follow up: Could you solve it without loops/recursion?

</> Typescript code:
*/

function isPowerOfFour(n: number): boolean {
    return (
        // First, check if the number is positive, as powers of four are always positive.
        n > 0 &&
        // Second, check if the number is a power of two.
        // A number is a power of two if it has exactly one bit set to '1'.
        // The expression `(n & (n - 1)) === 0` is a bitwise trick for this check.
        (n & (n - 1)) === 0 &&
        // Finally, for a power of two, check if the single '1' bit is at an even position (0th, 2nd, 4th, etc.).
        // Powers of four (1, 4, 16, ...) have their bit at these positions.
        // The mask `0x55555555` in binary is `01010101...`, with `1`s at all even positions.
        // ANDing with this mask will be non-zero if the bit in `n` is at an even position.
        (n & 0x55555555) !== 0
    );
}
