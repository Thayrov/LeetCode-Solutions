/*
3074. Apple Redistribution into Boxes

You are given an array apple of size n and an array capacity of size m.
There are n packs where the ith pack contains apple[i] apples. There are m boxes as well, and the ith box has a capacity of capacity[i] apples.
Return the minimum number of boxes you need to select to redistribute these n packs of apples into boxes.

Note that, apples from the same pack can be distributed into different boxes.

Example 1:
Input: apple = [1,3,2], capacity = [4,3,1,5,2]
Output: 2
Explanation: We will use boxes with capacities 4 and 5.
It is possible to distribute the apples as the total capacity is greater than or equal to the total number of apples.

Example 2:
Input: apple = [5,5,5], capacity = [2,4,2,7]
Output: 4
Explanation: We will need to use all the boxes.

Constraints:
1 <= n == apple.length <= 50
1 <= m == capacity.length <= 50
1 <= apple[i], capacity[i] <= 50
The input is generated such that it's possible to redistribute packs of apples into boxes.

</> Typescript code:
*/

function minimumBoxes(apple: number[], capacity: number[]): number {
    // Initialize a counter to store the sum of all apples across all packs
    let totalApples = 0;
    // Iterate through the apple array to calculate the total inventory
    for (let i = 0; i < apple.length; i++) {
        totalApples += apple[i];
    }

    // Sort the capacity array in descending order (highest to lowest) 
    // to apply a greedy approach, picking the largest boxes first
    capacity.sort((a, b) => b - a);

    // Track the count of boxes selected
    let boxesUsed = 0;
    // Continue adding boxes until their combined capacity meets or exceeds totalApples
    while (totalApples > 0) {
        // Subtract the capacity of the current largest available box from the remaining total
        totalApples -= capacity[boxesUsed];
        // Increment the box counter
        boxesUsed++;
    }

    // Return the minimum count of boxes required to fit all apples
    return boxesUsed;
}
