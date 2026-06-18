/*
1344. Angle Between Hands of a Clock

Hint
Given two numbers, hour and minutes, return the smaller angle (in degrees) formed between the hour and the minute hand.
Answers within 10-5 of the actual value will be accepted as correct.

Example 1:
Input: hour = 12, minutes = 30
Output: 165

Example 2:
Input: hour = 3, minutes = 30
Output: 75

Example 3:
Input: hour = 3, minutes = 15
Output: 7.5

Constraints:
1 <= hour <= 12
0 <= minutes <= 59

</> Typescript code:
*/

// Defines the function that returns the smaller angle between both clock hands.
function angleClock(hour: number, minutes: number): number {
  // Calculates the absolute angle difference:
  // each hour represents 30°, and each minute moves the hour hand 0.5°
  // while the minute hand moves 6°, producing a relative movement of 5.5°.
  const difference = Math.abs((hour % 12) * 30 - minutes * 5.5);

  // Returns the smaller of the direct angle and its complementary angle.
  return Math.min(difference, 360 - difference);
}
