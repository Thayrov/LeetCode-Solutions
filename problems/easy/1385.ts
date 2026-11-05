/*
1385. Find the Distance Value Between Two Arrays

Given two integer arrays arr1 and arr2, and the integer d, return the distance value between the two arrays.

The distance value is defined as the number of elements arr1[i] such that there is not any element arr2[j] where |arr1[i]-arr2[j]| <= d.

Example 1:
Input: arr1 = [4,5,8], arr2 = [10,9,1,8], d = 2
Output: 2
Explanation:
For arr1[0]=4 we have:
|4-10|=6 > d=2
|4-9|=5 > d=2
|4-1|=3 > d=2
|4-8|=4 > d=2
For arr1[1]=5 we have:
|5-10|=5 > d=2
|5-9|=4 > d=2
|5-1|=4 > d=2
|5-8|=3 > d=2
For arr1[2]=8 we have:
|8-10|=2 <= d=2
|8-9|=1 <= d=2
|8-1|=7 > d=2
|8-8|=0 <= d=2

Example 2:
Input: arr1 = [1,4,2,3], arr2 = [-4,-3,6,10,20,30], d = 3
Output: 2

Example 3:
Input: arr1 = [2,1,100,3], arr2 = [-5,-2,10,-3,7], d = 6
Output: 1

Constraints:
1 <= arr1.length, arr2.length <= 500
-1000 <= arr1[i], arr2[j] <= 1000
0 <= d <= 100

</> Typescript code:
*/

function findTheDistanceValue(arr1: number[], arr2: number[], d: number): number {
  // Sort arr1 ascending to scan targets in order.
  arr1.sort((a, b) => a - b);
  // Sort arr2 ascending for monotone pointer walk.
  arr2.sort((a, b) => a - b);
  // Init count of valid elements.
  let count = 0;
  // Init monotone pointer into arr2.
  let j = 0;
  // Cache arr2 length.
  const m = arr2.length;
  // Scan each target of sorted arr1.
  for (let i = 0; i < arr1.length; i++) {
    // Cache current target value.
    const a = arr1[i];
    // Compute inclusive lower bound of forbidden interval.
    const lo = a - d;
    // Compute inclusive upper bound of forbidden interval.
    const hi = a + d;
    // Advance pointer past values too small to match.
    while (j < m && arr2[j] < lo) j++;
    // Count when no arr2 value falls inside interval.
    if (j === m || arr2[j] > hi) count++;
  }
  // Return number of elements far from every arr2 value.
  return count;
}
