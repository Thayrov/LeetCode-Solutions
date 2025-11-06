/*
3607. Power Grid Maintenance

You are given an integer c representing c power stations, each with a unique identifier id from 1 to c (1‑based indexing).
These stations are interconnected via n bidirectional cables, represented by a 2D array connections, where each element connections[i] = [ui, vi] indicates a connection between station ui and station vi. Stations that are directly or indirectly connected form a power grid.
Initially, all stations are online (operational).
You are also given a 2D array queries, where each query is one of the following two types:
[1, x]: A maintenance check is requested for station x. If station x is online, it resolves the check by itself. If station x is offline, the check is resolved by the operational station with the smallest id in the same power grid as x. If no operational station exists in that grid, return -1.
[2, x]: Station x goes offline (i.e., it becomes non-operational).
Return an array of integers representing the results of each query of type [1, x] in the order they appear.
Note: The power grid preserves its structure; an offline (non‑operational) node remains part of its grid and taking it offline does not alter connectivity.

Example 1:
Input: c = 5, connections = [[1,2],[2,3],[3,4],[4,5]], queries = [[1,3],[2,1],[1,1],[2,2],[1,2]]
Output: [3,2,3]
Explanation:
Initially, all stations {1, 2, 3, 4, 5} are online and form a single power grid.
Query [1,3]: Station 3 is online, so the maintenance check is resolved by station 3.
Query [2,1]: Station 1 goes offline. The remaining online stations are {2, 3, 4, 5}.
Query [1,1]: Station 1 is offline, so the check is resolved by the operational station with the smallest id among {2, 3, 4, 5}, which is station 2.
Query [2,2]: Station 2 goes offline. The remaining online stations are {3, 4, 5}.
Query [1,2]: Station 2 is offline, so the check is resolved by the operational station with the smallest id among {3, 4, 5}, which is station 3.

Example 2:
Input: c = 3, connections = [], queries = [[1,1],[2,1],[1,1]]
Output: [1,-1]
Explanation:
There are no connections, so each station is its own isolated grid.
Query [1,1]: Station 1 is online in its isolated grid, so the maintenance check is resolved by station 1.
Query [2,1]: Station 1 goes offline.
Query [1,1]: Station 1 is offline and there are no other stations in its grid, so the result is -1.

Constraints:
1 <= c <= 10^5
0 <= n == connections.length <= min(10^5, c * (c - 1) / 2)
connections[i].length == 2
1 <= ui, vi <= c
ui != vi
1 <= queries.length <= 2 * 10^5
queries[i].length == 2
queries[i][0] is either 1 or 2.
1 <= queries[i][1] <= c

</> Typescript code:
*/

// Disjoint Set Union (DSU) or Union-Find class
// Used to efficiently group stations into connected "power grids"
class UnionFind {
    // parent[i] stores the parent of node i. A root's parent is itself.
    private parent: number[];
    // sz[i] stores the size of the component rooted at i (only valid for roots).
    private sz: number[];

    constructor(size: number) {
        // Initialize for 'size' nodes (e.g., c + 1 for 1-based indexing)
        this.parent = Array(size).fill(0).map((_, i) => i);
        // Each node starts as its own component of size 1
        this.sz = Array(size).fill(1);
    }

    // find(i) returns the representative (root) of the set containing i
    find(i: number): number {
        // If i is the root, return it
        if (this.parent[i] === i) {
            return i;
        }
        // Path Compression: Make all nodes on the path point directly to the root
        // This flattens the tree for future, faster lookups.
        return this.parent[i] = this.find(this.parent[i]);
    }

    // union(i, j) merges the sets containing i and j
    union(i: number, j: number): boolean {
        // Find the roots of the sets for i and j
        let rootI = this.find(i);
        let rootJ = this.find(j);

        // If they are already in the same set, do nothing
        if (rootI === rootJ) {
            return false;
        }

        // Union by Size: Attach the smaller tree to the root of the larger tree
        // This keeps the trees balanced and the depth low.
        if (this.sz[rootI] < this.sz[rootJ]) {
            // Swap rootI and rootJ so rootI is always the larger tree
            [rootI, rootJ] = [rootJ, rootI];
        }

        // Make the larger root (rootI) the parent of the smaller root (rootJ)
        this.parent[rootJ] = rootI;
        // Update the size of the new combined component
        this.sz[rootI] += this.sz[rootJ];
        return true;
    }
}

function processQueries(c: number, connections: number[][], queries: number[][]): number[] {
    // Track the online/offline status of each station (1-based indexing)
    const isOnline = new Array(c + 1).fill(true);
    // Initialize the DSU structure for c stations (size c+1 for 1-based)
    const dsu = new UnionFind(c + 1);
    
    // Process all connections to build the power grid components
    for (const [u, v] of connections) {
        dsu.union(u, v);
    }

    // This map will store: root -> [list of all stations in that grid]
    const gridMembers = new Map<number, number[]>();
    
    // Iterate through every station to group them by their grid (root)
    for (let i = 1; i <= c; i++) {
        const root = dsu.find(i); // Find the representative for station i's grid
        // If this is the first time we see this grid, initialize its array
        if (!gridMembers.has(root)) {
            gridMembers.set(root, []);
        }
        // Add this station to its grid's list
        gridMembers.get(root)!.push(i);
    }

    // This map will store: root -> index
    // It's a pointer to the smallest-ID *candidate* station in that grid's sorted list.
    const gridMinIndex = new Map<number, number>();

    // For each grid, sort its members by ID and initialize its index pointer
    for (const root of gridMembers.keys()) {
        // Sort the members array so we can find the *smallest* ID quickly
        gridMembers.get(root)!.sort((a, b) => a - b);
        // Initialize the pointer for this grid to the start of its sorted list (index 0)
        gridMinIndex.set(root, 0);
    }

    // This array will store the results for all type 1 queries
    const results: number[] = [];

    // Process each query one by one
    for (const [type, x] of queries) {
        if (type === 2) {
            // Type 2: Station x goes offline
            isOnline[x] = false;
        } else {
            // Type 1: Maintenance check
            // Case 1: Station x is online
            if (isOnline[x]) {
                results.push(x); // It resolves its own check
                continue; // Move to the next query
            }

            // Case 2: Station x is offline
            const root = dsu.find(x); // Find the grid x belongs to
            const members = gridMembers.get(root)!; // Get the sorted list of members for this grid
            let currentIndex = gridMinIndex.get(root)!; // Get the *saved* index pointer
            let foundId = -1; // Stores the ID of the found station

            // This is the key optimization:
            // We start searching from our saved pointer (currentIndex), *not* from 0.
            // This loop's total work, across all queries, is O(c) (amortized).
            while (currentIndex < members.length) {
                const stationId = members[currentIndex];
                // Check if the station at this index is online
                if (isOnline[stationId]) {
                    foundId = stationId; // We found the smallest online station
                    gridMinIndex.set(root, currentIndex); // Save this index for next time
                    break; // Stop searching
                }
                // This station was offline, so we'll check the next one.
                // This pointer (currentIndex) only ever moves forward.
                currentIndex++;
            }

            // After the loop, check if we found an online station
            if (foundId === -1) {
                // We reached the end of the list and all remaining stations are offline
                gridMinIndex.set(root, currentIndex); // Save the end-of-list index
                results.push(-1);
            } else {
                // We found an online station
                results.push(foundId);
            }
        }
    }

    return results;
}
