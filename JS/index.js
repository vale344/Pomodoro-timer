"use strict";

//counts is a Variables af int that keeps track of the number of times that starttime() has run
let counts = 0;
//run is Variables af bool keeps track of my playis running
let isrun = false;
// timer is used together with aglobal function setInterval()
var timer;
//gets info from click function #button-restart
let playMode = document.querySelector("#button-restart");
//pomodoro is Objects that holds all the Variables that need to be used between the {}
let pomodoro = {
  //status on whether the timer is running
  isStarted: false,
  // keep track of whether you have braek or work
  iswork: false,
  min: 0,
  sec: 0,
  // used for calculating time in function resetVariables:
  fillerIncrement: 0,
  //tag info fra updateDom: funktion () og indsæt den i html via  document.querySelector("#min");
  minDom: null,
  //tag info fra updateDom: funktion () og indsæt den i html via  document.querySelector("#sec");
  secDom: null,
  

  init: function () {
    let self = this;
    //calls to my span in html that have to do with time
    this.minDom = document.querySelector("#min");
    this.secDom = document.querySelector("#sec");
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
  // when you click buttons for working mode, that new data will be inserted into  restVariables depending on which model you choose
  startShortBreak: function () {
    this.resetVariables(5, 0, true);
    console.log("¨test time2 short");
  },
  // when you click buttons for working mode, that new data will be inserted into  restVariables depending on which model you choose
  startLongBreak: function () {
    this.resetVariables(15, 0, true);
    console.log("¨test time3 long");
  },
  // when you click buttons for working mode, that new data will be inserted into  restVariables depending on which model you choose
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
  //intervalCallback is a function that ends minutes to seconds and checks if there are minutes and seconds left
  intervalCallback: function () {
    //if (!this.isStarted) checks whether it is running
    if (!this.isStarted) return false;
    //if (this.sec == 0) checksif there are seconds left and after that see if there are minutes
    // or if there are no more minutes left then run a function called this.timerComplete()
    if (this.sec == 0) {
      if (this.min == 0) {
        // is a Function object which is called once the intervalCallback: function runs when there are no more minutes or seconds left
        this.nextMode();
        return;
      }
      //if there are + minutes left then -1 minutes and set seconds to 59
      this.sec = 59;
      this.min--;
    } else {
      //if there are + minutes left then -1 minutes and set seconds to 59
      this.sec--;
    }
    // is a Function object which is called once the intervalCallback: function runs
    this.updateDom();
  },
  //  nextMode: function () is a Function object
  //the goal is that when the time reaches sec 0 it must change mode
  nextMode: function () {
    console.log("test bextMod4");
    // make a toggle that changes between true and false every time the method runs
    this.iswork = this.iswork === true ? false : true;
    console.log(this.iswork);
    //if it is true then run the Function object startime()
    if (this.iswork === true) {
      this.startime();
      //counts to how mage work has run
      counts++;
      console.log("tal counts" + counts);
      //if it is !true then run the Function object startime()
    } else {
      //if where object counts has been called 4 timesrun the Function object.startLongBreak();
      if (counts === 4) {
        console.log("longbreak tal counts====4" + counts);
        this.startLongBreak();
        counts = 0;
        console.log("tal counts 0====" + counts);
      } else {
        //if where object counts has not been called less 4 times run the Function object startShortBreak();
        this.startShortBreak();
        console.log("sort brt");
      }
    }
  },
};
//calls all info in pomodoro.init(); and allow them to use all functions you have created in pomodoro
window.onload = function () {
  pomodoro.init();
};
//function pause() let's stop where pomodoro clock to count down let's stop where pomodoro clock to count
// down by setting milliseconds to 0 via timer object
function pause() {
  //clearInterval() global function say timer object you are new 0
  clearInterval(timer);
}
//there are 1000 milliseconds to timer via pomodoro.init()
function startCount() {
  pomodoro.init();
}
//link html button is lets you switch between > II
document.querySelector("#button-restart").onclick = function () {
  // make a toggle that changes between true and false every time the method runs
  isrun = isrun === false ? true : false;
// if true run pause() function 
  if (isrun === true) {
    pause();
    //and send info about new text to html
    playMode.innerHTML = ">";
    console.log(isrun);
  }
  // if false run startCount(); function 
  if (isrun === false) {
    startCount();
    //and send info about new text to html
    playMode.innerHTML = "II";
  }
};
