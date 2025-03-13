/* 
3356. Zero Array Transformation II

You are given an integer array nums of length n and a 2D array queries where queries[i] = [li, ri, vali].

Each queries[i] represents the following action on nums:

Decrement the value at each index in the range [li, ri] in nums by at most vali.
The amount by which each value is decremented can be chosen independently for each index.
A Zero Array is an array with all its elements equal to 0.

Return the minimum possible non-negative value of k, such that after processing the first k queries in sequence, nums becomes a Zero Array. If no such k exists, return -1.

Example 1:
Input: nums = [2,0,2], queries = [[0,2,1],[0,2,1],[1,1,3]]
Output: 2
Explanation:
For i = 0 (l = 0, r = 2, val = 1):
Decrement values at indices [0, 1, 2] by [1, 0, 1] respectively.
The array will become [1, 0, 1].
For i = 1 (l = 0, r = 2, val = 1):
Decrement values at indices [0, 1, 2] by [1, 0, 1] respectively.
The array will become [0, 0, 0], which is a Zero Array. Therefore, the minimum value of k is 2.

Example 2:
Input: nums = [4,3,2,1], queries = [[1,3,2],[0,2,1]]
Output: -1
Explanation:
For i = 0 (l = 1, r = 3, val = 2):
Decrement values at indices [1, 2, 3] by [2, 2, 1] respectively.
The array will become [4, 1, 0, 0].
For i = 1 (l = 0, r = 2, val = 1):
Decrement values at indices [0, 1, 2] by [1, 1, 0] respectively.
The array will become [3, 0, 0, 0], which is not a Zero Array.

Constraints:
1 <= nums.length <= 10^5
0 <= nums[i] <= 5 * 10^5
1 <= queries.length <= 10^5
queries[i].length == 3
0 <= li <= ri < nums.length
1 <= vali <= 5 * 10^5

</> Typescript code:
*/

function minZeroArray(nums: number[], queries: number[][]): number {
  // Get the length of the input array and the number of queries.
  const n = nums.length,
    m = queries.length;

  // Define a helper function that checks if the first k queries can reduce nums to a zero array.
  function canZero(k: number): boolean {
    // Initialize a difference array of size n+1 with all elements set to 0.
    const diff = new Array(n + 1).fill(0);
    // Apply the first k queries to the difference array.
    for (let i = 0; i < k; i++) {
      const [l, r, val] = queries[i]; // Destructure the query into its components.
      diff[l] += val; // Add the available decrement at index l.
      if (r + 1 < diff.length) diff[r + 1] -= val; // Subtract it just after index r.
    }
    // Compute the cumulative effect from the difference array.
    let cum = 0;
    for (let i = 0; i < n; i++) {
      cum += diff[i]; // Update the cumulative sum at index i.
      // If the cumulative decrement is less than the required amount at index i,
      // then these queries cannot zero out nums[i].
      if (cum < nums[i]) return false;
    }
    // If every index is covered, return true.
    return true;
  }

  // Set up binary search boundaries: lo starts at 0 and hi at m+1 (an impossible value if no solution exists).
  let lo = 0,
    hi = m + 1;
  // Perform binary search to find the minimal k where canZero(k) returns true.
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2); // Calculate the midpoint.
    if (canZero(mid)) {
      // If the first mid queries are enough, try to find a smaller k.
      hi = mid;
    } else {
      // Otherwise, discard the lower half and search in the upper half.
      lo = mid + 1;
    }
  }
  // If lo equals m+1, no valid k exists; otherwise, return lo as the minimum number of queries required.
  return lo === m + 1 ? -1 : lo;
}
