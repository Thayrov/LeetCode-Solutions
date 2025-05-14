/* 
3337. Total Characters in String After Transformations II

You are given a string s consisting of lowercase English letters, an integer t representing the number of transformations to perform, and an array nums of size 26. In one transformation, every character in s is replaced according to the following rules:

Replace s[i] with the next nums[s[i] - 'a'] consecutive characters in the alphabet. For example, if s[i] = 'a' and nums[0] = 3, the character 'a' transforms into the next 3 consecutive characters ahead of it, which results in "bcd".
The transformation wraps around the alphabet if it exceeds 'z'. For example, if s[i] = 'y' and nums[24] = 3, the character 'y' transforms into the next 3 consecutive characters ahead of it, which results in "zab".
Return the length of the resulting string after exactly t transformations.

Since the answer may be very large, return it modulo 109 + 7.

Example 1:
Input: s = "abcyy", t = 2, nums = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2]
Output: 7
Explanation:
First Transformation (t = 1):
'a' becomes 'b' as nums[0] == 1
'b' becomes 'c' as nums[1] == 1
'c' becomes 'd' as nums[2] == 1
'y' becomes 'z' as nums[24] == 1
'y' becomes 'z' as nums[24] == 1
String after the first transformation: "bcdzz"
Second Transformation (t = 2):
'b' becomes 'c' as nums[1] == 1
'c' becomes 'd' as nums[2] == 1
'd' becomes 'e' as nums[3] == 1
'z' becomes 'ab' as nums[25] == 2
'z' becomes 'ab' as nums[25] == 2
String after the second transformation: "cdeabab"
Final Length of the string: The string is "cdeabab", which has 7 characters.

Example 2:
Input: s = "azbk", t = 1, nums = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
Output: 8
Explanation:
First Transformation (t = 1):
'a' becomes 'bc' as nums[0] == 2
'z' becomes 'ab' as nums[25] == 2
'b' becomes 'cd' as nums[1] == 2
'k' becomes 'lm' as nums[10] == 2
String after the first transformation: "bcabcdlm"
Final Length of the string: The string is "bcabcdlm", which has 8 characters.

Constraints:
1 <= s.length <= 10^5
s consists only of lowercase English letters.
1 <= t <= 10^9
nums.length == 26
1 <= nums[i] <= 25

</> Typescript code:
*/

function lengthAfterTransformations(
  s: string,
  t: number,
  nums: number[]
): number {
  const MOD = 1000000007n; // use BigInt modulo for exact arithmetic
  const n = 26; // alphabet size
  const M: bigint[][] = // build 26×26 adjacency matrix M
    Array.from({ length: n }, (_, i) => {
      const row: bigint[] = Array(n).fill(0n); // initialize row of zeros
      for (let k = 1; k <= nums[i]; k++) {
        // for each next char offset
        row[(i + k) % n] = 1n; // mark transition i→(i+k)%26
      }
      return row; // return row i
    });
  function mul(A: bigint[][], B: bigint[][]): bigint[][] {
    const C: bigint[][] = // result matrix
      Array.from({ length: n }, () => Array(n).fill(0n));
    for (let i = 0; i < n; i++) {
      // for each row of A
      for (let k = 0; k < n; k++) {
        // for each col/row index
        const a = A[i][k]; // entry A[i][k]
        if (a !== 0n) {
          // skip zeros for speed
          for (let j = 0; j < n; j++) {
            // for each column of B
            C[i][j] = (C[i][j] + a * B[k][j]) % MOD; // accumulate product
          }
        }
      }
    }
    return C; // return A×B mod MOD
  }
  function matPow(mat: bigint[][], exp: number): bigint[][] {
    let result: bigint[][] = // identity matrix I_n
      Array.from({ length: n }, (_, i) =>
        Array.from({ length: n }, (_, j) => (i === j ? 1n : 0n))
      );
    let base = mat; // base = M
    while (exp > 0) {
      // binary exponentiation
      if ((exp & 1) === 1)
        // if lowest bit is 1
        result = mul(result, base); // result *= base
      base = mul(base, base); // square base
      exp >>= 1; // shift exponent right
    }
    return result; // return M^exp
  }
  const Mt = matPow(M, t); // compute M^t
  const v0: bigint[] = Array(n).fill(0n); // initial count vector
  for (const ch of s) {
    // count each char in s
    v0[ch.charCodeAt(0) - 97] += 1n; // increment count for char
  }
  let ans = 0n; // accumulator for total length
  for (let i = 0; i < n; i++) {
    // for each original char i
    if (v0[i] > 0n) {
      // if it appears in s
      let rowSum = 0n; // sum of row i in M^t
      for (let j = 0; j < n; j++) {
        // for each transformed char j
        rowSum += Mt[i][j]; // add number of paths i→j
      }
      ans = (ans + v0[i] * (rowSum % MOD)) % MOD; // add v0[i] * total paths from i
    }
  }
  return Number(ans); // convert BigInt back to number
}
