'use strict';
import Grid from "./Grid.js";

class App {
    constructor(){
        let myGrid = new Grid(15,50);
        myGrid.Generate();
        myGrid.SetMines();
        myGrid.SetNeighborMines();
        myGrid.GenerateHtml();
        myGrid.SetClick();
        myGrid.Print();
        myGrid.Draw();
        }
}
document.addEventListener('DOMContentLoaded', event => {
    const app = new App();
});
