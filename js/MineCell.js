import {Cell} from '/js/Cell.js'

/**
 * Mine Cell.
 *
 * @class MineCell
 * extends {Cell}
 */
class MineCell extends Cell {
    constructor(row, col) {
        super(row, col);
        this.cellType = "mine";
    }


    open() {

    }
}