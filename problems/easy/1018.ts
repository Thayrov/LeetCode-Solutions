/*
1018. Binary Prefix Divisible By 5

You are given a binary array nums (0-indexed).
We define xi as the number whose binary representation is the subarray nums[0..i] (from most-significant-bit to least-significant-bit).
For example, if nums = [1,0,1], then x0 = 1, x1 = 2, and x2 = 5.
Return an array of booleans answer where answer[i] is true if xi is divisible by 5.

Example 1:
Input: nums = [0,1,1]
Output: [true,false,false]
Explanation: The input numbers in binary are 0, 01, 011; which are 0, 1, and 3 in base-10.
Only the first number is divisible by 5, so answer[0] is true.

Example 2:
Input: nums = [1,1,1]
Output: [false,false,false]

Constraints:
1 <= nums.length <= 10^5
nums[i] is either 0 or 1.

</> Typescript code:
*/

function prefixesDivBy5(nums: number[]): boolean[] {
    // Pre-allocate result array for better performance than using push()
    const result = new Array(nums.length);
    
    // Track only the remainder mod 5 (0-4) to avoid integer overflow
    // This is sufficient since we only care about divisibility by 5
    let remainder = 0;
    
    // Process each bit from left to right (most significant to least significant)
    for (let i = 0; i < nums.length; i++) {
        // Left shift is equivalent to multiplying by 2: remainder * 2
        // Then add the current bit: remainder * 2 + nums[i]
        // Take modulo 5 to keep remainder in range [0, 4]
        // This represents: (previous_number * 2 + current_bit) % 5
        remainder = ((remainder << 1) + nums[i]) % 5;
        
        // If remainder is 0, the current prefix number is divisible by 5
        result[i] = remainder === 0;
    }
    
    // Return array of boolean results for each prefix
    return result;
}
