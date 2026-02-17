/*
401. Binary Watch

A binary watch has 4 LEDs on the top to represent the hours (0-11), and 6 LEDs on the bottom to represent the minutes (0-59). Each LED represents a zero or one, with the least significant bit on the right.
For example, the below binary watch reads "4:51".
Given an integer turnedOn which represents the number of LEDs that are currently on (ignoring the PM), return all possible times the watch could represent. You may return the answer in any order.
The hour must not contain a leading zero.
For example, "01:00" is not valid. It should be "1:00".
The minute must consist of two digits and may contain a leading zero.
For example, "10:2" is not valid. It should be "10:02".

Example 1:
Input: turnedOn = 1
Output: ["0:01","0:02","0:04","0:08","0:16","0:32","1:00","2:00","4:00","8:00"]

Example 2:
Input: turnedOn = 9
Output: []

Constraints:
0 <= turnedOn <= 10

</> Typescript code:
*/

function readBinaryWatch(turnedOn: number): string[] {
  // Initialize an empty array to store valid time strings
  const res: string[] = [];

  // Iterate through every possible hour on a 12-hour clock (0 to 11)
  for (let h = 0; h < 12; h++) {
    // Iterate through every possible minute (0 to 59)
    for (let m = 0; m < 60; m++) {
      // Count set bits (1s) in the binary representation of 'h'
      const hourBits = h.toString(2).split("1").length - 1;
      // Count set bits (1s) in the binary representation of 'm'
      const minuteBits = m.toString(2).split("1").length - 1;

      // If the total number of LEDs (bits) matches turnedOn, it's a valid time
      if (hourBits + minuteBits === turnedOn) {
        // Format the minute: add a leading zero if 'm' is less than 10
        const formattedMinute = m < 10 ? `0${m}` : `${m}`;
        // Push the formatted time string "H:MM" to the result array
        res.push(`${h}:${formattedMinute}`);
      }
    }
  }

  // Return the final list of all possible times
  return res;
}
