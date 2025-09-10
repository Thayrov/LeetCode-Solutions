/*
1733. Minimum Number of People to Teach

On a social network consisting of m users and some friendships between users, two users can communicate with each other if they know a common language.
You are given an integer n, an array languages, and an array friendships where:
There are n languages numbered 1 through n,
languages[i] is the set of languages the ith user knows, and
friendships[i] = [ui, vi] denotes a friendship between the users ui and vi.
You can choose one language and teach it to some users so that all friends can communicate with each other. Return the minimum number of users you need to teach.
Note that friendships are not transitive, meaning if x is a friend of y and y is a friend of z, this doesn't guarantee that x is a friend of z.

Example 1:
Input: n = 2, languages = [[1],[2],[1,2]], friendships = [[1,2],[1,3],[2,3]]
Output: 1
Explanation: You can either teach user 1 the second language or user 2 the first language.

Example 2:
Input: n = 3, languages = [[2],[1,3],[1,2],[3]], friendships = [[1,4],[1,2],[3,4],[2,3]]
Output: 2
Explanation: Teach the third language to users 1 and 3, yielding two users to teach.

Constraints:
2 <= n <= 500
languages.length == m
1 <= m <= 500
1 <= languages[i].length <= n
1 <= languages[i][j] <= n
1 <= ui < vi <= languages.length
1 <= friendships.length <= 500
All tuples (ui, vi) are unique
languages[i] contains only unique values

</> Typescript code:
*/

function minimumTeachings(n: number, languages: number[][], friendships: number[][]): number {
    // Convert each user's language array into a Set for efficient O(1) average time lookups.
    const languageSets: Set<number>[] = languages.map(langs => new Set(langs));

    // A Set to store the 0-indexed IDs of users who are in at least one friendship where they can't communicate.
    const problematicUsers = new Set<number>();

    // Iterate through all friendships to find the ones that cannot communicate.
    for (const friendship of friendships) {
        // User IDs are 1-based, so subtract 1 for 0-based array indexing.
        const u = friendship[0] - 1;
        const v = friendship[1] - 1;

        // Get the language sets for the two users in the friendship.
        const setU = languageSets[u];
        const setV = languageSets[v];

        let canCommunicate = false;
        // Optimization: iterate over the smaller set and check for existence in the larger set.
        const [smallerSet, largerSet] = setU.size < setV.size ? [setU, setV] : [setV, setU];

        // Check if there is any common language.
        for (const lang of smallerSet) {
            if (largerSet.has(lang)) {
                canCommunicate = true; // Found a common language.
                break; // No need to check further for this pair.
            }
        }

        // If no common language was found, they can't communicate.
        if (!canCommunicate) {
            // Add both users to the set of problematic users.
            problematicUsers.add(u);
            problematicUsers.add(v);
        }
    }

    // If the set is empty, all friends can already communicate, so no teaching is needed.
    if (problematicUsers.size === 0) {
        return 0;
    }

    // Create a frequency map to count how many problematic users speak each language.
    const langFrequency = new Array(n + 1).fill(0);
    
    // Populate the frequency map.
    for (const user of problematicUsers) {
        // For each language the user knows...
        for (const lang of languageSets[user]) {
            // ...increment the count for that language.
            langFrequency[lang]++;
        }
    }

    // Find the language that is most common among the problematic users.
    let maxFreq = 0;
    for (let i = 1; i <= n; i++) {
        if (langFrequency[i] > maxFreq) {
            maxFreq = langFrequency[i];
        }
    }

    // The minimum number of users to teach is the total number of problematic users
    // minus the number of them who already know the most common language (maxFreq).
    return problematicUsers.size - maxFreq;
}
