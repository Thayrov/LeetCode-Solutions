/*
3479. Fruits Into Baskets III

You are given two arrays of integers, fruits and baskets, each of length n, where fruits[i] represents the quantity of the ith type of fruit, and baskets[j] represents the capacity of the jth basket.
From left to right, place the fruits according to these rules:
Each fruit type must be placed in the leftmost available basket with a capacity greater than or equal to the quantity of that fruit type.
Each basket can hold only one type of fruit.
If a fruit type cannot be placed in any basket, it remains unplaced.
Return the number of fruit types that remain unplaced after all possible allocations are made.

Example 1:
Input: fruits = [4,2,5], baskets = [3,5,4]
Output: 1
Explanation:
fruits[0] = 4 is placed in baskets[1] = 5.
fruits[1] = 2 is placed in baskets[0] = 3.
fruits[2] = 5 cannot be placed in baskets[2] = 4.
Since one fruit type remains unplaced, we return 1.

Example 2:
Input: fruits = [3,6,1], baskets = [6,4,7]
Output: 0
Explanation:
fruits[0] = 3 is placed in baskets[0] = 6.
fruits[1] = 6 cannot be placed in baskets[1] = 4 (insufficient capacity) but can be placed in the next available basket, baskets[2] = 7.
fruits[2] = 1 is placed in baskets[1] = 4.
Since all fruits are successfully placed, we return 0.

Constraints:
n == fruits.length == baskets.length
1 <= n <= 10^5
1 <= fruits[i], baskets[i] <= 10^9

</> Typescript code:
*/

function numOfUnplacedFruits(fruits: number[], baskets: number[]): number {
    // Get the number of baskets/fruits (they have equal length)
    const n = baskets.length;
    // Create segment tree array with size 4*n to handle all possible nodes
    const segmentTree = new Array(4 * n).fill(0);
    
    // Build the segment tree: each node stores the maximum capacity in its range
    function build(node: number, start: number, end: number): void {
        if (start === end) {
            // Leaf node: store the basket capacity directly
            segmentTree[node] = baskets[start];
        } else {
            // Internal node: recursively build left and right subtrees
            const mid = Math.floor((start + end) / 2);
            build(2 * node, start, mid);           // Build left child
            build(2 * node + 1, mid + 1, end);    // Build right child
            // Store maximum capacity of both children in current node
            segmentTree[node] = Math.max(segmentTree[2 * node], segmentTree[2 * node + 1]);
        }
    }
    
    // Query to find the leftmost basket with capacity >= required capacity
    function query(node: number, start: number, end: number, capacity: number): number {
        // If maximum capacity in this range is less than required, no suitable basket exists
        if (segmentTree[node] < capacity) {
            return -1;
        }
        
        // If this is a leaf node and it has sufficient capacity, return its index
        if (start === end) {
            return start;
        }
        
        // Search in left subtree first (to find leftmost basket)
        const mid = Math.floor((start + end) / 2);
        const leftResult = query(2 * node, start, mid, capacity);
        if (leftResult !== -1) {
            // Found suitable basket in left subtree, return it (leftmost)
            return leftResult;
        }
        // No suitable basket in left subtree, search in right subtree
        return query(2 * node + 1, mid + 1, end, capacity);
    }
    
    // Update segment tree after using a basket (set its capacity to 0)
    function update(node: number, start: number, end: number, idx: number): void {
        if (start === end) {
            // Leaf node: mark this basket as used by setting capacity to 0
            segmentTree[node] = 0;
        } else {
            // Internal node: update the appropriate child
            const mid = Math.floor((start + end) / 2);
            if (idx <= mid) {
                update(2 * node, start, mid, idx);      // Update left child
            } else {
                update(2 * node + 1, mid + 1, end, idx); // Update right child
            }
            // Update current node with new maximum of both children
            segmentTree[node] = Math.max(segmentTree[2 * node], segmentTree[2 * node + 1]);
        }
    }
    
    // Build the initial segment tree with all basket capacities
    build(1, 0, n - 1);
    
    // Counter for unplaced fruits
    let unplacedCount = 0;
    
    // Process each fruit in order
    for (const fruit of fruits) {
        // Find the leftmost available basket that can hold this fruit
        const basketIndex = query(1, 0, n - 1, fruit);
        if (basketIndex === -1) {
            // No suitable basket found, increment unplaced count
            unplacedCount++;
        } else {
            // Found suitable basket, mark it as used
            update(1, 0, n - 1, basketIndex);
        }
    }
    
    // Return total number of unplaced fruits
    return unplacedCount;
};