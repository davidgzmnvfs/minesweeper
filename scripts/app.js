class Cell {
    constructor(xPos,yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.hasMine = false;
        this.flagged = false;
        this.neighborMines = 0;
        this.revealed = false;
    }
}

class Grid {
    constructor(size, mines){
        this.cells = []
        this.numMines = mines;
        this.size = size;
    }
    Generate(){
        for(let i = 0; i < this.size ; i++){
            this.cells.push([]);
            for (let j = 0; j < this.size ; j++){
                this.cells[i].push([]);
                this.cells[i][j] = new Cell(i,j);
            }
        }
    }
    SetMines(){
        let minesSet = 0;
        while(minesSet < this.numMines){
            let posX = Math.floor(Math.random()*this.size);
            let posY = Math.floor(Math.random()*this.size);
            if(!this.cells[posX][posY].hasMine){
                this.cells[posX][posY].hasMine = true;
                minesSet++;
            }
        }
    } 
    Draw(){
        for(let i = 0; i < this.size ; i++){
            for (let j = 0; j < this.size ; j++){
                let idString = `#cell${i}cell${j}`;
                let currentCell = document.querySelector(idString);
                currentCell.classList.add(this.cells[i][j].hasMine ? "mine" : "safe");
            }
        }
    }
    Print(){
        let printingLine = "";
        for(let i = 0; i < this.size ; i++){
            for (let j = 0; j < this.size ; j++){
                if(this.cells[i][j].hasMine){
                    printingLine += "X";
                }else {
                    printingLine += "#";
                }
            }
            printingLine += "\n";
        }
        console.log(printingLine);
    }
    Lose(){
        console.log("You lost");
        for(let i = 0; i < this.size ; i++){
            for (let j = 0; j < this.size ; j++){
                let cell =this.cells[i][j];
                if(cell.hasMine){
                    this.RevealMine(cell);
                }
            }
        }
        }
    HandleClick(x,y){
        console.log(this.cells[x][y].hasMine ? 'mine' : 'no mine');
        const cell = this.cells[x][y];
        if(cell.hasMine){
            this.Lose();
        }else{
            this.Reveal(cell);
        }
    }
    SetClick(){
        document.querySelector("#table").addEventListener('click', event => {
            let x = Math.floor(event.target.dataset.row);
            let y = Math.floor(event.target.dataset.col);
            this.HandleClick(x,y);
        });

    }
    GenerateHtml(){
        const container = document.querySelector(".container");
        let htmlString = "<table id=\"table\">"
        for(let i = 0 ; i < this.size ; i++){
            htmlString += "<tr>";
            for(let j = 0 ; j < this.size ; j++){
                htmlString += `<td class="cell" id="cell${i}cell${j}" data-row="${i}" data-col="${j}"></td>`;
            }
            htmlString += "</tr>";
        }
        htmlString += "</table>"
        container.innerHTML = htmlString;
    }
    RevealMine(cell){
        cell.revealed = true;
        document.querySelector(`#cell${cell.xPos}cell${cell.yPos}`).classList.add("revealed");
    }
    Reveal(cell){
        setTimeout(() => {
            if(!cell.revealed){
                document.querySelector(`#cell${cell.xPos}cell${cell.yPos}`).classList.add("revealed");
                let nextX,nextY;
                
                for(let i = -1 ; i <= 1 ; i++){
                    nextX = cell.xPos + i;
                    for(let j = -1 ; j <= 1 ; j++){
                        nextY = cell.yPos + j;
                        if (nextY > -1 && nextY < this.size){
                            if(nextX > -1 && nextX < this.size){
                                let nextCell = this.cells[nextX][nextY];
                                if(!nextCell.hasMine){
                                    this.Reveal(nextCell);
                                }
                            }
                        }
                    }
                }
                cell.revealed = true;
            }
        }, 50);
    }


}

class App {
    constructor(){
        let myGrid = new Grid(10,50);
        myGrid.Generate();
        myGrid.GenerateHtml();
        myGrid.SetMines();
        myGrid.SetClick();
        myGrid.Print();
        myGrid.Draw();
        }
}
document.addEventListener('DOMContentLoaded', event => {
    const app = new App();
});
