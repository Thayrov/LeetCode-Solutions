/*
3100. Water Bottles II

You are given two integers numBottles and numExchange.
numBottles represents the number of full water bottles that you initially have. In one operation, you can perform one of the following operations:
Drink any number of full water bottles turning them into empty bottles.
Exchange numExchange empty bottles with one full water bottle. Then, increase numExchange by one.
Note that you cannot exchange multiple batches of empty bottles for the same value of numExchange. For example, if numBottles == 3 and numExchange == 1, you cannot exchange 3 empty water bottles for 3 full bottles.
Return the maximum number of water bottles you can drink.

Example 1:
Input: numBottles = 13, numExchange = 6
Output: 15
Explanation: The table above shows the number of full water bottles, empty water bottles, the value of numExchange, and the number of bottles drunk.

Example 2:
Input: numBottles = 10, numExchange = 3
Output: 13
Explanation: The table above shows the number of full water bottles, empty water bottles, the value of numExchange, and the number of bottles drunk.
 
Constraints:
1 <= numBottles <= 100 
1 <= numExchange <= 100

</> Typescript code:
*/

function maxBottlesDrunk(numBottles: number, numExchange: number): number {
    // Initialize the total number of bottles we've drunk with the initial full bottles
    let drunk = numBottles;
    
    // After drinking all initial bottles, we have this many empty bottles
    let empty = numBottles;
    
    // Keep exchanging as long as we have enough empty bottles for an exchange
    while (empty >= numExchange) {
        // Perform the exchange: give away numExchange empty bottles
        empty -= numExchange;
        
        // Receive 1 full bottle from the exchange, drink it immediately, adding 1 empty
        empty++;
        
        // Increment the count of bottles drunk (we just drank the exchanged bottle)
        drunk++;
        
        // The exchange rate increases by 1 for the next exchange
        numExchange++;
    }
    
    // Return the total number of bottles drunk throughout the process
    return drunk;
}
