/*
3871. Count Commas in Range II

You are given an integer n.
Return the total number of commas used when writing all integers from [1, n] (inclusive) in standard number formatting.
In standard formatting:
- A comma is inserted after every three digits from the right.
- Numbers with fewer than 4 digits contain no commas.

Example 1:
Input: n = 1002
Output: 3
Explanation:
The numbers "1,000", "1,001", and "1,002" each contain one comma, giving a total of 3.

Example 2:
Input: n = 998
Output: 0
Explanation:
All numbers from 1 to 998 have fewer than four digits. Therefore, no commas are used.

Constraints:
1 <= n <= 10^15

</> Typescript code:
*/

function countCommas(n: number): number {
  // Count one comma for every number containing at least four digits.
  let total = n >= 1_000 ? n - 999 : 0;

  // Add a second comma for every number containing at least seven digits.
  if (n >= 1_000_000) total += n - 999_999;
  // Add a third comma for every number containing at least ten digits.
  if (n >= 1_000_000_000) total += n - 999_999_999;
  // Add a fourth comma for every number containing at least thirteen digits.
  if (n >= 1_000_000_000_000) total += n - 999_999_999_999;
  // Add a fifth comma for the only possible sixteen-digit value.
  if (n >= 1_000_000_000_000_000) total += n - 999_999_999_999_999;

  // Return the total contribution from every comma threshold.
  return total;
}
