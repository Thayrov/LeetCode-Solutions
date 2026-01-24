/*
1877. Minimize Maximum Pair Sum in Array

The pair sum of a pair (a,b) is equal to a + b. The maximum pair sum is the largest pair sum in a list of pairs.
For example, if we have pairs (1,5), (2,3), and (4,4), the maximum pair sum would be max(1+5, 2+3, 4+4) = max(6, 5, 8) = 8.
Given an array nums of even length n, pair up the elements of nums into n / 2 pairs such that:
Each element of nums is in exactly one pair, and
The maximum pair sum is minimized.
Return the minimized maximum pair sum after optimally pairing up the elements.

Example 1:
Input: nums = [3,5,2,3]
Output: 7
Explanation: The elements can be paired up into pairs (3,3) and (5,2).
The maximum pair sum is max(3+3, 5+2) = max(6, 7) = 7.

Example 2:
Input: nums = [3,5,4,2,4,6]
Output: 8
Explanation: The elements can be paired up into pairs (3,5), (4,4), and (6,2).
The maximum pair sum is max(3+5, 4+4, 6+2) = max(8, 8, 8) = 8.

Constraints:
n == nums.length
2 <= n <= 10^5
n is even.
1 <= nums[i] <= 10^5

</> Typescript code:
*/

function minPairSum(nums: number[]): number {
    // Sort the array in ascending order to allow pairing smallest with largest (O(n log n))
    nums.sort((a, b) => a - b);
    
    // Initialize a variable to track the highest sum encountered among the pairs
    let maxPairSum = 0;
    
    // Cache length for minor performance gain in the loop
    const n = nums.length;
    
    // Iterate only through half the array to form n/2 pairs
    for (let i = 0; i < n / 2; i++) {
        // Calculate the sum of the i-th smallest and the i-th largest elements
        const currentSum = nums[i] + nums[n - 1 - i];
        
        // Update maxPairSum if the current pair's sum is greater (faster than Math.max)
        if (currentSum > maxPairSum) {
            maxPairSum = currentSum;
        }
    }
    
    // Return the lowest possible maximum pair sum found through optimal pairing
    return maxPairSum;
}
