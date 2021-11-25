class Cell {
    constructor(xPos,yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.hasMine = false;
        this.flagged = false;
        this.neighborMines = 0;
    }
    Reveal( ){
    }
    FlagMine(){
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
                let idString = `#cell${i}${j}`;
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
    SetClick(){
        // HandleClick = (x,y) =>{
        //     console.log(this.cells[x][y].hasMine ? 'mine' : 'no mine');
        // }
        for(let i = 0; i < this.size ; i++){
            for (let j = 0; j < this.size ; j++){
                let idString = `#cell${i}${j}`;
                let currentCell = document.querySelector(idString);
                currentCell.addEventListener('click', event => {
                    console.log(`Event listener added to ${i},${j} `)
                })
            }
        }
    }
    
    
    
}

let myGrid = new Grid(5,10);
myGrid.Generate();
myGrid.SetMines();
myGrid.SetClick();
myGrid.Print();
myGrid.Draw();
console.log("app.js working")
