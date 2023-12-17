import { getRandomInt } from './helpers.js';

// UI sounds like errors, prompt sound
export const errorSound = new Audio('./../src/assets/sounds/ui/error.mp3');
export const successSound = new Audio('./../src/assets/sounds/ui/buy.mp3');
export const changeViewSound = new Audio('./../src/assets/sounds/ui/glitch-changeview.wav');
changeViewSound.volume = .7;

// audio library, Alien my love <3
const audioAtmos = [
    new Audio('./../src/assets/sounds/ost/alien 1 - Main Title.mp3'),
    new Audio('./../src/assets/sounds/ost/alien 1 - Here Kitty.mp3'),
    new Audio('./../src/assets/sounds/ost/alien 1 - The Landing.mp3'),
    new Audio('./../src/assets/sounds/ost/alien 1 - The Skeleton.mp3'),
    new Audio('./../src/assets/sounds/ost/alien 1 - The Terrain.mp3')
];
audioAtmos.forEach(track => { 
    track.loop = true;
    track.volume = .8;
});

export const playRandomAtmosAudio = () => {
    let roll = getRandomInt(0, audioAtmos.length - 1);
    audioAtmos[roll].play();
}

// keyboard sound for immersion
const keyboardSound = [
    new Audio('./../src/assets/sounds/ui/keyboard-01.mp3'),
    new Audio('./../src/assets/sounds/ui/keyboard-02.mp3'),
    new Audio('./../src/assets/sounds/ui/keyboard-03.mp3'),
    new Audio('./../src/assets/sounds/ui/keyboard-04.mp3'),
    new Audio('./../src/assets/sounds/ui/keyboard-05.mp3'),
    new Audio('./../src/assets/sounds/ui/keyboard-06.mp3'),
    new Audio('./../src/assets/sounds/ui/keyboard-07.mp3'),
    new Audio('./../src/assets/sounds/ui/keyboard-08.mp3')
];
keyboardSound.forEach(sound => { sound.volume = .5; });

// play random keyboard sound
export function playRandomKeyboardSound(){
    let roll = getRandomInt(0, keyboardSound.length-1);
    keyboardSound[roll].play();
}