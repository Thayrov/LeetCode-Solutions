/*
3003. Maximize the Number of Partitions After Operations

You are given a string s and an integer k.
First, you are allowed to change at most one index in s to another lowercase English letter.
After that, do the following partitioning operation until s is empty:
Choose the longest prefix of s containing at most k distinct characters.
Delete the prefix from s and increase the number of partitions by one. The remaining characters (if any) in s maintain their initial order.
Return an integer denoting the maximum number of resulting partitions after the operations by optimally choosing at most one index to change.

Example 1:
Input: s = "accca", k = 2
Output: 3
Explanation:
The optimal way is to change s[2] to something other than a and c, for example, b. then it becomes "acbca".
Then we perform the operations:
The longest prefix containing at most 2 distinct characters is "ac", we remove it and s becomes "bca".
Now The longest prefix containing at most 2 distinct characters is "bc", so we remove it and s becomes "a".
Finally, we remove "a" and s becomes empty, so the procedure ends.
Doing the operations, the string is divided into 3 partitions, so the answer is 3.

Example 2:
Input: s = "aabaab", k = 3
Output: 1
Explanation:
Initially s contains 2 distinct characters, so whichever character we change, it will contain at most 3 distinct characters, so the longest prefix with at most 3 distinct characters would always be all of it, therefore the answer is 1.

Example 3:
Input: s = "xxyz", k = 1
Output: 4
Explanation:
The optimal way is to change s[0] or s[1] to something other than characters in s, for example, to change s[0] to w.
Then s becomes "wxyz", which consists of 4 distinct characters, so as k is 1, it will divide into 4 partitions.

Constraints:
1 <= s.length <= 10^4
s consists only of lowercase English letters.
1 <= k <= 26

</> Typescript code:
*/

function maxPartitionsAfterOperations(s: string, k: number): number {
    // Store string length for efficient access
    const n = s.length;
    // Cache for memoization using string keys (more reliable than bit-packing)
    const cache = new Map<string, number>();
    
    // Count number of set bits in a number (Brian Kernighan's algorithm)
    // Efficiently counts how many distinct characters are in our bitmask
    const popcount = (x: number): number => {
        let c = 0;
        // Each iteration removes the lowest set bit
        while (x) { c++; x &= x - 1; }
        return c;
    };
    
    // DP recursive function with memoization
    // i: current position in string (0 to n-1)
    // mask: 26-bit bitmask representing which characters are in current partition
    // canChange: 1 if we can still change a character, 0 if already used our change
    // Returns: total number of partitions from position i to end
    const dp = (i: number, mask: number, canChange: number): number => {
        // Base case: reached end of string
        if (i === n) return mask === 0 ? 0 : 1; // Return 1 if we have an active partition, 0 if empty
        
        // Create string key for memoization (safer than bit manipulation)
        const key = `${i},${mask},${canChange}`;
        if (cache.has(key)) return cache.get(key)!;
        
        // Get bit position for current character (a=bit 0, b=bit 1, ..., z=bit 25)
        const charBit = 1 << (s.charCodeAt(i) - 97);
        // Count how many distinct characters are currently in this partition
        const cnt = popcount(mask);
        let ans = 0;
        
        // Option 1: Keep the original character at position i
        if ((mask & charBit) || cnt < k) {
            // Character is already in partition OR we have room for more distinct chars
            // Add character to current partition and continue
            ans = dp(i + 1, mask | charBit, canChange);
        } else {
            // Adding this character would exceed k distinct characters
            // Close current partition (add 1) and start new partition with this character
            ans = 1 + dp(i + 1, charBit, canChange);
        }
        
        // Option 2: Change character at position i (only if we haven't used our change yet)
        if (canChange) {
            // Try changing to each of the 26 lowercase letters
            for (let c = 0; c < 26; c++) {
                const bit = 1 << c;
                // Skip if it's the same as the original character (not a real change)
                if (bit === charBit) continue;
                
                // Check if new character fits in current partition
                if ((mask & bit) || cnt < k) {
                    // New character already exists in partition OR room for it
                    // Add to current partition, mark change as used (canChange becomes 0)
                    ans = Math.max(ans, dp(i + 1, mask | bit, 0));
                } else {
                    // New character would exceed k distinct chars
                    // Close current partition and start new one, mark change as used
                    ans = Math.max(ans, 1 + dp(i + 1, bit, 0));
                }
            }
        }
        
        // Store computed result in cache for future lookups
        cache.set(key, ans);
        return ans;
    };
    
    // Start recursion from position 0, empty partition (mask=0), change available (1)
    // dp now correctly returns total partition count, no adjustment needed
    return dp(0, 0, 1);
}
