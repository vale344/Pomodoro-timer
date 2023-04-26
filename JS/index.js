"use strict";

//cun is a Variables af int that keeps track of the number of times that starttime() has run
let cun = 0;
//run is Variables af bool keeps track of my playis running
let run = false;
// timer is used together with aglobal function setInterval()
var timer;
let playMode = document.querySelector("#button-restart");
//pomodoro is Objects that holds all the Variables that need to be used between the {}
let pomodoro = {
  //status on whether the timer is running
  isStarted: false,
  // keep track of whether you have braek or work
  work: false,
  min: 0,
  sec: 0,
  // used for calculating time in function resetVariables:
  fillerIncrement: 0,
  minDom: null,
  secDom: null,
  fillerDom: null,

  init: function () {
    let self = this;
    //calls to my span in html that have to do with time
    this.minDom = document.querySelector("#min");
    this.secDom = document.querySelector("#sec");
    this.fillerDom = document.querySelector("#filler");
    // works to make it run once per sec
    timer = setInterval(function () {
      self.intervalCallback.apply(self);
      //sets it to 1000 milliseconds = 1 seconds
    }, 1000);

    // work mode buttons to set whether you have break or work
    document.querySelector("#button-work").onclick = function () {
      self.startime.apply(self);
      console.log("¨testbutton-work");
    };
    document.querySelector("#shortBreak").onclick = function () {
      self.startShortBreak.apply(self);
      console.log("¨test shortBreak");
    };
    document.querySelector("#longBreak").onclick = function () {
      self.startLongBreak.apply(self);
      console.log("¨test longBreak");
    };
    document.querySelector("#button-purse").onclick = function () {
      console.log(self.sec);
      self.stopTimer.apply(self);
      console.log("¨test stop");
    };
  },
//resetVariables: function (parameter, parameter, parameter)
  resetVariables: function (mins, secs, isStarted) {
    this.min = mins;
    this.sec = secs;
    this.isStarted = isStarted;
    this.fillerIncrement = 200 / (this.mins * 60);
    
    console.log("¨test rester variable");
  },

  // when you click buttons for working mode, that new data will be inserted into  restVariables depending on which model you choose
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
  //update what you can see in html min &sec
  updateDom: function () {
    this.minDom.innerHTML = this.toDoubleDigit(this.min);
    this.secDom.innerHTML = this.toDoubleDigit(this.sec);
  },
  toDoubleDigit: function (num) {
    if (num < 10) {
      return "0" + parseInt(num, 10);
    }
    return num;
  },

  intervalCallback: function () {
    if (!this.isStarted) return false;
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
      //counts to how mage work has run
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
 
  timerComplete: function () {
    this.isStarted = false;
    this.fillerHeight = 0;
    this.nextMode();
  },
};

window.onload = function () {
  pomodoro.init();
};
function pause() {
  clearInterval(timer);
}
function startCount() {
  pomodoro.init();
}
document.querySelector("#button-restart").onclick = function () {
  run = run === false ? true : false;

  if (run === true) {
    pause();
    playMode.innerHTML = ">";
    console.log(run);
  }
  if (run === false) {
    startCount();
    playMode.innerHTML = "II";
  }
};
