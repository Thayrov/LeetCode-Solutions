/*
3484. Design Spreadsheet

A spreadsheet is a grid with 26 columns (labeled from 'A' to 'Z') and a given number of rows. Each cell in the spreadsheet can hold an integer value between 0 and 105.
Implement the Spreadsheet class:
Spreadsheet(int rows) Initializes a spreadsheet with 26 columns (labeled 'A' to 'Z') and the specified number of rows. All cells are initially set to 0.
void setCell(String cell, int value) Sets the value of the specified cell. The cell reference is provided in the format "AX" (e.g., "A1", "B10"), where the letter represents the column (from 'A' to 'Z') and the number represents a 1-indexed row.
void resetCell(String cell) Resets the specified cell to 0.
int getValue(String formula) Evaluates a formula of the form "=X+Y", where X and Y are either cell references or non-negative integers, and returns the computed sum.
Note: If getValue references a cell that has not been explicitly set using setCell, its value is considered 0.

Example 1:
Input:
["Spreadsheet", "getValue", "setCell", "getValue", "setCell", "getValue", "resetCell", "getValue"]
[[3], ["=5+7"], ["A1", 10], ["=A1+6"], ["B2", 15], ["=A1+B2"], ["A1"], ["=A1+B2"]]
Output:
[null, 12, null, 16, null, 25, null, 15]
Explanation
Spreadsheet spreadsheet = new Spreadsheet(3); // Initializes a spreadsheet with 3 rows and 26 columns
spreadsheet.getValue("=5+7"); // returns 12 (5+7)
spreadsheet.setCell("A1", 10); // sets A1 to 10
spreadsheet.getValue("=A1+6"); // returns 16 (10+6)
spreadsheet.setCell("B2", 15); // sets B2 to 15
spreadsheet.getValue("=A1+B2"); // returns 25 (10+15)
spreadsheet.resetCell("A1"); // resets A1 to 0
spreadsheet.getValue("=A1+B2"); // returns 15 (0+15)

Constraints:
1 <= rows <= 10^3
0 <= value <= 10^5
The formula is always in the format "=X+Y", where X and Y are either valid cell references or non-negative integers with values less than or equal to 105.
Each cell reference consists of a capital letter from 'A' to 'Z' followed by a row number between 1 and rows.
At most 10^4 calls will be made in total to setCell, resetCell, and getValue.

</> Typescript code:
*/

class Spreadsheet {
    // Use Map to store only non-zero values, saving memory
    private cells: Map<string, number> = new Map();
    
    // Constructor doesn't need to initialize anything since we use sparse storage
    constructor(rows: number) {}
    
    // Set cell value, delete from map if value is 0 to save memory
    setCell(cell: string, value: number): void {
        if (value === 0) {
            // Remove from map instead of storing 0
            this.cells.delete(cell);
        } else {
            // Store non-zero value
            this.cells.set(cell, value);
        }
    }
    
    // Reset cell by removing it from the map (equivalent to setting to 0)
    resetCell(cell: string): void {
        this.cells.delete(cell);
    }
    
    // Evaluate formula by parsing the "=X+Y" format
    getValue(formula: string): number {
        // Remove '=' and split by '+' to get operands
        const parts = formula.slice(1).split('+');
        // Parse and sum both operands
        return this.parseValue(parts[0]) + this.parseValue(parts[1]);
    }
    
    // Parse a token as either a cell reference or integer
    private parseValue(token: string): number {
        // Check if first character is a letter (A-Z) using ASCII codes
        const firstChar = token.charCodeAt(0);
        if (firstChar >= 65 && firstChar <= 90) {
            // It's a cell reference, return stored value or 0 if not set
            return this.cells.get(token) || 0;
        }
        // It's a number, parse as integer
        return parseInt(token, 10);
    }
}
/**
 * Your Spreadsheet object will be instantiated and called as such:
 * var obj = new Spreadsheet(rows)
 * obj.setCell(cell,value)
 * obj.resetCell(cell)
 * var param_3 = obj.getValue(formula)
 */
