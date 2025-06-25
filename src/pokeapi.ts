export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() { }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        if (!pageURL) {
            pageURL = `${PokeAPI.baseURL}/location-area`;
        }

        const response = await fetch(pageURL);
        return response.json();
    }
}

export type ShallowLocations = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Location[];
};

export type Location = {
    name: string;
    url: string;
};