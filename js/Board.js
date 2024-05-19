export class Board {
    rows = 10;
    cols = 15;

    grid;

    mines = 20;

    constructor(rows, cols, mines) {
        this.rows = rows;
        this.cols = cols;
        this.mines = mines;
        this.grid = this.make2DArray(rows, cols);

        this.randomizeMines();
    }

    make2DArray(rows, cols) {
        var arr = new Array(cols);
        for (var i = 0; i < arr.length; i++) {
            arr[i] = new Array(rows);
        }
        return arr;
    }

    randomizeMines() {

    }
}