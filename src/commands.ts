import { CLICommand } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";


export function getCommands(): Record<string, CLICommand> {
    return {
        help: {
            name: "help",
            description: "Prints how to use the pokedex",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Move forward and display 20 locations",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Move backward and display 20 locations",
            callback: commandMapb,
        },
        explore: {
            name: "explore",
            description: "Explore a location",
            callback: commandExplore,
        },
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        // can add more commands here
    };
}