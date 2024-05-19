/**
 * Abstract Class Cell.
 *
 * @class Cell
 */
class Cell {

    // position in the grid
    row = 0;
    col = 0;

    // Defined in children classes
    cellState = "unopened"; // 3 states: unopened, opened, flagged
    cellType = "mine" // 3 types: mine, number, blank


    constructor(row, col) {
        if (this.constructor == Cell) {
            throw new Error("Abstract classes can't be instantiated.");
        }

        this.row = row;
        this.col = col;
    }

    flag() {
        // Flag this cell

        
    }

    open() {
        // Open Cell, implement in children classes
        throw new Error("Method 'open()' must be implemented.");
    }
}