/*
3635. Earliest Finish Time for Land and Water Rides II

Hint
You are given two categories of theme park attractions: land rides and water rides.
Land rides
landStartTime[i] – the earliest time the ith land ride can be boarded.
landDuration[i] – how long the ith land ride lasts.
Water rides
waterStartTime[j] – the earliest time the jth water ride can be boarded.
waterDuration[j] – how long the jth water ride lasts.
A tourist must experience exactly one ride from each category, in either order.
A ride may be started at its opening time or any later moment.
If a ride is started at time t, it finishes at time t + duration.
Immediately after finishing one ride the tourist may board the other (if it is already open) or wait until it opens.
Return the earliest possible time at which the tourist can finish both rides.

Example 1:
Input: landStartTime = [2,8], landDuration = [4,1], waterStartTime = [6], waterDuration = [3]
Output: 9
Explanation:​​​​​​​
Plan A (land ride 0 → water ride 0):
Start land ride 0 at time landStartTime[0] = 2. Finish at 2 + landDuration[0] = 6.
Water ride 0 opens at time waterStartTime[0] = 6. Start immediately at 6, finish at 6 + waterDuration[0] = 9.
Plan B (water ride 0 → land ride 1):
Start water ride 0 at time waterStartTime[0] = 6. Finish at 6 + waterDuration[0] = 9.
Land ride 1 opens at landStartTime[1] = 8. Start at time 9, finish at 9 + landDuration[1] = 10.
Plan C (land ride 1 → water ride 0):
Start land ride 1 at time landStartTime[1] = 8. Finish at 8 + landDuration[1] = 9.
Water ride 0 opened at waterStartTime[0] = 6. Start at time 9, finish at 9 + waterDuration[0] = 12.
Plan D (water ride 0 → land ride 0):
Start water ride 0 at time waterStartTime[0] = 6. Finish at 6 + waterDuration[0] = 9.
Land ride 0 opened at landStartTime[0] = 2. Start at time 9, finish at 9 + landDuration[0] = 13.
Plan A gives the earliest finish time of 9.

Example 2:
Input: landStartTime = [5], landDuration = [3], waterStartTime = [1], waterDuration = [10]
Output: 14
Explanation:​​​​​​​
Plan A (water ride 0 → land ride 0):
Start water ride 0 at time waterStartTime[0] = 1. Finish at 1 + waterDuration[0] = 11.
Land ride 0 opened at landStartTime[0] = 5. Start immediately at 11 and finish at 11 + landDuration[0] = 14.
Plan B (land ride 0 → water ride 0):
Start land ride 0 at time landStartTime[0] = 5. Finish at 5 + landDuration[0] = 8.
Water ride 0 opened at waterStartTime[0] = 1. Start immediately at 8 and finish at 8 + waterDuration[0] = 18.
Plan A provides the earliest finish time of 14.​​​​​​​

Constraints:
1 <= n, m <= 5 * 10^4
landStartTime.length == landDuration.length == n
waterStartTime.length == waterDuration.length == m
1 <= landStartTime[i], landDuration[i], waterStartTime[j], waterDuration[j] <= 10^5

</> Typescript code:
*/

function earliestFinishTime(
  landStartTime: number[],
  landDuration: number[],
  waterStartTime: number[],
  waterDuration: number[],
): number {
  // Solves best finish time when category A is taken first and category B second.
  const solve = (
    aS: number[],
    aD: number[],
    bS: number[],
    bD: number[],
  ): number => {
    // Pair each second-category ride as [startTime, duration], then sort by start time.
    const b: number[][] = bS
      .map((s, i) => [s, bD[i]])
      .sort((x, y) => x[0] - y[0]);

    // Store number of second-category rides.
    const n = b.length;

    // starts[i] stores sorted start times for binary search.
    const starts = new Array<number>(n);

    // pref[i] stores minimum duration among rides from 0..i.
    const pref = new Array<number>(n);

    // suff[i] stores minimum start + duration among rides from i..n-1.
    const suff = new Array<number>(n);

    // Build start array and prefix minimum duration.
    for (let i = 0; i < n; i++) {
      // Save sorted start time.
      starts[i] = b[i][0];

      // Minimum duration among all second rides opening no later than current index.
      pref[i] = i ? Math.min(pref[i - 1], b[i][1]) : b[i][1];
    }

    // Build suffix minimum finish time if second ride starts after first ride finishes.
    for (let i = n - 1; i >= 0; i--) {
      // Best direct finish time start + duration among rides from i onward.
      suff[i] =
        i === n - 1
          ? b[i][0] + b[i][1]
          : Math.min(suff[i + 1], b[i][0] + b[i][1]);
    }

    // Track minimum answer for this order.
    let ans = Infinity;

    // Try each first-category ride.
    for (let i = 0; i < aS.length; i++) {
      // Earliest finish time after taking this first ride.
      const t = aS[i] + aD[i];

      // Binary search first second-category ride with start time greater than t.
      let l = 0,
        r = n;

      // Standard lower_bound for starts[i] > t.
      while (l < r) {
        // Middle index.
        const mid = (l + r) >> 1;

        // Ride already open by time t, so move right.
        if (starts[mid] <= t) l = mid + 1;
        // Ride opens after t, so keep left half.
        else r = mid;
      }

      // If some second rides are already open, take the one with minimum duration.
      if (l > 0) ans = Math.min(ans, t + pref[l - 1]);

      // If some second rides open later, best finish is minimum start + duration.
      if (l < n) ans = Math.min(ans, suff[l]);
    }

    // Return best finish for this order.
    return ans;
  };

  // Minimum of land→water and water→land.
  return Math.min(
    solve(landStartTime, landDuration, waterStartTime, waterDuration),
    solve(waterStartTime, waterDuration, landStartTime, landDuration),
  );
}
