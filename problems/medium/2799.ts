/* 
2799. Count Complete Subarrays in an Array

You are given an array nums consisting of positive integers.

We call a subarray of an array complete if the following condition is satisfied:

The number of distinct elements in the subarray is equal to the number of distinct elements in the whole array.
Return the number of complete subarrays.

A subarray is a contiguous non-empty part of an array.

Example 1:
Input: nums = [1,3,1,2,2]
Output: 4
Explanation: The complete subarrays are the following: [1,3,1,2], [1,3,1,2,2], [3,1,2] and [3,1,2,2].

Example 2:
Input: nums = [5,5,5,5]
Output: 10
Explanation: The array consists only of the integer 5, so any subarray is complete. The number of subarrays that we can choose is 10.

Constraints:
1 <= nums.length <= 1000
1 <= nums[i] <= 2000

</> Typescript code:
*/

function countCompleteSubarrays(nums: number[]): number {
  // total number of elements
  const n = nums.length;
  // K = number of distinct elements in the whole array
  const K = new Set(nums).size;
  // maximum possible value in nums (constraints)
  const maxVal = 2000;
  // total possible subarrays
  const totalSubarrays = (n * (n + 1)) / 2;
  // sliding-window frequency array for values up to maxVal
  const freqWin = new Array<number>(maxVal + 1);
  let countAtMost = 0; // will hold count of subarrays with ≤ k distinct
  let left = 0,
    distinct = 0; // window left pointer and current distinct count

  // helper: count subarrays with at most k distinct elements
  const atMost = (k: number): number => {
    freqWin.fill(0); // reset frequency counts
    countAtMost = 0;
    left = 0;
    distinct = 0;
    // expand window with right pointer
    for (let right = 0; right < n; right++) {
      // add nums[right]; if first of its kind, increment distinct
      if (freqWin[nums[right]]++ === 0) distinct++;
      // if too many distinct, shrink from left
      while (distinct > k) {
        // remove nums[left]; if its count drops to 0, decrement distinct
        if (--freqWin[nums[left]] === 0) distinct--;
        left++;
      }
      // all subarrays ending at right starting from any index ≥ left are valid
      countAtMost += right - left + 1;
    }
    return countAtMost;
  };

  // number of subarrays with exactly K distinct = totalSubarrays − atMost(K−1)
  return totalSubarrays - atMost(K - 1);
}
