/*
3318. Find X-Sum of All K-Long Subarrays I

You are given an array nums of n integers and two integers k and x.
The x-sum of an array is calculated by the following procedure:
Count the occurrences of all elements in the array.
Keep only the occurrences of the top x most frequent elements. If two elements have the same number of occurrences, the element with the bigger value is considered more frequent.
Calculate the sum of the resulting array.
Note that if an array has less than x distinct elements, its x-sum is the sum of the array.
Return an integer array answer of length n - k + 1 where answer[i] is the x-sum of the subarray nums[i..i + k - 1].

Example 1:
Input: nums = [1,1,2,2,3,4,2,3], k = 6, x = 2
Output: [6,10,12]
Explanation:
For subarray [1, 1, 2, 2, 3, 4], only elements 1 and 2 will be kept in the resulting array. Hence, answer[0] = 1 + 1 + 2 + 2.
For subarray [1, 2, 2, 3, 4, 2], only elements 2 and 4 will be kept in the resulting array. Hence, answer[1] = 2 + 2 + 2 + 4. Note that 4 is kept in the array since it is bigger than 3 and 1 which occur the same number of times.
For subarray [2, 2, 3, 4, 2, 3], only elements 2 and 3 are kept in the resulting array. Hence, answer[2] = 2 + 2 + 2 + 3 + 3.

Example 2:
Input: nums = [3,8,7,8,7,5], k = 2, x = 2
Output: [11,15,15,15,12]
Explanation:
Since k == x, answer[i] is equal to the sum of the subarray nums[i..i + k - 1].

Constraints:
1 <= n == nums.length <= 50
1 <= nums[i] <= 50
1 <= x <= k <= nums.length

</> Typescript code:
*/

function findXSum(nums: number[], k: number, x: number): number[] {
    const n = nums.length;
    // 'answer' will store the x-sum for each k-long subarray.
    const answer: number[] = [];

    // Iterate from the start of the first window (i=0) to the start of the last window (i = n - k).
    // This loop runs (n - k + 1) times.
    for (let i = 0; i <= n - k; i++) {
        // Get the current k-long subarray. .slice() is efficient enough given n <= 50.
        const subarray = nums.slice(i, i + k);
        
        // Use a fixed-size array for frequency counting, which is faster than a Map
        // since we know nums[i] is constrained to [1, 50].
        const freq = new Array(51).fill(0);
        
        // Populate the frequency count for the current subarray.
        for (const val of subarray) {
            freq[val]++;
        }

        // Create a list of [value, count] pairs for all elements that
        // actually exist in the subarray.
        const entries: [number, number][] = [];
        for (let val = 1; val <= 50; val++) {
            if (freq[val] > 0) {
                entries.push([val, freq[val]]);
            }
        }

        // Sort the entries based on the problem's criteria:
        // 1. Higher frequency (count) comes first (descending).
        // 2. If frequencies are equal, the bigger value comes first (descending).
        entries.sort((a, b) => {
            // a = [valA, countA], b = [valB, countB]
            if (a[1] !== b[1]) {
                // Primary sort: by count, descending (b[1] - a[1]).
                return b[1] - a[1];
            }
            // Secondary sort (tie-breaker): by value, descending (b[0] - a[0]).
            return b[0] - a[0];
        });

        // Use a Set for fast O(1) lookups of the *values* of the top x elements.
        const topXValues = new Set<number>();
        
        // Determine how many elements to take: either x or fewer if there
        // are less than x distinct elements.
        const limit = Math.min(entries.length, x);
        
        // Add the *values* of the top x (or fewer) elements to the Set.
        for (let j = 0; j < limit; j++) {
            topXValues.add(entries[j][0]); // entries[j][0] is the value
        }

        // Calculate the final x-sum for this subarray.
        let currentXSum = 0;
        // Iterate through the original subarray one more time.
        for (const val of subarray) {
            // If the value is one of the top x frequent elements, add it to the sum.
            if (topXValues.has(val)) {
                currentXSum += val;
            }
        }
        
        // Add the calculated x-sum for this window to the final answer array.
        answer.push(currentXSum);
    }

    // Return the array of all x-sums.
    return answer;
}
