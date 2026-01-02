/*
961. N-Repeated Element in Size 2N Array

You are given an integer array nums with the following properties:
nums.length == 2 * n.
nums contains n + 1 unique elements.
Exactly one element of nums is repeated n times.
Return the element that is repeated n times.

Example 1:
Input: nums = [1,2,3,3]
Output: 3

Example 2:
Input: nums = [2,1,2,5,3,2]
Output: 2

Example 3:
Input: nums = [5,1,5,2,5,3,5,4]
Output: 5

Constraints:
2 <= n <= 5000
nums.length == 2 * n
0 <= nums[i] <= 10^4
nums contains n + 1 unique elements and one of them is repeated exactly n times.

</> Typescript code:
*/

function repeatedNTimes(nums: number[]): number {
    // Initialize a Set to store unique numbers encountered; Sets provide O(1) lookup time.
    const seen = new Set<number>();
    
    // Iterate through the array using a standard for-loop for maximum execution speed.
    for (let i = 0; i < nums.length; i++) {
        // Current number being evaluated in the iteration.
        const num = nums[i];
        
        // If the Set already contains the current number, it is the N-repeated element.
        // Since there are N+1 unique elements in 2N total, the first duplicate found is the answer.
        if (seen.has(num)) {
            return num;
        }
        
        // If not seen before, add the number to the Set and continue searching.
        seen.add(num);
    }
    
    // Fallback return, though constraints guarantee a solution will be found within the loop.
    return -1;
}
