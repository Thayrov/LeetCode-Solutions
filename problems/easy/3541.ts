/*
3541. Find Most Frequent Vowel and Consonant

You are given a string s consisting of lowercase English letters ('a' to 'z').
Your task is to:
Find the vowel (one of 'a', 'e', 'i', 'o', or 'u') with the maximum frequency.
Find the consonant (all other letters excluding vowels) with the maximum frequency.
Return the sum of the two frequencies.
Note: If multiple vowels or consonants have the same maximum frequency, you may choose any one of them. If there are no vowels or no consonants in the string, consider their frequency as 0.
The frequency of a letter x is the number of times it occurs in the string.
 
Example 1:
Input: s = "successes"
Output: 6
Explanation:
The vowels are: 'u' (frequency 1), 'e' (frequency 2). The maximum frequency is 2.
The consonants are: 's' (frequency 4), 'c' (frequency 2). The maximum frequency is 4.
The output is 2 + 4 = 6.

Example 2:
Input: s = "aeiaeia"
Output: 3
Explanation:
The vowels are: 'a' (frequency 3), 'e' ( frequency 2), 'i' (frequency 2). The maximum frequency is 3.
There are no consonants in s. Hence, maximum consonant frequency = 0.
The output is 3 + 0 = 3.
 
Constraints:
1 <= s.length <= 100
s consists of lowercase English letters only.

</> Typescript code:
*/

function maxFreqSum(s: string): number {
    // Create an integer array of size 26, initialized to all zeros, to store the frequency of each letter from 'a' to 'z'.
    const freqs = new Array(26).fill(0);
    
    // Create a boolean array to quickly check if a character at a given index (0-25) is a vowel.
    // Indices correspond to 'a' through 'z'. 'a'(0), 'e'(4), 'i'(8), 'o'(14), 'u'(20) are marked as true.
    const isVowel = [
        true, false, false, false, true, false, false, false, true, false, 
        false, false, false, false, true, false, false, false, false, false, 
        true, false, false, false, false, false
    ];

    // Iterate through the input string to populate the frequency array.
    for (let i = 0; i < s.length; i++) {
        // Get the ASCII code of the character, subtract 97 (ASCII for 'a') to get a 0-25 index, and increment the count at that index.
        freqs[s.charCodeAt(i) - 97]++;
    }
    
    // Initialize a variable to store the maximum frequency found for any vowel.
    let maxVowelFreq = 0;
    // Initialize a variable to store the maximum frequency found for any consonant.
    let maxConsonantFreq = 0;
    
    // Iterate from 0 to 25, representing each letter of the alphabet.
    for (let i = 0; i < 26; i++) {
        // Check if the letter corresponding to the current index 'i' is a vowel using the lookup array.
        if (isVowel[i]) {
            // If it's a vowel, check if its frequency is greater than the current max vowel frequency.
            if (freqs[i] > maxVowelFreq) {
                // If it is, update the max vowel frequency.
                maxVowelFreq = freqs[i];
            }
        } else {
            // If it's a consonant, check if its frequency is greater than the current max consonant frequency.
            if (freqs[i] > maxConsonantFreq) {
                // If it is, update the max consonant frequency.
                maxConsonantFreq = freqs[i];
            }
        }
    }
    
    // Return the sum of the maximum vowel frequency and the maximum consonant frequency.
    return maxVowelFreq + maxConsonantFreq;
}
