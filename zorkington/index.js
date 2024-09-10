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
    constructor(name, description, inventory, lock, lockCode, roomObject, roomObjectDescription, itemLock, itemLockKey, itemLockDescription) {
        this.name = name
        this.description = description
        this.inventory = inventory
        this.lock = lock
        this.lockCode = lockCode
        this.roomObject = roomObject
        this.roomObjectDescription = roomObjectDescription
        this.itemLock = itemLock
        this.itemLockKey = itemLockKey
        this.itemLockDescription = itemLockDescription
    }
}

// Rooms
const bedroom = new Room("bedroom", 'The walls and floor appear to be made of wet paint in a variety of bright colors. However, the paint does not smear when pressing against the surface. Located on a wall is a framed PHOTOGRAPH. There is a door to the HALLWAY with a small speaker near the handle... "who puts a speaker on a door?"', [], false, null, 'photograph', 'A black and white photograph but the colors are opposite. The title on a small plaque is, "Speak Opposite to Open".', false, null, null)

const hallway = new Room("hallway", "The floor, walls, and ceiling of this hallway is covered in orange shag carpet. You see a LAMP resting on a small table in the middle of the hallway. There are entrances to a GUEST bedroom, a BATHROOM, an OFFICE, and a pathway that leads to the KITCHEN and LIVING room.", ['key'], true, 'close', 'lamp', 'You examine the lamp and find nothing out of place. After turning the lamp on, the colors change in progression of a rainbow. Red, Orange, Yellow, Blue, Green, Indigo, and then Violet', false, null, null)

const kitchen = new Room('kitchen', 'This kitchen is made entirely out of cardboard... nothing actually works. Everything is essentially a prop with no functional use. You see a door leading to the GARAGE and pathways to the LIVING room and HALLWAY. Some of the food around the kitchen may actually be real', ['carrot'], false, null, null, null, false, null, null)

const living = new Room('living', "You have never seen so many types of wood paneling covering everything before. Even the furniture is completely made out of wood and looks very uncomfortable. In the center of the room, there is a massive metal DOOR with what appears to be blue eyeballs.", [], false, null, 'door', 'As you approach the scary door it begins to speak. "BE GONE FROM MINE HOME THY VILE CREATURE! GO LOOK AT THINE FOULNESS IN A MIRROR!"', false, null, null)

const guest = new Room('guest', "If any guests have ever stayed here before, the most likely would have been disturbed by the gothic decor. Black stone covered the floors, walls, and ceiling complete with black metal spikes. You dare not attempt to lie down on the charcoal colored bed. There may be something in the nightstands.", ['keycard'], false, null, null, null, true, 'carrot', 'There is a sculpture of a rabbit with an open mouth where the doorhandle should be. Place something in the mouth?: ')

const bathroom = new Room("bathroom", "This is the exit room", [], false, null, null, null, true, 'key', 'A keyhole')

// State Machines
let locationCurrent = "bedroom"

const player = {
    name: '',
    inventory: []
}

const locationLookup = {
    bedroom,
    hallway,
    kitchen,
    living,
    bathroom
}

const locationStates = {
    bedroom: ["hallway"],
    hallway: ["bedroom", "bathroom", "kitchen", "living", "guest"],
    guest: ["hallway"],
    kitchen: ["hallway", "living", "garage"],
    living: ["hallway", "kitchen"],
    bathroom: ["hallway"]
}

// Move Location Function
function moveLocation(newLocation) {
    if (locationLookup[newLocation].lock == true || locationLookup[newLocation].itemLock == true) {
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
    if (locationLookup[locationCurrent].roomObject.includes(object)) {
        console.log(`${locationLookup[locationCurrent].roomObjectDescription}`)
    } else {
        console.log(`You find nothing to examine`)
    }
    askInput()
}

// Unlock Door
async function unlockDoor(room) {
    if (locationStates[locationCurrent].includes(room) && locationLookup[room].lock == true) {
        lockResponse = await ask(`What is the password: `)
        if (lockResponse == locationLookup[room].lockCode) {
            locationLookup[room].lock = false
            console.log(`The door is now unlocked`)
        } else {
            console.log(`The code combination is incorrect`)
        }
    } else if (locationStates[locationCurrent].includes(room) && locationLookup[room].itemLock == true) {
            console.log(`${locationLookup[room].itemLockDescription}`)
            itemLockResponse = await ask(`What item do you use with the lock?: `)
            if (player.inventory.includes(itemLockResponse)) {
                locationLookup[room].itemLock = false
                console.log('The door is now unlocked')
                player.inventory = player.inventory.filter(i => i !== itemLockResponse)
            } else {
                console.log('That item is not in your inventory')
            }
    } else {
        console.log(`The door is already unlocked`)
    }
    askInput()
}

// Help Function
function helpPlayer() {
    console.log('type MOVE + ROOM NAME to move between rooms')
    console.log('type SEARCH to search the current room')
    console.log('type EXAMINE + ROOM OBJECT to investigate an object within the room')
    console.log('type INVENTORY to check your inventory')
    console.log('type TAKE + ITEM NAME to pick up an item from the room')
    console.log('type DROP + ITEM NAME to drop an item into the current room')
    console.log('type UNLOCK + ROOM NAME to attempt unlocking a locked door')
    console.log('type HELP to see this explanation again')
    askInput()
}

// Ask for input from player
async function askInput() {
    if (locationCurrent === 'exit') {
        console.log(`Congratulations ${player.name}! You found the exit`)
        process.exit()
    } else {
        console.log(`You're in the ${locationLookup[locationCurrent].name}. ${locationLookup[locationCurrent].description}`)
        response = await ask(`Input your action. Type 'help' for a list of actions.\n>_`)
        answer = response.toLowerCase().split(' ')
        console.clear()
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
        } else if (answer[0] === 'help') {
            helpPlayer()
        } else {
            console.log(`Error`)
            askInput()
        }
    }
}

// Game Start Function
async function gameStart() {
    console.log(`The Scary Door: Version 0.2`)
    console.log(`You wake up in a strange bedroom you have never seen before. The last thing you remember is eating the "Froot" salad from Fishy Joe's. A strange uneasyness feeling sinks in your stomach... "I've got to get out of here," you think to yourself.`)
    const nameQuestion = await ask('But first... what is my name?: ')
    player.name = nameQuestion
    console.log(`Good luck ${player.name}!`)
    askInput()
}

gameStart()