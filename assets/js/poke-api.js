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

    pokemon.abilities = pokemonDetail.abilities.map(a => a.ability.name);
    pokemon.weight = pokemonDetail.weight;
    pokemon.height = pokemonDetail.height;
    pokemon.hp = pokemonDetail.stats[0].base_stat;
    pokemon.attack = pokemonDetail.stats[1].base_stat;
    pokemon.defense = pokemonDetail.stats[2].base_stat;
    pokemon.specialAttack = pokemonDetail.stats[3].base_stat;
    pokemon.specialDefense = pokemonDetail.stats[4].base_stat;
    pokemon.speed = pokemonDetail.stats[5].base_stat;

    pokemon.speciesUrl = pokemonDetail.species.url;

    return pokemon;
}

PokeApi.getPokemonDetail = pokemon =>
    fetch(pokemon.url)
        .then(responseInterno => responseInterno.json());

PokeApi.getPokemons = (offset, limit) =>
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        .then(response => response.json())
        .then(jsonBody => jsonBody.results)
        .then(pokemons => pokemons.map(PokeApi.getPokemonDetail))
        .then(detailRequests => Promise.all(detailRequests))
        .then(pokemonDetails => pokemonDetails.map(convertPokeAPIDetailToPokemon));

PokeApi.getPokemonById = id =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json());

