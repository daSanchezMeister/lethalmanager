export function getRandomInt(min, max) {
    const randomIntInRange = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomIntInRange;
}

export let dice = (max, crewMember = null) => {
    let itemBonuses, traitBonuses;

    if (crewMember !== null) {
        itemBonuses = crewMember.inventory.filter((item) => item.type === "tool").map((item) => item.bonus).reduce((acc, value) => acc + value, 0);
        traitBonuses = crewMember.traits.reduce((acc, trait) => acc + trait.diceBonus, 0)

    } else {
        itemBonuses = 0;
        traitBonuses = 0;
    }

    const result = Math.floor(Math.random() * max) + 1 + itemBonuses + traitBonuses;
    return result
}

export const moovement = (crewMember) => {
    let itemBonuses = 0;
    let traitBonuses = 0;

    itemBonuses = crewMember.inventory.filter((item) => item.type === "moovement").map((item) => item.bonus).reduce((acc, value) => acc + value, 0);
    traitBonuses = crewMember.traits.reduce((acc, trait) => acc + trait.moovementBonus, 0)

    const result = getRandomInt(8,12) + crewMember.productivity + itemBonuses + traitBonuses;
    return result;
}

export const sanity = (crewMember, sanityDamage) => {

    let itemBonuses = crewMember.inventory.filter((item) => item.type === "sanity").map((item) => item.bonus).reduce((acc, value) => acc + value, 0);
    let traitBonuses = crewMember.traits.reduce((acc, trait) => acc + trait.sanityBonus, 0)

    let result;
    let calc = sanityDamage + itemBonuses + traitBonuses;

    if (calc < 0) { result = 0; } 
    else { result = calc; }

    return result;
}


export const namesList = [
    'Emma', 'Liam', 'Olivia', 'Noah', 'Sophia', 'Lucas', 'Ava', 'Isaac', 'Mia', 'Ethan',
    'Amelia', 'Mason', 'Harper', 'Caden', 'Ella', 'Oliver', 'Aria', 'Elijah', 'Scarlett', 'Logan',
    'Aiden', 'Grace', 'Jackson', 'Lily', 'Jack', 'Chloe', 'Caleb', 'Zoe', 'Benjamin', 'Layla',
    'Henry', 'Nora', 'Wyatt', 'Emily', 'Leo', 'Madison', 'Owen', 'Evelyn', 'Gabriel', 'Abigail',
    'Carter', 'Sofia', 'Sebastian', 'Avery', 'Joseph', 'Hannah', 'David', 'Aubrey', 'Luke', 'Victoria',
    'Julia', 'Alexander', 'Sophie', 'Daniel', 'Charlotte', 'Michael', 'Alice', 'Matthew', 'Eva', 'Andrew',
    'Isabella', 'Nicholas', 'Aurora', 'William', 'Grace', 'James', 'Emma', 'Benjamin', 'Aria', 'Samuel',
    'Zara', 'John', 'Elena', 'Olivia', 'Max', 'Sophie', 'Adam', 'Amelie', 'Leo', 'Stella',
    'Christopher', 'Hazel', 'Nathan', 'Freya', 'Emily', 'Finn', 'Natalie', 'Lucy', 'Thomas', 'Luna',
    'Eliott', 'Mila', 'Liam', 'Ella', 'Isabel', 'Robert', 'Maya', 'Henry', 'Adele', 'Luke', 'Clara'
];