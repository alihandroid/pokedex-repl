import { State } from "./state.js";

export async function commandExplore(state: State, locationName: string) {
    console.log(`Exploring ${locationName}...`);
    const response = await state.pokeapi.fetchLocation(locationName);
    const pokemonNames = response.pokemon_encounters.map(x => x.pokemon.name);
    console.log("Found Pokemon:");
    for (const pokemonName of pokemonNames) {
        console.log(`- ${pokemonName}`);
    }
}