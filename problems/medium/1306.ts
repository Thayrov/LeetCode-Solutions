/*
1306. Jump Game III

Hint
Given an array of non-negative integers arr, you are initially positioned at start index of the array. When you are at index i, you can jump to i + arr[i] or i - arr[i], check if you can reach any index with value 0.
Notice that you can not jump outside of the array at any time.

Example 1:
Input: arr = [4,2,3,0,3,1,2], start = 5
Output: true
Explanation: 
All possible ways to reach at index 3 with value 0 are: 
index 5 -> index 4 -> index 1 -> index 3 
index 5 -> index 6 -> index 4 -> index 1 -> index 3 

Example 2:
Input: arr = [4,2,3,0,3,1,2], start = 0
Output: true 
Explanation: 
One possible way to reach at index 3 with value 0 is: 
index 0 -> index 4 -> index 1 -> index 3

Example 3:
Input: arr = [3,0,2,1,2], start = 2
Output: false
Explanation: There is no way to reach at index 1 with value 0.

Constraints:
    1 <= arr.length <= 5 * 10^4
    0 <= arr[i] < arr.length
    0 <= start < arr.length

</> Typescript code:
*/

function canReach(arr: number[], start: number): boolean {
  // Store indexes still pending to visit, starting from the given index.
  const stack = [start];

  // Process reachable indexes until none remain.
  while (stack.length) {
    // Take the latest pending index.
    const i = stack.pop()!;

    // Ignore indexes outside bounds or already visited indexes marked as negative.
    if (i < 0 || i >= arr.length || arr[i] < 0) continue;

    // If current value is zero, a valid target was reached.
    if (arr[i] === 0) return true;

    // Save jump distance before marking this index visited.
    const jump = arr[i];

    // Mark current index as visited in-place to avoid cycles and extra memory.
    arr[i] = -1;

    // Try both allowed jumps from current index.
    stack.push(i + jump, i - jump);
  }

  // No zero index was reachable.
  return false;
}
