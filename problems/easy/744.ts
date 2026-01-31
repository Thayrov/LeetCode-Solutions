/*
744. Find Smallest Letter Greater Than Target

You are given an array of characters letters that is sorted in non-decreasing order, and a character target. There are at least two different characters in letters.
Return the smallest character in letters that is lexicographically greater than target. If such a character does not exist, return the first character in letters.

Example 1:
Input: letters = ["c","f","j"], target = "a"
Output: "c"
Explanation: The smallest character that is lexicographically greater than 'a' in letters is 'c'.

Example 2:
Input: letters = ["c","f","j"], target = "c"
Output: "f"
Explanation: The smallest character that is lexicographically greater than 'c' in letters is 'f'.

Example 3:
Input: letters = ["x","x","y","y"], target = "z"
Output: "x"
Explanation: There are no characters in letters that is lexicographically greater than 'z' so we return letters[0].

Constraints:
2 <= letters.length <= 10^4
letters[i] is a lowercase English letter.
letters is sorted in non-decreasing order.
letters contains at least two different characters.
target is a lowercase English letter.

</> Typescript code:
*/

function nextGreatestLetter(letters: string[], target: string): string {
  // Initialize binary search boundaries: left starts at beginning, right at end
  let left = 0,
    right = letters.length - 1;

  // Binary search loop: continue while search space is valid
  while (left <= right) {
    // Calculate middle index using bit shift for performance (avoids overflow, faster than Math.floor)
    const mid = left + ((right - left) >> 1);

    // If middle element is less than or equal to target, it can't be our answer
    // So we search the right half exclusively by moving left pointer past mid
    if (letters[mid] <= target) left = mid + 1;
    // If middle element is greater than target, it could be our answer
    // But we need to check if there's a smaller valid element to the left
    // So we search left half while keeping mid as potential candidate
    else right = mid - 1;
  }

  // When loop ends, left points to insertion point (first element > target)
  // If left is out of bounds (target >= all elements), wrap around using modulo
  // This handles the circular constraint: return first element if no greater found
  return letters[left % letters.length];
}
