/*
3737. Count Subarrays With Majority Element I

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
​​​​​​All 10 subarrays have 1 as the majority element.

Example 3:
Input: nums = [1,2,3], target = 4
Output: 0
Explanation:
target = 4 does not appear in nums at all. Therefore, there cannot be any subarray where 4 is the majority element. Hence the answer is 0.

Constraints:
1 <= nums.length <= 1000
1 <= nums[i] <= 10​​​​​​​^9
1 <= target <= 10^9

</> Typescript code:
*/

function countMajoritySubarrays(nums: number[], target: number): number {
  // Stores the array length.
  const n = nums.length;

  // Fenwick tree needs indexes for prefix sums in range [-n, n], plus padding.
  const size = n * 2 + 3;

  // Shifts negative prefix sums into positive Fenwick indexes.
  const offset = n + 1;

  // Fenwick tree where each index stores counts of previous prefix sums.
  const bit = new Int32Array(size + 1);

  // Current transformed prefix sum: target = +1, non-target = -1.
  let prefix = 0;

  // Counts subarrays whose transformed sum is positive.
  let ans = 0;

  // Adds one occurrence of a prefix-sum index into the Fenwick tree.
  const add = (i: number): void => {
    // Walks upward through Fenwick parent ranges.
    for (; i <= size; i += i & -i) bit[i]++;
  };

  // Returns count of stored prefix sums with index <= i.
  const sum = (i: number): number => {
    // Accumulates Fenwick prefix count.
    let res = 0;

    // Walks downward through Fenwick ranges.
    for (; i > 0; i -= i & -i) res += bit[i];

    // Returns total previous prefixes up to index i.
    return res;
  };

  // Stores empty prefix sum before processing any element.
  add(offset);

  // Processes each value as the right end of a subarray.
  for (const x of nums) {
    // Target contributes +1, every other value contributes -1.
    prefix += x === target ? 1 : -1;

    // A subarray has target majority iff currentPrefix - previousPrefix > 0.
    ans += sum(prefix + offset - 1);

    // Stores current prefix for future subarrays.
    add(prefix + offset);
  }

  // Returns the number of valid subarrays.
  return ans;
}
