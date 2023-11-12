document.addEventListener('DOMContentLoaded', () =>{
    let timer = 25 * 60;
    let display = document.getElementById("counter");
    resetBtn = document.getElementById("reset-control")
    let countdown;

    display.addEventListener('click', ( ) => {
        setTimer(timer, display);
    })
    resetBtn.addEventListener('click', ( ) => {
        resetTimer(display);
    })
})

function setTimer(duration, display) {
    let timer = duration, minutes, seconds;
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    
    countdown = setInterval( function () {
        if(seconds == 0) {
            seconds = 60;
            minutes--;
        }
        if( minutes == 0 && seconds ==0 ) {
            return;
        }

        seconds --;
        
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerHTML = minutes + ":" + seconds;

    }, 1000)
}

function resetTimer(display) {
    clearTimeout(countdown);
    display.innerHTML = "25:00";
}