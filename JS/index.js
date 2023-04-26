"use strict";
// pomodoro: 25,
// shortBreak: 5,
// longBreak: 15,
// longBreakinterval: 4,


let cun = 0;
let run =false;
var timer;
let playMode= document.querySelector("#button-restart")



let pomodoro = {
  currentTimw: 0,
  elapsedTme: 0,
  paused: true,
  startimer: 0,
  
  status: false,
  counttime: 0,
  started: false,
  work: false,
  min: 0,
  sec: 0,
  fillerHeight: 0,
  fillerIncrement: 0,
  interval: null,
  minDom: null,
  secDom: null,
  fillerDom: null,

  init: function () {
    let self = this;
    this.minDom = document.querySelector("#min");
    this.secDom = document.querySelector("#sec");
    this.fillerDom = document.querySelector("#filler");
    // vikker til at stopper
     timer = setInterval(function () {
    //this.interval = setInterval(function () {
      self.intervalCallback.apply(self);
      // this.timeCount();
    }, 1000);

    // forbind til mit element
    document.querySelector("#button-work").onclick = function () {

      self.startime.apply(self);
      console.log("¨testbutton-work");
      this.counttime = 0;
    };
    document.querySelector("#shortBreak").onclick = function () {
      self.startShortBreak.apply(self);
      console.log("¨test shortBreak");
      this.counttime = 0;
    };
    document.querySelector("#longBreak").onclick = function () {
      self.startLongBreak.apply(self);
      console.log("¨test longBreak");
      this.counttime = 0;
    };
    document.querySelector("#button-purse").onclick = function () {
      console.log(self.sec);
      self.stopTimer.apply(self);
      console.log("¨test stop");
      console.log("¨test stop");
      this.counttime = 0;
    };
    // document.querySelector("#button-restart").onclick = function () {
    //   this.started = this.started === false ? true : false;

    //   console.log("¨test play /stop");
    // };
  },
  timeCount: function () {
    this.counttime++;
  },
  resetVariables: function (mins, secs, started) {
    this.min = mins;
    this.sec = secs;
    this.started = started;
    this.fillerIncrement = 200 / (this.mins * 60);
    this.fillerHeight = 0;
    console.log("¨test rester variable");
  },

  // function's hvor jeg gemmer mine tider
  startime: function () {
    this.resetVariables(25, 0, true);
    console.log("¨test time1 star");


  },
  startShortBreak: function () {
    this.resetVariables(5, 0, true);
    console.log("¨test time2 short");
    
  },
  startLongBreak: function () {
    this.resetVariables(15, 0, true);
    console.log("¨test time3 long");
   
  },
  stopTimer: function () {
    this.resetVariables(0, 0, false);
    this.updateDom();
    console.log("¨test time2");
   
  },

  updateDom: function () {
    this.minDom.innerHTML = this.toDoubleDigit(this.min);
    this.secDom.innerHTML = this.toDoubleDigit(this.sec);

    this.fillerHeight = this.fillerHeight + this.fillerIncrement;
    this.fillerDom.style.height = this.fillerHeight + "px";
    console.log("¨test update");
  },
  toDoubleDigit: function (num) {
    if (num < 10) {
      return "0" + parseInt(num, 10);
    }
    return num;
  },

  intervalCallback: function () {
    if (!this.started) return false;
    if (this.sec == 0) {
      if (this.min == 0) {
        this.timerComplete();
        return;
      }
      this.sec = 59;
      this.min--;
    } else {
      this.sec--;
    }
    this.updateDom();
  },
  nextMode: function () {
    console.log("test bextMod4");

    this.work = this.work === true ? false : true;
    console.log(this.work);
    if (this.work === true) {
      this.startime();
      this.work = true;

      cun++;
      console.log("tal cun" + cun);
    } else {
      if (cun === 4) {
        console.log("longbreak tal cun====4" + cun);
        this.startLongBreak();
        cun = 0;
        console.log("tal cun 0====" + cun);


      } else {
        this.startShortBreak();
        console.log("sort brt");
      }
    }
  },
  //xsdfhkdvhbdcvbsdvhjbsdvjbsdvbsdjvbsdvjbsjdvbsudvbf
  timerComplete: function () {
    this.started = false;
    this.fillerHeight = 0;
    this.nextMode();
  },
};

window.onload = function () {
  pomodoro.init();
};
function pause  () {
clearInterval(timer);
}
function startCount(){
  pomodoro.init();
}
document.querySelector("#button-restart").onclick = function () {
  // this.started = this.started === false ? true : false;
  run = run === false ? true : false;
  // console.log(run);
  if (run===false)
  {
    //  clearInterval(timer);
    pause();
    playMode.setAttribute("name", "pause");
     console.log(run);
  }
   if(run===true){
    // pomodoro.init();
    // console.log(run);
    // console.log(timer);
    startCount();
    playMode.setAttribute("name", "play");
   }
  
    // function startCount(){
    //   pomodoro.init();
    // }
 


}

