export function cleanInput(input: string): string[] {
    return input.trim().split(" ").filter(x => x.length > 0).map(x => x.toLowerCase())
}

import { createInterface } from 'node:readline';
const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
});

export function startREPL() {
    rl.prompt();
    rl.on("line", input => {
        const inputArr = cleanInput(input);
        console.log(`Your command was: ${inputArr[0]}`);
        rl.prompt();
    });
}