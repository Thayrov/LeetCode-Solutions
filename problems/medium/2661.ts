/* 
2661. First Completely Painted Row or Column

You are given a 0-indexed integer array arr, and an m x n integer matrix mat. arr and mat both contain all the integers in the range [1, m * n].

Go through each index i in arr starting from index 0 and paint the cell in mat containing the integer arr[i].

Return the smallest index i at which either a row or a column will be completely painted in mat.

Example 1:
image explanation for example 1
Input: arr = [1,3,4,2], mat = [[1,4],[2,3]]
Output: 2
Explanation: The moves are shown in order, and both the first row and second column of the matrix become fully painted at arr[2].

Example 2:
image explanation for example 2
Input: arr = [2,8,7,4,1,3,5,6,9], mat = [[3,2,5],[1,4,6],[8,7,9]]
Output: 3
Explanation: The second column becomes fully painted at arr[3].

Constraints:
m == mat.length
n = mat[i].length
arr.length == m * n
1 <= m, n <= 10^5
1 <= m * n <= 10^5
1 <= arr[i], mat[r][c] <= m * n
All the integers of arr are unique.
All the integers of mat are unique.

</> Typescript Code:
*/

function firstCompleteIndex(arr: number[], mat: number[][]): number {
  // Determine the size of the matrix
  const m = mat.length,
    n = mat[0].length;
  // Allocate an array to store the row and column of each number
  const pos = new Array<[number, number]>(m * n + 1);
  // Fill pos with the coordinates of each number in mat
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      pos[mat[i][j]] = [i, j];
    }
  }
  // Track how many cells have been painted in each row and column
  const rCount = new Array(m).fill(0),
    cCount = new Array(n).fill(0);
  // Process each painted number in the order given by arr
  for (let i = 0; i < arr.length; i++) {
    const [r, c] = pos[arr[i]]; // Get the row and column of the current number
    // Increment the paint count for that row and column
    if (++rCount[r] === n || ++cCount[c] === m) {
      return i; // Once a row or column is fully painted, return the index
    }
  }
  return -1; // If no row or column is completely painted, return -1
}
