import { writable } from 'svelte/store';


let loaded = false;
export const pokemon = writable([]);
const pokemonDetails = {};


export const fetchPokemon = async () => {
    if (loaded) return;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const loadedPokemon = data.results.map((data, index) => ({
            name: data.name,
            id: index + 1,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
        }));
        pokemon.set(loadedPokemon);
        loaded = true;
    } catch (error) {
        console.error('Failed to fetch Pokemon:', error);
    }
};

export const getPokemonById = async (id) => {
	if (pokemonDetails[id]) return pokemonDetails[id];

	try {
		const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
		const res = await fetch(url);
		const data = await res.json();
		pokemonDetails[id] = data;
		return data;
	} catch (err) {
		console.error(err);
		return null;
	}
};
