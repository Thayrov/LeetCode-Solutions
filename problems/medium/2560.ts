/* 
2560. House Robber IV

There are several consecutive houses along a street, each of which has some money inside. There is also a robber, who wants to steal money from the homes, but he refuses to steal from adjacent homes.

The capability of the robber is the maximum amount of money he steals from one house of all the houses he robbed.

You are given an integer array nums representing how much money is stashed in each house. More formally, the ith house from the left has nums[i] dollars.

You are also given an integer k, representing the minimum number of houses the robber will steal from. It is always possible to steal at least k houses.

Return the minimum capability of the robber out of all the possible ways to steal at least k houses.

Example 1:
Input: nums = [2,3,5,9], k = 2
Output: 5
Explanation: 
There are three ways to rob at least 2 houses:
- Rob the houses at indices 0 and 2. Capability is max(nums[0], nums[2]) = 5.
- Rob the houses at indices 0 and 3. Capability is max(nums[0], nums[3]) = 9.
- Rob the houses at indices 1 and 3. Capability is max(nums[1], nums[3]) = 9.
Therefore, we return min(5, 9, 9) = 5.

Example 2:
Input: nums = [2,7,9,3,1], k = 2
Output: 2
Explanation: There are 7 ways to rob the houses. The way which leads to minimum capability is to rob the house at index 0 and 4. Return max(nums[0], nums[4]) = 2.

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^9
1 <= k <= (nums.length + 1)/2

</> Typescript Code:
*/

function minCapability(nums: number[], k: number): number {
  // Initialize the binary search bounds: 'low' is the smallest money value and 'high' is the largest.
  let low = Math.min(...nums),
    high = Math.max(...nums);

  // Continue the search until the lower and upper bounds converge.
  while (low < high) {
    // Determine the mid-value of the current search range.
    let mid = Math.floor((low + high) / 2);

    // Initialize the counter for houses that can be robbed with money <= mid.
    let count = 0;
    // Use a pointer to traverse the houses.
    for (let i = 0; i < nums.length; ) {
      // If the current house's amount is within the allowed capability (<= mid),
      // count it and skip the next house to satisfy the non-adjacency rule.
      if (nums[i] <= mid) {
        count++;
        i += 2;
      } else {
        // Otherwise, simply move to the next house.
        i++;
      }
    }

    // If it's possible to rob at least 'k' houses with the current mid as capability,
    // try a lower capability by updating the upper bound.
    if (count >= k) high = mid;
    // Otherwise, increase the lower bound to search for a higher capability.
    else low = mid + 1;
  }
  // When the loop terminates, 'low' (or 'high') holds the minimum capability required.
  return low;
}
