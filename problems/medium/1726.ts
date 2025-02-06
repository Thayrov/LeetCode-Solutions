/* 
1726. Tuple with Same Product

Given an array nums of distinct positive integers, return the number of tuples (a, b, c, d) such that a * b = c * d where a, b, c, and d are elements of nums, and a != b != c != d.

Example 1:
Input: nums = [2,3,4,6]
Output: 8
Explanation: There are 8 valid tuples:
(2,6,3,4) , (2,6,4,3) , (6,2,3,4) , (6,2,4,3)
(3,4,2,6) , (4,3,2,6) , (3,4,6,2) , (4,3,6,2)

Example 2:
Input: nums = [1,2,4,5,10]
Output: 16
Explanation: There are 16 valid tuples:
(1,10,2,5) , (1,10,5,2) , (10,1,2,5) , (10,1,5,2)
(2,5,1,10) , (2,5,10,1) , (5,2,1,10) , (5,2,10,1)
(2,10,4,5) , (2,10,5,4) , (10,2,4,5) , (10,2,5,4)
(4,5,2,10) , (4,5,10,2) , (5,4,2,10) , (5,4,10,2)

Constraints:
1 <= nums.length <= 1000
1 <= nums[i] <= 10^4
All elements in nums are distinct.

</> Typescript code:
*/

function tupleSameProduct(nums: number[]): number {
  // Length of the input array
  const n = nums.length;

  // A map from product -> {
  //    count: number of total pairs (i,j) that yield this product,
  //    freq: a map counting how many of these pairs include each index
  // }
  const productMap = new Map<number, {count: number; freq: Map<number, number>}>();

  // Will hold the total count of valid 4-tuples
  let total = 0;

  // Nested loops to generate all possible pairs (i, j) with i < j
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // Calculate the product of the two distinct numbers
      const product = nums[i] * nums[j];

      // If this product hasn't been seen, initialize its entry
      if (!productMap.has(product)) {
        productMap.set(product, {count: 0, freq: new Map()});
      }

      // Retrieve the stored data for this product
      const entry = productMap.get(product)!;

      // Count how many existing pairs are disjoint from the new pair
      // We take the total count of pairs for this product,
      // then subtract the pairs that include i or j.
      const validPairs = entry.count - (entry.freq.get(i) || 0) - (entry.freq.get(j) || 0);

      // Each disjoint pair combination can form 8 distinct tuples
      // because (a,b,c,d) can vary by swapping each pair
      // and swapping which pair is first or second.
      total += validPairs * 8;

      // Update the total count of pairs for this product
      entry.count++;

      // Update how many pairs for this product include index i and j
      entry.freq.set(i, (entry.freq.get(i) || 0) + 1);
      entry.freq.set(j, (entry.freq.get(j) || 0) + 1);
    }
  }

  // Return the total number of valid tuples
  return total;
}
