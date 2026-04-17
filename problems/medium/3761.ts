/*
3761. Minimum Absolute Distance Between Mirror Pairs

Hint
You are given an integer array nums.
A mirror pair is a pair of indices (i, j) such that:
0 <= i < j < nums.length, and
reverse(nums[i]) == nums[j], where reverse(x) denotes the integer formed by reversing the digits of x. Leading zeros are omitted after reversing, for example reverse(120) = 21.
Return the minimum absolute distance between the indices of any mirror pair. The absolute distance between indices i and j is abs(i - j).
If no mirror pair exists, return -1.

Example 1:
Input: nums = [12,21,45,33,54]
Output: 1
Explanation:
The mirror pairs are:
(0, 1) since reverse(nums[0]) = reverse(12) = 21 = nums[1], giving an absolute distance abs(0 - 1) = 1.
(2, 4) since reverse(nums[2]) = reverse(45) = 54 = nums[4], giving an absolute distance abs(2 - 4) = 2.
The minimum absolute distance among all pairs is 1.

Example 2:
Input: nums = [120,21]
Output: 1
Explanation:
There is only one mirror pair (0, 1) since reverse(nums[0]) = reverse(120) = 21 = nums[1].
The minimum absolute distance is 1.

Example 3:
Input: nums = [21,120]
Output: -1
Explanation:
There are no mirror pairs in the array.

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^9

</> Typescript code:
*/

function minMirrorPairDistance(nums: number[]): number {
  // Initialize minDistance with Infinity to easily identify the smallest value found
  let minDistance = Infinity;
  // Map to store the most recent index 'i' where a value was registered as a potential mirror
  const lastSeen = new Map<number, number>();

  for (let j = 0; j < nums.length; j++) {
    const val = nums[j];

    // If the current value nums[j] exists in our map, it means we previously
    // encountered its reverse at index 'i'. (i, j) is a mirror pair.
    if (lastSeen.has(val)) {
      const distance = j - lastSeen.get(val)!;
      // Update the global minimum if this pair is closer than previous ones
      if (distance < minDistance) minDistance = distance;
    }

    // Perform numerical reversal of the current number to store for future checks
    // This is significantly faster than converting to string and back to number
    let num = val;
    let rev = 0;
    while (num > 0) {
      rev = rev * 10 + (num % 10);
      num = (num / 10) | 0; // Bitwise OR with 0 is a fast way to perform integer truncation
    }

    // Store the current index 'j' as the latest occurrence of this reversed value.
    // We only care about the latest index to minimize the distance (j - i).
    lastSeen.set(rev, j);
  }

  // Return -1 if no pairs were found, otherwise return the calculated minimum
  return minDistance === Infinity ? -1 : minDistance;
}
