/*
3445. Maximum Difference Between Even and Odd Frequency II

You are given a string s and an integer k. Your task is to find the maximum difference between the frequency of two characters, freq[a] - freq[b], in a substring subs of s, such that:
subs has a size of at least k.
Character a has an odd frequency in subs.
Character b has an even frequency in subs.
Return the maximum difference.

Note that subs can contain more than 2 distinct characters.

Example 1:
Input: s = "12233", k = 4
Output: -1
Explanation:
For the substring "12233", the frequency of '1' is 1 and the frequency of '3' is 2. The difference is 1 - 2 = -1.

Example 2:
Input: s = "1122211", k = 3
Output: 1
Explanation:
For the substring "11222", the frequency of '2' is 3 and the frequency of '1' is 2. The difference is 3 - 2 = 1.

Example 3:
Input: s = "110", k = 3
Output: -1

Constraints:
3 <= s.length <= 3 * 10^4
s consists only of digits '0' to '4'.
The input is generated that at least one substring has a character with an even frequency and a character with an odd frequency.
1 <= k <= s.length

</> Typescript code:
*/

// A Segment Tree is a data structure that allows for efficient range queries and point updates.
// Here, we use it to find the minimum value in a given range.
class SegmentTree {
  // The array that stores the tree's nodes.
  private tree: number[];
  // The size of the conceptual array the tree is built upon.
  private size: number;
  // A large value representing infinity, used for nodes with no valid minimum.
  private readonly INFINITY = 1e9;

  constructor(n: number) {
    this.size = n;
    // The tree array needs to be up to 4 times the size of the input array.
    this.tree = new Array(4 * n).fill(this.INFINITY);
  }

  // A private recursive function to perform the update.
  private update(
    idx: number,
    val: number,
    x: number,
    lx: number,
    rx: number
  ): void {
    // If we've reached a leaf node, update its value.
    if (rx - lx === 1) {
      this.tree[x] = Math.min(this.tree[x], val); // We store the minimum value seen for this index.
      return;
    }
    // Find the midpoint to decide whether to go left or right.
    const m = Math.floor((lx + rx) / 2);
    if (idx < m) {
      this.update(idx, val, 2 * x + 1, lx, m); // Recurse on the left child.
    } else {
      this.update(idx, val, 2 * x + 2, m, rx); // Recurse on the right child.
    }
    // Update the parent node's value based on its children.
    this.tree[x] = Math.min(this.tree[2 * x + 1], this.tree[2 * x + 2]);
  }

  // Public method to update a value at a specific index.
  public updateVal(idx: number, val: number): void {
    this.update(idx, val, 0, 0, this.size);
  }

  // A private recursive function to query for the minimum in a range [l, r).
  private query(
    l: number,
    r: number,
    x: number,
    lx: number,
    rx: number
  ): number {
    // If the node's range is completely outside the query range, return infinity.
    if (lx >= r || l >= rx) return this.INFINITY;
    // If the node's range is completely inside the query range, return its value.
    if (lx >= l && rx <= r) return this.tree[x];
    // Find the midpoint to query both children.
    const m = Math.floor((lx + rx) / 2);
    const left = this.query(l, r, 2 * x + 1, lx, m);
    const right = this.query(l, r, 2 * x + 2, m, rx);
    // Return the minimum of the results from the children.
    return Math.min(left, right);
  }

  // Public method to query for the minimum in a range [l, r].
  public queryMin(l: number, r: number): number {
    // If the query range is invalid, return infinity.
    if (l > r) return this.INFINITY;
    // The internal query works on an exclusive right bound `r+1`.
    return this.query(l, r + 1, 0, 0, this.size);
  }
}

function maxDifference(s: string, k: number): number {
  const n = s.length;
  // The alphabet of characters present in the string.
  const chars = ["0", "1", "2", "3", "4"];
  // Initialize the maximum difference to a very small number.
  let maxDiff = -Infinity;

  // Iterate over all possible distinct pairs of characters 'a' and 'b'.
  for (const a of chars) {
    for (const b of chars) {
      if (a === b) continue;

      // --- Step 1: Pre-computation of prefix values ---
      const countA = new Array(n + 1).fill(0); // countA[i] = count of 'a' in s[0...i-1]
      const countB = new Array(n + 1).fill(0); // countB[i] = count of 'b' in s[0...i-1]
      const parityA = new Array(n + 1).fill(0); // parityA[i] = countA[i] % 2
      const parityB = new Array(n + 1).fill(0); // parityB[i] = countB[i] % 2
      const diff = new Array(n + 1).fill(0); // diff[i] = countA[i] - countB[i]

      // Calculate the prefix values by iterating through the string.
      for (let i = 0; i < n; ++i) {
        countA[i + 1] = countA[i] + (s[i] === a ? 1 : 0);
        countB[i + 1] = countB[i] + (s[i] === b ? 1 : 0);
        parityA[i + 1] = countA[i + 1] % 2;
        parityB[i + 1] = countB[i + 1] % 2;
        diff[i + 1] = countA[i + 1] - countB[i + 1];
      }

      // --- Step 2: Setup Segment Trees ---
      // We need 4 trees to store the minimum diff[j] for each of the 4 possible parity states (pa, pb).
      const trees: SegmentTree[][] = [
        [new SegmentTree(n + 1), new SegmentTree(n + 1)],
        [new SegmentTree(n + 1), new SegmentTree(n + 1)],
      ];

      // --- Step 3: Iterate and Find Max Difference ---

      // Initialize the trees with the state of an empty prefix (at index j=0).
      // A substring starting at index 0 has an empty prefix before it.
      // parities are 0, countB is 0, diff is 0.
      trees[parityA[0]][parityB[0]].updateVal(countB[0], diff[0]);

      // Iterate through all possible end-points of prefixes. A prefix of length `i` ends at index `i-1`.
      // We only consider substrings of length at least k.
      for (let i = k; i <= n; ++i) {
        // For a substring ending at `i-1` of length `k`, the starting prefix is `i-k`.
        const j = i - k;
        // Update the corresponding segment tree with the state of prefix `j`.
        // This makes `j` available as a potential starting point for future substrings.
        trees[parityA[j]][parityB[j]].updateVal(countB[j], diff[j]);

        // Determine the required parities for the starting prefix `j`.
        // freq(a) odd => (parA[i] - parA[j]) % 2 == 1 => parA[j] != parA[i]
        const targetParityA = 1 - parityA[i];
        // freq(b) even => (parB[i] - parB[j]) % 2 == 0 => parB[j] == parB[i]
        const targetParityB = parityB[i];

        // The frequency of 'b' must be positive and even (>= 2).
        // This means countB[i] - countB[j] >= 2, or countB[j] <= countB[i] - 2.
        if (countB[i] >= 2) {
          // Query the appropriate tree to find the minimum `diff[j]` that satisfies all conditions.
          const minDiffJ = trees[targetParityA][targetParityB].queryMin(
            0,
            countB[i] - 2
          );

          // If a valid starting point `j` was found...
          if (minDiffJ !== 1e9) {
            // Calculate the difference for the current substring and update the global max.
            maxDiff = Math.max(maxDiff, diff[i] - minDiffJ);
          }
        }
      }
    }
  }
  // If no valid substring was ever found, the problem guarantees this won't happen,
  // but as a fallback, we check against -Infinity. The examples suggest -1 for failure cases.
  return maxDiff === -Infinity ? -1 : maxDiff;
}
