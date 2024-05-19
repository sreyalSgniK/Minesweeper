class Board {
    rows = 10;
    cols = 10;

    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = this.make2DArray(rows, cols);
    }

    make2DArray(rows, cols) {
        var arr = new Array(cols);
        for (var i = 0; i < arr.length; i++) {
            arr[i] = new Array(rows);
        }
        return arr;
    }
}