/* 
2176. Count Equal and Divisible Pairs in an Array

Given a 0-indexed integer array nums of length n and an integer k, return the number of pairs (i, j) where 0 <= i < j < n, such that nums[i] == nums[j] and (i * j) is divisible by k.

Example 1:
Input: nums = [3,1,2,2,2,1,3], k = 2
Output: 4
Explanation:
There are 4 pairs that meet all the requirements:
- nums[0] == nums[6], and 0 * 6 == 0, which is divisible by 2.
- nums[2] == nums[3], and 2 * 3 == 6, which is divisible by 2.
- nums[2] == nums[4], and 2 * 4 == 8, which is divisible by 2.
- nums[3] == nums[4], and 3 * 4 == 12, which is divisible by 2.

Example 2:
Input: nums = [1,2,3,4], k = 1
Output: 0
Explanation: Since no value in nums is repeated, there are no pairs (i,j) that meet all the requirements.

Constraints:
1 <= nums.length <= 100
1 <= nums[i], k <= 100

</> Typescript code:
*/

function countPairs(nums: number[], k: number): number {
  // collect all positive divisors of k
  const divisors: number[] = [];
  for (let d = 1; d <= k; ++d) if (k % d === 0) divisors.push(d);
  // map each divisor to its index in the divisors array
  const divisorIndex = new Map<number, number>();
  for (let i = 0; i < divisors.length; ++i) divisorIndex.set(divisors[i], i);

  let result = 0; // final count of valid pairs
  const valueMap = new Map<number, number[]>(); // map: value -> counts of previous indices per divisor

  // helper: greatest common divisor
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

  // iterate over each index j in the array
  for (let j = 0; j < nums.length; ++j) {
    const v = nums[j]; // current value
    const g = gcd(j, k); // gcd of index and k
    const denom = k / g; // required divisor factor for i
    const idx = divisorIndex.get(denom)!; // lookup position in divisors array

    const counts = valueMap.get(v); // counts of previous indices for this value
    if (counts) {
      // add how many previous indices i satisfy (i * j) % k == 0
      result += counts[idx];
    }

    if (!counts) {
      // first time seeing this value: initialize counts array
      const arr = new Array(divisors.length).fill(0);
      // update counts for current index j
      for (let dIdx = 0; dIdx < divisors.length; ++dIdx) {
        if (j % divisors[dIdx] === 0) {
          arr[dIdx]++; // j contributes to this divisor class
        }
      }
      valueMap.set(v, arr); // store for future comparisons
    } else {
      // already seen this value: update existing counts array
      for (let dIdx = 0; dIdx < divisors.length; ++dIdx) {
        if (j % divisors[dIdx] === 0) {
          counts[dIdx]++; // increment count for divisor class
        }
      }
    }
  }

  return result; // return total count
}
