/*
1865. Finding Pairs With a Certain Sum

You are given two integer arrays nums1 and nums2. You are tasked to implement a data structure that supports queries of two types:
Add a positive integer to an element of a given index in the array nums2.
Count the number of pairs (i, j) such that nums1[i] + nums2[j] equals a given value (0 <= i < nums1.length and 0 <= j < nums2.length).
Implement the FindSumPairs class:
FindSumPairs(int[] nums1, int[] nums2) Initializes the FindSumPairs object with two integer arrays nums1 and nums2.
void add(int index, int val) Adds val to nums2[index], i.e., apply nums2[index] += val.
int count(int tot) Returns the number of pairs (i, j) such that nums1[i] + nums2[j] == tot.

Example 1:
Input
["FindSumPairs", "count", "add", "count", "count", "add", "add", "count"]
[[[1, 1, 2, 2, 2, 3], [1, 4, 5, 2, 5, 4]], [7], [3, 2], [8], [4], [0, 1], [1, 1], [7]]
Output
[null, 8, null, 2, 1, null, null, 11]
Explanation
FindSumPairs findSumPairs = new FindSumPairs([1, 1, 2, 2, 2, 3], [1, 4, 5, 2, 5, 4]);
findSumPairs.count(7);  // return 8; pairs (2,2), (3,2), (4,2), (2,4), (3,4), (4,4) make 2 + 5 and pairs (5,1), (5,5) make 3 + 4
findSumPairs.add(3, 2); // now nums2 = [1,4,5,4,5,4]
findSumPairs.count(8);  // return 2; pairs (5,2), (5,4) make 3 + 5
findSumPairs.count(4);  // return 1; pair (5,0) makes 3 + 1
findSumPairs.add(0, 1); // now nums2 = [2,4,5,4,5,4]
findSumPairs.add(1, 1); // now nums2 = [2,5,5,4,5,4]
findSumPairs.count(7);  // return 11; pairs (2,1), (2,2), (2,4), (3,1), (3,2), (3,4), (4,1), (4,2), (4,4) make 2 + 5 and pairs (5,3), (5,5) make 3 + 4

Constraints:
1 <= nums1.length <= 1000
1 <= nums2.length <= 10^5
1 <= nums1[i] <= 10^9
1 <= nums2[i] <= 10^5
0 <= index < nums2.length
1 <= val <= 10^5
1 <= tot <= 10^9
At most 1000 calls are made to add and count each.

</> Typescript code:
*/

class FindSumPairs {
  // Store reference to nums1 array (immutable)
  private nums1: number[];
  // Store reference to nums2 array (mutable)
  private nums2: number[];
  // Frequency map to track count of each value in nums2 for O(1) lookups
  private freq: Map<number, number>;

  constructor(nums1: number[], nums2: number[]) {
    // Store the input arrays
    this.nums1 = nums1;
    this.nums2 = nums2;
    // Initialize frequency map
    this.freq = new Map();
    // Build frequency map of nums2 values for efficient counting
    for (const num of nums2) {
      this.freq.set(num, (this.freq.get(num) || 0) + 1);
    }
  }

  add(index: number, val: number): void {
    // Get the current value at the index
    const oldVal = this.nums2[index];
    // Calculate the new value after addition
    const newVal = oldVal + val;

    // Decrement frequency of old value
    this.freq.set(oldVal, this.freq.get(oldVal)! - 1);
    // Remove entry if frequency becomes 0 to keep map clean
    if (this.freq.get(oldVal) === 0) {
      this.freq.delete(oldVal);
    }

    // Update the actual array value
    this.nums2[index] = newVal;
    // Increment frequency of new value
    this.freq.set(newVal, (this.freq.get(newVal) || 0) + 1);
  }

  count(tot: number): number {
    // Initialize result counter
    let result = 0;
    // Iterate through nums1 (smaller array for optimization)
    for (const num1 of this.nums1) {
      // For each nums1[i], find required nums2[j] such that nums1[i] + nums2[j] = tot
      const target = tot - num1;
      // Add the frequency of target value in nums2 to result
      result += this.freq.get(target) || 0;
    }
    // Return total count of valid pairs
    return result;
  }
}

/**
 * Your FindSumPairs object will be instantiated and called as such:
 * var obj = new FindSumPairs(nums1, nums2)
 * obj.add(index,val)
 * var param_2 = obj.count(tot)
 */
