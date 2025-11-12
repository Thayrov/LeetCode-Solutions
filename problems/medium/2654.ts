/*
2654. Minimum Number of Operations to Make All Array Elements Equal to 1

You are given a 0-indexed array nums consisiting of positive integers. You can do the following operation on the array any number of times:
Select an index i such that 0 <= i < n - 1 and replace either of nums[i] or nums[i+1] with their gcd value.
Return the minimum number of operations to make all elements of nums equal to 1. If it is impossible, return -1.
The gcd of two integers is the greatest common divisor of the two integers.

Example 1:
Input: nums = [2,6,3,4]
Output: 4
Explanation: We can do the following operations:
- Choose index i = 2 and replace nums[2] with gcd(3,4) = 1. Now we have nums = [2,6,1,4].
- Choose index i = 1 and replace nums[1] with gcd(6,1) = 1. Now we have nums = [2,1,1,4].
- Choose index i = 0 and replace nums[0] with gcd(2,1) = 1. Now we have nums = [1,1,1,4].
- Choose index i = 2 and replace nums[3] with gcd(1,4) = 1. Now we have nums = [1,1,1,1].

Example 2:
Input: nums = [2,10,6,14]
Output: -1
Explanation: It can be shown that it is impossible to make all the elements equal to 1.

Constraints:
2 <= nums.length <= 50
1 <= nums[i] <= 10^6

</> Typescript code:
*/

function minOperations(nums: number[]): number {
    // Helper function to calculate greatest common divisor using Euclidean algorithm
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    
    // Store the length of the array for repeated use
    const n = nums.length;
    
    // Count how many 1s already exist in the array
    let onesCount = 0;
    
    // Iterate through array to count existing 1s
    for (let i = 0; i < n; i++) {
        if (nums[i] === 1) onesCount++;
    }
    
    // If we already have 1s, we just need to propagate them to all positions
    // Each 1 can convert its neighbors, so we need (n - onesCount) operations
    if (onesCount > 0) return n - onesCount;
    
    // Calculate GCD of all elements to check if it's possible to create a 1
    let overallGcd = nums[0];
    for (let i = 1; i < n; i++) {
        overallGcd = gcd(overallGcd, nums[i]);
    }
    
    // If the GCD of all elements is > 1, we can never create a 1
    if (overallGcd > 1) return -1;
    
    // Initialize minimum operations needed to create first 1 to worst case (entire array length)
    let minOps = n;
    
    // Try every possible starting position for a subarray
    for (let i = 0; i < n; i++) {
        // Initialize current GCD with first element of subarray
        let currentGcd = nums[i];
        
        // Extend subarray and calculate running GCD
        for (let j = i + 1; j < n; j++) {
            // Update GCD with next element
            currentGcd = gcd(currentGcd, nums[j]);
            
            // If we found a subarray with GCD = 1
            if (currentGcd === 1) {
                // Update minimum: (j - i) is the length - 1, which equals operations needed
                minOps = Math.min(minOps, j - i);
                // No need to extend this subarray further
                break;
            }
        }
    }
    
    // Total operations = operations to create first 1 + operations to propagate it to all elements
    // To propagate one 1 to n elements, we need (n - 1) operations
    return minOps + n - 1;
}
