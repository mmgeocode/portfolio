import placeholderQuestions from "./placeholder-questions.js";

// Current player and switch player function--------------------------------
let currentPlayer = 1;

function switchPlayer() {
    currentPlayer = (currentPlayer === 1) ? 2 : 1;
}

// shows current player at top of page
let mainPlayerStatus = document.getElementById("status-player")
mainPlayerStatus.textContent = `Player ${currentPlayer}'s Turn`

// modal box ----------------------------------------------------------------
let modal = document.querySelector(".modal")

let currentQuestion;

let currentAnswer;

let passCount = 0;

let questionAmount = 0;

let turnDisplay = document.getElementById("turn-display")

let questionDisplay = document.getElementById("question-display")

let guessButton = document.getElementById("guess-button")

let passButton = document.getElementById("pass-button")

let lastAction = document.getElementById("last-action-display")

function showModal() {
    modal.style.display = "flex"
}

function changePlayerDisplay() {
    mainPlayerStatus.textContent = `Player ${currentPlayer}'s Turn`
}

function resetLastAction() {
    lastAction.textContent = "Please enter your answer and click guess OR click the pass button"
}

function resetForm() {
    document.getElementById("playerInput").value = ''
}

function massReset() {
    passCount = 0;
    resetForm()
    resetLastAction()
    changePlayerDisplay()
    modal.style.display = "none"
}

// Round 2 Questions -----------------------------------------------------------
const natureQuestions = placeholderQuestions.filter(question => question.category === "Nature").slice(5)
const animalsQuestions = placeholderQuestions.filter(question => question.category === "Animals").slice(5)
const computersQuestions = placeholderQuestions.filter(question => question.category === "Computers").slice(5)
const mythologyQuestions = placeholderQuestions.filter(question => question.category === "Mythology").slice(5)
const historyQuestions = placeholderQuestions.filter(question => question.category === "History").slice(5)
const generalQuestions = placeholderQuestions.filter(question => question.category === "General").slice(5)

const natureDiv = document.querySelectorAll(".nature")
const animalsDiv = document.querySelectorAll(".animals")
const computersDiv = document.querySelectorAll(".computers")
const mythologyDiv = document.querySelectorAll(".mythology")
const historyDiv = document.querySelectorAll(".history")
const generalDiv = document.querySelectorAll(".general")

// pass data ------------------------------------------------------------------
const finalRound = document.querySelectorAll(".finalround")

const urlParams = new URLSearchParams(document.location.search)

finalRound.forEach((div) => {
    div.addEventListener("click", evt => {
        document.location = `/final-jeopardy.html?p1s=${player1Score}&&p2s=${player2Score}`
    })
})

const passPlayer1Score = Number(urlParams.get('p1s'))

const passPlayer2Score = Number(urlParams.get('p2s'))

// Score
let player1Score = passPlayer1Score;

let player2Score = passPlayer2Score;

let player1ScoreDisplay = document.getElementById('player1Score')
player1ScoreDisplay.textContent = player1Score

let player2ScoreDisplay = document.getElementById('player2Score')
player2ScoreDisplay.textContent = player2Score

function addScore(points) {
    
    if (currentPlayer === 1) {
        player1Score += points;
        player1ScoreDisplay.textContent = player1Score;
    } else {
        player2Score += points;
        player2ScoreDisplay.textContent = player2Score;
    }

}

function minusScore(points) {

    if (currentPlayer === 1) {
        player1Score -= points;
        player1ScoreDisplay.textContent = player1Score
    } else {
        player2Score -= points;
        player2ScoreDisplay.textContent = player2Score
    }
    
}

// Event listeners ? need to investigate how to reduce amount of code----------
natureDiv.forEach((div, index) => {
    div.addEventListener("click", evt => {
        if (evt.target.disabled != true) {
            console.log(natureQuestions)
            currentQuestion = natureQuestions[index].question
            currentAnswer = natureQuestions[index].answer
            questionAmount = Number(evt.target.id)
            turnDisplay.textContent = `Player ${currentPlayer}'s Turn`
            questionDisplay.textContent = `${currentQuestion}`
            evt.target.textContent = "X"
            showModal()
            evt.target.disabled = true
            evt.target.removeEventListener("click", evt)
        } 
    })
})

animalsDiv.forEach((div, index) => {
    div.addEventListener("click", evt => {
        if (evt.target.disabled != true) {
            currentQuestion = animalsQuestions[index].question
            currentAnswer = animalsQuestions[index].answer
            questionAmount = Number(evt.target.id)
            turnDisplay.textContent = `Player ${currentPlayer}'s Turn`
            questionDisplay.textContent = `${currentQuestion}`
            evt.target.textContent = "X"
            showModal()
            evt.target.disabled = true;
            evt.target.removeEventListener("click", evt)
        }
    })
})

computersDiv.forEach((div, index) => {
    div.addEventListener("click", evt => {
        if (evt.target.disabled != true) {
            currentQuestion = computersQuestions[index].question
            currentAnswer = computersQuestions[index].answer
            questionAmount = Number(evt.target.id)
            turnDisplay.textContent = `Player ${currentPlayer}'s Turn`
            questionDisplay.textContent = `${currentQuestion}`
            evt.target.textContent = "X"
            showModal()
            evt.target.disabled = true;
            evt.target.removeEventListener("click", evt)
        }
    })
})

mythologyDiv.forEach((div, index) => {
    div.addEventListener("click", evt => {
        if (evt.target.disabled != true) {
            currentQuestion = mythologyQuestions[index].question
            currentAnswer = mythologyQuestions[index].answer
            questionAmount = Number(evt.target.id)
            turnDisplay.textContent = `Player ${currentPlayer}'s Turn`
            questionDisplay.textContent = `${currentQuestion}`
            evt.target.textContent = "X"
            showModal()
            evt.target.disabled = true;
            evt.target.removeEventListener("click", evt)
        }
    })
})

historyDiv.forEach((div, index) => {
    div.addEventListener("click", evt => {
        if (evt.target.disabled != true) {
            currentQuestion = historyQuestions[index].question
            currentAnswer = historyQuestions[index].answer
            questionAmount = Number(evt.target.id)
            turnDisplay.textContent = `Player ${currentPlayer}'s Turn`
            questionDisplay.textContent = `${currentQuestion}`
            evt.target.textContent = "X"
            showModal()
            evt.target.disabled = true;
            evt.target.removeEventListener("click", evt)
        }
    })
})

generalDiv.forEach((div, index) => {
    div.addEventListener("click", evt => {
        if (evt.target.disabled != true) {
            currentQuestion = generalQuestions[index].question
            currentAnswer = generalQuestions[index].answer
            questionAmount = Number(evt.target.id)
            turnDisplay.textContent = `Player ${currentPlayer}'s Turn`
            questionDisplay.textContent = `${currentQuestion}`
            evt.target.textContent = "X"
            showModal()
            evt.target.disabled = true;
            evt.target.removeEventListener("click", evt)
        }
    })
})

guessButton.addEventListener("click", evt => {

    let playerAnswer = document.getElementById("playerInput").value
    
    if (passCount <= 1) {
        if (playerAnswer.toLowerCase() === currentAnswer.toLowerCase()) {
            addScore(questionAmount)
            massReset()
        } else {
            minusScore(questionAmount)
            passCount++
            switchPlayer()
            resetForm()
            turnDisplay.textContent = `Player ${currentPlayer}'s Turn`
            lastAction.textContent = `Previous player's response is incorrect, player ${currentPlayer} is up`
            if (passCount === 2) {
                massReset()
            }
        }
    } else {
        massReset()
    }
})

passButton.addEventListener("click", evt => {
    evt.preventDefault()
    passCount++
    if (passCount === 2) {
        massReset()
    } else {
        switchPlayer()
        resetForm()
        turnDisplay.textContent = `Player ${currentPlayer}'s Turn`
        lastAction.textContent = `Previous player passed. Player ${currentPlayer} is up.`
    }
})