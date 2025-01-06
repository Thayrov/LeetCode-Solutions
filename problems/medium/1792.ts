/* 
1792. Maximum Average Pass Ratio

There is a school that has classes of students and each class will be having a final exam. You are given a 2D integer array classes, where classes[i] = [passi, totali]. You know beforehand that in the ith class, there are totali total students, but only passi number of students will pass the exam.

You are also given an integer extraStudents. There are another extraStudents brilliant students that are guaranteed to pass the exam of any class they are assigned to. You want to assign each of the extraStudents students to a class in a way that maximizes the average pass ratio across all the classes.

The pass ratio of a class is equal to the number of students of the class that will pass the exam divided by the total number of students of the class. The average pass ratio is the sum of pass ratios of all the classes divided by the number of the classes.

Return the maximum possible average pass ratio after assigning the extraStudents students. Answers within 10-5 of the actual answer will be accepted.

Example 1:
Input: classes = [[1,2],[3,5],[2,2]], extraStudents = 2
Output: 0.78333
Explanation: You can assign the two extra students to the first class. The average pass ratio will be equal to (3/4 + 3/5 + 2/2) / 3 = 0.78333.

Example 2:
Input: classes = [[2,4],[3,9],[4,5],[2,10]], extraStudents = 4
Output: 0.53485

Constraints:
1 <= classes.length <= 10^5
classes[i].length == 2
1 <= passi <= totali <= 10^5
1 <= extraStudents <= 10^5

</> Typescript Code:
*/

function maxAverageRatio(classes: number[][], extraStudents: number): number {
  // Define a class to represent each class node in the heap
  class ClassNode {
    pass: number;
    total: number;
    delta: number;
    constructor(pass: number, total: number) {
      this.pass = pass;
      this.total = total;
      this.delta = this.calculateDelta(); // Calculate initial delta
    }
    // Method to calculate the potential increase in pass ratio when adding one more passing student
    calculateDelta(): number {
      let pass = this.pass;
      let total = this.total;
      return (pass + 1) / (total + 1) - pass / total;
    }
    // Method to increment pass and total counts after adding a passing student
    increment() {
      this.pass += 1;
      this.total += 1;
      this.delta = this.calculateDelta(); // Recalculate delta
    }
  }

  // Define a max heap class to keep track of classes based on delta
  class MaxHeap {
    heap: ClassNode[];
    constructor(arr: ClassNode[]) {
      this.heap = [];
      for (let node of arr) {
        this.insert(node); // Build the heap from initial classes
      }
    }
    // Method to insert a node into the heap
    insert(node: ClassNode) {
      this.heap.push(node);
      this.siftUp(this.heap.length - 1);
    }
    // Method to extract the node with the maximum delta
    extractMax(): ClassNode {
      const max = this.heap[0];
      const end = this.heap.pop();
      if (this.heap.length > 0 && end !== undefined) {
        this.heap[0] = end;
        this.siftDown(0);
      }
      return max;
    }
    // Helper method to maintain heap property after insertion
    siftUp(idx: number) {
      let parent = Math.floor((idx - 1) / 2);
      while (idx > 0 && this.heap[idx].delta > this.heap[parent].delta) {
        [this.heap[idx], this.heap[parent]] = [this.heap[parent], this.heap[idx]]; // Swap nodes
        idx = parent;
        parent = Math.floor((idx - 1) / 2);
      }
    }
    // Helper method to maintain heap property after extraction
    siftDown(idx: number) {
      const length = this.heap.length;
      while (true) {
        let left = 2 * idx + 1;
        let right = 2 * idx + 2;
        let largest = idx;
        if (left < length && this.heap[left].delta > this.heap[largest].delta) {
          largest = left;
        }
        if (right < length && this.heap[right].delta > this.heap[largest].delta) {
          largest = right;
        }
        if (largest !== idx) {
          [this.heap[idx], this.heap[largest]] = [this.heap[largest], this.heap[idx]]; // Swap nodes
          idx = largest;
        } else {
          break;
        }
      }
    }
  }

  // Initialize the max heap with the initial classes
  let heap = new MaxHeap(classes.map(c => new ClassNode(c[0], c[1])));
  // Distribute the extra students
  for (let i = 0; i < extraStudents; i++) {
    let node = heap.extractMax(); // Get the class with max delta
    node.increment(); // Add a passing student
    heap.insert(node); // Re-insert the node into the heap
  }
  // Calculate the total pass ratio
  let totalRatio = 0;
  for (let node of heap.heap) {
    totalRatio += node.pass / node.total;
  }
  // Return the average pass ratio
  return totalRatio / classes.length;
}
