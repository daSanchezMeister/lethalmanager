import { getRandomInt, dice } from "./helpers.js";

export const loots = [
    {
        id: 1,
        name: "Small scrap metal",
        difficulty: 5,
        value: 24,
        desc: "a small piece of scrap metal. It might be useful.",
    },
    {
        id: 2,
        name: "V-type engine",
        difficulty: 10,
        value: 31,
        desc: "a medium motor engine. Company would love it.",
    },
    {
        id: 3,
        name: "Little statue",
        difficulty: 15,
        value: 39,
        desc: "a strange small but still precious statue. Looks rare.",
    },
    {
        id: 4,
        name: "Gold bar",
        difficulty: 19,
        value: 82,
        desc: "...Wow! a pure gold bar! This is a jackpot!",
    },
    {
        id: 5,
        name: "lost_program.exe",
        epic: true,
        difficulty: 20,
        value: 0,
        desc: "????????? What is that ???? Looks like an executable file...",
    },
]

export const procLoot = (crewMember) => {

    let eventResult = {
        name: crewMember.name,
        type: "loot",
        message: "",
    }

    const randomLoot = loots[getRandomInt(0, loots.length - 1)]
    if (dice(20, crewMember) > randomLoot.difficulty) {

        crewMember.lootBag.push(randomLoot) 
        
        if (crewMember.lootBag.length === 4) {
            crewMember.status = "Seek for exit";
            crewMember.getOut = Math.round(16 / crewMember.productivity);
            eventResult.message = `${crewMember.name} found ${randomLoot.desc} [value: ${randomLoot.value}] ${crewMember.name} is now looking for the exit... !`
        } else {
            eventResult.message = `${crewMember.name} found ${randomLoot.desc} [value: ${randomLoot.value}]`
        }

    } else {
        eventResult.type = "global";
        eventResult.message = `${crewMember.name} look everywhere for some loot, but find nothing...`
    }

    return eventResult;
}