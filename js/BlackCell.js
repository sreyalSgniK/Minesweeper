/**
 * Blank Cell.
 *
 * @class BlankCell
 * extends {Cell}
 */
class BlankCell extends Cell {
    constructor(row, col) {
        super(row, col);
        this.cellType = "blank";
    }


    open() {
        
    }
}