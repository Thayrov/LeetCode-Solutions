/* 
2381. Shifting Letters II

You are given a string s of lowercase English letters and a 2D integer array shifts where shifts[i] = [starti, endi, directioni]. For every i, shift the characters in s from the index starti to the index endi (inclusive) forward if directioni = 1, or shift the characters backward if directioni = 0.

Shifting a character forward means replacing it with the next letter in the alphabet (wrapping around so that 'z' becomes 'a'). Similarly, shifting a character backward means replacing it with the previous letter in the alphabet (wrapping around so that 'a' becomes 'z').

Return the final string after all such shifts to s are applied.

Example 1:
Input: s = "abc", shifts = [[0,1,0],[1,2,1],[0,2,1]]
Output: "ace"
Explanation: Firstly, shift the characters from index 0 to index 1 backward. Now s = "zac".
Secondly, shift the characters from index 1 to index 2 forward. Now s = "zbd".
Finally, shift the characters from index 0 to index 2 forward. Now s = "ace".

Example 2:
Input: s = "dztz", shifts = [[0,0,0],[1,1,1]]
Output: "catz"
Explanation: Firstly, shift the characters from index 0 to index 0 backward. Now s = "cztz".
Finally, shift the characters from index 1 to index 1 forward. Now s = "catz".

Constraints:
1 <= s.length, shifts.length <= 5 * 10^4
shifts[i].length == 3
0 <= starti <= endi < s.length
0 <= directioni <= 1
s consists of lowercase English letters.

</> Typescript Code:
*/

function shiftingLetters(s: string, shifts: number[][]): string {
  // Store the length of the string
  const n = s.length;
  // Create an array to accumulate shift changes, +1 size for boundary marking
  const delta = new Array(n + 1).fill(0);
  // Process each shift instruction
  for (let [st, ed, d] of shifts) {
    // If direction is 1, increment start index; otherwise decrement
    delta[st] += d ? 1 : -1;
    // Apply opposite effect right after 'ed' boundary to end the shift
    if (ed + 1 < n) delta[ed + 1] += d ? -1 : 1;
  }
  // Prefix sum variable to track net shifts at each position
  let sum = 0;
  // Convert string to an array for efficient modification
  const arr = s.split('');
  // Apply prefix shifts to each character
  for (let i = 0; i < n; i++) {
    // Add the current delta and wrap within 26
    sum = (sum + delta[i]) % 26;
    // Shift the character, considering wrapping from 'z' to 'a'
    const shifted = (arr[i].charCodeAt(0) - 97 + sum + 26) % 26;
    // Convert back to a lowercase letter
    arr[i] = String.fromCharCode(shifted + 97);
  }
  // Return the transformed string
  return arr.join('');
}
