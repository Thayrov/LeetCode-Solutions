/*
3442. Maximum Difference Between Even and Odd Frequency I

You are given a string s consisting of lowercase English letters.
Your task is to find the maximum difference diff = a1 - a2 between the frequency of characters a1 and a2 in the string such that:
a1 has an odd frequency in the string.
a2 has an even frequency in the string.
Return this maximum difference.

Example 1:
Input: s = "aaaaabbc"
Output: 3
Explanation:
The character 'a' has an odd frequency of 5, and 'b' has an even frequency of 2.
The maximum difference is 5 - 2 = 3.

Example 2:
Input: s = "abcabcab"
Output: 1
Explanation:
The character 'a' has an odd frequency of 3, and 'c' has an even frequency of 2.
The maximum difference is 3 - 2 = 1.
 
Constraints:
3 <= s.length <= 100
s consists only of lowercase English letters.
s contains at least one character with an odd frequency and one with an even frequency.

</> Typescript code:
*/

function maxDifference(s: string): number {
  // Create a fixed-size array to store the frequency of each lowercase letter ('a' through 'z').
  // The size is 26, and all frequencies are initialized to 0.
  const freq: number[] = new Array(26).fill(0);

  // Iterate through the input string 's' to count the occurrences of each character.
  for (let i = 0; i < s.length; i++) {
    // Calculate the index for the character (0 for 'a', 1 for 'b', etc.)
    // by subtracting the ASCII value of 'a' (97) from the character's ASCII value.
    // Increment the frequency count for that character.
    freq[s.charCodeAt(i) - 97]++;
  }

  // Initialize a variable to track the maximum odd frequency found so far.
  // Starting with 0 is safe, as frequencies are non-negative.
  let maxOdd = 0;

  // Initialize a variable to track the minimum even frequency found so far.
  // s.length is at most 100, so any value > 100 works as an initial "infinity".
  let minEven = 101;

  // Iterate through the frequency array to find the required frequencies.
  for (const count of freq) {
    // If the count is 0, the character was not in the string, so we skip it.
    if (count === 0) {
      continue;
    }

    // Check if the frequency is odd.
    if (count % 2 === 1) {
      // If the current odd frequency is greater than the max odd frequency found so far, update it.
      if (count > maxOdd) {
        maxOdd = count;
      }
    } else {
      // Otherwise, the frequency is even.
      // If the current even frequency is smaller than the min even frequency found so far, update it.
      if (count < minEven) {
        minEven = count;
      }
    }
  }

  // Return the maximum difference, as per the problem description.
  // The constraints guarantee that at least one odd and one even frequency exist.
  return maxOdd - minEven;
}
