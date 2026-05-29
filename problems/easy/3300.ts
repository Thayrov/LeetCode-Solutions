/*
3300. Minimum Element After Replacement With Digit Sum

Hint
You are given an integer array nums.
You replace each element in nums with the sum of its digits.
Return the minimum element in nums after all replacements.

Example 1:
Input: nums = [10,12,13,14]
Output: 1
Explanation:
nums becomes [1, 3, 4, 5] after all replacements, with minimum element 1.

Example 2:
Input: nums = [1,2,3,4]
Output: 1
Explanation:
nums becomes [1, 2, 3, 4] after all replacements, with minimum element 1.

Example 3:
Input: nums = [999,19,199]
Output: 10
Explanation:
nums becomes [27, 10, 19] after all replacements, with minimum element 10.

Constraints:
1 <= nums.length <= 100
1 <= nums[i] <= 10^4

</> Typescript code:
*/

function minElement(nums: number[]): number {
  // Stores the smallest digit sum found; max possible digit sum for 10000 is 1, for 9999 is 36.
  let ans = 45;

  // Iterates through every number in nums.
  for (let num of nums) {
    // Stores the digit sum of the current number.
    let sum = 0;

    // Extracts digits until no digits remain.
    while (num > 0) {
      // Adds the last digit of num to sum.
      sum += num % 10;

      // Removes the last digit from num.
      num = Math.floor(num / 10);
    }

    // Keeps the minimum digit sum seen so far.
    ans = Math.min(ans, sum);
  }

  // Returns the minimum element after replacing each number by its digit sum.
  return ans;
}
