var score = 0;
var highscore = localStorage.getItem("highscore")
var counter = 60
var interval;
const startButton = document.getElementById('start')
const body = document.getElementById('mainbody')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const titleElement = document.getElementById('codetext')
const bodyElement = document.getElementById('bodytext')

let currentQuestionIndex

// questions array for quiz multiple choices
const questions = [{
            question: 'When was JavaScript introduced?',
            answers: [
                { text: '1990', correct: false },
                { text: '1995', correct: true },
                { text: '1997', correct: false },
                { text: '1998', correct: false }
            ]
        },
        {
            question: 'Arrays in JavaScript can be used to store _______',
            answers: [
                { text: '1. numbers and strings', correct: false },
                { text: '2. other arrays', correct: false },
                { text: '3. boolean', correct: false },
                { text: '4. all of the above', correct: true },
            ]
        },
        {
            question: 'The condition in an if/else is contained by ______',
            answers: [
                { text: '1. parenthesis', correct: true },
                { text: '2. curly brackets', correct: false },
                { text: '3. brackets', correct: false },
                { text: '4. square brackets', correct: false },
            ]
        },
        {
            question: 'JavaScript is an example of object-orientated language:',
            answers: [
                { text: 'True', correct: true },
                { text: 'False', correc: false },
            ]
        },
    ]
    // start game function triggered by start quiz and reset score to 0 at start
function startGame() {
    body.classList.add('hide')
    score = 0
    currentQuestionIndex = 0
    interval = setInterval(clockTick, 1000)
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

// sets next question and pull from next array
function setNextQuestion() {
    resetState()
    showQuestion(questions[currentQuestionIndex])
}

// reset's the answers portion to erase old children and replace with new children
function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

// shows the question and creates the elements

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

// End of Test, stores high score and modifies text to ending score text
function endTest() {
    clearInterval(interval)
    counter = 60
    startButton.innerText = 'Restart'
    body.classList.remove('hide')
    questionContainerElement.classList.add('hide')
    username = prompt("Please enter your name to save your score of " + score)
    if (highscore !== null) {
        if (score > highscore) {
            parseInt(localStorage.setItem("highscore", score));
            localStorage.setItem("username", username);
        }
    } else {
        parseInt(localStorage.setItem("highscore", score));
        localStorage.setItem("username", username)
    }
    titleElement.innerText = 'You have reached the end of the test! Your final score is ' + score + " !" + ' The current high score is owned by ' + localStorage.getItem("username") + '! Their score was ' + localStorage.getItem("highscore");
    bodyElement.innerText = ''

}

// clock function to trigger time remaining counter
function clockTick() {
    counter--
    span = document.getElementById("countdown");
    span.innerHTML = "Time Remaining: " + counter;
    if (counter <= 0) {
        endTest()

    }
}

// select answer  function to verify answer, add score and display color elements
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    setTimeout(function() {
        if (correct) {
            score = score + 10
        } else {
            counter = counter - 15
        };
        currentQuestionIndex++
        if (questions.length > currentQuestionIndex) {
            setNextQuestion()
            console.log(score)
        } else {
            endTest()
        }
    }, 1500)

}

// sets elements to correct status class for background color of buttons
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('incorrect')
    }

}

// clears buttons of elements
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('incorrect')
}

startButton.addEventListener('click', startGame)