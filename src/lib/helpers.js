export function getRandomInt(min, max) {
    const randomIntInRange = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomIntInRange;
}