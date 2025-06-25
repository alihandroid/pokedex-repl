import { createInterface } from 'node:readline';
import { getCommands } from './commands.js';

export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    const commands = getCommands();

    rl.prompt();
    rl.on("line", input => {
        const [commandString, ...args] = cleanInput(input);
        const command = commands[commandString];

        if (command === undefined) {
            console.log("Unknown command");
        } else {
            try {
                command.callback(commands);
            } catch (err) {
                console.log(`Error running command ${command.name}: ${err}`);
            }
        }

        rl.prompt();
    });
}

export function cleanInput(input: string): string[] {
    return input.trim().split(" ").filter(x => x.length > 0).map(x => x.toLowerCase())
}
