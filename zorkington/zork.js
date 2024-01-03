// Readline
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

// Rooms

let start = {
    roomName: 'start',
    roomDescription: 'START DESCRIPTION TEXT',
    roomLock: false,
    roomInventory: []
}

let room1 = {
    roomName: 'room1',
    roomDescription: 'ROOM1 DESCRIPTION TEXT',
    roomLock: false,
    roomInventory: ['key']
}

let room2 = {
    roomName: 'room2',
    roomDescription: 'ROOM2 DESCRIPTION TEXT',
    roomLock: false,
    roomInventory: []
}

let exit = {
    roomName: 'exit',
    roomDescription: 'EXIT DESCRIPTION TEXT',
    roomLock: false,
    roomInventory: []
}

let roomLookUp = {
    start,
    room1,
    room2,
    exit
}

// Player State
const player = {
    name: '',
    location: 'room1',
    inventory: [],
}

// Room State
const roomState = {
    start: ['room1'],
    room1: ['start', 'room2'],
    room2: ['room1', 'exit'],
    exit: []
}

// Variables
let response;
let answer;
let availableRoom = roomState[player.location]
let currentRoom = player.location
let nextRoom;
let room;

// ! Functions - MOVE, INTERACT, SEARCH, INVENTORY, TAKE, DROP, HELP

// * Move Function

function moveRoom(newRoom) {

    availableRoom = roomState[player.location]
    
    if (availableRoom.includes(newRoom)) {
        player.location = newRoom
        console.clear();
        askInput()
    } else {
        console.clear()
        console.log('You can not access that room from here')
        askInput()
    }

}

// * INTERACT FUNCTION



// * SEARCH ROOM FUNCTION

function searchRoom(roomName) {

    room = roomLookUp[roomName]

    if (room) {
        console.clear()
        console.log(room.roomDescription)
        askInput()
    } else {
        console.log('Error: Room not found')
        askInput()
    }

}

// * Inventory Function

function checkInventory() {

    console.clear()
    
    if (player.inventory.length > 0) {
        console.log("Inventory: " + player.inventory.join(", "))
        askInput()
    } else {
        console.log("There is nothing in your inventory")
        askInput()
    }

}

// * Take Item

function takeItem(item) {
    
    console.clear()

    room = roomLookUp[currentRoom]

    if (room.roomInventory.includes(item)) {
        player.inventory.push(item)
        room.roomInventory = room.roomInventory.filter(i => i !== item)
        console.log(`You picked up ${item}`)
        askInput()
    } else {
        console.log("You can't pick that up")
        askInput()
    }

}

// * DROP ITEM

function dropItem(item) {

    console.clear()
    
    const room = roomLookUp[currentRoom];

    if (player.inventory.includes(item)) {
        player.inventory = player.inventory.filter(i => i !== item)
        room.roomInventory.push(item)
        console.log(`You drop ${item} in ${currentRoom}`)
        askInput()
    } else {
        console.log("You can't drop that")
        askInput()
    }

}

// Asking Player for Input
async function askInput() {

    if (player.location === 'exit') {
        console.log(`Congratulations ${player.name}! You found the exit`)
        process.exit()
    } else {
        console.log(`You are currently in ${player.location}.\nType MOVE, SEARCH, INVENTORY, TAKE, DROP, or HELP`)

        response = await ask("Input your next action: \n>_")
    
        answer = response.toLowerCase().split(' ')

        if (answer[0] === 'move') {
            moveRoom(answer[1])
        } else if (answer[0] === 'search') {
            searchRoom(currentRoom)
        } else if (answer[0] === 'inventory') {
            checkInventory()
        } else if (answer[0] === 'take') {
            takeItem(answer[1])
        } else if (answer[0] === 'drop') {
            dropItem(answer[1])
        } else {
            console.clear()
            console.log('That command is not recognized')
            askInput()
        }

    }

}

// Start the game
console.log("Welcome to Mike's Text Adventure Game")
rl.question("What is your name? ", (name) => {
    player.name = name;
    console.log(`Good luck ${player.name}! To win, find the exit`);
    askInput();
})