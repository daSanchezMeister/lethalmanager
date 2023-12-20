import { writable } from 'svelte/store';
import { getRandomInt, namesList, traitsList } from './helpers.js';


let crewGenerator = () => {
  let randomCaracter = {}
  let traitsNumber = getRandomInt(0, 2);
  
  if (traitsNumber === 0) {
    randomCaracter = { 
      id: getRandomInt(1, 1000),
      isAlive: true,
      name: namesList[getRandomInt(0, namesList.length - 1)],
      health: 100,
      productivity: getRandomInt(1, 10),
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
      productivity: getRandomInt(1, 10),
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
      productivity: getRandomInt(1, 10),
      status: "Cryosleep",
      distanceFromShip: 0,
      inventory: [],
      traits : [
        traitsList[getRandomInt(0, traitsList.length - 1)],
        traitsList[getRandomInt(0, traitsList.length - 1)],
      ],
    }
  }
  console.log(randomCaracter);
  return randomCaracter;
}


// main game object
export let game = writable({
    running: false,
    money: 60,
    hour: 9,
    minute: 0,
    crew: [
      crewGenerator(),
      crewGenerator(),
      crewGenerator(),
      crewGenerator(),
    ]
});