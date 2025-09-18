/*
3408. Design Task Manager

There is a task management system that allows users to manage their tasks, each associated with a priority. The system should efficiently handle adding, modifying, executing, and removing tasks.
Implement the TaskManager class:
TaskManager(vector<vector<int>>& tasks) initializes the task manager with a list of user-task-priority triples. Each element in the input list is of the form [userId, taskId, priority], which adds a task to the specified user with the given priority.
void add(int userId, int taskId, int priority) adds a task with the specified taskId and priority to the user with userId. It is guaranteed that taskId does not exist in the system.
void edit(int taskId, int newPriority) updates the priority of the existing taskId to newPriority. It is guaranteed that taskId exists in the system.
void rmv(int taskId) removes the task identified by taskId from the system. It is guaranteed that taskId exists in the system.
int execTop() executes the task with the highest priority across all users. If there are multiple tasks with the same highest priority, execute the one with the highest taskId. After executing, the taskId is removed from the system. Return the userId associated with the executed task. If no tasks are available, return -1.
Note that a user may be assigned multiple tasks.

Example 1:
Input:
["TaskManager", "add", "edit", "execTop", "rmv", "add", "execTop"]
[[[[1, 101, 10], [2, 102, 20], [3, 103, 15]]], [4, 104, 5], [102, 8], [], [101], [5, 105, 15], []]
Output:
[null, null, null, 3, null, null, 5]
Explanation
TaskManager taskManager = new TaskManager([[1, 101, 10], [2, 102, 20], [3, 103, 15]]); // Initializes with three tasks for Users 1, 2, and 3.
taskManager.add(4, 104, 5); // Adds task 104 with priority 5 for User 4.
taskManager.edit(102, 8); // Updates priority of task 102 to 8.
taskManager.execTop(); // return 3. Executes task 103 for User 3.
taskManager.rmv(101); // Removes task 101 from the system.
taskManager.add(5, 105, 15); // Adds task 105 with priority 15 for User 5.
taskManager.execTop(); // return 5. Executes task 105 for User 5.
 
Constraints:
1 <= tasks.length <= 10^5
0 <= userId <= 10^5
0 <= taskId <= 10^5
0 <= priority <= 10^9
0 <= newPriority <= 10^9
At most 2 * 105 calls will be made in total to add, edit, rmv, and execTop methods.
The input is generated such that taskId will be valid.

</> Typescript code:
*/

class TaskManager {
  // Map: taskId -> [userId, priority]
  private taskMap: Map<number, [number, number]>;
  // Heap stores tuples: [-priority, -taskId, userId] for efficient max retrieval
  private heap: [number, number, number][];
  // Set of removed taskIds to skip outdated heap entries
  private removed: Set<number>;

  constructor(tasks: number[][]) {
    this.taskMap = new Map();
    this.heap = [];
    this.removed = new Set();
    // Initialize the structure with given tasks
    for (const [userId, taskId, priority] of tasks) {
      this.taskMap.set(taskId, [userId, priority]);
      // Push corresponding record into the heap
      this.pushHeap([-priority, -taskId, userId]);
    }
  }

  add(userId: number, taskId: number, priority: number): void {
    // Register new task in the map
    this.taskMap.set(taskId, [userId, priority]);
    // Insert into heap with negation for max-heap behavior
    this.pushHeap([-priority, -taskId, userId]);
  }

  edit(taskId: number, newPriority: number): void {
    // Retrieve current info of the task
    const task = this.taskMap.get(taskId);
    if (!task) return;
    const [userId] = task;
    // Update mapping with new priority
    this.taskMap.set(taskId, [userId, newPriority]);
    // Add updated record into heap (lazy update strategy)
    this.pushHeap([-newPriority, -taskId, userId]);
  }

  rmv(taskId: number): void {
    // Remove mapping if task exists
    if (!this.taskMap.has(taskId)) return;
    this.taskMap.delete(taskId);
    // Mark this taskId as removed to skip outdated heap items
    this.removed.add(taskId);
  }

  execTop(): number {
    // Pop until a valid (still existing and matching) task is found
    while (this.heap.length > 0) {
      const [negPriority, negTaskId, userId] = this.popHeap();
      const taskId = -negTaskId;
      // Verify that the entry is current (not removed/outdated)
      if (
        !this.taskMap.has(taskId) ||
        (this.taskMap.get(taskId)![0] !== userId ||
          this.taskMap.get(taskId)![1] !== -negPriority)
      )
        continue;
      // Remove the task from the map since it's executed
      this.taskMap.delete(taskId);
      return userId; // Return associated userId
    }
    // If heap is empty or all outdated, return -1
    return -1;
  }

  private pushHeap(node: [number, number, number]): void {
    // Add at end of heap array
    this.heap.push(node);
    // Bubble it up to restore heap property
    this.bubbleUp(this.heap.length - 1);
  }

  private popHeap(): [number, number, number] {
    // Get root of heap
    const top = this.heap[0];
    const last = this.heap.pop()!;
    // If not empty after popping, put last at root and fix heap
    if (this.heap.length) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }
    return top;
  }

  private bubbleUp(i: number): void {
    // Climb up while node has higher priority (smaller neg values)
    while (i > 0) {
      const p = (i - 1) >> 1; // parent index
      if (
        this.heap[p][0] < this.heap[i][0] ||
        (this.heap[p][0] === this.heap[i][0] && this.heap[p][1] < this.heap[i][1])
      )
        break;
      [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
      i = p;
    }
  }

  private bubbleDown(i: number): void {
    // Restore heap property downwards
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const l = (i << 1) + 1;
      const r = l + 1;
      // Compare with left child
      if (
        l < n &&
        (this.heap[l][0] < this.heap[smallest][0] ||
          (this.heap[l][0] === this.heap[smallest][0] &&
            this.heap[l][1] < this.heap[smallest][1]))
      )
        smallest = l;
      // Compare with right child
      if (
        r < n &&
        (this.heap[r][0] < this.heap[smallest][0] ||
          (this.heap[r][0] === this.heap[smallest][0] &&
            this.heap[r][1] < this.heap[smallest][1]))
      )
        smallest = r;
      if (smallest === i) break;
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
  }
}

/**
 * Your TaskManager object will be instantiated and called as such:
 * var obj = new TaskManager(tasks)
 * obj.add(userId,taskId,priority)
 * obj.edit(taskId,newPriority)
 * obj.rmv(taskId)
 * var param_4 = obj.execTop()
 */
