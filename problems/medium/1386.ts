/*
1386. Cinema Seat Allocation

Hint
A cinema has n rows of seats, numbered from 1 to n. Each row has 10 seats, numbered from 1 to 10.
You are given a 2D integer array reservedSeats, where reservedSeats[i] = [rowi, seati] means that seat seati in row rowi is already reserved.
A four-person group must be assigned to four seats in the same row. The group can be seated in one of the following seat blocks:
seats 2, 3, 4, 5
seats 4, 5, 6, 7
seats 6, 7, 8, 9
A block can be used only if none of its seats are reserved. Each seat can be assigned to at most one group.
Return an integer denoting the maximum number of four-person groups that can be assigned.

Example 1:
Input: n = 3, reservedSeats = [[1,2],[1,3],[1,8],[2,6],[3,1],[3,10]]
Output: 4
Explanation: The figure above shows an optimal allocation of four groups. Seats marked in blue are already reserved, and each set of four contiguous seats marked in orange is assigned to one group.

Example 2:
Input: n = 2, reservedSeats = [[2,1],[1,8],[2,6]]
Output: 2

Example 3:
Input: n = 4, reservedSeats = [[4,3],[1,4],[4,6],[1,7]]
Output: 4

Constraints:
1 <= n <= 10^9
1 <= reservedSeats.length <= min(10 * n, 10^4)
reservedSeats[i] == [rowi, seati]
1 <= rowi <= n
1 <= seati <= 10
All reservedSeats[i] are distinct.

</> Typescript code:
*/

function maxNumberOfFamilies(n: number, reservedSeats: number[][]): number {
  // Stores a bitmask of relevant reserved seats for each affected row.
  const rows = new Map<number, number>();

  // Process every reserved seat.
  for (const [row, seat] of reservedSeats) {
    // Seats 1 and 10 never belong to any valid four-seat block,
    // so they cannot affect the answer.
    if (seat >= 2 && seat <= 9) {
      // Get the current bitmask for this row and mark this seat as reserved.
      rows.set(row, (rows.get(row) ?? 0) | (1 << seat));
    }
  }

  // Every row with no relevant reservations can always fit two families:
  // one in seats 2-5 and another in seats 6-9.
  let families = (n - rows.size) * 2;

  // Bitmask representing seats 2, 3, 4, and 5.
  const left = (1 << 2) | (1 << 3) | (1 << 4) | (1 << 5);

  // Bitmask representing seats 4, 5, 6, and 7.
  const middle = (1 << 4) | (1 << 5) | (1 << 6) | (1 << 7);

  // Bitmask representing seats 6, 7, 8, and 9.
  const right = (1 << 6) | (1 << 7) | (1 << 8) | (1 << 9);

  // Only rows containing relevant reservations require explicit checking.
  for (const mask of rows.values()) {
    // If both non-overlapping outer blocks are free,
    // this row can hold two families.
    if ((mask & left) === 0 && (mask & right) === 0) {
      families += 2;
      // Otherwise, if any valid block is free,
      // exactly one family can be seated in this row.
    } else if (
      (mask & left) === 0 ||
      (mask & middle) === 0 ||
      (mask & right) === 0
    ) {
      // Add the single family that fits.
      families++;
    }
  }

  // Return the maximum number of four-person families that can be seated.
  return families;
}
