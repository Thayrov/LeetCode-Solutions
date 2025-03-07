/* 
2523. Closest Prime Numbers in Range

Given two positive integers left and right, find the two integers num1 and num2 such that:
left <= num1 < num2 <= right .
Both num1 and num2 are prime numbers.
num2 - num1 is the minimum amongst all other pairs satisfying the above conditions.
Return the positive integer array ans = [num1, num2]. If there are multiple pairs satisfying these conditions, return the one with the smallest num1 value. If no such numbers exist, return [-1, -1].

Example 1:
Input: left = 10, right = 19
Output: [11,13]
Explanation: The prime numbers between 10 and 19 are 11, 13, 17, and 19.
The closest gap between any pair is 2, which can be achieved by [11,13] or [17,19].
Since 11 is smaller than 17, we return the first pair.

Example 2:
Input: left = 4, right = 6
Output: [-1,-1]
Explanation: There exists only one prime number in the given range, so the conditions cannot be satisfied.

Constraints:
1 <= left <= right <= 10^6

</> Typescript Code:
*/

function closestPrimes(left: number, right: number): number[] {
  // Create an efficient boolean-like array to track prime numbers up to 'right'
  const isPrime = new Uint8Array(right + 1).fill(1);
  // Explicitly mark 0 and 1 as non-prime numbers
  isPrime[0] = isPrime[1] = 0;

  // Use Sieve of Eratosthenes to find all prime numbers up to 'right'
  for (let i = 2; i * i <= right; ++i) {
    if (isPrime[i]) {
      // Mark multiples of prime 'i' as non-prime
      for (let j = i * i; j <= right; j += i) isPrime[j] = 0;
    }
  }

  // Initialize variables to track the previous prime, minimum difference, and result
  let prev = -1,
    minDiff = Infinity,
    res = [-1, -1];

  // Iterate through the range from 'left' to 'right'
  for (let i = left; i <= right; ++i) {
    if (isPrime[i]) {
      // When we find a prime, check distance from previous prime
      if (prev !== -1 && i - prev < minDiff) {
        // Update the closest pair of primes if the current gap is smaller
        minDiff = i - prev;
        res = [prev, i];
        // Early exit optimization: Smallest prime gap possible is 1 or 2
        if (minDiff === 1 || minDiff === 2) break;
      }
      // Update 'prev' prime to current prime 'i'
      prev = i;
    }
  }
  // Return the closest prime pair or [-1,-1] if none exists
  return res;
}
