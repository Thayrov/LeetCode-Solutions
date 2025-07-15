/*
3136. Valid Word

A word is considered valid if:
It contains a minimum of 3 characters.
It contains only digits (0-9), and English letters (uppercase and lowercase).
It includes at least one vowel.
It includes at least one consonant.
You are given a string word.
Return true if word is valid, otherwise, return false.

Notes:
'a', 'e', 'i', 'o', 'u', and their uppercases are vowels.
A consonant is an English letter that is not a vowel.

Example 1:
Input: word = "234Adas"
Output: true
Explanation:
This word satisfies the conditions.

Example 2:
Input: word = "b3"
Output: false
Explanation:
The length of this word is fewer than 3, and does not have a vowel.

Example 3:
Input: word = "a3$e"
Output: false
Explanation:
This word contains a '$' character and does not have a consonant.

Constraints:
1 <= word.length <= 20
word consists of English uppercase and lowercase letters, digits, '@', '#', and '$'.

</> Typescript code:
*/

function isValid(word: string): boolean {
    // Early exit if length is less than 3 characters
    if (word.length < 3) return false;

    // Track if we've found at least one vowel and one consonant
    let hasVowel = false, hasConsonant = false;

    // Single pass through the string to check all conditions
    for (let i = 0; i < word.length; i++) {
        // Get character code for faster comparisons than string operations
        const c = word.charCodeAt(i);

        // Check if character is a digit (0-9: ASCII 48-57)
        if (c >= 48 && c <= 57) continue;

        // Check if character is a letter (A-Z: 65-90, a-z: 97-122)
        if ((c >= 65 && c <= 90) || (c >= 97 && c <= 122)) {
            // Convert to lowercase using bitwise OR with 32 (faster than toLowerCase)
            const lower = c | 32;

            // Check if lowercase character is a vowel (a=97, e=101, i=105, o=111, u=117)
            if (lower === 97 || lower === 101 || lower === 105 || lower === 111 || lower === 117) {
                hasVowel = true;
            } else {
                // If it's a letter but not a vowel, it's a consonant
                hasConsonant = true;
            }
        } else {
            // Character is not alphanumeric, so word is invalid
            return false;
        }
    }

    // Word is valid only if it has both vowels and consonants
    return hasVowel && hasConsonant;
}