/*
1784. Check if Binary String Has at Most One Segment of Ones

Given a binary string s without leading zeros, return true if s contains at most one contiguous segment of ones. Otherwise, return false.

Example 1:
Input: s = "1001"
Output: false
Explanation: The ones do not form a contiguous segment.

Example 2:
Input: s = "110"
Output: true

Constraints:
1 <= s.length <= 100
s[i] is either '0' or '1'.
s[0] is '1'.

</> Typescript code:
*/

function checkOnesSegment(s: string): boolean {
  /**
   * Since the problem guarantees s[0] === '1', the first segment of ones
   * starts at index 0. For there to be more than one segment, there
   * must be a transition from '0' back to '1' later in the string.
   * * By checking if the sequence "01" exists, we identify if a new
   * segment of ones starts after at least one zero has appeared.
   * * Returns true if "01" is NOT found, meaning no second segment exists.
   */
  return !s.includes("01");
}
