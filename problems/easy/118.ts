/*
118. Pascal's Triangle

Given an integer numRows, return the first numRows of Pascal's triangle.
In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:

Example 1:
Input: numRows = 5
Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

Example 2:
Input: numRows = 1
Output: [[1]]
 
Constraints:
1 <= numRows <= 30

</> Typescript code:
*/

function generateΩ(numRows: number): number[][] {
    // Initialize the result array to store all rows of Pascal's triangle
    const result: number[][] = [];
    
    // Iterate through each row from 0 to numRows-1
    for (let i = 0; i < numRows; i++) {
        // Create a new row with length i+1 (row 0 has 1 element, row 1 has 2, etc.)
        const row: number[] = new Array(i + 1);
        
        // Set the first and last elements of each row to 1 (Pascal's triangle property)
        row[0] = row[i] = 1;
        
        // Calculate the middle elements by summing the two elements above from previous row
        for (let j = 1; j < i; j++) {
            // Each element equals sum of element above-left and above-right from previous row
            row[j] = result[i - 1][j - 1] + result[i - 1][j];
        }
        
        // Add the completed row to the result
        result.push(row);
    }
    
    // Return the complete Pascal's triangle
    return result;
}
