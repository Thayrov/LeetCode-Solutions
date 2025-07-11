/*
2402. Meeting Rooms III

You are given an integer n. There are n rooms numbered from 0 to n - 1.
You are given a 2D integer array meetings where meetings[i] = [starti, endi] means that a meeting will be held during the half-closed time interval [starti, endi). All the values of starti are unique.
Meetings are allocated to rooms in the following manner:
Each meeting will take place in the unused room with the lowest number.
If there are no available rooms, the meeting will be delayed until a room becomes free. The delayed meeting should have the same duration as the original meeting.
When a room becomes unused, meetings that have an earlier original start time should be given the room.
Return the number of the room that held the most meetings. If there are multiple rooms, return the room with the lowest number.
A half-closed interval [a, b) is the interval between a and b including a and not including b.

Example 1:
Input: n = 2, meetings = [[0,10],[1,5],[2,7],[3,4]]
Output: 0
Explanation:
- At time 0, both rooms are not being used. The first meeting starts in room 0.
- At time 1, only room 1 is not being used. The second meeting starts in room 1.
- At time 2, both rooms are being used. The third meeting is delayed.
- At time 3, both rooms are being used. The fourth meeting is delayed.
- At time 5, the meeting in room 1 finishes. The third meeting starts in room 1 for the time period [5,10).
- At time 10, the meetings in both rooms finish. The fourth meeting starts in room 0 for the time period [10,11).
Both rooms 0 and 1 held 2 meetings, so we return 0. 

Example 2:
Input: n = 3, meetings = [[1,20],[2,10],[3,5],[4,9],[6,8]]
Output: 1
Explanation:
- At time 1, all three rooms are not being used. The first meeting starts in room 0.
- At time 2, rooms 1 and 2 are not being used. The second meeting starts in room 1.
- At time 3, only room 2 is not being used. The third meeting starts in room 2.
- At time 4, all three rooms are being used. The fourth meeting is delayed.
- At time 5, the meeting in room 2 finishes. The fourth meeting starts in room 2 for the time period [5,10).
- At time 6, all three rooms are being used. The fifth meeting is delayed.
- At time 10, the meetings in rooms 1 and 2 finish. The fifth meeting starts in room 1 for the time period [10,12).
Room 0 held 1 meeting while rooms 1 and 2 each held 2 meetings, so we return 1. 

Constraints:
1 <= n <= 100
1 <= meetings.length <= 10^5
meetings[i].length == 2
0 <= starti < endi <= 5 * 10^5
All the values of starti are unique.

</> Typescript code:
*/

// A generic MinPriorityQueue (Min-Heap) implementation.
// Renamed to MyMinPriorityQueue to avoid conflicts with built-in classes in platforms like LeetCode.
class MyMinPriorityQueue<T> {
  // The heap is stored as an array.
  private heap: T[];
  // A comparator function to determine the order of elements.
  private comparator: (a: T, b: T) => number;

  // The constructor initializes an empty heap and sets the comparator.
  constructor(comparator: (a: T, b: T) => number) {
    this.heap = [];
    this.comparator = comparator;
  }

  // Returns the number of elements in the queue.
  size(): number {
    return this.heap.length;
  }

  // Returns the smallest element without removing it (or null if empty).
  peek(): T | null {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  // Adds a new value to the heap and maintains the heap property.
  push(value: T): void {
    this.heap.push(value);
    this.siftUp(); // Restore heap property by moving the new element up.
  }

  // Removes and returns the smallest element from the heap.
  pop(): T | null {
    if (this.heap.length === 0) {
      return null; // Return null if the heap is empty.
    }
    // Swap the root (smallest element) with the last element.
    this.swap(0, this.heap.length - 1);
    // Remove the last element (which is the original root).
    const poppedValue = this.heap.pop();
    // Restore the heap property by sifting the new root down.
    this.siftDown();
    return poppedValue!;
  }

  // Helper to get the parent index of a node.
  private getParentIndex(i: number): number {
    return Math.floor((i - 1) / 2);
  }

  // Helper to get the left child index of a node.
  private getLeftChildIndex(i: number): number {
    return 2 * i + 1;
  }

  // Helper to get the right child index of a node.
  private getRightChildIndex(i: number): number {
    return 2 * i + 2;
  }

  // Helper to swap two elements in the heap array.
  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // Moves a node up the heap to maintain the heap property after insertion.
  private siftUp(): void {
    let nodeIndex = this.heap.length - 1;
    // Continue swapping with the parent as long as the node is smaller than its parent.
    while (
      nodeIndex > 0 &&
      this.comparator(
        this.heap[nodeIndex],
        this.heap[this.getParentIndex(nodeIndex)]
      ) < 0
    ) {
      this.swap(nodeIndex, this.getParentIndex(nodeIndex));
      nodeIndex = this.getParentIndex(nodeIndex);
    }
  }

  // Moves a node down the heap to maintain the heap property after removal.
  private siftDown(): void {
    let nodeIndex = 0;
    // Continue as long as there is at least a left child.
    while (this.getLeftChildIndex(nodeIndex) < this.heap.length) {
      let smallerChildIndex = this.getLeftChildIndex(nodeIndex);
      const rightChildIndex = this.getRightChildIndex(nodeIndex);

      // Check if a right child exists and is smaller than the left child.
      if (
        rightChildIndex < this.heap.length &&
        this.comparator(
          this.heap[rightChildIndex],
          this.heap[smallerChildIndex]
        ) < 0
      ) {
        smallerChildIndex = rightChildIndex;
      }

      // If the current node is already smaller than its smallest child, the heap is valid.
      if (
        this.comparator(this.heap[nodeIndex], this.heap[smallerChildIndex]) < 0
      ) {
        break;
      }

      // Swap the node with its smaller child and continue sifting down.
      this.swap(nodeIndex, smallerChildIndex);
      nodeIndex = smallerChildIndex;
    }
  }
}

function mostBooked(n: number, meetings: number[][]): number {
  // First, sort meetings by their start times to process them chronologically.
  meetings.sort((a, b) => a[0] - b[0]);

  // `meetingCount[i]` will store the number of meetings held in room `i`.
  const meetingCount = new Array(n).fill(0);

  // A min-priority queue to store the indices of available rooms.
  // The comparator `a - b` ensures the room with the smallest index is always at the top.
  const availableRooms = new MyMinPriorityQueue<number>((a, b) => a - b);
  // Initially, all rooms are available.
  for (let i = 0; i < n; i++) {
    availableRooms.push(i);
  }

  // A min-priority queue for busy rooms, storing pairs of [endTime, roomIndex].
  // This helps to quickly find which room will become free the earliest.
  const busyRooms = new MyMinPriorityQueue<[number, number]>((a, b) => {
    // Primary sort key: end time.
    if (a[0] !== b[0]) {
      return a[0] - b[0];
    }
    // Secondary sort key (for ties in end time): room index.
    return a[1] - b[1];
  });

  // Process each meeting one by one.
  for (const meeting of meetings) {
    const [start, end] = meeting;

    // Free up any rooms that have finished their meetings by the time the current meeting starts.
    while (busyRooms.size() > 0 && busyRooms.peek()![0] <= start) {
      // Pop the freed room from the busy queue.
      const [, roomIndex] = busyRooms.pop()!;
      // Add its index back to the available rooms queue.
      availableRooms.push(roomIndex);
    }

    let roomToUse: number;
    let meetingEndTime: number;
    const duration = end - start;

    // Case 1: There is at least one room available.
    if (availableRooms.size() > 0) {
      // Get the available room with the lowest index.
      roomToUse = availableRooms.pop()!;
      // The meeting ends at its scheduled time.
      meetingEndTime = end;
    } else {
      // Case 2: All rooms are busy, the meeting is delayed.
      // Get the room that will be free the earliest from the busy queue.
      const [earliestFreeTime, earliestFreedRoom] = busyRooms.pop()!;
      // This is the room we will use.
      roomToUse = earliestFreedRoom;
      // The meeting starts when the room is free, and its end time is adjusted.
      meetingEndTime = earliestFreeTime + duration;
    }

    // Increment the meeting count for the assigned room.
    meetingCount[roomToUse]++;
    // Add the room back to the busy queue with its new end time.
    busyRooms.push([meetingEndTime, roomToUse]);
  }

  // After processing all meetings, find the room with the maximum number of meetings.
  let maxMeetings = -1;
  let resultRoom = -1;

  // Iterate through the meeting counts for each room.
  for (let i = 0; i < n; i++) {
    // If the current room has more meetings than the max found so far...
    if (meetingCount[i] > maxMeetings) {
      // ...update the max count and the result room.
      maxMeetings = meetingCount[i];
      resultRoom = i;
    }
  }

  // Return the index of the room that held the most meetings.
  // The loop naturally handles the tie-breaking rule (lowest room number).
  return resultRoom;
}
