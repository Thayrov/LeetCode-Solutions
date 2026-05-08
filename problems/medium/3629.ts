/*
3629. Minimum Jumps to Reach End via Prime Teleportation

Hint
You are given an integer array nums of length n.
You start at index 0, and your goal is to reach index n - 1.
From any index i, you may perform one of the following operations:
Adjacent Step: Jump to index i + 1 or i - 1, if the index is within bounds.
Prime Teleportation: If nums[i] is a prime number p, you may instantly jump to any index j != i such that nums[j] % p == 0.
Return the minimum number of jumps required to reach index n - 1.

Example 1:
Input: nums = [1,2,4,6]
Output: 2
Explanation:
One optimal sequence of jumps is:
Start at index i = 0. Take an adjacent step to index 1.
At index i = 1, nums[1] = 2 is a prime number. Therefore, we teleport to index i = 3 as nums[3] = 6 is divisible by 2.
Thus, the answer is 2.

Example 2:
Input: nums = [2,3,4,7,9]
Output: 2
Explanation:
One optimal sequence of jumps is:
Start at index i = 0. Take an adjacent step to index i = 1.
At index i = 1, nums[1] = 3 is a prime number. Therefore, we teleport to index i = 4 since nums[4] = 9 is divisible by 3.
Thus, the answer is 2.

Example 3:
Input: nums = [4,6,5,8]
Output: 3
Explanation:
Since no teleportation is possible, we move through 0 → 1 → 2 → 3. Thus, the answer is 3.

Constraints:
1 <= n == nums.length <= 10^5
1 <= nums[i] <= 10^6

</> Typescript code:
*/

function minJumps(nums: number[]): number {
  // Store the array length.
  const n = nums.length;

  // If already at the last index, no jump is needed.
  if (n === 1) return 0;

  // Track the maximum value to size the sieve tightly.
  let mx = 0;

  // Find the maximum number in nums.
  for (const x of nums) if (x > mx) mx = x;

  // spf[x] stores the smallest prime factor of x.
  const spf = new Int32Array(mx + 1);

  // Build smallest-prime-factor sieve from 2 to mx.
  for (let i = 2; i <= mx; i++) {
    // If spf[i] is unset, i is prime.
    if (spf[i] === 0) {
      // A prime's smallest prime factor is itself.
      spf[i] = i;

      // Only mark multiples if i * i is inside the range.
      if (i * i <= mx) {
        // Start at i * i because smaller multiples were handled before.
        for (let j = i * i; j <= mx; j += i) {
          // Set smallest prime factor only once.
          if (spf[j] === 0) spf[j] = i;
        }
      }
    }
  }

  // Map each prime factor p to all indices whose value is divisible by p.
  const groups = new Map<number, number[]>();

  // Process every index to register it under its unique prime factors.
  for (let i = 0; i < n; i++) {
    // Copy the current value for factorization.
    let x = nums[i];

    // Factor until fully reduced.
    while (x > 1) {
      // Get the current smallest prime factor.
      const p = spf[x];

      // Get indices already grouped by this prime.
      let arr = groups.get(p);

      // Create the group when this prime appears first time.
      if (arr === undefined) groups.set(p, (arr = []));

      // Current index is reachable by teleport from prime p.
      arr.push(i);

      // Remove all copies of p to keep only unique prime factors.
      while (x % p === 0) x = Math.floor(x / p);
    }
  }

  // dist[i] stores minimum jumps needed to reach index i.
  const dist = new Int32Array(n);

  // Mark all indices as unvisited.
  dist.fill(-1);

  // Track prime teleport groups already expanded.
  const usedPrime = new Set<number>();

  // Fixed-size BFS queue because each index is enqueued at most once.
  const q = new Int32Array(n);

  // Queue read pointer.
  let head = 0;

  // Queue write pointer.
  let tail = 0;

  // Start BFS from index 0.
  q[tail++] = 0;

  // Distance to start is zero jumps.
  dist[0] = 0;

  // Run BFS while there are pending indices.
  while (head < tail) {
    // Pop next index.
    const i = q[head++];

    // Any neighbor reached from i costs one more jump.
    const nd = dist[i] + 1;

    // Try adjacent jump to the right.
    if (i + 1 < n && dist[i + 1] === -1) {
      // Return immediately if the target is reached.
      if (i + 1 === n - 1) return nd;

      // Save distance for right neighbor.
      dist[i + 1] = nd;

      // Enqueue right neighbor.
      q[tail++] = i + 1;
    }

    // Try adjacent jump to the left.
    if (i - 1 >= 0 && dist[i - 1] === -1) {
      // Save distance for left neighbor.
      dist[i - 1] = nd;

      // Enqueue left neighbor.
      q[tail++] = i - 1;
    }

    // Current value may unlock prime teleportation.
    const p = nums[i];

    // Teleport only if nums[i] is prime and this prime was not expanded before.
    if (p >= 2 && spf[p] === p && !usedPrime.has(p)) {
      // Mark this prime teleport group as consumed.
      usedPrime.add(p);

      // Get all indices with values divisible by p.
      const arr = groups.get(p)!;

      // Visit every teleport destination once.
      for (const j of arr) {
        // Skip current index and already visited indices.
        if (j !== i && dist[j] === -1) {
          // Return immediately if teleport reaches the target.
          if (j === n - 1) return nd;

          // Save teleport distance.
          dist[j] = nd;

          // Enqueue teleport destination.
          q[tail++] = j;
        }
      }

      // Free this group and prevent repeated scans.
      groups.delete(p);
    }
  }

  // Return computed distance to the last index.
  return dist[n - 1];
}
