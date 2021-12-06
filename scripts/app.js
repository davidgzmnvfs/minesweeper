'use strict';
import Grid from "./Grid.js";
const $=(selector)=>document.querySelector(selector);
class App {
    constructor(){
        this.grid = new Grid(10,10);
        this.grid.Restart();
        this.debugMode = false;

        document.addEventListener('keydown', event => {
            if(event.key == 'r' || event.key == 'R'){
                this.grid.Restart();
                this.ResetWinLoseScreen();

            }
            else if(event.key == 'd' || event.key == 'R'){
                this.grid.ToggleDebugMode();
                this.debugMode = !this.debugMode;
                console.log(this.debugMode);
            }
        })
        window.addEventListener('resize',event => {
            this.grid.SetCellSize();
        });
    }

    get Grid(){
        return this.grid;
    }
    ResetWinLoseScreen(){
        let winLoseScreens = document.querySelectorAll(".winlosescreen");
        winLoseScreens.forEach(screen => screen.style.visibility = "hidden");
    }
}

document.addEventListener('DOMContentLoaded', event => {
    const app = new App();
});
