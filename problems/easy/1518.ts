/* 
1518. Water Bottles

There are numBottles water bottles that are initially full of water. You can exchange numExchange empty water bottles from the market with one full water bottle.

The operation of drinking a full water bottle turns it into an empty bottle.

Given the two integers numBottles and numExchange, return the maximum number of water bottles you can drink.

Example 1:
Input: numBottles = 9, numExchange = 3
Output: 13
Explanation: You can exchange 3 empty bottles to get 1 full water bottle.
Number of water bottles you can drink: 9 + 3 + 1 = 13.

Example 2:
Input: numBottles = 15, numExchange = 4
Output: 19
Explanation: You can exchange 4 empty bottles to get 1 full water bottle. 
Number of water bottles you can drink: 15 + 3 + 1 = 19.

Constraints:
1 <= numBottles <= 100
2 <= numExchange <= 100

</> Typescript Code:
*/

function numWaterBottles(numBottles: number, numExchange: number): number {
  // Initialize totalBottles with the initial number of full bottles
  let totalBottles = numBottles;
  // Initialize emptyBottles with the same number as numBottles since drinking them turns them into empty bottles
  let emptyBottles = numBottles;

  // Loop until there are fewer empty bottles than required to exchange for a full bottle
  while (emptyBottles >= numExchange) {
    // Calculate the number of new full bottles we can get by exchanging empty bottles
    const newBottles = Math.floor(emptyBottles / numExchange);
    // Add the new full bottles to the total count of bottles
    totalBottles += newBottles;
    // Update the count of empty bottles: remaining empty bottles plus new full bottles we just got and drank
    emptyBottles = (emptyBottles % numExchange) + newBottles;
  }

  // Return the total number of bottles we can drink
  return totalBottles;
}
