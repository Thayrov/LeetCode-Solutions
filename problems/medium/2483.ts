/*
2483. Minimum Penalty for a Shop

You are given the customer visit log of a shop represented by a 0-indexed string customers consisting only of characters 'N' and 'Y':
if the ith character is 'Y', it means that customers come at the ith hour
whereas 'N' indicates that no customers come at the ith hour.
If the shop closes at the jth hour (0 <= j <= n), the penalty is calculated as follows:
For every hour when the shop is open and no customers come, the penalty increases by 1.
For every hour when the shop is closed and customers come, the penalty increases by 1.
Return the earliest hour at which the shop must be closed to incur a minimum penalty.

Note that if a shop closes at the jth hour, it means the shop is closed at the hour j.

Example 1:
Input: customers = "YYNY"
Output: 2
Explanation: 
- Closing the shop at the 0th hour incurs in 1+1+0+1 = 3 penalty.
- Closing the shop at the 1st hour incurs in 0+1+0+1 = 2 penalty.
- Closing the shop at the 2nd hour incurs in 0+0+0+1 = 1 penalty.
- Closing the shop at the 3rd hour incurs in 0+0+1+1 = 2 penalty.
- Closing the shop at the 4th hour incurs in 0+0+1+0 = 1 penalty.
Closing the shop at 2nd or 4th hour gives a minimum penalty. Since 2 is earlier, the optimal closing time is 2.

Example 2:
Input: customers = "NNNNN"
Output: 0
Explanation: It is best to close the shop at the 0th hour as no customers arrive.

Example 3:
Input: customers = "YYYY"
Output: 4
Explanation: It is best to close the shop at the 4th hour as customers arrive at each hour.

Constraints:
1 <= customers.length <= 10^5
customers consists only of characters 'Y' and 'N'.

</> Typescript code:
*/

function bestClosingTime(customers: string): number {
    // Stores the lowest relative penalty encountered so far
    let minPenalty = 0;
    // Tracks the penalty score as we iterate through each hour
    let currentPenalty = 0;
    // Stores the index of the hour that resulted in the minimum penalty
    let bestHour = 0;

    // Iterate through the customer log once (O(n) complexity)
    for (let i = 0; i < customers.length; i++) {
        // If a customer arrives ('Y') while we are open, the penalty 
        // decreases compared to if we had closed before this hour.
        if (customers[i] === 'Y') {
            currentPenalty--;
        } 
        // If no customer arrives ('N') while we are open, 
        // we incur a penalty for being open unnecessarily.
        else {
            currentPenalty++;
        }

        // If the current configuration is strictly better than our previous best,
        // update minPenalty and mark this hour (i + 1) as the new best closing time.
        // We use '<' instead of '<=' to ensure we return the EARLIEST hour.
        if (currentPenalty < minPenalty) {
            minPenalty = currentPenalty;
            bestHour = i + 1;
        }
    }

    // Return the optimal hour to close the shop
    return bestHour;
}
