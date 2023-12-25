import { writable } from 'svelte/store';

export const store_crew = [
    {
        id: 1,
        name: 'Flashlight',
        bonus: 1,
        price: 15,
        info: 'A simple flashlight, useful to see in the dark.',
        type: 'tool'
    },
    {
        id: 2,
        name: 'Talkie',
        bonus: 2,
        price: 20,
        info: 'A simple talkie, useful to communicate with other crew members. Boost productivity.',
        type: 'tool'
    },
    {
        id: 3,
        name: 'Railgun',
        price: 100,
        info: 'Anihilate an ennemy, but very long to reaload, if you missed your shot, you better run buddy',
        type: 'weapon'
    },
    {
        id: 4,
        name: 'Medkit',
        bonus: 50,
        price: 75,
        info: 'Heal 50hp after an encounter with an ennemy, but you can only use it once per day',
        type: 'tool'
    }
];
export const store_ship = [
    {
        id: 1,
        name: 'Teleporter',
        price: 200,
        info: 'A simple teleporter, useful to teleport from one place to another.',
        type: 'tool'
    },
    {
        id: 2,
        name: 'Inverse_Teleporter',
        price: 300,
        info: 'A simple inverse teleporter, teleport your crew member directly in hell',
        type: 'tool'
    }
];
export let storage = writable([]);
