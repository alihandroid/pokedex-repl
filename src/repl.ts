import { State } from './state.js';

export async function startREPL(state: State) {
    state.rl.prompt();
    state.rl.on("line", async input => {
        const [commandString, ...args] = cleanInput(input);
        const command = state.commands[commandString];

        if (command === undefined) {
            console.log("Unknown command");
        } else {
            try {
                await command.callback(state, ...args);
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
