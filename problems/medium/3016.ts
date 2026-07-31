/*
3016. Minimum Number of Pushes to Type Word II

You are given a string word containing lowercase English letters.
Telephone keypads have keys mapped with distinct collections of lowercase English letters, which can be used to form words by pushing them. For example, the key "2" is mapped with ["a","b","c"], we need to push the key one time to type "a", two times to type "b", and three times to type "c".
It is allowed to remap the keys numbered 2 to 9 to distinct collections of letters. The keys can be remapped to any amount of letters, but each letter must be mapped to exactly one key. You need to find the minimum number of times the keys will be pushed to type the string word.
Return the minimum number of pushes needed to type word after remapping the keys.
Note that 1, *, #, and 0 do not map to any letters.

Example 1:
Input: word = "abcde"
Output: 5
Explanation:
The remapped keypad provides the minimum cost:
"a" -> one push on key 2
"b" -> one push on key 3
"c" -> one push on key 4
"d" -> one push on key 5
"e" -> one push on key 6
Total cost is 1 + 1 + 1 + 1 + 1 = 5.
It can be shown that no other mapping can provide a lower cost.

Example 2:
Input: word = "xyzxyzxyzxyz"
Output: 12
Explanation:
The remapped keypad provides the minimum cost:
"x" -> one push on key 2
"y" -> one push on key 3
"z" -> one push on key 4
Total cost is 1 * 4 + 1 * 4 + 1 * 4 = 12.
It can be shown that no other mapping can provide a lower cost.
Note that key 9 is not mapped to any letter: it is not necessary to map letters to every key, but all letters must be mapped.

Example 3:
Input: word = "aabbccddeeffgghhiiiiii"
Output: 24
Explanation:
The remapped keypad provides the minimum cost:
"a" -> one push on key 2
"b" -> one push on key 3
"c" -> one push on key 4
"d" -> one push on key 5
"e" -> one push on key 6
"f" -> one push on key 7
"g" -> one push on key 8
"h" -> two pushes on key 9
"i" -> one push on key 9
Total cost is 1 * 2 + 1 * 2 + 1 * 2 + 1 * 2 + 1 * 2 + 1 * 2 + 1 * 2 + 2 * 2 + 6 * 1 = 24.
It can be shown that no other mapping can provide a lower cost.

Constraints:
1 <= word.length <= 10^5
word consists of lowercase English letters.

</> Typescript code:
*/

function minimumPushes(word: string): number {
  // Allocate one frequency slot for each lowercase English letter.
  const frequencies = new Array<number>(26).fill(0);

  // Visit every character once to build its frequency.
  for (let i = 0; i < word.length; ++i) {
    // Convert the character to its zero-based alphabet index and count it.
    ++frequencies[word.charCodeAt(i) - 97];
  }

  // Put the most frequent letters into the cheapest keypad positions first.
  frequencies.sort((a, b) => b - a);

  // Accumulate the minimum number of keypad pushes.
  let pushes = 0;

  // Assign each consecutive group of eight letters to the next push-cost layer.
  for (let i = 0; i < 26; ++i) {
    // Multiply the letter frequency by its one-based layer cost.
    pushes += frequencies[i] * ((i >> 3) + 1);
  }

  // Return the minimum total cost of typing the word.
  return pushes;
}
