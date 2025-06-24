/*
2200. Find All K-Distant Indices in an Array

You are given a 0-indexed integer array nums and two integers key and k. A k-distant index is an index i of nums for which there exists at least one index j such that |i - j| <= k and nums[j] == key.
Return a list of all k-distant indices sorted in increasing order.

Example 1:
Input: nums = [3,4,9,1,3,9,5], key = 9, k = 1
Output: [1,2,3,4,5,6]
Explanation: Here, nums[2] == key and nums[5] == key.
- For index 0, |0 - 2| > k and |0 - 5| > k, so there is no j where |0 - j| <= k and nums[j] == key. Thus, 0 is not a k-distant index.
- For index 1, |1 - 2| <= k and nums[2] == key, so 1 is a k-distant index.
- For index 2, |2 - 2| <= k and nums[2] == key, so 2 is a k-distant index.
- For index 3, |3 - 2| <= k and nums[2] == key, so 3 is a k-distant index.
- For index 4, |4 - 5| <= k and nums[5] == key, so 4 is a k-distant index.
- For index 5, |5 - 5| <= k and nums[5] == key, so 5 is a k-distant index.
- For index 6, |6 - 5| <= k and nums[5] == key, so 6 is a k-distant index.
Thus, we return [1,2,3,4,5,6] which is sorted in increasing order. 

Example 2:
Input: nums = [2,2,2,2,2], key = 2, k = 2
Output: [0,1,2,3,4]
Explanation: For all indices i in nums, there exists some index j such that |i - j| <= k and nums[j] == key, so every index is a k-distant index. 
Hence, we return [0,1,2,3,4].
 
Constraints:
1 <= nums.length <= 1000
1 <= nums[i] <= 1000
key is an integer from the array nums.
1 <= k <= nums.length

</> Typescript code:
*/

function findKDistantIndices(nums: number[], key: number, k: number): number[] {
  // Get the total number of elements in the input array.
  const n = nums.length;

  // Initialize an empty array to store the indices where nums[j] is equal to the 'key'.
  const keyIndices: number[] = [];

  // Iterate through the 'nums' array from start to end.
  for (let i = 0; i < n; i++) {
    // If the current element nums[i] matches the 'key',
    if (nums[i] === key) {
      // Add its index 'i' to the 'keyIndices' array.
      keyIndices.push(i);
    }
  }

  // If no occurrences of 'key' are found in 'nums', no k-distant indices exist.
  if (keyIndices.length === 0) {
    // Return an empty array.
    return [];
  }

  // Initialize an empty array to store the k-distant ranges associated with each 'key' occurrence.
  // Each range will be represented as a tuple [start_index, end_index].
  const ranges: [number, number][] = [];

  // Iterate through each index 'j' where 'key' was found.
  for (const j of keyIndices) {
    // Calculate the starting index of the k-distant range.
    // It's 'j - k', but clamped to be not less than 0 (array boundary).
    const start = Math.max(0, j - k);
    // Calculate the ending index of the k-distant range.
    // It's 'j + k', but clamped to be not greater than n - 1 (array boundary).
    const end = Math.min(n - 1, j + k);
    // Add this computed range [start, end] to the 'ranges' array.
    ranges.push([start, end]);
  }

  // Sort the 'ranges' array in ascending order based on their starting indices.
  // If start indices are equal, the order doesn't strictly matter for merging, but it's good practice.
  ranges.sort((a, b) => a[0] - b[0]);

  // Initialize an array to store the final merged k-distant ranges.
  const mergedRanges: [number, number][] = [];

  // Take the first range from the sorted list as the initial current merged range.
  let currentMergedRange = ranges[0];
  // Add this initial range to the 'mergedRanges' list.
  mergedRanges.push(currentMergedRange);

  // Iterate through the sorted 'ranges' starting from the second element.
  for (let i = 1; i < ranges.length; i++) {
    // Get the next range to consider for merging.
    const nextRange = ranges[i];

    // Check if the 'nextRange' overlaps with or is directly adjacent to the 'currentMergedRange'.
    // An overlap exists if the start of 'nextRange' is less than or equal to (end of current + 1).
    if (nextRange[0] <= currentMergedRange[1] + 1) {
      // If there's an overlap or adjacency, extend the end of the 'currentMergedRange'.
      // The new end will be the maximum of its current end and the end of 'nextRange'.
      currentMergedRange[1] = Math.max(currentMergedRange[1], nextRange[1]);
    } else {
      // If there is no overlap, the 'nextRange' is a new distinct range.
      // Set 'currentMergedRange' to this 'nextRange'.
      currentMergedRange = nextRange;
      // Add this new distinct range to the 'mergedRanges' list.
      mergedRanges.push(currentMergedRange);
    }
  }

  // Initialize an empty array to store the final list of k-distant indices.
  const result: number[] = [];

  // Iterate through each merged range.
  for (const range of mergedRanges) {
    // For each merged range [start, end], iterate from 'start' to 'end' (inclusive).
    for (let i = range[0]; i <= range[1]; i++) {
      // Add each index within this range to the 'result' array.
      result.push(i);
    }
  }

  // Return the sorted list of all k-distant indices.
  return result;
}
