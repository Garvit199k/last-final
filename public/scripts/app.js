// This file contains the JavaScript code that implements the typing test functionality, including event listeners, timer management, and result calculations.

const textToType = "The quick brown fox jumps over the lazy dog.";
let timer;
let timeLeft = 60; // 60 seconds for the typing test
let isTestActive = false;

const textElement = document.getElementById('text-to-type');
const inputElement = document.getElementById('user-input');
const timerElement = document.getElementById('timer');
const resultElement = document.getElementById('result');

textElement.textContent = textToType;

inputElement.addEventListener('focus', startTest);
inputElement.addEventListener('input', checkInput);

function startTest() {
    if (!isTestActive) {
        isTestActive = true;
        timeLeft = 60;
        inputElement.value = '';
        resultElement.textContent = '';
        timerElement.textContent = timeLeft;
        timer = setInterval(updateTimer, 1000);
    }
}

function updateTimer() {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
        endTest();
    }
}

function checkInput() {
    const userInput = inputElement.value;
    if (userInput === textToType) {
        endTest(true);
    } else if (textToType.startsWith(userInput)) {
        resultElement.textContent = 'Keep going!';
    } else {
        resultElement.textContent = 'Incorrect! Try again.';
    }
}

function endTest(success = false) {
    clearInterval(timer);
    isTestActive = false;
    inputElement.blur();
    if (success) {
        resultElement.textContent = 'Congratulations! You typed it correctly!';
    } else {
        resultElement.textContent = 'Time is up! You did not complete the test.';
    }
}