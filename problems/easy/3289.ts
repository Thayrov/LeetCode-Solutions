/*
3289. The Two Sneaky Numbers of Digitville

In the town of Digitville, there was a list of numbers called nums containing integers from 0 to n - 1. Each number was supposed to appear exactly once in the list, however, two mischievous numbers sneaked in an additional time, making the list longer than usual.
As the town detective, your task is to find these two sneaky numbers. Return an array of size two containing the two numbers (in any order), so peace can return to Digitville.

Example 1:
Input: nums = [0,1,1,0]
Output: [0,1]
Explanation:
The numbers 0 and 1 each appear twice in the array.

Example 2:
Input: nums = [0,3,2,1,3,2]
Output: [2,3]
Explanation:
The numbers 2 and 3 each appear twice in the array.

Example 3:
Input: nums = [7,1,5,4,3,4,6,0,9,5,8,2]
Output: [4,5]
Explanation:
The numbers 4 and 5 each appear twice in the array.

Constraints:
2 <= n <= 100
nums.length == n + 2
0 <= nums[i] < n
The input is generated such that nums contains exactly two repeated elements.

</> Typescript code:
*/

function getSneakyNumbers(nums: number[]): number[] {
    // Initialize array to store the two duplicate numbers
    const result: number[] = [];
    
    // Set data structure for O(1) lookup to track numbers we've already seen
    const seen = new Set<number>();
    
    // Iterate through the array once - O(n) time complexity
    for (let i = 0; i < nums.length; i++) {
        // Check if current number has been encountered before
        if (seen.has(nums[i])) {
            // Found a duplicate, add it to result array
            result.push(nums[i]);
            
            // Early return optimization: once we find both duplicates, exit immediately
            if (result.length === 2) return result;
        }
        
        // Mark this number as seen by adding it to the Set
        seen.add(nums[i]);
    }
    
    // Return the result array containing the two sneaky numbers
    return result;
}
