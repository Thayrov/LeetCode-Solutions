/*
3480. Maximize Subarrays After Removing One Conflicting Pair

You are given an integer n which represents an array nums containing the numbers from 1 to n in order. Additionally, you are given a 2D array conflictingPairs, where conflictingPairs[i] = [a, b] indicates that a and b form a conflicting pair.
Remove exactly one element from conflictingPairs. Afterward, count the number of non-empty subarrays of nums which do not contain both a and b for any remaining conflicting pair [a, b].
Return the maximum number of subarrays possible after removing exactly one conflicting pair.

Example 1:
Input: n = 4, conflictingPairs = [[2,3],[1,4]]
Output: 9
Explanation:
Remove [2, 3] from conflictingPairs. Now, conflictingPairs = [[1, 4]].
There are 9 subarrays in nums where [1, 4] do not appear together. They are [1], [2], [3], [4], [1, 2], [2, 3], [3, 4], [1, 2, 3] and [2, 3, 4].
The maximum number of subarrays we can achieve after removing one element from conflictingPairs is 9.

Example 2:
Input: n = 5, conflictingPairs = [[1,2],[2,5],[3,5]]
Output: 12
Explanation:
Remove [1, 2] from conflictingPairs. Now, conflictingPairs = [[2, 5], [3, 5]].
There are 12 subarrays in nums where [2, 5] and [3, 5] do not appear together.
The maximum number of subarrays we can achieve after removing one element from conflictingPairs is 12.
 
Constraints:
2 <= n <= 10^5
1 <= conflictingPairs.length <= 2 * n
conflictingPairs[i].length == 2
1 <= conflictingPairs[i][j] <= n
conflictingPairs[i][0] != conflictingPairs[i][1]

</> Typescript code:
*/

function maxSubarrays(n: number, conflictingPairs: number[][]): number {
    // Get the number of conflicting pairs.
    const m = conflictingPairs.length;

    // --- 1. Preprocessing ---
    // adj: Maps a number 'a' to a list of its conflicting partners 'b' where a < b.
    const adj = new Map<number, number[]>();
    // pairs_by_b: Maps a number 'b' to a sorted list of its partners 'a'. Used for efficient lookups.
    const pairs_by_b = new Map<number, number[]>();
    // pair_to_idx: Maps a normalized pair string "a,b" to its original index in conflictingPairs.
    const pair_to_idx = new Map<string, number>();

    for (let i = 0; i < m; i++) {
        let [u, v] = conflictingPairs[i];
        // Normalize the pair such that u < v.
        if (u > v) [u, v] = [v, u];
        
        // Populate the adjacency list for the sweep-line algorithm.
        if (!adj.has(u)) adj.set(u, []);
        adj.get(u)!.push(v);

        // Populate the map for looking up pairs by their 'b' value.
        if (!pairs_by_b.has(v)) pairs_by_b.set(v, []);
        pairs_by_b.get(v)!.push(u);

        // Store the original index of the normalized pair.
        pair_to_idx.set(`${u},${v}`, i);
    }

    // Sort the 'a' values for each 'b' to enable binary search later.
    for (const a_list of pairs_by_b.values()) {
        a_list.sort((a, b) => a - b);
    }

    // --- 2. Compute M1 and M2 using a sweep-line approach ---
    // M1[l]: The minimum 'b' over all pairs (a, b) with a >= l. This defines the invalid subarray constraint.
    const M1 = new Array(n + 2).fill(n + 1);
    // M2[l]: The second minimum 'b' over all pairs (a, b) with a >= l. This is the new constraint if the M1 pair is removed.
    const M2 = new Array(n + 2).fill(n + 1);

    // Sweep from l = n down to 1 to compute M1 and M2 for all l.
    for (let l = n; l >= 1; l--) {
        // Carry over the constraints from l+1.
        M1[l] = M1[l + 1];
        M2[l] = M2[l + 1];
        // If there are pairs starting at 'l', update the constraints.
        if (adj.has(l)) {
            for (const b of adj.get(l)!) {
                if (b < M1[l]) {
                    // This 'b' is the new minimum. The old M1 becomes M2.
                    M2[l] = M1[l];
                    M1[l] = b;
                } else if (b < M2[l]) {
                    // This 'b' is the new second minimum.
                    M2[l] = b;
                }
            }
        }
    }

    // --- 3. Calculate Savings for each pair ---
    // savings[i]: The total reduction in invalid subarrays if pair i is removed.
    const savings = new Array(m).fill(0);
    // Iterate through all possible subarray start positions 'l'.
    for (let l = 1; l <= n; l++) {
        const b1 = M1[l];
        // If there's no constraint for this 'l', continue.
        if (b1 > n) continue;

        const as = pairs_by_b.get(b1);
        if (!as) continue;

        // Find how many pairs (a, b1) exist with a >= l.
        // We use binary search (lower_bound) to find the first 'a' in the sorted list 'as' that is >= l.
        let low = 0, high = as.length;
        while (low < high) {
            const mid = low + Math.floor((high - low) / 2);
            if (as[mid] < l) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        const start_idx = low;

        // If exactly one pair is responsible for the M1[l] constraint...
        if (as.length - start_idx === 1) {
            const a = as[start_idx];
            // ...this pair is (a, b1).
            const key = `${a},${b1}`;
            const pairIdx = pair_to_idx.get(key)!;
            // The "saving" or "gain" at this 'l' is the difference between the new and old constraints.
            const gain = M2[l] - b1;
            if (gain > 0) {
                 savings[pairIdx] += gain;
            }
        }
    }
    
    // --- 4. Final Calculation ---
    // S_all: Total number of invalid subarrays with all pairs present.
    let S_all = 0;
    for (let l = 1; l <= n; l++) {
        // For each start 'l', add the number of invalid subarrays, which is (n - r_min + 1).
        S_all += Math.max(0, n - M1[l] + 1);
    }

    // Find the maximum possible savings by removing one pair.
    let max_savings = 0;
    if (m > 0) {
        for (const s of savings) {
            max_savings = Math.max(max_savings, s);
        }
    }

    // The minimum number of invalid subarrays is achieved by removing the pair with maximum savings.
    const min_invalid = S_all - max_savings;
    // The total number of non-empty subarrays in an array of size n.
    const total_subarrays = n * (n + 1) / 2;

    // The maximum valid subarrays is the total minus the minimum invalid.
    return total_subarrays - min_invalid;
}
