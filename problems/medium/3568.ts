/*
3568. Minimum Moves to Clean the Classroom

You are given an m x n grid classroom where a student volunteer is tasked with cleaning up litter scattered around the room. Each cell in the grid is one of the following:

'S': Starting position of the student
'L': Litter that must be collected (once collected, the cell becomes empty)
'R': Reset area that restores the student's energy to full capacity, regardless of their current energy level (can be used multiple times)
'X': Obstacle the student cannot pass through
'.': Empty space

You are also given an integer energy, representing the student's maximum energy capacity. The student starts with this energy from the starting position 'S'.

Each move to an adjacent cell (up, down, left, or right) costs 1 unit of energy. If the energy reaches 0, the student can only continue if they are on a reset area 'R', which resets the energy to its maximum capacity energy.

Return the minimum number of moves required to collect all litter items, or -1 if it's impossible.

Example 1:
Input: classroom = ["S.", "XL"], energy = 2
Output: 2
Explanation:
The student starts at cell (0, 0) with 2 units of energy.
Since cell (1, 0) contains an obstacle 'X', the student cannot move directly downward.
A valid sequence of moves to collect all litter is as follows:
Move 1: From (0, 0) → (0, 1) with 1 unit of energy and 1 unit remaining.
Move 2: From (0, 1) → (1, 1) to collect the litter 'L'.
The student collects all the litter using 2 moves. Thus, the output is 2.

Example 2:
Input: classroom = ["LS", "RL"], energy = 4
Output: 3
Explanation:
The student starts at cell (0, 1) with 4 units of energy.
A valid sequence of moves to collect all litter is as follows:
Move 1: From (0, 1) → (0, 0) to collect the first litter 'L' with 1 unit of energy used and 3 units remaining.
Move 2: From (0, 0) → (1, 0) to 'R' to reset and restore energy back to 4.
Move 3: From (1, 0) → (1, 1) to collect the second litter 'L'.
The student collects all the litter using 3 moves. Thus, the output is 3.

Example 3:
Input: classroom = ["L.S", "RXL"], energy = 3
Output: -1
Explanation:
No valid path collects all 'L'.

Constraints:
1 <= m == classroom.length <= 20
1 <= n == classroom[i].length <= 20
classroom[i][j] is one of 'S', 'L', 'R', 'X', or '.'.
1 <= energy <= 50
There is exactly one 'S' in the grid.
There are at most 10 'L' cells in the grid.

</> Typescript code:
*/

function minMoves(classroom: string[], energy: number): number {
  // Cache the grid dimensions and flattened cell count.
  const rows = classroom.length;
  const cols = classroom[0].length;
  const cells = rows * cols;
  // Map each litter cell to its collection bit.
  const litterBit = new Int16Array(cells);
  // Mark obstacles for constant-time traversal checks.
  const blocked = new Uint8Array(cells);
  // Mark energy-reset cells.
  const reset = new Uint8Array(cells);
  // Track the flattened starting position.
  let start = 0;
  // Count litter cells while assigning their bits.
  let litterCount = 0;

  // Scan every cell once to encode its relevant property.
  for (let row = 0; row < rows; ++row) {
    // Traverse the current row.
    for (let col = 0; col < cols; ++col) {
      // Flatten the cell coordinates into one index.
      const position = row * cols + col;
      // Read the cell as a numeric character code.
      const cell = classroom[row].charCodeAt(col);
      // Record the unique starting cell.
      if (cell === 83) start = position;
      // Assign the next bit to a litter cell.
      else if (cell === 76) litterBit[position] = 1 << litterCount++;
      // Mark a reset cell.
      else if (cell === 82) reset[position] = 1;
      // Mark an obstacle cell.
      else if (cell === 88) blocked[position] = 1;
    }
  }

  // Build the mask representing all collected litter.
  const fullMask = (1 << litterCount) - 1;
  // Require no moves when the classroom has no litter.
  if (fullMask === 0) return 0;

  // Store each traversable cell's neighbor count.
  const degree = new Uint8Array(cells);
  // Store up to four flattened neighbors per cell.
  const neighbors = new Int16Array(cells * 4);

  // Precompute valid grid edges to avoid repeated boundary checks during BFS.
  for (let row = 0; row < rows; ++row) {
    // Traverse the current row's cells.
    for (let col = 0; col < cols; ++col) {
      // Flatten the current coordinates.
      const position = row * cols + col;
      // Skip obstacle cells because they are never entered.
      if (blocked[position]) continue;
      // Locate this cell's four-slot adjacency block.
      const base = position * 4;
      // Add the upper neighbor when traversable.
      if (row > 0 && !blocked[position - cols])
        neighbors[base + degree[position]++] = position - cols;
      // Add the lower neighbor when traversable.
      if (row + 1 < rows && !blocked[position + cols])
        neighbors[base + degree[position]++] = position + cols;
      // Add the left neighbor when traversable.
      if (col > 0 && !blocked[position - 1])
        neighbors[base + degree[position]++] = position - 1;
      // Add the right neighbor when traversable.
      if (col + 1 < cols && !blocked[position + 1])
        neighbors[base + degree[position]++] = position + 1;
    }
  }

  // Count all flattened (litter mask, position) states.
  const stateCount = cells << litterCount;
  // Retain the greatest energy seen for each state as its dominance frontier.
  const best = new Int8Array(stateCount);
  // Mark every state as initially unseen while preserving zero as valid energy.
  best.fill(-1);

  // Allocate the current BFS layer's unique state keys.
  let currentKeys = new Int32Array(stateCount);
  // Allocate the next BFS layer's unique state keys.
  let nextKeys = new Int32Array(stateCount);
  // Store current-layer energy by flattened state key.
  let currentEnergy = new Uint8Array(stateCount);
  // Store next-layer energy by flattened state key.
  let nextEnergy = new Uint8Array(stateCount);
  // Stamp states to deduplicate each generated BFS layer without clearing memory.
  const queuedGeneration = new Int32Array(stateCount);

  // Seed the current layer with the starting state and empty litter mask.
  currentKeys[0] = start;
  // Give the starting state the full energy capacity.
  currentEnergy[start] = energy;
  // Establish the starting state's dominance value.
  best[start] = energy;

  // Track the number of states in the current BFS layer.
  let currentSize = 1;
  // Track the moves represented by the current layer.
  let moves = 0;
  // Give each generated layer a distinct deduplication stamp.
  let generation = 0;

  // Explore increasing move counts until no reachable state remains.
  while (currentSize > 0) {
    // Start the next layer empty.
    let nextSize = 0;
    // Advance the stamp used for this next layer.
    ++generation;

    // Expand every unique state in the current layer.
    for (let index = 0; index < currentSize; ++index) {
      // Read the flattened (mask, position) key.
      const key = currentKeys[index];
      // Read the exact energy retained for this layer's state.
      const remaining = currentEnergy[key];
      // Prevent movement from a depleted non-reset state.
      if (remaining === 0) continue;

      // Recover the litter mask from the flattened state key.
      const mask = Math.floor(key / cells);
      // Recover the grid position from the flattened state key.
      const position = key - mask * cells;
      // Locate the position's precomputed adjacency block.
      const base = position * 4;

      // Try every traversable adjacent cell.
      for (let edge = 0; edge < degree[position]; ++edge) {
        // Read the adjacent flattened position.
        const nextPosition = neighbors[base + edge];
        // Collect litter at the destination when present.
        const nextMask = mask | litterBit[nextPosition];
        // Return immediately because BFS guarantees the first completion is shortest.
        if (nextMask === fullMask) return moves + 1;

        // Spend one energy, or refill completely upon entering a reset cell.
        const nextRemaining = reset[nextPosition] ? energy : remaining - 1;
        // Flatten the destination mask and position into one state key.
        const nextKey = nextMask * cells + nextPosition;
        // Discard a state dominated by an equal-or-higher-energy earlier arrival.
        if (nextRemaining <= best[nextKey]) continue;

        // Raise the global energy frontier for this state.
        best[nextKey] = nextRemaining;
        // Add this state key only once to the next layer.
        if (queuedGeneration[nextKey] !== generation) {
          // Mark the key as queued for this generation.
          queuedGeneration[nextKey] = generation;
          // Append the unique key to the next-layer list.
          nextKeys[nextSize++] = nextKey;
        }
        // Preserve the best energy found for this key within the next layer.
        nextEnergy[nextKey] = nextRemaining;
      }
    }

    // Promote the generated keys and recycle the previous key buffer.
    [currentKeys, nextKeys] = [nextKeys, currentKeys];
    // Promote the generated energies and recycle the previous energy buffer.
    [currentEnergy, nextEnergy] = [nextEnergy, currentEnergy];
    // Record the promoted layer's state count.
    currentSize = nextSize;
    // Advance the move count represented by the promoted layer.
    ++moves;
  }

  // Report that no energy-feasible route collects every litter item.
  return -1;
}
