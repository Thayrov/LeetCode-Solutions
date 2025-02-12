/* 
2342. Max Sum of a Pair With Equal Sum of Digits

You are given a 0-indexed array nums consisting of positive integers. You can choose two indices i and j, such that i != j, and the sum of digits of the number nums[i] is equal to that of nums[j].

Return the maximum value of nums[i] + nums[j] that you can obtain over all possible indices i and j that satisfy the conditions.

Example 1:
Input: nums = [18,43,36,13,7]
Output: 54
Explanation: The pairs (i, j) that satisfy the conditions are:
- (0, 2), both numbers have a sum of digits equal to 9, and their sum is 18 + 36 = 54.
- (1, 4), both numbers have a sum of digits equal to 7, and their sum is 43 + 7 = 50.
So the maximum sum that we can obtain is 54.

Example 2:
Input: nums = [10,12,19,14]
Output: -1
Explanation: There are no two numbers that satisfy the conditions, so we return -1.

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^9

</> Typescript Code:
*/

// Define the function maximumSum which takes an array of numbers and returns a number.
function maximumSum(nums: number[]): number {
  // Initialize the answer with -1; this will be returned if no valid pair is found.
  let ans = -1;
  // Create a map to keep track of the maximum number encountered for each digit sum.
  const map = new Map<number, number>();
  // Loop through each number in the provided array.
  for (const num of nums) {
    // Calculate the sum of the digits for the current number.
    let s = 0,
      x = num;
    while (x > 0) {
      // Add the last digit of x to the sum.
      s += x % 10;
      // Remove the last digit from x.
      x = Math.floor(x / 10);
    }
    // If there's already a number encountered with the same digit sum, check for a maximum sum.
    if (map.has(s)) {
      // Update the answer if the current pair produces a larger sum.
      ans = Math.max(ans, map.get(s)! + num);
      // Update the stored maximum number for this digit sum.
      map.set(s, Math.max(map.get(s)!, num));
    } else {
      // If no number with the same digit sum exists, store the current number in the map.
      map.set(s, num);
    }
  }
  // Return the best found sum across all valid pairs, or -1 if none exists.
  return ans;
}
