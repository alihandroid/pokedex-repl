import { State } from "./state.js";

export async function commandMap(state: State) {
    let locations = await state.pokeapi.fetchLocations(state.nextLocationsURL ?? undefined);
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
    for (const location of locations.results) {
        console.log(location.name);
    }
}