/*
2327. Number of People Aware of a Secret

On day 1, one person discovers a secret.
You are given an integer delay, which means that each person will share the secret with a new person every day, starting from delay days after discovering the secret. You are also given an integer forget, which means that each person will forget the secret forget days after discovering it. A person cannot share the secret on the same day they forgot it, or on any day afterwards.
Given an integer n, return the number of people who know the secret at the end of day n. Since the answer may be very large, return it modulo 109 + 7.

Example 1:
Input: n = 6, delay = 2, forget = 4
Output: 5
Explanation:
Day 1: Suppose the first person is named A. (1 person)
Day 2: A is the only person who knows the secret. (1 person)
Day 3: A shares the secret with a new person, B. (2 people)
Day 4: A shares the secret with a new person, C. (3 people)
Day 5: A forgets the secret, and B shares the secret with a new person, D. (3 people)
Day 6: B shares the secret with E, and C shares the secret with F. (5 people)

Example 2:
Input: n = 4, delay = 1, forget = 3
Output: 6
Explanation:
Day 1: The first person is named A. (1 person)
Day 2: A shares the secret with B. (2 people)
Day 3: A and B share the secret with 2 new people, C and D. (4 people)
Day 4: A forgets the secret. B, C, and D share the secret with 3 new people. (6 people)
 
Constraints:
2 <= n <= 1000
1 <= delay < forget <= n

</> Typescript code:
*/

function peopleAwareOfSecret(n: number, delay: number, forget: number): number {
    // Define the modulo constant as required by the problem
    const MOD = 1000000007;
    
    // dp[i] represents the number of new people who discover the secret on day i
    const dp = new Array(n + 1).fill(0);
    
    // On day 1, exactly 1 person discovers the secret
    dp[1] = 1;
    
    // Track the number of people currently sharing the secret
    // This is a running sum that gets updated as people start/stop sharing
    let sharing = 0;
    
    // Process each day from day 2 to day n
    for (let day = 2; day <= n; day++) {
        // Add people who start sharing today (discovered 'delay' days ago)
        if (day > delay) {
            sharing = (sharing + dp[day - delay]) % MOD;
        }
        
        // Remove people who stop sharing today (discovered 'forget' days ago)
        // They forget the secret, so they stop sharing
        if (day > forget) {
            sharing = (sharing - dp[day - forget] + MOD) % MOD;
        }
        
        // The number of new people discovering the secret today equals
        // the number of people currently sharing
        dp[day] = sharing;
    }
    
    // Calculate the final result: sum of people who still remember the secret
    // These are people who discovered the secret in the last 'forget-1' days
    let result = 0;
    
    // Start from the earliest day where people still remember
    // and sum up to day n
    for (let i = Math.max(1, n - forget + 1); i <= n; i++) {
        result = (result + dp[i]) % MOD;
    }
    
    return result;
}
