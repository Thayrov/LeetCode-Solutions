/*
2040. Kth Smallest Product of Two Sorted Arrays

Given two sorted 0-indexed integer arrays nums1 and nums2 as well as an integer k, return the kth (1-based) smallest product of nums1[i] * nums2[j] where 0 <= i < nums1.length and 0 <= j < nums2.length.
 
Example 1:
Input: nums1 = [2,5], nums2 = [3,4], k = 2
Output: 8
Explanation: The 2 smallest products are:
- nums1[0] * nums2[0] = 2 * 3 = 6
- nums1[0] * nums2[1] = 2 * 4 = 8
The 2nd smallest product is 8.

Example 2:
Input: nums1 = [-4,-2,0,3], nums2 = [2,4], k = 6
Output: 0
Explanation: The 6 smallest products are:
- nums1[0] * nums2[1] = (-4) * 4 = -16
- nums1[0] * nums2[0] = (-4) * 2 = -8
- nums1[1] * nums2[1] = (-2) * 4 = -8
- nums1[1] * nums2[0] = (-2) * 2 = -4
- nums1[2] * nums2[0] = 0 * 2 = 0
- nums1[2] * nums2[1] = 0 * 4 = 0
The 6th smallest product is 0.

Example 3:
Input: nums1 = [-2,-1,0,1,2], nums2 = [-3,-1,2,4,5], k = 3
Output: -6
Explanation: The 3 smallest products are:
- nums1[0] * nums2[4] = (-2) * 5 = -10
- nums1[0] * nums2[3] = (-2) * 4 = -8
- nums1[4] * nums2[0] = 2 * (-3) = -6
The 3rd smallest product is -6.
 
Constraints:
1 <= nums1.length, nums2.length <= 5 * 10^4
-10^5 <= nums1[i], nums2[j] <= 10^5
1 <= k <= nums1.length * nums2.length
nums1 and nums2 are sorted.

</> Typescript code:
*/

function kthSmallestProduct(
  nums1: number[],
  nums2: number[],
  k: number
): number {
  // This helper function counts how many products of nums1[i] * nums2[j] are less than or equal to 'val'.
  const countLessOrEqual = (val: number): number => {
    let count = 0; // Initialize a counter for products less than or equal to 'val'.
    // Iterate through each number in nums1.
    for (const n1 of nums1) {
      // Special case: if n1 is 0.
      if (n1 === 0) {
        // If val is non-negative, any product with 0 will be 0, which is <= val.
        // So, all products involving 0 from nums1 and any number from nums2 will be 0.
        if (val >= 0) {
          count += nums2.length; // Add the total number of elements in nums2 to the count.
        }
        continue; // Move to the next n1.
      }

      let low = 0; // Initialize the low pointer for binary search in nums2.
      let high = nums2.length - 1; // Initialize the high pointer for binary search in nums2.
      let ans = 0; // Initialize a variable to store the count for the current n1.

      // If n1 is positive, we are looking for nums2[j] such that n1 * nums2[j] <= val.
      // This means nums2[j] <= val / n1. Since nums2 is sorted, we can use binary search.
      if (n1 > 0) {
        while (low <= high) {
          const mid = Math.floor((low + high) / 2); // Calculate the middle index.
          // If the product is less than or equal to 'val', it means all elements from nums2[0] to nums2[mid]
          // (inclusive) will also satisfy the condition when multiplied by n1.
          if (n1 * nums2[mid] <= val) {
            ans = mid + 1; // Update ans to include all elements up to mid.
            low = mid + 1; // Move low to search in the right half for potentially more elements.
          } else {
            high = mid - 1; // If the product is too large, search in the left half.
          }
        }
      }
      // If n1 is negative, we are looking for nums2[j] such that n1 * nums2[j] <= val.
      // This means nums2[j] >= val / n1 (because multiplying by a negative number flips the inequality).
      // Since nums2 is sorted in ascending order, we are looking for elements from some index 'k' to the end.
      else {
        while (low <= high) {
          const mid = Math.floor((low + high) / 2); // Calculate the middle index.
          // If the product is less than or equal to 'val', it means all elements from nums2[mid] to nums2[length-1]
          // (inclusive) will also satisfy the condition when multiplied by n1.
          if (n1 * nums2[mid] <= val) {
            ans = nums2.length - mid; // Update ans to include all elements from mid to the end.
            high = mid - 1; // Move high to search in the left half for potentially more elements that satisfy the condition.
          } else {
            low = mid + 1; // If the product is too small (e.g., negative product with large absolute value), search in the right half.
          }
        }
      }
      count += ans; // Add the count for the current n1 to the total count.
    }
    return count; // Return the total count of products less than or equal to 'val'.
  };

  // The range of possible products can be very wide: from -10^5 * 10^5 = -10^10 to 10^5 * 10^5 = 10^10.
  let left = -1e10; // Initialize the lower bound for binary search on the answer.
  let right = 1e10; // Initialize the upper bound for binary search on the answer.
  let ans = 0; // Initialize the variable to store the final answer (kth smallest product).

  // Perform binary search on the range of possible product values.
  while (left <= right) {
    const mid = Math.floor((left + right) / 2); // Calculate the middle value.
    // If the number of products less than or equal to 'mid' is greater than or equal to 'k',
    // it means 'mid' could be our answer or a larger value could be the answer.
    // We try to find a smaller possible answer by searching in the left half.
    if (countLessOrEqual(mid) >= k) {
      ans = mid; // 'mid' is a potential answer.
      right = mid - 1; // Search in the left half.
    }
    // If the number of products less than or equal to 'mid' is less than 'k',
    // it means 'mid' is too small, and we need to find a larger product.
    // So, we search in the right half.
    else {
      left = mid + 1; // Search in the right half.
    }
  }
  return ans; // Return the kth smallest product.
}
