import { getRandomInt, dice } from "./helpers.js";

export const envEvents = [
    {
        id: 1,
        name: "Fall over a cliff",
        difficulty: 5,
        damage: 15,
        win: "almost fall over a cliff but somehow manage to avoid it at the last time.",
        lost: "ridiculously fall over a small cliff... looking dumb and hurt.",
        dead: "ridiculously fall over a small cliff... and died...",
    },
    {
        id: 2,
        name: "Small asteroid",
        difficulty: 10,
        damage: 50,
        win: "almost get hit by a small asteroid falling from the sky.",
        lost: "got hit by a very small but still dangerous asteroid shard!",
        dead: "got killed by a very small but still dangerous asteroid shard..."
    },
    {
        id: 3,
        name: "Asteroid",
        difficulty: 15,
        damage: 100,
        win: "almost get hit by a big Asteroid.",
        dead: "get hit by a big ass Asteroid, there's nothing left but a whole hole in the ground and some smoke...",
    }
];

export const envEventsDunjon = [
    {
        id: 1,
        name: "Mine",
        difficulty: 5,
        damage: 100,
        win: "almost walk on a land mine, but oof, was close.",
        dead: "exploded on a land mine...",
    },
    {
        id: 2,
        name: "auto turret",
        difficulty: 7,
        damage: 34,
        win: "just scream : 'Watch out there's a auto turret right here !'",
        lost: "didn't see the auto turret and get hit by a bullet!",
        dead: "didn't see the auto turret and get killed instatly killed..."
    },
    {
        id: 3,
        name: "Fall",
        difficulty: 10,
        damage: 100,
        win: "almost fall over the fence.",
        dead: "fall over a fence... right into the void of the abandonned complex. RIP.",
    }
]

export const procEnvEvent = (crewMember) => {

    let randomEnv;
    let eventResult = {
        name: crewMember.name,
        type: "environement",
        message: "",
    }

    if (crewMember.location === "Outside") {
        randomEnv = envEvents[getRandomInt(0, envEvents.length - 1)]
    } else {
        randomEnv = envEventsDunjon[getRandomInt(0, envEvents.length - 1)]
    }

    if(dice(20) < randomEnv.difficulty) {
        // fail
        crewMember.health -= randomEnv.damage;
        
        if(crewMember.health <= 0) {
            crewMember.isAlive = false;
            eventResult.type = "lethal";
            eventResult.message = `${crewMember.name} ${randomEnv.dead}`;
            return eventResult;
        } else {
            eventResult.type = "lethal";
            eventResult.message = `${crewMember.name} ${randomEnv.lost}`;
            return eventResult;
        }
    } else {
        // success
        eventResult.message = `${crewMember.name} ${randomEnv.win}`;
        return eventResult;
    }

}