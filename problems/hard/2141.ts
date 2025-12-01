/*
2141. Maximum Running Time of N Computers

You have n computers. You are given the integer n and a 0-indexed integer array batteries where the ith battery can run a computer for batteries[i] minutes. You are interested in running all n computers simultaneously using the given batteries.
Initially, you can insert at most one battery into each computer. After that and at any integer time moment, you can remove a battery from a computer and insert another battery any number of times. The inserted battery can be a totally new battery or a battery from another computer. You may assume that the removing and inserting processes take no time.
Note that the batteries cannot be recharged.
Return the maximum number of minutes you can run all the n computers simultaneously.

Example 1:
Input: n = 2, batteries = [3,3,3]
Output: 4
Explanation: 
Initially, insert battery 0 into the first computer and battery 1 into the second computer.
After two minutes, remove battery 1 from the second computer and insert battery 2 instead. Note that battery 1 can still run for one minute.
At the end of the third minute, battery 0 is drained, and you need to remove it from the first computer and insert battery 1 instead.
By the end of the fourth minute, battery 1 is also drained, and the first computer is no longer running.
We can run the two computers simultaneously for at most 4 minutes, so we return 4.

Example 2:
Input: n = 2, batteries = [1,1,1,1]
Output: 2
Explanation: 
Initially, insert battery 0 into the first computer and battery 2 into the second computer. 
After one minute, battery 0 and battery 2 are drained so you need to remove them and insert battery 1 into the first computer and battery 3 into the second computer. 
After another minute, battery 1 and battery 3 are also drained so the first and second computers are no longer running.
We can run the two computers simultaneously for at most 2 minutes, so we return 2.

Constraints:
1 <= n <= batteries.length <= 10^5
1 <= batteries[i] <= 10^9

</> Typescript code:
*/

function maxRunTime(n: number, batteries: number[]): number {
    // Binary search bounds: minimum time is 0, maximum is total power divided by n computers
    // This represents the theoretical maximum if we could perfectly distribute all battery power
    let left = 0;
    let right = Math.floor(batteries.reduce((sum, b) => sum + b, 0) / n);
    
    // Binary search to find the maximum runtime where all n computers can run simultaneously
    while (left < right) {
        // Use (left + right + 1) / 2 to avoid infinite loop in upper bound binary search
        let mid = Math.floor((left + right + 1) / 2);
        
        // Calculate total usable power if we try to run for 'mid' minutes
        // For each battery, we can use at most 'mid' minutes of its power
        let totalPower = 0;
        for (let battery of batteries) {
            // If battery > mid, we can only use 'mid' minutes from it for one computer
            // If battery <= mid, we can use all of it and distribute across computers
            totalPower += Math.min(battery, mid);
        }
        
        // Check if total usable power is sufficient to run n computers for mid minutes
        // We need n * mid total minutes of power
        if (totalPower >= n * mid) {
            // If we have enough power, try a longer runtime
            left = mid;
        } else {
            // If we don't have enough power, try a shorter runtime
            right = mid - 1;
        }
    }
    
    // Return the maximum valid runtime found
    return left;
}
