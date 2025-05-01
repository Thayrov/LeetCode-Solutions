/* 
2071. Maximum Number of Tasks You Can Assign

You have n tasks and m workers. Each task has a strength requirement stored in a 0-indexed integer array tasks, with the ith task requiring tasks[i] strength to complete. The strength of each worker is stored in a 0-indexed integer array workers, with the jth worker having workers[j] strength. Each worker can only be assigned to a single task and must have a strength greater than or equal to the task's strength requirement (i.e., workers[j] >= tasks[i]).

Additionally, you have pills magical pills that will increase a worker's strength by strength. You can decide which workers receive the magical pills, however, you may only give each worker at most one magical pill.

Given the 0-indexed integer arrays tasks and workers and the integers pills and strength, return the maximum number of tasks that can be completed.

Example 1:
Input: tasks = [3,2,1], workers = [0,3,3], pills = 1, strength = 1
Output: 3
Explanation:
We can assign the magical pill and tasks as follows:
- Give the magical pill to worker 0.
- Assign worker 0 to task 2 (0 + 1 >= 1)
- Assign worker 1 to task 1 (3 >= 2)
- Assign worker 2 to task 0 (3 >= 3)

Example 2:
Input: tasks = [5,4], workers = [0,0,0], pills = 1, strength = 5
Output: 1
Explanation:
We can assign the magical pill and tasks as follows:
- Give the magical pill to worker 0.
- Assign worker 0 to task 0 (0 + 5 >= 5)

Example 3:
Input: tasks = [10,15,30], workers = [0,10,10,10,10], pills = 3, strength = 10
Output: 2
Explanation:
We can assign the magical pills and tasks as follows:
- Give the magical pill to worker 0 and worker 1.
- Assign worker 0 to task 0 (0 + 10 >= 10)
- Assign worker 1 to task 1 (10 + 10 >= 15)
The last pill is not given because it will not make any worker strong enough for the last task.

Constraints:
n == tasks.length
m == workers.length
1 <= n, m <= 5 * 10^4
0 <= pills <= m
0 <= tasks[i], workers[j], strength <= 10^9

</> Typescript code:
*/

function maxTaskAssign(
  tasks: number[],
  workers: number[],
  pills: number,
  strength: number
): number {
  // Sort task requirements and worker strengths in ascending order
  tasks.sort((a, b) => a - b);
  workers.sort((a, b) => a - b);
  // Total number of tasks and workers
  const n = tasks.length;
  const m = workers.length;
  // Binary search range: 0 to min(n, m)
  let left = 0;
  let right = Math.min(n, m);
  // Find the maximum k for which canAssign(k) is true
  while (left < right) {
    // Use upper mid to avoid infinite loop when left + 1 = right
    const mid = Math.floor((left + right + 1) / 2);
    if (canAssign(mid)) {
      left = mid; // mid tasks feasible → try more
    } else {
      right = mid - 1; // not feasible → try fewer
    }
  }
  // left now holds the maximum feasible number of tasks
  return left;

  // Check if we can assign k tasks using at most `pills` pills
  function canAssign(k: number): boolean {
    // Remaining pills available
    let remainingPills = pills;
    // Index into the sorted tasks array for enqueuing
    let taskIndex = 0;
    // Simulate a deque using a fixed-size array of length k
    const deque = new Array<number>(k);
    let head = 0; // front pointer
    let tail = 0; // back pointer
    // Iterate over the k strongest workers
    for (let workerIdx = m - k; workerIdx < m; workerIdx++) {
      // Enqueue all tasks that this worker could handle if given a pill
      while (
        taskIndex < k &&
        tasks[taskIndex] <= workers[workerIdx] + strength
      ) {
        deque[tail++] = tasks[taskIndex++];
      }
      // If no tasks are available for assignment, fail
      if (head === tail) {
        return false;
      }
      // If the easiest enqueued task can be done without a pill
      if (deque[head] <= workers[workerIdx]) {
        head++; // assign it without using a pill
      } else {
        // Otherwise, use a pill on this worker for the hardest enqueued task
        if (remainingPills === 0) {
          return false; // no pills left to boost
        }
        remainingPills--;
        tail--; // remove that task from the back of the deque
      }
    }
    // Successfully assigned k tasks
    return true;
  }
}
