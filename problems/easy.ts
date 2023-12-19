/* 
1913. Maximum Product Difference Between Two Pairs

The product difference between two pairs (a, b) and (c, d) is defined as (a * b) - (c * d).

For example, the product difference between (5, 6) and (2, 7) is (5 * 6) - (2 * 7) = 16.
Given an integer array nums, choose four distinct indices w, x, y, and z such that the product difference between pairs (nums[w], nums[x]) and (nums[y], nums[z]) is maximized.

Return the maximum such product difference.

Example 1:

Input: nums = [5,6,2,7,4]
Output: 34
Explanation: We can choose indices 1 and 3 for the first pair (6, 7) and indices 2 and 4 for the second pair (2, 4).
The product difference is (6 * 7) - (2 * 4) = 34.
Example 2:

Input: nums = [4,2,5,9,7,4,8]
Output: 64
Explanation: We can choose indices 3 and 6 for the first pair (9, 8) and indices 1 and 5 for the second pair (2, 4).
The product difference is (9 * 8) - (2 * 4) = 64.


Constraints:

4 <= nums.length <= 104
1 <= nums[i] <= 104

</>Code:
*/

function maxProductDifference(nums: number[]): number {
  nums.sort((a, b) => a - b);
  let a = nums[nums.length - 1];
  let b = nums[nums.length - 2];
  let c = nums[0];
  let d = nums[1];
  return a * b - c * d;
}

/* 
661. Image Smoother

An image smoother is a filter of the size 3 x 3 that can be applied to each cell of an image by rounding down the average of the cell and the eight surrounding cells (i.e., the average of the nine cells in the blue smoother). If one or more of the surrounding cells of a cell is not present, we do not consider it in the average (i.e., the average of the four cells in the red smoother).

Given an m x n integer matrix img representing the grayscale of an image, return the image after applying the smoother on each cell of it.

Example 1:

Input: img = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[0,0,0],[0,0,0],[0,0,0]]
Explanation:
For the points (0,0), (0,2), (2,0), (2,2): floor(3/4) = floor(0.75) = 0
For the points (0,1), (1,0), (1,2), (2,1): floor(5/6) = floor(0.83333333) = 0
For the point (1,1): floor(8/9) = floor(0.88888889) = 0

Example 2:

Input: img = [[100,200,100],[200,50,200],[100,200,100]]
Output: [[137,141,137],[141,138,141],[137,141,137]]
Explanation:
For the points (0,0), (0,2), (2,0), (2,2): floor((100+200+200+50)/4) = floor(137.5) = 137
For the points (0,1), (1,0), (1,2), (2,1): floor((200+200+50+200+100+100)/6) = floor(141.666667) = 141
For the point (1,1): floor((50+200+200+200+200+100+100+100+100)/9) = floor(138.888889) = 138

Constraints:

m == img.length
n == img[i].length
1 <= m, n <= 200
0 <= img[i][j] <= 255

</>Code:
*/

// Define the function 'imageSmoother' with 'img' as a parameter of type number[][].
function imageSmoother(img: number[][]): number[][] {
  // Get the number of rows 'm' and columns 'n' from the image.
  const m = img.length;
  const n = img[0].length;

  // Initialize 'newImg' as a two-dimensional array filled with zeros.
  const newImg: number[][] = Array.from({length: m}, () => new Array(n).fill(0));

  // Iterate over each row of the image.
  for (let i = 0; i < m; i++) {
    // Iterate over each column of the image.
    for (let j = 0; j < n; j++) {
      // Initialize 'sum' to accumulate the values of the neighboring pixels.
      let sum = 0;
      // Initialize 'count' to count the number of neighboring pixels considered.
      let count = 0;

      // Iterate over the neighbors of the current pixel in the 3x3 grid.
      for (let x = i - 1; x <= i + 1; x++) {
        for (let y = j - 1; y <= j + 1; y++) {
          // Check if the neighbor is within the bounds of the image.
          if (x >= 0 && x < m && y >= 0 && y < n) {
            // Add the value of the neighbor to 'sum'.
            sum += img[x][y];
            // Increment 'count' for each valid neighbor.
            count++;
          }
        }
      }
      // Calculate the average value by dividing 'sum' by 'count' and use 'Math.floor' to round down.
      newImg[i][j] = Math.floor(sum / count);
    }
  }

  // Return the new image matrix after smoothing.
  return newImg;
}
