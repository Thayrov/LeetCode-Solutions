/*
1437. Check If All 1's Are at Least Length K Places Away

Given an binary array nums and an integer k, return true if all 1's are at least k places away from each other, otherwise return false.

Example 1:
Input: nums = [1,0,0,0,1,0,0,1], k = 2
Output: true
Explanation: Each of the 1s are at least 2 places away from each other.

Example 2:
Input: nums = [1,0,0,1,0,1], k = 2
Output: false
Explanation: The second 1 and third 1 are only one apart from each other.

Constraints:
1 <= nums.length <= 10^5
0 <= k <= nums.length
nums[i] is 0 or 1

</> Typescript code:
*/

function kLengthApart(nums: number[], k: number): boolean {
    // Initialize lastPos to -k-1 to handle the first 1 correctly
    // This ensures the first 1 found will always pass the distance check
    // since any index i >= 0 will satisfy: i - (-k-1) = i + k + 1 > k
    let lastPos = -k - 1;
    
    // Iterate through the entire array once - O(n) time complexity
    for (let i = 0; i < nums.length; i++) {
        // Check if current element is a 1
        if (nums[i] === 1) {
            // Calculate distance from last 1: distance = i - lastPos - 1
            // We need distance >= k, which is equivalent to i - lastPos > k
            // If i - lastPos <= k, the distance is less than k, so return false immediately
            if (i - lastPos <= k) return false;
            
            // Update lastPos to current position for next comparison
            lastPos = i;
        }
    }
    
    // If we've checked all 1's and none violated the k-distance rule, return true
    return true;
}
