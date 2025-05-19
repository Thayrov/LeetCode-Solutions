/*
3024. Type of Triangle

You are given a 0-indexed integer array nums of size 3 which can form the sides of a triangle.

A triangle is called equilateral if it has all sides of equal length.
A triangle is called isosceles if it has exactly two sides of equal length.
A triangle is called scalene if all its sides are of different lengths.
Return a string representing the type of triangle that can be formed or "none" if it cannot form a triangle.

Example 1:
Input: nums = [3,3,3]
Output: "equilateral"
Explanation: Since all the sides are of equal length, therefore, it will form an equilateral triangle.

Example 2:
Input: nums = [3,4,5]
Output: "scalene"
Explanation: 
nums[0] + nums[1] = 3 + 4 = 7, which is greater than nums[2] = 5.
nums[0] + nums[2] = 3 + 5 = 8, which is greater than nums[1] = 4.
nums[1] + nums[2] = 4 + 5 = 9, which is greater than nums[0] = 3. 
Since the sum of the two sides is greater than the third side for all three cases, therefore, it can form a triangle.
As all the sides are of different lengths, it will form a scalene triangle.
 
Constraints:
nums.length == 3
1 <= nums[i] <= 100

</> Typescript code:
*/

function triangleType(nums: number[]): string {
  // unpack the three side lengths
  const [a, b, c] = nums;
  // if all sides equal, it's equilateral
  if (a === b && b === c) return "equilateral";
  // determine the largest side without sorting
  const max = a > b ? (a > c ? a : c) : b > c ? b : c;
  // sum of all sides
  const total = a + b + c;
  // triangle inequality: sum of two smaller sides must exceed the largest
  if (total <= 2 * max) return "none";
  // if any two sides are equal (but not all three), it's isosceles
  if (a === b || b === c || a === c) return "isosceles";
  // otherwise, all sides different and inequality holds => scalene
  return "scalene";
}
