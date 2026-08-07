/*
3348. Smallest Divisible Digit Product II

You are given a string num which represents a positive integer, and an integer t.
A number is called zero-free if none of its digits are 0.
Return a string representing the smallest zero-free number greater than or equal to num such that the product of its digits is divisible by t. If no such number exists, return "-1".

Example 1:
Input: num = "1234", t = 256
Output: "1488"
Explanation:
The smallest zero-free number that is greater than 1234 and has the product of its digits divisible by 256 is 1488, with the product of its digits equal to 256.

Example 2:
Input: num = "12355", t = 50
Output: "12355"
Explanation:
12355 is already zero-free and has the product of its digits divisible by 50, with the product of its digits equal to 150.

Example 3:
Input: num = "11111", t = 26
Output: "-1"
Explanation:
No number greater than 11111 has the product of its digits divisible by 26.

Constraints:
2 <= num.length <= 2 * 10^5
num consists only of digits in the range ['0', '9'].
num does not contain leading zeros.
1 <= t <= 10^14

Note:
t must have no prime factors other than 2, 3, 5, and 7 for a solution to exist.
The shortest suffix that must change can be found and formed greedily.

</> Typescript code:
*/

function smallestNumber(num: string, t: number): string {
  // Store each digit's exponents of the primes 2, 3, 5, and 7.
  const factors = [
    // Digits 0 and 1 contribute no usable prime factors.
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    // Encode digits 2 through 9 by their four prime exponents.
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [2, 0, 0, 0],
    [0, 0, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 1],
    [3, 0, 0, 0],
    [0, 2, 0, 0],
  ];
  // List every prime that a decimal digit can contribute.
  const primes = [2, 3, 5, 7];
  // Track the required exponent of each usable prime.
  const need = [0, 0, 0, 0];

  // Factor t completely over the four usable primes.
  for (let i = 0; i < 4; i++) {
    // Count repeated occurrences of the current prime.
    while (t % primes[i] === 0) {
      // Record one required copy of this prime.
      need[i]++;
      // Remove the recorded prime factor from t.
      t /= primes[i];
    }
  }
  // Reject t when a decimal digit product can never contain its remaining factor.
  if (t !== 1) return "-1";

  // Return the fewest digits needed to cover the requested prime exponents.
  const minDigits = (a: number, b: number, c: number, d: number): number => {
    // Keep the exponent of 2 left after using as many 8s as possible.
    const remainder2 = a % 3;
    // Keep the exponent of 3 left after using as many 9s as possible.
    const remainder3 = b % 2;
    // Count mandatory 5s, 7s, 8s, 9s, and the optimal residual digits.
    return (
      c +
      d +
      Math.floor(a / 3) +
      Math.floor(b / 2) +
      (remainder2 === 2 && remainder3 === 1 ? 2 : remainder2 || remainder3 ? 1 : 0)
    );
  };

  // Build the lexicographically smallest suffix of an exact length.
  const buildSuffix = (length: number, a: number, b: number, c: number, d: number): string => {
    // Count each digit selected for the suffix.
    const count = new Array<number>(10).fill(0);
    // Use one digit 5 for every required factor of 5.
    count[5] = c;
    // Use one digit 7 for every required factor of 7.
    count[7] = d;
    // Pack triples of factors of 2 into digit 8.
    count[8] = Math.floor(a / 3);
    // Retain only the unpacked factors of 2.
    a %= 3;
    // Pack pairs of factors of 3 into digit 9.
    count[9] = Math.floor(b / 2);
    // Retain only the unpacked factor of 3.
    b %= 2;

    // Combine one factor of 2 and one factor of 3 into digit 6.
    if (a === 1 && b === 1) {
      // Add the single optimal combined digit.
      count[6]++;
      // Represent 2^2 * 3 by digits 2 and 6 for the smallest ordering.
    } else if (a === 2 && b === 1) {
      // Supply the extra factor of 2 with digit 2.
      count[2]++;
      // Supply the remaining factors with digit 6.
      count[6]++;
    } else {
      // Represent one residual factor of 2 by digit 2.
      if (a === 1) count[2]++;
      // Represent two residual factors of 2 by digit 4.
      else if (a === 2) count[4]++;
      // Represent one residual factor of 3 by digit 3.
      if (b === 1) count[3]++;
    }

    // Track how many non-one digits the factorization requires.
    let used = 0;
    // Sum the fixed digit counts.
    for (let digit = 2; digit <= 9; digit++) used += count[digit];

    // Put all padding ones first to minimize the suffix lexicographically.
    const parts = ["1".repeat(length - used)];
    // Append required digits in ascending order.
    for (let digit = 2; digit <= 9; digit++) {
      // Add the current digit only when it is needed.
      if (count[digit] !== 0) parts.push(String(digit).repeat(count[digit]));
    }
    // Join the bounded number of digit runs into the suffix.
    return parts.join("");
  };

  // Record the first zero because a fixed prefix cannot include it.
  let firstZero = -1;
  // Accumulate the prime exponents supplied by the original number.
  const total = [0, 0, 0, 0];

  // Scan the original number once for zeros and factor coverage.
  for (let i = 0; i < num.length; i++) {
    // Convert the current character to its numeric digit without allocation.
    const digit = num.charCodeAt(i) - 48;
    // Save the earliest zero that invalidates the original number.
    if (digit === 0 && firstZero === -1) firstZero = i;
    // Ignore zero's unusable factor row.
    if (digit !== 0) {
      // Add this digit's four prime exponents.
      for (let p = 0; p < 4; p++) total[p] += factors[digit][p];
    }
  }

  // Return num unchanged when it is already zero-free and divisible by t.
  if (firstZero === -1 && need.every((value, p) => total[p] >= value)) return num;

  // Start at the rightmost position whose preceding prefix is zero-free.
  const start = firstZero === -1 ? num.length - 1 : firstZero;
  // Track factors supplied strictly before the candidate position.
  const prefix = [0, 0, 0, 0];

  // Build the factor totals for the initial fixed prefix.
  for (let i = 0; i < start; i++) {
    // Decode the prefix digit.
    const digit = num.charCodeAt(i) - 48;
    // Add the prefix digit's four prime exponents.
    for (let p = 0; p < 4; p++) prefix[p] += factors[digit][p];
  }

  // Move the changed position leftward until its suffix can satisfy t.
  for (let i = start; i >= 0; i--) {
    // Decode the original digit at the candidate position.
    const original = num.charCodeAt(i) - 48;
    // Count the positions available to construct a minimal suffix.
    const suffixLength = num.length - i - 1;

    // Try larger replacement digits in increasing lexicographic order.
    for (let digit = original + 1; digit <= 9; digit++) {
      // Store the prime exponents still required after this prefix and digit.
      const remaining = new Array<number>(4);
      // Subtract all prime factors already supplied, clamping each at zero.
      for (let p = 0; p < 4; p++) {
        // Compute the uncovered exponent for this prime.
        remaining[p] = Math.max(0, need[p] - prefix[p] - factors[digit][p]);
      }

      // Accept the first replacement whose remaining factors fit the suffix.
      if (minDigits(remaining[0], remaining[1], remaining[2], remaining[3]) <= suffixLength) {
        // Preserve the fixed prefix, raise this digit, and append the minimal suffix.
        return (
          num.slice(0, i) +
          digit +
          buildSuffix(suffixLength, remaining[0], remaining[1], remaining[2], remaining[3])
        );
      }
    }

    // Remove the next digit when shifting the candidate position left.
    if (i > 0) {
      // Decode the digit leaving the fixed prefix.
      const removed = num.charCodeAt(i - 1) - 48;
      // Subtract that digit's four prime exponents.
      for (let p = 0; p < 4; p++) prefix[p] -= factors[removed][p];
    }
  }

  // Compute the minimum length capable of representing all required factors.
  const requiredLength = minDigits(need[0], need[1], need[2], need[3]);
  // Use the shortest feasible length strictly longer than num and build its minimum value.
  return buildSuffix(
    Math.max(num.length + 1, requiredLength),
    need[0],
    need[1],
    need[2],
    need[3],
  );
}
