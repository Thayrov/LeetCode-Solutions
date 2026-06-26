/*
3739. Count Subarrays With Majority Element II

Hint
You are given an integer array nums and an integer target.
Return the number of subarrays of nums in which target is the majority element.
The majority element of a subarray is the element that appears strictly more than half of the times in that subarray.

Example 1:
Input: nums = [1,2,2,3], target = 2
Output: 5
Explanation:
Valid subarrays with target = 2 as the majority element:
nums[1..1] = [2]
nums[2..2] = [2]
nums[1..2] = [2,2]
nums[0..2] = [1,2,2]
nums[1..3] = [2,2,3]
So there are 5 such subarrays.

Example 2:
Input: nums = [1,1,1,1], target = 1
Output: 10
Explanation:
All 10 subarrays have 1 as the majority element.

Example 3:
Input: nums = [1,2,3], target = 4
Output: 0
Explanation:
target = 4 does not appear in nums at all. Therefore, there cannot be any subarray where 4 is the majority element. Hence the answer is 0.

Constraints:
1 <= nums.length <= 10^​​​​​​​5
1 <= nums[i] <= 10​​​​​​​^9
1 <= target <= 10^9

</> Typescript code:
*/

function countMajoritySubarrays(nums: number[], target: number): number {
  // Store array length for prefix range sizing.
  const n = nums.length;

  // Shift negative prefix sums into positive Fenwick indexes.
  const offset = n + 2;

  // Fenwick tree storing counts of previous prefix sums.
  const tree = new Int32Array(n * 2 + 5);

  // Add one occurrence at Fenwick index i.
  const add = (i: number): void => {
    // Move upward through responsible Fenwick buckets.
    for (; i < tree.length; i += i & -i) tree[i]++;
  };

  // Count stored prefix sums with Fenwick index <= i.
  const sum = (i: number): number => {
    // Accumulator for prefix count.
    let res = 0;

    // Move downward through Fenwick buckets.
    for (; i > 0; i -= i & -i) res += tree[i];

    // Return count of previous prefixes up to i.
    return res;
  };

  // Current transformed prefix sum: target => +1, other => -1.
  let pref = 0;

  // Number of subarrays whose transformed sum is positive.
  let ans = 0;

  // Empty prefix before any element.
  add(offset);

  // Process every number as the right endpoint.
  for (const x of nums) {
    // Update prefix with +1 for target, -1 otherwise.
    pref += x === target ? 1 : -1;

    // Need previous prefix < current prefix, so subarray sum > 0.
    ans += sum(pref + offset - 1);

    // Store current prefix for future subarrays.
    add(pref + offset);
  }

  // Return total valid subarrays.
  return ans;
}
