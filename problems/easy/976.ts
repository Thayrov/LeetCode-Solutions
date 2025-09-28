/*
976. Largest Perimeter Triangle

Given an integer array nums, return the largest perimeter of a triangle with a non-zero area, formed from three of these lengths. If it is impossible to form any triangle of a non-zero area, return 0.

Example 1:
Input: nums = [2,1,2]
Output: 5
Explanation: You can form a triangle with three side lengths: 1, 2, and 2.

Example 2:
Input: nums = [1,2,1,10]
Output: 0
Explanation: 
You cannot use the side lengths 1, 1, and 2 to form a triangle.
You cannot use the side lengths 1, 1, and 10 to form a triangle.
You cannot use the side lengths 1, 2, and 10 to form a triangle.
As we cannot use any three side lengths to form a triangle of non-zero area, we return 0.

Constraints:
3 <= nums.length <= 10^4
1 <= nums[i] <= 10^6

</> Typescript code:
*/

function largestPerimeter(nums: number[]): number {
    // Sort array in descending order to prioritize larger values for maximum perimeter
    nums.sort((a, b) => b - a);
    
    // Iterate through array checking consecutive triplets
    // We only need to check up to length-2 since we access i+1 and i+2
    for (let i = 0; i < nums.length - 2; i++) {
        // Check triangle inequality: sum of two smaller sides > largest side
        // Since array is sorted desc: nums[i] >= nums[i+1] >= nums[i+2]
        // So we check if nums[i+1] + nums[i+2] > nums[i]
        if (nums[i + 1] + nums[i + 2] > nums[i]) {
            // Found valid triangle, return perimeter (sum of all three sides)
            // This is guaranteed to be the largest possible since we check largest combinations first
            return nums[i] + nums[i + 1] + nums[i + 2];
        }
    }
    
    // No valid triangle found, return 0
    return 0;
}
