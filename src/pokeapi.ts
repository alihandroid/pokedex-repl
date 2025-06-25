import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    #cache = new Cache(5000);

    constructor() { }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        if (!pageURL) {
            pageURL = `${PokeAPI.baseURL}/location-area`;
        }

        const cached_data = this.#cache.get<ShallowLocations>(pageURL);
        if (cached_data) {
            return cached_data;
        }
        const response = await fetch(pageURL);
        const res = await response.json();
        this.#cache.add<ShallowLocations>(pageURL, res);
        return res;
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const pageURL = `${PokeAPI.baseURL}/location-area/${locationName}`;
        const cached_data = this.#cache.get<Location>(pageURL);
        if (cached_data) {
            return cached_data;
        }
        const response = await fetch(pageURL);
        const res = await response.json();
        this.#cache.add<Location>(pageURL, res);
        return res;
    }
}

export type ShallowLocations = {
    count: number;
    next: string | null;
    previous: string | null;
    results: ResourceLink[];
};

export type Location = {
    encounter_method_rates: EncounterMethodRate[];
    game_index: number;
    id: number;
    location: ResourceLink;
    name: string;
    names: Name[];
    pokemon_encounters: PokemonEncounter[];
}

export type ResourceLink = {
    name: string;
    url: string;
};

export type EncounterMethodRate = {
    encounter_method: ResourceLink;
    version_details: EncounterMethodRateVersionDetail[];
}

export type EncounterMethodRateVersionDetail = {
    rate: number;
    version: ResourceLink;
}

export type Name = {
    language: ResourceLink;
    name: string;
}

export type PokemonEncounter = {
    pokemon: ResourceLink;
    version_details: PokemonEncounterVersionDetail[];
}

export type PokemonEncounterVersionDetail = {
    encounter_details: EncounterDetail[];
    max_chance: number;
    version: ResourceLink;
}

export type EncounterDetail = {
    chance: number;
    condition_values: any[];
    max_level: number;
    method: ResourceLink;
    min_level: number;
}
