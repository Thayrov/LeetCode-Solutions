/*
3518. Smallest Palindromic Rearrangement II

You are given a palindromic string s and an integer k.
Return the k-th lexicographically smallest palindromic permutation of s. If there are fewer than k distinct palindromic permutations, return an empty string.

Note: Different rearrangements that yield the same palindromic string are considered identical and are counted once.

Example 1:
Input: s = "abba", k = 2
Output: "baab"
Explanation:
The two distinct palindromic rearrangements of "abba" are "abba" and "baab".
Lexicographically, "abba" comes before "baab". Since k = 2, the output is "baab".

Example 2:
Input: s = "aa", k = 2
Output: ""
Explanation:
There is only one palindromic rearrangement: "aa".
The output is an empty string since k = 2 exceeds the number of possible rearrangements.

Example 3:
Input: s = "bacab", k = 1
Output: "abcba"
Explanation:
The two distinct palindromic rearrangements of "bacab" are "abcba" and "bacab".
Lexicographically, "abcba" comes before "bacab". Since k = 1, the output is "abcba".

Constraints:
1 <= s.length <= 10^4
s consists of lowercase English letters.
s is guaranteed to be palindromic.
1 <= k <= 10^6

</> Typescript code:
*/

function smallestPalindrome(s: string, k: number): string {
  // Cache the number of freely chosen positions in the palindrome's left half.
  const halfLength = s.length >> 1;
  // Allocate fixed-alphabet multiplicities for the left half.
  const counts = new Array<number>(26).fill(0);

  // Count one representative from every mirrored pair.
  for (let i = 0; i < halfLength; ++i) {
    // Map the current lowercase letter to its frequency slot.
    ++counts[s.charCodeAt(i) - 97];
  }

  // Compute a binomial coefficient while stopping at the only relevant threshold.
  const binomialCapped = (n: number, r: number, limit: number): number => {
    // Start the exact multiplicative recurrence at C(n, 0).
    let value = 1;

    // Extend the coefficient one selected position at a time.
    for (let i = 1; i <= r; ++i) {
      // Preserve an integral coefficient without constructing factorials.
      value = (value * (n - r + i)) / i;
      // Clamp large counts because only comparison with the rank matters.
      if (value >= limit) return limit;
    }

    // Return the exact coefficient when it remains below the cap.
    return value;
  };

  // Count distinct permutations of the current multiset, capped at a requested rank.
  const arrangementsCapped = (limit: number): number => {
    // Track the remaining slots and the frequency left unexpanded as the denominator base.
    let remaining = 0;
    let largest = 0;

    // Find the total size and a largest group in one fixed-alphabet scan.
    for (let i = 0; i < 26; ++i) {
      // Add this letter's remaining copies to the multiset size.
      remaining += counts[i];
      // Retain a largest group so every expanded binomial uses its smaller side.
      if (counts[i] > counts[largest]) largest = i;
    }

    // Begin the multinomial product with one arrangement.
    let ways = 1;

    // Choose positions for every group except the largest residual group.
    for (let i = 0; i < 26; ++i) {
      // Skip the residual group and absent letters.
      if (i === largest || counts[i] === 0) continue;

      // Cap this factor tightly enough to cap the complete product at limit.
      const factorLimit = Math.ceil(limit / ways);
      // Multiply by the choices for placing every copy of this letter.
      ways *= binomialCapped(remaining, counts[i], factorLimit);
      // Stop as soon as this branch contains at least the desired rank.
      if (ways >= limit) return limit;
      // Remove the positions assigned to this letter from later factors.
      remaining -= counts[i];
    }

    // Return the exact multinomial count when it is smaller than the cap.
    return ways;
  };

  // Reject ranks beyond the number of distinct palindromic permutations.
  if (arrangementsCapped(k) < k) return "";

  // Reserve the left half that uniquely determines the complete palindrome.
  const half = new Array<string>(halfLength);

  // Unrank the requested half from left to right.
  for (let position = 0; position < halfLength; ++position) {
    // Test available letters in lexicographic order.
    for (let letter = 0; letter < 26; ++letter) {
      // Ignore letters exhausted by the existing prefix.
      if (counts[letter] === 0) continue;

      // Tentatively append this letter to the prefix.
      --counts[letter];
      // Count completions of the tentative prefix only up to the current rank.
      const ways = arrangementsCapped(k);

      // Keep the candidate when its lexicographic block contains the target.
      if (ways >= k) {
        // Materialize the accepted letter in the left half.
        half[position] = String.fromCharCode(97 + letter);
        // Advance to the next position with the chosen count consumed.
        break;
      }

      // Skip every completion in this too-small lexicographic block.
      k -= ways;
      // Restore the rejected candidate before testing the next letter.
      ++counts[letter];
    }
  }

  // Join the selected prefix once for final assembly.
  const left = half.join("");
  // Preserve the forced center character only for odd-length inputs.
  const middle = s.length & 1 ? s[halfLength] : "";
  // Mirror the chosen half around the optional center.
  return left + middle + left.split("").reverse().join("");
}
