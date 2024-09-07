// Readline
const { read } = require("fs")
const { resolve } = require("path")
const readline = require("readline")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

const ask = q => {
    return new Promise((resolve, reject) => {
        rl.question(q, resolve)
    })
}

// Class Constructor
class Room {
    constructor(name, description, inventory) {
        this.name = name
        this.description = description
        this.inventory = inventory
    }
}

const start = new Room("start", "This is the starting room", ['bicycle'])
const middle = new Room("middle", "This is the middle room", [])
const exit = new Room("exit", "This is the exit room", [])

// State Machines
let locationCurrent = "start"

const player = {
    name: '',
    inventory: ['dice', 'tea']
}

const locationLookup = {
    start,
    middle,
    exit
}

const locationStates = {
    start: ["middle"],
    middle: ["start", "exit"],
    exit: ["middle"]
}

// Move Location Function
function moveLocation(newLocation) {
    if (locationStates[locationCurrent].includes(newLocation)) {
        locationCurrent = newLocation
    } else {
        console.log(`Cannot go from ${locationCurrent} to ${newLocation}`)
    }
    askInput()
}

// Search Location Function
function searchLocation(locationCurrent) {
    if (locationLookup[locationCurrent].inventory) {
        console.log(`You see ${locationLookup[locationCurrent].inventory}`)
    } else {
        console.log(`You don't find anything`)
    }
    askInput()
}

// Check Inventory Function
function checkInventory() {
    if (player.inventory.length > 0) {
        console.log(`Inventory: ${player.inventory}`)
    } else {
        console.log(`There is nothing in your inventory`)
    }
    askInput()
}

// Take Item Function


// Drop Item Inventory
function dropItem(item) {
    if (player.inventory.includes(item)) {
        player.inventory = player.inventory.filter(i => i !== item)
        locationLookup[locationCurrent].inventory.push(item)
        console.log(`You drop ${item} in ${locationCurrent}`)
    } else {
        console.log(`You can't drop that`)
    }
    askInput()
}

// Ask for input from player
async function askInput() {
    if (locationCurrent === 'exit') {
        console.log(`Congratulations ${player.name}! You found the exit`)
        process.exit()
    } else {
        console.log(`You're at the ${locationLookup[locationCurrent].name} and it's ${locationLookup[locationCurrent].description}`)
        response = await ask(`>_`)
        answer = response.toLowerCase().split(' ')
        if (answer[0] === 'move') {
            moveLocation(answer[1])
        } else if (answer[0] === 'search') {
            searchLocation(locationCurrent)
        } else if (answer[0] === 'inventory') {
            checkInventory()
        } else if (answer[0] === 'drop') {
            dropItem(answer[1])
        } else {
            console.log(`Error`)
            askInput()
        }
    }
}

// Game Start Function
async function gameStart() {
    console.log(`Game Start: Version 0.1`)
    const nameQuestion = await ask('What is your name?: ')
    player.name = nameQuestion
    console.log(`Good luck ${player.name}!`)
    askInput()
}

gameStart()