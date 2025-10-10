/*
3147. Taking Maximum Energy From the Mystic Dungeon

In a mystic dungeon, n magicians are standing in a line. Each magician has an attribute that gives you energy. Some magicians can give you negative energy, which means taking energy from you.
You have been cursed in such a way that after absorbing energy from magician i, you will be instantly transported to magician (i + k). This process will be repeated until you reach the magician where (i + k) does not exist.
In other words, you will choose a starting point and then teleport with k jumps until you reach the end of the magicians' sequence, absorbing all the energy during the journey.
You are given an array energy and an integer k. Return the maximum possible energy you can gain.
Note that when you are reach a magician, you must take energy from them, whether it is negative or positive energy.

Example 1:
Input: energy = [5,2,-10,-5,1], k = 3
Output: 3
Explanation: We can gain a total energy of 3 by starting from magician 1 absorbing 2 + 1 = 3.

Example 2:
Input: energy = [-2,-3,-1], k = 2
Output: -1
Explanation: We can gain a total energy of -1 by starting from magician 2.

Constraints:
1 <= energy.length <= 10^5
-1000 <= energy[i] <= 1000
1 <= k <= energy.length - 1

</> Typescript code:
*/

function maximumEnergy(energy: number[], k: number): number {
    // Store the length of the energy array for boundary checks
    const n = energy.length;
    
    // Initialize max to negative infinity to handle all-negative cases
    let max = -Infinity;
    
    // Iterate through the last k positions (these are potential end points of chains)
    // We only need to check the last k positions because any chain ending beyond this
    // would have already been covered by a chain starting from an earlier position
    for (let i = n - 1; i >= n - k; i--) {
        // Initialize sum for the current chain starting from position i and going backwards
        let sum = 0;
        
        // Traverse backwards from position i, jumping k steps at a time
        // This simulates all possible starting points that would end at or after position i
        for (let j = i; j >= 0; j -= k) {
            // Add the energy at current position to the cumulative sum
            sum += energy[j];
            
            // Update max if current cumulative sum is greater
            // We check at each step because any position can be a valid starting point
            if (sum > max) max = sum;
        }
    }
    
    // Return the maximum energy found across all possible starting positions
    return max;
}
