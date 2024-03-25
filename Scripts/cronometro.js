const minutesEl = document.querySelector("#minutes");
const secondsEl = document.querySelector("#seconds");
const msEl = document.querySelector("#ms");
const minutesLapEl = document.querySelector("#minutes-lap");
const secondsLapEl = document.querySelector("#seconds-lap");
const msLapEl = document.querySelector("#ms-lap");
const numLapsEl = document.querySelector("#nLaps");
const btStartEl = document.querySelector("#start");
const btPauseEl = document.querySelector("#pause");
const btResetEl = document.querySelector("#reset");
const btResumeEl = document.querySelector("#resume");
const btLapEl = document.querySelector("#lap");
const dpLapEl = document.querySelector("#idLaps")


let minutes = 0;
let seconds = 0;
let miliS = 0;
let minutesLap = 0;
let secondsLap = 0;
let miliSLap = 0;
let ac = 0;
let interval;
let isPaused = false;
let isStarted = true;
let isReseted = false;
let isResume = false;

btStartEl.addEventListener("click", startTimer);


    function startTimer(){
        isReseted = false;
        isPaused = false;
        isStarted = true;
        interval = setInterval(() => {
            if (isStarted) {
                miliS = miliS + 10;
                if (miliS === 1000) {
                    seconds = seconds + 1;
                    miliS = 0;
                    if (seconds === 60) {
                        minutes = minutes + 1;
                        seconds = 0;
                        if(minutes > 60){
                            fReset();
                        }
                    }
                }
                minutesEl.textContent = formatTime(minutes);
                secondsEl.textContent = formatTime(seconds);
                msEl.textContent = formatTimeMs(miliS);
            }
        }, 10);
        btStartEl.style.display = "none";
        btPauseEl.style.display = "block";
        btLapEl.style.display = "block";
    }
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }
    function formatTimeMs(time) {
        return time < 100 ? `${time}`.padStart(3, "0") : time;
    }

btResetEl.addEventListener("click", fReset);

    function fReset(){        
        minutes = minutes * 0;
        seconds = seconds * 0;
        miliS = miliS * 0;
        isReseted = true;

        minutesEl.textContent = "00"
        secondsEl.textContent = "00"
        msEl.textContent = "000"

        if(isPaused){
            btStartEl.style.display = "block";
            btResumeEl.style.display = "none";
            btLapEl.style.display = "none";
        }
    }

btPauseEl.addEventListener("click", pause);

    function pause(){
        isPaused = true;
        isStarted = false;
        btPauseEl.style.display = "none";
        btResumeEl.style.display = "block";   
    }

btResumeEl.addEventListener("click", resume);

    function resume(){
        isPaused = false;
        isStarted = true;
        btResumeEl.style.display = "none";
        btPauseEl.style.display = "block";
    }

btLapEl.addEventListener("click", lap);

    function lap(){
        dpLapEl.style.display = "block";

        miliSLap = miliS;
        secondsLap = seconds;
        minutesLap = minutes;
        
        const lapElement = document.getElementById('idLaps');
        
        const newEl = document.createElement('div');
        newEl.classList.add('lap');
        
        const minutesLapEl = document.createElement('div');
        minutesLapEl.textContent = formatTime(minutesLap);
        minutesLapEl.classList.add('clock-lap');
        
        const secondsLapEl = document.createElement('div');
        secondsLapEl.textContent = formatTime(secondsLap);
        secondsLapEl.classList.add('clock-lap');
        
        const msLapEl = document.createElement('div');
        msLapEl.textContent = formatTimeMs(miliSLap);
        msLapEl.classList.add('clock-lap');

        newEl.appendChild(minutesLapEl);
        newEl.appendChild(document.createTextNode(':'));
        newEl.appendChild(secondsLapEl);
        newEl.appendChild(document.createTextNode(':'));
        newEl.appendChild(msLapEl);
        
        lapElement.append(newEl);
        ac++;
        numLapsEl.textContent = ac;
        fReset();
    }