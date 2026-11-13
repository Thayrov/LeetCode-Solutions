/*
3420. Count Non-Decreasing Subarrays After K Operations

You are given an array nums of n integers and an integer k.

For each subarray of nums, you can apply up to k operations on it. In each operation, you increment any element of the subarray by 1.

Note that each subarray is considered independently, meaning changes made to one subarray do not persist to another.

Return the number of subarrays that you can make non-decreasing after performing at most k operations.

An array is said to be non-decreasing if each element is greater than or equal to its previous element, if it exists.

Example 1:
Input: nums = [6,3,1,2,4,4], k = 7
Output: 17
Explanation:
Out of all 21 possible subarrays of nums, only the subarrays [6, 3, 1], [6, 3, 1, 2], [6, 3, 1, 2, 4] and [6, 3, 1, 2, 4, 4] cannot be made non-decreasing after applying up to k = 7 operations. Thus, the number of non-decreasing subarrays is 21 - 4 = 17.

Example 2:
Input: nums = [6,3,1,3,6], k = 4
Output: 12
Explanation:
The subarray [3, 1, 3, 6] along with all subarrays of nums with three or fewer elements, except [6, 3, 1], can be made non-decreasing after k operations. There are 5 subarrays of a single element, 4 subarrays of two elements, and 2 subarrays of three elements except [6, 3, 1], so there are 1 + 5 + 4 + 2 = 12 subarrays that can be made non-decreasing.

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^9
1 <= k <= 10^9

</> Typescript code:
*/

function countNonDecreasingSubarrays(nums: number[], k: number): number {
  // Cache array length.
  const n = nums.length;
  // Build prefix sums for O(1) range sums.
  const pref = new Array<number>(n + 1).fill(0);
  // Accumulate prefix sums.
  for (let i = 0; i < n; i++) pref[i + 1] = pref[i] + nums[i];
  // nxt[i] = next index right of i with value >= nums[i], else n.
  const nxt = new Array<number>(n).fill(n);
  // Monotonic stack of next-greater-or-equal candidates.
  const st: number[] = [];
  // Scan right to left to resolve next greater-or-equal.
  for (let i = n - 1; i >= 0; i--) {
    // Drop smaller values; surviving top (if any) is next >=.
    while (st.length > 0 && nums[st[st.length - 1]] < nums[i]) st.pop();
    // Record jump target or sentinel.
    nxt[i] = st.length > 0 ? st[st.length - 1] : n;
    // Push current as candidate for the left.
    st.push(i);
  }
  // Binary lifting depth covers n <= 10^5.
  const LOG = 18;
  // up[e][i] = index after 2^e record-high jumps from i.
  const up: number[][] = Array.from({ length: LOG }, () => new Array<number>(n + 1).fill(n));
  // cs[e][i] = fix-up cost of those 2^e full segments.
  const cs: number[][] = Array.from({ length: LOG }, () => new Array<number>(n + 1).fill(0));
  // Seed level-0 jumps and single-segment costs.
  for (let i = 0; i < n; i++) {
    // Direct next record high.
    up[0][i] = nxt[i];
    // Cost of [i, nxt[i]): peak times length minus actual sum.
    cs[0][i] = nums[i] * (nxt[i] - i) - (pref[nxt[i]] - pref[i]);
  }
  // Double jumps bottom-up.
  for (let e = 1; e < LOG; e++) {
    // Compose two 2^(e-1) jumps per start.
    for (let i = 0; i <= n; i++) {
      // Midpoint after first half.
      const mid = up[e - 1][i];
      // Landing after second half.
      up[e][i] = up[e - 1][mid];
      // Additive cost of both halves.
      cs[e][i] = cs[e - 1][i] + cs[e - 1][mid];
    }
  }
  // Min increments making [l, r] non-decreasing via increments.
  const cost = (l: number, r: number): number => {
    // Accumulated cost, cursor at current record high.
    let ans = 0;
    let cur = l;
    // Greedily take largest jumps fully inside [l, r].
    for (let e = LOG - 1; e >= 0; e--) {
      // Landing index of this jump.
      const nx = up[e][cur];
      // Absorb jump when it stays within r.
      if (nx <= r) {
        ans += cs[e][cur];
        cur = nx;
      }
    }
    // Tail [cur, r] shares peak nums[cur].
    ans += nums[cur] * (r - cur + 1) - (pref[r + 1] - pref[cur]);
    return ans;
  };
  // Valid subarray count.
  let ans = 0;
  // Left edge of sliding window; cost shrinks as it advances.
  let l = 0;
  // Expand right edge; minimal feasible l only moves forward.
  for (let r = 0; r < n; r++) {
    // Shrink until window fits the budget.
    while (cost(l, r) > k) l++;
    // All starts in [l, r] are valid for this r.
    ans += r - l + 1;
  }
  return ans;
}
