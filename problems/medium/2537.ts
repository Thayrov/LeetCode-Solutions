/* 
2537. Count the Number of Good Subarrays

Given an integer array nums and an integer k, return the number of good subarrays of nums.

A subarray arr is good if there are at least k pairs of indices (i, j) such that i < j and arr[i] == arr[j].

A subarray is a contiguous non-empty sequence of elements within an array.

Example 1:
Input: nums = [1,1,1,1,1], k = 10
Output: 1
Explanation: The only good subarray is the array nums itself.

Example 2:
Input: nums = [3,1,4,3,2,2,4], k = 2
Output: 4
Explanation: There are 4 different good subarrays:
- [3,1,4,3,2,2] that has 2 pairs.
- [3,1,4,3,2,2,4] that has 3 pairs.
- [1,4,3,2,2,4] that has 2 pairs.
- [4,3,2,2,4] that has 2 pairs.

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i], k <= 10^9

</> Typescript code: 
*/

function countGood(nums: number[], k: number): number {
  // Get the total number of elements in the input array.
  const n = nums.length;
  // Create a map to track the frequency of each number within the current sliding window.
  let freq = new Map<number, number>();
  // Initialize the count of equal index pairs within the current window.
  let countPairs = 0;
  // Initialize the result to accumulate the total number of good subarrays.
  let result = 0;
  // Left pointer for the sliding window.
  let i = 0;
  // Iterate with the right pointer (j) through each element in the array.
  for (let j = 0; j < n; j++) {
    // Retrieve the current element at the right end of the window.
    let x = nums[j];
    // Get the current frequency of x in the window (default to 0 if not present).
    let f = freq.get(x) || 0;
    // Each occurrence of x already in the window forms a new valid pair with the current x.
    countPairs += f;
    // Update the frequency count for x as it is now included in the window.
    freq.set(x, f + 1);
    // While the window has at least k pairs, shrink the window from the left.
    while (countPairs >= k && i <= j) {
      // All subarrays starting at i and ending from j to n-1 will have at least k pairs.
      result += n - j;
      // Get the element at the left end of the window that is about to be removed.
      let y = nums[i];
      // Retrieve its current frequency (it is guaranteed to exist).
      let f_y = freq.get(y)!;
      // Decrement the frequency for y as it is being removed from the window.
      freq.set(y, f_y - 1);
      // Removing y reduces the pair count by the number of remaining occurrences of y.
      countPairs -= f_y - 1;
      // Move the left pointer to effectively shrink the window.
      i++;
    }
  }
  // Return the total number of good subarrays found.
  return result;
}
