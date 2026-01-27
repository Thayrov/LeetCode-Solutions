/*
3650. Minimum Cost Path with Edge Reversals

You are given a directed, weighted graph with n nodes labeled from 0 to n - 1, and an array edges where edges[i] = [ui, vi, wi] represents a directed edge from node ui to node vi with cost wi.
Each node ui has a switch that can be used at most once: when you arrive at ui and have not yet used its switch, you may activate it on one of its incoming edges vi → ui reverse that edge to ui → vi and immediately traverse it.
The reversal is only valid for that single move, and using a reversed edge costs 2 * wi.
Return the minimum total cost to travel from node 0 to node n - 1. If it is not possible, return -1.

Example 1:
Input: n = 4, edges = [[0,1,3],[3,1,1],[2,3,4],[0,2,2]]
Output: 5
Explanation:
Use the path 0 → 1 (cost 3).
At node 1 reverse the original edge 3 → 1 into 1 → 3 and traverse it at cost 2 * 1 = 2.
Total cost is 3 + 2 = 5.

Example 2:
Input: n = 4, edges = [[0,2,1],[2,1,1],[1,3,1],[2,3,3]]
Output: 3
Explanation:
No reversal is needed. Take the path 0 → 2 (cost 1), then 2 → 1 (cost 1), then 1 → 3 (cost 1).
Total cost is 1 + 1 + 1 = 3.

Constraints:
2 <= n <= 5 * 10^4
1 <= edges.length <= 10^5
edges[i] = [ui, vi, wi]
0 <= ui, vi <= n - 1
1 <= wi <= 1000

</> Typescript code:
*/

function minCost(n: number, edges: number[][]): number {
  // We use a flat array-based adjacency list (Linked Forward Star) for maximum performance
  // and memory locality compared to array-of-arrays.
  const head = new Int32Array(n).fill(-1);
  // Capacity is edges.length * 2 because we add both Forward and Reverse edges.
  const next = new Int32Array(edges.length * 2);
  const to = new Int32Array(edges.length * 2);
  const cost = new Int32Array(edges.length * 2);
  let edgeCount = 0;

  // Helper to insert into the flat adjacency list
  const addEdge = (u: number, v: number, w: number) => {
    to[edgeCount] = v;
    cost[edgeCount] = w;
    next[edgeCount] = head[u]; // Point to the previous first edge of u
    head[u] = edgeCount++; // Update head to point to this new edge
  };

  // Build the graph
  for (let i = 0; i < edges.length; i++) {
    const u = edges[i][0];
    const v = edges[i][1];
    const w = edges[i][2];
    // 1. Regular traversal: u -> v with cost w
    addEdge(u, v, w);
    // 2. Switch usage: treat incoming v -> u as outgoing u -> v with cost 2*w
    // Since each node has its own switch, and we visit nodes once in a simple path,
    // we can simply model this as an available edge in the graph.
    addEdge(v, u, 2 * w);
  }

  // Standard Dijkstra setup
  const dist = new Float64Array(n).fill(Infinity);
  // Custom heap using parallel arrays to avoid object allocation overhead
  const pq = new Int32MinHeap(n * 4);

  dist[0] = 0;
  pq.push(0, 0); // push(node, cost)

  while (!pq.isEmpty()) {
    const u = pq.popNode(); // Gets best node
    const d = pq.lastCost; // Gets cost associated with best node

    // Optimization: Skip if we found a shorter path to u already
    if (d > dist[u]) continue;

    // Target reached
    if (u === n - 1) return d;

    // Iterate neighbors using the flat arrays
    let e = head[u];
    while (e !== -1) {
      const v = to[e];
      const w = cost[e];
      const newDist = d + w;

      if (newDist < dist[v]) {
        dist[v] = newDist;
        pq.push(v, newDist);
      }
      e = next[e]; // Move to next edge in linked list
    }
  }

  return -1;
}

/**
 * A highly optimized Binary MinHeap using parallel typed arrays.
 * This avoids the overhead of creating objects {val, priority} for every push.
 */
class Int32MinHeap {
  private nodes: Int32Array;
  private costs: Float64Array;
  private size: number = 0;
  public lastCost: number = 0; // Stores the cost of the last popped node

  constructor(capacity: number) {
    this.nodes = new Int32Array(capacity);
    this.costs = new Float64Array(capacity);
  }

  push(node: number, cost: number) {
    // Dynamic resizing if capacity is exceeded
    if (this.size === this.nodes.length) {
      this.resize();
    }
    this.nodes[this.size] = node;
    this.costs[this.size] = cost;
    this.bubbleUp(this.size++);
  }

  popNode(): number {
    if (this.size === 0) return -1;
    const topNode = this.nodes[0];
    this.lastCost = this.costs[0];

    this.size--;
    if (this.size > 0) {
      // Move last element to root
      this.nodes[0] = this.nodes[this.size];
      this.costs[0] = this.costs[this.size];
      this.bubbleDown(0);
    }
    return topNode;
  }

  isEmpty() {
    return this.size === 0;
  }

  private resize() {
    const newCap = this.nodes.length * 2;
    const newNodes = new Int32Array(newCap);
    const newCosts = new Float64Array(newCap);
    newNodes.set(this.nodes);
    newCosts.set(this.costs);
    this.nodes = newNodes;
    this.costs = newCosts;
  }

  private bubbleUp(idx: number) {
    while (idx > 0) {
      const p = (idx - 1) >>> 1; // Parent index
      if (this.costs[idx] >= this.costs[p]) break;
      this.swap(idx, p);
      idx = p;
    }
  }

  private bubbleDown(idx: number) {
    const half = this.size >>> 1; // Only need to check non-leaf nodes
    while (idx < half) {
      let l = (idx << 1) + 1;
      const r = l + 1;
      // Find smaller child
      if (r < this.size && this.costs[r] < this.costs[l]) l = r;

      if (this.costs[idx] <= this.costs[l]) break;
      this.swap(idx, l);
      idx = l;
    }
  }

  private swap(i: number, j: number) {
    const tn = this.nodes[i];
    this.nodes[i] = this.nodes[j];
    this.nodes[j] = tn;
    const tc = this.costs[i];
    this.costs[i] = this.costs[j];
    this.costs[j] = tc;
  }
}
