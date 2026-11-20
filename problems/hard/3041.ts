/*
3041. Maximize Consecutive Elements in an Array After Modification

You are given a 0-indexed array nums consisting of positive integers.

Initially, you can increase the value of any element in the array by at most 1.

After that, you need to select one or more elements from the final array such that those elements are consecutive when sorted in increasing order. For example, the elements [3, 4, 5] are consecutive while [3, 4, 6] and [1, 1, 2, 3] are not.

Return the maximum number of elements that you can select.

Example 1:
Input: nums = [2,1,5,1,1]
Output: 3
Explanation:
We can increase the elements at indices 0 and 3. The resulting array is nums = [3,1,5,2,1].
We select the elements [3,1,5,2,1] and we sort them to obtain [1,2,3], which are consecutive.
It can be shown that we cannot select more than 3 consecutive elements.

Example 2:
Input: nums = [1,4,7,10]
Output: 1
Explanation:
The maximum consecutive elements that we can select is 1.

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^6

</> Typescript code:
*/

// Return the longest consecutive run obtainable by keeping or incrementing each element.
function maxSelectedElements(nums: number[]): number {
  // Store the low and high 10-bit digit histograms side by side.
  const offsets = new Uint32Array(2048);
  // Allocate one buffer for the intermediate radix order.
  const sortedLow = new Uint32Array(nums.length);
  // Count both digits before either pass modifies the input.
  for (const value of nums) {
    // Count the low digit in the first half.
    offsets[value & 1023]++;
    // Count the high digit in the second half.
    offsets[1024 + (value >>> 10)]++;
  }
  // Track the next starting offset in each independent histogram.
  let low = 0;
  // Start the high-digit order at the beginning of the array too.
  let high = 0;
  // Convert each count into the start of its bucket.
  for (let digit = 0; digit < 1024; digit++) {
    // Save the low bucket start as the total advances.
    const lowStart = low;
    // Add this bucket's size to the running low total.
    low += offsets[digit];
    // Replace the low count with its write position.
    offsets[digit] = lowStart;
    // Locate the corresponding high bucket.
    const highDigit = 1024 + digit;
    // Save the high bucket start as the total advances.
    const highStart = high;
    // Add this bucket's size to the running high total.
    high += offsets[highDigit];
    // Replace the high count with its write position.
    offsets[highDigit] = highStart;
  }
  // Stably distribute the inputs by low digit.
  for (const value of nums) sortedLow[offsets[value & 1023]++] = value;
  // Stably distribute by high digit to complete numeric ordering.
  for (const value of sortedLow) nums[offsets[1024 + (value >>> 10)]++] = value;

  // Track the previous original value and its two reachable endpoints.
  let previous = -2;
  // Store the best length ending at the previous value.
  let kept = 0;
  // Store the best length ending one above the previous value.
  let raised = 0;
  // Keep the longest run across all endpoints.
  let best = 0;
  // Process values in ascending order so obsolete endpoints can be discarded.
  for (const value of nums) {
    // A duplicate can extend the existing run ending at this value.
    if (value === previous) {
      // Use the new copy to end one higher.
      raised = kept + 1;
    // Adjacent originals can extend either of the two saved endpoints.
    } else if (value === previous + 1) {
      // Keep the longer run ending here, including the option to keep this copy.
      const nextKept = Math.max(raised, kept + 1);
      // Increment this copy using the old run ending here.
      raised++;
      // Save the kept result after consuming the old raised length.
      kept = nextKept;
    } else {
      // A gap of two allows only the old raised endpoint to precede this value.
      kept = value === previous + 2 ? raised + 1 : 1;
      // Incrementing starts a new run because no old endpoint reaches this value.
      raised = 1;
    }
    // Record the larger endpoint length before moving to the next input.
    best = Math.max(best, kept, raised);
    // Advance the original value that defines the two endpoints.
    previous = value;
  }
  // Return the longest run found at any endpoint.
  return best;
}
