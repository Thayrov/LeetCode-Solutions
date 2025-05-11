/* 
1550. Three Consecutive Odds

Given an integer array arr, return true if there are three consecutive odd numbers in the array. Otherwise, return false.
 
Example 1:
Input: arr = [2,6,4,1]
Output: false
Explanation: There are no three consecutive odds.

Example 2:
Input: arr = [1,2,34,3,4,5,7,23,12]
Output: true
Explanation: [5,7,23] are three consecutive odds.

Constraints:
1 <= arr.length <= 1000
1 <= arr[i] <= 1000

</> Typescript code:
*/

// Minimal arrow function to reduce closure footprint
const threeConsecutiveOdds = (arr: number[]): boolean => {
  let c = 0; // counter for current run of odd numbers
  for (const v of arr) {
    // iterate values directly (no index)
    if (v & 1) {
      // bitwise check: odd if lowest bit is 1
      if (++c === 3) return true; // increment and early return on three odds
    } else {
      c = 0; // reset counter when even encountered
    }
  }
  return false; // none found
};
