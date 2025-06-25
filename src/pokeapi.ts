import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    #cache = new Cache(5 * 60 * 1000);

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

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const pageURL = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

        const cached_data = this.#cache.get<Pokemon>(pageURL);
        if (cached_data) {
            return cached_data;
        }

        const response = await fetch(pageURL);
        const res = await response.json();
        this.#cache.add<Pokemon>(pageURL, res);
        return res;
    }
}

export type ShallowLocations = {
    count: number;
    next: string | null;
    previous: string | null;
    results: NamedAPIResource[];
};

export type Location = {
    encounter_method_rates: EncounterMethodRate[];
    game_index: number;
    id: number;
    location: NamedAPIResource;
    name: string;
    names: Name[];
    pokemon_encounters: PokemonEncounter[];
}

export type NamedAPIResource = {
    name: string;
    url: string;
};

export type APIResource = {
    url: string;
}

export type EncounterMethodRate = {
    encounter_method: NamedAPIResource;
    version_details: EncounterMethodRateVersionDetail[];
}

export type EncounterMethodRateVersionDetail = {
    rate: number;
    version: NamedAPIResource;
}

export type Name = {
    language: NamedAPIResource;
    name: string;
}

export type PokemonEncounter = {
    pokemon: NamedAPIResource;
    version_details: PokemonEncounterVersionDetail[];
}

export type PokemonEncounterVersionDetail = {
    encounter_details: EncounterDetail[];
    max_chance: number;
    version: NamedAPIResource;
}

export type EncounterDetail = {
    chance: number;
    condition_values: any[];
    max_level: number;
    method: NamedAPIResource;
    min_level: number;
}

export type Pokemon = {
    abilities: Ability[];
    base_experience: number;
    cries: Cries;
    forms: NamedAPIResource[];
    game_indices: GameIndex[];
    height: number;
    held_items: HeldItem[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Move[];
    name: string;
    order: number;
    stats: Stat[];
    types: Type[];
    weight: number;
}

export type Ability = {
    ability: NamedAPIResource;
    is_hidden: boolean;
    slot: number;
}

export type Cries = {
    latest: string;
    legacy: string;
}

export type GameIndex = {
    game_index: number;
    version: NamedAPIResource;
}

export type HeldItem = {
    item: NamedAPIResource;
    version_details: VersionDetail[];
}

export type VersionDetail = {
    rarity: number;
    version: NamedAPIResource;
}

export type Move = {
    move: NamedAPIResource;
    version_group_details: VersionGroupDetail[];
}

export type VersionGroupDetail = {
    level_learned_at: number;
    move_learn_method: NamedAPIResource;
    order?: number;
    version_group: NamedAPIResource;
}

export type Stat = {
    base_stat: number;
    effort: number;
    stat: NamedAPIResource;
}

export type Type = {
    slot: number;
    type: NamedAPIResource;
}