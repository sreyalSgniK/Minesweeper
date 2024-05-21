import {MineCell, NumberCell} from './Cell.js';
export class Board {
    canvas;
    cellWidth;
    lineWidth;
    margin;
    rows = 10;
    cols = 15;

    grid; // 2D array [rows][cols]

    mines = 20;

    constructor(canvas, cellWidth, lineWidth, margin, rows, cols, mines) {
        this.canvas = canvas;
        this.cellWidth = cellWidth;
        this.lineWidth = lineWidth;
        this.margin = margin;
        this.rows = rows;
        this.cols = cols;
        this.mines = mines;
        this.grid = this.make2DArray();


    }

    make2DArray() {
        var arr = new Array(this.rows);
        for (var i = 0; i < arr.length; i++) {
            arr[i] = new Array(this.cols);
        }
        return arr;
    }

    generateBoard() {
        var array = new Array(this.cols * this.rows);
        for (var i = 0; i < array.length; i++) {
            array[i] = i;
        }
        var shuffledArray = array.sort(() => Math.random() - 0.5);

        for (var i = 0; i < this.mines; i++) {
            var minePos = this.pos1DTo2D(shuffledArray[i])
            // console.log(minePos);
            this.grid[minePos[0]][minePos[1]] = new MineCell(this.canvas, this.cellWidth, this.lineWidth, this.margin, this, minePos[0],minePos[1]);
        }
        // console.log(this.grid);

        for (var i = this.mines; i < shuffledArray.length; i++) {
            var cellPos = this.pos1DTo2D(shuffledArray[i]);
            // console.log(cellPos);
            var number = 0;
            for(var j = -1; j < 2; j++) {
                if (cellPos[0] + j < 0 || cellPos[0] + j >= this.rows) {
                    continue;
                }

                for(var k = -1; k < 2; k++) {
                    if (cellPos[1] + k < 0 || cellPos[1] + k >= this.cols) {
                        continue;
                    }

                    if (this.grid[cellPos[0] + j][cellPos[1] + k] != null && this.grid[cellPos[0] + j][cellPos[1] + k].cellType == "mine") {
                        number++;
                    }
                }
            }
            this.grid[cellPos[0]][cellPos[1]] = new NumberCell(this.canvas, this.cellWidth, this.lineWidth, this.margin, this, cellPos[0],cellPos[1], number);
        }
    }

    pos1DTo2D(pos) {
        return [Math.floor(pos/this.cols), pos % this.cols]; // [row, col]
    }

    pos2DTo1D(row, col) {
        return row * this.cols + col;
    }

    printBoard() {
        for (var i = 0; i < this.grid.length; i++) {
            console.log(this.grid[i].map(item => item.cellType).join(' '));
        }
    }
}

// var board = new Board(10,15,20);
// console.log(board.pos1DTo2D(20));
