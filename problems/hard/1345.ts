/*
1345. Jump Game IV

Hint
Given an array of integers arr, you are initially positioned at the first index of the array.
In one step you can jump from index i to index:
i + 1 where: i + 1 < arr.length.
i - 1 where: i - 1 >= 0.
j where: arr[i] == arr[j] and i != j.
Return the minimum number of steps to reach the last index of the array.
Notice that you can not jump outside of the array at any time.

Example 1:
Input: arr = [100,-23,-23,404,100,23,23,23,3,404]
Output: 3
Explanation: You need three jumps from index 0 --> 4 --> 3 --> 9. Note that index 9 is the last index of the array.

Example 2:
Input: arr = [7]
Output: 0
Explanation: Start index is the last index. You do not need to jump.

Example 3:
Input: arr = [7,6,9,6,9,6,9,7]
Output: 1
Explanation: You can jump directly from index 0 to index 7 which is last index of the array.

Constraints:
1 <= arr.length <= 5 * 10^4
-10^8 <= arr[i] <= 10^8

</> Typescript code:
*/

function minJumps(arr: number[]): number {
  // Store the array length to avoid repeated property access.
  const n = arr.length;

  // If there is only one index, we already start at the target.
  if (n === 1) return 0;

  // Map each value to all indexes where it appears.
  const map = new Map<number, number[]>();

  // Iterate through every index.
  for (let i = 0; i < n; i++) {
    // Read current value.
    const v = arr[i];

    // Get the index list for this value.
    let list = map.get(v);

    // Create the list if this value has not been seen before.
    if (list === undefined) map.set(v, (list = []));

    // Add current index to this value's jump group.
    list.push(i);
  }

  // Fixed-size queue for BFS, faster than Array.shift().
  const queue = new Int32Array(n);

  // Visited marker: 0 means unseen, 1 means seen.
  const seen = new Uint8Array(n);

  // Queue read and write pointers.
  let head = 0,
    tail = 0,
    steps = 0;

  // Start BFS from index 0.
  queue[tail++] = 0;

  // Mark index 0 as visited.
  seen[0] = 1;

  // Continue while BFS queue has nodes.
  while (head < tail) {
    // Process exactly one BFS level.
    for (let size = tail - head; size > 0; size--) {
      // Pop next index.
      const i = queue[head++];

      // If current index is target, return current distance.
      if (i === n - 1) return steps;

      // Get all same-value jump targets.
      const same = map.get(arr[i]);

      // Process same-value jumps only once per value.
      if (same !== undefined) {
        // Try every index with the same value.
        for (const j of same) {
          // Skip already visited indexes.
          if (seen[j] === 0) {
            // Early return if this jump reaches the target.
            if (j === n - 1) return steps + 1;

            // Mark target as visited.
            seen[j] = 1;

            // Push target into BFS queue.
            queue[tail++] = j;
          }
        }

        // Delete this value group to prevent quadratic revisits.
        map.delete(arr[i]);
      }

      // Candidate left adjacent index.
      const left = i - 1;

      // Add left index if valid and unseen.
      if (left >= 0 && seen[left] === 0) {
        // Mark left as visited.
        seen[left] = 1;

        // Push left into BFS queue.
        queue[tail++] = left;
      }

      // Candidate right adjacent index.
      const right = i + 1;

      // Add right index if valid and unseen.
      if (right < n && seen[right] === 0) {
        // Early return if right reaches target.
        if (right === n - 1) return steps + 1;

        // Mark right as visited.
        seen[right] = 1;

        // Push right into BFS queue.
        queue[tail++] = right;
      }
    }

    // One full jump layer completed.
    steps++;
  }

  // Problem graph is connected through adjacent moves, so this is unreachable.
  return -1;
}
