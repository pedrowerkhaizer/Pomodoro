let countdown;
let activeTimer;

const timerDict = {
    'Work': 25 * 60,
    'Short break': 5 * 60,
    'Long break': 15 * 60
}

document.addEventListener('DOMContentLoaded', () =>{
    
    let display = document.getElementById("counter");
    let status =  document.getElementById("counter-status");
    let resetBtn = document.getElementById("reset-control");
    let timerBtn = document.getElementById("circle");

    let selectorItems = document.getElementsByClassName("selector-item");
    let activeSelector = document.getElementsByClassName("active")[0];
    activeTimer = timerDict[activeSelector?.innerHTML]; 

    timerBtn.addEventListener('click', ( ) => {
        startStop(display, status);
    })
    resetBtn.addEventListener('click', ( ) => {
        resetTimer(display, status);
    })
    
    Array.prototype.forEach.call(selectorItems, function(item){
        item.addEventListener('click', () => {
            activeSelector = document.getElementsByClassName("active")[0];
            activeSelector.classList.remove('active');
            item.classList.add('active');
            resetTimer(display, status)
            mountDisplay(display);
        })
    });

    mountDisplay(display);

})

function mountDisplay(display) {
    activeSelector = document.getElementsByClassName("active")[0];
    activeTimer = timerDict[activeSelector?.innerHTML]; 
    display.innerHTML = mountTimer(activeTimer);
}

function mountTimer(activeTimer) {
    let minutes = parseInt(activeTimer / 60, 10);
    let seconds = parseInt(activeTimer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    
    return minutes + ':' + seconds;
}

function startStop(display, status) {
    if(status.innerHTML == 'START'){
        status.innerHTML = 'STOP'
        let timer = activeTimer, minutes, seconds;
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        
        countdown = setInterval( function () {
            if(seconds == 0) {
                seconds = 60;
                minutes--;
            }
            if( minutes == 0 && seconds == 0 ) {
                return;
            }

            seconds --;
            
            let minutesx = parseInt(minutes) < 10 ? "0" + minutes : minutes;
            let secondsx =  parseInt(seconds) < 10 ? "0" + seconds : seconds;

            display.innerHTML = minutesx + ":" + secondsx;

        }, 1000)
    }
    else if(status.innerHTML == 'STOP') {
        return resetTimer(display, status);
    }
}

function resetTimer(display, status) {
    activeSelector = document.getElementsByClassName("active")[0];
    activeTimer = timerDict[activeSelector?.innerHTML]; 

    status.innerHTML = "START"
    display.innerHTML = mountTimer(activeTimer);
    clearInterval(countdown);
}