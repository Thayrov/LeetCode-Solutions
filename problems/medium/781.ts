/* 
781. Rabbits in Forest

There is a forest with an unknown number of rabbits. We asked n rabbits "How many rabbits have the same color as you?" and collected the answers in an integer array answers where answers[i] is the answer of the ith rabbit.

Given the array answers, return the minimum number of rabbits that could be in the forest.

Example 1:
Input: answers = [1,1,2]
Output: 5
Explanation:
The two rabbits that answered "1" could both be the same color, say red.
The rabbit that answered "2" can't be red or the answers would be inconsistent.
Say the rabbit that answered "2" was blue.
Then there should be 2 other blue rabbits in the forest that didn't answer into the array.
The smallest possible number of rabbits in the forest is therefore 5: 3 that answered plus 2 that didn't.

Example 2:
Input: answers = [10,10,10]
Output: 11

Constraints:
1 <= answers.length <= 1000
0 <= answers[i] < 1000

</> Typescript code:
*/

function numRabbits(answers: number[]): number {
  // create an array of 1000 zeros to count frequencies for answers 0..999
  const counts = new Array(1000).fill(0);
  // track the largest answer value seen
  let max = 0;
  // count how many rabbits gave each answer
  for (let i = 0; i < answers.length; i++) {
    const a = answers[i]; // current rabbit's answer
    counts[a]++; // increment frequency for this answer
    if (a > max) max = a; // update max answer if needed
  }
  // initialize total rabbits in forest
  let total = 0;
  // for each possible answer from 0 up to max
  for (let k = 0; k <= max; k++) {
    const v = counts[k]; // number of rabbits who answered k
    if (v > 0) {
      const groupSize = k + 1; // group size implied by answer k
      const groups = ((v + k) / groupSize) | 0; // ceil(v / groupSize) via integer arithmetic
      total += groups * groupSize; // add rabbits for all full groups
    }
  }
  return total; // minimum possible number of rabbits
}
