const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 12;
let offset = 0;

function loadPokemonItens(offset, limit) {
    PokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => pokemonList.innerHTML += pokemons.map(pokemon =>
            `
            <a href="./detail.html?id=${pokemon.number}">
                <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number.toString().padStart(3, '0')}</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>

                        <img 
                            src="${pokemon.photo}"
                            alt="${pokemon.name}">
                    </div>
                </li>
            </a>`
        ).join(''));
}

loadPokemonItens(offset, limit);
loadMoreButton.addEventListener('click', () => {
    offset += limit;

    if ((offset + limit) >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
        return;
    }

    loadPokemonItens(offset, limit)
});
