/*
3700. Number of ZigZag Arrays II

Hint
You are given three integers n, l, and r.
A ZigZag array of length n is defined as follows:
Each element lies in the range [l, r].
No two adjacent elements are equal.
No three consecutive elements form a strictly increasing or strictly decreasing sequence.
Return the total number of valid ZigZag arrays.
Since the answer may be large, return it modulo 109 + 7.
A sequence is said to be strictly increasing if each element is strictly greater than its previous one (if exists).
A sequence is said to be strictly decreasing if each element is strictly smaller than its previous one (if exists).

Example 1:
Input: n = 3, l = 4, r = 5
Output: 2
Explanation:
There are only 2 valid ZigZag arrays of length n = 3 using values in the range [4, 5]:
[4, 5, 4]
[5, 4, 5]

Example 2:
Input: n = 3, l = 1, r = 3
Output: 10
Explanation:
There are 10 valid ZigZag arrays of length n = 3 using values in the range [1, 3]:
[1, 2, 1], [1, 3, 1], [1, 3, 2]
[2, 1, 2], [2, 1, 3], [2, 3, 1], [2, 3, 2]
[3, 1, 2], [3, 1, 3], [3, 2, 3]
All arrays meet the ZigZag conditions.

Constraints:
3 <= n <= 10^9
1 <= l < r <= 75​​​​​​​

</> Typescript code:
*/

function zigZagArrays(n: number, l: number, r: number): number {
  // Modulo required by the problem.
  const MOD = 1000000007n;

  // Only the amount of available values matters, not their absolute values.
  const m = r - l + 1;

  // Computes a^e modulo MOD using binary exponentiation.
  const modPow = (a: bigint, e: bigint): bigint => {
    // Multiplicative identity.
    let res = 1n;

    // Process every bit of the exponent.
    while (e > 0n) {
      // If the current bit is set, multiply the answer by the current base.
      if (e & 1n) res = (res * a) % MOD;

      // Square the base for the next bit.
      a = (a * a) % MOD;

      // Move to the next bit.
      e >>= 1n;
    }

    // Return the modular power.
    return res;
  };

  // Keeps values inside [0, MOD).
  const norm = (x: bigint): bigint => ((x %= MOD) < 0n ? x + MOD : x);

  // Builds enough initial answer terms to recover the linear recurrence.
  const terms = (): bigint[] => {
    // The DP state has at most 2*m dimensions, so this is safely enough terms.
    const need = 4 * m + 10;

    // ans[i] stores the number of valid arrays of length i + 1.
    const ans: bigint[] = [BigInt(m)];

    // up[v] = arrays ending at value v where the last move was increasing.
    let up = new Array<number>(m);

    // down[v] = arrays ending at value v where the last move was decreasing.
    let down = new Array<number>(m);

    // Total number of valid arrays for current length.
    let total = 0;

    // Initialize length 2 states.
    for (let i = 0; i < m; i++) {
      // Previous value can be any smaller value.
      up[i] = i;

      // Previous value can be any larger value.
      down[i] = m - 1 - i;

      // Add both directions to length 2 total.
      total += up[i] + down[i];
    }

    // Store length 2 answer.
    ans.push(BigInt(total % Number(MOD)));

    // Generate more terms using prefix/suffix sums.
    while (ans.length < need) {
      // Next increasing states.
      const nu = new Array<number>(m);

      // Next decreasing states.
      const nd = new Array<number>(m);

      // Running sum of down states with smaller ending value.
      let pref = 0;

      // To end with an increasing move into i, previous value must be smaller and previous move decreasing.
      for (let i = 0; i < m; i++) {
        // Store all valid previous decreasing states below i.
        nu[i] = pref;

        // Add current down state for future larger values.
        pref += down[i];

        // Apply modulo after addition.
        if (pref >= Number(MOD)) pref -= Number(MOD);
      }

      // Running sum of up states with larger ending value.
      let suff = 0;

      // To end with a decreasing move into i, previous value must be larger and previous move increasing.
      for (let i = m - 1; i >= 0; i--) {
        // Store all valid previous increasing states above i.
        nd[i] = suff;

        // Add current up state for future smaller values.
        suff += up[i];

        // Apply modulo after addition.
        if (suff >= Number(MOD)) suff -= Number(MOD);
      }

      // Move to next length states.
      up = nu;

      // Move to next length states.
      down = nd;

      // Reset current length total.
      total = 0;

      // Sum all states for this length.
      for (let i = 0; i < m; i++) {
        // Add both ending directions.
        total += up[i] + down[i];

        // Keep total modular.
        total %= Number(MOD);
      }

      // Store this length answer.
      ans.push(BigInt(total));
    }

    // Return generated sequence.
    return ans;
  };

  // Finds the shortest linear recurrence for the generated sequence.
  const berlekampMassey = (s: bigint[]): bigint[] => {
    // Current characteristic polynomial.
    let C: bigint[] = [1n];

    // Previous best characteristic polynomial.
    let B: bigint[] = [1n];

    // Current recurrence length.
    let L = 0;

    // Distance since last update.
    let gap = 1;

    // Last non-zero discrepancy.
    let b = 1n;

    // Process every known term.
    for (let i = 0; i < s.length; i++) {
      // Current discrepancy.
      let d = 0n;

      // Evaluate current recurrence against s[i].
      for (let j = 0; j <= L; j++) {
        // Missing polynomial coefficients are zero.
        if (j < C.length) d = (d + C[j] * s[i - j]) % MOD;
      }

      // Existing recurrence already fits this term.
      if (d === 0n) {
        // Increase distance since last correction.
        gap++;

        // Continue to next term.
        continue;
      }

      // Save old polynomial before modifying it.
      const T = C.slice();

      // Scale factor for the correction polynomial.
      const coef = (d * modPow(b, MOD - 2n)) % MOD;

      // Ensure C has enough space for shifted B.
      while (C.length < B.length + gap) C.push(0n);

      // Apply correction C -= coef * x^gap * B.
      for (let j = 0; j < B.length; j++) {
        // Normalize after subtraction.
        C[j + gap] = norm(C[j + gap] - coef * B[j]);
      }

      // If recurrence length must grow, update BM anchors.
      if (2 * L <= i) {
        // New minimal recurrence length.
        L = i + 1 - L;

        // Previous polynomial becomes old C.
        B = T;

        // Store discrepancy for future inverse.
        b = d;

        // Reset correction gap.
        gap = 1;
      } else {
        // Otherwise only increase correction gap.
        gap++;
      }
    }

    // Recurrence coefficients.
    const rec = new Array<bigint>(L);

    // Convert characteristic polynomial to s[i] = rec[0]*s[i-1] + ...
    for (let i = 1; i <= L; i++) rec[i - 1] = norm(-C[i]);

    // Return recurrence.
    return rec;
  };

  // Computes the k-th zero-indexed sequence term using Kitamasa exponentiation.
  const kth = (s: bigint[], rec: bigint[], k: number): bigint => {
    // Recurrence order.
    const d = rec.length;

    // Already known term.
    if (k < d) return s[k];

    // Multiplies two polynomials modulo the characteristic polynomial.
    const combine = (a: bigint[], b: bigint[]): bigint[] => {
      // Raw product degree is at most 2*d - 2.
      const tmp = new Array<bigint>(2 * d - 1).fill(0n);

      // Multiply coefficient arrays.
      for (let i = 0; i < d; i++) {
        // Skip zero coefficient.
        if (a[i] === 0n) continue;

        // Multiply by every coefficient of b.
        for (let j = 0; j < d; j++) {
          // Skip zero coefficient.
          if (b[j] !== 0n) tmp[i + j] = (tmp[i + j] + a[i] * b[j]) % MOD;
        }
      }

      // Reduce high degrees using x^d = rec[0]x^(d-1) + ... + rec[d-1].
      for (let i = 2 * d - 2; i >= d; i--) {
        // Nothing to reduce.
        if (tmp[i] === 0n) continue;

        // Push this high-degree coefficient into lower degrees.
        for (let j = 1; j <= d; j++) {
          // Apply recurrence coefficient.
          tmp[i - j] = (tmp[i - j] + tmp[i] * rec[j - 1]) % MOD;
        }
      }

      // Keep only degrees below d.
      return tmp.slice(0, d).map((x) => x % MOD);
    };

    // Coefficients for polynomial 1.
    let res = new Array<bigint>(d).fill(0n);

    // Coefficients for polynomial x.
    let base = new Array<bigint>(d).fill(0n);

    // Start with x^0.
    res[0] = 1n;

    // In order 1, x reduces directly to rec[0].
    if (d === 1) base[0] = rec[0];
    // Otherwise x is represented by coefficient at degree 1.
    else base[1] = 1n;

    // Binary exponentiation of x^k modulo the characteristic polynomial.
    while (k > 0) {
      // Multiply result by current base when current bit is set.
      if (k & 1) res = combine(res, base);

      // Square base.
      base = combine(base, base);

      // Shift to next bit.
      k = Math.floor(k / 2);
    }

    // Final answer as a linear combination of first d sequence terms.
    let ans = 0n;

    // Apply computed coefficients to initial terms.
    for (let i = 0; i < d; i++) ans = (ans + res[i] * s[i]) % MOD;

    // Return k-th term.
    return ans;
  };

  // Generate initial sequence terms.
  const s = terms();

  // Recover the recurrence.
  const rec = berlekampMassey(s);

  // n maps to zero-indexed term n - 1.
  return Number(kth(s, rec, n - 1));
}
