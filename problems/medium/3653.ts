/*
3653. XOR After Range Multiplication Queries I

Hint
You are given an integer array nums of length n and a 2D integer array queries of size q, where queries[i] = [li, ri, ki, vi].
For each query, you must apply the following operations in order:
Set idx = li.
While idx <= ri:
Update: nums[idx] = (nums[idx] * vi) % (109 + 7)
Set idx += ki.
Return the bitwise XOR of all elements in nums after processing all queries.

Example 1:
Input: nums = [1,1,1], queries = [[0,2,1,4]]
Output: 4
Explanation:
A single query [0, 2, 1, 4] multiplies every element from index 0 through index 2 by 4.
The array changes from [1, 1, 1] to [4, 4, 4].
The XOR of all elements is 4 ^ 4 ^ 4 = 4.

Example 2:
Input: nums = [2,3,1,5,4], queries = [[1,4,2,3],[0,2,1,2]]
Output: 31
Explanation:
The first query [1, 4, 2, 3] multiplies the elements at indices 1 and 3 by 3, transforming the array to [2, 9, 1, 15, 4].
The second query [0, 2, 1, 2] multiplies the elements at indices 0, 1, and 2 by 2, resulting in [4, 18, 2, 15, 4].
Finally, the XOR of all elements is 4 ^ 18 ^ 2 ^ 15 ^ 4 = 31.​​​​​​​​​​​​​​

Constraints:
1 <= n == nums.length <= 10^3
1 <= nums[i] <= 10^9
1 <= q == queries.length <= 10^3
queries[i] = [li, ri, ki, vi]
0 <= li <= ri < n
1 <= ki <= n
1 <= vi <= 10^5

</> Typescript code:
*/

function xorAfterQueries(nums: number[], queries: number[][]): number {
  // Define the modulo constant as specified in the problem
  const MOD = 1000000007;

  // Iterate through each query in the provided 2D array
  for (let i = 0; i < queries.length; i++) {
    // Destructure query parameters: start index (l), end index (r), step (k), and multiplier (v)
    const [l, r, k, v] = queries[i];

    // Loop from the starting index to the end index, incrementing by the step k
    for (let j = l; j <= r; j += k) {
      // Update the element by multiplying it with v and applying modulo
      // BigInt is used to ensure precision during multiplication before the modulo operation
      nums[j] = Number((BigInt(nums[j]) * BigInt(v)) % BigInt(MOD));
    }
  }

  // Initialize the result variable to store the cumulative XOR sum
  let result = 0;

  // Iterate through the modified array to calculate the final bitwise XOR of all elements
  for (let i = 0; i < nums.length; i++) {
    // Apply XOR operation between the current result and the current element
    result ^= nums[i];
  }

  // Return the final XOR sum of the processed array
  return result;
}
