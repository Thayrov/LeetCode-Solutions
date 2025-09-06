/*
3495. Minimum Operations to Make Array Elements Zero

You are given a 2D array queries, where queries[i] is of the form [l, r]. Each queries[i] defines an array of integers nums consisting of elements ranging from l to r, both inclusive.
In one operation, you can:
Select two integers a and b from the array.
Replace them with floor(a / 4) and floor(b / 4).
Your task is to determine the minimum number of operations required to reduce all elements of the array to zero for each query. Return the sum of the results for all queries.

Example 1:
Input: queries = [[1,2],[2,4]]
Output: 3
Explanation:
For queries[0]:
The initial array is nums = [1, 2].
In the first operation, select nums[0] and nums[1]. The array becomes [0, 0].
The minimum number of operations required is 1.
For queries[1]:
The initial array is nums = [2, 3, 4].
In the first operation, select nums[0] and nums[2]. The array becomes [0, 3, 1].
In the second operation, select nums[1] and nums[2]. The array becomes [0, 0, 0].
The minimum number of operations required is 2.
The output is 1 + 2 = 3.

Example 2:
Input: queries = [[2,6]]
Output: 4
Explanation:
For queries[0]:
The initial array is nums = [2, 3, 4, 5, 6].
In the first operation, select nums[0] and nums[3]. The array becomes [0, 3, 4, 1, 6].
In the second operation, select nums[2] and nums[4]. The array becomes [0, 3, 1, 1, 1].
In the third operation, select nums[1] and nums[2]. The array becomes [0, 0, 0, 1, 1].
In the fourth operation, select nums[3] and nums[4]. The array becomes [0, 0, 0, 0, 0].
The minimum number of operations required is 4.
The output is 4.

Constraints:
1 <= queries.length <= 10^5
queries[i].length == 2
queries[i] == [l, r]
1 <= l < r <= 10^9

</> Typescript code:
*/

function minOperations(queries: number[][]): number {
    // Calculate sum of costs for range [l, r] using mathematical pattern
    const getRangeSum = (l: number, r: number): number => {
        let totalCost = 0; // Initialize total cost for the range
        let cost = 1; // Current cost level (numbers needing 'cost' operations)
        let start = 1; // Start of current cost level range
        
        // Process each cost level until we exceed the right boundary
        while (start <= r) {
            // End of current cost level: 4^cost - 1 (using bit shift: 1 << (2*cost) = 4^cost)
            const end = Math.min(r, (1 << (2 * cost)) - 1);
            
            // If this cost level overlaps with our query range [l, r]
            if (end >= l) {
                const rangeStart = Math.max(l, start); // Effective start within [l, r]
                const rangeEnd = end; // Effective end within [l, r]
                const count = rangeEnd - rangeStart + 1; // Count of numbers in this cost level
                totalCost += count * cost; // Add contribution of this cost level
            }
            
            // Move to next cost level: start becomes 4^cost
            start = (1 << (2 * cost));
            cost++; // Increment cost for next level
        }
        
        return totalCost; // Return total cost for range [l, r]
    };
    
    let totalResult = 0; // Initialize sum of results for all queries
    
    // Process each query [l, r]
    for (const [l, r] of queries) {
        const totalCost = getRangeSum(l, r); // Calculate total cost for this range
        // Since each operation processes 2 numbers, use ceiling division
        totalResult += Math.floor((totalCost + 1) / 2);
    }
    
    return totalResult; // Return sum of minimum operations for all queries
}
