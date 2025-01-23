/* 
1267. Count Servers that Communicate

You are given a map of a server center, represented as a m * n integer matrix grid, where 1 means that on that cell there is a server and 0 means that it is no server. Two servers are said to communicate if they are on the same row or on the same column.

Return the number of servers that communicate with any other server.

Example 1:
Input: grid = [[1,0],[0,1]]
Output: 0
Explanation: No servers can communicate with others.

Example 2:
Input: grid = [[1,0],[1,1]]
Output: 3
Explanation: All three servers can communicate with at least one other server.

Example 3:
Input: grid = [[1,1,0,0],[0,0,1,0],[0,0,1,0],[0,0,0,1]]
Output: 4
Explanation: The two servers in the first row can communicate with each other. The two servers in the third column can communicate with each other. The server at right bottom corner can't communicate with any other server.

Constraints:
m == grid.length
n == grid[i].length
1 <= m <= 250
1 <= n <= 250
grid[i][j] == 0 or 1

</> Typescript Code:
*/

function countServers(grid: number[][]): number {
  // Get the number of rows (m) and columns (n) in the grid
  const m = grid.length;
  const n = grid[0].length;

  // Initialize arrays to count the number of servers in each row and column
  const rowCount = new Array(m).fill(0);
  const colCount = new Array(n).fill(0);

  // Iterate through each cell in the grid
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // If the cell contains a server (1), increment the count for its row and column
      if (grid[i][j] === 1) {
        rowCount[i]++;
        colCount[j]++;
      }
    }
  }

  // Initialize the result counter
  let result = 0;

  // Iterate through each cell in the grid again
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // If the cell contains a server and it is not alone in its row or column, increment the result
      if (grid[i][j] === 1 && (rowCount[i] > 1 || colCount[j] > 1)) {
        result++;
      }
    }
  }

  // Return the total number of servers that can communicate with at least one other server
  return result;
}
