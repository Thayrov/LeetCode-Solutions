/*
778. Swim in Rising Water

You are given an n x n integer matrix grid where each value grid[i][j] represents the elevation at that point (i, j).
It starts raining, and water gradually rises over time. At time t, the water level is t, meaning any cell with elevation less than equal to t is submerged or reachable.
You can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares individually are at most t. You can swim infinite distances in zero time. Of course, you must stay within the boundaries of the grid during your swim.
Return the minimum time until you can reach the bottom right square (n - 1, n - 1) if you start at the top left square (0, 0).

Example 1:
Input: grid = [[0,2],[1,3]]
Output: 3
Explanation:
At time 0, you are in grid location (0, 0).
You cannot go anywhere else because 4-directionally adjacent neighbors have a higher elevation than t = 0.
You cannot reach point (1, 1) until time 3.
When the depth of water is 3, we can swim anywhere inside the grid.

Example 2:
Input: grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]
Output: 16
Explanation: The final route is shown.
We need to wait until time 16 so that (0, 0) and (4, 4) are connected.

Constraints:
n == grid.length
n == grid[i].length
1 <= n <= 50
0 <= grid[i][j] < n^2
Each value grid[i][j] is unique.

</> Typescript code:
*/

function swimInWater(grid: number[][]): number {
    // Store grid dimension for constant-time access
    const n = grid.length;
    // Use Uint8Array for memory efficiency and faster access than boolean[]
    const visited = new Uint8Array(n * n);
    // Min-heap storing [time, position] tuples where position = row * n + col
    const heap: [number, number][] = [[grid[0][0], 0]];
    
    // Process cells in order of increasing maximum elevation
    while (heap.length) {
        // Extract minimum element (manual heap pop for performance)
        const [time, pos] = heap[0];
        heap[0] = heap[heap.length - 1];
        heap.pop();
        // Restore heap property after removal
        if (heap.length) siftDown(heap, 0);
        
        // If we reached destination, return the maximum elevation encountered
        if (pos === n * n - 1) return time;
        // Skip if already visited (may have duplicates in heap)
        if (visited[pos]) continue;
        // Mark current position as visited
        visited[pos] = 1;
        
        // Decode 1D position to 2D coordinates using division and modulo
        const r = pos / n | 0;  // Bitwise OR for fast floor operation
        const c = pos % n;
        
        // Explore all 4 adjacent directions (right, down, left, up)
        for (const [dr, dc] of [[0,1],[1,0],[0,-1],[-1,0]]) {
            const nr = r + dr, nc = c + dc;
            // Check if neighbor is within grid bounds
            if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                // Encode 2D coordinates back to 1D position
                const npos = nr * n + nc;
                // Only process unvisited neighbors
                if (!visited[npos]) {
                    // Add neighbor with updated time (max of current time and neighbor elevation)
                    heap.push([Math.max(time, grid[nr][nc]), npos]);
                    // Maintain min-heap property by bubbling up
                    siftUp(heap, heap.length - 1);
                }
            }
        }
    }
    // Should never reach here given problem constraints
    return -1;
}

// Bubble up element at index i to maintain min-heap property
function siftUp(heap: [number, number][], i: number): void {
    // Store current item for comparison
    const item = heap[i];
    // Continue while not at root and parent is larger
    while (i > 0) {
        // Calculate parent index using bit shift (faster than division by 2)
        const p = (i - 1) >> 1;
        // If parent is smaller or equal, heap property satisfied
        if (heap[p][0] <= item[0]) break;
        // Move parent down
        heap[i] = heap[p];
        i = p;
    }
    // Place item in its final position
    heap[i] = item;
}

// Bubble down element at index i to maintain min-heap property
function siftDown(heap: [number, number][], i: number): void {
    // Store current item for comparison
    const item = heap[i];
    const len = heap.length;
    // Only need to check up to halfway point (nodes with children)
    const half = len >> 1;
    
    // Continue while current node has at least one child
    while (i < half) {
        // Calculate left child index using bit shift (faster than multiplication by 2)
        let min = (i << 1) + 1;
        const right = min + 1;
        // Choose smaller of two children
        if (right < len && heap[right][0] < heap[min][0]) min = right;
        // If current item is smaller than both children, heap property satisfied
        if (item[0] <= heap[min][0]) break;
        // Move smaller child up
        heap[i] = heap[min];
        i = min;
    }
    // Place item in its final position
    heap[i] = item;
}
