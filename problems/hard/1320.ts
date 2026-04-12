/*
1320. Minimum Distance to Type a Word Using Two Fingers

Hint
You have a keyboard layout as shown above in the X-Y plane, where each English uppercase letter is located at some coordinate.
For example, the letter 'A' is located at coordinate (0, 0), the letter 'B' is located at coordinate (0, 1), the letter 'P' is located at coordinate (2, 3) and the letter 'Z' is located at coordinate (4, 1).
Given the string word, return the minimum total distance to type such string using only two fingers.
The distance between coordinates (x1, y1) and (x2, y2) is |x1 - x2| + |y1 - y2|.
Note that the initial positions of your two fingers are considered free so do not count towards your total distance, also your two fingers do not have to start at the first letter or the first two letters.

Example 1:
Input: word = "CAKE"
Output: 3
Explanation: Using two fingers, one optimal way to type "CAKE" is: 
Finger 1 on letter 'C' -> cost = 0 
Finger 1 on letter 'A' -> cost = Distance from letter 'C' to letter 'A' = 2 
Finger 2 on letter 'K' -> cost = 0 
Finger 2 on letter 'E' -> cost = Distance from letter 'K' to letter 'E' = 1 
Total distance = 3

Example 2:
Input: word = "HAPPY"
Output: 6
Explanation: Using two fingers, one optimal way to type "HAPPY" is:
Finger 1 on letter 'H' -> cost = 0
Finger 1 on letter 'A' -> cost = Distance from letter 'H' to letter 'A' = 2
Finger 2 on letter 'P' -> cost = 0
Finger 2 on letter 'P' -> cost = Distance from letter 'P' to letter 'P' = 0
Finger 1 on letter 'Y' -> cost = Distance from letter 'A' to letter 'Y' = 4
Total distance = 6

Constraints:
2 <= word.length <= 300
word consists of uppercase English letters.

</> Typescript code:
*/

function minimumDistance(word: string): number {
  // Calculates Manhattan distance. Index 26 represents a finger that hasn't been placed yet.
  const getDist = (a: number, b: number): number => {
    if (a === 26) return 0; // First placement of a finger is free
    return (
      Math.abs(Math.floor(a / 6) - Math.floor(b / 6)) +
      Math.abs((a % 6) - (b % 6))
    );
  };

  // dp[c] stores the minimum cost to type the word up to the current character,
  // where one finger is on the current character, and the OTHER finger is on character 'c'.
  // We use index 26 to denote the "unplaced" state. Initialize with a high number to simulate Infinity.
  let dp = new Int32Array(27).fill(1000000);

  // Base case: at the first letter, the other finger is unplaced (index 26) and cost is 0.
  dp[26] = 0;

  for (let i = 0; i < word.length - 1; i++) {
    const curr = word.charCodeAt(i) - 65;
    const next = word.charCodeAt(i + 1) - 65;

    // State for the next step, initialized to our simulated Infinity
    const nextDp = new Int32Array(27).fill(1000000);

    for (let other = 0; other <= 26; other++) {
      // Skip unreachable states
      if (dp[other] === 1000000) continue;

      // Option 1: Move the primary finger from 'curr' to 'next'.
      // The 'other' finger stays exactly where it was.
      nextDp[other] = Math.min(nextDp[other], dp[other] + getDist(curr, next));

      // Option 2: Move the 'other' finger to 'next'.
      // The primary finger stays behind, meaning 'curr' becomes the new 'other' finger.
      nextDp[curr] = Math.min(nextDp[curr], dp[other] + getDist(other, next));
    }
    // Move to the next step
    dp = nextDp;
  }

  // The answer is the minimum cost among all possible positions of the 'other' finger.
  return Math.min(...dp);
}
