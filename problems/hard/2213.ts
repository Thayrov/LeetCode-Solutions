/*
2213. Longest Substring of One Repeating Character

You are given a 0-indexed string s. You are also given a 0-indexed string queryCharacters of length k and a 0-indexed array of integer indices queryIndices of length k, both of which are used to describe k queries.
The ith query updates the character in s at index queryIndices[i] to the character queryCharacters[i].
Return an array lengths of length k where lengths[i] is the length of the longest substring of s consisting of only one repeating character after the ith query is performed.

Example 1:
Input: s = "babacc", queryCharacters = "bcb", queryIndices = [1,3,3]
Output: [3,3,4]
Explanation:
- 1st query updates s = "bbbacc". The longest substring consisting of one repeating character is "bbb" with length 3.
- 2nd query updates s = "bbbccc". The longest substring consisting of one repeating character can be "bbb" or "ccc" with length 3.
- 3rd query updates s = "bbbbcc". The longest substring consisting of one repeating character is "bbbb" with length 4.
Thus, we return [3,3,4].

Example 2:
Input: s = "abyzz", queryCharacters = "aa", queryIndices = [2,1]
Output: [2,3]
Explanation:
- 1st query updates s = "abazz". The longest substring consisting of one repeating character is "zz" with length 2.
- 2nd query updates s = "aaazz". The longest substring consisting of one repeating character is "aaa" with length 3.
Thus, we return [2,3].

Constraints:
1 <= s.length <= 10^5
s consists of lowercase English letters.
k == queryCharacters.length == queryIndices.length
1 <= k <= 10^5
queryCharacters consists of lowercase English letters.
0 <= queryIndices[i] < s.length

</> Typescript code:
*/

function longestRepeating(
  s: string,
  queryCharacters: string,
  queryIndices: number[],
): number[] {
  // Cache the source length for tree sizing and leaf initialization.
  const n = s.length;
  // Start the iterative tree at the smallest possible leaf capacity.
  let size = 1;
  // Round the leaf capacity up to a power of two.
  while (size < n) size <<= 1;

  // Reserve both the internal nodes and leaves in flat arrays.
  const total = size << 1;
  // Store the number of real characters covered by every node.
  const length = new Uint32Array(total);
  // Store each node's longest uniform prefix length.
  const prefix = new Uint32Array(total);
  // Store each node's longest uniform suffix length.
  const suffix = new Uint32Array(total);
  // Store each node's longest uniform substring length.
  const best = new Uint32Array(total);
  // Store each node's left boundary character code.
  const leftChar = new Uint8Array(total);
  // Store each node's right boundary character code.
  const rightChar = new Uint8Array(total);
  // Keep the current character code at every source index.
  const chars = new Uint8Array(n);

  // Recompute one parent from its two children.
  const pull = (node: number): void => {
    // Locate the left child in the flat tree.
    const left = node << 1;
    // Locate the adjacent right child.
    const right = left | 1;

    // Copy the right child when the left subtree is padding.
    if (length[left] === 0) {
      // Preserve the right child's real segment length.
      length[node] = length[right];
      // Preserve its uniform prefix.
      prefix[node] = prefix[right];
      // Preserve its uniform suffix.
      suffix[node] = suffix[right];
      // Preserve its best uniform run.
      best[node] = best[right];
      // Preserve its left boundary character.
      leftChar[node] = leftChar[right];
      // Preserve its right boundary character.
      rightChar[node] = rightChar[right];
      // Finish this padding merge.
      return;
    }
    // Copy the left child when the right subtree is padding.
    if (length[right] === 0) {
      // Preserve the left child's real segment length.
      length[node] = length[left];
      // Preserve its uniform prefix.
      prefix[node] = prefix[left];
      // Preserve its uniform suffix.
      suffix[node] = suffix[left];
      // Preserve its best uniform run.
      best[node] = best[left];
      // Preserve its left boundary character.
      leftChar[node] = leftChar[left];
      // Preserve its right boundary character.
      rightChar[node] = rightChar[left];
      // Finish this padding merge.
      return;
    }

    // Detect whether uniform runs can cross the child boundary.
    const joined = rightChar[left] === leftChar[right];
    // Combine both real child lengths.
    length[node] = length[left] + length[right];
    // Extend the prefix only when the whole left child joins the right prefix.
    prefix[node] =
      prefix[left] +
      (joined && prefix[left] === length[left] ? prefix[right] : 0);
    // Extend the suffix only when the whole right child joins the left suffix.
    suffix[node] =
      suffix[right] +
      (joined && suffix[right] === length[right] ? suffix[left] : 0);
    // Select the best child run or the run crossing their shared boundary.
    best[node] = Math.max(
      best[left],
      best[right],
      joined ? suffix[left] + prefix[right] : 0,
    );
    // Inherit the combined segment's left boundary character.
    leftChar[node] = leftChar[left];
    // Inherit the combined segment's right boundary character.
    rightChar[node] = rightChar[right];
  };

  // Initialize every real character as a unit-length leaf.
  for (let index = 0; index < n; ++index) {
    // Encode the lowercase character in one byte.
    const code = s.charCodeAt(index) - 97;
    // Map the source index to its tree leaf.
    const leaf = size + index;
    // Record the mutable source character.
    chars[index] = code;
    // Mark this leaf as one real character.
    length[leaf] = 1;
    // A leaf's uniform prefix has length one.
    prefix[leaf] = 1;
    // A leaf's uniform suffix has length one.
    suffix[leaf] = 1;
    // A leaf's best uniform run has length one.
    best[leaf] = 1;
    // Set the leaf's left boundary character.
    leftChar[leaf] = code;
    // Set the leaf's right boundary character.
    rightChar[leaf] = code;
  }

  // Build every internal node bottom-up in linear time.
  for (let node = size - 1; node > 0; --node) pull(node);

  // Allocate the required result array once.
  const answer = new Array<number>(queryIndices.length);
  // Apply the point updates in their required order.
  for (let query = 0; query < queryIndices.length; ++query) {
    // Read the position changed by this query.
    const index = queryIndices[query];
    // Encode the replacement character in one byte.
    const code = queryCharacters.charCodeAt(query) - 97;

    // Avoid rebuilding the path when the character is unchanged.
    if (chars[index] !== code) {
      // Update the mutable source representation.
      chars[index] = code;
      // Locate the changed leaf.
      let node = size + index;
      // Replace its left boundary character.
      leftChar[node] = code;
      // Replace its right boundary character.
      rightChar[node] = code;
      // Restore all segment invariants along the root path.
      while ((node >>= 1) > 0) pull(node);
    }

    // Read the global longest run maintained at the root.
    answer[query] = best[1];
  }

  // Return one longest-run length per query.
  return answer;
}
