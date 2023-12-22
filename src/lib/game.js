import { writable } from 'svelte/store';
import { getRandomInt, dice, namesList, traitsList } from './helpers.js';

import { loots } from './loots.js';

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
      distanceFromShip: 0,
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
      distanceFromShip: 0,
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
      distanceFromShip: 0,
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

let intervalId;

//////////////////////////////
//SIMULATE START GAME COMMAND
setTimeout(() => {
  game.update((game) => {
    game.live = true;
    game.crew.forEach(crewMember => {
      crewMember.status = "Exploring";
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
  const moonLevel = 1;
  let distance;
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
        dangerMeter++;
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
        // EXPLORing / can proc ALL EXTERIOR EVENTS §§§§§§
        if (crewMember.status === "Exploring") {
          crewMember.distanceFromShip += getRandomInt(4,8) + crewMember.productivity;
        }
        if (crewMember.status === "Returning") {
          crewMember.distanceFromShip -= getRandomInt(4,8) + crewMember.productivity; 
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




        // DONJON / can proc ALL DONJON EVENTS §§§§§§
        // distance : unknown
        // quand ordre de sortir roll + productivity pour definir le temps pour sortir du donjon

        // RETURN TO SHIP distance -= / can proc ALL EVENTS §§§§§§

        // HIDE distance += 0 pour 5 tick de gameloop / prevent all event

        // FIGHT distance += 0 pour 1 tick de gameloop / soit survis, soit (lost signal)

        // RUN  distance += moovement*2 pour X tick de gameloop / can proc LOST

        // LOST distance random + ou - pour 10 tick de gameloop / can proc CRISIS

        // CRISIS scream for mommy / can proc Random MOB event

        // TROLL proc troll event

        // DEAD

        // MISSING
      })
      return game;
    });
  }

  // Fonction pour gérer les jets de dés et les événements aléatoires
  const handleRandomEvents = () => {
    const randomRoll = parseFloat(Math.random().toFixed(2));
    let selectedCrewMember;

    if (randomRoll < 0.90) {
      // choose random crew member
      // ROLL+(bonus) VS DIFICULTY IN RANDOM LOOT LIST
      game.update((game) => {
        selectedCrewMember = game.crew[getRandomInt(0, game.crew.length - 1)];

        if (selectedCrewMember.lootBag.length < 4 && selectedCrewMember.status === "Exploring") {
          const randomLoot = loots[getRandomInt(0, loots.length - 1)];

          if (dice(20) > randomLoot.difficulty) {
            selectedCrewMember.lootBag.push(randomLoot);
            
            
            if (selectedCrewMember.lootBag.length === 4) {
              selectedCrewMember.status = "Returning";
              logEntry("global", currentTime, `${selectedCrewMember.name} found ${randomLoot.name} ! (value ${randomLoot.value}) \n Loot bag is full, returning to ship !`) 
            } else {
              logEntry("loot", currentTime, `${selectedCrewMember.name} found ${randomLoot.name} ! (value ${randomLoot.value})`
            )
            }
          } else {
            logEntry("loot", currentTime, 
              `${selectedCrewMember.name} found nothing !`
            )
          }

        }
        return game
      })
      // logEntry("loot", currentTime, "LOOT event")
    }
    if (randomRoll > 0.10 && randomRoll < 0.20) {
      // choose random crew member
      // ROLL(+bonus) VS DIFICULTY IN RANDOM ENVIRONEMENTAL EVENT IN LIST
      game.update((game) => {
        selectedCrewMember = game.crew[getRandomInt(0, game.crew.length - 1)];
        console.log(selectedCrewMember.name + ' proc ENVIRONEMENTAL EVENT !');

        return game
      })
      logEntry("environement", currentTime, "ENVIRONEMENTAL event proc")
    }
    if (randomRoll > 0.20 && randomRoll < 0.30) {
      // choose random crew member
      // ROLL IN RANDOM EVENTS LIST ? funny shit here ?
      // scary noise can prop HIDE / RUN par exemple
      game.update((game) => {
        selectedCrewMember = game.crew[getRandomInt(0, game.crew.length - 1)];
        console.log(selectedCrewMember.name + ' proc RANDOM event !');

        return game
      })
      logEntry("random", currentTime, "RANDOM event proc")
    }
    if (randomRoll > 0.90 && randomRoll < 1) {
      // choose random crew member
      // PROC A CREWMEMBER TRAIT ! CAN BE DEADLY? CAN BE GOOD? IT DEPEND
      game.update((game) => {
        selectedCrewMember = game.crew[getRandomInt(0, game.crew.length - 1)];
        const traits = selectedCrewMember.traits.length;
        if (traits) {
          console.log(selectedCrewMember.name + ' have traits to proc')
        }
        console.log(selectedCrewMember.name + ' proc TRAITS event !');

        return game
      })
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
  
  }

  // Retourne l'identifiant de l'intervalle pour pouvoir l'arrêter plus tard si nécessaire
  return gameLoopInterval;
}
