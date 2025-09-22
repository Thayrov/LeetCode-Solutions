/* 
3005. Count Elements With Maximum Frequency

You are given an array nums consisting of positive integers.

Return the total frequencies of elements in nums such that those elements all have the maximum frequency.

The frequency of an element is the number of occurrences of that element in the array.

Example 1:
Input: nums = [1,2,2,3,1,4]
Output: 4
Explanation: The elements 1 and 2 have a frequency of 2 which is the maximum frequency in the array.
So the number of elements in the array with maximum frequency is 4.

Example 2:
Input: nums = [1,2,3,4,5]
Output: 5
Explanation: All elements of the array have a frequency of 1 which is the maximum.
So the number of elements in the array with maximum frequency is 5.

Constraints:
1 <= nums.length <= 100
1 <= nums[i] <= 100

</> Typescript Code:
*/

function maxFrequencyElements(nums: number[]): number {
  // Create a map to keep track of the frequency of each element.
  const frequencyMap = {};
  // Variables to store the maximum frequency found and the total elements having that frequency.
  let maxFrequency = 0,
    totalMaxFrequencyElements = 0;
  // Loop through each element in the array to populate the frequency map.
  for (const num of nums) {
    // If the element is already in the map, increment its count, otherwise set it to 1.
    frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    // Update the maximum frequency found so far.
    maxFrequency = Math.max(maxFrequency, frequencyMap[num]);
  }
  // Loop through the frequency map to count how many elements have the maximum frequency.
  for (const freq of Object.values(frequencyMap)) {
    // If the frequency of an element matches the maximum frequency, add it to the total count.
    if (freq === maxFrequency) totalMaxFrequencyElements += freq;
  }
  // Return the total count of elements with maximum frequency.
  return totalMaxFrequencyElements;
}
