/*
1882. Process Tasks Using Servers

You are given two 0-indexed integer arrays servers and tasks of lengths n and m respectively. servers[i] is the weight of the ith server, and tasks[j] is the time needed to process the jth task in seconds.

Tasks are assigned to the servers using a task queue. Initially, all servers are free, and the queue is empty.

At second j, the jth task is inserted into the queue (starting with the 0th task being inserted at second 0). As long as there are free servers and the queue is not empty, the task in the front of the queue will be assigned to a free server with the smallest weight, and in case of a tie, it is assigned to a free server with the smallest index.

If there are no free servers and the queue is not empty, we wait until a server becomes free and immediately assign the next task. If multiple servers become free at the same time, then multiple tasks from the queue will be assigned in order of insertion following the weight and index priorities above.

A server that is assigned task j at second t will be free again at second t + tasks[j].

Build an array ans of length m, where ans[j] is the index of the server the jth task will be assigned to.

Return the array ans.

Example 1:
Input: servers = [3,3,2], tasks = [1,2,3,2,1,2]
Output: [2,2,0,2,1,2]
Explanation:
- At second 0, task 0 is added and processed using server 2 until second 1.
- At second 1, server 2 becomes free. Task 1 is added and processed using server 2 until second 3.
- At second 2, task 2 is added and processed using server 0 until second 5.
- At second 3, server 2 becomes free. Task 3 is added and processed using server 2 until second 5.
- At second 4, task 4 is added and processed using server 1 until second 5.
- At second 5, all servers become free. Task 5 is added and processed using server 2 until second 7.

Example 2:
Input: servers = [5,1,4,3,2], tasks = [2,1,2,4,5,2,1]
Output: [1,4,1,4,1,3,2]
Explanation:
- At second 0, task 0 is added and processed using server 1 until second 2.
- At second 1, task 1 is added and processed using server 4 until second 2.
- At second 2, servers 1 and 4 become free. Task 2 is added and processed using server 1 until second 4.
- At second 3, task 3 is added and processed using server 4 until second 7.
- At second 4, server 1 becomes free. Task 4 is added and processed using server 1 until second 9.
- At second 5, task 5 is added and processed using server 3 until second 7.
- At second 6, task 6 is added and processed using server 2 until second 7.

Constraints:
servers.length == n
tasks.length == m
1 <= n, m <= 2 * 10^5
1 <= servers[i], tasks[j] <= 2 * 10^5

</> Typescript code:
*/

function assignTasks(servers: number[], tasks: number[]): number[] {
  // Cache server/task counts, init answer array.
  const n = servers.length, m = tasks.length;
  const ans = new Array<number>(m);
  // Avail heap keys weight * n + index; busy heap keys freeTime * n + index.
  const ah: number[] = [];
  const bh: number[] = [];
  // Push key, sift up to restore min-heap order.
  const push = (h: number[], v: number): void => {
    h.push(v);
    let i = h.length - 1;
    // Bubble past larger parents.
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (h[p] <= h[i]) break;
      // Swap child above parent.
      const t = h[p]; h[p] = h[i]; h[i] = t;
      i = p;
    }
  };
  // Pop min key, sift last element down to restore order.
  const pop = (h: number[]): number => {
    const top = h[0], last = h.pop()!;
    // Move last to root, sink it.
    if (h.length) {
      h[0] = last;
      let i = 0;
      // Descend toward smaller child.
      for (;;) {
        const l = i * 2 + 1, r = l + 1;
        let s = i;
        // Track smallest of node and children.
        if (l < h.length && h[l] < h[s]) s = l;
        if (r < h.length && h[r] < h[s]) s = r;
        // Heap order restored.
        if (s === i) break;
        // Swap node below smaller child.
        const t = h[s]; h[s] = h[i]; h[i] = t;
        i = s;
      }
    }
    return top;
  };
  // Decode free time from busy key.
  const btime = (k: number): number => (k - (k % n)) / n;
  // Release servers freed by time t back to avail heap.
  const drain = (t: number): void => {
    while (bh.length && btime(bh[0]) <= t) {
      // Decode server index, rekey by weight and index.
      const idx = pop(bh) % n;
      push(ah, servers[idx] * n + idx);
    }
  };
  // Seed avail heap with every server.
  for (let i = 0; i < n; i++) push(ah, servers[i] * n + i);
  // Simulation clock, never rewinds.
  let time = 0;
  // Assign tasks in arrival order.
  for (let j = 0; j < m; j++) {
    // Clock jumps to arrival when idle.
    if (time < j) time = j;
    // Release newly freed servers.
    drain(time);
    // All busy: jump clock to earliest release.
    if (!ah.length) { time = btime(bh[0]); drain(time); }
    // Pop lightest, smallest-index server.
    const idx = pop(ah) % n;
    ans[j] = idx;
    // Busy until clock plus task duration.
    push(bh, (time + tasks[j]) * n + idx);
  }
  return ans;
}
