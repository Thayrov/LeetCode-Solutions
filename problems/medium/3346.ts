/*
3346. Maximum Frequency of an Element After Performing Operations I

You are given an integer array nums and two integers k and numOperations.
You must perform an operation numOperations times on nums, where in each operation you:
Select an index i that was not selected in any previous operations.
Add an integer in the range [-k, k] to nums[i].
Return the maximum possible frequency of any element in nums after performing the operations.

Example 1:
Input: nums = [1,4,5], k = 1, numOperations = 2
Output: 2
Explanation:
We can achieve a maximum frequency of two by:
Adding 0 to nums[1]. nums becomes [1, 4, 5].
Adding -1 to nums[2]. nums becomes [1, 4, 4].

Example 2:
Input: nums = [5,11,20,20], k = 5, numOperations = 1
Output: 2
Explanation:
We can achieve a maximum frequency of two by:
Adding 0 to nums[1].

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^5
0 <= k <= 10^5
0 <= numOperations <= nums.length

</> Typescript code:
*/

function maxFrequency(nums: number[], k: number, numOperations: number): number {
    // Store array length for reference
    const n = nums.length;
    
    // Create sorted copy to enable binary search for range queries in O(log n)
    const sorted = [...nums].sort((a, b) => a - b);
    
    // Map to store original frequency of each distinct number
    const freq = new Map<number, number>();
    
    // Build frequency map of original values in the array
    for (const num of nums) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }
    
    // Initialize max frequency (removed premature optimization)
    let maxFreq = 0;
    
    // Create set of all candidate target values
    // For each number, we add three candidates: the number itself, num-k, and num+k
    // These represent all potentially optimal targets
    const candidates = new Set<number>();
    for (const num of nums) {
        candidates.add(num); // Original value (no change needed for this element)
        candidates.add(num - k); // Minimum reachable value from this element
        candidates.add(num + k); // Maximum reachable value from this element
    }
    
    // For each candidate target value
    for (const target of candidates) {
        // Use binary search to find count of elements in range [target-k, target+k]
        // lowerBound returns index of first element >= target-k
        const left = lowerBound(sorted, target - k);
        // upperBound returns index after last element <= target+k
        const right = upperBound(sorted, target + k);
        
        // Total count of elements that can be transformed to target value
        const inRange = right - left;
        
        // Count of elements already equal to target (no operation needed)
        const original = freq.get(target) || 0;
        
        // Count of elements that need modification to become target
        const canModify = inRange - original;
        
        // Maximum frequency for this target = original + modified elements
        // Limited by the number of operations we're allowed to perform
        maxFreq = Math.max(maxFreq, original + Math.min(canModify, numOperations));
    }
    
    // Return the maximum achievable frequency across all candidate targets
    return maxFreq;
}

// Binary search helper: finds first index where arr[i] >= target
function lowerBound(arr: number[], target: number): number {
    let left = 0, right = arr.length;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] < target) left = mid + 1;
        else right = mid;
    }
    return left;
}

// Binary search helper: finds first index where arr[i] > target
function upperBound(arr: number[], target: number): number {
    let left = 0, right = arr.length;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] <= target) left = mid + 1;
        else right = mid;
    }
    return left;
}
