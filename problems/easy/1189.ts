/*
1189. Maximum Number of Balloons

Hint
Given a string text, you want to use the characters of text to form as many instances of the word "balloon" as possible.
You can use each character in text at most once. Return the maximum number of instances that can be formed.

Example 1:
Input: text = "nlaebolko"
Output: 1

Example 2:
Input: text = "loonbalxballpoon"
Output: 2

Example 3:
Input: text = "leetcode"
Output: 0

Constraints:
1 <= text.length <= 104
text consists of lower case English letters only.

Note: This question is the same as 2287: Rearrange Characters to Make Target String.

</> Typescript code:
*/

function maxNumberOfBalloons(text: string): number {
  // Store frequency of each lowercase English letter.
  const cnt = new Array(26).fill(0);

  // Count every character in text.
  for (let i = 0; i < text.length; i++) {
    // Convert character to index: 'a' -> 0, 'b' -> 1, ..., 'z' -> 25.
    cnt[text.charCodeAt(i) - 97]++;
  }

  // "balloon" needs:
  // b once  -> cnt[1]
  // a once  -> cnt[0]
  // l twice -> cnt[11] / 2
  // o twice -> cnt[14] / 2
  // n once  -> cnt[13]
  // The limiting character decides how many full words can be formed.
  return Math.min(
    cnt[1],
    cnt[0],
    Math.floor(cnt[11] / 2),
    Math.floor(cnt[14] / 2),
    cnt[13],
  );
}
