// Import Readline -------------

const { resolve } = require('path');
const readline = require('readline');

const rl = readline.createInterface(process.stdin, process.stdout);

// Promises

function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve)
    })
}

// Variables

let min;
let max;
let gameType;
let answer;
let answerLowerCase;
let secretNumber;
let guess;
let count = 1;

// Lower Case Function

function lowerCase(answer) {
    answerLowerCase = answer.toLowerCase()
}

// Set Minimum Range Function

async function setMinRange() {

    min = await ask("What number would you like for the minimum range?: ")

    if (Number(min)) {
        setMaxRange()
        
    } else {
        console.error("\u001b[31m --- ERROR: Please only input a number --- \u001b[37m")
        setMinRange()
    }

}

// Set Maximum Range Function

async function setMaxRange() {
    
    max = await ask ("What number would you like for the maximum range?: ")

    if (max < min) {
        console.error("\u001b[31m --- ERROR: Please input a number greater than the minimum --- \u001b[37m")
        setMaxRange()
    } else if (Number(max) && gameType === 'normal') {
        playerNumber()
    } else if (Number(max) && gameType === 'reverse') {
        secretNumber = getRandomInt(min, max)
        console.clear()
        console.log("I have my number... good luck!")
        reverseGame()
        
    } else {
        console.error("\u001b[31m --- ERROR: Please only input a number --- \u001b[37m")
        setMaxRange()
    }
}

// Player Selects Secret Number

async function playerNumber() {

    secretNumber = await ask(`Please choose a number between ${min} and ${max}\nI promise not to peak: `)

    if (Number(secretNumber) >= min && Number(secretNumber) <= max) {
        console.clear()
        console.log("Number set... now let's count how many tries it takes me to figure out")
        normalGame()
    } else {
        console.error(`\u001b[31m --- ERROR: Please choose a number between ${min} and ${max} --- \u001b[37m`)
        playerNumber()
    }
}

// Binary Search Function

function binarySearch(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor((max + min) / 2);
}

// Random Integer Function for Computer Secret Number

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

// Game Start

async function gameStart() {

    answer = await ask("Welcome to guess the number.\nWould you like to have me (the computer) guess your number?\nor would you like to try and guess my number?\nPlease input either 'computer' or 'player': ")

    lowerCase(answer)

    if (answerLowerCase === 'computer') {
        console.clear()
        gameType = 'normal'
        console.log("Great! I'll try to guess your number")
        return setMinRange()
    } else if (answerLowerCase === 'player') {
        console.clear()
        gameType = 'reverse'
        console.log("Sounds fun! Good luck guessing my number")
        return setMinRange()
    } else {
        console.clear()
        console.error("\u001b[31m --- ERROR: Please input either 'computer' or 'player' --- \u001b[37m")
        return gameStart()
    }
}

// Normal Game

async function normalGame() {

    if (min <= max) {
        
        guess = binarySearch(min, max)

        if (Number(secretNumber) === guess) {
            console.log(`\u001b[32mYour number must be ${secretNumber}.\nMy total guess count is ${count}\u001b[37m`)
            gameOver()
        } else {
            console.log(`My guess is ${guess}`)
            answer = await ask("Is your number 'H' higher or 'L' lower?: ")
            lowerCase(answer)

            if (answerLowerCase === 'h' && secretNumber > guess) {
                min = guess
                count++
                normalGame()
            } else if (answerLowerCase === 'l' && secretNumber < guess) {
                max = guess
                count++
                normalGame()
            } else if (answerLowerCase === 'h' && secretNumber < guess || answerLowerCase === 'l' && secretNumber > guess) {
                console.error("\u001b[31m --- Cheater Detected... Please be honest --- \u001b[37m")
                normalGame()
            } else {
                console.error("\u001b[31m --- ERROR: Please input either 'H' or 'L' --- \u001b[37m")
                normalGame()
            }
        }

    } else {
        console.error("Your min/max range doesn't seem right. Please reset minimum and maximum")
        setMinRange()
    }

}

// Reverse Game

async function reverseGame() {
    // console.log("Reverse Game Works")

    if (min <= max) {

        // console.log(`I have my number, your current guess count is ${guess}`)

        guess = await ask(`Please input a number between ${min} and ${max}: `)

        if (Number(guess) === secretNumber) {
            console.log(`\u001b[32mCongratulations! My number was ${secretNumber} and your guess count is ${count}\u001b[37m`)
            gameOver()
        } else if (Number(guess) < min || Number(guess) > max) {
            console.error(`\u001b[31m --- ERROR: Please input a number between ${min} and ${max} --- \u001b[37m`)
        } else if (Number(guess) > secretNumber) {
            console.log("My number is lower than your guess")
            count++
            reverseGame()
        } else if (Number(guess) < secretNumber) {
            console.log("My number is higher than your guess")
            count++
            reverseGame()
        } else {
            console.error("\u001b[31m --- ERROR: Please input a number --- \u001b[37m")
            reverseGame()
        }
        
    } else {
        console.error("Your min/max range doesn't seem right. Please reset minimum and maximum")
        setMinRange()
    }
}

// Game Over Reset

async function gameOver() {

    answer = await ask("Would you like to play again?\nInput 'Y' for yes, 'N' for no: ")

    lowerCase(answer)

    if (answerLowerCase === 'y') {
        console.clear()
        console.log("\u001b[35m***** RESTARTING GAME *****\u001b[37m")
        count = 1;
        return gameStart()
    } else if (answerLowerCase === 'n') {
        console.log("Goodbye! Thanks for playing")
        process.exit()
    } else {
        console.clear()
        console.error("\u001b[31m --- ERROR: Please input either 'Y' or 'N' --- \u001b[37m")
        return gameOver()
    }
}

// Call Game Start Function

gameStart()