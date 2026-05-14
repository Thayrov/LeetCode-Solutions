/*
2784. Check if Array is Good

Hint
You are given an integer array nums. We consider an array good if it is a permutation of an array base[n].
base[n] = [1, 2, ..., n - 1, n, n] (in other words, it is an array of length n + 1 which contains 1 to n - 1 exactly once, plus two occurrences of n). For example, base[1] = [1, 1] and base[3] = [1, 2, 3, 3].
Return true if the given array is good, otherwise return false.

Note: A permutation of integers represents an arrangement of these numbers.

Example 1:
Input: nums = [2, 1, 3]
Output: false
Explanation: Since the maximum element of the array is 3, the only candidate n for which this array could be a permutation of base[n], is n = 3. However, base[3] has four elements but array nums has three. Therefore, it can not be a permutation of base[3] = [1, 2, 3, 3]. So the answer is false.

Example 2:
Input: nums = [1, 3, 3, 2]
Output: true
Explanation: Since the maximum element of the array is 3, the only candidate n for which this array could be a permutation of base[n], is n = 3. It can be seen that nums is a permutation of base[3] = [1, 2, 3, 3] (by swapping the second and fourth elements in nums, we reach base[3]). Therefore, the answer is true.

Example 3:
Input: nums = [1, 1]
Output: true
Explanation: Since the maximum element of the array is 1, the only candidate n for which this array could be a permutation of base[n], is n = 1. It can be seen that nums is a permutation of base[1] = [1, 1]. Therefore, the answer is true.

Example 4:
Input: nums = [3, 4, 4, 1, 2, 1]
Output: false
Explanation: Since the maximum element of the array is 4, the only candidate n for which this array could be a permutation of base[n], is n = 4. However, base[4] has five elements but array nums has six. Therefore, it can not be a permutation of base[4] = [1, 2, 3, 4, 4]. So the answer is false.

Constraints:
1 <= nums.length <= 100
1 <= num[i] <= 200

</> Typescript code:
*/

function isGood(nums: number[]): boolean {
  // The base array has length n + 1, so n must be nums.length - 1.
  const n = nums.length - 1;

  // count[i] stores how many times value i appears.
  const count = new Array(n + 1).fill(0);

  // Count every number in nums.
  for (const num of nums) {
    // Values outside [1, n] cannot belong to base[n].
    if (num < 1 || num > n) return false;

    // Record one occurrence of num.
    count[num]++;
  }

  // Values from 1 to n - 1 must appear exactly once.
  for (let i = 1; i < n; i++) {
    // Any missing or duplicated value makes nums invalid.
    if (count[i] !== 1) return false;
  }

  // Value n must appear exactly twice.
  return count[n] === 2;
}
