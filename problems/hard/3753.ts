/*
3753. Total Waviness of Numbers in Range II

Hint
You are given two integers num1 and num2 representing an inclusive range [num1, num2].
The waviness of a number is defined as the total count of its peaks and valleys:
A digit is a peak if it is strictly greater than both of its immediate neighbors.
A digit is a valley if it is strictly less than both of its immediate neighbors.
The first and last digits of a number cannot be peaks or valleys.
Any number with fewer than 3 digits has a waviness of 0.
Return the total sum of waviness for all numbers in the range [num1, num2].

Example 1:
Input: num1 = 120, num2 = 130
Output: 3
Explanation:
In the range [120, 130]:
120: middle digit 2 is a peak, waviness = 1.
121: middle digit 2 is a peak, waviness = 1.
130: middle digit 3 is a peak, waviness = 1.
All other numbers in the range have a waviness of 0.
Thus, total waviness is 1 + 1 + 1 = 3.

Example 2:
Input: num1 = 198, num2 = 202
Output: 3
Explanation:
In the range [198, 202]:
198: middle digit 9 is a peak, waviness = 1.
201: middle digit 0 is a valley, waviness = 1.
202: middle digit 0 is a valley, waviness = 1.
All other numbers in the range have a waviness of 0.
Thus, total waviness is 1 + 1 + 1 = 3.

Example 3:
Input: num1 = 4848, num2 = 4848
Output: 2
Explanation:
Number 4848: the second digit 8 is a peak, and the third digit 4 is a valley, giving a waviness of 2.

Constraints:
1 <= num1 <= num2 <= 10^15

</> Typescript code:
*/

function totalWaviness(num1: number, num2: number): number {
  // Returns total waviness for every number in [0, n].
  const solve = (n: number): bigint => {
    // No positive numbers to count.
    if (n <= 0) return 0n;

    // Converts n into decimal digits for digit DP.
    const digits = String(Math.trunc(n)).split("").map(Number);

    // Memoizes non-tight states: key -> [number count, waviness sum].
    const memo = new Map<string, [bigint, bigint]>();

    // i: current digit index.
    // tight: whether prefix is equal to n prefix.
    // len: real digit count so far, capped at 2.
    // a: second-last real digit.
    // b: last real digit.
    const dfs = (
      i: number,
      tight: boolean,
      len: number,
      a: number,
      b: number,
    ): [bigint, bigint] => {
      // One complete number formed; no future digit can add more waviness.
      if (i === digits.length) return [1n, 0n];

      // Only non-tight states are reusable.
      const key = tight ? "" : `${i},${len},${a},${b}`;

      // Reuses cached answer.
      if (!tight && memo.has(key)) return memo.get(key)!;

      // Upper bound for this digit.
      const limit = tight ? digits[i] : 9;

      // Total valid numbers from this state.
      let count = 0n;

      // Total waviness from this state.
      let sum = 0n;

      // Tries every possible next digit.
      for (let d = 0; d <= limit; d++) {
        // Next tight state.
        const nt = tight && d === limit;

        // Still skipping leading zeroes.
        if (len === 0 && d === 0) {
          // Continue without starting the number.
          const [c, s] = dfs(i + 1, nt, 0, -1, -1);

          // Add child count.
          count += c;

          // Add child waviness.
          sum += s;
        } else if (len === 0) {
          // First real digit starts the number.
          const [c, s] = dfs(i + 1, nt, 1, -1, d);

          // Add child count.
          count += c;

          // Add child waviness.
          sum += s;
        } else if (len === 1) {
          // Second real digit gives us enough history for future checks.
          const [c, s] = dfs(i + 1, nt, 2, b, d);

          // Add child count.
          count += c;

          // Add child waviness.
          sum += s;
        } else {
          // Appending d decides whether b is peak or valley between a and d.
          const add = (b > a && b > d) || (b < a && b < d) ? 1n : 0n;

          // Move digit window from (a, b) to (b, d).
          const [c, s] = dfs(i + 1, nt, 2, b, d);

          // Add child count.
          count += c;

          // Add child waviness plus this finalized digit contribution.
          sum += s + c * add;
        }
      }

      // Packs count and sum.
      const res: [bigint, bigint] = [count, sum];

      // Caches reusable state.
      if (!tight) memo.set(key, res);

      // Returns number count and waviness sum.
      return res;
    };

    // Total waviness is the sum component.
    return dfs(0, true, 0, -1, -1)[1];
  };

  // Inclusive range answer = prefix(num2) - prefix(num1 - 1).
  return Number(solve(num2) - solve(num1 - 1));
}
