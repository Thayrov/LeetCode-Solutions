/*
417. Pacific Atlantic Water Flow

There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.
The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).
The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.
Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.

Example 1:
Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
Explanation: The following cells can flow to the Pacific and Atlantic oceans, as shown below:
[0,4]: [0,4] -> Pacific Ocean 
       [0,4] -> Atlantic Ocean
[1,3]: [1,3] -> [0,3] -> Pacific Ocean 
       [1,3] -> [1,4] -> Atlantic Ocean
[1,4]: [1,4] -> [1,3] -> [0,3] -> Pacific Ocean 
       [1,4] -> Atlantic Ocean
[2,2]: [2,2] -> [1,2] -> [0,2] -> Pacific Ocean 
       [2,2] -> [2,3] -> [2,4] -> Atlantic Ocean
[3,0]: [3,0] -> Pacific Ocean 
       [3,0] -> [4,0] -> Atlantic Ocean
[3,1]: [3,1] -> [3,0] -> Pacific Ocean 
       [3,1] -> [4,1] -> Atlantic Ocean
[4,0]: [4,0] -> Pacific Ocean 
       [4,0] -> Atlantic Ocean
Note that there are other possible paths for these cells to flow to the Pacific and Atlantic oceans.

Example 2:
Input: heights = [[1]]
Output: [[0,0]]
Explanation: The water can flow from the only cell to the Pacific and Atlantic oceans.

Constraints:
m == heights.length
n == heights[r].length
1 <= m, n <= 200
0 <= heights[r][c] <= 10^5

</> Typescript code:
*/

function pacificAtlantic(heights: number[][]): number[][] {
    // Store grid dimensions for constant-time access
    const m = heights.length, n = heights[0].length;
    
    // Use Uint8Array for memory-efficient boolean storage (1 byte per cell)
    const pacific = new Uint8Array(m * n);
    const atlantic = new Uint8Array(m * n);
    
    // BFS helper function to mark all cells reachable from ocean borders
    const bfs = (visited: Uint8Array, starts: number[]) => {
        // Queue pointers for efficient BFS without shift() overhead
        let qStart = 0, qEnd = starts.length;
        // Copy starting positions into queue
        const queue = starts.slice();
        
        // Process all reachable cells
        while (qStart < qEnd) {
            // Dequeue current cell index
            const idx = queue[qStart++];
            // Convert 1D index to 2D coordinates using bitwise OR for faster integer division
            const r = (idx / n) | 0, c = idx % n;
            // Get current cell height
            const h = heights[r][c];
            
            // Check north neighbor: water flows FROM cells with height >= current
            if (r > 0 && !visited[idx - n] && heights[r - 1][c] >= h) {
                visited[idx - n] = 1;
                queue[qEnd++] = idx - n;
            }
            // Check south neighbor
            if (r < m - 1 && !visited[idx + n] && heights[r + 1][c] >= h) {
                visited[idx + n] = 1;
                queue[qEnd++] = idx + n;
            }
            // Check west neighbor
            if (c > 0 && !visited[idx - 1] && heights[r][c - 1] >= h) {
                visited[idx - 1] = 1;
                queue[qEnd++] = idx - 1;
            }
            // Check east neighbor
            if (c < n - 1 && !visited[idx + 1] && heights[r][c + 1] >= h) {
                visited[idx + 1] = 1;
                queue[qEnd++] = idx + 1;
            }
        }
    };
    
    // Arrays to hold starting positions for each ocean
    const pacificStarts: number[] = [];
    const atlanticStarts: number[] = [];
    
    // Initialize left edge (Pacific) and right edge (Atlantic)
    for (let i = 0; i < m; i++) {
        // Left edge touches Pacific Ocean
        pacificStarts.push(i * n);
        pacific[i * n] = 1;
        // Right edge touches Atlantic Ocean
        atlanticStarts.push(i * n + n - 1);
        atlantic[i * n + n - 1] = 1;
    }
    
    // Initialize top edge (Pacific) and bottom edge (Atlantic)
    for (let j = 0; j < n; j++) {
        // Top edge touches Pacific - skip corners already added
        if (!pacific[j]) {
            pacificStarts.push(j);
            pacific[j] = 1;
        }
        // Bottom edge touches Atlantic - skip corners already added
        const bottomIdx = (m - 1) * n + j;
        if (!atlantic[bottomIdx]) {
            atlanticStarts.push(bottomIdx);
            atlantic[bottomIdx] = 1;
        }
    }
    
    // Run BFS from Pacific Ocean borders to mark all reachable cells
    bfs(pacific, pacificStarts);
    // Run BFS from Atlantic Ocean borders to mark all reachable cells
    bfs(atlantic, atlanticStarts);
    
    // Collect cells that can reach both oceans
    const result: number[][] = [];
    for (let i = 0; i < m * n; i++) {
        // Cell must be reachable from both Pacific and Atlantic
        if (pacific[i] && atlantic[i]) {
            // Convert 1D index back to 2D coordinates for result
            result.push([(i / n) | 0, i % n]);
        }
    }
    
    return result;
}
