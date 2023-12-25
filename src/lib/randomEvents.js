import { getRandomInt } from "./helpers.js";

export const randomExtEvents = [
    {
        id: 1,
        type: "danger",
        name: "See a meteorite",
        sanityDamage: 25,
        desc: "just saw a small meteorite falling from the sky at a large distance. It's beautiful. But is it dangerous ?",
    },
    {
        id: 2,
        type: "danger",
        name: "Hear a strange noise",
        sanityDamage: 30,
        desc: "tell the others : 'What was that sound ? I swear i heard something behin that rock.",
    },
    {
        id: 3,
        type: "global",
        name: "Tell a joke",
        sanityBoost: 50,
        desc: "tell a ridiculously funny joke about a long forgotten company worker that get hit by a big ass asteroid during service. What are the odds ? Right guys ?",
    },
    {
        id: 3,
        type: "global",
        name: "think",
        sanityDamage: 15,
        desc: "think about failling the profit quota, what can happen ?",
    }
];

export const randomDunjonEvents = [
    {
        id: 1,
        type: "danger",
        name: "Strange noise",
        sanityDamage: 25,
        desc: "heard a strange noise comming from behind?!",
    },
    {
        id: 2,
        type: "danger",
        name: "Strange shadow",
        sanityDamage: 40,
        desc: "just saw a shadow behind that door?!",
    },
    {
        id: 3,
        type: "danger",
        name: "See a monster",
        sanityDamage: 60,
        desc: "just saw a monster running that way ! We should get back no ?",
    },
    {
        id: 4,
        type: "global",
        name: "Tell a story",
        sanityBoost: 25,
        desc: "start telling an epic story about 4 dedicated worker that escaped a tyranic corporation... but forgot the end...",
    }
]

export const procRandomEvent = (crewMember) => {

    let randomEvent;

    let eventResult = {
        name: crewMember.name,
        type: "",
        message: "",
    }

    crewMember.location === "Outside" ? randomEvent = randomExtEvents[getRandomInt(0, randomExtEvents.length - 1)] : randomEvent = randomDunjonEvents[getRandomInt(0, randomDunjonEvents.length - 1)]

    if (randomEvent.sanityDamage) {
        eventResult.type = randomEvent.type;
        crewMember.sanity -= randomEvent.sanityDamage;
        if (crewMember.sanity <= 0) {
            crewMember.sanity = 0;
            crewMember.skipTurn = 12 / crewMember.productivity;
            crewMember.lastStatus = crewMember.status;
            crewMember.status = "Panic attack";
            eventResult.type = randomEvent.type;
            eventResult.message = `${crewMember.name} ${randomEvent.desc} And freacked out in panic attack and start running all over the place...`
            return eventResult;
        }
    } else {
        crewMember.sanity += randomEvent.sanityBoost;
        eventResult.type = randomEvent.type;
    }

    eventResult.message = `${crewMember.name} ${randomEvent.desc}`

    return eventResult;
}