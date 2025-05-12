/* 
2094. Finding 3-Digit Even Numbers

You are given an integer array digits, where each element is a digit. The array may contain duplicates.

You need to find all the unique integers that follow the given requirements:

The integer consists of the concatenation of three elements from digits in any arbitrary order.
The integer does not have leading zeros.
The integer is even.
For example, if the given digits were [1, 2, 3], integers 132 and 312 follow the requirements.

Return a sorted array of the unique integers.

Example 1:
Input: digits = [2,1,3,0]
Output: [102,120,130,132,210,230,302,310,312,320]
Explanation: All the possible integers that follow the requirements are in the output array. 
Notice that there are no odd integers or integers with leading zeros.

Example 2:
Input: digits = [2,2,8,8,2]
Output: [222,228,282,288,822,828,882]
Explanation: The same digit can be used as many times as it appears in digits. 
In this example, the digit 8 is used twice each time in 288, 828, and 882. 

Example 3:
Input: digits = [3,7,5]
Output: []
Explanation: No even integers can be formed using the given digits.

Constraints:
3 <= digits.length <= 100
0 <= digits[i] <= 9

</> Typescript code:
*/

function findEvenNumbers(digits: number[]): number[] {
  // Build frequency table for digits 0–9
  const cnt = new Array<number>(10).fill(0);
  for (const d of digits) cnt[d]++;

  // Prepare output array
  const res: number[] = [];

  // Hundreds place: 1 through 9 (no leading zero)
  for (let i = 1; i <= 9; i++) {
    if (cnt[i] === 0) continue; // skip if 'i' not in digits
    cnt[i]--; // reserve one 'i' for hundreds

    // Tens place: 0 through 9
    for (let j = 0; j <= 9; j++) {
      if (cnt[j] === 0) continue; // skip if 'j' not available
      cnt[j]--; // reserve one 'j' for tens

      // Units place: must be even digit (0,2,4,6,8)
      for (let k = 0; k <= 8; k += 2) {
        if (cnt[k] === 0) continue; // skip if 'k' not available
        // assemble the number and record it
        res.push(i * 100 + j * 10 + k);
      }

      cnt[j]++; // restore count after trying all 'k'
    }

    cnt[i]++; // restore count before next 'i'
  }

  return res; // results are generated in ascending order
}
