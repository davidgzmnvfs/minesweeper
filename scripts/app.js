'use strict';
import Grid from "./Grid.js";
const $=(selector)=>document.querySelector(selector);
class App {
    constructor(){
        this.grid = new Grid(15,15);
        this.grid.Restart();

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
