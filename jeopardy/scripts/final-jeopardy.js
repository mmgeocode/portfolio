import placeholderQuestions from "./placeholder-questions.js";

// Current player and switch player function--------------------------------
let currentPlayer = 1;

function switchPlayer() {
    currentPlayer = (currentPlayer === 1) ? 2 : 1;
}

// shows current player at top of page
let mainPlayerStatus = document.getElementById("status-player")
mainPlayerStatus.textContent = `Player ${currentPlayer}'s Turn`

// show player status at bottom
let finalStatus = document.getElementById("final-status")

// final question pull ------------------------------------------------------
const finalQuestion = placeholderQuestions.filter(question => question.category === "Final")

const finalRoundQuestion = document.getElementById("final-question-ask").textContent = `${finalQuestion[0].question}`

const finalAnswer = finalQuestion[0].answer

// pass data ------------------------------------------------------------------

const urlParams = new URLSearchParams(document.location.search)

const passPlayer1Score = Number(urlParams.get('p1s'))

const passPlayer2Score = Number(urlParams.get('p2s'))

// Score
let player1Score = passPlayer1Score;

let player2Score = passPlayer2Score;

let player1ScoreDisplay = document.getElementById('player1Score')
player1ScoreDisplay.textContent = player1Score

let player2ScoreDisplay = document.getElementById('player2Score')
player2ScoreDisplay.textContent = player2Score

// final input
let finalAnswerInput = document.getElementById("player-final-answer")

let finalAnswerWagerAmount = document.getElementById("final-bet-amount")

let player1WagerAmount;

let player2WagerAmount;

function wagerAmount(amount) {
    if (currentPlayer === 1) {
        player1WagerAmount = amount
    } else {
        player2WagerAmount = amount
    }
}

// score variables
let player1FinalAnswer;

let player2FinalAnswer;

let player1FinalScore;

let player2FinalScore;

// wager button
const wagerButton = document.getElementById("wager-button")

wagerButton.addEventListener("click", evt => {
    evt.preventDefault()
    wagerAmount(finalAnswerWagerAmount.value)
    if (currentPlayer === 1) {
        player1FinalAnswer = finalAnswerInput.value
        console.log(player1FinalAnswer)
        switchPlayer()
        document.getElementById("player-final-answer").value = ''
        document.getElementById("final-bet-amount").value = ''
        finalStatus.textContent = "Player 2 you are up"
    } else {
        player2FinalAnswer = finalAnswerInput.value
        endGame()
    }
})

// compute winner
function computePlayer1Score() {
    if (player1FinalAnswer.toLowerCase() === finalAnswer.toLowerCase()) {
        player1FinalScore = player1Score += Number(player1WagerAmount)
    } else {
        player1FinalScore = player1Score -= Number(player1WagerAmount)
    }
    console.log(player1FinalScore)
}

function computePlayer2Score() {
    if (player2FinalAnswer.toLowerCase() === finalAnswer.toLowerCase()) {
        player2FinalScore = player2Score += Number(player2WagerAmount)
    } else {
        player2FinalScore = player2Score -= Number(player2WagerAmount)
    }
    console.log(player2FinalScore)
}

function endGame() {

    computePlayer1Score()

    computePlayer2Score()

    if (player1FinalScore > player2FinalScore) {
        finalStatus.textContent = `Player 1 wins with a score of ${player1FinalScore} versus ${player2FinalScore}`
    } else {
        finalStatus.textContent = `Player 2 wins with a score of ${player2FinalScore} versus ${player1FinalScore} `
    }
}