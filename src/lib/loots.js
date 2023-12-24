import { getRandomInt, dice } from "./helpers.js";

export const loots = [
    {
        id: 1,
        name: "Small scrap metal",
        difficulty: 5,
        value: 24,
        desc: "A small piece of scrap metal. It might be useful.",
    },
    {
        id: 2,
        name: "V-type engine",
        difficulty: 5,
        value: 41,
        desc: "A small piece of scrap metal. It might be useful.",
    },
    {
        id: 3,
        name: "Little statue",
        difficulty: 5,
        value: 68,
        desc: "A small piece of scrap metal. It might be useful.",
    },
]

export const procLoot = (crewMember) => {

    let eventResult = {
        name: crewMember.name,
        type: "loot",
        message: "loot message failed upgrade on : " + crewMember.name,
    }

    //if (crewMember.lootBag.length < 4) {
        const randomLoot = loots[getRandomInt(0, loots.length - 1)]
        if (dice(20) > randomLoot.difficulty) {

            crewMember.lootBag.push(randomLoot) 
            
            if (crewMember.lootBag.length === 4) {
                console.log('loot win & full');
                crewMember.status = "Seek for exit";
                crewMember.getOut = Math.round(16 / crewMember.productivity);
                eventResult.message = `${crewMember.name} found ${randomLoot.name} and is now looking for the exit... ! [value: ${randomLoot.value}]`
            } else {
                console.log('loot event win');
                eventResult.message = `${crewMember.name} found ${randomLoot.name} ! [value: ${randomLoot.value}]`
            }

        } else {
            console.log('loot event lost');
            eventResult.message = `${crewMember.name} look everywhere for some loot, but find nothing...`
        }
    //}

    return eventResult;
}