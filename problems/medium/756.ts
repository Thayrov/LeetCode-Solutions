/*
756. Pyramid Transition Matrix

You are stacking blocks to form a pyramid. Each block has a color, which is represented by a single letter. Each row of blocks contains one less block than the row beneath it and is centered on top.
To make the pyramid aesthetically pleasing, there are only specific triangular patterns that are allowed. A triangular pattern consists of a single block stacked on top of two blocks. The patterns are given as a list of three-letter strings allowed, where the first two characters of a pattern represent the left and right bottom blocks respectively, and the third character is the top block.
For example, "ABC" represents a triangular pattern with a 'C' block stacked on top of an 'A' (left) and 'B' (right) block. Note that this is different from "BAC" where 'B' is on the left bottom and 'A' is on the right bottom.
You start with a bottom row of blocks bottom, given as a single string, that you must use as the base of the pyramid.
Given bottom and allowed, return true if you can build the pyramid all the way to the top such that every triangular pattern in the pyramid is in allowed, or false otherwise.

Example 1:
Input: bottom = "BCD", allowed = ["BCC","CDE","CEA","FFF"]
Output: true
Explanation: The allowed triangular patterns are shown on the right.
Starting from the bottom (level 3), we can build "CE" on level 2 and then build "A" on level 1.
There are three triangular patterns in the pyramid, which are "BCC", "CDE", and "CEA". All are allowed.

Example 2:
Input: bottom = "AAAA", allowed = ["AAB","AAC","BCD","BBE","DEF"]
Output: false
Explanation: The allowed triangular patterns are shown on the right.
Starting from the bottom (level 4), there are multiple ways to build level 3, but trying all the possibilites, you will get always stuck before building level 1.

Constraints:
2 <= bottom.length <= 6
0 <= allowed.length <= 2^16
allowed[i].length == 3
The letters in all input strings are from the set {'A', 'B', 'C', 'D', 'E', 'F'}.
All the values of allowed are unique.

</> Typescript code:
*/

function pyramidTransition(commentedBottom: string, commentedAllowed: string[]): boolean {
    // Pre-process the allowed patterns into a Map for O(1) lookup of top block options
    const transitions = new Map<string, string[]>();
    for (const pattern of commentedAllowed) {
        const base = pattern[0] + pattern[1];
        if (!transitions.has(base)) transitions.set(base, []);
        transitions.get(base)!.push(pattern[2]);
    }

    // Memoization set to track 'next row' configurations that have already failed
    const failedStates = new Set<string>();

    // Recursive function: 'curr' is the current row, 'next' is the row being built above it
    function backtrack(curr: string, next: string): boolean {
        // Base case: If the current row length is 1, we've reached the pyramid peak
        if (curr.length === 1) return true;

        // If 'next' row construction is finished for this level, move to the next level
        if (next.length === curr.length - 1) {
            // If we've seen this row configuration before and it failed, stop early
            if (failedStates.has(next)) return false;
            const possible = backtrack(next, "");
            // If this configuration doesn't lead to a solution, cache it
            if (!possible) failedStates.add(next);
            return possible;
        }

        // Determine the two blocks in the current row to build the next block upon
        const i = next.length;
        const pair = curr[i] + curr[i + 1];
        const candidates = transitions.get(pair) || [];

        // Try every allowed block that can sit on top of the current pair
        for (const char of candidates) {
            // Recursive call to build the rest of the 'next' row
            if (backtrack(curr, next + char)) return true;
        }

        return false;
    }

    // Kick off the recursion starting from the bottom row
    return backtrack(commentedBottom, "");
}
