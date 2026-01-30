/*
2977. Minimum Cost to Convert String II

You are given two 0-indexed strings source and target, both of length n and consisting of lowercase English characters. You are also given two 0-indexed string arrays original and changed, and an integer array cost, where cost[i] represents the cost of converting the string original[i] to the string changed[i].
You start with the string source. In one operation, you can pick a substring x from the string, and change it to y at a cost of z if there exists any index j such that cost[j] == z, original[j] == x, and changed[j] == y. You are allowed to do any number of operations, but any pair of operations must satisfy either of these two conditions:
The substrings picked in the operations are source[a..b] and source[c..d] with either b < c or d < a. In other words, the indices picked in both operations are disjoint.
The substrings picked in the operations are source[a..b] and source[c..d] with a == c and b == d. In other words, the indices picked in both operations are identical.
Return the minimum cost to convert the string source to the string target using any number of operations. If it is impossible to convert source to target, return -1.
Note that there may exist indices i, j such that original[j] == original[i] and changed[j] == changed[i].

Example 1:
Input: source = "abcd", target = "acbe", original = ["a","b","c","c","e","d"], changed = ["b","c","b","e","b","e"], cost = [2,5,5,1,2,20]
Output: 28
Explanation: To convert "abcd" to "acbe", do the following operations:
- Change substring source[1..1] from "b" to "c" at a cost of 5.
- Change substring source[2..2] from "c" to "e" at a cost of 1.
- Change substring source[2..2] from "e" to "b" at a cost of 2.
- Change substring source[3..3] from "d" to "e" at a cost of 20.
The total cost incurred is 5 + 1 + 2 + 20 = 28. 
It can be shown that this is the minimum possible cost.

Example 2:
Input: source = "abcdefgh", target = "acdeeghh", original = ["bcd","fgh","thh"], changed = ["cde","thh","ghh"], cost = [1,3,5]
Output: 9
Explanation: To convert "abcdefgh" to "acdeeghh", do the following operations:
- Change substring source[1..3] from "bcd" to "cde" at a cost of 1.
- Change substring source[5..7] from "fgh" to "thh" at a cost of 3. We can do this operation because indices [5,7] are disjoint with indices picked in the first operation.
- Change substring source[5..7] from "thh" to "ghh" at a cost of 5. We can do this operation because indices [5,7] are disjoint with indices picked in the first operation, and identical with indices picked in the second operation.
The total cost incurred is 1 + 3 + 5 = 9.
It can be shown that this is the minimum possible cost.

Example 3:
Input: source = "abcdefgh", target = "addddddd", original = ["bcd","defgh"], changed = ["ddd","ddddd"], cost = [100,1578]
Output: -1
Explanation: It is impossible to convert "abcdefgh" to "addddddd".
If you select substring source[1..3] as the first operation to change "abcdefgh" to "adddefgh", you cannot select substring source[3..7] as the second operation because it has a common index, 3, with the first operation.
If you select substring source[3..7] as the first operation to change "abcdefgh" to "abcddddd", you cannot select substring source[1..3] as the second operation because it has a common index, 3, with the first operation.

Constraints:
1 <= source.length == target.length <= 1000
source, target consist only of lowercase English characters.
1 <= cost.length == original.length == changed.length <= 100
1 <= original[i].length == changed[i].length <= source.length
original[i], changed[i] consist only of lowercase English characters.
original[i] != changed[i]
1 <= cost[i] <= 10^6

</> Typescript code:
*/

function minimumCost(
  source: string,
  target: string,
  original: string[],
  changed: string[],
  cost: number[],
): number {
  const n = source.length;
  // Use a safe large number for Infinity to avoid overflow when adding costs.
  const INF = Number.MAX_SAFE_INTEGER / 2;

  // Define a Trie structure to efficiently map substrings to unique integer IDs.
  // This optimization helps avoid repeated string hashing or slicing.
  type TrieNode = { children: (TrieNode | null)[]; id: number };
  // Initialize Trie root. 'children' is a fixed array for 26 lowercase letters.
  const root: TrieNode = { children: Array(26).fill(null), id: -1 };
  let idCounter = 0;

  // Helper to insert a string into the Trie and assign/retrieve its unique ID.
  const getOrAdd = (s: string): number => {
    let node = root;
    for (let i = 0; i < s.length; i++) {
      const code = s.charCodeAt(i) - 97; // Map 'a' to 0, 'b' to 1...
      if (!node.children[code])
        node.children[code] = { children: Array(26).fill(null), id: -1 };
      node = node.children[code]!;
    }
    // Assign a new ID if this specific string hasn't been seen before.
    if (node.id === -1) node.id = idCounter++;
    return node.id;
  };

  // Pre-process all rule strings into the Trie to get their IDs.
  // These IDs represent nodes in our cost graph.
  const originalIds: number[] = original.map(getOrAdd);
  const changedIds: number[] = changed.map(getOrAdd);

  // Initialize the distance matrix for Floyd-Warshall algorithm.
  // dist[i][j] stores the min cost to convert string with ID i to string with ID j.
  const numNodes = idCounter;
  const dist: number[][] = Array.from({ length: numNodes }, () =>
    new Array(numNodes).fill(INF),
  );

  // Distance to self is always 0.
  for (let i = 0; i < numNodes; i++) dist[i][i] = 0;

  // Populate the initial costs from the input arrays.
  // We handle potential duplicate rules by keeping the minimum cost.
  for (let i = 0; i < original.length; i++) {
    const u = originalIds[i];
    const v = changedIds[i];
    dist[u][v] = Math.min(dist[u][v], cost[i]);
  }

  // Run Floyd-Warshall to find the All-Pairs Shortest Path.
  // This handles the "identical indices" rule (chaining conversions like A->B->C).
  // Note: Since edges only exist between strings of equal length, this naturally
  // preserves the length constraint of operations.
  for (let k = 0; k < numNodes; k++) {
    for (let i = 0; i < numNodes; i++) {
      if (dist[i][k] >= INF) continue; // Optimization: Skip unreachable intermediates
      for (let j = 0; j < numNodes; j++) {
        if (dist[k][j] < INF) {
          dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
        }
      }
    }
  }

  // Dynamic Programming array.
  // dp[i] = min cost to convert source[i...n] to target[i...n].
  const dp = new Array(n + 1).fill(INF);
  dp[n] = 0; // Base case: 0 cost to convert an empty suffix.

  // Iterate backwards from the end of the string.
  for (let i = n - 1; i >= 0; i--) {
    // Option 1: Character match.
    // If characters at index i are identical, we can potentially skip converting this index.
    if (source[i] === target[i]) {
      dp[i] = dp[i + 1];
    }

    // Option 2: Apply a conversion rule starting at index i.
    // We traverse the Trie simultaneously for source and target substrings starting at i.
    // This effectively finds the IDs for source[i...i+len] and target[i...i+len] in O(1) per char.
    let nodeS: TrieNode | null = root;
    let nodeT: TrieNode | null = root;

    // Try all valid substring lengths starting at i.
    for (let len = 0; i + len < n; len++) {
      const charCodeS = source.charCodeAt(i + len) - 97;
      const charCodeT = target.charCodeAt(i + len) - 97;

      // Move deeper into the Trie
      nodeS = nodeS.children[charCodeS];
      nodeT = nodeT.children[charCodeT];

      // If either path falls off the Trie, no rules exist for this substring prefix.
      if (!nodeS || !nodeT) break;

      // If both nodes have valid IDs, it means both source[i...i+len]
      // and target[i...i+len] are known strings in our graph.
      if (nodeS.id !== -1 && nodeT.id !== -1) {
        // Check if a path exists between them in the graph.
        if (dist[nodeS.id][nodeT.id] < INF) {
          // Update dp[i] with the cost of this conversion + cost of the rest.
          dp[i] = Math.min(dp[i], dist[nodeS.id][nodeT.id] + dp[i + len + 1]);
        }
      }
    }
  }

  return dp[0] >= INF ? -1 : dp[0];
}
