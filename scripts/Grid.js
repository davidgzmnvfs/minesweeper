'use strict';
import Cell from "./Cell.js";

export const gridsize = '100';
export default class Grid {
    constructor(size, mines) {
        this.cells = [];
        this.cellsWithMines = [];
        this.numMines = mines;
        this.size = size;
        this.cellsRevealed = 0;
    }
    Generate() {
        this.cellsRevealed = 0;
        this.cells + [];
        this.cellsWithMines = [];
        for (let i = 0; i < this.size; i++) {
            this.cells.push([]);
            for (let j = 0; j < this.size; j++) {
                this.cells[i].push([]);
                let newCell = new Cell(i, j);
                this.cells[i][j] =newCell;
            }
        }
    }
    SetCellSize(){
        console.log("Setting cell size");
        let side = `${Math.floor(window.innerWidth*((60/this.size)/100))}px`;
        // let side = `${Math.round((screen.width*.6) / this.size)}px`;
        console.log(side)
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                let cell = document.querySelector(`#cell${i}cell${j}`)

                cell.style.width = 
                cell.style.height = 
                cell.style.maxWidth = 
                cell.style.maxHeight = 
                cell.style.minWidth = 
                cell.style.minHeight = side;
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
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                let cell = this.cells[i][j];
                if (cell.hasMine) {
                    this.RevealMine(cell);
                }
            }
        }
        alert("You lost");
        this.Restart();
    }
    HandleClick(x, y) {
        const cell = this.cells[x][y];
        if(!cell.flagged){
            if (cell.hasMine) {
                this.Lose();
            } else {
                this.Reveal(cell);
            }
        }
    }
    FlagCell(x,y){
        let cell = this.cells[x][y];
        if(cell.revealed){ return }
        cell.flagged = !cell.flagged;
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
    Win(){
        alert("You won");
        this.Restart();
    }
    CountMinesFlagged() {
    let count = 0;
    this.cells.forEach(row => {
        row.forEach(cell => {
            if(cell.hasMine && cell.flagged){
                count++;
            }
        })
    });
    console.log(count);
    return count;
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
                if(cell.neighborMines == 0){
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
                }
                cell.revealed = true;
                this.cellsRevealed ++;
                this.CheckForWin();
            }
        }, 50);
    }

    CheckForWin() {
    console.log(`missing cells: ${(this.size**2-this.numMines)-this.cellsRevealed}`);
        if (this.cellsRevealed === this.size ** 2 - this.numMines) {
            this.Win();
        }
    }
    Restart(){
        this.Generate();
        this.SetMines();
        this.SetNeighborMines();
        this.GenerateHtml();
        this.SetCellSize();
        this.SetClick();
        // this.Print();
        this.Draw();
    }
}
