import { getRandomInt } from "./helpers.js";

export const randomExtEvents = [
    {
        id: 1,
        name: "See a meteorite",
        sanityDamage: 10,
        desc: "just saw a small meteorite falling from the sky at a large distance. It's beautiful. But is it dangerous ?",
    },
    {
        id: 2,
        name: "Hear a strange noise",
        sanityDamage: 20,
        desc: "tell the others : 'What was that sound ? I swear i heard something behin that rock.",
    },
    {
        id: 3,
        name: "Tell a joke",
        sanityBoost: 50,
        desc: "tell a ridiculously funny joke about a long forgotten company worker that get hit by a big ass asteroid during service. What are the odds ? Right guys ?",
    }
];

export const randomDunjonEvents = [
    {
        id: 1,
        name: "Strange noise",
        sanityDamage: 20,
        desc: "heard a strange noise comming from behind?!",
    },
    {
        id: 2,
        name: "Strange shadow",
        sanityDamage: 40,
        desc: "just saw a shadow behind that door?!",
    },
    {
        id: 3,
        name: "See a monster",
        sanityDamage: 60,
        desc: "tell the others : 'Guys WTF i swear i saw a monster running that way ! We should get back no ?'",
    }
]

export const procRandomEvent = (crewMember) => {

    let randomEvent;

    let eventResult = {
        name: crewMember.name,
        type: "random",
        message: "",
    }

    crewMember.location === "Outside" ? randomEvent = randomExtEvents[getRandomInt(0, randomExtEvents.length - 1)] : randomEvent = randomDunjonEvents[getRandomInt(0, randomDunjonEvents.length - 1)]

    if (randomEvent.sanityDamage) {
        crewMember.sanity -= randomEvent.sanityDamage;
        if (crewMember.sanity <= 0) {
            crewMember.sanity = 0;
            crewMember.skipTurn = 12 / crewMember.productivity;
            crewMember.lastStatus = crewMember.status;
            crewMember.status = "Panic attack";
            eventResult.message = `${crewMember.name} ${randomEvent.desc} And freacked out in panic attack and start running all over the place...`
            return eventResult;
        }
        // console.log(`${crewMember.name} ${randomEvent.desc} \n Sanity -${randomEvent.sanityDamage}`)
    } else {
        crewMember.sanity += randomEvent.sanityBoost;
        // console.log(`${crewMember.name} ${randomEvent.desc} \n Sanity +${randomEvent.sanityBoost}`)
    }

    eventResult.message = `${crewMember.name} ${randomEvent.desc}`

    return eventResult;
}