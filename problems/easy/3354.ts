/*
3354. Make Array Elements Equal to Zero

You are given an integer array nums.
Start by selecting a starting position curr such that nums[curr] == 0, and choose a movement direction of either left or right.
After that, you repeat the following process:
If curr is out of the range [0, n - 1], this process ends.
If nums[curr] == 0, move in the current direction by incrementing curr if you are moving right, or decrementing curr if you are moving left.
Else if nums[curr] > 0:
Decrement nums[curr] by 1.
Reverse your movement direction (left becomes right and vice versa).
Take a step in your new direction.
A selection of the initial position curr and movement direction is considered valid if every element in nums becomes 0 by the end of the process.
Return the number of possible valid selections.

Example 1:
Input: nums = [1,0,2,0,3]
Output: 2
Explanation:
The only possible valid selections are the following:
Choose curr = 3, and a movement direction to the left.
[1,0,2,0,3] -> [1,0,2,0,3] -> [1,0,1,0,3] -> [1,0,1,0,3] -> [1,0,1,0,2] -> [1,0,1,0,2] -> [1,0,0,0,2] -> [1,0,0,0,2] -> [1,0,0,0,1] -> [1,0,0,0,1] -> [1,0,0,0,1] -> [1,0,0,0,1] -> [0,0,0,0,1] -> [0,0,0,0,1] -> [0,0,0,0,1] -> [0,0,0,0,1] -> [0,0,0,0,0].
Choose curr = 3, and a movement direction to the right.
[1,0,2,0,3] -> [1,0,2,0,3] -> [1,0,2,0,2] -> [1,0,2,0,2] -> [1,0,1,0,2] -> [1,0,1,0,2] -> [1,0,1,0,1] -> [1,0,1,0,1] -> [1,0,0,0,1] -> [1,0,0,0,1] -> [1,0,0,0,0] -> [1,0,0,0,0] -> [1,0,0,0,0] -> [1,0,0,0,0] -> [0,0,0,0,0].

Example 2:
Input: nums = [2,3,4,0,4,1,0]
Output: 0
Explanation:
There are no possible valid selections.

Constraints:
1 <= nums.length <= 100
0 <= nums[i] <= 100
There is at least one element i where nums[i] == 0.

</> Typescript code:
*/

function countValidSelections(nums: number[]): number {
    // Initialize counter for valid selections
    let count = 0;
    // Store array length for efficiency
    const n = nums.length;
    
    // Iterate through all possible starting positions
    for (let start = 0; start < n; start++) {
        // Only consider positions where the element is 0
        if (nums[start] !== 0) continue;
        
        // Try both directions: -1 for left, 1 for right
        for (let dir = -1; dir <= 1; dir += 2) {
            // Create a copy of the array for this simulation
            const arr = [...nums];
            // Set current position to starting position
            let curr = start;
            // Set initial movement direction
            let direction = dir;
            // Calculate sum of all elements to determine max steps needed
            const sum = arr.reduce((a, b) => a + b, 0);
            // Track steps to detect infinite loops
            let steps = 0;
            // Maximum steps: sum of elements * array length * 2 (for back-and-forth movement)
            const maxSteps = sum * n * 2;
            
            // Continue simulation while within bounds and under step limit
            while (curr >= 0 && curr < n && steps < maxSteps) {
                // If current element is 0, just move in current direction
                if (arr[curr] === 0) {
                    curr += direction;
                } else {
                    // If current element is positive, decrement it
                    arr[curr]--;
                    // Reverse direction
                    direction = -direction;
                    // Move in the new direction
                    curr += direction;
                }
                // Increment step counter
                steps++;
            }
            
            // Check if all elements became 0; if so, this is a valid selection
            if (arr.every(v => v === 0)) count++;
        }
    }
    
    // Return total count of valid selections
    return count;
}
