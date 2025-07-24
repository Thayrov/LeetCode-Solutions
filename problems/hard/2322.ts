/*
2322. Minimum Score After Removals on a Tree

There is an undirected connected tree with n nodes labeled from 0 to n - 1 and n - 1 edges.
You are given a 0-indexed integer array nums of length n where nums[i] represents the value of the ith node. You are also given a 2D integer array edges of length n - 1 where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the tree.
Remove two distinct edges of the tree to form three connected components. For a pair of removed edges, the following steps are defined:
Get the XOR of all the values of the nodes for each of the three components respectively.
The difference between the largest XOR value and the smallest XOR value is the score of the pair.
For example, say the three components have the node values: [4,5,7], [1,9], and [3,3,3]. The three XOR values are 4 ^ 5 ^ 7 = 6, 1 ^ 9 = 8, and 3 ^ 3 ^ 3 = 3. The largest XOR value is 8 and the smallest XOR value is 3. The score is then 8 - 3 = 5.
Return the minimum score of any possible pair of edge removals on the given tree.

Example 1:
Input: nums = [1,5,5,4,11], edges = [[0,1],[1,2],[1,3],[3,4]]
Output: 9
Explanation: The diagram above shows a way to make a pair of removals.
- The 1st component has nodes [1,3,4] with values [5,4,11]. Its XOR value is 5 ^ 4 ^ 11 = 10.
- The 2nd component has node [0] with value [1]. Its XOR value is 1 = 1.
- The 3rd component has node [2] with value [5]. Its XOR value is 5 = 5.
The score is the difference between the largest and smallest XOR value which is 10 - 1 = 9.
It can be shown that no other pair of removals will obtain a smaller score than 9.

Example 2:
Input: nums = [5,5,2,4,4,2], edges = [[0,1],[1,2],[5,2],[4,3],[1,3]]
Output: 0
Explanation: The diagram above shows a way to make a pair of removals.
- The 1st component has nodes [3,4] with values [4,4]. Its XOR value is 4 ^ 4 = 0.
- The 2nd component has nodes [1,0] with values [5,5]. Its XOR value is 5 ^ 5 = 0.
- The 3rd component has nodes [2,5] with values [2,2]. Its XOR value is 2 ^ 2 = 0.
The score is the difference between the largest and smallest XOR value which is 0 - 0 = 0.
We cannot obtain a smaller score than 0.

Constraints:
n == nums.length
3 <= n <= 1000
1 <= nums[i] <= 10^8
edges.length == n - 1
edges[i].length == 2
0 <= ai, bi < n
ai != bi
edges represents a valid tree.

</> Typescript code:
*/

function minimumScore(nums: number[], edges: number[][]): number {
    // Get the total number of nodes in the tree.
    const n = nums.length;

    // Create an adjacency list to represent the undirected graph (tree).
    const adj: number[][] = Array(n).fill(0).map(() => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    // `xorValues[i]` will store the XOR sum of the entire subtree rooted at node `i`.
    const xorValues = new Array(n).fill(0);
    // `startTime[i]` and `endTime[i]` store the entry and exit times of node `i` in the DFS traversal.
    // This is used for an efficient O(1) ancestor check.
    const startTime = new Array(n).fill(0);
    const endTime = new Array(n).fill(0);
    let timer = 0; // A global timer for the DFS traversal.

    // A DFS function to traverse the tree, compute subtree XOR sums, and record traversal times.
    function dfs(u: number, p: number): number {
        // Mark the entry time for the current node `u`.
        timer++;
        startTime[u] = timer;

        // Start the XOR sum for the subtree at `u` with its own value.
        let currentXor = nums[u];

        // Traverse all neighbors of `u`.
        for (const v of adj[u]) {
            // If the neighbor `v` is not the parent `p`, it's a child in this traversal.
            if (v !== p) {
                // Recursively call DFS on the child and XOR its result into the current subtree's sum.
                currentXor ^= dfs(v, u);
            }
        }

        // Store the final computed XOR sum for the subtree rooted at `u`.
        xorValues[u] = currentXor;
        // Mark the exit time for the current node `u`.
        endTime[u] = timer;
        // Return the computed XOR sum to the parent call.
        return currentXor;
    }

    // Start the DFS from node 0 (as an arbitrary root) and get the XOR sum of the entire tree.
    const totalXor = dfs(0, -1);

    // Helper function to check if node `u` is an ancestor of node `v` in O(1).
    function isAncestor(u: number, v: number): boolean {
        // `u` is an ancestor of `v` if `v`'s traversal happens entirely within `u`'s traversal.
        return startTime[u] < startTime[v] && endTime[u] >= endTime[v];
    }

    // Initialize the minimum score to the largest possible value.
    let minScore = Infinity;

    // Iterate through all possible pairs of nodes (i, j) to represent the two removed edges.
    // Removing an edge is equivalent to selecting a node `i` (where i > 0) and cutting the edge to its parent.
    // We iterate from 1 because node 0 is the root and has no parent in this structure.
    for (let i = 1; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            // Declare variables for the XOR sums of the three resulting components.
            let x1: number, x2: number, x3: number;

            // Case 1: The subtree at `i` is an ancestor of the subtree at `j`.
            // This means removing edge (parent(i), i) and (parent(j), j) creates nested components.
            if (isAncestor(i, j)) {
                x1 = xorValues[j];                               // Component 1: subtree at j.
                x2 = xorValues[i] ^ xorValues[j];               // Component 2: subtree at i minus subtree at j.
                x3 = totalXor ^ xorValues[i];                   // Component 3: the rest of the tree.
            }
            // Case 2: The subtree at `j` is an ancestor of the subtree at `i`.
            else if (isAncestor(j, i)) {
                x1 = xorValues[i];                              // Component 1: subtree at i.
                x2 = xorValues[j] ^ xorValues[i];               // Component 2: subtree at j minus subtree at i.
                x3 = totalXor ^ xorValues[j];                   // Component 3: the rest of the tree.
            }
            // Case 3: The subtrees at `i` and `j` are disjoint.
            else {
                x1 = xorValues[i];                              // Component 1: subtree at i.
                x2 = xorValues[j];                              // Component 2: subtree at j.
                x3 = totalXor ^ xorValues[i] ^ xorValues[j];    // Component 3: the rest of the tree.
            }

            // Calculate the score for this pair of removals.
            const score = Math.max(x1, x2, x3) - Math.min(x1, x2, x3);
            // Update the overall minimum score found so far.
            minScore = Math.min(minScore, score);
        }
    }

    // Return the minimum possible score.
    return minScore;
};
