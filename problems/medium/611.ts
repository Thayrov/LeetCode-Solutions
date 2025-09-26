/*
611. Valid Triangle Number

Given an integer array nums, return the number of triplets chosen from the array that can make triangles if we take them as side lengths of a triangle.

Example 1:
Input: nums = [2,2,3,4]
Output: 3
Explanation: Valid combinations are: 
2,3,4 (using the first 2)
2,3,4 (using the second 2)
2,2,3

Example 2:
Input: nums = [4,2,3,4]
Output: 4

Constraints:
1 <= nums.length <= 1000
0 <= nums[i] <= 1000

</> Typescript code:
*/

function triangleNumber(nums: number[]): number {
    // Sort array in descending order to optimize triangle inequality checking
    // With sorted array a >= b >= c, we only need to verify b + c > a
    nums.sort((a, b) => b - a);
    
    // Counter for valid triangle combinations
    let count = 0;
    
    // Iterate through each element as the largest side (hypotenuse)
    // We need at least 3 elements, so stop at length - 2
    for (let i = 0; i < nums.length - 2; i++) {
        // Two pointers approach: left starts after current element, right at end
        let left = i + 1, right = nums.length - 1;
        
        // Use two pointers to find all valid combinations with nums[i] as largest side
        while (left < right) {
            // Check triangle inequality: sum of two smaller sides > largest side
            if (nums[left] + nums[right] > nums[i]) {
                // If condition is met, all elements between left and right 
                // can form valid triangles with nums[left] and nums[i]
                count += right - left;
                
                // Move left pointer to find more combinations with larger second side
                left++;
            } else {
                // If sum is too small, move right pointer to get larger third side
                right--;
            }
        }
    }
    
    // Return total count of valid triangle combinations
    return count;
}
