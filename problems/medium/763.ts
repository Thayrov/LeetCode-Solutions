/* 
763. Partition Labels

You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part. For example, the string "ababcc" can be partitioned into ["abab", "cc"], but partitions such as ["aba", "bcc"] or ["ab", "ab", "cc"] are invalid.

Note that the partition is done so that after concatenating all the parts in order, the resultant string should be s.

Return a list of integers representing the size of these parts.

Example 1:
Input: s = "ababcbacadefegdehijhklij"
Output: [9,7,8]
Explanation:
The partition is "ababcbaca", "defegde", "hijhklij".
This is a partition so that each letter appears in at most one part.
A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits s into less parts.

Example 2:
Input: s = "eccbbbbdec"
Output: [10]

Constraints:
1 <= s.length <= 500
s consists of lowercase English letters.

</> Typescript Code:
*/

function partitionLabels(s: string): number[] {
  // Create an array to store the last occurrence index of each lowercase letter ('a' through 'z').
  // Initialize with 0, although the actual index will overwrite this. Size 26 for 26 letters.
  const lastIndices: number[] = new Array(26).fill(0);
  // Get the character code of 'a' to use as a base for calculating array indices (0-25).
  const baseCharCode = "a".charCodeAt(0);

  // First pass: Iterate through the string to find the last index for each character.
  for (let i = 0; i < s.length; i++) {
    // Calculate the index (0-25) corresponding to the current character.
    const charIndex = s.charCodeAt(i) - baseCharCode;
    // Update the last seen index for this character.
    lastIndices[charIndex] = i;
  }

  // Initialize an array to store the lengths of the partitions.
  const result: number[] = [];
  // 'start' marks the beginning index of the current partition being considered.
  let start = 0;
  // 'end' marks the furthest last occurrence index encountered so far for characters within the current partition.
  let end = 0;

  // Second pass: Iterate through the string again to determine partition boundaries.
  for (let i = 0; i < s.length; i++) {
    // Calculate the index (0-25) corresponding to the current character.
    const charIndex = s.charCodeAt(i) - baseCharCode;
    // Update 'end' to be the maximum of its current value and the last index of the current character.
    // This ensures the current partition extends far enough to include the last occurrence of all characters seen so far within this partition.
    end = Math.max(end, lastIndices[charIndex]);

    // Check if the current index 'i' has reached the 'end'.
    // If it has, it means all characters encountered from 'start' to 'i' have their last occurrences within this range (<= i).
    // This signifies the end of a valid partition.
    if (i === end) {
      // Calculate the length of the just-completed partition.
      const partitionLength = i - start + 1;
      // Add the length to the result array.
      result.push(partitionLength);
      // Update 'start' to the beginning of the next potential partition.
      start = i + 1;
    }
  }

  // Return the list of partition lengths.
  return result;
}
