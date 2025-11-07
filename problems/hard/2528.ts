/*
2528. Maximize the Minimum Powered City

You are given a 0-indexed integer array stations of length n, where stations[i] represents the number of power stations in the ith city.
Each power station can provide power to every city in a fixed range. In other words, if the range is denoted by r, then a power station at city i can provide power to all cities j such that |i - j| <= r and 0 <= i, j <= n - 1.
    Note that |x| denotes absolute value. For example, |7 - 5| = 2 and |3 - 10| = 7.
The power of a city is the total number of power stations it is being provided power from.
The government has sanctioned building k more power stations, each of which can be built in any city, and have the same range as the pre-existing ones.
Given the two integers r and k, return the maximum possible minimum power of a city, if the additional power stations are built optimally.
Note that you can build the k power stations in multiple cities.

Example 1:
Input: stations = [1,2,4,5,0], r = 1, k = 2
Output: 5
Explanation: 
One of the optimal ways is to install both the power stations at city 1. 
So stations will become [1,4,4,5,0].
- City 0 is provided by 1 + 4 = 5 power stations.
- City 1 is provided by 1 + 4 + 4 = 9 power stations.
- City 2 is provided by 4 + 4 + 5 = 13 power stations.
- City 3 is provided by 5 + 4 = 9 power stations.
- City 4 is provided by 5 + 0 = 5 power stations.
So the minimum power of a city is 5.
Since it is not possible to obtain a larger power, we return 5.

Example 2:
Input: stations = [4,4,4,4], r = 0, k = 3
Output: 4
Explanation: 
It can be proved that we cannot make the minimum power of a city greater than 4.

Constraints:
    n == stations.length
    1 <= n <= 10^5
    0 <= stations[i] <= 10^5
    0 <= r <= n - 1
    0 <= k <= 10^9

</> Typescript code:
*/

function maxPower(stations: number[], r: number, k: number): number {
    const n = stations.length;
    // Store initial power for each city
    const power = new Array(n).fill(0);
    
    // Calculate initial power for city 0 using range [0, min(n-1, r)]
    let sum = 0;
    for (let j = 0; j <= Math.min(n - 1, r); j++) {
        sum += stations[j];
    }
    power[0] = sum;
    
    // Calculate initial power for remaining cities using sliding window
    for (let i = 1; i < n; i++) {
        // Remove station leaving the window on the left
        if (i - r - 1 >= 0) sum -= stations[i - r - 1];
        // Add station entering the window on the right
        if (i + r < n) sum += stations[i + r];
        power[i] = sum;
    }
    
    // Check if we can achieve minPower with k additional stations
    const canAchieve = (minPower: number): boolean => {
        // Track number of stations added at each position
        const added = new Array(n).fill(0);
        let used = 0;
        // Running sum of added stations affecting current city
        let addedSum = 0;
        
        // Process each city from left to right
        for (let i = 0; i < n; i++) {
            // Update sliding window of added stations for city i
            if (i > 0) {
                const leftOut = i - r - 1;
                const rightIn = i + r;
                // Remove added stations leaving window on left
                if (leftOut >= 0) addedSum -= added[leftOut];
                // Add stations entering window on right
                if (rightIn < n) addedSum += added[rightIn];
            }
            
            // Calculate current total power (original + added)
            const current = power[i] + addedSum;
            
            // If below target, add stations
            if (current < minPower) {
                const need = minPower - current;
                used += need;
                // Check budget constraint
                if (used > k) return false;
                // Place stations at rightmost position to maximize future coverage
                const pos = Math.min(i + r, n - 1);
                added[pos] += need;
                // Update running sum (pos is always in current city's range)
                addedSum += need;
            }
        }
        return true;
    };
    
    // Binary search for maximum achievable minimum power
    let left = Math.min(...power);
    let right = left + k;
    
    while (left < right) {
        const mid = Math.floor((left + right + 1) / 2);
        if (canAchieve(mid)) {
            left = mid;
        } else {
            right = mid - 1;
        }
    }
    
    return left;
}
