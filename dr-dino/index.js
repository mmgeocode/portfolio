const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Game State

const player = {
    name: '',
    location: 'entrance',
    time: 'American Museum of Natural History',
    inventory: [],
}

function displayLocation() {
    console.clear()
    console.log(`\x1b[35mYou are at the ${player.location} of the ${player.time}\x1b[0m`)

    // Player Inventory Display
    if (player.inventory.length > 0) {
        console.log('Inventory: ' + player.inventory.join(', '))
    }

    // Different cases based on player location
    switch (player.location) {
        case 'entrance':
            console.log("You enter the American Museum of Natural History and climb the stairs to the fourth floor. \nThere are hallways to the left and right that lead to dinosaur exhibits. \nDo you want to go LEFT or RIGHT?")
            break;
        case 'exhibit':
            console.log("You begin to walk through the Ornithischian Dinosaurs exhibit and admire the displays. \nYou notice a door in the corner with a small plaque that reads, 'Dr. Williams Paleontology Lab'. \nDo you CONTINUE the exhibit tour or ENTER the labratory?")
            break;
        case 'ticketed_exhibit':
            console.log("You encounter an usher who asks, 'Do you have a ticket? This temporary exhibition requires an additional ticket for entry.' \nDo you want to RETURN to the entrance for the fourth floor?")
            break;
        case 'paleontology_lab':
            console.log("You push on the door and it opens without any force.\nYou see lots of cabinets and labratory equipment throughout the large room.\nThere is an odd egg shaped machine the size of a person in the corner.\nDo you INSPECT the machine or EXPLORE the lab looking at the fossils?")
            break;
        case 'fossil_lab':
            console.log("You begin to open drawers and look at fossils when Dr. Williams returns.\n'WHO ARE YOU AND WHAT ARE YOU DOING IN MY LAB,' screams Dr. Williams.\nSecurity runs into the lab and arrests you... the rest of your day is spent in a jail cell\nGAME OVER")
            rl.close()
            break;
        case 'machine':
            console.log("Upon further inspection of the machine, you notice a big red button inside. \nThere are a lot of flashing lights, dials, and gauges. \nWhat would you like to do? PUSH the red button or LEAVE the machine alone?")
            break;
        case 'landing_zone':
            console.log("Dazed and confused you stumble out of the strange machine.\nA soothing robotic voice speaks from a speaker inside the machine, 'You are have landed in the Jurassic Period of what becomes the state of Colorado. \nYou begin to scout the area around the time machine. \nThe surrounding environment is plains that are crossed by slow-moving rivers. \nAfter spending several hours walking around, you can either EXPLORE more of the area or RETURN to the time machine.")
            break;
        case 'missing_time_machine':
            console.log("OH NO!!!!! The time machine is missing. \nAll that remains are charred grass in the area you left the machine. \nIn that moment, you hear a loud and vicous roar coming from behind you. \nA Dimorphodon is flying in circles above you. \nDo you stay and FIGHT or RUN away?")
            break;
        case 'plains':
            console.log("You sprint as fast as you can. \nWhile you are running, you encounter a Stegosaurus that panics when seeing what's chasing you. \nJust as the Dimorphodon is about to catch you, the Stegosaurus swings its spiked tail that makes a loud thud with the ground. \nThe Dimorphodon makes a terrified screech and quickly flies away. \nYou keep sprinting until your legs and lungs give out, causing you to fall face first into some mud. \nAfter regaining your breath, you look up and see a strange figure in the distance that looks like a human. \nYou yell out, 'HEY!' at the top of your lungs and begin to chase the figure. \nThe figure has completely disappeared and you find no evidence of footprints. \nDiscouraged, you begin to walk along a river stream and begin to ponder about what to do next. \nAfter a few hours of walking, you see in the distance a corpse of the Stegosaurus that saved your life. \nStanding over the body is a large creature with two horns and skinny legs. \nYou wonder whether you can TAME the creature or should RUN away?")
            break;
        case 'river':
            console.log("You sprint back in the opposite direction along the river. \nAfter a few moments, you peak back over your shoulder to see what you now know is an Allosaurus feasting on the Stegosaurus. \nYou begin to slow down your stride when you encounter a human filling a canteen in the water. \n'Hello there! I'm Dr. Williams and you must be the person who activated my time machine. Fear not, I keep a shrink ray in my pocket and shrunk the machine to carry around. The machine you used is not finished but luckily I still have another prototype.' \nDr. Williams pulls out his shrink ray, flips the switch to enlarge, and targets a peanut sized shape on the ground. \nA similar looking time machine appears before you and Dr. Williams motions you inside. \nDo you ENTER the machine or REFUSE?")
            break;
        case 'vast_plains':
            console.log('After walking for a few more hours, you stumble upon what looks like a Stegosaurus. \nThe massive creature is munching upon some plants until he looks up and is startled to see you. \nActing in defense, the Stegosaurus swings its spiked tail that smashes into your chest before being able to react. \n----GAME OVER----')
            rl.close()
            break;
        case 'stegosaurus_corpse':
            console.log(`The large creatures looks at you in puzzlement as you approach. \nYou realize too late that this dinosaur is an Allosaurus when you begin to run. \nThe last thing you remember is being quickly run down by the large creature. \nAn Allosaurus has eaten a light appetizer of ${player.name}. \n----GAME OVER----`)
            rl.close()
            break;
        case 'empty_landing_site':
            console.log(`Dr. Williams shrugs his head and enters his time machine. \nA large flash blinds your vision momentarily and the machine is no longer there. \n${player.name} is never heard from again. \n----GAME OVER----`)
            rl.close()
            break;
        case 'water_landing_zone':
            console.log("The machine starts up and emits a loud, electrical bang that causes your vision to go white. \nAfter a few moments, you regain your vision and hear an alarm ringing in the time machine. \n'WHOOPS,' blurts out Dr. Williams. 'The dial was set to the Cretaceous Period in Colorado which means.... THIS AREA IS UNDER WATER.' \nYou remember from your studies this is the Western Interior Seaway as you swim out of the hatch. \nDr. Williams uses his shrink ray to enlarge a grape sized shape that turns into a zodiac boat. \n'I also have an airplane in my pocket.' \nAfter catching your breath, you realize that you can EXPLORE in the zodiac boat or FLY the airplane.")
            break;
        case 'coast':
            console.log("After traveling by boat for almost a day, you finally see a coast off in the distance. 'We need to find some resources to repair the time machine you broke. Let's search around here for a bit,' suggests Dr. Williams. \nWalking around for a few hours, you encounter a Triceratops that looks friendly. \nDo you EXAMINE and get closer to the Triceratops, or EXPLORE in a different direction?")
            break;
        case 'ocean':
            console.log(`The airplane is built for water landings which allows your group to take off. \nAfter flying for several hours the low fuel warning begins to flash. \n'UH OHHHHH,' you both say as the plane begins to descend into a vast ocean. \nDr. Williams and ${player.name} are never heard from again. \n----GAME OVER----`)
            rl.close()
            break;
        case 'land':
            console.log("The Triceratops is indeed friendly and welcoming to your presence. \nThe creature begins to follow your group as you continue to explore for resources. \nSuddenly, you hear a ferocious roar in front of you as an extremely large creature comes running towards your direction. \nWithout hesitation, you either decide to either RUN or WATCH the large creature.")
            break;
        case 'animal_encounter':
            console.log(`After a few minutes of walking, you hear a loud roar to your right side. \nYou turn and see a massive Tyrannosaurus Rex sprinting full speed. \nIn an instant, ${player.name} and Dr. Williams become a light appetizer. \n----GAME OVER----`)
            rl.close()
            break;
        case 'land_battle':
            console.log("As the Tyrannosaurus Rex starts to creep toward your group, the Triceratops sprints at the intimidating creature. \nA loud roar and wimpering sobs is all the Tyrannosaurus emits as it limps away after loosing the fight with the Triceratops. \nThe victorious Triceratops begins to walk away. \nDo you FOLLOW the creature, or do you LEAVE the creature alone?")
            break;
        case '':
            console.log()
            break;
        case '':
            console.log()
            break;
        case '':
            console.log()
            break;
        case '':
            console.log()
            break;
        case '':
            console.log()
            break;
        case '':
            console.log()
            break;
        case '':
            console.log()
            break;
        case '':
            console.log()
            break;
        case '':
            console.log()
            break;

        default:
            break;
    }
}

// Function to handle user input
function handleInput(input) {
    switch (player.location) {
        case 'entrance':
            if (input.toLowerCase() === 'left') {
                player.location = 'exhibit'
            } else if (input.toLowerCase() === 'right') {
                player.location = 'ticketed_exhibit'
            }
            break;
        case 'exhibit':
            if (input.toLowerCase() === 'continue') {
                player.location = 'entrance'
            } else if (input.toLowerCase() === 'enter') {
                player.location = 'paleontology_lab'
            }
            break;
        case 'ticketed_exhibit':
            if (input.toLowerCase() === 'return') {
                player.location = 'entrance'
            } 
            break;
        case 'paleontology_lab':
            if (input.toLowerCase() === 'inspect') {
                player.location = 'machine'
            } else if (input.toLowerCase() === 'explore') {
                player.location = 'fossil_lab'
            }
            break;
        case 'machine':
            if (input.toLowerCase() === 'push') {
                player.location = 'landing_zone'
                player.time = 'Jurassic Period'
                console.log("Dazed and confused you stumble out of the strange machine.\nA soothing robotic voice speaks from a speaker inside the machine, 'You are have landed in the Jurassic Period of what becomes the state of Colorado.' ")
            } else if (input.toLowerCase() === 'leave') {
                player.location = 'paleontology_lab'
            }
            break;
        case 'landing_zone':
            if (input.toLowerCase() === 'return') {
                player.location = 'missing_time_machine'
            } else if (input.toLowerCase() === 'explore') {
                player.location = 'vast_plains'
            }
            break;
        case 'missing_time_machine':
            if (input.toLowerCase() === 'run') {
                player.location = 'plains'
            } else if (input.toLowerCase() === 'fight') {
                player.location = ''
                console.log(`You grab a stone from the ground and throw as hard as you can. \nThe stone barely misses the Dimorphodon as they swoop down from the sky. \nThe last thing you remember is a loud thud that knocks all of the air out of your body.\nThe dinosaur has is quite full after feasting on ${player.name}. \n----GAME OVER----`)
                rl.close()
            }
            break;
        case 'plains':
            if (input.toLowerCase() === 'run') {
                player.location = 'river'
            } else if (input.toLowerCase() === 'tame') {
                player.location = 'stegosaurus_corpse'
            }
            break;
        case 'river':
            if (input.toLowerCase() === 'enter') {
                player.location = 'water_landing_zone'
                player.time = 'Cretaceous Period'
                console.log('END OF ACT I')
            } else if (input.toLowerCase() === 'refuse') {
                player.location = 'empty_landing_site'
            }
            break;
        case 'water_landing_zone':
            if (input.toLowerCase() === 'explore') {
                player.location = 'coast'
            } else if (input.toLowerCase() === 'fly') {
                player.location = 'ocean'
            }
            break;
        case 'coast':
            if (input.toLowerCase() === 'examine') {
                player.location = 'land'
            } else if (input.toLowerCase() === 'explore') {
                player.location = 'animal_encounter'
            }
            break;
        case 'land':
            if (input.toLowerCase() === 'watch') {
                player.location = 'land_battle'
            } else if (input.toLowerCase() === 'run') {
                player.location = 'land_plains'
            }
            break;
        case '':
            if (input.toLowerCase() === '') {
                player.location = ''
            } else if (input.toLowerCase() === '') {
                player.location = ''
            }
            break;
        case '':
            if (input.toLowerCase() === '') {
                player.location = ''
            } else if (input.toLowerCase() === '') {
                player.location = ''
            }
            break;
        case '':
            if (input.toLowerCase() === '') {
                player.location = ''
            } else if (input.toLowerCase() === '') {
                player.location = ''
            }
            break;
        case '':
            if (input.toLowerCase() === '') {
                player.location = ''
            } else if (input.toLowerCase() === '') {
                player.location = ''
            }
            break;
        case '':
            if (input.toLowerCase() === '') {
                player.location = ''
            } else if (input.toLowerCase() === '') {
                player.location = ''
            }
            break;
        case '':
            if (input.toLowerCase() === '') {
                player.location = ''
            } else if (input.toLowerCase() === '') {
                player.location = ''
            }
            break;
        case '':
            if (input.toLowerCase() === '') {
                player.location = ''
            } else if (input.toLowerCase() === '') {
                player.location = ''
            }
            break;
        case '':
            if (input.toLowerCase() === '') {
                player.location = ''
            } else if (input.toLowerCase() === '') {
                player.location = ''
            }
            break;
        case '':
            if (input.toLowerCase() === '') {
                player.location = ''
            } else if (input.toLowerCase() === '') {
                player.location = ''
            }
            break;
        case '':
            if (input.toLowerCase() === '') {
                player.location = ''
            } else if (input.toLowerCase() === '') {
                player.location = ''
            }
            break;
        case '':
            if (input.toLowerCase() === '') {
                player.location = ''
            } else if (input.toLowerCase() === '') {
                player.location = ''
            }
            break;
        case '':
            if (input.toLowerCase() === '') {
                player.location = ''
            } else if (input.toLowerCase() === '') {
                player.location = ''
            }
            break;
        case '':
            if (input.toLowerCase() === '') {
                player.location = ''
            } else if (input.toLowerCase() === '') {
                player.location = ''
            }
            break;

        default:
            console.log('Invalid input.')
            break;
    }

    displayLocation()

}

// Start the game
console.log("Welcome to Dr. Dino! Whinsley's Text Adventure Game!");
rl.question("What is your name? ", (name) => {
    player.name = name;
    displayLocation();
    rl.on('line', (input) => {
        handleInput(input)
    });
})