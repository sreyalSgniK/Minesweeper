import {Board} from './Board.js';
/**
 * Abstract Class Cell.
 *
 * @class Cell
 */
export class Cell {

    canvas;
    cellWidth;
    lineWidth;
    margin;

    // position in the grid
    row = 0;
    col = 0;

    // Defined in children classes
    cellState = "unopened"; // 3 states: unopened, opened, flagged
    cellType = "mine" // 2 types: mine, number


    constructor(canvas, cellWidth, lineWidth, margin, board, row, col) {
        if (this.constructor == Cell) {
            throw new Error("Abstract classes can't be instantiated.");
        }

        this.canvas = canvas;
        this.cellWidth = cellWidth;
        this.lineWidth = lineWidth;
        this.margin = margin;

        this.board = board;
        this.row = row;
        this.col = col;
    }


    flag() {
        // Flag this cell with right click

        if (this.cellState == "opened") {
            return;
        }

        if (this.cellState == "flagged") {
            this.unflag();
            return;
        }

        var ctx = this.canvas.getContext("2d");
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.font = "15px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText("Flag", this.col * this.cellWidth + this.cellWidth/2 + this.margin, this.row * this.cellWidth + this.cellWidth/2 + this.margin);

        this.cellState = "flagged";
    }

    unflag() {
        // Unflag a flagged cell with right click

        var ctx = this.canvas.getContext("2d");
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.font = "15px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.clearRect(this.col * this.cellWidth + this.margin + this.lineWidth, this.row * this.cellWidth + this.margin + this.lineWidth, this.cellWidth - this.lineWidth*2, this.cellWidth - this.lineWidth*2);

        this.cellState = "unopened";
    }

    open() {
        // Open Cell with left click, implement in children classes
        throw new Error("Method 'open()' must be implemented.");
    }
}

/**
 * Mine Cell.
 *
 * @class MineCell
 * extends {Cell}
 */
export class MineCell extends Cell {
    constructor(canvas, cellWidth, lineWidth, margin, board, row, col) {
        super(canvas, cellWidth, lineWidth, margin, board, row, col);
        this.cellType = "mine";
    }


    open() {
        if (this.cellState != "unopened") {
            return;
        }

        var ctx = this.canvas.getContext("2d");
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.font = "15px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";


        ctx.fillText('x', this.col * this.cellWidth + this.cellWidth/2 + this.margin, this.row * this.cellWidth + this.cellWidth/2 + this.margin);

        this.cellState = "opened";
    }
}

/**
 * Number Cell.
 *
 * @class NumberCell
 * extends {Cell}
 */
export class NumberCell extends Cell {
    number = 0;

    constructor(canvas, cellWidth, lineWidth, margin, board, row, col, number) {
        super(canvas, cellWidth, lineWidth, margin, board, row, col);
        this.cellType = "number";
        this.number = number;
    }


    open() {
        if (this.cellState == "opened" && this.number != 0 && this.number == this.countAdjacentFlags()) {
            // console.log("hi");
            this.chord();
        }
        

        if (this.cellState != "unopened") {
            return;
        }

        var ctx = this.canvas.getContext("2d");
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.font = "15px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(this.number, this.col * this.cellWidth + this.cellWidth/2 + this.margin, this.row * this.cellWidth + this.cellWidth/2 + this.margin);

        this.cellState = "opened";

        if(this.number == 0) {
            const directions = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1],           [0, 1],
                [1, -1], [1, 0], [1, 1]
            ];
            
            directions.forEach(([dRow, dCol]) => {
                this.openCell.call(this, this.row + dRow, this.col + dCol);
            });
        }
    }

    openCell(row, col) {
        if (row >= 0 && row < this.board.rows && col >= 0 && col < this.board.cols) {
            this.board.grid[row][col].open();
        }
    }

    chord() {
    
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];
        
        directions.forEach(([dRow, dCol]) => {
            var row = this.row + dRow;
            var col = this.col + dCol;
            if (row >= 0 && row < this.board.rows && col >= 0 && col < this.board.cols) {
                if(this.board.grid[row][col].cellState == "unopened"){
                    this.openCell.call(this, row, col);
                }
            }
        });
        
    }

    countAdjacentFlags() {
        var count = 0;
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];

        directions.forEach(([dRow, dCol]) => {
            var row = this.row + dRow;
            var col = this.col + dCol;
            if (row >= 0 && row < this.board.rows && col >= 0 && col < this.board.cols) {
                if(this.board.grid[row][col].cellState == "flagged"){
                    count++;
                }
            }
            
        });

        return count;
    }
}