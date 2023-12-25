import { getRandomInt, dice } from "./helpers.js";
import { game } from "./game.js";

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
    },
    {
        id: 4,
        name: "Alien bird",
        difficulty: 5,
        damage: 20,
        win: "almost get hit by an alien bird.",
        lost: "got hit by an alien bird right in the face.",
        dead: "got hit by an alien bird right in the left eye, perforation got through the brain and lead to instant death... Sadge.",
    },
    {
        id: 5,
        name: "quicksand",
        difficulty: 5,
        damage: 35,
        win: "almost steped in quicksand, but see it at the very last time.",
        lost: "steped in quicksand and put a large effort to get out of danger. Badly hurt and lost a shoes.",
        dead: "disapeard ?! There's a strange mark on the ground, looks like quicksands.",
    },
];

export const envEventsDunjon = [
    {
        id: 1,
        name: "Mine",
        difficulty: 6,
        damage: 100,
        win: "almost walk on a land mine, but oof, was close.",
        dead: "exploded on a land mine... RIP.",
        counter: "Flashlight",
    },
    {
        id: 2,
        name: "auto turret",
        difficulty: 8,
        damage: 50,
        win: "saw an auto turret and avoided it.",
        lost: "didn't see the auto turret and get hit by a bullet!",
        dead: "didn't see the auto turret and get instatly killed...",
        counter: "Flashlight",
    },
    {
        id: 3,
        name: "Fall",
        difficulty: 10,
        damage: 100,
        win: "almost fall over a broken fence.",
        dead: "fall over a en fence... We can see the body 6 floors down... RIP.",
        counter: "Flashlight",
    }
]

export const procEnvEvent = (crewMember) => {
    // sum all bonuses from inventory
    const bonuses = crewMember.inventory.filter((item) => item.type === "tool").map((item) => item.bonus).reduce((acc, value) => acc + value, 0);;
    
    let randomEnv;
    let eventResult = {
        name: crewMember.name,
        type: "",
        message: "",
    }

    if (crewMember.location === "Outside") {
        randomEnv = envEvents[getRandomInt(0, envEvents.length - 1)]
    } else {
        randomEnv = envEventsDunjon[getRandomInt(0, envEventsDunjon.length - 1)]
    }

    const hasCounter = crewMember.inventory.some((item) => item.name == randomEnv.counter);

    if (randomEnv.counter && hasCounter) {      
        
        eventResult.type = "global";
        eventResult.message = `${crewMember.name} ${randomEnv.win} Saw it with the ${randomEnv.counter} !`;
        //return eventResult;

    } else if (dice(20)+bonuses < randomEnv.difficulty) {
        // fail
        crewMember.health -= randomEnv.damage;
        
        if(crewMember.health <= 0) {
            crewMember.isAlive = false;
            eventResult.type = "lethal";
            game.update((game) => { game.alive--; return game; });
            eventResult.message = `${crewMember.name} ${randomEnv.dead}`;
            //return eventResult;

        } else {
            eventResult.type = "danger";
            eventResult.message = `${crewMember.name} ${randomEnv.lost}`;
            //return eventResult;

        }
    } else {
        // success
        eventResult.type = "global";
        eventResult.message = `${crewMember.name} ${randomEnv.win}`;
        //return eventResult;
    }

    return eventResult;

}