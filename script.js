document.addEventListener('DOMContentLoaded', () =>{
    let timer = 60 * 25;


})

function setTimer(duration, display) {
    let timer = duration, minutes, seconds;
    let IntervalTimer = setInterval( function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContext = minutes + ":" + seconds;

        if(--timer < 0) {
            timer = duration;
        }
    }, 1000)
}