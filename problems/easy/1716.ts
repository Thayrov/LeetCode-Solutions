/*
1716. Calculate Money in Leetcode Bank

Hercy wants to save money for his first car. He puts money in the Leetcode bank every day.
He starts by putting in $1 on Monday, the first day. Every day from Tuesday to Sunday, he will put in $1 more than the day before. On every subsequent Monday, he will put in $1 more than the previous Monday.
Given n, return the total amount of money he will have in the Leetcode bank at the end of the nth day.

Example 1:
Input: n = 4
Output: 10
Explanation: After the 4th day, the total is 1 + 2 + 3 + 4 = 10.
Example 2:
Input: n = 10
Output: 37
Explanation: After the 10th day, the total is (1 + 2 + 3 + 4 + 5 + 6 + 7) + (2 + 3 + 4) = 37. Notice that on the 2nd Monday, Hercy only puts in $2.

Example 3:
Input: n = 20
Output: 96
Explanation: After the 20th day, the total is (1 + 2 + 3 + 4 + 5 + 6 + 7) + (2 + 3 + 4 + 5 + 6 + 7 + 8) + (3 + 4 + 5 + 6 + 7 + 8) = 96.
 
Constraints:
1 <= n <= 1000

</> Typescript code:
*/

function totalMoney(n: number): number {
    // Calculate the number of complete 7-day weeks.
    const fullWeeks = Math.floor(n / 7);
    
    // Calculate the number of remaining days after the full weeks.
    const remainingDays = n % 7;

    // Calculate the total for the full weeks.
    // The weekly totals form an arithmetic progression:
    // Week 1: 1+2+3+4+5+6+7 = 28
    // Week 2: 2+3+4+5+6+7+8 = 35
    // Week 3: 3+4+5+6+7+8+9 = 42
    // This is a series with first term a1 = 28, common difference d = 7, and n = fullWeeks.
    // We use the arithmetic series sum formula: S_n = (n/2) * (2*a1 + (n-1)*d)
    const totalForFullWeeks = (fullWeeks / 2) * (2 * 28 + (fullWeeks - 1) * 7);
    
    // Calculate the starting amount for the remaining days.
    // This is the amount deposited on the Monday of the (fullWeeks + 1)-th week.
    const startMoneyForRemainder = fullWeeks + 1;
    
    // Calculate the total for the remaining days.
    // This is also an arithmetic progression:
    // Day 1: startMoneyForRemainder
    // Day 2: startMoneyForRemainder + 1
    // ...
    // This is a series with a1 = startMoneyForRemainder, d = 1, and n = remainingDays.
    // We use the same sum formula: S_n = (n/2) * (2*a1 + (n-1)*d)
    const totalForRemainingDays = (remainingDays / 2) * (2 * startMoneyForRemainder + (remainingDays - 1));

    // The final total is the sum of the money from the full weeks and the remaining days.
    return totalForFullWeeks + totalForRemainingDays;
};
