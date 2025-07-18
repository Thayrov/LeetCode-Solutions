/*
2163. Minimum Difference in Sums After Removal of Elements

You are given a 0-indexed integer array nums consisting of 3 * n elements.
You are allowed to remove any subsequence of elements of size exactly n from nums. The remaining 2 * n elements will be divided into two equal parts:
The first n elements belonging to the first part and their sum is sumfirst.
The next n elements belonging to the second part and their sum is sumsecond.
The difference in sums of the two parts is denoted as sumfirst - sumsecond.
For example, if sumfirst = 3 and sumsecond = 2, their difference is 1.
Similarly, if sumfirst = 2 and sumsecond = 3, their difference is -1.
Return the minimum difference possible between the sums of the two parts after the removal of n elements.

Example 1:
Input: nums = [3,1,2]
Output: -1
Explanation: Here, nums has 3 elements, so n = 1.
Thus we have to remove 1 element from nums and divide the array into two equal parts.
- If we remove nums[0] = 3, the array will be [1,2]. The difference in sums of the two parts will be 1 - 2 = -1.
- If we remove nums[1] = 1, the array will be [3,2]. The difference in sums of the two parts will be 3 - 2 = 1.
- If we remove nums[2] = 2, the array will be [3,1]. The difference in sums of the two parts will be 3 - 1 = 2.
The minimum difference between sums of the two parts is min(-1,1,2) = -1.

Example 2:
Input: nums = [7,9,5,8,1,3]
Output: 1
Explanation: Here n = 2. So we must remove 2 elements and divide the remaining array into two parts containing two elements each.
If we remove nums[2] = 5 and nums[3] = 8, the resultant array will be [7,9,1,3]. The difference in sums will be (7+9) - (1+3) = 12.
To obtain the minimum difference, we should remove nums[1] = 9 and nums[4] = 1. The resultant array becomes [7,5,8,3]. The difference in sums of the two parts is (7+5) - (8+3) = 1.
It can be shown that it is not possible to obtain a difference smaller than 1.

Constraints:
nums.length == 3 * n
1 <= n <= 10^5
1 <= nums[i] <= 10^5
</> Typescript code:
*/

function minimumDifference(nums: number[]): number {
    // Calculate n from the constraint that nums.length == 3 * n
    const n = nums.length / 3;

    // Arrays to store minimum sum for left part and maximum sum for right part
    // minLeft[i] = minimum sum of n elements from first (n + i) elements
    // maxRight[i] = maximum sum of n elements from last (n + (n - i)) elements
    const minLeft = new Array(n + 1);
    const maxRight = new Array(n + 1);

    // MaxHeap to maintain largest n elements (so we can get minimum sum by removing largest)
    const leftHeap = new MaxHeap();
    let leftSum = 0; // Current sum of elements in the heap
    minLeft[0] = 0; // Base case: no elements removed from left, sum is 0

    // Process first 2n elements to calculate minimum sums for left part
    for (let i = 0; i < 2 * n; i++) {
        // Add current element to heap and sum
        leftHeap.insert(nums[i]);
        leftSum += nums[i];

        // If heap has more than n elements, remove the largest (to minimize sum)
        if (leftHeap.size() > n) {
            leftSum -= leftHeap.extract();
        }

        // Store the minimum sum once we have processed at least n elements
        if (i >= n - 1) {
            minLeft[i - n + 1] = leftSum;
        }
    }

    // MinHeap to maintain smallest n elements (so we can get maximum sum by removing smallest)
    const rightHeap = new MinHeap();
    let rightSum = 0; // Current sum of elements in the heap
    maxRight[n] = 0; // Base case: no elements removed from right, sum is 0

    // Process last 2n elements (from right to left) to calculate maximum sums for right part
    for (let i = 3 * n - 1; i >= n; i--) {
        // Add current element to heap and sum
        rightHeap.insert(nums[i]);
        rightSum += nums[i];

        // If heap has more than n elements, remove the smallest (to maximize sum)
        if (rightHeap.size() > n) {
            rightSum -= rightHeap.extract();
        }

        // Store the maximum sum once we have processed at least n elements
        if (i <= 2 * n) {
            maxRight[i - n] = rightSum;
        }
    }

    // Find minimum difference by trying all possible split positions
    let result = Infinity;
    for (let i = 0; i <= n; i++) {
        // minLeft[i] - maxRight[i] gives the difference when removing i elements from left
        // and (n - i) elements from right
        result = Math.min(result, minLeft[i] - maxRight[i]);
    }

    return result;
}

// MaxHeap implementation for efficient extraction of maximum elements
class MaxHeap {
    private heap: number[] = [];

    // Insert element and maintain heap property
    insert(val: number): void {
        this.heap.push(val);
        this.heapifyUp(this.heap.length - 1);
    }

    // Extract maximum element and maintain heap property
    extract(): number {
        if (this.heap.length === 0) return 0;
        const max = this.heap[0];
        const last = this.heap.pop()!;
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.heapifyDown(0);
        }
        return max;
    }

    // Return current size of heap
    size(): number {
        return this.heap.length;
    }

    // Bubble up element to maintain max heap property
    private heapifyUp(idx: number): void {
        while (idx > 0) {
            const parentIdx = Math.floor((idx - 1) / 2);
            if (this.heap[idx] <= this.heap[parentIdx]) break;
            [this.heap[idx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[idx]];
            idx = parentIdx;
        }
    }

    // Bubble down element to maintain max heap property
    private heapifyDown(idx: number): void {
        while (true) {
            let largest = idx;
            const left = 2 * idx + 1;
            const right = 2 * idx + 2;

            if (left < this.heap.length && this.heap[left] > this.heap[largest]) {
                largest = left;
            }
            if (right < this.heap.length && this.heap[right] > this.heap[largest]) {
                largest = right;
            }

            if (largest === idx) break;
            [this.heap[idx], this.heap[largest]] = [this.heap[largest], this.heap[idx]];
            idx = largest;
        }
    }
}

// MinHeap implementation for efficient extraction of minimum elements
class MinHeap {
    private heap: number[] = [];

    // Insert element and maintain heap property
    insert(val: number): void {
        this.heap.push(val);
        this.heapifyUp(this.heap.length - 1);
    }

    // Extract minimum element and maintain heap property
    extract(): number {
        if (this.heap.length === 0) return 0;
        const min = this.heap[0];
        const last = this.heap.pop()!;
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.heapifyDown(0);
        }
        return min;
    }

    // Return current size of heap
    size(): number {
        return this.heap.length;
    }

    // Bubble up element to maintain min heap property
    private heapifyUp(idx: number): void {
        while (idx > 0) {
            const parentIdx = Math.floor((idx - 1) / 2);
            if (this.heap[idx] >= this.heap[parentIdx]) break;
            [this.heap[idx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[idx]];
            idx = parentIdx;
        }
    }

    // Bubble down element to maintain min heap property
    private heapifyDown(idx: number): void {
        while (true) {
            let smallest = idx;
            const left = 2 * idx + 1;
            const right = 2 * idx + 2;

            if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
                smallest = left;
            }
            if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
                smallest = right;
            }

            if (smallest === idx) break;
            [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
            idx = smallest;
        }
    }
}