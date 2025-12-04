/*
2211. Count Collisions on a Road

There are n cars on an infinitely long road. The cars are numbered from 0 to n - 1 from left to right and each car is present at a unique point.
You are given a 0-indexed string directions of length n. directions[i] can be either 'L', 'R', or 'S' denoting whether the ith car is moving towards the left, towards the right, or staying at its current point respectively. Each moving car has the same speed.
The number of collisions can be calculated as follows:
When two cars moving in opposite directions collide with each other, the number of collisions increases by 2.
When a moving car collides with a stationary car, the number of collisions increases by 1.
After a collision, the cars involved can no longer move and will stay at the point where they collided. Other than that, cars cannot change their state or direction of motion.
Return the total number of collisions that will happen on the road.

Example 1:
Input: directions = "RLRSLL"
Output: 5
Explanation:
The collisions that will happen on the road are:
- Cars 0 and 1 will collide with each other. Since they are moving in opposite directions, the number of collisions becomes 0 + 2 = 2.
- Cars 2 and 3 will collide with each other. Since car 3 is stationary, the number of collisions becomes 2 + 1 = 3.
- Cars 3 and 4 will collide with each other. Since car 3 is stationary, the number of collisions becomes 3 + 1 = 4.
- Cars 4 and 5 will collide with each other. After car 4 collides with car 3, it will stay at the point of collision and get hit by car 5. The number of collisions becomes 4 + 1 = 5.
Thus, the total number of collisions that will happen on the road is 5. 

Example 2:
Input: directions = "LLRR"
Output: 0
Explanation:
No cars will collide with each other. Thus, the total number of collisions that will happen on the road is 0.

Constraints:
1 <= directions.length <= 10^5
directions[i] is either 'L', 'R', or 'S'.

</> Typescript code:
*/

function countCollisions(directions: string): number {
    // Initialize pointers for the left and right ends of the road.
    let l = 0;
    let r = directions.length - 1;
    let collisions = 0;

    // Optimization: Skip all cars on the far left moving Left ('L').
    // These cars will never collide as they are moving away from all others into open space.
    // We increment 'l' to narrow the "danger zone".
    while (l <= r && directions[l] === 'L') {
        l++;
    }

    // Optimization: Skip all cars on the far right moving Right ('R').
    // These cars will never collide as they are moving away from all others.
    // We decrement 'r' to narrow the "danger zone".
    while (r >= l && directions[r] === 'R') {
        r--;
    }

    // Iterate through the remaining substring (the "danger zone").
    // Logic: In this trimmed segment, the left boundary is a stationary car or a car moving Right,
    // and the right boundary is a stationary car or a car moving Left.
    // Therefore, ANY moving car ('L' or 'R') inside this segment is guaranteed to eventually 
    // hit a wall or another car, contributing to the collision count.
    for (let i = l; i <= r; i++) {
        // If the car is not Stationary ('S'), it is a moving car trapped in the danger zone.
        // It adds 1 to the collision score (physically, it stops and becomes 'S' upon impact).
        if (directions[i] !== 'S') {
            collisions++;
        }
    }

    return collisions;
}
