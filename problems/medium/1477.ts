/*
1477. Find Two Non-overlapping Sub-arrays Each With Target Sum

You are given an array of integers arr and an integer target.

You have to find two non-overlapping sub-arrays of arr each with a sum equal target. There can be multiple answers so you have to find an answer where the sum of the lengths of the two sub-arrays is minimum.

Return the minimum sum of the lengths of the two required sub-arrays, or return -1 if you cannot find such two sub-arrays.

Example 1:
Input: arr = [3,2,2,4,3], target = 3
Output: 2
Explanation: Only two sub-arrays have sum = 3 ([3] and [3]). The sum of their lengths is 2.

Example 2:
Input: arr = [7,3,4,7], target = 7
Output: 2
Explanation: Although we have three non-overlapping sub-arrays of sum = 7 ([7], [3,4] and [7]), but we will choose the first and third sub-arrays as the sum of their lengths is 2.

Example 3:
Input: arr = [4,3,2,6,2,3,4], target = 6
Output: -1
Explanation: We have only one sub-array of sum = 6.

Constraints:
1 <= arr.length <= 10^5
1 <= arr[i] <= 1000
1 <= target <= 10^8

Hints:
1. Let prefix[i] be the minimum length of a target-sum sub-array ending before i, and suffix[i] be the minimum length of a target-sum sub-array starting at or after i.
2. The answer is min(prefix[i] + suffix[i]) over every split position i.
3. Because all values are positive, a sliding window enumerates every target-sum sub-array in linear time.

</> Typescript code:
*/

function minSumOfLengths(arr: number[], target: number): number {
  // Cache the input length for indexing and the sentinel value.
  const n = arr.length;
  // No valid sub-array can have length n + 1.
  const inf = n + 1;
  // Store the best target-sum sub-array length ending before each index.
  const best = new Int32Array(n + 1);
  // Initialize every prefix minimum as unavailable.
  best.fill(inf);
  // Track the left boundary of the positive-value sliding window.
  let left = 0;
  // Track the current window sum.
  let sum = 0;
  // Use twice the sentinel to represent an unknown answer.
  let answer = inf * 2;

  // Extend the window once for every array element.
  for (let right = 0; right < n; right++) {
    // Include the new rightmost value.
    sum += arr[right];
    // Remove values until the positive window sum is at most target.
    while (sum > target) sum -= arr[left++];

    // Carry forward the best prefix ending before this window.
    let prefixBest = best[right];
    // A window with the target sum is a candidate second sub-array.
    if (sum === target) {
      // Compute the current target-sum window length.
      const length = right - left + 1;
      // Combine it only with a target-sum window ending before left.
      if (best[left] < inf) {
        // Compute the total length of the two non-overlapping windows.
        const candidate = best[left] + length;
        // Keep the smallest valid total.
        if (candidate < answer) answer = candidate;
      }
      // Make the current window available to later windows.
      if (length < prefixBest) prefixBest = length;
    }
    // Publish the prefix minimum for the next index.
    best[right + 1] = prefixBest;
  }

  // Convert the sentinel answer to the required failure value.
  return answer === inf * 2 ? -1 : answer;
}
