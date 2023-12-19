import { writable } from 'svelte/store';

export let game = writable({
    running: false,
    money: 60,
    hour: 9,
    minute: 0,
    crew: [
      { 
        id: 1,
        name: 'John', 
        isAlive: true,
        health: 100,
        status: "Cryosleep",
        distanceFromShip: 0,
        moovement: 9, // - inventory.length [-4 max ]
        inventory: [],
        lootBag: [],
        traits : [],
      },
      { 
        id: 1,
        name: 'Jane', 
        isAlive: true,
        health: 100,
        status: "Cryosleep",
        distanceFromShip: 0,
        moovement: 7, // - inventory.length [-4 max ]
        inventory: [{ name: "Flashlight", price: 15, quantity: 1 }],
        lootBag: [],
        traits : [], 
      },
      { 
        id: 1,
        name: 'Jack', 
        isAlive: true,
        health: 100,
        status: "Cryosleep",
        distanceFromShip: 0,
        moovement: 5, // - inventory.length [-4 max ]
        inventory: [{ name: "Flashlight", price: 15, quantity: 1 }],
        lootBag: [],
        traits : [], 
      },
      { 
        id: 1,
        name: 'Jill', 
        isAlive: true,
        health: 100,
        status: "Cryosleep",
        distanceFromShip: 0,
        moovement: 6, // - inventory.length [-4 max ]
        inventory: [],
        lootBag: [],
        traits : [], 
      },
    ]
});