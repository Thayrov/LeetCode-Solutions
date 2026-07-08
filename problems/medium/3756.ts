/*
3756. Concatenate Non-Zero Digits and Multiply by Sum II

Hint
You are given a string s of length m consisting of digits. You are also given a 2D integer array queries, where queries[i] = [li, ri].
For each queries[i], extract the substring s[li..ri]. Then, perform the following:
Form a new integer x by concatenating all the non-zero digits from the substring in their original order. If there are no non-zero digits, x = 0.
Let sum be the sum of digits in x. The answer is x * sum.
Return an array of integers answer where answer[i] is the answer to the ith query.
Since the answers may be very large, return them modulo 109 + 7.

Example 1:
Input: s = "10203004", queries = [[0,7],[1,3],[4,6]]
Output: [12340, 4, 9]
Explanation:
s[0..7] = "10203004"
x = 1234
sum = 1 + 2 + 3 + 4 = 10
Therefore, answer is 1234 * 10 = 12340.
s[1..3] = "020"
x = 2
sum = 2
Therefore, the answer is 2 * 2 = 4.
s[4..6] = "300"
x = 3
sum = 3
Therefore, the answer is 3 * 3 = 9.

Example 2:
Input: s = "1000", queries = [[0,3],[1,1]]
Output: [1, 0]
Explanation:
s[0..3] = "1000"
x = 1
sum = 1
Therefore, the answer is 1 * 1 = 1.
s[1..1] = "0"
x = 0
sum = 0
Therefore, the answer is 0 * 0 = 0.

Example 3:
Input: s = "9876543210", queries = [[0,9]]
Output: [444444137]
Explanation:
s[0..9] = "9876543210"
x = 987654321
sum = 9 + 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1 = 45
Therefore, the answer is 987654321 * 45 = 44444444445.
We return 44444444445 modulo (109 + 7) = 444444137.

Constraints:
1 <= m == s.length <= 10^5
s consists of digits only.
1 <= queries.length <= 10^5
queries[i] = [li, ri]
0 <= li <= ri < m

</> Typescript code:
*/

function sumAndMultiply(s: string, queries: number[][]): number[] {
  const MOD = 1000000007; // Stores the modulo required by the problem.
  const BASE = 1024; // Uses a small power-of-two base to split numbers safely.
  const BASE2 = BASE * BASE; // Stores BASE squared for extracting the third chunk.
  const powBase = [
    1,
    BASE % MOD,
    BASE2 % MOD,
    (BASE2 * BASE) % MOD,
    (BASE2 * BASE2) % MOD,
  ]; // Precomputes BASE powers modulo MOD for chunk multiplication.

  const mulMod = (a: number, b: number): number => {
    // Defines exact modular multiplication for values that could overflow safe precision.
    const ax = [a % BASE, Math.floor(a / BASE) % BASE, Math.floor(a / BASE2)]; // Splits a into base-1024 chunks.
    const bx = [b % BASE, Math.floor(b / BASE) % BASE, Math.floor(b / BASE2)]; // Splits b into base-1024 chunks.
    let res = 0; // Accumulates the product modulo MOD.

    for (let i = 0; i < 3; i++) {
      // Iterates over chunks of a.
      for (let j = 0; j < 3; j++) {
        // Iterates over chunks of b.
        res = (res + ax[i] * bx[j] * powBase[i + j]) % MOD; // Adds this chunk-pair contribution modulo MOD.
      } // Ends b chunk loop.
    } // Ends a chunk loop.

    return res; // Returns the exact product modulo MOD.
  }; // Ends modular multiplication helper.

  const m = s.length; // Stores string length.
  const nonZeroPrefix = new Int32Array(m + 1); // Stores count of non-zero digits before each index.
  const digitSumPrefix = new Int32Array(m + 1); // Stores digit sum before each index.
  const digits: number[] = []; // Stores only non-zero digits in original order.

  for (let i = 0; i < m; i++) {
    // Scans every digit in s.
    const d = s.charCodeAt(i) - 48; // Converts current character to numeric digit.
    nonZeroPrefix[i + 1] = nonZeroPrefix[i] + (d === 0 ? 0 : 1); // Updates non-zero count prefix.
    digitSumPrefix[i + 1] = digitSumPrefix[i] + d; // Updates digit sum prefix.

    if (d !== 0) digits.push(d); // Keeps non-zero digits for compressed substring values.
  } // Ends scan of s.

  const n = digits.length; // Stores count of non-zero digits.
  const valuePrefix = new Int32Array(n + 1); // Stores decimal prefix value over compressed non-zero digits.
  const pow10 = new Int32Array(n + 1); // Stores powers of 10 modulo MOD.

  pow10[0] = 1; // Initializes 10^0.

  for (let i = 0; i < n; i++) {
    // Builds compressed-value prefix arrays.
    valuePrefix[i + 1] = (valuePrefix[i] * 10 + digits[i]) % MOD; // Appends digit i to prefix value.
    pow10[i + 1] = (pow10[i] * 10) % MOD; // Computes next power of 10.
  } // Ends preprocessing of compressed digits.

  const answer = new Array<number>(queries.length); // Allocates result array.

  for (let i = 0; i < queries.length; i++) {
    // Processes each query.
    const l = queries[i][0]; // Reads query left bound.
    const r = queries[i][1]; // Reads query right bound.
    const left = nonZeroPrefix[l]; // Finds first compressed non-zero index inside query.
    const right = nonZeroPrefix[r + 1]; // Finds one-past-last compressed non-zero index inside query.
    const len = right - left; // Counts non-zero digits inside query.

    if (len === 0) {
      // Handles substrings with no non-zero digits.
      answer[i] = 0; // x and sum are both zero, so answer is zero.
      continue; // Skips remaining query work.
    } // Ends empty case.

    let x = valuePrefix[right] - mulMod(valuePrefix[left], pow10[len]); // Extracts compressed substring decimal value modulo MOD.
    if (x < 0) x += MOD; // Normalizes negative modulo result.

    const sum = digitSumPrefix[r + 1] - digitSumPrefix[l]; // Gets digit sum, zeros do not affect it.
    answer[i] = mulMod(x, sum); // Stores x multiplied by digit sum modulo MOD.
  } // Ends query loop.

  return answer; // Returns all query answers.
}
