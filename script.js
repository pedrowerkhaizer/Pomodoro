import { getPun } from './punAPI.js';
let countdown, activeTimer, activeSelector;
let cycleState  = 'Work'
let cycleCount = 0;

const timerDict = {
    'Work': 25 * 60,
    'Short break': 5 * 60,
    'Long break': 15 * 60
}

const titleModal = {
    'Work': 'Congrats!',
    'Short break': "Ok... I think we're good to go! right?",
    'Long break': "That was relaxing... Let's get back to work"
}
const subtitleModal = {
    'Work': "You've completed 25 minutes of deep focus :)",
    'Short break': "Let's complete more 25 minutes of work",
    'Long break': "We got a lot of work done so far. Let's continue."
}

const gifModal = {
    'Work': "https://media0.giphy.com/media/hZj44bR9FVI3K/giphy.gif?cid=ecf05e47rmrnzsf7aq5ew5axyb0i549n1gg5vj56mf9k5r7k&ep=v1_gifs_search&rid=giphy.gif&ct=g",
    'Short break': "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjRjNHExcjdnaDJyenozejloeDQ2YXp0dnk1NmhweHkwbmxmdXhkdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1BXa2alBjrCXC/giphy.gif",
    'Long break': "https://media4.giphy.com/media/TW8Ma1a8ZsZ8I/giphy.gif?cid=ecf05e47e3fhz9zrp9hg83rjbw7uutx51ve2lvl17fmaawnt&ep=v1_gifs_related&rid=giphy.gif&ct=g"
}

document.addEventListener('DOMContentLoaded', () =>{
    let display = document.getElementById("counter");
    let counterStatus =  document.getElementById("counter-status");
    let resetBtn = document.getElementById("reset-control");
    let timerBtn = document.getElementById("circle");
    const punElement = document.getElementById("pun-text");

    let modal = document.getElementById("modal");
    let closeModal = document.getElementById("close-modal");
    // set modal invisible as default
    modal.style.display = "none";

    let selectorItems = document.getElementsByClassName("selector-item");
    let activeSelector = document.getElementsByClassName("active")[0];
    activeTimer = timerDict[activeSelector?.innerHTML]; 

    setInterval(() => {
        updatePun(punElement);
    }, 10000);

    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
    })

    timerBtn.addEventListener('click', ( ) => {
        startStop(display, counterStatus);
    })
    resetBtn.addEventListener('click', ( ) => {
        resetTimer(display, counterStatus);
    })
    
    // Disabled for allowing only the estipulated flow
    // // go through each item of selectorItems
    // Array.prototype.forEach.call(selectorItems, function(item){
    //     item.addEventListener('click', () => {
    //         // remove "active" class of the current active selector
    //         activeSelector = document.getElementsByClassName("active")[0];
    //         activeSelector.classList.remove('active');
    //         // set class active to the item clicked
    //         item.classList.add('active');
    //         // mount timer
    //         resetTimer(display, counterStatus)
    //         // mount display
    //         mountDisplay(display);
    //     })
    // });

    mountDisplay(display);

})

async function updatePun(element) {
    let currentPun = await getPun();
    element.innerHTML = escapeRegExp(currentPun);
}

function escapeRegExp(string) {
    return string.replace(/[^a-zA-Z0-9 ]/g, ' ') 
}

function handleEndOfFocus(display, counterStatus) {
    // remove "active" class of the current active selector
    activeSelector = document.getElementsByClassName("active")[0];
    activeSelector.classList.remove('active');

    let work = document.getElementById("work");
    let shortBreak = document.getElementById("short-break");
    let longBreak = document.getElementById("long-break");

    if(cycleState == 'Work' && cycleCount < 4){
        showModal('Work');
        modal.style.display = "block";
        shortBreak.classList.add('active');
        cycleState = 'Short break'
    }
    else if(cycleState = 'Short break' && cycleCount < 4) {
        showModal('Short break');
        work.classList.add('active');
        cycleState = 'Work'
        cycleCount ++;
    }
    else if(cycleState = 'Work' && cycleCount == 4) {
        showModal('Work');
        longBreak.classList.add('active');
        cycleState = 'Long break'
        cycleCount = 0;
    }
    else if(cycleState = 'Long break') {
        showModal('Long break');
        work.classList.add('active');
        cycleState = 'Work'
        cycleCount ++;
    }

    // mount timer
    resetTimer(display, counterStatus)
    // mount display
    mountDisplay(display);
}

function showModal(type) {
    let title = document.getElementById("modal-title");
    let subtitle = document.getElementById("modal-subtitle");
    let gif = document.getElementById("modal-gif");
    
    title.innerHTML = titleModal[type];
    subtitle.innerHTML = subtitleModal[type];
    gif.src = gifModal[type];
    modal.style.display = "block";
}

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

function startStop(display, counterStatus) {
    if(counterStatus.innerHTML == 'START'){
        counterStatus.innerHTML = 'STOP'
        let timer = activeTimer, minutes, seconds;
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        
        countdown = setInterval( function () {
            if( minutes == 0 && seconds == 0 ) {
                handleEndOfFocus(display, counterStatus);
                return;
            }
            if(seconds == 0) {
                seconds = 60;
                minutes--;
            }

            seconds --;
            
            let minutesx = parseInt(minutes) < 10 ? "0" + minutes : minutes;
            let secondsx =  parseInt(seconds) < 10 ? "0" + seconds : seconds;

            display.innerHTML = minutesx + ":" + secondsx;

        }, 1000)
    }
    else if(counterStatus.innerHTML == 'STOP') {
        return resetTimer(display, counterStatus);
    }
}

function resetTimer(display, counterStatus) {
    activeSelector = document.getElementsByClassName("active")[0];
    activeTimer = timerDict[activeSelector?.innerHTML]; 

    counterStatus.innerHTML = "START"
    display.innerHTML = mountTimer(activeTimer);
    clearInterval(countdown);
}