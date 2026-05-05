/*
61. Rotate List

Given the head of a linked list, rotate the list to the right by k places.

Example 1:
Input: head = [1,2,3,4,5], k = 2
Output: [4,5,1,2,3]

Example 2:
Input: head = [0,1,2], k = 4
Output: [2,0,1]

Constraints:
The number of nodes in the list is in the range [0, 500].
-100 <= Node.val <= 100
0 <= k <= 2 * 10^9

</> Typescript code:
*/

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function rotateRight(head: ListNode | null, k: number): ListNode | null {
  // If list is empty, has one node, or no rotation needed, return as-is.
  if (!head || !head.next || k === 0) return head;

  // Store list length, starting with the head node counted.
  let len = 1;

  // Start tail pointer at head.
  let tail = head;

  // Walk to the last node.
  while (tail.next) {
    // Move tail forward.
    tail = tail.next;

    // Count current node.
    len++;
  }

  // Reduce k because rotating by len changes nothing.
  k %= len;

  // If k is now 0, list remains unchanged.
  if (k === 0) return head;

  // Link tail to head, temporarily making the list circular.
  tail.next = head;

  // New tail is len - k steps from the old tail in the circular list.
  let stepsToNewTail = len - k;

  // Start from old tail so exactly len - k moves lands on new tail.
  let newTail = tail;

  // Move to the node that should become the new tail.
  while (stepsToNewTail--) {
    // Move one node forward in the circular list.
    newTail = newTail.next!;
  }

  // The node after new tail becomes the new head.
  const newHead = newTail.next;

  // Break the circle to finish the rotated list.
  newTail.next = null;

  // Return rotated list head.
  return newHead;
}
