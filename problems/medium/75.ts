/* 
75. Sort Colors

Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.

Example 1:
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]

Example 2:
Input: nums = [2,0,1]
Output: [0,1,2]

Constraints:
n == nums.length
1 <= n <= 300
nums[i] is either 0, 1, or 2.

Follow up: Could you come up with a one-pass algorithm using only constant extra space?

</> Typescript Code:
*/

function sortColors(nums: number[]): void {
  // Initialize three pointers for low, mid, and high colors (0, 1, and 2)
  let low = 0; // Low color pointer starts at the beginning
  let mid = 0; // Mid color pointer starts at the beginning
  let high = nums.length - 1; // High color pointer starts at the end

  while (mid <= high) {
    // Continue until all colors are sorted
    switch (nums[mid]) {
      case 0: // If current color is low (0), swap with low and increment both pointers
        swap(nums, low++, mid++);
        break;
      case 1: // If current color is mid (1), just move the mid pointer forward
        mid++;
        break;
      case 2: // If current color is high (2), swap with high and decrement the high pointer
        swap(nums, mid, high--);
        break;
    }
  }
}

function swap(nums: number[], i: number, j: number): void {
  const temp = nums[i]; // Store low color in temporary variable
  nums[i] = nums[j]; // Move high color to the current position (i)
  nums[j] = temp; // Put low color at the original position of high color
}
