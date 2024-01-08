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
            console.log("Dazed and confused you stumble out of the strange machine.\nA soothing robotic voice speaks from a speaker inside the machine, 'You have landed in the Jurassic Period of what becomes the state of Colorado. \nYou begin to scout the area around the time machine. \nThe surrounding environment is plains that are crossed by slow-moving rivers. \nAfter spending several hours walking around, you can either EXPLORE more of the area or RETURN to the time machine.")
            break;
        case 'missing_time_machine':
            console.log("OH NO!!!!! The time machine is missing. \nAll that remains are charred grass in the area you left the machine. \nIn that moment, you hear a loud and vicous roar coming from behind you. \nA Dimorphodon is flying in circles above you. \nDo you stay and FIGHT or RUN away?")
            break;
        case 'plains':
            console.log("You sprint as fast as you can. \nWhile you are running, you encounter a Stegosaurus that panics when seeing what's chasing you. \nJust as the Dimorphodon is about to catch you, the Stegosaurus swings its spiked tail that makes a loud thud with the ground. \nThe Dimorphodon makes a terrified screech and quickly flies away. \nYou keep sprinting until your legs and lungs give out, causing you to fall face first into some mud. \nAfter regaining your breath, you look up and see a strange figure in the distance that looks like a human. \nYou yell out, 'HEY!' at the top of your lungs and begin to chase the figure. \nThe figure has completely disappeared and you find no evidence of footprints. \nDiscouraged, you begin to walk along a river stream and begin to ponder about what to do next. \nAfter a few hours of walking, you see in the distance a corpse of the Stegosaurus that saved your life. \nStanding over the body is a large creature with two horns and skinny legs. \nYou wonder whether you can TAME the creature or should RUN away?")
            break;
        case 'dimo_fight':
            console.log(`You grab a stone from the ground and throw as hard as you can. \nThe stone barely misses the Dimorphodon as they swoop down from the sky. \nThe last thing you remember is a loud thud that knocks all of the air out of your body.\nThe dinosaur has is quite full after feasting on ${player.name}. \n----GAME OVER----`)
            rl.close()
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
        case 'land_plains':
            console.log(`As you begin to run away, the Tyrannosaurus Rext recognizes you as an easier prey. \nThe massive creature easily catches and makes Dr. Williams and ${player.name} a tasty snack. \n----GAME OVER----`)
            rl.close()
            break;
        case 'lake':
            console.log("Your group follows the Triceratops and eventually arrives at a lake. \n'Perfect! This lake has the moss, water, and Onchopristisca (a sawfish) that we need to make my patented bio fuel. Please help me build fish traps and gather moss,' says Dr. Williams. \nYou spend the next two days gathering resources for another enlarged contraption from Dr. Williams pocket. \n'Let's also expand the plane to take our Triceratops friend.' \nYou watch the doctor play with what looks like legos before the enlarge process takes hold and poof! There is a plane large enough to hold your group. \nI estimate our fuel reserves can fly us to ancient MOROCCO or to ANOTHER country. Which do you choose?")
            break;
        case 'open_land':
            console.log(`Without the local guide Triceratops, your group becomes lost and never discovers the resources needed to return to present time. \nIn the near future, a group of paleontologists discover the fossil remains of ${player.name} and Dr. Williams. \n----GAME OVER----`)
            rl.close()
            break;
        case 'ancient_Morocco':
            console.log("Your plane lands on a biome border of a desert and forest in what will become modern Morocco. \n'Why don't you take our Triceratops friend out to eat some leafy greens,' says Dr. Williams. \nYou lead the Triceratops to a prime herbavore feasting spot when the ground begins to shake. \nYou instantly recoginize a Spinosaurus walking towards you. \nDo you try to RUN or TALK to the massive creature?")
            break;
        case 'open_ocean':
            console.log(`'UH OHHHHH' yells Dr Williams. 'I'm a paleontologist and not a chemist... I overestimated our fuel efficiency.' \nDr. Williams and ${player.name} are never heard from again. \n----GAME OVER----`)
            rl.close()
            break;
        case 'fishing_grounds':
            console.log("You notice that the large Spinosaurus has a fish in its mounth. \nAt that moment, you remember this dinosaur is a piscivore and its holding an Onchopristica within its jaws... the same fish you need in order to make the bio fuel. \nYou follow the intimidating creature to a river where you put your fishing skills to use. \nAfter catching numerous fish, and rewarding your friendly Spinosaurus, you begin to walk back to the plane. \nWalking over a hill, you see the corpse of a gigantic Sauropod. \nFeeding on the corpse is a Carcharodontosaurus. \nDo you try to surprise the dinosaur and FIGHT with your crew, or try to become FRIENDS with the Carcharodontosaurus?")
            break;
        case 'river_flee':
            console.log(`The Triceratops sees you panic and flees the Spinosaurus with you. \nThe pathway gets too narrow between trees and the Triceratops spears you with one of its horns. \nPaleontologists discover the human rib cage of ${player.name} fossilized around a Triceratops horn in the near future. \n----GAME OVER----`)
            rl.close()
            break;
        case 'Morocco_landing_zone':
            console.log("You quickly throw one of your fish towards the Carcharondontosaurus. \nThe dinosaur cautiously approaches and begins feasting on the fresh catch. \nAfter finishing the meal, the Carcharondontosaurus follows your group back to landing site of the plane. \nDr. Williams looks on in amazement and relief at the herd of dinosaurs you have collected along with the resources. \n'With our fuel replenished, we should fly to Mongolia to collect the resources needed to repair the time machine,' says Dr. Williams. \nThe plane is expanded to account for the group of dinosaurs and quickly takes off towards Mongolia. \nAfter several hours of flying, should LAND?")
            break;
        case 'pack_encounter':
            console.log(`You try to surprise attack the Carcharodontosaurus but it sees you approach. \nThe dinosaur makes some loud screeching noises while running away. \nYour dinosaur crew follows you trying to run down the fleeing dinosaur. \nThe Carcharondontosaurus stops running and begins to attack the Spinosaurus when a whole pack of over twelve dinosaurs appear. \n${player.name} and their crew of dinosaurs become a magnificent feast for the pack of Carcharodontosaurus. \n----GAME OVER----`)
            break;
        case 'desert':
            console.log("After taking off in the airplane from Morocco, you eventually see a vast desert and mountainous region on the horizon. \n'Ahhhh, this must be where present day Mongolia becomes,' says Dr. Williams. \n'My sensors indicate this is the place with the metals and rare earth elements we need to repair the Time Machine. \nWhy don't you take our dinosaur group out to get some food while I work,' suggests Dr. Williams. \nYou lead the herd of dinosaurs out to search for food when you encounter a lone Protoceratops. \nDo you try to TALK to the dinosaur, or continue to EXPLORE?")
            break;
        case 'desert_exploration':
            console.log("You use caution around the Protoceratops and begin to explore the desert in search of food. \nNot long after you begin to hear strange noises coming over the hills. \nYou pause in your tracks as you see a pack of Velociraptors begin to approach your group. \nDo you RUN from or STAY with the Velociraptors?")
            break;
        case 'desert_encounter':
            console.log(`As you approach the Protoceratops, it takes one look at you before quickly biting your leg. \nYou yell out in pain but no one shows up to help. \n${player.name} is never heard from again. \n----GAME OVER----`)
            rl.close()
            break;
        case 'freezing_desert':
            console.log("While walking in the desert, the temperature begins to drop rapidly as the sun sets. \nYou begin to wonder what elevation and season you are in because freezing winds begin to blow. \nThe pack of Velociraptors seem curious about your presence and have not shown any hostility. \nThe feathered creatures begin to hudle around you but the Spinosaurus, Carcharodontosaurus, and Triceratops do not look well and begin to panic. \nDo you try to HERD your group back to the landing site, or LEAVE the massive creatures alone?")
            break;
        case 'pack_encounter':
            console.log(`You quickly turn around and sprint in the opposite direction. \nLoud screeching and the sounds of battle erupt behind you. \nAfter quickly looking back to see if a Velociraptor is chasing, you are shocked to se the Protoceratops in front of you. \nBefore you can dodge, the creature tramples you before running off. \nWith your last moments of vision, the pack of Velociraptors find you. \n${player.name} ends up as raptor food. \n----GAME OVER----`)
            rl.close()
            break;
        case 'ancient_China':
            console.log("You bid farewell to the Spinosaurus, Carcharodontosaurus, and Triceratops as they stomp off into the distance. \nYou quickly leave some food scraps for the pack of Velociraptors keeping you warm. \nAfter walking for several hours, you spot a Yutyrannus in the distance. \nDo you ATTACK the creature, or try to BEFRIEND it?")
            break;
        case 'desert_landing':
            console.log(`You lead your herd back in the direction towards the airplane. \nHowever, the temperature keeps dropping and the massive creatures are hungry. \nWithout provocation, the Spinosaurus quickly attacks you before the Triceratops can defend. \nIn the year 2032, scientists are perplexed by a recent discovery of a Spinosaurus fossil with human remains in its stomach. \n----GAME OVER----`)
            rl.close()
            break;
        case 'Yutrannus_encounter':
            console.log("Before you have a chance to act, the pack of Velociraptors attack the Yutyrannus with ferocous speed. \nWhile the raptors are feasting on its prey, you quickly walk off towards the airplane landing site. \nYou do not encounter any more dangerous fauna on the trip. \nDr. Williams is putting the final replacements on the time machine when you return. 'Where did our friendly herd go? No matter... we can't make the time machine any bigger. I'm sure it will work this time,' says Dr. Williams. \nDo you ENTER the time machine, or STAY in the Cretacous Period?")
            break;
        case 'New_York_City':
            console.log(`As soon as you enter the machine, Dr. Williams pushes the big red button. \nA loud whoosh and blinding light appear before the machine powers down. 'Welcome to present day New York City,' says the speakerbox in a friendly voice. Dr. Williams lets out a deep breath and looks at you. '${player.name} I shoud thank you... you forced me to figure out and complete my machine under brutal circumstances. I'm reluctantly giving you credit for helping with my invention.' \n'Get some rest, and I'll see you in the near future,' says Dr. Williams. \n----GAME COMPLETE----\nThank you for playing Whinsley's Dr. Dino!`)
            rl.close()
            break;
        case 'desert_stay':
            console.log(`Dr. Williams gives you a puzzled look before shrugging his shoulders and entering the machine. 'Farewell ${player.name}! Stay safe and I hope to find your fossilized remains in modern Mongolia.' \nA bright, blinding light erupts from the machine and you are left standing in the desert. \n----GAME OVER----`)
            rl.close()
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
                player.location = 'dimo_fight'
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
        case 'land_battle':
            if (input.toLowerCase() === 'follow') {
                player.location = 'lake'
            } else if (input.toLowerCase() === 'leave') {
                player.location = 'open_land'
            }
            break;
        case 'lake':
            if (input.toLowerCase() === 'morocco') {
                player.location = 'ancient_Morocco'
            } else if (input.toLowerCase() === 'another') {
                player.location = 'open_ocean'
            }
            break;
        case 'ancient_Morocco':
            if (input.toLowerCase() === 'talk') {
                player.location = 'fishing_grounds'
            } else if (input.toLowerCase() === 'run') {
                player.location = 'river_flee'
            }
            break;
        case 'fishing_grounds':
            if (input.toLowerCase() === 'friends') {
                player.location = 'Morocco_landing_zone'
            } else if (input.toLowerCase() === 'fight') {
                player.location = 'pack_encounter'
            }
            break;
        case 'desert':
            if (input.toLowerCase() === 'explore') {
                player.location = 'desert_exploration'
            } else if (input.toLowerCase() === 'talk') {
                player.location = 'desert_encounter'
            }
            break;
        case 'desert_exploration':
            if (input.toLowerCase() === 'stay') {
                player.location = 'freezing_desert'
            } else if (input.toLowerCase() === 'run') {
                player.location = 'pack_encounter'
            }
            break;
        case 'freezing_desert':
            if (input.toLowerCase() === 'leave') {
                player.location = 'ancient_China'
            } else if (input.toLowerCase() === 'herd') {
                player.location = 'desert_landing'
            }
            break;
        case 'ancient_China':
            if (input.toLowerCase() === 'attack' || input.toLowerCase() === 'befriend') {
                player.location = 'Yutyrannus_encounter'
            }
            break;
        case 'Yutyrannus_encounter':
            if (input.toLowerCase() === 'enter') {
                player.location = 'New_York_City'
                player.time = 'Present Day'
            } else if (input.toLowerCase() === 'stay') {
                player.location = 'desert_stay'
            }
            break;
        case 'Morocco_landing_zone':
            if (input.toLowerCase() === 'land') {
                player.location = 'desert'
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