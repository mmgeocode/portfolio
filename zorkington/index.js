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
    constructor(name, description, inventory, lock, imobject, imobjdesc) {
        this.name = name
        this.description = description
        this.inventory = inventory
        this.lock = lock
        this.imobject = imobject
        this.imobjdesc = imobjdesc
    }
}

const start = new Room("start", "This is the starting room", ['bicycle'], false, 'note', '1234')
const middle = new Room("middle", "This is the middle room", [], true, "note", "1234")
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
    if (locationLookup[newLocation].lock == true) {
        console.log(`The door is locked`)
    } else if (locationStates[locationCurrent].includes(newLocation)) {
        locationCurrent = newLocation
    } else {
        console.log(`Cannot go from ${locationCurrent} to ${newLocation}`)
    }
    askInput()
}

// Search Location Function
function searchLocation(locationCurrent) {
    if (locationLookup[locationCurrent].inventory.length > 0) {
        console.log(`You see ${locationLookup[locationCurrent].inventory.join(", ")}`)
    } else {
        console.log(`You don't find anything`)
    }
    askInput()
}

// Check Inventory Function
function checkInventory() {
    if (player.inventory.length > 0) {
        console.log(`Inventory: ${player.inventory.join(", ")}`)
    } else {
        console.log(`There is nothing in your inventory`)
    }
    askInput()
}

// Take Item Function
function takeItem(item) {
    if (locationLookup[locationCurrent].inventory.includes(item)) {
        locationLookup[locationCurrent].inventory = locationLookup[locationCurrent].inventory.filter(i => i !== item)
        player.inventory.push(item)
        console.log(`You picked up ${item}`)
    } else {
        console.log(`You can't pick that up`)        
    }
    askInput()
}

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

// Examine Immutable Object Function
function examineObject(object) {
    if (locationLookup[locationCurrent].imobject.includes(object)) {
        console.log(`${locationLookup[locationCurrent].imobjdesc}`)
    } else {
        console.log(`Nothing to examine`)
    }
    askInput()
}

// Unlock Door
async function unlockDoor(room) {
    if (locationStates[locationCurrent].includes(room) && locationLookup[room].lock == true) {
        lockResponse = await ask(`What is the correct code: `)
        if (lockResponse == locationLookup[room].imobjdesc) {
            locationLookup[room].lock = false
            console.log(`The door is now unlocked`)
        } else {
            console.log(`The code combination is incorrect`)
        }
    } else {
        console.log(`The door is already unlocked`)
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
        } else if (answer[0] === 'take') {
            takeItem(answer[1])
        } else if (answer[0] === 'examine') {
            examineObject(answer[1])
        } else if (answer[0] === 'unlock') {
            unlockDoor(answer[1])
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