/*
3307. Find the K-th Character in String Game II

Alice and Bob are playing a game. Initially, Alice has a string word = "a".
You are given a positive integer k. You are also given an integer array operations, where operations[i] represents the type of the ith operation.
Now Bob will ask Alice to perform all operations in sequence:
If operations[i] == 0, append a copy of word to itself.
If operations[i] == 1, generate a new string by changing each character in word to its next character in the English alphabet, and append it to the original word. For example, performing the operation on "c" generates "cd" and performing the operation on "zb" generates "zbac".
Return the value of the kth character in word after performing all the operations.
Note that the character 'z' can be changed to 'a' in the second type of operation.

Example 1:
Input: k = 5, operations = [0,0,0]
Output: "a"
Explanation:
Initially, word == "a". Alice performs the three operations as follows:
Appends "a" to "a", word becomes "aa".
Appends "aa" to "aa", word becomes "aaaa".
Appends "aaaa" to "aaaa", word becomes "aaaaaaaa".

Example 2:
Input: k = 10, operations = [0,1,0,1]
Output: "b"
Explanation:
Initially, word == "a". Alice performs the four operations as follows:
Appends "a" to "a", word becomes "aa".
Appends "bb" to "aa", word becomes "aabb".
Appends "aabb" to "aabb", word becomes "aabbaabb".
Appends "bbccbbcc" to "aabbaabb", word becomes "aabbaabbbbccbbcc".
 
Constraints:
1 <= k <= 10^14
1 <= operations.length <= 100
operations[i] is either 0 or 1.
The input is generated such that word has at least k characters after all operations.

</> Typescript code:
*/

function kthCharacter(k: number, operations: number[]): string {
  // Recursive function to determine how many character shifts are needed for position 'pos'
  function solve(pos: number, ops: number[]): number {
    // Base case: if no operations, no shifts needed
    if (ops.length === 0) return 0;

    // Calculate the length after each operation to find which operation affects our position
    let len = 1; // Start with initial string length of 1
    for (let i = 0; i < ops.length; i++) {
      len *= 2; // Each operation doubles the string length
      if (pos <= len) {
        // Found the operation that creates the segment containing our position
        if (pos <= len / 2) {
          // Position is in the first half (original part)
          return solve(pos, ops.slice(0, i));
        } else {
          // Position is in the second half (appended part)
          // Add the operation type (0 or 1) to account for potential character shift
          return ops[i] + solve(pos - len / 2, ops.slice(0, i));
        }
      }
    }

    // If we've gone through all operations, check final position
    if (pos <= len / 2) {
      // Position is in the first half
      return solve(pos, ops.slice(0, -1));
    } else {
      // Position is in the second half
      // Add the last operation's shift and recurse on the corresponding position in first half
      return ops[ops.length - 1] + solve(pos - len / 2, ops.slice(0, -1));
    }
  }

  // Get total number of character shifts needed for position k
  const shifts = solve(k, operations) % 26;
  // Convert to character: 'a' + shifts, wrapping around with modulo 26
  return String.fromCharCode(97 + shifts);
}
