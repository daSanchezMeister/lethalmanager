import { writable } from 'svelte/store';
import { getRandomInt, dice, namesList, traitsList } from './helpers.js';

import { loots } from './loots.js';
import { envEvents } from './envEvents.js';


let intervalId;
const moonLevel = 0;
export let dunjonDistance = 150;


let crewGenerator = () => {
  let randomCaracter = {}
  let traitsNumber = getRandomInt(0, 2);
  
  if (traitsNumber === 0) {
    randomCaracter = { 
      id: getRandomInt(1, 1000),
      isAlive: true,
      name: namesList[getRandomInt(0, namesList.length - 1)],
      health: 100,
      productivity: getRandomInt(1, 4),
      status: "Cryosleep",
      location : "Outside",
      distanceFromShip: 0,
      skipTurn: 0,
      getOut: 0,
      inventory: [],
      lootBag: [],
      traits : [],
    }
  } else if (traitsNumber === 1) {
    randomCaracter = { 
      id: getRandomInt(1, 1000),
      isAlive: true,
      name: namesList[getRandomInt(0, namesList.length - 1)],
      health: 100,
      productivity: getRandomInt(1, 4),
      status: "Cryosleep",
      location : "Outside",
      distanceFromShip: 0,
      skipTurn: 0,
      getOut: 0,
      inventory: [],
      lootBag: [],
      traits : [
        traitsList[getRandomInt(0, traitsList.length - 1)],
      ],
    }
  } else {
    randomCaracter = { 
      id: getRandomInt(1, 1000),
      isAlive: true,
      name: namesList[getRandomInt(0, namesList.length - 1)],
      health: 100,
      productivity: getRandomInt(1, 4),
      status: "Cryosleep",
      location : "Outside",
      distanceFromShip: 0,
      skipTurn: 0,
      getOut: 0,
      inventory: [],
      lootBag: [],
      traits : [
        traitsList[getRandomInt(0, traitsList.length - 1)],
        traitsList[getRandomInt(0, traitsList.length - 1)],
      ],
    }
  }
  return randomCaracter;
}

///////////////////
// MAIN GAME OBJECT
export let game = writable({
    live: false,
    money: 60,
    hour: 8,
    minute: 0,
    crew: [
      crewGenerator(),
      crewGenerator(),
      crewGenerator(),
      crewGenerator(),
    ]
});

export let logs = writable([]);
export let shipStorage = writable([]);

//////////////////////////////
//SIMULATE START GAME COMMAND
setTimeout(() => {
  game.update((game) => {
    game.live = true;
    game.crew.forEach(crewMember => {
      crewMember.status = "Exploring moon";
    })

    intervalId = startGameLoop();
    return game;
  });
}, 1000);

function logEntry(type, time, info) {
  //****************** 
  // PLAY LOG SOUND HERE
  //******************
  logs.update((logs) => {
    logs.push({
      time: time,
      type: type,
      info: info
    });
    return logs;
  })
}

function missionEnd(time, message) {
  game.update((game) => {
    game.live = false;
    game.crew.forEach(crewMember => {
      crewMember.status = "Cryosleep";
      // compact all looted shit
    })
    return game;
  });

  logEntry('global', time, message)
  // do the math on loot !
  // quota 
  // bilan de missions
  // save overhaul game & storage
  // wait for next mission
}

////////////
// GAMELOOP
function startGameLoop() {

  let dangerMeter = 0;
  let currentTime, currentHour, currentMinute;

  const gameTick  = 3000;
  const gameLoopInterval = setInterval(updateGame, gameTick);

  logEntry('global', '08:00', 'Mission start on LV4-26 for X Y a & b !')

  function updateGame() {
    handleClock();
    handleProgress();
    handleRandomEvents();
  }

  /////////////////////////////////
  // TIME MANAGEMENT
  // INCREASE DIFICULTY EVERY HOUR
  const handleClock = () => {
    let clockTick = getRandomInt(6, 10);

    // MAKE TIME PAST AND STOP THE GAME IF DAYS END
    game.update((game) => {
      if (game.minute + clockTick >= 60) {  
        let overTime = game.minute + clockTick - 60;
        game.minute = 0 + overTime;
        game.hour++;
        dangerMeter += 2;
        console.log('dangerMeter : ' + dangerMeter);
      } else {
        game.minute += clockTick;
      }
      if (game.hour === 24) {
        game.hour = 0;
        game.minute = 0;
        // SET CREWMEMBER MISSING IF DISTANCE > 10
        missionEnd(currentTime, 'Day is over, autopilot return to the company.');
        clearInterval(intervalId);
      }

      // register current time for logs
      currentHour = game.hour < 10 ? '0' + game.hour : game.hour;
      currentMinute = game.minute < 10 ? '0' + game.minute : game.minute;
      currentTime = `${currentHour}:${currentMinute}`;

      return game;
    });
  }

  ///////////////////////////////////
  // HANDLE STATUS FOR EVERYCREW MEMBER
  const handleProgress = () => {
    game.update((game) => {
      game.crew.forEach(crewMember => {
        // EXPLORing moon / can proc ALL EXTERIOR EVENTS §§§§§§
        if (crewMember.isAlive) {
          if (crewMember.status === "Exploring moon") {
            crewMember.distanceFromShip += getRandomInt(4,8) + crewMember.productivity;
          }
          if (crewMember.status === "Returning to ship") {
            crewMember.distanceFromShip -= getRandomInt(4,8) + crewMember.productivity; 
          }
          if (crewMember.status === "Seek for exit") {
            if (crewMember.getOut > 0) {
              crewMember.getOut--;
              /////////////////////////
              // ROLL FOR LOST EVENT
              /////////////////////////
              /////////////////////////
              /////////////////////////
              /////////////////////////
              /////////////////////////
              /////////////////////////
              /////////////////////////
            } else {
              crewMember.location = "Outside";
              crewMember.status = "Returning to ship"
              logEntry("success", currentTime, `${crewMember.name} found the exit !`)
            }
          }
          if (crewMember.distanceFromShip <= 0) {
            crewMember.status = "Waiting"; 
            crewMember.distanceFromShip = 0;

            if (crewMember.lootBag.length > 0) {
              crewMember.lootBag.forEach(loot => {
                shipStorage.update((shipStorage) => {
                  shipStorage.push(loot);
                  return shipStorage;
                })
              })
              crewMember.lootBag = [];
              logEntry("success", currentTime, 
              `${crewMember.name} successfully get back to ship ! \n 
              Loots added to ship storage. What now ? go again ? play safe ?`)
            }
          }
          if (crewMember.distanceFromShip > dunjonDistance) {
            crewMember.status = "Working"; 
            crewMember.location = "Inside"; 
            crewMember.distanceFromShip = dunjonDistance;
            logEntry("success", currentTime, `${crewMember.name} Entered the abandonned complex and start working !`)
          }

        } else {
          crewMember.status = "Dead";
          crewMember.lootBag = [];
          crewMember.inventory = [];
        }
      })
      return game;
    });
  }

  // Fonction pour gérer les jets de dés et les événements aléatoires
  const handleRandomEvents = () => {
    const randomRoll = parseFloat(Math.random().toFixed(2));
    let selectedCrewMember;

    game.update((game) => {
      selectedCrewMember = game.crew[getRandomInt(0, game.crew.length - 1)]

      if(selectedCrewMember.isAlive) {
        //////////////////////////////////
        // LOOT EVENT
        //////////////////////////////////
        if (randomRoll < 0.2) {
          // choose random crew member
          // ROLL+(bonus) VS DIFICULTY IN RANDOM LOOT LIST
          if (selectedCrewMember.lootBag.length < 4 && selectedCrewMember.status === "Working") {
            const randomLoot = loots[getRandomInt(0, loots.length - 1)]
            if (dice(20) > randomLoot.difficulty) {
              selectedCrewMember.lootBag.push(randomLoot)
                  
              if (selectedCrewMember.lootBag.length === 4) {
                selectedCrewMember.status = "Seek for exit";
                selectedCrewMember.getOut = Math.round(8 / selectedCrewMember.productivity);
                logEntry("global", currentTime, `${selectedCrewMember.name} found ${randomLoot.name} ! (value ${randomLoot.value}) \n Loot bag is full, returning to ship to ship ! But wait... where deh fuck is the exit ?`) 
              } else {
                logEntry("loot", currentTime, `${selectedCrewMember.name} found ${randomLoot.name} ! (value ${randomLoot.value})`)
              }
            } else {
              logEntry("loot", currentTime, 
                `${selectedCrewMember.name} look everywhere for some loot, but find nothing...`
              )
            }
          }
        }
        //////////////////////////////////
        // ENVIRONEMENTAL EVENT
        //////////////////////////////////
        if (randomRoll > 0.20 && randomRoll < 0.30) {
          // choose random crew member
          // ROLL(+bonus) VS DIFICULTY IN RANDOM ENVIRONEMENTAL EVENT IN LIST
          selectedCrewMember = game.crew[getRandomInt(0, game.crew.length - 1)];

          const randomEnv = envEvents[getRandomInt(0, envEvents.length - 1)]
          if(selectedCrewMember.isAlive) {
            if(dice(20) < randomEnv.difficulty) {
              // fail
              selectedCrewMember.health -= randomEnv.damage;
              
              if(selectedCrewMember.health <= 0) {
                selectedCrewMember.isAlive = false;
                logEntry("lethal", currentTime, 
                  `${selectedCrewMember.name} ${randomEnv.dead}`
                )
              } else {
                logEntry("lethal", currentTime, 
                  `${selectedCrewMember.name} ${randomEnv.lost}`
                )
              }
            } else {
              // success
              logEntry("environement", currentTime, 
                `${selectedCrewMember.name} ${randomEnv.win}`
              )
            }
          }
        }
        //////////////////////////////////
        // RANDOM EVENTS
        //////////////////////////////////
        if (randomRoll > 0.30 && randomRoll < 0.40) {
          logEntry("random", currentTime, "RANDOM event proc")
        }
        //////////////////////////////////
        // TRAITS EVENT
        //////////////////////////////////
        if (randomRoll > 0.4 && randomRoll < 0.45) {
          logEntry("trait", currentTime, "TRAIT event proc")
        }
        //////////////////////
        // MOB EVENTS !!!!!!!
        if(dangerMeter >= 4) {
          let lethalEventRoll = dice(100);
          console.log('lethalEventRoll : ' + lethalEventRoll);
          if (lethalEventRoll < dangerMeter) {
            // ROLL VS DIFICULTY IN RANDOM LETHAL EVENT IN LIST
            // roll for scan, create entry in Encyclopedia
            logEntry("lethal", currentTime, "LETHAL EVENT PROC !")
          }
        }

      } // end isAlive check

      return game
    })
  }

  // Retourne l'identifiant de l'intervalle pour pouvoir l'arrêter plus tard si nécessaire
  return gameLoopInterval;
}
