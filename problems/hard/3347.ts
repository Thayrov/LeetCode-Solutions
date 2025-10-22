/*
3347. Maximum Frequency of an Element After Performing Operations II

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
Adding 0 to nums[1], after which nums becomes [1, 4, 5].
Adding -1 to nums[2], after which nums becomes [1, 4, 4].

Example 2:
Input: nums = [5,11,20,20], k = 5, numOperations = 1
Output: 2
Explanation:
We can achieve a maximum frequency of two by:
Adding 0 to nums[1].

Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^9
0 <= k <= 10^9
0 <= numOperations <= nums.length

</> Typescript code:
*/

function maxFrequency(nums: number[], k: number, numOperations: number): number {
    // Store the length of the input array for reference
    const n = nums.length;
    
    // Create a frequency map to count occurrences of each unique number in nums
    const freq = new Map<number, number>();
    
    // Populate the frequency map by iterating through all numbers
    for (const num of nums) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }
    
    // Create a sorted copy of nums for efficient binary search operations
    const sorted = [...nums].sort((a, b) => a - b);
    
    // Create a set to store all potential target values we should consider
    const uniqueTargets = new Set<number>();
    
    // For each number in nums, add three potential targets:
    // 1. The number itself (no modification needed)
    // 2. The number minus k (lower bound of reachable range)
    // 3. The number plus k (upper bound of reachable range)
    for (const num of nums) {
        uniqueTargets.add(num);
        uniqueTargets.add(num - k);
        uniqueTargets.add(num + k);
    }
    
    // Initialize the maximum frequency we can achieve
    let maxFreq = 0;
    
    // Iterate through each potential target value
    for (const target of uniqueTargets) {
        // Count how many elements are already equal to the target (no operation needed)
        const alreadyAtTarget = freq.get(target) || 0;
        
        // Calculate the range of values that can be modified to reach the target
        const rangeStart = target - k;
        const rangeEnd = target + k;
        
        // Find the index of the first element >= rangeStart using binary search
        let left = lowerBound(sorted, rangeStart);
        
        // Find the index of the first element > rangeEnd using binary search
        let right = upperBound(sorted, rangeEnd);
        
        // Calculate total elements within the modifiable range [target-k, target+k]
        const inRange = right - left;
        
        // Calculate how many elements can be modified (excluding those already at target)
        const canModify = inRange - alreadyAtTarget;
        
        // Calculate total possible frequency: elements already at target + modified elements
        // Limited by the number of operations we can perform
        const totalPossible = alreadyAtTarget + Math.min(canModify, numOperations);
        
        // Update the maximum frequency if current target yields a better result
        maxFreq = Math.max(maxFreq, totalPossible);
    }
    
    // Return the maximum frequency achievable
    return maxFreq;
}

// Binary search helper: finds the first index where arr[index] >= target
function lowerBound(arr: number[], target: number): number {
    // Initialize search range [left, right)
    let left = 0, right = arr.length;
    
    // Continue binary search while range is non-empty
    while (left < right) {
        // Calculate middle index using unsigned right shift to avoid overflow
        const mid = (left + right) >>> 1;
        
        // If middle element is less than target, search right half
        if (arr[mid] < target) left = mid + 1;
        // Otherwise, search left half (including mid)
        else right = mid;
    }
    
    // Return the first index where arr[index] >= target
    return left;
}

// Binary search helper: finds the first index where arr[index] > target
function upperBound(arr: number[], target: number): number {
    // Initialize search range [left, right)
    let left = 0, right = arr.length;
    
    // Continue binary search while range is non-empty
    while (left < right) {
        // Calculate middle index using unsigned right shift to avoid overflow
        const mid = (left + right) >>> 1;
        
        // If middle element is <= target, search right half
        if (arr[mid] <= target) left = mid + 1;
        // Otherwise, search left half (including mid)
        else right = mid;
    }
    
    // Return the first index where arr[index] > target
    return left;
}
