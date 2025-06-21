/*
3085. Minimum Deletions to Make String K-Special

You are given a string word and an integer k.
We consider word to be k-special if |freq(word[i]) - freq(word[j])| <= k for all indices i and j in the string.
Here, freq(x) denotes the frequency of the character x in word, and |y| denotes the absolute value of y.
Return the minimum number of characters you need to delete to make word k-special.

Example 1:
Input: word = "aabcaba", k = 0
Output: 3
Explanation: We can make word 0-special by deleting 2 occurrences of "a" and 1 occurrence of "c". Therefore, word becomes equal to "baba" where freq('a') == freq('b') == 2.

Example 2:
Input: word = "dabdcbdcdcd", k = 2
Output: 2
Explanation: We can make word 2-special by deleting 1 occurrence of "a" and 1 occurrence of "d". Therefore, word becomes equal to "bdcbdcdcd" where freq('b') == 2, freq('c') == 3, and freq('d') == 4.

Example 3:
Input: word = "aaabaaa", k = 2
Output: 1
Explanation: We can make word 2-special by deleting 1 occurrence of "b". Therefore, word becomes equal to "aaaaaa" where each letter's frequency is now uniformly 6.

Constraints:
1 <= word.length <= 10^5
0 <= k <= 10^5
word consists only of lowercase English letters.

</> Typescript code:
*/

/**
 * Calculates the minimum number of characters to delete to make a string "k-special".
 * A string is k-special if the absolute difference between the frequencies of any
 * two of its characters is no more than k.
 * @param word The input string.
 * @param k The maximum allowed frequency difference.
 * @returns The minimum number of deletions required.
 */
function minimumDeletions(word: string, k: number): number {
  // Step 1: Count the frequency of each character.
  // We use a 26-element array for the lowercase English alphabet.
  const counts = new Array(26).fill(0);
  for (let i = 0; i < word.length; i++) {
    // 'a'.charCodeAt(0) is 97. We map 'a'->0, 'b'->1, etc.
    counts[word.charCodeAt(i) - 97]++;
  }

  // Step 2: Create a sorted array of the unique, non-zero frequencies.
  // The problem only depends on the set of frequencies, not which character has which frequency.
  const freqs = counts.filter((c) => c > 0);
  freqs.sort((a, b) => a - b); // Sort frequencies in ascending order.

  // Step 3: Handle edge cases.
  // If there is 0 or 1 unique character, the string is already k-special by definition.
  if (freqs.length <= 1) {
    return 0;
  }

  const m = freqs.length; // Number of unique character frequencies.

  // Step 4: Precompute prefix sums for the sorted frequencies.
  // This allows O(1) calculation of the sum of any subarray of frequencies,
  // which is crucial for performance.
  const prefixSum = new Array(m).fill(0);
  prefixSum[0] = freqs[0];
  for (let i = 1; i < m; i++) {
    prefixSum[i] = prefixSum[i - 1] + freqs[i];
  }

  // Helper function to get the sum of frequencies in a range [start, end] using the prefixSum array.
  const getTotalSum = (start: number, end: number): number => {
    if (start > end) return 0; // If the range is invalid, the sum is 0.
    if (start < 0 || end >= m) return 0; // Bounds check.
    // The sum of freqs from index `start` to `end` is `prefixSum[end] - prefixSum[start-1]`.
    return prefixSum[end] - (start > 0 ? prefixSum[start - 1] : 0);
  };

  // Helper function to find the index of the first element in `freqs` strictly greater than `target`.
  // This is equivalent to C++'s std::upper_bound. It uses binary search for O(log m) performance.
  const findFirstGreater = (target: number): number => {
    let low = 0,
      high = m;
    while (low < high) {
      const mid = low + Math.floor((high - low) / 2);
      if (freqs[mid] > target) {
        high = mid; // The element might be at mid, so we search in the left half including mid.
      } else {
        low = mid + 1; // The element must be in the right half.
      }
    }
    return low; // `low` is the insertion point, which is the index of the first element > target.
  };

  // Step 5: Initialize the minimum deletions. We check the case where the target
  // frequency range starts at 0, i.e., [0, k].
  let minDeletions = Infinity;
  const deletionsForRangeStartingAtZero = () => {
    const upperBound = k;
    // Find all frequencies that are greater than the allowed upper bound `k`.
    const p = findFirstGreater(upperBound);
    if (p < m) {
      // Get the sum of all frequencies that need to be reduced.
      const sumRight = getTotalSum(p, m - 1);
      // Get the count of such frequencies.
      const countRight = m - p;
      // The cost is reducing each of these frequencies down to `k`.
      // This is (f1-k) + (f2-k) + ... = (f1+f2+...) - count * k
      return sumRight - countRight * upperBound;
    }
    return 0; // If all frequencies are <= k, no deletions are needed for this range.
  };
  minDeletions = deletionsForRangeStartingAtZero();

  // Step 6: Iterate through each frequency as a potential "floor" for the final set.
  // For each frequency `freqs[i]`, we calculate the cost to make it the minimum
  // frequency, meaning all final frequencies must be in the range `[freqs[i], freqs[i] + k]`.
  let deletionsFromLeft = 0;
  for (let i = 0; i < m; i++) {
    const lowerBound = freqs[i];
    const upperBound = lowerBound + k;

    // Deletions part 1: Frequencies below the `lowerBound`.
    // All characters with these frequencies must be deleted entirely.
    // The cost is the sum of these frequencies, which is the prefix sum up to i-1.
    deletionsFromLeft = i > 0 ? prefixSum[i - 1] : 0;

    // Deletions part 2: Frequencies above the `upperBound`.
    // Characters with these frequencies must have some occurrences deleted
    // to bring their frequency down to the `upperBound`.
    const p = findFirstGreater(upperBound);

    let deletionsFromRight = 0;
    if (p < m) {
      // If there are any frequencies greater than the upper bound.
      // Sum of all frequencies from index `p` to the end.
      const sumRight = getTotalSum(p, m - 1);
      // Count of these frequencies.
      const countRight = m - p;
      // Cost is sum of (freq - upperBound) for each such frequency.
      deletionsFromRight = sumRight - countRight * upperBound;
    }

    // The total cost for this choice of `lowerBound` is the sum of the two parts.
    const currentDeletions = deletionsFromLeft + deletionsFromRight;
    // Update the overall minimum deletions found so far.
    minDeletions = Math.min(minDeletions, currentDeletions);
  }

  // Return the minimum deletions found across all possible valid ranges.
  return minDeletions;
}
