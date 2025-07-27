/*
2210. Count Hills and Valleys in an Array

You are given a 0-indexed integer array nums. An index i is part of a hill in nums if the closest non-equal neighbors of i are smaller than nums[i]. Similarly, an index i is part of a valley in nums if the closest non-equal neighbors of i are larger than nums[i]. Adjacent indices i and j are part of the same hill or valley if nums[i] == nums[j].
Note that for an index to be part of a hill or valley, it must have a non-equal neighbor on both the left and right of the index.
Return the number of hills and valleys in nums.

Example 1:
Input: nums = [2,4,1,1,6,5]
Output: 3
Explanation:
At index 0: There is no non-equal neighbor of 2 on the left, so index 0 is neither a hill nor a valley.
At index 1: The closest non-equal neighbors of 4 are 2 and 1. Since 4 > 2 and 4 > 1, index 1 is a hill. 
At index 2: The closest non-equal neighbors of 1 are 4 and 6. Since 1 < 4 and 1 < 6, index 2 is a valley.
At index 3: The closest non-equal neighbors of 1 are 4 and 6. Since 1 < 4 and 1 < 6, index 3 is a valley, but note that it is part of the same valley as index 2.
At index 4: The closest non-equal neighbors of 6 are 1 and 5. Since 6 > 1 and 6 > 5, index 4 is a hill.
At index 5: There is no non-equal neighbor of 5 on the right, so index 5 is neither a hill nor a valley. 
There are 3 hills and valleys so we return 3.

Example 2:
Input: nums = [6,6,5,5,4,1]
Output: 0
Explanation:
At index 0: There is no non-equal neighbor of 6 on the left, so index 0 is neither a hill nor a valley.
At index 1: There is no non-equal neighbor of 6 on the left, so index 1 is neither a hill nor a valley.
At index 2: The closest non-equal neighbors of 5 are 6 and 4. Since 5 < 6 and 5 > 4, index 2 is neither a hill nor a valley.
At index 3: The closest non-equal neighbors of 5 are 6 and 4. Since 5 < 6 and 5 > 4, index 3 is neither a hill nor a valley.
At index 4: The closest non-equal neighbors of 4 are 5 and 1. Since 4 < 5 and 4 > 1, index 4 is neither a hill nor a valley.
At index 5: There is no non-equal neighbor of 1 on the right, so index 5 is neither a hill nor a valley.
There are 0 hills and valleys so we return 0.
 
Constraints:
3 <= nums.length <= 100
1 <= nums[i] <= 100

</> Typescript code:
*/

function countHillValley(nums: number[]): number {
      // Initialize counter for total hills and valleys found
      let count = 0;
      // Start from index 1 since index 0 cannot have a left neighbor
      let i = 1;

      // Iterate through all possible positions excluding the last element
      while (i < nums.length - 1) {
          // Initialize left pointer to search for closest non-equal left
  neighbor
          let left = i - 1;
          // Move left pointer backwards until we find a different value
  or reach array start
          while (left >= 0 && nums[left] === nums[i]) left--;

          // Initialize right pointer to search for closest non-equal
  right neighbor
          let right = i + 1;
          // Move right pointer forwards until we find a different value
  or reach array end
          while (right < nums.length && nums[right] === nums[i]) right++;

          // Verify we have valid non-equal neighbors on both sides
          if (left >= 0 && right < nums.length) {
              // Check if current element forms a hill (greater than both
  neighbors)
              // or a valley (smaller than both neighbors)
              if ((nums[i] > nums[left] && nums[i] > nums[right]) ||
                  (nums[i] < nums[left] && nums[i] < nums[right])) {
                  // Increment counter when we find a valid hill or valley
                  count++;
              }
          }

          // Skip all consecutive equal values to avoid counting the same
  hill/valley multiple times
          while (i < nums.length - 1 && nums[i] === nums[i + 1]) i++;
          // Move to the next distinct value position
          i++;
      }

      // Return the total count of hills and valleys
      return count;
  }
