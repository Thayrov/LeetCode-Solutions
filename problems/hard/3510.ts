/*
3510. Minimum Pair Removal to Sort Array II

Given an array nums, you can perform the following operation any number of times:
Select the adjacent pair with the minimum sum in nums. If multiple such pairs exist, choose the leftmost one.
Replace the pair with their sum.
Return the minimum number of operations needed to make the array non-decreasing.
An array is said to be non-decreasing if each element is greater than or equal to its previous element (if it exists).

Example 1:
Input: nums = [5,2,3,1]
Output: 2
Explanation:
The pair (3,1) has the minimum sum of 4. After replacement, nums = [5,2,4].
The pair (2,4) has the minimum sum of 6. After replacement, nums = [5,6].
The array nums became non-decreasing in two operations.

Example 2:
Input: nums = [1,2,2]
Output: 0
Explanation:
The array nums is already sorted.

Constraints:
1 <= nums.length <= 10^5
-10^9 <= nums[i] <= 10^9

</> Typescript code:
*/

// SolutionNode represents an element in the current array state (Doubly Linked List)
class SolutionNode {
    constructor(
        public val: number,
        public id: number, // immutable original index for "leftmost" tie-breaking
        public prev: SolutionNode | null = null,
        public next: SolutionNode | null = null
    ) {}
}

// MinPairHeap manages the greedy choice of pairs
class MinPairHeap {
    heap: { sum: number; node: SolutionNode; version: number }[] = [];

    // Compare function to strictly follow problem rules:
    // 1. Minimum Sum
    // 2. Leftmost Index (using the immutable 'id')
    compare(a: { sum: number; node: SolutionNode }, b: { sum: number; node: SolutionNode }) {
        if (a.sum !== b.sum) {
            return a.sum < b.sum;
        }
        return a.node.id < b.node.id;
    }

    push(item: { sum: number; node: SolutionNode; version: number }) {
        this.heap.push(item);
        this.siftUp();
    }

    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        const top = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.siftDown();
        return top;
    }

    siftUp() {
        let nodeIdx = this.heap.length - 1;
        while (nodeIdx > 0) {
            const parentIdx = (nodeIdx - 1) >> 1;
            if (this.compare(this.heap[nodeIdx], this.heap[parentIdx])) {
                [this.heap[nodeIdx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[nodeIdx]];
                nodeIdx = parentIdx;
            } else {
                break;
            }
        }
    }

    siftDown() {
        let nodeIdx = 0;
        const length = this.heap.length;
        while (true) {
            let leftIdx = 2 * nodeIdx + 1;
            let rightIdx = 2 * nodeIdx + 2;
            let swapIdx = nodeIdx;

            if (leftIdx < length && this.compare(this.heap[leftIdx], this.heap[swapIdx])) {
                swapIdx = leftIdx;
            }
            if (rightIdx < length && this.compare(this.heap[rightIdx], this.heap[swapIdx])) {
                swapIdx = rightIdx;
            }

            if (swapIdx === nodeIdx) break;

            [this.heap[nodeIdx], this.heap[swapIdx]] = [this.heap[swapIdx], this.heap[nodeIdx]];
            nodeIdx = swapIdx;
        }
    }
}

function minimumPairRemoval(nums: number[]): number {
    const n = nums.length;
    if (n < 2) return 0;

    // Map to track active versions of nodes.
    // Used for "lazy deletion" from the heap.
    const nodeVersion = new Map<SolutionNode, number>();
    const head = new SolutionNode(nums[0], 0);
    nodeVersion.set(head, 0);
    
    let curr = head;
    let badPairs = 0; // Tracks number of adjacent inversions (where prev > next)
    const pq = new MinPairHeap();

    // Initialize Linked List and Heap
    for (let i = 1; i < n; i++) {
        const nextNode = new SolutionNode(nums[i], i, curr);
        nodeVersion.set(nextNode, 0);
        curr.next = nextNode;
        if (curr.val > nextNode.val) badPairs++;
        pq.push({ sum: curr.val + nextNode.val, node: curr, version: 0 });
        curr = nextNode;
    }

    let ops = 0;

    // Run until the array is sorted (badPairs == 0)
    while (badPairs > 0) {
        const entry = pq.pop();
        if (!entry) break;

        const left = entry.node;
        
        // Validation:
        // 1. Check if 'left' is still valid (exists in map)
        // 2. Check if 'left' version matches heap entry (ensures no prior modifications)
        if (!nodeVersion.has(left) || entry.version !== nodeVersion.get(left)) continue;
        
        const right = left.next;
        if (!right) continue;

        // Decrement badPairs for all boundaries touching the pair (left, right)
        // because we are about to break/change these connections.
        if (left.prev && left.prev.val > left.val) badPairs--; 
        if (left.val > right.val) badPairs--;                   
        if (right.next && right.val > right.next.val) badPairs--; 

        // Merge Operation
        left.val += right.val;
        left.next = right.next;
        
        // Critical: Remove 'right' from valid nodes.
        // This ensures any stale heap entries starting at 'right' are ignored.
        nodeVersion.delete(right);

        // Update 'left' version to invalidate stale entries starting at 'left'
        const newVer = (nodeVersion.get(left) || 0) + 1;
        nodeVersion.set(left, newVer);

        // Update Right Neighbor Connection
        if (left.next) {
            left.next.prev = left;
            if (left.val > left.next.val) badPairs++;
            pq.push({ sum: left.val + left.next.val, node: left, version: newVer });
        }

        // Update Left Neighbor Connection
        if (left.prev) {
            if (left.prev.val > left.val) badPairs++;
            // We must update 'prev' version because the sum (prev + left) has changed
            const prevVer = (nodeVersion.get(left.prev) || 0) + 1;
            nodeVersion.set(left.prev, prevVer);
            pq.push({ sum: left.prev.val + left.val, node: left.prev, version: prevVer });
        }

        ops++;
    }

    return ops;
}
