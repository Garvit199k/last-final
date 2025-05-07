// This file contains the JavaScript code that implements the typing test functionality, including event listeners, timer management, and result calculations.

document.addEventListener('DOMContentLoaded', () => {
    const textToType = document.getElementById('text-to-type');
    const userInput = document.getElementById('user-input');
    const startButton = document.getElementById('start-button');
    const submitButton = document.getElementById('submit-button');
    const results = document.getElementById('results');
    const timerDisplay = document.getElementById('timer');
    const themeSelector = document.getElementById('theme-selector');

    let timeLeft = 60;
    let timer = null;
    let testStarted = false;

    // Theme handling
    themeSelector.addEventListener('change', (e) => {
        document.body.className = `theme-${e.target.value}`;
    });

    // Start test
    startButton.addEventListener('click', () => {
        userInput.value = '';
        userInput.disabled = false;
        userInput.focus();
        startButton.disabled = true;
        submitButton.disabled = false;
        results.style.display = 'none';
        testStarted = true;
        timeLeft = 60;

        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endTest();
            }
        }, 1000);
    });

    // Submit test
    submitButton.addEventListener('click', endTest);

    function endTest() {
        clearInterval(timer);
        userInput.disabled = true;
        startButton.disabled = false;
        submitButton.disabled = true;
        testStarted = false;

        // Calculate results
        const words = userInput.value.trim().split(/\s+/).length;
        const wpm = Math.round((words / (60 - timeLeft)) * 60);
        
        const originalText = textToType.textContent.trim();
        const userText = userInput.value.trim();
        const accuracy = calculateAccuracy(originalText, userText);

        // Display results
        results.style.display = 'block';
        document.getElementById('wpm').textContent = `Words per minute: ${wpm}`;
        document.getElementById('accuracy').textContent = `Accuracy: ${accuracy}%`;
    }

    function calculateAccuracy(original, typed) {
        const originalWords = original.split(/\s+/);
        const typedWords = typed.split(/\s+/);
        let correct = 0;

        typedWords.forEach((word, i) => {
            if (word === originalWords[i]) correct++;
        });

        return Math.round((correct / originalWords.length) * 100);
    }

    // Real-time validation
    userInput.addEventListener('input', () => {
        if (!testStarted) return;
        
        const currentText = userInput.value;
        const originalText = textToType.textContent;
        
        if (currentText === originalText) {
            endTest();
        }
    });
});