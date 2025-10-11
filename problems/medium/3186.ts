/*
3186. Maximum Total Damage With Spell Casting

A magician has various spells.
You are given an array power, where each element represents the damage of a spell. Multiple spells can have the same damage value.
It is a known fact that if a magician decides to cast a spell with a damage of power[i], they cannot cast any spell with a damage of power[i] - 2, power[i] - 1, power[i] + 1, or power[i] + 2.
Each spell can be cast only once.
Return the maximum possible total damage that a magician can cast.

Example 1:
Input: power = [1,1,3,4]
Output: 6
Explanation:
The maximum possible damage of 6 is produced by casting spells 0, 1, 3 with damage 1, 1, 4.

Example 2:
Input: power = [7,1,6,6]
Output: 13
Explanation:
The maximum possible damage of 13 is produced by casting spells 1, 2, 3 with damage 1, 6, 6.

Constraints:
1 <= power.length <= 10^5
1 <= power[i] <= 10^9

</> Typescript code:
*/

function maximumTotalDamage(power: number[]): number {
    // Build frequency map to count occurrences of each unique damage value
    const freq = new Map<number, number>();
    for (const p of power) {
        freq.set(p, (freq.get(p) || 0) + 1);
    }
    
    // Extract and sort unique damage values in ascending order
    const unique = Array.from(freq.keys()).sort((a, b) => a - b);
    const n = unique.length;
    
    // Edge case: no spells available
    if (n === 0) return 0;
    
    // DP array where dp[i] = max damage using spells from unique[0..i]
    const dp = new Array(n);
    // Base case: only the first unique damage value available
    dp[0] = unique[0] * freq.get(unique[0])!;
    
    // Process each unique damage value
    for (let i = 1; i < n; i++) {
        const curr = unique[i];
        // Total damage from taking all spells with current damage value
        const damage = curr * freq.get(curr)!;
        
        // Binary search for rightmost index j where unique[j] <= curr - 3
        // (compatible values are those <= curr-3 since we can't use curr-2, curr-1, curr+1, curr+2)
        let left = 0, right = i - 1, j = -1;
        while (left <= right) {
            const mid = (left + right) >> 1;
            if (unique[mid] <= curr - 3) {
                j = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        // Option 1: Take current damage value and add best result from compatible previous values
        const take = damage + (j >= 0 ? dp[j] : 0);
        // Option 2: Skip current damage value and use best result up to previous index
        const skip = dp[i - 1];
        
        // Store maximum of taking or skipping current value
        dp[i] = Math.max(take, skip);
    }
    
    // Return maximum damage achievable considering all unique values
    return dp[n - 1];
}
