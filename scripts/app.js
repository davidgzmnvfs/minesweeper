'use strict';
import Grid from "./Grid.js";

class App {
    constructor(){
        this.grid = new Grid(15,15);
        this.grid.Generate();
        this.grid.SetMines();
        this.grid.SetNeighborMines();
        this.grid.GenerateHtml();
        this.grid.SetCellSize();
        this.grid.SetClick();
        // grid.Print();
        this.grid.Draw();

        document.addEventListener('keydown', event => {
            if(event.key == 'r' || event.key == 'R'){
                this.grid.Restart();
            }
        })
        window.addEventListener('resize',event => {
            this.grid.SetCellSize();
        });
        }

    get Grid(){
        return this.grid;
    }
}

document.addEventListener('DOMContentLoaded', event => {
    const app = new App();
});
