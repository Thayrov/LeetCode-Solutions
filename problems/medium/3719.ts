/*
3719. Longest Balanced Subarray I

You are given an integer array nums.
A subarray is called balanced if the number of distinct even numbers in the subarray is equal to the number of distinct odd numbers.
Return the length of the longest balanced subarray.

Example 1:
Input: nums = [2,5,4,3]
Output: 4
Explanation:
The longest balanced subarray is [2, 5, 4, 3].
It has 2 distinct even numbers [2, 4] and 2 distinct odd numbers [5, 3]. Thus, the answer is 4.

Example 2:
Input: nums = [3,2,2,5,4]
Output: 5
Explanation:
The longest balanced subarray is [3, 2, 2, 5, 4].
It has 2 distinct even numbers [2, 4] and 2 distinct odd numbers [3, 5]. Thus, the answer is 5.

Example 3:
Input: nums = [1,2,3,2]
Output: 3
Explanation:
The longest balanced subarray is [2, 3, 2].
It has 1 distinct even number [2] and 1 distinct odd number [3]. Thus, the answer is 3.

Constraints:
1 <= nums.length <= 1500
1 <= nums[i] <= 10^5

</> Typescript code:
*/

function longestBalanced(nums: number[]): number {
  const n = nums.length; // Cache the length of the input array for performance.
  let maxLen = 0; // Initialize the variable to track the maximum length found.

  // Outer loop defines the starting point of the subarray.
  for (let i = 0; i < n; i++) {
    // Sets to track unique even and odd numbers encountered starting from index i.
    const evens = new Set<number>();
    const odds = new Set<number>();

    // Inner loop expands the subarray from the starting point i to the end of the array.
    for (let j = i; j < n; j++) {
      const val = nums[j]; // Access the current element.

      // Bitwise check (val & 1) is slightly faster than (val % 2) for parity.
      if ((val & 1) === 0) {
        evens.add(val); // Add to the set of distinct even numbers.
      } else {
        odds.add(val); // Add to the set of distinct odd numbers.
      }

      // Check if the number of distinct even elements equals the number of distinct odd elements.
      if (evens.size === odds.size) {
        const currentLen = j - i + 1; // Calculate current subarray length.
        if (currentLen > maxLen) maxLen = currentLen; // Update maxLen if current is larger.
      }
    }
  }

  return maxLen; // Return the result after checking all possible subarrays.
}
