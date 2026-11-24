/*
3411. Maximum Subarray With Equal Products

You are given an array of positive integers nums.

An array arr is called product equivalent if prod(arr) == lcm(arr) * gcd(arr), where:

prod(arr) is the product of all elements of arr.
gcd(arr) is the GCD of all elements of arr.
lcm(arr) is the LCM of all elements of arr.

Return the length of the longest product equivalent subarray of nums.

Example 1:
Input: nums = [1,2,1,2,1,1,1]
Output: 5
Explanation:
The longest product equivalent subarray is [1, 2, 1, 1, 1], where prod([1, 2, 1, 1, 1]) = 2, gcd([1, 2, 1, 1, 1]) = 1, and lcm([1, 2, 1, 1, 1]) = 2.

Example 2:
Input: nums = [2,3,4,5,6]
Output: 3
Explanation:
The longest product equivalent subarray is [3, 4, 5].

Example 3:
Input: nums = [1,2,3,1,4,5,1]
Output: 5

Constraints:
2 <= nums.length <= 100
1 <= nums[i] <= 10

</> Typescript code:
*/

// Find the longest product-equivalent subarray.
function maxLength(nums: number[]): number {
  // Encode the prime divisors 2, 3, 5, and 7 as four bits for values 1 through 10.
  const masks = [0, 0, 1, 2, 1, 4, 3, 8, 1, 2, 5];
  // Every pair satisfies product = GCD × LCM, so two is always attainable.
  let best = 2;
  // Track the left edge and all prime factors currently in the window.
  let left = 0;
  let used = 0;

  // Extend the window one value at a time.
  for (let right = 0; right < nums.length; right++) {
    // Read the incoming value's prime factors.
    const mask = masks[nums[right]];
    // For length three or more, equality requires each prime to occur in at most one value.
    while ((used & mask) !== 0) {
      // Remove the left value's bits, which no other value in the window shares.
      used ^= masks[nums[left++]];
    }
    // Add the incoming value now that its primes are disjoint from the window.
    used |= mask;
    // The current window is the longest disjoint suffix ending at right.
    best = Math.max(best, right - left + 1);
  }

  // Include the guaranteed pair even if every longer window fails.
  return best;
}
