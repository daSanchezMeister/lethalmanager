export function getRandomInt(min, max) {
    const randomIntInRange = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomIntInRange;
}

export let dice = (max) => {
    const result = Math.floor(Math.random() * max) + 1
    return result
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