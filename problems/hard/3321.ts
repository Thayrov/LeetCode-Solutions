/*
3321. Find X-Sum of All K-Long Subarrays II

You are given an array nums of n integers and two integers k and x.
The x-sum of an array is calculated by the following procedure:
Count the occurrences of all elements in the array.
Keep only the occurrences of the top x most frequent elements. If two elements have the same number of occurrences, the element with the bigger value is considered more frequent.
Calculate the sum of the resulting array.
Note that if an array has less than x distinct elements, its x-sum is the sum of the array.
Return an integer array answer of length n - k + 1 where answer[i] is the x-sum of the subarray nums[i..i + k - 1].

Example 1:
Input: nums = [1,1,2,2,3,4,2,3], k = 6, x = 2
Output: [6,10,12]
Explanation:
For subarray [1, 1, 2, 2, 3, 4], only elements 1 and 2 will be kept in the resulting array. Hence, answer[0] = 1 + 1 + 2 + 2.
For subarray [1, 2, 2, 3, 4, 2], only elements 2 and 4 will be kept in the resulting array. Hence, answer[1] = 2 + 2 + 2 + 4. Note that 4 is kept in the array since it is bigger than 3 and 1 which occur the same number of times.
For subarray [2, 2, 3, 4, 2, 3], only elements 2 and 3 are kept in the resulting array. Hence, answer[2] = 2 + 2 + 2 + 3 + 3.

Example 2:
Input: nums = [3,8,7,8,7,5], k = 2, x = 2
Output: [11,15,15,15,12]
Explanation:
Since k == x, answer[i] is equal to the sum of the subarray nums[i..i + k - 1].

Constraints:
nums.length == n
1 <= n <= 10^5
1 <= nums[i] <= 10^9
1 <= x <= k <= nums.length

</> Typescript code:
*/

function findXSum(nums: number[], k: number, x: number): number[] {
    // Custom heap implementation for efficient min/max operations
    class Heap {
        // Store tuples of [value, frequency, unique_id]
        private data: [number, number, number][] = [];
        // isMax: true for max-heap, false for min-heap
        constructor(private isMax: boolean) {}
        
        // Add element to heap with O(log n) complexity
        push(val: number, freq: number, id: number) {
            this.data.push([val, freq, id]);
            this.bubbleUp(this.data.length - 1);
        }
        
        // Remove and return top element with O(log n) complexity
        // Returns undefined if heap is empty
        pop(): [number, number, number] | undefined {
            if (this.data.length === 0) return undefined;
            const result = this.data[0];
            const last = this.data.pop()!;
            if (this.data.length > 0) {
                this.data[0] = last;
                this.bubbleDown(0);
            }
            return result;
        }
        
        // Get top element without removing it
        peek(): [number, number, number] | undefined {
            return this.data[0];
        }
        
        // Return current heap size
        size(): number {
            return this.data.length;
        }
        
        // Compare two elements: first by frequency, then by value
        // Returns true if 'a' should be higher priority than 'b'
        private compare(a: [number, number, number], b: [number, number, number]): boolean {
            // If frequencies differ, compare by frequency
            if (a[1] !== b[1]) return this.isMax ? a[1] > b[1] : a[1] < b[1];
            // If frequencies same, compare by value (higher value is considered more frequent)
            return this.isMax ? a[0] > b[0] : a[0] < b[0];
        }
        
        // Move element up the heap to maintain heap property after insertion
        private bubbleUp(idx: number) {
            while (idx > 0) {
                const parent = (idx - 1) >> 1; // Bit shift for fast division by 2
                if (!this.compare(this.data[idx], this.data[parent])) break;
                [this.data[idx], this.data[parent]] = [this.data[parent], this.data[idx]];
                idx = parent;
            }
        }
        
        // Move element down the heap to maintain heap property after deletion
        private bubbleDown(idx: number) {
            const len = this.data.length;
            while (true) {
                let best = idx;
                const left = (idx << 1) + 1;  // Bit shift for fast multiplication by 2
                const right = left + 1;
                // Find the best candidate among current node and its children
                if (left < len && this.compare(this.data[left], this.data[best])) best = left;
                if (right < len && this.compare(this.data[right], this.data[best])) best = right;
                // If current node is already in correct position, stop
                if (best === idx) break;
                [this.data[idx], this.data[best]] = [this.data[best], this.data[idx]];
                idx = best;
            }
        }
    }
    
    // Length of input array
    const n = nums.length;
    // Result array to store x-sum for each subarray
    const result: number[] = [];
    // Map to track current frequency of each element in the window
    const freq = new Map<number, number>();
    // Min-heap for top x elements (min at top, so we can quickly find smallest to replace)
    const topHeap = new Heap(false);
    // Max-heap for rest elements (max at top, so we can quickly find largest candidate for top)
    const restHeap = new Heap(true);
    // Set tracking which elements are currently in the top x
    const inTop = new Set<number>();
    // Set of deleted heap entry IDs (for lazy deletion - we mark as deleted instead of searching in heap)
    const deleted = new Set<number>();
    // Sum of (value * frequency) for all elements in top x
    let topSum = 0;
    // Counter for unique IDs to distinguish different heap entries of the same value
    let idCounter = 0;
    
    // Remove stale/invalid entries from top of heap
    // isTop indicates whether this heap contains top elements or rest elements
    const cleanHeap = (heap: Heap, isTop: boolean) => {
        while (heap.size() > 0) {
            const entry = heap.peek();
            if (!entry) break;
            const [val, f, id] = entry;
            const currentFreq = freq.get(val);
            // Remove entry if:
            // 1. It's marked as deleted
            // 2. Frequency has changed since entry was added
            // 3. Element should be in top but heap is for rest (or vice versa)
            if (deleted.has(id) || currentFreq !== f || (isTop && !inTop.has(val)) || (!isTop && inTop.has(val))) {
                heap.pop();
            } else break; // Top entry is valid, stop cleaning
        }
    };
    
    // Ensure top x elements are correctly maintained
    // Moves elements between topHeap and restHeap as needed
    const rebalance = () => {
        // Phase 1: Fill topHeap to x elements if possible
        while (inTop.size < x) {
            // Clean restHeap to ensure we get valid entries
            cleanHeap(restHeap, false);
            if (restHeap.size() === 0) break; // No more elements available
            const entry = restHeap.pop();
            if (!entry) break;
            const [val, f, id] = entry;
            // Verify entry is still valid and not already in top
            if (!deleted.has(id) && freq.get(val) === f && !inTop.has(val)) {
                // Move element to top
                inTop.add(val);
                topSum += val * f;
                topHeap.push(val, f, id);
            }
        }
        
        // Phase 2: Swap elements if restHeap has better candidates than topHeap
        while (true) {
            // Clean both heaps to ensure we're comparing valid entries
            cleanHeap(topHeap, true);
            cleanHeap(restHeap, false);
            
            // Stop if either heap is empty
            if (topHeap.size() === 0 || restHeap.size() === 0) break;
            
            const topEntry = topHeap.peek();
            const restEntry = restHeap.peek();
            if (!topEntry || !restEntry) break;
            
            const [minVal, minF, minId] = topEntry; // Smallest element in top x
            const [maxVal, maxF, maxId] = restEntry; // Largest element in rest
            
            // Check if rest element is "better" than top element
            // Better means: higher frequency, or same frequency but higher value
            if (maxF > minF || (maxF === minF && maxVal > minVal)) {
                // Perform the swap
                topHeap.pop();
                restHeap.pop();
                // Mark old entries as deleted for lazy deletion
                deleted.add(minId);
                deleted.add(maxId);
                // Update topSum by removing minVal contribution and adding maxVal contribution
                topSum -= minVal * minF;
                topSum += maxVal * maxF;
                // Update which elements are in top
                inTop.delete(minVal);
                inTop.add(maxVal);
                // Generate new unique IDs for the swapped elements
                const newMinId = idCounter++;
                const newMaxId = idCounter++;
                // Add swapped elements back to their new heaps with new IDs
                restHeap.push(minVal, minF, newMinId);
                topHeap.push(maxVal, maxF, newMaxId);
            } else {
                // No more beneficial swaps possible
                break;
            }
        }
    };
    
    // Add a value to the current sliding window
    const add = (val: number) => {
        // Get the old frequency (0 if element is new)
        const oldFreq = freq.get(val) || 0;
        // Check if this element is currently in top x
        const wasInTop = inTop.has(val);
        
        // If element was in top, subtract its old contribution from topSum
        if (wasInTop) {
            topSum -= val * oldFreq;
            inTop.delete(val);
        }
        
        // Increment frequency in the frequency map
        freq.set(val, oldFreq + 1);
        // Generate new unique ID for this heap entry
        const newId = idCounter++;
        
        // Add element back with updated frequency
        if (wasInTop) {
            // If it was in top, add back to top with new frequency
            topSum += val * (oldFreq + 1);
            inTop.add(val);
            topHeap.push(val, oldFreq + 1, newId);
        } else {
            // If it was in rest (or new), add to rest
            restHeap.push(val, oldFreq + 1, newId);
        }
        
        // Rebalance to ensure correct top x elements
        rebalance();
    };
    
    // Remove a value from the current sliding window
    const remove = (val: number) => {
        // Get current frequency
        const oldFreq = freq.get(val)!;
        // Check if element is in top x
        const wasInTop = inTop.has(val);
        
        // If element was in top, subtract its contribution from topSum
        if (wasInTop) {
            topSum -= val * oldFreq;
            inTop.delete(val);
        }
        
        // If frequency becomes 0, remove element completely
        if (oldFreq === 1) {
            freq.delete(val);
        } else {
            // Decrement frequency and add back to appropriate heap
            freq.set(val, oldFreq - 1);
            // Generate new unique ID for this heap entry
            const newId = idCounter++;
            if (wasInTop) {
                // If it was in top, add back to top with new frequency
                topSum += val * (oldFreq - 1);
                inTop.add(val);
                topHeap.push(val, oldFreq - 1, newId);
            } else {
                // If it was in rest, add back to rest with new frequency
                restHeap.push(val, oldFreq - 1, newId);
            }
        }
        
        // Rebalance to ensure correct top x elements
        rebalance();
    };
    
    // Build the initial window of size k
    for (let i = 0; i < k; i++) add(nums[i]);
    // Store the x-sum of the first window
    result.push(topSum);
    
    // Slide the window across the array
    for (let i = k; i < n; i++) {
        // Remove the leftmost element of the previous window
        remove(nums[i - k]);
        // Add the new rightmost element
        add(nums[i]);
        // Store the x-sum of the current window
        result.push(topSum);
    }
    
    return result;
}
