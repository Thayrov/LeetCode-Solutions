/* 
2337. Move Pieces to Obtain a String

You are given two strings start and target, both of length n. Each string consists only of the characters 'L', 'R', and '_' where:

The characters 'L' and 'R' represent pieces, where a piece 'L' can move to the left only if there is a blank space directly to its left, and a piece 'R' can move to the right only if there is a blank space directly to its right.
The character '_' represents a blank space that can be occupied by any of the 'L' or 'R' pieces.
Return true if it is possible to obtain the string target by moving the pieces of the string start any number of times. Otherwise, return false.

Example 1:
Input: start = "_L__R__R_", target = "L______RR"
Output: true
Explanation: We can obtain the string target from start by doing the following moves:
- Move the first piece one step to the left, start becomes equal to "L___R__R_".
- Move the last piece one step to the right, start becomes equal to "L___R___R".
- Move the second piece three steps to the right, start becomes equal to "L______RR".
Since it is possible to get the string target from start, we return true.

Example 2:
Input: start = "R_L_", target = "__LR"
Output: false
Explanation: The 'R' piece in the string start can move one step to the right to obtain "_RL_".
After that, no pieces can move anymore, so it is impossible to obtain the string target from start.

Example 3:
Input: start = "_R", target = "R_"
Output: false
Explanation: The piece in the string start can move only to the right, so it is impossible to obtain the string target from start.

Constraints:
n == start.length == target.length
1 <= n <= 10^5
start and target consist of the characters 'L', 'R', and '_'.

</> Typescript Code:
*/

function canChange(start: string, target: string): boolean {
  // Get the length of the strings
  let n = start.length;
  // Initialize pointers for start and target strings
  let i = 0,
    j = 0;
  // Loop until both pointers reach the end of their strings
  while (i < n || j < n) {
    // Move pointer i to the next non-'_' character in start
    while (i < n && start[i] === '_') i++;
    // Move pointer j to the next non-'_' character in target
    while (j < n && target[j] === '_') j++;
    // If both pointers are at the end, strings can be transformed
    if (i === n && j === n) return true;
    // If one string ends before the other, transformation is impossible
    if (i === n || j === n) return false;
    // If the characters at current positions are different, return false
    if (start[i] !== target[j]) return false;
    // If the character is 'L' and it moves to the right, return false
    if (start[i] === 'L' && i < j) return false;
    // If the character is 'R' and it moves to the left, return false
    if (start[i] === 'R' && i > j) return false;
    // Move both pointers to the next character
    i++;
    j++;
  }
  // If all checks pass, return true
  return true;
}
