/* 
3066. Minimum Operations to Exceed Threshold Value II

You are given a 0-indexed integer array nums, and an integer k.

In one operation, you will:

Take the two smallest integers x and y in nums.
Remove x and y from nums.
Add min(x, y) * 2 + max(x, y) anywhere in the array.
Note that you can only apply the described operation if nums contains at least two elements.

Return the minimum number of operations needed so that all elements of the array are greater than or equal to k.

Example 1:
Input: nums = [2,11,10,1,3], k = 10
Output: 2
Explanation: In the first operation, we remove elements 1 and 2, then add 1 * 2 + 2 to nums. nums becomes equal to [4, 11, 10, 3].
In the second operation, we remove elements 3 and 4, then add 3 * 2 + 4 to nums. nums becomes equal to [10, 11, 10].
At this stage, all the elements of nums are greater than or equal to 10 so we can stop.
It can be shown that 2 is the minimum number of operations needed so that all elements of the array are greater than or equal to 10.

Example 2:
Input: nums = [1,1,2,4,9], k = 20
Output: 4
Explanation: After one operation, nums becomes equal to [2, 4, 9, 3].
After two operations, nums becomes equal to [7, 4, 9].
After three operations, nums becomes equal to [15, 9].
After four operations, nums becomes equal to [33].
At this stage, all the elements of nums are greater than 20 so we can stop.
It can be shown that 4 is the minimum number of operations needed so that all elements of the array are greater than or equal to 20.

Constraints:
2 <= nums.length <= 2 * 10^5
1 <= nums[i] <= 10^9
1 <= k <= 10^9
The input is generated such that an answer always exists. That is, there exists some sequence of operations after which all elements of the array are greater than or equal to k.

</> Typescript Code:
*/

// Define a MinHeap class to manage the smallest elements efficiently
class MinHeap {
  heap: number[]; // Array to store heap elements
  constructor(nums: number[]) {
    // Initialize the heap with a copy of the input array
    this.heap = nums.slice();
    // Build the heap using heapifyDown from the last parent node downwards
    for (let i = Math.floor((this.heap.length - 2) / 2); i >= 0; i--) {
      this.heapifyDown(i);
    }
  }
  // Returns the current number of elements in the heap
  size(): number {
    return this.heap.length;
  }
  // Returns the smallest element without removing it
  peek(): number {
    return this.heap[0];
  }
  // Inserts a new value into the heap
  push(val: number): void {
    this.heap.push(val);
    // Adjust position to maintain heap invariant
    this.heapifyUp(this.heap.length - 1);
  }
  // Removes and returns the smallest element from the heap
  pop(): number {
    const min = this.heap[0]; // Store the smallest element
    const last = this.heap.pop()!; // Remove the last element
    if (this.heap.length > 0) {
      // Place last element at the root and heapify down
      this.heap[0] = last;
      this.heapifyDown(0);
    }
    return min;
  }
  // Moves an element up in the heap to restore the heap property
  heapifyUp(index: number): void {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.heap[parent] <= this.heap[index]) break;
      // Swap with parent if current is smaller than parent
      [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
      index = parent;
    }
  }
  // Moves an element down in the heap to restore the heap property
  heapifyDown(index: number): void {
    const n = this.heap.length;
    while (true) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;
      // Check left child
      if (left < n && this.heap[left] < this.heap[smallest]) smallest = left;
      // Check right child
      if (right < n && this.heap[right] < this.heap[smallest]) smallest = right;
      // If no child is smaller, then done
      if (smallest === index) break;
      // Swap with the smallest child and continue
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }
}

// Main function to calculate the minimum operations required
function minOperations(nums: number[], k: number): number {
  let opCount = 0; // Counter for number of operations performed
  const heap = new MinHeap(nums); // Initialize a min heap with the input array
  // Continue combining until the smallest number in the heap meets the threshold k
  while (heap.peek() < k) {
    if (heap.size() < 2) break; // If less than two elements, further operation is not possible
    const x = heap.pop(); // Extract the smallest element
    const y = heap.pop(); // Extract the second smallest element
    // Compute new number based on the operation: 2 * min(x, y) + max(x, y)
    const newNum = x * 2 + y;
    heap.push(newNum); // Insert the new number into the heap
    opCount++; // Increment the operation counter
  }
  return opCount; // Return the total number of operations performed
}
