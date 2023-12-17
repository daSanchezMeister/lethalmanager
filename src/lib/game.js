import { writable } from 'svelte/store';

export let game = writable({
    money: 60,
    hour: 8,
    minute: 0
});