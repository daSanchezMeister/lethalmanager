import { getRandomInt, dice } from "./helpers.js";

export const traitsList = [
    {
        name: 'Noob',
        diceBonus: -3,
        moovementBonus: -1,
    },
    {
        name: 'Pro Gamer',
        diceBonus: 3,
        moovementBonus: 2
    },
    {
        name: 'Troll',
        diceBonus: -1,
        moovementBonus: -2,
    },
    {
        name: 'Speedrunner',
        diceBonus: 1,
        moovementBonus: 6,
    },
    
    // 'Fighter', 'Coward', 
    // 'Speedrunner', 'Lazy', 
    // 'Greedy', 'Altruist', 'Narcissist', 'Sociopath', 
    // 'Noob', 'Pro Gamer', 'Troll',
    // 'Hacker', 'Twitch Streamer', 'Youtuber', 'Tiktoker', 'Hipster', 
    // 'Alpha', 'Beta', 'Omega', 'Chad', 'Boomer',
]
export const procTraitEvent = (crewMember) => {
    let eventResult = {
        name: crewMember.name,
        type: "",
        message: "",
    }

    if (crewMember.traits.length > 0) {
        const trait = crewMember.traits[getRandomInt(0, crewMember.traits.length - 1)];

        switch (trait.name) {
            case 'Noob':
                console.log('noob');
                crewMember.skipTurn = 18 / crewMember.productivity;
                crewMember.lastStatus = crewMember.status;
                crewMember.status = "Lost";
                
                eventResult.type = "danger";
                eventResult.message = `${crewMember.name} is kinda noob and got lost...`;
                return eventResult;

            case 'Pro Gamer':
                console.log('Pro Gamer');
                eventResult.type = "global";
                eventResult.message = `${crewMember.name} is a such a pro gamer and fear of nothing.`;
                return eventResult;

            case 'Troll':
                eventResult.type = "danger";
                eventResult.message = `${crewMember.name} start trolling all over the place...`;
                return eventResult;
        }     
    }

    //return eventResult;
}