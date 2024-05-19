/**
 * Number Cell.
 *
 * @class NumberCell
 * extends {Cell}
 */
class NumberCell extends Cell {
    number = 1;
    
    constructor(row, col) {
        super(row, col);
        this.cellType = "number";
    }


    open() {
        
    }

    // When the number of adjacent mines is equal to the number of adjacent flagged cells, all adjacent non-flagged unopened cells will be opened. Source: https://en.wikipedia.org/wiki/Minesweeper_(video_game)
    chord() {

    }
}