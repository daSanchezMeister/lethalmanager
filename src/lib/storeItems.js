import { writable } from 'svelte/store';

export const store_crew = [
    {
        id: 1,
        name: 'Flashlight',
        price: 15,
        info: 'A simple flashlight, useful to see in the dark.',
    },
    {
        id: 2,
        name: 'Talkie',
        price: 20,
        info: 'A simple talkie, useful to communicate with other crew members.',
    }
];
export const store_ship = [
    {
        id: 1,
        name: 'Teleporter',
        price: 200,
        info: 'A simple teleporter, useful to teleport from one place to another.',
    },
    {
        id: 2,
        name: 'Inverse_Teleporter',
        price: 300,
        info: 'A simple inverse teleporter, teleport your crew member directly in hell',
    }
];
export let storage = writable([]);
