import { writable } from 'svelte/store';

export const store_crew = [
    {
        name: 'Flashlight',
        bonus: 1,
        price: 15,
        info: 'A simple flashlight, useful to see in the dark.',
        type: 'tool'
    },
    {
        name: 'Talkie',
        bonus: 2,
        price: 30,
        info: 'A simple talkie, useful to communicate with other crew members. Boost productivity.',
        type: 'tool'
    },
    {
        name: 'Magic_dice',
        bonus: 5,
        price: 230,
        info: 'Give the owner a significant luck boost!',
        type: 'tool'
    },
    {
        name: 'Plastic_armor',
        ratio: 1.25,
        price: 68,
        info: '',
        type: 'armor'
    },
    {
        name: 'Scap_metal_armor',
        ratio: 1.5,
        price: 122,
        info: '',
        type: 'armor'
    },
    {
        name: 'Titanium_armor',
        ratio: 2,
        price: 241,
        info: '',
        type: 'armor'
    },
    {
        name: 'Sonic_boots',
        price: 126,
        bonus: 15,
        info: '',
        type: 'moovement'
    },
    {
        name: 'Winged_boots',
        price: 83,
        bonus: 10,
        info: '',
        type: 'moovement'
    },
    {
        id: 9,
        name: 'Family_picture',
        price: 62,
        bonus: -15,
        info: '',
        type: 'sanity'
    },
    {
        name: 'Cuddly_toy',
        price: 90,
        bonus: -25,
        info: '',
        type: 'sanity'
    },
    {
        name: 'Flamethrower',
        price: 362,
        bonus: 1,
        info: '',
        type: 'weapon'
    },
    {
        name: 'Shotgun',
        price: 147,
        bonus: 1,
        info: '',
        type: 'weapon'
    },
    {
        name: 'Shovel',
        price: 42,
        bonus: 1,
        info: '',
        type: 'weapon'
    }
];
export const store_ship = [
    {
        name: 'Teleporter',
        price: 282,
        info: 'A simple teleporter, useful to teleport a crew member directly to the mothership.',
        type: 'tool'
    },
    {
        name: 'Inverse_Teleporter',
        price: 361,
        info: 'A simple inverse teleporter, teleport a crew member directly in hell',
        type: 'tool'
    }
];
export let storage = writable([]);
