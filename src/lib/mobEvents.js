import { getRandomInt, dice } from "./helpers.js";
import { game } from "./game.js";

const mobExtEvents = [
    {
        id: 1,
        name: "Alien bees",
        difficulty: 8,
        damage: 25,
        win: "just avoided an alien bee hive.",
        lost: "stepped on an alien bee hive and get hunted by some alien bees, it hurts.",
        dead: "stepped on an alien bee hive and get hunted to death by a swarm of alien bees. RIP",
    },
    {
        id: 2,
        name: "Giant Alien",
        difficulty: 9,
        damage: 100,
        win: "manage to sneak around a big ass giant alien, better stay sneaky.",
        lost: "got catched by the Giant but somehow manage to escape it, not without behing hurt bad.",
        dead: "got catched and eated alive by a biggg giant alien..."
    },
    {
        id: 3,
        name: "Dune worm",
        difficulty: 10,
        damage: 300,
        win: "WTF I ALMOST GOT EATED BY A DUNE WORM????",
        dead: "just dispeared in a loud jurassic park sound... Is that a Dune worm in the sky ? huh ?",
    }
];

const mobDunjonEvents = [
    {
        id: 1,
        name: "Slim",
        difficulty: 6,
        damage: 35,
        win: "jumped over a Slime, thank god its so slow.",
        lost: "stepped in a large Slime but managed to get out of it.",
        dead: "face planted in a big Slime... made weird bubbling sounds, and died...",
    },
    {
        id: 2,
        name: "Alien roach",
        difficulty: 8,
        damage: 40,
        win: "almost get bitten by a roaming alien roach but managed to avoid it.",
        lost: "got bitten by an alien roach, it hurts a lot.",
        dead: "got eated by an alien roach... RIP."
    },
    {
        id: 3,
        name: "Face Hugger",
        difficulty: 10,
        damage: 100,
        win: "saw a large alien egg that looks pretty much alive, better avoid it.",
        lost: "got choked by a Face Hugger but somehow manage to get him off and throw it over the fence.",
        dead: "run everywhere to avoid a Face Hugger, but it was too fast...",
    },
    {
        id: 4,
        name: "Xenomorph",
        difficulty: 15,
        damage: 100,
        win: "somehow manage to avoid a big Xenomorph. Damn, that was close.",
        lost: "Get hit by the tail of a Xenomorph. Somehow manage to survive but it hurts a lot.",
        dead: "head roll over the floor... An adult Xenomorph sneak up through the ventilation...",
    },
    {
        id: 5,
        name: "Alien Snake",
        difficulty: 6,
        damage: 15,
        win: "almost stepped on an small alien snake, but avoid it.",
        lost: "stepped on an small alien snake and got bitten, it hurts a lot.",
        dead: "disapeard ?! There's a strange mark on the ground, looks like quicksands.",
    },
]

export const procMobEvent = (crewMember) => {

    let randomMob;
    let ratio = 1;
    let eventResult = {
        name: crewMember.name,
        type: "",
        message: "",
    }

    crewMember.location === "Outside" ? randomMob = mobExtEvents[getRandomInt(0, mobExtEvents.length - 1)] : randomMob = mobDunjonEvents[getRandomInt(0, mobDunjonEvents.length - 1)]

    // const isPro = crewMember.traits.some((trait) => trait.name === "Pro Gamer");
    // const diceBonus = isPro ? 2 : 0;

    const roll = dice(20, crewMember);

    if(roll < randomMob.difficulty) {
        // fail
        const hasArmor = crewMember.inventory.find(item => item.type === "armor");
        if(hasArmor) { ratio = hasArmor.ratio; }
        
        crewMember.health -= Math.round(randomMob.damage / ratio);
        
        if(crewMember.health <= 0) {
            crewMember.isAlive = false;
            eventResult.type = "lethal";
            eventResult.message = `${crewMember.name} ${randomMob.dead}`;
            game.update((game) => { game.alive--; return game; });
            return eventResult;
        } else {
            eventResult.type = "danger";
            eventResult.message = `${crewMember.name} ${randomMob.lost}`;
            return eventResult;
        }
    } else {
        // success
        eventResult.type = "danger";
        eventResult.message = `${crewMember.name} ${randomMob.win}`;
        return eventResult;
    }

}