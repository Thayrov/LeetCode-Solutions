/*
898. Bitwise ORs of Subarrays

Given an integer array arr, return the number of distinct bitwise ORs of all the non-empty subarrays of arr.
The bitwise OR of a subarray is the bitwise OR of each integer in the subarray. The bitwise OR of a subarray of one integer is that integer.
A subarray is a contiguous non-empty sequence of elements within an array.

Example 1:
Input: arr = [0]
Output: 1
Explanation: There is only one possible result: 0.

Example 2:
Input: arr = [1,1,2]
Output: 3
Explanation: The possible subarrays are [1], [1], [2], [1, 1], [1, 2], [1, 1, 2].
These yield the results 1, 1, 2, 1, 3, 3.
There are 3 unique values, so the answer is 3.

Example 3:
Input: arr = [1,2,4]
Output: 6
Explanation: The possible results are 1, 2, 3, 4, 6, and 7.
 
Constraints:
1 <= arr.length <= 5 * 10^4
0 <= arr[i] <= 10^9

</> Typescript code:
*/

function subarrayBitwiseORs(arr: number[]): number {
    // Set to store all unique bitwise OR values found across all subarrays
    const result = new Set<number>();
    // Set to track unique OR values for subarrays ending at current position
    let current = new Set<number>();
    
    // Process each element in the array
    for (const num of arr) {
        // Create new set starting with current element (single element subarray)
        const next = new Set<number>([num]);
        // For each OR value from previous position, combine with current element
        for (const val of current) {
            // Add the OR of previous subarray value with current element
            next.add(val | num);
        }
        // Update current set to contain all OR values ending at this position
        current = next;
        // Add all OR values ending at current position to global result set
        for (const val of current) {
            result.add(val);
        }
    }
    
    // Return count of unique OR values across all subarrays
    return result.size;
}
