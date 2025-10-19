/*
1625. Lexicographically Smallest String After Applying Operations

You are given a string s of even length consisting of digits from 0 to 9, and two integers a and b.
You can apply either of the following two operations any number of times and in any order on s:
Add a to all odd indices of s (0-indexed). Digits post 9 are cycled back to 0. For example, if s = "3456" and a = 5, s becomes "3951".
Rotate s to the right by b positions. For example, if s = "3456" and b = 1, s becomes "6345".
Return the lexicographically smallest string you can obtain by applying the above operations any number of times on s.
A string a is lexicographically smaller than a string b (of the same length) if in the first position where a and b differ, string a has a letter that appears earlier in the alphabet than the corresponding letter in b. For example, "0158" is lexicographically smaller than "0190" because the first position they differ is at the third letter, and '5' comes before '9'.

Example 1:
Input: s = "5525", a = 9, b = 2
Output: "2050"
Explanation: We can apply the following operations:
Start:  "5525"
Rotate: "2555"
Add:    "2454"
Add:    "2353"
Rotate: "5323"
Add:    "5222"
Add:    "5121"
Rotate: "2151"
Add:    "2050"​​​​​
There is no way to obtain a string that is lexicographically smaller than "2050".

Example 2:
Input: s = "74", a = 5, b = 1
Output: "24"
Explanation: We can apply the following operations:
Start:  "74"
Rotate: "47"
​​​​​​​Add:    "42"
​​​​​​​Rotate: "24"​​​​​​​​​​​​
There is no way to obtain a string that is lexicographically smaller than "24".

Example 3:
Input: s = "0011", a = 4, b = 2
Output: "0011"
Explanation: There are no sequence of operations that will give us a lexicographically smaller string than "0011".

Constraints:
2 <= s.length <= 100
s.length is even.
s consists of digits from 0 to 9 only.
1 <= a <= 9
1 <= b <= s.length - 1

</> Typescript code:
*/

function findLexSmallestString(s: string, a: number, b: number): string {
    // Store the length of the string for efficient access
    const n = s.length;
    
    // Set to track all unique strings we've seen to avoid cycles
    const visited = new Set<string>();
    
    // Track the lexicographically smallest string found
    let min = s;
    
    // BFS queue initialized with the starting string
    const queue: string[] = [s];
    
    // Mark the starting string as visited
    visited.add(s);
    
    // Process all reachable states using BFS
    while (queue.length > 0) {
        // Get the next string to process from the queue
        const curr = queue.shift()!;
        
        // Update minimum if current string is lexicographically smaller
        if (curr < min) min = curr;
        
        // Operation 1: Add 'a' to all odd indices
        // Convert string to array for modification
        const arr = curr.split('');
        // Iterate through all odd indices (1, 3, 5, ...)
        for (let i = 1; i < n; i += 2) {
            // Add 'a' to the digit and take modulo 10 to handle wraparound
            arr[i] = String((+arr[i] + a) % 10);
        }
        // Convert array back to string
        const added = arr.join('');
        
        // If this state hasn't been visited, add to queue and mark visited
        if (!visited.has(added)) {
            visited.add(added);
            queue.push(added);
        }
        
        // Operation 2: Rotate string to the right by 'b' positions
        // Take last 'b' characters and prepend to first 'n-b' characters
        const rotated = curr.slice(-b) + curr.slice(0, -b);
        
        // If this state hasn't been visited, add to queue and mark visited
        if (!visited.has(rotated)) {
            visited.add(rotated);
            queue.push(rotated);
        }
    }
    
    // Return the lexicographically smallest string found
    return min;
}
