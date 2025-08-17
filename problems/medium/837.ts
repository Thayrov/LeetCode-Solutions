/*
837. New 21 Game

Alice plays the following game, loosely based on the card game "21".
Alice starts with 0 points and draws numbers while she has less than k points. During each draw, she gains an integer number of points randomly from the range [1, maxPts], where maxPts is an integer. Each draw is independent and the outcomes have equal probabilities.
Alice stops drawing numbers when she gets k or more points.
Return the probability that Alice has n or fewer points.
Answers within 10-5 of the actual answer are considered accepted.

Example 1:
Input: n = 10, k = 1, maxPts = 10
Output: 1.00000
Explanation: Alice gets a single card, then stops.

Example 2:
Input: n = 6, k = 1, maxPts = 10
Output: 0.60000
Explanation: Alice gets a single card, then stops.
In 6 out of 10 possibilities, she is at or below 6 points.

Example 3:
Input: n = 21, k = 17, maxPts = 10
Output: 0.73278

Constraints:
0 <= k <= n <= 10^4
1 <= maxPts <= 10^4

</> Typescript code:
*/

function new21Game(n: number, k: number, maxPts: number): number {
    // Edge Case Optimization: If k is 0, Alice doesn't draw. Her score is 0. Since n >= k, the probability is 1.
    // Also, if n is greater than or equal to the maximum possible score (k - 1 + maxPts),
    // her final score will always be less than or equal to n, so the probability is 1.
    if (k === 0 || n >= k + maxPts - 1) {
        return 1.0;
    }

    // dp[i] will store the probability of having exactly i points.
    const dp = new Array(n + 1).fill(0);

    // The base case: Alice starts with 0 points with a probability of 1.
    dp[0] = 1.0;

    // This variable maintains the sum of probabilities for the last `maxPts` scores,
    // which is used to calculate the next dp value in O(1). It's a sliding window sum.
    // It's initialized with dp[0] as that's the first state from which Alice can draw.
    let windowSum = 1.0;

    // This variable will accumulate the probabilities of all valid final scores (from k to n).
    let result = 0.0;

    // Iterate from score 1 up to n to calculate the probability for each score.
    for (let i = 1; i <= n; i++) {
        // The probability of reaching score `i` is the sum of probabilities of the scores
        // in the window [i-maxPts, i-1] divided by the number of possible outcomes (maxPts).
        dp[i] = windowSum / maxPts;

        // If the current score `i` is less than k, Alice continues to draw.
        // Therefore, the probability dp[i] contributes to reaching future scores.
        // We add it to our sliding window sum.
        if (i < k) {
            windowSum += dp[i];
        } else {
            // If the current score `i` is k or more, Alice stops drawing.
            // This is a possible final score. Since `i <= n`, we add its probability to our result.
            result += dp[i];
        }

        // To maintain the sliding window, we subtract the probability of the score that just
        // fell out of the window [i-maxPts, i-1]. This happens when i becomes large enough.
        // We only ever added dp[j] to windowSum if j < k, so we don't need to re-check that condition here.
        if (i >= maxPts) {
            windowSum -= dp[i - maxPts];
        }
    }

    // Return the total accumulated probability of ending with a score between k and n.
    return result;
}
