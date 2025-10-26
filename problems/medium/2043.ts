/*
2043. Simple Bank System

You have been tasked with writing a program for a popular bank that will automate all its incoming transactions (transfer, deposit, and withdraw). The bank has n accounts numbered from 1 to n. The initial balance of each account is stored in a 0-indexed integer array balance, with the (i + 1)th account having an initial balance of balance[i].
Execute all the valid transactions. A transaction is valid if:
The given account number(s) are between 1 and n, and
The amount of money withdrawn or transferred from is less than or equal to the balance of the account.
Implement the Bank class:
Bank(long[] balance) Initializes the object with the 0-indexed integer array balance.
boolean transfer(int account1, int account2, long money) Transfers money dollars from the account numbered account1 to the account numbered account2. Return true if the transaction was successful, false otherwise.
boolean deposit(int account, long money) Deposit money dollars into the account numbered account. Return true if the transaction was successful, false otherwise.
boolean withdraw(int account, long money) Withdraw money dollars from the account numbered account. Return true if the transaction was successful, false otherwise.

Example 1:
Input
["Bank", "withdraw", "transfer", "deposit", "transfer", "withdraw"]
[[[10, 100, 20, 50, 30]], [3, 10], [5, 1, 20], [5, 20], [3, 4, 15], [10, 50]]
Output
[null, true, true, true, false, false]
Explanation
Bank bank = new Bank([10, 100, 20, 50, 30]);
bank.withdraw(3, 10);    // return true, account 3 has a balance of $20, so it is valid to withdraw $10.
                         // Account 3 has $20 - $10 = $10.
bank.transfer(5, 1, 20); // return true, account 5 has a balance of $30, so it is valid to transfer $20.
                         // Account 5 has $30 - $20 = $10, and account 1 has $10 + $20 = $30.
bank.deposit(5, 20);     // return true, it is valid to deposit $20 to account 5.
                         // Account 5 has $10 + $20 = $30.
bank.transfer(3, 4, 15); // return false, the current balance of account 3 is $10,
                         // so it is invalid to transfer $15 from it.
bank.withdraw(10, 50);   // return false, it is invalid because account 10 does not exist.

Constraints:
n == balance.length
1 <= n, account, account1, account2 <= 10^5
0 <= balance[i], money <= 10^12
At most 10^4 calls will be made to each function transfer, deposit, withdraw.

</> Typescript code:
*/

class Bank {
    // Use 'private' to encapsulate the bank's internal ledger.
    // This array will store the balances. It's 0-indexed.
    private balances: number[];
    
    // Store the total number of accounts for quick O(1) boundary checks.
    private n: number;

    constructor(balance: number[]) {
        // Store the initial balance array directly.
        // balance[i] corresponds to account (i + 1).
        this.balances = balance;
        
        // Cache the number of accounts (n) from the array's length.
        this.n = balance.length;
    }

    transfer(account1: number, account2: number, money: number): boolean {
        // Validate both account numbers.
        // Check if 'account1' (from) or 'account2' (to) are outside the valid range [1, n].
        if (account1 < 1 || account1 > this.n || account2 < 1 || account2 > this.n) {
            // If either account is invalid, the transaction fails.
            return false;
        }
        
        // Convert the 1-indexed 'account1' to its 0-indexed array position.
        const index1 = account1 - 1;
        
        // Check for sufficient funds in the 'from' account.
        if (this.balances[index1] < money) {
            // If funds are insufficient, the transaction fails.
            return false;
        }
        
        // Convert the 1-indexed 'account2' to its 0-indexed array position.
        const index2 = account2 - 1;
        
        // Perform the transaction: subtract from 'account1'.
        this.balances[index1] -= money;
        // And add to 'account2'.
        this.balances[index2] += money;
        
        // Return true to indicate a successful transfer.
        return true;
    }

    deposit(account: number, money: number): boolean {
        // Validate the account number.
        // Check if 'account' is outside the valid range [1, n].
        if (account < 1 || account > this.n) {
            // If the account is invalid, the transaction fails.
            return false;
        }
        
        // Convert the 1-indexed 'account' to its 0-indexed array position
        // and add the money directly to its balance.
        this.balances[account - 1] += money;
        
        // Return true to indicate a successful deposit.
        return true;
    }

    withdraw(account: number, money: number): boolean {
        // Validate the account number.
        // Check if 'account' is outside the valid range [1, n].
        if (account < 1 || account > this.n) {
            // If the account is invalid, the transaction fails.
            return false;
        }
        
        // Convert the 1-indexed 'account' to its 0-indexed array position.
        const index = account - 1;
        
        // Check for sufficient funds in the account.
        if (this.balances[index] < money) {
            // If funds are insufficient, the transaction fails.
            return false;
        }
        
        // Perform the withdrawal by subtracting the money.
        this.balances[index] -= money;
        
        // Return true to indicate a successful withdrawal.
        return true;
    }
}

/**
 * Your Bank object will be instantiated and called as such:
 * var obj = new Bank(balance)
 * var param_1 = obj.transfer(account1,account2,money)
 * var param_2 = obj.deposit(account,money)
 * var param_3 = obj.withdraw(account,money)
 */
