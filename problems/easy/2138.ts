/*
2138. Divide a String Into Groups of Size k

A string s can be partitioned into groups of size k using the following procedure:
The first group consists of the first k characters of the string, the second group consists of the next k characters of the string, and so on. Each element can be a part of exactly one group.
For the last group, if the string does not have k characters remaining, a character fill is used to complete the group.
Note that the partition is done so that after removing the fill character from the last group (if it exists) and concatenating all the groups in order, the resultant string should be s.
Given the string s, the size of each group k and the character fill, return a string array denoting the composition of every group s has been divided into, using the above procedure.

Example 1:
Input: s = "abcdefghi", k = 3, fill = "x"
Output: ["abc","def","ghi"]
Explanation:
The first 3 characters "abc" form the first group.
The next 3 characters "def" form the second group.
The last 3 characters "ghi" form the third group.
Since all groups can be completely filled by characters from the string, we do not need to use fill.
Thus, the groups formed are "abc", "def", and "ghi".

Example 2:
Input: s = "abcdefghij", k = 3, fill = "x"
Output: ["abc","def","ghi","jxx"]
Explanation:
Similar to the previous example, we are forming the first three groups "abc", "def", and "ghi".
For the last group, we can only use the character 'j' from the string. To complete this group, we add 'x' twice.
Thus, the 4 groups formed are "abc", "def", "ghi", and "jxx".
 
Constraints:
1 <= s.length <= 100
s consists of lowercase English letters only.
1 <= k <= 100
fill is a lowercase English letter.

</> Typescript code:
*/

/**
 * Divides a string 's' into an array of substrings, each of size 'k'.
 * The final substring is padded with the 'fill' character to reach length 'k' if necessary.
 * @param s The input string to be divided.
 * @param k The size of each group.
 * @param fill The character used to pad the last group.
 * @returns An array of strings representing the groups.
 */
function divideString(s: string, k: number, fill: string): string[] {
  // Initialize an empty array to store the resulting string groups.
  const result: string[] = [];

  // Loop through the string 's', incrementing the index 'i' by 'k' in each step.
  // This allows us to process the string in chunks of size 'k'.
  for (let i = 0; i < s.length; i += k) {
    // Extract a substring of length up to 'k' starting from the current index 'i'.
    let group = s.substring(i, i + k);

    // Check if the extracted group is shorter than 'k'.
    // This condition is only true for the last group if s.length is not a multiple of k.
    if (group.length < k) {
      // If the group is shorter, calculate the number of fill characters needed.
      // Then, create a padding string by repeating the 'fill' character and append it to the group.
      group += fill.repeat(k - group.length);
    }

    // Add the completed (and possibly padded) group to our result array.
    result.push(group);
  }

  // Return the array containing all the generated groups.
  return result;
}
