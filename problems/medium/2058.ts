/*
2058. Find the Minimum and Maximum Number of Nodes Between Critical Points

A critical point in a linked list is defined as either a local maxima or a local minima.
A node is a local maxima if the current node has a value strictly greater than the previous node and the next node.
A node is a local minima if the current node has a value strictly smaller than the previous node and the next node.
Note that a node can only be a local maxima/minima if there exists both a previous node and a next node.
Given a linked list head, return an array of length 2 containing [minDistance, maxDistance] where minDistance is the minimum distance between any two distinct critical points and maxDistance is the maximum distance between any two distinct critical points. If there are fewer than two critical points, return [-1, -1].

Example 1:
Input: head = [3,1]
Output: [-1,-1]
Explanation:
There are no critical points in [3,1].

Example 2:
Input: head = [5,3,1,2,5,1,2]
Output: [1,3]
Explanation:
There are three critical points:
- [5,3,1,2,5,1,2]: The third node is a local minima because 1 is less than 3 and 2.
- [5,3,1,2,5,1,2]: The fifth node is a local maxima because 5 is greater than 2 and 1.
- [5,3,1,2,5,1,2]: The sixth node is a local minima because 1 is less than 5 and 2.
The minimum distance is between the fifth and the sixth node. minDistance = 6 - 5 = 1.
The maximum distance is between the third and the sixth node. maxDistance = 6 - 3 = 3.

Example 3:
Input: head = [1,3,2,2,3,2,2,2,7]
Output: [3,3]
Explanation:
There are two critical points:
- [1,3,2,2,3,2,2,2,7]: The second node is a local maxima because 3 is greater than 1 and 2.
- [1,3,2,2,3,2,2,2,7]: The fifth node is a local maxima because 3 is greater than 2 and 2.
Both the minimum and maximum distances are between the second and the fifth node.
Thus, minDistance and maxDistance is 5 - 2 = 3.
Note that the last node is not considered a local maxima because it does not have a next node.

Constraints:
The number of nodes in the list is in the range [2, 10^5].
1 <= Node.val <= 10^5

</> Typescript code:
*/

// Scan interior nodes while retaining only critical-position extrema.
function nodesBetweenCriticalPoints(head: ListNode | null): number[] {
  // Fewer than two nodes cannot contain a pair of critical points.
  if (head === null || head.next === null) return [-1, -1];
  // Retain the value immediately before the candidate node.
  let previous = head.val;
  // Start at the second node, since the head has no predecessor.
  let current = head.next;
  // Initialize the index, critical endpoints, and minimum-gap sentinel.
  let index = 1, first = -1, last = -1, minimum = Infinity;
  // Exclude the tail because a critical point needs a successor.
  while (current.next !== null) {
    // Cache the candidate value for comparisons and advancement.
    const value = current.val;
    // Cache the non-null successor for comparison and advancement.
    const next = current.next;
    // Require a strict peak or valley; equal neighbors disqualify it.
    if ((value > previous && value > next.val) ||
        (value < previous && value < next.val)) {
      // Save the earliest critical point once for the maximum distance.
      if (first === -1) first = index;
      // Every later critical point completes a consecutive pair.
      else {
        // Only consecutive critical points can minimize the distance.
        const gap = index - last;
        // Retain the smallest consecutive gap observed so far.
        if (gap < minimum) minimum = gap;
      }
      // Advance the latest critical point for both distance calculations.
      last = index;
    }
    // Shift the predecessor value without modifying the input list.
    previous = value;
    // Advance to the next candidate node.
    current = next;
    // Keep the candidate's zero-based position synchronized.
    index++;
  }
  // Equal endpoints mean fewer than two critical points were found.
  return first === last ? [-1, -1] : [minimum, last - first];
}
