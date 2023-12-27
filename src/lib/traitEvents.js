import { getRandomInt, dice } from "./helpers.js";

export const traitsList = [
    {
        name: 'Noob',
        diceBonus: -3,
        moovementBonus: -3,
        sanityBonus: 20
    },
    {
        name: 'Pro Gamer',
        diceBonus: 3,
        moovementBonus: 2,
        sanityBonus: -20
    },
    {
        name: 'Troll',
        diceBonus: -1,
        moovementBonus: -2,
        sanityBonus: 0,
    },
    {
        name: 'Speedrunner',
        diceBonus: 1,
        moovementBonus: 6,
        sanityBonus: 0,
    },
    {
        name: 'Veteran',
        diceBonus: 1,
        moovementBonus: 2,
        sanityBonus: -40,
    },
    {
        name: 'Coward',
        diceBonus: -2,
        moovementBonus: -2,
        sanityBonus: 40,
    },
    
    // 'Fighter', 'Coward', 
    // 'Speedrunner', 'Lazy', 
    // 'Greedy', 'Altruist', 'Narcissist', 'Sociopath', 
    // 'Noob', 'Pro Gamer', 'Troll',
    // 'Hacker', 'Twitch Streamer', 'Youtuber', 'Tiktoker', 'Hipster', 
    // 'Alpha', 'Beta', 'Omega', 'Chad', 'Boomer',
]
// export const procTraitEvent = (crewMember) => {
//     let eventResult = {
//         name: crewMember.name,
//         type: "",
//         message: "",
//     }

    // if (crewMember.traits.length > 0) {
    //     const trait = crewMember.traits[getRandomInt(0, crewMember.traits.length - 1)];

    //     switch (trait.name) {
    //         case 'Noob':
    //             console.log('noob');
    //             crewMember.skipTurn = 18 / crewMember.productivity;
    //             crewMember.lastStatus = crewMember.status;
    //             crewMember.status = "Lost";
                
    //             eventResult.type = "danger";
    //             eventResult.message = `${crewMember.name} is kinda noob and got lost...`;
    //             break;

    //         case 'Troll':
    //             console.log('Troll proc');
    //             // check if an other crew member has the trait 'Noob'
                
    //             game.crew.forEach((victim) => {
    //                 if (victim.traits.find((trait) => trait.name === "Noob")) {

    //                     let roll = getRandomInt(0, 1)

    //                     if(roll === 0) {
    //                         console.log('Troll lost');
    //                         victim.skipTurn = 16 / victim.productivity;
    //                         victim.lastStatus = victim.status;
    //                         victim.status = "Lost";
    //                         eventResult.type = "danger";
    //                         eventResult.message = `${crewMember.name} start trolling all over the place and ${victim.name} got lost...`;
    //                     } else {
    //                         console.log('Troll killed');
    //                         victim.status = "Dead";
    //                         eventResult.type = "lethal";
    //                         eventResult.message = `${crewMember.name} start trolling and told ${victim.name} to pickup that cool loot on the floor... Next second ${victim.name} exploded on a land mine...`;
    //                     }
    //                 }
    //             })
    //             break
    //     }     
    // }

    //return eventResult;
//}