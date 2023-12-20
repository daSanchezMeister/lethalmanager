import { writable } from 'svelte/store';
import { getRandomInt, dice, namesList, traitsList } from './helpers.js';


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
      traits : [
        traitsList[getRandomInt(0, traitsList.length - 1)],
        traitsList[getRandomInt(0, traitsList.length - 1)],
      ],
    }
  }
  return randomCaracter;
}


// main game object
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
let intervalId;

// simulate start of game
setTimeout(() => {
  game.update((game) => {
    game.live = true;
    game.crew.forEach(crewMember => {
      crewMember.status = "Explore";
    })

    intervalId = startGameLoop();
    return game;
  });
}, 1000);

// GAMELOOP
function startGameLoop() {

  let dangerMeter = 0;
  const moonLevel = 1;
  let currentTime, currentHour, currentMinute;

  const gameTick  = 3000;
  const gameLoopInterval = setInterval(updateGame, gameTick);

  logs.update((logs) => {
    logs.push({time: "08:00", 
      type: "global",
      info: "Exploration begins !"});
    return logs;
  })

  function updateGame() {
    handleClock()
    handleProgress()
    handleRandomEvents()
  }

  const handleClock = () => {
    let clockTick = getRandomInt(6, 10);
    // let clockTick = getRandomInt(35, 55);

    game.update((game) => {
      // update logic
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
        clearInterval(intervalId);
      }

      // register current time for logs
      currentHour = game.hour < 10 ? '0' + game.hour : game.hour;
      currentMinute = game.minute < 10 ? '0' + game.minute : game.minute;
      currentTime = `${currentHour}:${currentMinute}`;

      return game;
    });
  }

  const handleProgress = () => {

    game.update((game) => {
      game.crew.forEach(crewMember => {
        if (crewMember.status === "Explore") {
          crewMember.distanceFromShip += getRandomInt(3,6) + crewMember.productivity;
        }
      })
      return game;
    });
  }

  // Fonction pour gérer les jets de dés et les événements aléatoires
  const handleRandomEvents = () => {
    let randomRoll = parseFloat(Math.random().toFixed(2));

    //console.log(randomRoll);
    if (randomRoll < 0.10) {
      logs.update((logs) => {
        logs.push({time: currentTime,
          type: "random",
          info: "Event type 1 proc lorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit amet"});
        return logs;
      })
    }
    if (randomRoll > 0.10 && randomRoll < 0.20) {
      logs.update((logs) => {
        logs.push({time: currentTime, 
          type: "random",
          info: "Event type 2 proc lorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit amet"});
        return logs;
      })
    }
    if (randomRoll > 0.20 && randomRoll < 0.30) {
      logs.update((logs) => {
        logs.push({time: currentTime, 
          type: "random",
          info: "Event type 1 proc lorem ipsum dolor sit amet"});
        return logs;
      })
    }

    // lethal event !!!!
    if(dangerMeter >= 4) {
      let lethalEventRoll = dice(100);
      if (lethalEventRoll < dangerMeter) {
        logs.update((logs) => {
          logs.push({time: currentTime, 
            type: "lethal",
            info: "LETHAL EVENT PROC !"});
          return logs;
        })
        // random lethal event
      }
    }
  }

  // Retourne l'identifiant de l'intervalle pour pouvoir l'arrêter plus tard si nécessaire
  return gameLoopInterval;
}

// Appelle la fonction pour démarrer la boucle de gameplay
// Pour arrêter la boucle de gameplay (par exemple, lorsqu'on quitte le jeu)
// clearInterval(intervalId);
