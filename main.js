

class StartStopButton{
    constructor(id){
        this.button = document.getElementById(id);
        this.isRunning = false;
        this.milliseconds = 0;
        this.timerInterval = 0;
        localStorage.setItem(this.button.id, this.milliseconds.toString());
        buttonList.push(id);
    }
    startStopTimer() {
        if(resetToggle){
            this.resetTimer();
            resetToggle = false;
            resetButton.changeBlue();
        }
        else if(this.isRunning) {
            clearInterval(this.timerInterval);
            this.isRunning = false;
        } 
        else {
            this.timerInterval = setInterval(this.updateTimer.bind(this), 10);
            this.isRunning = true;
        }
    }
    updateTimer() {
        this.milliseconds+= 10;
        this.updateButtonDisplay();
        this.saveTimerValue();
    }
    updateButtonDisplay() {
        const parsedTime = this.parseMilliseconds(this.milliseconds);
        this.button.textContent = parsedTime.hours 
        + ' hours ' + parsedTime.minutes + ' minutes ' + parsedTime.seconds + ' seconds ' + 
            parsedTime.milliseconds + ' milliseconds';
    }
    saveTimerValue() {
        localStorage.setItem(this.button.id, this.milliseconds.toString());
    }
    parseMilliseconds(milliseconds) {
        // Calculate seconds, minutes, and hours
        const millisecondsParsed = (milliseconds % 1000);
        const seconds = Math.floor((milliseconds / 1000) % 60);
        const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
        const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    
        // Return an object with parsed values
        return {
            milliseconds: millisecondsParsed,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }
    resetTimer() {
        this.milliseconds = 0;
        this.updateButtonDisplay();
        this.saveTimerValue();
        if (this.isRunning) {
            clearInterval(this.timerInterval);
            this.isRunning = false;
        }
    }
}
class ResetButton{
    constructor(id){
        this.button = document.getElementById(id);
    }
    resetTimerToggle() {
        resetToggle = true;
        this.changeRed();
    }
    changeRed(){
        this.button.style.setProperty('--bg-gradient-start', 'var(--bg-gradient-start-red)');
        this.button.style.setProperty('--bg-gradient-end', 'var(--bg-gradient-end-red)');
        this.button.style.setProperty('--bg-color', 'var(--bg-color-red)');
        this.button.style.setProperty('--border-color', 'var(--border-color-red)');
        this.button.style.setProperty('--shadow-color', 'var(--shadow-color-red)');
        this.button.style.setProperty('--text-shadow-color', 'var(--text-shadow-color-red)');
    }
    changeBlue(){
        this.button.style.setProperty('--bg-gradient-start', 'var(--bg-gradient-start-blue)');
        this.button.style.setProperty('--bg-gradient-end', 'var(--bg-gradient-end-blue)');
        this.button.style.setProperty('--bg-color', 'var(--bg-color-blue)');
        this.button.style.setProperty('--border-color', 'var(--border-color-blue)');
        this.button.style.setProperty('--shadow-color', 'var(--shadow-color-blue)');
        this.button.style.setProperty('--text-shadow-color', 'var(--text-shadow-color-blue)');
    }
}
    let buttonList = [];
    let resetToggle = false;
    const buttonOne = new StartStopButton('buttonOne');
    const buttonTwo = new StartStopButton('buttonTwo');
    const buttonThree = new StartStopButton('buttonThree');
    const buttonFour = new StartStopButton('buttonFour');
    const resetButton = new ResetButton('resetButton');

window.onload = function () {
    for(const button of [buttonOne, buttonTwo, buttonThree, buttonFour]){
        //pay attention to 'let' change and the 'this. -> button.' change
        let milliseconds = parseInt(localStorage.getItem(button.button.id));
        button.miliseconds = milliseconds || 0;
        button.updateButtonDisplay();
    }
};
