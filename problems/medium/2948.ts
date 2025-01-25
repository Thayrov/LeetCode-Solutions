/* 
2948. Make Lexicographically Smallest Array by Swapping Elements

You are given a 0-indexed array of positive integers nums and a positive integer limit.

In one operation, you can choose any two indices i and j and swap nums[i] and nums[j] if |nums[i] - nums[j]| <= limit.

Return the lexicographically smallest array that can be obtained by performing the operation any number of times.

An array a is lexicographically smaller than an array b if in the first position where a and b differ, array a has an element that is less than the corresponding element in b. For example, the array [2,10,3] is lexicographically smaller than the array [10,2,3] because they differ at index 0 and 2 < 10.

Example 1:
Input: nums = [1,5,3,9,8], limit = 2
Output: [1,3,5,8,9]
Explanation: Apply the operation 2 times:
- Swap nums[1] with nums[2]. The array becomes [1,3,5,9,8]
- Swap nums[3] with nums[4]. The array becomes [1,3,5,8,9]
We cannot obtain a lexicographically smaller array by applying any more operations.
Note that it may be possible to get the same result by doing different operations.

Example 2:
Input: nums = [1,7,6,18,2,1], limit = 3
Output: [1,6,7,18,1,2]
Explanation: Apply the operation 3 times:
- Swap nums[1] with nums[2]. The array becomes [1,6,7,18,2,1]
- Swap nums[0] with nums[4]. The array becomes [2,6,7,18,1,1]
- Swap nums[0] with nums[5]. The array becomes [1,6,7,18,1,2]
We cannot obtain a lexicographically smaller array by applying any more operations.

Example 3:
Input: nums = [1,7,28,19,10], limit = 3
Output: [1,7,28,19,10]
Explanation: [1,7,28,19,10] is the lexicographically smallest array we can obtain because we cannot apply the operation on any two indices.

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^9
1 <= limit <= 10^9

</> Typescript Code:
*/

function lexicographicallySmallestArray(nums: number[], limit: number): number[] {
  // n holds the size of the array
  const n = nums.length;
  // parent and rank arrays for union-find
  const parent = new Array(n).fill(0).map((_, i) => i);
  const rank = new Array(n).fill(0);
  // find function compresses paths to root
  const find = (x: number): number => {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  };
  // unite function merges two sets if their roots differ
  const unite = (x: number, y: number): void => {
    const rx = find(x),
      ry = find(y);
    if (rx !== ry) {
      // attach smaller rank tree under bigger rank tree
      if (rank[rx] < rank[ry]) parent[rx] = ry;
      else {
        parent[ry] = rx;
        if (rank[rx] === rank[ry]) rank[rx]++;
      }
    }
  };
  // arr maps each element to [value, index] and sorts by value
  const arr = nums.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0]);
  // union adjacent elements in sorted order if their value difference is within limit
  for (let i = 0; i < n - 1; i++)
    if (arr[i + 1][0] - arr[i][0] <= limit) unite(arr[i][1], arr[i + 1][1]);
  // groups will contain connected indices under the same root
  const groups = new Map<number, number[]>();
  for (let i = 0; i < n; i++) {
    const r = find(i);
    if (!groups.has(r)) groups.set(r, []);
    groups.get(r)!.push(i);
  }
  // sort indices and place them back with sorted values
  for (const [r, inds] of groups.entries()) {
    const vals = inds.map(i => nums[i]).sort((a, b) => a - b);
    inds.sort((a, b) => a - b);
    for (let k = 0; k < inds.length; k++) nums[inds[k]] = vals[k];
  }
  // return the updated array
  return nums;
}
