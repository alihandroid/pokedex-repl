import { State } from "./state.js";

export async function commandCatch(state: State, pokemonName: string) {
    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    const response = await state.pokeapi.fetchPokemon(pokemonName);
    const captureChance = response.base_experience / 1000;
    if (Math.random() < captureChance) {
        console.log(`${pokemonName} escaped!`);
        return;
    }

    console.log(`${pokemonName} was caught!`);
    state.pokedex[pokemonName] = response;
}