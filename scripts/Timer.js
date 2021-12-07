'use strict';

export default class Timer {
    constructor(){
        this.counter = 0;
        this.startTime = Date.now();
        this.elapsedTime = 0;
        // console.log(this.startTime);
        setInterval(() => {
            this.Tick();
        },100)
    }
    Tick(){
        let currentTime = Date.now();
        this.elapsedTime = currentTime - this.startTime;
        console.log(this.elapsedTime/1000);
        this.UpdateHtml();
    }
    UpdateHtml(){
        let timeString = "";
        let minutes = Math.floor((this.elapsedTime/1000/60)%60);
        let seconds = (Math.floor(this.elapsedTime/1000)%60);
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        timeString = `${minutes}:${seconds}`;

        document.querySelector("#timer").innerHTML = timeString;
    }
    Reset(){
        this.elapsedTime,this.startTime = 0;
        this.startTime = Date.now();
    }

    //TODO
    //make it start on first click and stop on win/lose
}