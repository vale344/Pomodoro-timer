
"use strict";
    // pomodoro: 25,
    // shortBreak: 5,
    // longBreak: 15,
    // longBreakinterval: 4,
  let pomodoro={
    started :false,
    min :0,
    sec :0,
    fillerHeight : 0,
    fillerIncrement : 0,
    interval : null,
    minDom : null,
    secDom : null,
    fillerDom : null,


    init : function(){
        let self = this;
        this.minDom = document.querySelector('#min');
        this.secDom = document.querySelector('#sec');
        this.fillerDom = document.querySelector('#filler');
        this.interval = setInterval(function(){
          self.intervalCallback.apply(self);
        }, 1000);
        // forbind til mint ellement
        document.querySelector('#button-start').onclick = function(){
          self.startime.apply(self);
          console.log('¨testbutton-start');
        };
        document.querySelector('#shortBreak').onclick = function(){
          self.startShortBreak.apply(self);
          console.log('¨test shortBreak');
        };
        document.querySelector('#longBreak').onclick = function(){
          self.startLongBreak.apply(self);
          console.log('¨test longBreak');
        };
        document.querySelector('#button-purse').onclick = function(){
          self.stopTimer.apply(self);
          console.log('¨test stop');
        };
      },
      resetVariables : function(mins, secs, started){
        this.min = mins;
        this.sec = secs;
        this.started = started;
        this.fillerIncrement = 200/(this.mins*60);
        this.fillerHeight = 0;  
        console.log('¨test rester variable');
      },

      // function's vor jeg gammer minne tider
      startime: function() {
        this.resetVariables(0, 5, true);
        console.log('¨test time1');
      },
      startShortBreak : function(){
        this.resetVariables(1, 0, true);
        console.log('¨test time2');
      },
      startLongBreak : function(){
        this.resetVariables(1, 0, true);
        console.log('¨test time3');
      },
      stopTimer : function(){
        this.resetVariables(1, 0, false);
        this.updateDom();
        console.log('¨test time2');
      },
       updateDom : function(){
         this.minDom.innerHTML = this.toDoubleDigit(this.min);
         this.secDom.innerHTML = this.toDoubleDigit(this.sec);
     
         this.fillerHeight = this.fillerHeight + this.fillerIncrement;
         this.fillerDom.style.height = this.fillerHeight + 'px';
        console.log('¨test ttupdate');
      },
      toDoubleDigit : function(num){
        if(num < 10) {
          return "0" + parseInt(num, 10);
        }
        return num;
      },

      intervalCallback : function(){
        if(!this.started) return false;
        if(this.sec == 0) {
          if(this.min == 0) {
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
      
      timerComplete : function(){
        this.started = false;
        this.fillerHeight = 0;
        // skal sætte for 
        this.startLongBreak();
      }

    
  };

  
  window.onload = function(){
    pomodoro.init();
  };


  