/*
1622. Fancy Sequence

Write an API that generates fancy sequences using the append, addAll, and multAll operations.
Implement the Fancy class:
Fancy() Initializes the object with an empty sequence.
void append(val) Appends an integer val to the end of the sequence.
void addAll(inc) Increments all existing values in the sequence by an integer inc.
void multAll(m) Multiplies all existing values in the sequence by an integer m.
int getIndex(idx) Gets the current value at index idx (0-indexed) of the sequence modulo 109 + 7. If the index is greater or equal than the length of the sequence, return -1.

Example 1:
Input
["Fancy", "append", "addAll", "append", "multAll", "getIndex", "addAll", "append", "multAll", "getIndex", "getIndex", "getIndex"]
[[], [2], [3], [7], [2], [0], [3], [10], [2], [0], [1], [2]]
Output
[null, null, null, null, null, 10, null, null, null, 26, 34, 20]
Explanation
Fancy fancy = new Fancy();
fancy.append(2);   // fancy sequence: [2]
fancy.addAll(3);   // fancy sequence: [2+3] -> [5]
fancy.append(7);   // fancy sequence: [5, 7]
fancy.multAll(2);  // fancy sequence: [5*2, 7*2] -> [10, 14]
fancy.getIndex(0); // return 10
fancy.addAll(3);   // fancy sequence: [10+3, 14+3] -> [13, 17]
fancy.append(10);  // fancy sequence: [13, 17, 10]
fancy.multAll(2);  // fancy sequence: [13*2, 17*2, 10*2] -> [26, 34, 20]
fancy.getIndex(0); // return 26
fancy.getIndex(1); // return 34
fancy.getIndex(2); // return 20

Constraints:
1 <= val, inc, m <= 100
0 <= idx <= 10^5
At most 105 calls total will be made to append, addAll, multAll, and getIndex.

</> Typescript code:
*/

class Fancy {
  private seq: bigint[]; // Stores the transformed values of the sequence
  private add: bigint; // Global cumulative addition offset
  private mult: bigint; // Global cumulative multiplication factor
  private readonly MOD: bigint = 1000000007n; // Modulo constant for calculations

  constructor() {
    this.seq = [];
    this.add = 0n; // Initial add offset is 0
    this.mult = 1n; // Initial multiplier is 1
  }

  // Modular exponentiation to find (a^b) % MOD in O(log MOD)
  private power(a: bigint, b: bigint): bigint {
    let res = 1n;
    a %= this.MOD;
    while (b > 0n) {
      if (b % 2n === 1n) res = (res * a) % this.MOD;
      a = (a * a) % this.MOD;
      b /= 2n;
    }
    return res;
  }

  // Finds the modular multiplicative inverse using Fermat's Little Theorem
  private modInverse(n: bigint): bigint {
    return this.power(n, this.MOD - 2n);
  }

  append(val: number): void {
    // Reverse-transform the value: (val - current_add) * inverse(current_mult)
    // This ensures that when we later apply (transformed * final_mult + final_add),
    // we get the correct value relative to the operations that happened after this append.
    const v = (BigInt(val) - this.add + this.MOD) % this.MOD;
    this.seq.push((v * this.modInverse(this.mult)) % this.MOD);
  }

  addAll(inc: number): void {
    // Simply update the global add offset
    this.add = (this.add + BigInt(inc)) % this.MOD;
  }

  multAll(m: number): void {
    // Update both multiplier and addition offset: new_val = (old_val * m)
    // which implies (val * mult + add) * m = val * (mult * m) + (add * m)
    this.add = (this.add * BigInt(m)) % this.MOD;
    this.mult = (this.mult * BigInt(m)) % this.MOD;
  }

  getIndex(idx: number): number {
    // Check bounds first
    if (idx >= this.seq.length) return -1;
    // Apply the current global transformations to the stored transformed value
    return Number((this.seq[idx] * this.mult + this.add) % this.MOD);
  }
}

/**
 * Your Fancy object will be instantiated and called as such:
 * var obj = new Fancy()
 * obj.append(val)
 * obj.addAll(inc)
 * obj.multAll(m)
 * var param_4 = obj.getIndex(idx)
 */
