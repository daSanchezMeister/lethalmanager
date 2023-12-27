import { getRandomInt, dice } from "./helpers.js";

export const loots = [
    {
        name: "Small scrap metal",
        difficulty: 5,
        value: 24,
        desc: "a small piece of scrap metal. Better than nothing.",
    },
    {
        name: "Scrap metal",
        difficulty: 7,
        value: 31,
        desc: "a regular piece of scrap metal. It might be useful.",
    },
    {
        name: "V-type engine",
        difficulty: 8,
        value: 36,
        desc: "a medium motor engine. Company would love it.",
    },
    {
        name: "Pickle Rick toy",
        difficulty: 10,
        value: 54,
        desc: "a collector pickle rick toy. Still inside box!",
    },
    {
        name: "Little statue",
        difficulty: 14,
        value: 61,
        desc: "a strange small but still precious statue. Looks rare.",
    },
    {
        name: "Gold bar",
        difficulty: 19,
        value: 82,
        desc: "...Wow! a pure gold bar! This is a jackpot!",
    },
    {
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
            eventResult.message = `${crewMember.name} found ${randomLoot.desc} [value: ${randomLoot.value}] Lootbag is full, ${crewMember.name} is now looking for the exit !`
        } else {
            eventResult.message = `${crewMember.name} found ${randomLoot.desc} [value: ${randomLoot.value}]`
        }

    } else {
        eventResult.type = "global";
        eventResult.message = `${crewMember.name} look everywhere for some loot, but find nothing...`
    }

    return eventResult;
}