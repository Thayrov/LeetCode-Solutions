/* 
3335. Total Characters in String After Transformations I

You are given a string s and an integer t, representing the number of transformations to perform. In one transformation, every character in s is replaced according to the following rules:

If the character is 'z', replace it with the string "ab".
Otherwise, replace it with the next character in the alphabet. For example, 'a' is replaced with 'b', 'b' is replaced with 'c', and so on.
Return the length of the resulting string after exactly t transformations.

Since the answer may be very large, return it modulo 109 + 7.

Example 1:
Input: s = "abcyy", t = 2
Output: 7
Explanation:
First Transformation (t = 1):
'a' becomes 'b'
'b' becomes 'c'
'c' becomes 'd'
'y' becomes 'z'
'y' becomes 'z'
String after the first transformation: "bcdzz"
Second Transformation (t = 2):
'b' becomes 'c'
'c' becomes 'd'
'd' becomes 'e'
'z' becomes "ab"
'z' becomes "ab"
String after the second transformation: "cdeabab"
Final Length of the string: The string is "cdeabab", which has 7 characters.

Example 2:
Input: s = "azbk", t = 1
Output: 5
Explanation:
First Transformation (t = 1):
'a' becomes 'b'
'z' becomes "ab"
'b' becomes 'c'
'k' becomes 'l'
String after the first transformation: "babcl"
Final Length of the string: The string is "babcl", which has 5 characters.
 
Constraints:
1 <= s.length <= 10^5
s consists only of lowercase English letters.
1 <= t <= 10^5

</> Typescript code:
*/

function lengthAfterTransformations(s: string, t: number): number {
  const mod = 1000000007; // modulus for large numbers
  let prev = new Array<number>(26).fill(1); // f[0][c] = 1 for all letters
  let curr = new Array<number>(26); // buffer for f[i] values

  for (let i = 0; i < t; i++) {
    // repeat t transformations
    // for characters 'a' through 'y'
    for (let c = 0; c < 25; c++) {
      curr[c] = prev[c + 1]; // f[i+1][c] = f[i][c+1]
    }

    // handle 'z' (index 25): expands to 'a' + 'b'
    const sum = prev[0] + prev[1]; // f[i][z] = f[i][a] + f[i][b]
    curr[25] = sum >= mod ? sum - mod : sum; // apply mod without expensive op

    // swap prev and curr buffers for next iteration
    const tmp = prev;
    prev = curr;
    curr = tmp;
  }

  let ans = 0; // accumulator for total length
  // sum contributions of each original character
  for (let i = 0, n = s.length; i < n; i++) {
    const idx = s.charCodeAt(i) - 97; // map 'a'..'z' to 0..25
    ans += prev[idx]; // add precomputed length
  }

  return ans % mod; // final mod to ensure bounds
}
