import { createInterface } from 'node:readline';
import { getCommands } from './commands.js';
import { State } from './state.js';

export function startREPL(state: State) {
    state.rl.prompt();
    state.rl.on("line", input => {
        const [commandString, ...args] = cleanInput(input);
        const command = state.commands[commandString];

        if (command === undefined) {
            console.log("Unknown command");
        } else {
            try {
                command.callback(state);
            } catch (err) {
                console.log(`Error running command ${command.name}: ${err}`);
            }
        }

        state.rl.prompt();
    });
}

export function cleanInput(input: string): string[] {
    return input.trim().split(" ").filter(x => x.length > 0).map(x => x.toLowerCase())
}
