/*
1606. Find Servers That Handled Most Number of Requests

You have k servers numbered from 0 to k-1 that are being used to handle multiple requests simultaneously. Each server has infinite computational capacity but cannot handle more than one request at a time. The requests are assigned to servers according to a specific algorithm:

The ith (0-indexed) request arrives.
If all servers are busy, the request is dropped (not handled at all).
If the (i % k)th server is available, assign the request to that server.
Otherwise, assign the request to the next available server (wrapping around the list of servers and starting from 0 if necessary). For example, if the ith server is busy, try to assign the request to the (i+1)th server, then the (i+2)th server, and so on.

You are given a strictly increasing array arrival of positive integers, where arrival[i] represents the arrival time of the ith request, and another array load, where load[i] represents the load of the ith request (the time it takes to complete). Your goal is to find the busiest server(s). A server is considered busiest if it handled the most number of requests successfully among all the servers.

Return a list containing the IDs (0-indexed) of the busiest server(s). You may return the IDs in any order.

Example 1:
Input: k = 3, arrival = [1,2,3,4,5], load = [5,2,3,3,3]
Output: [1]
Explanation:
All of the servers start out available.
The first 3 requests are handled by the first 3 servers in order.
Request 3 comes in. Server 0 is busy, so it's assigned to the next available server, which is 1.
Request 4 comes in. It cannot be handled since all servers are busy, so it is dropped.
Servers 0 and 2 handled one request each, while server 1 handled two requests. Hence server 1 is the busiest server.

Example 2:
Input: k = 3, arrival = [1,2,3,4], load = [1,2,1,2]
Output: [0]
Explanation:
The first 3 requests are handled by first 3 servers.
Request 3 comes in. It is handled by server 0 since the server is available.
Server 0 handled two requests, while servers 1 and 2 handled one request each. Hence server 0 is the busiest server.

Example 3:
Input: k = 3, arrival = [1,2,3], load = [10,12,11]
Output: [0,1,2]
Explanation: Each server handles a single request, so they are all considered the busiest.

Constraints:
1 <= k <= 10^5
1 <= arrival.length, load.length <= 10^5
arrival.length == load.length
1 <= arrival[i], load[i] <= 10^9
arrival is strictly increasing.

</> Typescript code:
*/

function busiestServers(k: number, arrival: number[], load: number[]): number[] {
  // Cache request count for loop bounds.
  const n = arrival.length;
  // Per-server handled-request counters.
  const cnt = new Array<number>(k).fill(0);
  // Fenwick tree over availability (1 = free), 1-indexed.
  const bit = new Array<number>(k + 1).fill(0);
  // Build all-ones tree in O(k): bit[i] equals lowbit(i).
  for (let i = 1; i <= k; i++) bit[i] = i & -i;
  // Mark server idx0 free (+1) or busy (-1).
  const bitAdd = (idx0: number, delta: number): void => {
    // Walk up covering cells.
    for (let i = idx0 + 1; i <= k; i += i & -i) bit[i] += delta;
  };
  // Prefix sum of first c servers (indices 0..c-1).
  const bitSum = (c: number): number => {
    // Accumulate disjoint covering cells downward.
    let s = 0;
    // Strip lowest set bit per step.
    for (let i = c; i > 0; i -= i & -i) s += bit[i];
    // Return count of free servers in prefix.
    return s;
  };
  // Largest power of two not exceeding k for binary lifting.
  let pw = 1;
  // Double until exceeding k.
  while ((pw << 1) <= k) pw <<= 1;
  // Find 1-indexed position of ord-th free server.
  const kth = (ord: number): number => {
    // Start from empty prefix root.
    let idx = 0;
    // Descend powers of two from large to small.
    for (let step = pw; step > 0; step >>= 1) {
      // Candidate next index.
      const nxt = idx + step;
      // Skip whole block when target lies beyond it.
      if (nxt <= k && bit[nxt] < ord) {
        // Subtract skipped block's free count.
        ord -= bit[nxt];
        // Move prefix past skipped block.
        idx = nxt;
      }
    }
    // Convert prefix index to 1-indexed position.
    return idx + 1;
  };
  // Busy min-heap end times.
  const bE: number[] = [];
  // Busy min-heap server ids aligned with bE.
  const bI: number[] = [];
  // Push (end time, server) preserving heap order.
  const push = (e: number, id: number): void => {
    // Append at the end.
    bE.push(e);
    // Keep id aligned with its end time.
    bI.push(id);
    // Sift new leaf upward.
    let c = bE.length - 1;
    // Bubble while parent ends later.
    while (c > 0) {
      // Parent index.
      const p = (c - 1) >> 1;
      // Heap property satisfied.
      if (bE[p] <= bE[c]) break;
      // Swap end times.
      const te = bE[p]; bE[p] = bE[c]; bE[c] = te;
      // Swap ids to match.
      const ti = bI[p]; bI[p] = bI[c]; bI[c] = ti;
      // Move up.
      c = p;
    }
  };
  // Pop earliest-finishing server, returning its id.
  const pop = (): number => {
    // Capture id at heap top.
    const topId = bI[0];
    // Remove last leaf for relocation.
    const le = bE.pop() as number;
    // Remove its aligned id.
    const li = bI.pop() as number;
    // Restore heap when entries remain.
    if (bE.length > 0) {
      // Move last leaf to root.
      bE[0] = le;
      // Move its id to root.
      bI[0] = li;
      // Sift root downward.
      let c = 0;
      // Percolate until leaf position.
      for (;;) {
        // Left and right children.
        const l = 2 * c + 1, r = l + 1;
        // Assume current is earliest.
        let m = c;
        // Take left when earlier.
        if (l < bE.length && bE[l] < bE[m]) m = l;
        // Take right when earliest.
        if (r < bE.length && bE[r] < bE[m]) m = r;
        // Heap property restored.
        if (m === c) break;
        // Swap end times down.
        const te = bE[m]; bE[m] = bE[c]; bE[c] = te;
        // Swap ids down.
        const ti = bI[m]; bI[m] = bI[c]; bI[c] = ti;
        // Descend.
        c = m;
      }
    }
    // Return freed server id.
    return topId;
  };
  // Currently free server count.
  let avail = k;
  // Process requests in arrival order.
  for (let i = 0; i < n; i++) {
    // Current arrival time.
    const t = arrival[i];
    // Release every server finished by t.
    while (bE.length > 0 && bE[0] <= t) {
      // Mark popped server free again.
      bitAdd(pop(), 1);
      // Track restored capacity.
      avail++;
    }
    // Drop request when nothing is free.
    if (avail === 0) continue;
    // Preferred start index with wraparound.
    const want = i % k;
    // Free servers strictly before want.
    const pref = bitSum(want);
    // Pick first free at/after want, else wrap to first free.
    const ord = avail - pref > 0 ? pref + 1 : 1;
    // Resolve order statistic to 0-indexed server.
    const sid = kth(ord) - 1;
    // Mark chosen server busy.
    bitAdd(sid, -1);
    // Consume one free slot.
    avail--;
    // Count handled request.
    cnt[sid]++;
    // Busy until arrival plus load.
    push(t + load[i], sid);
  }
  // Maximum handled count across servers.
  let mx = 0;
  // Scan for peak load.
  for (let i = 0; i < k; i++) if (cnt[i] > mx) mx = cnt[i];
  // Collect every server tied at peak.
  const res: number[] = [];
  // Keep only busiest ids.
  for (let i = 0; i < k; i++) if (cnt[i] === mx) res.push(i);
  // Return busiest servers in ascending order.
  return res;
}
