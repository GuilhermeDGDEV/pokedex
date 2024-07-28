const PokeApi = {};

function convertPokeAPIDetailToPokemon(pokemonDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokemonDetail.id;
    pokemon.name = pokemonDetail.name;
    pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default;

    const types = pokemonDetail.types.map(typeSlot => typeSlot.type.name);
    const [type] = types

    pokemon.types = types;
    pokemon.type = type;
    return pokemon;
}

PokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url).then(responseInterno => responseInterno.json())
}

PokeApi.getPokemons = (offset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then(response => response.json())
        .then(jsonBody => jsonBody.results)
        .then(pokemons => pokemons.map(PokeApi.getPokemonDetail))
        .then(detailRequests => Promise.all(detailRequests))
        .then(pokemonDetails => pokemonDetails.map(convertPokeAPIDetailToPokemon));
}
