/* 
2685. Count the Number of Complete Components

You are given an integer n. There is an undirected graph with n vertices, numbered from 0 to n - 1. You are given a 2D integer array edges where edges[i] = [ai, bi] denotes that there exists an undirected edge connecting vertices ai and bi.
Return the number of complete connected components of the graph.
A connected component is a subgraph of a graph in which there exists a path between any two vertices, and no vertex of the subgraph shares an edge with a vertex outside of the subgraph.
A connected component is said to be complete if there exists an edge between every pair of its vertices.

Example 1:
Input: n = 6, edges = [[0,1],[0,2],[1,2],[3,4]]
Output: 3
Explanation: From the picture above, one can see that all of the components of this graph are complete.

Example 2:
Input: n = 6, edges = [[0,1],[0,2],[1,2],[3,4],[3,5]]
Output: 1
Explanation: The component containing vertices 0, 1, and 2 is complete since there is an edge between every pair of two vertices. On the other hand, the component containing vertices 3, 4, and 5 is not complete since there is no edge between vertices 4 and 5. Thus, the number of complete components in this graph is 1.

Constraints:
1 <= n <= 50
0 <= edges.length <= n * (n - 1) / 2
edges[i].length == 2
0 <= ai, bi <= n - 1
ai != bi
There are no repeated edges.

</> Typescript code:
*/

// Counts connected components containing every possible edge between their vertices.
function countCompleteComponents(n: number, edges: number[][]): number {
    // Stores each vertex's parent in the disjoint-set forest.
    const parent = new Int32Array(n);
    // Stores the number of vertices in each root's component.
    const size = new Int32Array(n);
    // Stores the number of edges in each root's component.
    const edgeCount = new Int32Array(n);

    // Initializes every vertex as a separate component.
    for (let i = 0; i < n; i++) {
        // Makes the vertex its own parent.
        parent[i] = i;
        // Gives the singleton component one vertex.
        size[i] = 1;
    }

    // Finds a vertex's component root using iterative path compression.
    const find = (x: number): number => {
        // Continues until the root points to itself.
        while (x !== parent[x]) {
            // Connects the vertex to its grandparent to shorten future searches.
            parent[x] = parent[parent[x]];
            // Moves upward through the compressed forest.
            x = parent[x];
        }

        // Returns the representative root.
        return x;
    };

    // Processes every undirected edge.
    for (const [a, b] of edges) {
        // Finds the component containing the first endpoint.
        let rootA = find(a);
        // Finds the component containing the second endpoint.
        let rootB = find(b);

        // Merges the components when the endpoints were previously disconnected.
        if (rootA !== rootB) {
            // Ensures the smaller component is attached beneath the larger one.
            if (size[rootA] < size[rootB]) {
                // Swaps roots so rootA represents the larger component.
                [rootA, rootB] = [rootB, rootA];
            }

            // Attaches rootB's component beneath rootA.
            parent[rootB] = rootA;
            // Adds rootB's vertex count to rootA's component.
            size[rootA] += size[rootB];
            // Transfers rootB's existing edges into rootA's component.
            edgeCount[rootA] += edgeCount[rootB];
        }

        // Counts the current edge in the merged component.
        edgeCount[rootA]++;
    }

    // Stores the number of complete connected components.
    let completeComponents = 0;

    // Examines every possible component root.
    for (let vertex = 0; vertex < n; vertex++) {
        // Checks that the vertex is a root and has exactly k(k - 1) / 2 edges.
        if (
            parent[vertex] === vertex &&
            edgeCount[vertex] === (size[vertex] * (size[vertex] - 1)) / 2
        ) {
            // Counts the component as complete.
            completeComponents++;
        }
    }

    // Returns the total number of complete components.
    return completeComponents;
}
