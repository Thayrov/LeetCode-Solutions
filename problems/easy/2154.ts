/*
2154. Keep Multiplying Found Values by Two

You are given an array of integers nums. You are also given an integer original which is the first number that needs to be searched for in nums.
You then do the following steps:
If original is found in nums, multiply it by two (i.e., set original = 2 * original).
Otherwise, stop the process.
Repeat this process with the new number as long as you keep finding the number.
Return the final value of original.

Example 1:
Input: nums = [5,3,6,1,12], original = 3
Output: 24
Explanation: 
- 3 is found in nums. 3 is multiplied by 2 to obtain 6.
- 6 is found in nums. 6 is multiplied by 2 to obtain 12.
- 12 is found in nums. 12 is multiplied by 2 to obtain 24.
- 24 is not found in nums. Thus, 24 is returned.

Example 2:
Input: nums = [2,7,9], original = 4
Output: 4
Explanation:
- 4 is not found in nums. Thus, 4 is returned.

Constraints:
1 <= nums.length <= 1000
1 <= nums[i], original <= 1000

</> Typescript code:
*/

/**
 * @param {number[]} nums - The array of integers to search in.
 * @param {number} original - The initial value to search for.
 * @returns {number} The final value of original after all possible multiplications.
 */
function findFinalValue(nums: number[], original: number): number {
    // 1. Preprocess the input array into a Set for highly performant, near O(1) lookups.
    // This is the optimization step that ensures subsequent searches are fast.
    const seen = new Set(nums);

    // 2. Start a loop that continues as long as the current 'original' value is found in the Set.
    // The Set.has() method provides the critical O(1) time complexity for the existence check.
    while (seen.has(original)) {
        // 3. If the value is found, multiply 'original' by two, as per the problem rules.
        // This mutation changes the search target for the next iteration.
        original *= 2;
    }
    
    // 4. Once the loop terminates (meaning 'original' was not found in the Set), 
    // return the final, multiplied value.
    return original;
}
