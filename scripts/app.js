'use strict';
import Grid from "./Grid.js";
const $=(selector)=>document.querySelector(selector);
class App {
    constructor(){
        this.grid = new Grid(10,1);
        this.grid.Restart();

        document.addEventListener('keydown', event => {
            if(event.key == 'r' || event.key == 'R'){
                this.grid.Restart();
                this.ResetWinLoseScreen();

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
        // .style.visibility = "hidden";
        // let winScreen,loseScreen;
        // winScreen = document.querySelector("#victoryScreen");
        // loseScreen = document.querySelector("#defeatScreen");
        // winScreen.style.visibility = "hidden";
        // loseScreen.style.visibility = "hidden";
    }
}

document.addEventListener('DOMContentLoaded', event => {
    const app = new App();
});
