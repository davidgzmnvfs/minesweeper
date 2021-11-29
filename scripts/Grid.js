'use strict';
import Cell from "./Cell.js";

export const gridsize = '100';
export default class Grid {
    constructor(size, mines) {
        this.cells = [];
        this.numMines = mines;
        this.size = size;
    }
    Generate() {
        for (let i = 0; i < this.size; i++) {
            this.cells.push([]);
            for (let j = 0; j < this.size; j++) {
                this.cells[i].push([]);
                this.cells[i][j] = new Cell(i, j);
            }
        }
    }
    SetMines() {
        let minesSet = 0;
        while (minesSet < this.numMines) {
            let posX = Math.floor(Math.random() * this.size);
            let posY = Math.floor(Math.random() * this.size);
            if (!this.cells[posX][posY].hasMine) {
                this.cells[posX][posY].hasMine = true;
                minesSet++;
            }
        }
    }
    SetNeighborMines() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.CalculateNeighborMines(this.cells[i][j]);
            }
        }
    }
    CalculateNeighborMines(cell) {
        let nextX, nextY;
        for (let i = -1; i <= 1; i++) {
            nextX = cell.xPos + i;
            for (let j = -1; j <= 1; j++) {
                nextY = cell.yPos + j;
                if (nextY > -1 && nextY < this.size) {
                    if (nextX > -1 && nextX < this.size) {
                        let nextCell = this.cells[nextX][nextY];
                        if (nextCell.hasMine) {
                            cell.neighborMines++;
                        }
                    }
                }
            }
        }
    }
    Draw() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                let idString = `#cell${i}cell${j}`;
                let currentCell = document.querySelector(idString);
                currentCell.classList.add(this.cells[i][j].hasMine ? "mine" : "safe");
            }
        }
    }
    Print() {
        let printingLine = "";
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.cells[i][j].hasMine) {
                    printingLine += "X";
                } else {
                    printingLine += "#";
                }
            }
            printingLine += "\n";
        }
        console.log(printingLine);
    }
    Lose() {
        console.log("You lost");
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                let cell = this.cells[i][j];
                if (cell.hasMine) {
                    this.RevealMine(cell);
                }
            }
        }
    }
    HandleClick(x, y) {
        console.log(this.cells[x][y].hasMine ? 'mine' : 'no mine');
        const cell = this.cells[x][y];
        if (cell.hasMine) {
            this.Lose();
        } else {
            this.Reveal(cell);
        }
    }
    FlagCell(x,y){
        let cell = this.cells[x][y];
        if(cell.revealed){ return }
        cell.flagged = true;
        console.log(this.cells[x][y]);
        document.querySelector(`#cell${x}cell${y}`).classList.toggle("flagged");
    }
    SetClick() {
        //left click reveal
        document.querySelector("#table").addEventListener('click', event => {
            let x = Math.floor(event.target.dataset.row);
            let y = Math.floor(event.target.dataset.col);
            this.HandleClick(x, y);
        });
        //right click flag
        document.querySelector("#table").addEventListener('contextmenu', event => {
            event.preventDefault();
            let x = Math.floor(event.target.dataset.row);
            let y = Math.floor(event.target.dataset.col);
            this.FlagCell(x, y);
        });
        

    }
    GenerateHtml() {
        const grid = document.querySelector(".grid");
        let htmlString = "<table id=\"table\">";
        for (let i = 0; i < this.size; i++) {
            htmlString += "<tr>";
            for (let j = 0; j < this.size; j++) {
                htmlString += `<td class="cell" id="cell${i}cell${j}" data-row="${i}" data-col="${j}">
                ${this.cells[i][j].neighborMines > 0 && !this.cells[i][j].hasMine ? this.cells[i][j].neighborMines : " "}
                </td>`;
            }
            htmlString += "</tr>";
        }
        htmlString += "</table>";
        grid.innerHTML = htmlString;
    }
    RevealMine(cell) {
        cell.revealed = true;
        document.querySelector(`#cell${cell.xPos}cell${cell.yPos}`).classList.add("revealed");
    }
    Reveal(cell) {
        setTimeout(() => {
            if (!cell.revealed) {
                document.querySelector(`#cell${cell.xPos}cell${cell.yPos}`).classList.add("revealed");
                let nextX, nextY;
                switch (cell.neighborMines) {
                    case 0: //no neighbors
                        for (let i = -1; i <= 1; i++) {
                            nextX = cell.xPos + i;
                            for (let j = -1; j <= 1; j++) {
                                nextY = cell.yPos + j;
                                if (nextY > -1 && nextY < this.size) {
                                    if (nextX > -1 && nextX < this.size) {
                                        let nextCell = this.cells[nextX][nextY];
                                        if (!nextCell.hasMine) {
                                            this.Reveal(nextCell);
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    default:
                        // for (let i = -1; i <= 1; i += 2) {
                        //     let nextX, nextY;
                        //     nextX = cell.xPos + i;
                        //     nextY = cell.yPos + i;
                        //     if (nextX > -1 && nextX < this.size) {
                        //         if (!this.cells[cell.xPos + i][cell.yPos].hasMine) {
                        //             this.Reveal(this.cells[cell.xPos + i][cell.yPos]);
                        //         }
                        //     }
                        //     if (nextY > -1 && nextY < this.size) {
                        //         if (!this.cells[cell.xPos][cell.yPos + i].hasMine) {
                        //             this.Reveal(this.cells[cell.xPos][cell.yPos + i]);
                        //         }
                        //     }
                        // }
                        //this.Reveal(cell);
                        break;
                }
                cell.revealed = true;
            }
        }, 50);
    }
}
