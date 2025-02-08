/* 
2349. Design a Number Container System

Design a number container system that can do the following:

Insert or Replace a number at the given index in the system.
Return the smallest index for the given number in the system.

Implement the NumberContainers class:
NumberContainers() Initializes the number container system.
void change(int index, int number) Fills the container at index with the number. If there is already a number at that index, replace it.
int find(int number) Returns the smallest index for the given number, or -1 if there is no index that is filled by number in the system.

Example 1:
Input
["NumberContainers", "find", "change", "change", "change", "change", "find", "change", "find"]
[[], [10], [2, 10], [1, 10], [3, 10], [5, 10], [10], [1, 20], [10]]
Output
[null, -1, null, null, null, null, 1, null, 2]
Explanation
NumberContainers nc = new NumberContainers();
nc.find(10); // There is no index that is filled with number 10. Therefore, we return -1.
nc.change(2, 10); // Your container at index 2 will be filled with number 10.
nc.change(1, 10); // Your container at index 1 will be filled with number 10.
nc.change(3, 10); // Your container at index 3 will be filled with number 10.
nc.change(5, 10); // Your container at index 5 will be filled with number 10.
nc.find(10); // Number 10 is at the indices 1, 2, 3, and 5. Since the smallest index that is filled with 10 is 1, we return 1.
nc.change(1, 20); // Your container at index 1 will be filled with number 20. Note that index 1 was filled with 10 and then replaced with 20. 
nc.find(10); // Number 10 is at the indices 2, 3, and 5. The smallest index that is filled with 10 is 2. Therefore, we return 2.

Constraints:
1 <= index, number <= 10^9
At most 10^5 calls will be made in total to change and find.

</> Typescript code:
*/

class NumberContainers {
  // Map to track the current number at each index.
  private indexMap: Map<number, number>;
  // Map where each key (number) maps to a sorted array of indices holding that number.
  private numMap: Map<number, number[]>;

  constructor() {
    // Initialize the maps.
    this.indexMap = new Map();
    this.numMap = new Map();
  }

  // A helper binary search method to determine the insertion index in a sorted array.
  private binarySearch(arr: number[], target: number): number {
    let lo = 0,
      hi = arr.length;
    // Perform binary search to find the first index where arr[i] >= target.
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (arr[mid] < target) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }

  // Changes the number at the provided index.
  change(index: number, number: number): void {
    // If this index was previously assigned a number, remove it from that number's sorted array.
    if (this.indexMap.has(index)) {
      const prev = this.indexMap.get(index)!;
      const list = this.numMap.get(prev)!;
      const pos = this.binarySearch(list, index);
      if (pos < list.length && list[pos] === index) {
        list.splice(pos, 1); // Remove the index from the old number's list.
      }
    }
    // Update the mapping for the index to the new number.
    this.indexMap.set(index, number);
    // If no sorted array exists for the new number, initialize one.
    if (!this.numMap.has(number)) {
      this.numMap.set(number, []);
    }
    // Insert the index into the sorted array of the new number.
    const arr = this.numMap.get(number)!;
    const pos = this.binarySearch(arr, index);
    arr.splice(pos, 0, index);
  }

  // Finds and returns the smallest index that currently holds the specified number.
  find(number: number): number {
    // If the number is never used, return -1.
    if (!this.numMap.has(number)) return -1;
    const arr = this.numMap.get(number)!;
    // Return the smallest index if available; otherwise, return -1.
    return arr.length ? arr[0] : -1;
  }
}

/**
 * Your NumberContainers object will be instantiated and called as such:
 * var obj = new NumberContainers()
 * obj.change(index,number)
 * var param_2 = obj.find(number)
 */
