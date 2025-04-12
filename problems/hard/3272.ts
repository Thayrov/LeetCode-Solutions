/* 
3272. Find the Count of Good Integers

You are given two positive integers n and k.

An integer x is called k-palindromic if:

x is a palindrome.
x is divisible by k.
An integer is called good if its digits can be rearranged to form a k-palindromic integer. For example, for k = 2, 2020 can be rearranged to form the k-palindromic integer 2002, whereas 1010 cannot be rearranged to form a k-palindromic integer.

Return the count of good integers containing n digits.

Note that any integer must not have leading zeros, neither before nor after rearrangement. For example, 1010 cannot be rearranged to form 101.

Example 1:
Input: n = 3, k = 5
Output: 27
Explanation:
Some of the good integers are:
551 because it can be rearranged to form 515.
525 because it is already k-palindromic.

Example 2:
Input: n = 1, k = 4
Output: 2
Explanation:
The two good integers are 4 and 8.

Example 3:
Input: n = 5, k = 6
Output: 2468

Constraints:
1 <= n <= 10
1 <= k <= 9

</> Typescript Code:
*/

function countGoodIntegers(n: number, k: number): number {
  // Initialize the total count of good integers to zero.
  let totalCount = 0;

  // Precompute factorials up to n to use later in permutation count calculations.
  const fact = new Array(n + 1).fill(0);
  fact[0] = 1;
  for (let i = 1; i <= n; i++) fact[i] = fact[i - 1] * i;

  // Helper function that calculates the number of distinct permutations for a given digit distribution.
  // 'dist' is an array holding counts of each digit and 'total' is the total number of digits.
  const countPermutation = (dist: number[], total: number): number => {
    let res = fact[total];
    for (let d = 0; d < 10; d++) {
      res /= fact[dist[d]]; // Divide by factorial of each digit’s count to remove order duplications.
    }
    return res;
  };

  // 'rec' recursively builds all digit distributions (as an array of counts for digits 0-9) that sum up to n.
  function rec(d: number, rem: number, dist: number[]): void {
    // Base case: when we've assigned counts for all 10 digits.
    if (d === 10) {
      // Only proceed if the sum of counts exactly equals n.
      if (rem !== 0) return;
      // Count how many digits have an odd occurrence.
      let oddCount = 0,
        oddDigit = -1;
      for (let i = 0; i < 10; i++) {
        if (dist[i] % 2 !== 0) {
          oddCount++;
          oddDigit = i;
        }
      }
      // For a valid palindromic rearrangement:
      // - If n is even, all digit counts must be even.
      // - If n is odd, exactly one digit must have an odd count.
      if (n % 2 === 0) {
        if (oddCount !== 0) return;
      } else {
        if (oddCount !== 1) return;
      }

      // Build the "half" multiset by taking half the occurrences of each digit.
      let half: number[] = [];
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < Math.floor(dist[i] / 2); j++) {
          half.push(i);
        }
      }

      // Special case for a one-digit number: the only valid palindrome is the digit itself.
      if (n === 1) {
        // If the digit is 0, it cannot be a valid n-digit number.
        if (oddDigit === 0) return;
        // If the single digit is divisible by k, add all numbers with this distribution.
        if (oddDigit % k === 0) {
          totalCount += countPermutation(dist, n);
        }
        return;
      }

      // For numbers with n > 1, ensure that the "half" multiset has at least one nonzero digit to avoid leading zero.
      if (half.length > 0 && !half.some((x) => x !== 0)) return;

      // Generate all unique permutations of the "half" array using backtracking.
      let perms: number[][] = [];
      let used = new Array(half.length).fill(false);
      let cur: number[] = [];
      // Sort 'half' to facilitate skipping duplicate permutations.
      half.sort((a, b) => a - b);
      function backtrack() {
        if (cur.length === half.length) {
          perms.push(cur.slice());
          return;
        }
        for (let i = 0; i < half.length; i++) {
          if (used[i]) continue;
          if (i > 0 && half[i] === half[i - 1] && !used[i - 1]) continue;
          used[i] = true;
          cur.push(half[i]);
          backtrack();
          cur.pop();
          used[i] = false;
        }
      }
      backtrack();

      // Check each half permutation to see if it produces a palindrome divisible by k.
      let valid = false;
      for (let perm of perms) {
        // Skip if the permutation would lead to a palindrome with a leading zero.
        if (perm[0] === 0) continue;
        // 'left' is the string obtained from the permutation (first half).
        let left = perm.join("");
        // 'right' is the mirror (reverse) of the left half.
        let right = perm.slice().reverse().join("");
        // Construct the full palindrome:
        // - For even n, simply concatenate left and right.
        // - For odd n, insert the unique odd digit between left and right.
        let numStr =
          n % 2 === 0 ? left + right : left + oddDigit.toString() + right;
        // If this palindrome is divisible by k, mark as valid.
        if (parseInt(numStr, 10) % k === 0) {
          valid = true;
          break;
        }
      }
      // If at least one valid palindrome arrangement exists:
      if (valid) {
        // Compute the number of n-digit numbers (ignoring order) for this distribution.
        let totalPerm = countPermutation(dist, n);
        let invalid = 0;
        // Compute how many of these numbers would have a leading zero.
        if (dist[0] > 0) {
          let newDist = dist.slice();
          newDist[0]--;
          invalid = countPermutation(newDist, n - 1);
        }
        // Add the valid arrangements (total minus those with a forbidden leading zero) to the global count.
        totalCount += totalPerm - invalid;
      }
      return;
    }
    // For digit 'd', iterate over all possible counts (from 0 up to the remaining total 'rem').
    for (let i = 0; i <= rem; i++) {
      dist[d] = i;
      rec(d + 1, rem - i, dist);
    }
  }

  // Start recursive generation of distributions with digit 0 and total digits equal to n.
  rec(0, n, new Array(10).fill(0));
  // Return the final count of good integers.
  return totalCount;
}
