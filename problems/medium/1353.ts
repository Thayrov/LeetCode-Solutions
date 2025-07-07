/*
1353. Maximum Number of Events That Can Be Attended

You are given an array of events where events[i] = [startDayi, endDayi]. Every event i starts at startDayi and ends at endDayi.
You can attend an event i at any day d where startTimei <= d <= endTimei. You can only attend one event at any time d.
Return the maximum number of events you can attend.

Example 1:
Input: events = [[1,2],[2,3],[3,4]]
Output: 3
Explanation: You can attend all the three events.
One way to attend them all is as shown.
Attend the first event on day 1.
Attend the second event on day 2.
Attend the third event on day 3.

Example 2:
Input: events= [[1,2],[2,3],[3,4],[1,2]]
Output: 4

Constraints:
1 <= events.length <= 10^5
events[i].length == 2
1 <= startDayi <= endDayi <= 10^5

</> Typescript code:
*/

function maxEvents(events: number[][]): number {
  // Sort events by start day to process them chronologically
  events.sort((a, b) => a[0] - b[0]);

  // Use proper min-heap for O(log n) operations
  const heap = new MinHeap();
  // Index to track current position in sorted events array
  let i = 0;
  // Current day we're processing
  let day = 1;
  // Counter for total events attended
  let attended = 0;

  // Continue while there are events to process or events in heap
  while (i < events.length || heap.size > 0) {
    // Add all events that start on or before current day to heap
    while (i < events.length && events[i][0] <= day) {
      // Push end day of event to min-heap
      heap.push(events[i][1]);
      i++;
    }

    // Remove expired events (events that ended before current day)
    while (heap.size > 0 && heap.peek() < day) {
      heap.pop();
    }

    // If there are available events, attend the one ending earliest
    if (heap.size > 0) {
      // Remove the event with earliest end day from heap
      heap.pop();
      // Increment attended events counter
      attended++;
    }

    // Move to next day sequentially
    day++;
  }

  // Return total number of events attended
  return attended;
}

// Min-heap implementation for efficient priority queue operations
class MinHeap {
  private heap: number[] = [];

  // Get current size of heap
  get size(): number {
    return this.heap.length;
  }

  // Insert element and maintain heap property - O(log n)
  push(val: number): void {
    this.heap.push(val);
    this.heapifyUp(this.heap.length - 1);
  }

  // Remove and return minimum element - O(log n)
  pop(): number {
    if (this.heap.length === 0) return -1;
    if (this.heap.length === 1) return this.heap.pop()!;

    const root = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown(0);
    return root;
  }

  // Get minimum element without removing - O(1)
  peek(): number {
    return this.heap[0];
  }

  // Restore heap property by moving element up
  private heapifyUp(idx: number): void {
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[parentIdx] <= this.heap[idx]) break;
      [this.heap[parentIdx], this.heap[idx]] = [this.heap[idx], this.heap[parentIdx]];
      idx = parentIdx;
    }
  }

  // Restore heap property by moving element down
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
