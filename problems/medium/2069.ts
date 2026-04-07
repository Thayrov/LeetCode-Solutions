/*
2069. Walking Robot Simulation II

Hint
A width x height grid is on an XY-plane with the bottom-left cell at (0, 0) and the top-right cell at (width - 1, height - 1). The grid is aligned with the four cardinal directions ("North", "East", "South", and "West"). A robot is initially at cell (0, 0) facing direction "East".
The robot can be instructed to move for a specific number of steps. For each step, it does the following.
Attempts to move forward one cell in the direction it is facing.
If the cell the robot is moving to is out of bounds, the robot instead turns 90 degrees counterclockwise and retries the step.
After the robot finishes moving the number of steps required, it stops and awaits the next instruction.

Implement the Robot class:
Robot(int width, int height) Initializes the width x height grid with the robot at (0, 0) facing "East".
void step(int num) Instructs the robot to move forward num steps.
int[] getPos() Returns the current cell the robot is at, as an array of length 2, [x, y].
String getDir() Returns the current direction of the robot, "North", "East", "South", or "West".

Example 1:
example-1
Input
["Robot", "step", "step", "getPos", "getDir", "step", "step", "step", "getPos", "getDir"]
[[6, 3], [2], [2], [], [], [2], [1], [4], [], []]
Output
[null, null, null, [4, 0], "East", null, null, null, [1, 2], "West"]
Explanation
Robot robot = new Robot(6, 3); // Initialize the grid and the robot at (0, 0) facing East.
robot.step(2);  // It moves two steps East to (2, 0), and faces East.
robot.step(2);  // It moves two steps East to (4, 0), and faces East.
robot.getPos(); // return [4, 0]
robot.getDir(); // return "East"
robot.step(2);  // It moves one step East to (5, 0), and faces East.
                // Moving the next step East would be out of bounds, so it turns and faces North.
                // Then, it moves one step North to (5, 1), and faces North.
robot.step(1);  // It moves one step North to (5, 2), and faces North (not West).
robot.step(4);  // Moving the next step North would be out of bounds, so it turns and faces West.
                // Then, it moves four steps West to (1, 2), and faces West.
robot.getPos(); // return [1, 2]
robot.getDir(); // return "West"

Constraints:
2 <= width, height <= 100
1 <= num <= 10^5
At most 104 calls in total will be made to step, getPos, and getDir.

</> Typescript code:
*/

class Robot {
  private w: number; // Grid width
  private h: number; // Grid height
  private p: number; // Perimeter length (total unique steps to loop)
  private pos: number = 0; // Current linear position on the perimeter [0, p-1]
  private moved: boolean = false; // Flag to track if the robot has ever moved (affects direction at origin)

  constructor(width: number, height: number) {
    this.w = width;
    this.h = height;
    // The perimeter is (w + w + h + h) - 4 overlapping corners
    this.p = 2 * (width + height) - 4;
  }

  step(num: number): void {
    this.moved = true;
    // Use modulo to jump across multiple full laps instantly
    this.pos = (this.pos + num) % this.p;
  }

  getPos(): number[] {
    const curr = this.pos;
    // Boundary check: Bottom edge (moving East)
    if (curr < this.w) return [curr, 0];
    // Boundary check: Right edge (moving North)
    if (curr < this.w + this.h - 1) return [this.w - 1, curr - (this.w - 1)];
    // Boundary check: Top edge (moving West)
    if (curr < 2 * this.w + this.h - 2)
      return [this.w - 1 - (curr - (this.w + this.h - 2)), this.h - 1];
    // Boundary check: Left edge (moving South)
    return [0, this.h - 1 - (curr - (2 * this.w + this.h - 3))];
  }

  getDir(): string {
    const curr = this.pos;
    // Special case: If pos is 0 but we have moved, we finished a lap and are facing South
    if (this.moved && curr === 0) return "South";
    // Mapping linear position ranges to cardinal directions
    if (curr > 0 && curr < this.w) return "East";
    if (curr >= this.w && curr < this.w + this.h - 1) return "North";
    if (curr >= this.w + this.h - 1 && curr < 2 * this.w + this.h - 2)
      return "West";
    if (curr >= 2 * this.w + this.h - 2) return "South";
    // Initial state: at (0,0) before any move
    return "East";
  }
}

/**
 * Your Robot object will be instantiated and called as such:
 * var obj = new Robot(width, height)
 * obj.step(num)
 * var param_2 = obj.getPos()
 * var param_3 = obj.getDir()
 */
