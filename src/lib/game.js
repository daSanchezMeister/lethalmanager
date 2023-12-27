import { writable } from 'svelte/store';
import { getRandomInt, dice, moovement, namesList } from './helpers.js';

import { procLoot } from './loots.js';
import { procEnvEvent } from './envEvents.js';
import { procRandomEvent } from './randomEvents.js';
import { procMobEvent } from './mobEvents.js';
import { traitsList } from './traitEvents.js';


let intervalId;
const moonLevel = 0;
export let dunjonDistance = 200;


let crewGenerator = () => {
  let randomCaracter = {}
  let traitsNumber = getRandomInt(0, 2);
  
  if (traitsNumber === 0) {
    randomCaracter = { 
      id: getRandomInt(1, 1000),
      isAlive: true,
      name: namesList[getRandomInt(0, namesList.length - 1)],
      health: 100,
      sanity : 100,
      productivity: getRandomInt(1, 4),
      status: "Cryosleep",
      lastStatus: "",
      location : "Outside",
      distanceFromShip: 0,
      skipTurn: 0,
      getOut: 0,
      inventory: [
        {
          id: 11,
          name: 'Flamethrower',
          price: 362,
          bonus: 1,
          info: '',
          type: 'weapon'
        },
        {
            id: 12,
            name: 'Shotgun',
            price: 147,
            bonus: 1,
            info: '',
            type: 'weapon'
        },
        {
            id: 13,
            name: 'Shovel',
            price: 42,
            bonus: 1,
            info: '',
            type: 'weapon'
        }
      ],
      lootBag: [],
      traits : [],
    }
  } else if (traitsNumber === 1) {
    randomCaracter = { 
      id: getRandomInt(1, 1000),
      isAlive: true,
      name: namesList[getRandomInt(0, namesList.length - 1)],
      health: 100,
      sanity : 100,
      productivity: getRandomInt(1, 4),
      status: "Cryosleep",
      lastStatus: "",
      location : "Outside",
      distanceFromShip: 0,
      skipTurn: 0,
      getOut: 0,
      inventory: [
        {
          id: 1,
          name: 'Flashlight',
          bonus: 1,
          price: 15,
          info: 'A simple flashlight, useful to see in the dark.',
          type: 'tool'
        }
      ],
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
      sanity : 100,
      productivity: getRandomInt(1, 4),
      status: "Cryosleep",
      lastStatus: "",
      location : "Outside",
      distanceFromShip: 0,
      skipTurn: 0,
      getOut: 0,
      inventory: [
        {
          id: 10,
          name: 'Cuddly_toy',
          price: 90,
          bonus: -25,
          info: '',
          type: 'sanity'
        },
      ],
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
    alive: 4,
    money: 60,
    hour: 8,
    minute: 0,
    crew: [
      crewGenerator(),
      crewGenerator(),
      crewGenerator(),
      crewGenerator(),
    ],
    missionStart() {
      this.live = true;
      this.crew.forEach(crewMember => {
        crewMember.status = "Exploring moon";
      })
      intervalId = startGameLoop();
    }
});

export let logs = writable([]);
export let shipStorage = writable([]);

//////////////////////////////
//SIMULATE START GAME COMMAND
setTimeout(() => {
  game.update((game) => {
    game.missionStart();
    return game;
  });
}, 2000);

//////////////////////////////
// LOG OBJECT
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

function missionEnd(type, time, message) {
  game.update((game) => {
    game.live = false;
    game.crew.forEach(crewMember => {
      crewMember.status = "Cryosleep";
      // compact all looted shit
    })
    return game;
  });

  logEntry(type, time, message)
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
    let clockTick = getRandomInt(6, 11); //[6-10]

    // MAKE TIME PAST AND STOP THE GAME IF DAYS END
    game.update((game) => {
      if (game.minute + clockTick >= 60) {  
        let overTime = game.minute + clockTick - 60;
        game.minute = 0 + overTime;
        game.hour++;
        dangerMeter += 2;
        // console.log('dangerMeter : ' + dangerMeter);
      } else {
        game.minute += clockTick;
      }
      if (game.hour === 24) {
        game.hour = 0;
        game.minute = 0;

        missionEnd("global", currentTime, 'Day is over, autopilot return to the company.');
        game.crew.forEach(crewMember => {
          if (crewMember.isAlive && crewMember.status !== "Waiting at ship") {
            crewMember.status = "Missing";
          }
        })
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
      if (game.alive === 0) {
        missionEnd("lethal", currentTime, 'All crew members are dead, mission failed.');
        clearInterval(intervalId);
      }
      game.crew.forEach(crewMember => {
        // EXPLORing moon
        if (crewMember.isAlive) {
          if (crewMember.status === "Exploring moon") {
            crewMember.distanceFromShip += moovement(crewMember);
          }
          if (crewMember.status === "Returning to ship") {
            crewMember.distanceFromShip -= moovement(crewMember);
          }
          if (crewMember.status === "Seek for exit") {
            if (crewMember.getOut > 0) {
              crewMember.getOut--;
              /////////////////////////
              // ROLL FOR LOST EVENT
              /////////////////////////
            } else {
              crewMember.location = "Outside";
              crewMember.status = "Returning to ship"
              logEntry("success", currentTime, `${crewMember.name} found abandonned complex exit !`)
            }
          }
          if (crewMember.status === "Panic attack") {
            if (crewMember.skipTurn > 0) {
              crewMember.skipTurn--;
              if (crewMember.lootBag.length > 0) {
                if (dice(20) < 10 - crewMember.productivity) {
                  crewMember.lootBag.splice([getRandomInt(0, crewMember.lootBag.length - 1)], 1);
                  logEntry("global", currentTime, `${crewMember.name} lost a loot while in panic attack...`);
                }
              }
            } else {
              crewMember.status = crewMember.lastStatus;
              crewMember.sanity = 100;
              logEntry("success", currentTime, `${crewMember.name} survived panic attack and is now back to work !`)
            }
          }
          if (crewMember.status === "Lost") {
            if (crewMember.skipTurn > 0) {
              crewMember.skipTurn--;       
            } else {
              crewMember.status = crewMember.lastStatus;
              crewMember.sanity = 100;
              logEntry("success", currentTime, `${crewMember.name} find his way and is no longer lost. Back to work !`)
            }
          }
          if (crewMember.distanceFromShip <= 0) {
            crewMember.status = "Waiting at ship"; 
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
          crewMember.sanity = "";
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

    game.update((game) => {
      let selectedCrewMember = game.crew[getRandomInt(0, game.crew.length - 1)]

      if(selectedCrewMember.isAlive && selectedCrewMember.status !== "Waiting at ship") {
        //////////////////////////////////
        // LOOT EVENT
        //////////////////////////////////
        // console.log('randomRoll this tick : ' + randomRoll);
        if (randomRoll < 0.20 && selectedCrewMember.lootBag.length < 4 && selectedCrewMember.status === "Working") {
          let result = procLoot(selectedCrewMember);
          logEntry(result.type, currentTime, result.message);
        }
        //////////////////////////////////
        // ENVIRONEMENTAL EVENT
        //////////////////////////////////
        if (randomRoll > 0.20 && randomRoll < 0.30) {
          let result = procEnvEvent(selectedCrewMember);
          logEntry(result.type, currentTime, result.message); 
        }
        //////////////////////////////////
        // RANDOM EVENTS
        //////////////////////////////////
        if (randomRoll > 0.30 && randomRoll < 0.50 && selectedCrewMember.status !== "Panic attack") {
          let result = procRandomEvent(selectedCrewMember);
          logEntry(result.type, currentTime, result.message); 
        }
        //////////////////////////////////
        // TRAITS EVENT
        //////////////////////////////////
        //if (randomRoll > 0.4 && randomRoll < 0.7) {
          //logEntry("trait", currentTime, "TRAIT event proc")
          //let result = procTraitEvent(selectedCrewMember);
          //if (result) { logEntry(result.type, currentTime, result.message);
        //}
        
        //////////////////////
        // MOB EVENTS !!!!!!!
        // let result = procMobEvent(selectedCrewMember);
        // logEntry(result.type, currentTime, result.message)
        if(dangerMeter >= 6) {
          let lethalEventRoll = dice(100);
          if (lethalEventRoll < dangerMeter) {
            // ROLL VS DIFICULTY IN RANDOM LETHAL EVENT IN LIST
            // roll for scan, create entry in Encyclopedia

            let result = procMobEvent(selectedCrewMember);
            logEntry(result.type, currentTime, result.message)
          }
        }

      } // end isAlive check

      return game
    })
  }

  // Retourne l'identifiant de l'intervalle pour pouvoir l'arrêter plus tard si nécessaire
  return gameLoopInterval;
}
