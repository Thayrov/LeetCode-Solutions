/* 
2140. Solving Questions With Brainpower

You are given a 0-indexed 2D integer array questions where questions[i] = [pointsi, brainpoweri].

The array describes the questions of an exam, where you have to process the questions in order (i.e., starting from question 0) and make a decision whether to solve or skip each question. Solving question i will earn you pointsi points but you will be unable to solve each of the next brainpoweri questions. If you skip question i, you get to make the decision on the next question.

For example, given questions = [[3, 2], [4, 3], [4, 4], [2, 5]]:
If question 0 is solved, you will earn 3 points but you will be unable to solve questions 1 and 2.
If instead, question 0 is skipped and question 1 is solved, you will earn 4 points but you will be unable to solve questions 2 and 3.
Return the maximum points you can earn for the exam.

Example 1:
Input: questions = [[3,2],[4,3],[4,4],[2,5]]
Output: 5
Explanation: The maximum points can be earned by solving questions 0 and 3.
- Solve question 0: Earn 3 points, will be unable to solve the next 2 questions
- Unable to solve questions 1 and 2
- Solve question 3: Earn 2 points
Total points earned: 3 + 2 = 5. There is no other way to earn 5 or more points.

Example 2:
Input: questions = [[1,1],[2,2],[3,3],[4,4],[5,5]]
Output: 7
Explanation: The maximum points can be earned by solving questions 1 and 4.
- Skip question 0
- Solve question 1: Earn 2 points, will be unable to solve the next 2 questions
- Unable to solve questions 2 and 3
- Solve question 4: Earn 5 points
Total points earned: 2 + 5 = 7. There is no other way to earn 7 or more points.

Constraints:
1 <= questions.length <= 10^5
questions[i].length == 2
1 <= pointsi, brainpoweri <= 10^5

</> Typescript Code:
*/

function mostPoints(questions: number[][]): number {
  // Get the total number of questions.
  const n = questions.length;

  // Initialize a DP array `dp` of size n + 1 with zeros.
  // dp[i] will store the maximum points achievable starting from question index i.
  // dp[n] represents the case after the last question, so points are 0.
  const dp = new Array(n + 1).fill(0);

  // Iterate backwards from the second-to-last question (n-1) down to the first question (0).
  // This order ensures that when calculating dp[i], the values for dp[i+1] and dp[i + brainpower + 1]
  // (which correspond to future states) have already been computed.
  for (let i = n - 1; i >= 0; i--) {
    // Extract the points and brainpower for the current question i.
    const points = questions[i][0];
    const brainpower = questions[i][1];

    // Calculate the index of the next question that can be solved if question i is solved.
    // We skip `brainpower` questions, so the next available is i + brainpower + 1.
    const nextQuestionIndex = i + brainpower + 1;

    // Calculate the total points if we choose to solve the current question i.
    // This is the points of the current question plus the maximum points achievable
    // starting from the `nextQuestionIndex`.
    // We use `dp[nextQuestionIndex] ?? 0` to handle cases where `nextQuestionIndex`
    // is out of bounds (>= n). If it's out of bounds, it means no more questions can be solved,
    // so we add 0 points. Accessing `dp[n]` is valid and returns 0 as initialized.
    // Accessing indices > n implicitly uses 0 due to the nullish coalescing operator `??`.
    // Note: A more explicit check `(nextQuestionIndex < n ? dp[nextQuestionIndex] : 0)`
    // would also work and might be slightly clearer, but accessing `dp[n]` is fine.
    // Even better: If nextQuestionIndex >= n+1, dp[nextQuestionIndex] will be undefined -> ?? 0 kicks in.
    // If nextQuestionIndex == n, dp[n] is 0. So `dp[nextQuestionIndex] ?? 0` covers all cases correctly.
    const pointsIfSolved = points + (dp[nextQuestionIndex] ?? 0);

    // Calculate the total points if we choose to skip the current question i.
    // This is simply the maximum points achievable starting from the next question (i+1).
    // dp[i+1] has already been computed in the previous iteration of the loop.
    const pointsIfSkipped = dp[i + 1];

    // The maximum points achievable starting from question i (dp[i]) is the maximum
    // of the points obtained by either solving or skipping question i.
    dp[i] = Math.max(pointsIfSolved, pointsIfSkipped);
  }

  // The final answer is the maximum points achievable starting from the first question (index 0).
  return dp[0];
}
