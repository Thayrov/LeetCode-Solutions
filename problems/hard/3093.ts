/*
3093. Longest Common Suffix Queries

Hint
You are given two arrays of strings wordsContainer and wordsQuery.
For each wordsQuery[i], you need to find a string from wordsContainer that has the longest common suffix with wordsQuery[i]. If there are two or more strings in wordsContainer that share the longest common suffix, find the string that is the smallest in length. If there are two or more such strings that have the same smallest length, find the one that occurred earlier in wordsContainer.
Return an array of integers ans, where ans[i] is the index of the string in wordsContainer that has the longest common suffix with wordsQuery[i].

Example 1:
Input: wordsContainer = ["abcd","bcd","xbcd"], wordsQuery = ["cd","bcd","xyz"]
Output: [1,1,1]
Explanation:
Let's look at each wordsQuery[i] separately:
For wordsQuery[0] = "cd", strings from wordsContainer that share the longest common suffix "cd" are at indices 0, 1, and 2. Among these, the answer is the string at index 1 because it has the shortest length of 3.
For wordsQuery[1] = "bcd", strings from wordsContainer that share the longest common suffix "bcd" are at indices 0, 1, and 2. Among these, the answer is the string at index 1 because it has the shortest length of 3.
For wordsQuery[2] = "xyz", there is no string from wordsContainer that shares a common suffix. Hence the longest common suffix is "", that is shared with strings at index 0, 1, and 2. Among these, the answer is the string at index 1 because it has the shortest length of 3.

Example 2:
Input: wordsContainer = ["abcdefgh","poiuygh","ghghgh"], wordsQuery = ["gh","acbfgh","acbfegh"]
Output: [2,0,2]
Explanation:
Let's look at each wordsQuery[i] separately:
For wordsQuery[0] = "gh", strings from wordsContainer that share the longest common suffix "gh" are at indices 0, 1, and 2. Among these, the answer is the string at index 2 because it has the shortest length of 6.
For wordsQuery[1] = "acbfgh", only the string at index 0 shares the longest common suffix "fgh". Hence it is the answer, even though the string at index 2 is shorter.
For wordsQuery[2] = "acbfegh", strings from wordsContainer that share the longest common suffix "gh" are at indices 0, 1, and 2. Among these, the answer is the string at index 2 because it has the shortest length of 6.

Constraints:
1 <= wordsContainer.length, wordsQuery.length <= 10^4
1 <= wordsContainer[i].length <= 5 * 10^3
1 <= wordsQuery[i].length <= 5 * 10^3
wordsContainer[i] consists only of lowercase English letters.
wordsQuery[i] consists only of lowercase English letters.
Sum of wordsContainer[i].length is at most 5 * 10^5.
Sum of wordsQuery[i].length is at most 5 * 105^.

</> Typescript code:
*/

function stringIndices(
  wordsContainer: string[],
  wordsQuery: string[],
): number[] {
  // Trie child pointers, one 26-slot array per node.
  const next: number[][] = [];

  // Best container index for each node's suffix; -1 means unset.
  const best: number[] = [];

  // Creates and returns a new trie node.
  const add = (): number => {
    // Add 26 missing child links.
    next.push(Array(26).fill(-1));

    // Mark this node as having no best index yet.
    best.push(-1);

    // Return this new node's index.
    return next.length - 1;
  };

  // Returns the better index: shorter word first, then earlier index.
  const better = (a: number, b: number): number =>
    a === -1 ||
    wordsContainer[b].length < wordsContainer[a].length ||
    (wordsContainer[b].length === wordsContainer[a].length && b < a)
      ? b
      : a;

  // Create root node for empty suffix.
  add();

  // Insert every container word reversed.
  for (let i = 0; i < wordsContainer.length; i++) {
    // Root stores best fallback for empty suffix.
    best[0] = better(best[0], i);

    // Start at root.
    let node = 0;

    // Current word.
    const w = wordsContainer[i];

    // Traverse from last character to first.
    for (let j = w.length - 1; j >= 0; j--) {
      // Map lowercase letter to 0..25.
      const c = w.charCodeAt(j) - 97;

      // Create path if missing.
      if (next[node][c] === -1) next[node][c] = add();

      // Move to next trie node.
      node = next[node][c];

      // Store best word index for this suffix.
      best[node] = better(best[node], i);
    }
  }

  // Answers for queries.
  const ans: number[] = [];

  // Process each query.
  for (const q of wordsQuery) {
    // Start at empty suffix root.
    let node = 0;

    // Match query suffix by reading reversed query.
    for (let j = q.length - 1; j >= 0; j--) {
      // Map character to child slot.
      const c = q.charCodeAt(j) - 97;

      // Candidate child node.
      const nxt = next[node][c];

      // Stop at longest matched suffix.
      if (nxt === -1) break;

      // Advance match.
      node = nxt;
    }

    // Deepest node stores required answer.
    ans.push(best[node]);
  }

  // Return all answers.
  return ans;
}
