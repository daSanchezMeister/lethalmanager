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
        price: 30,
        info: 'A simple talkie, useful to communicate with other crew members. Boost productivity.',
        type: 'tool'
    },
    {
        id: 3,
        name: 'Magic_dice',
        bonus: 6,
        price: 230,
        info: 'Give the owner a significant luck boost!',
        type: 'tool'
    },
    {
        id: 4,
        name: 'Plastic_armor',
        ratio: 1.25,
        price: 68,
        info: '',
        type: 'armor'
    },
    {
        id: 5,
        name: 'Scap_metal_armor',
        ratio: 1.5,
        price: 122,
        info: '',
        type: 'armor'
    },
    {
        id: 6,
        name: 'Titanium_armor',
        ratio: 2,
        price: 241,
        info: '',
        type: 'armor'
    },
    {
        id: 7,
        name: 'Sonic_boots',
        price: 126,
        bonus: 15,
        info: '',
        type: 'moovement'
    },
    {
        id: 8,
        name: 'Winged_boots',
        price: 83,
        bonus: 10,
        info: '',
        type: 'moovement'
    }
];
export const store_ship = [
    {
        id: 1,
        name: 'Teleporter',
        price: 282,
        info: 'A simple teleporter, useful to teleport from one place to another.',
        type: 'tool'
    },
    {
        id: 2,
        name: 'Inverse_Teleporter',
        price: 361,
        info: 'A simple inverse teleporter, teleport your crew member directly in hell',
        type: 'tool'
    }
];
export let storage = writable([]);
