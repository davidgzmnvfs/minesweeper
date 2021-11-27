'use strict';

export default class Cell {
    constructor(xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.hasMine = false;
        this.flagged = false;
        this.neighborMines = 0;
        this.revealed = false;
    }
}

