/* 
38. Count and Say

The count-and-say sequence is a sequence of digit strings defined by the recursive formula:

countAndSay(1) = "1"
countAndSay(n) is the run-length encoding of countAndSay(n - 1).
Run-length encoding (RLE) is a string compression method that works by replacing consecutive identical characters (repeated 2 or more times) with the concatenation of the character and the number marking the count of the characters (length of the run). For example, to compress the string "3322251" we replace "33" with "23", replace "222" with "32", replace "5" with "15" and replace "1" with "11". Thus the compressed string becomes "23321511".

Given a positive integer n, return the nth element of the count-and-say sequence.

Example 1:
Input: n = 4
Output: "1211"
Explanation:
countAndSay(1) = "1"
countAndSay(2) = RLE of "1" = "11"
countAndSay(3) = RLE of "11" = "21"
countAndSay(4) = RLE of "21" = "1211"

Example 2:
Input: n = 1
Output: "1"
Explanation:
This is the base case.

Constraints:
1 <= n <= 30
Follow up: Could you solve it iteratively?

</> Typescript code:
*/

function countAndSay(n: number): string {
  // Base case: the first term is always "1"
  let result = "1";
  // Build terms 2 through n iteratively
  for (let i = 1; i < n; i++) {
    // parts collects the next term segments
    const parts: string[] = [];
    // count of the current run of identical digits
    let count = 1;
    // store current term length to avoid recomputing
    const len = result.length;
    // iterate one past the end to flush the final run
    for (let j = 1; j <= len; j++) {
      // if same digit as previous and within bounds, increment run length
      if (j < len && result[j] === result[j - 1]) {
        count++;
      } else {
        // end of a run: append count and the digit to parts
        parts.push(count.toString(), result[j - 1]);
        // reset count for the next run
        count = 1;
      }
    }
    // join all segments to form the new term
    result = parts.join("");
  }
  // return the nth term
  return result;
}
