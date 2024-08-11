const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');

if (!pokemonId) voltar();

function voltar() {
    window.location.href = window.location.origin;
}

function hectogramToKg(hec) {
    return hec / 10;
}

function kgToLbs(kg) {
    return (kg * 2) + (kg * 2 / 10);
}

function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function montaBarraStatus() {
    document.querySelectorAll('[barra-status]').forEach(elem => {
        const valorStatus = Number(elem.querySelector('strong').innerHTML);
        const porcentagemAPreecher = valorStatus / 150 * 100;

        const progresso = elem.querySelector('.progresso');
        progresso.style.width = `${porcentagemAPreecher}%`;
        progresso.classList.add(valorStatus < 50 ? 'vermelho' : 'verde')
    });
}

function montaHTMLDetail(pokemon) {
    document.querySelector('body').classList.add(pokemon.type);
    document.querySelector('#pokemonName').innerHTML = capitalizeFirstLetter(pokemon.name);
    document.querySelector('#types').innerHTML = pokemon.types
        .map(type => `<li class="type ${type}">${type}</li>`).join('');
    document.querySelector('#pokemonNumber').innerHTML = `#${pokemon.number.toString().padStart(3, '0')}`;
    document.querySelector('#height').innerHTML = `${pokemon.height * 10} cm`;
    document.querySelector('#weight').innerHTML =
        `${kgToLbs(hectogramToKg(pokemon.weight)).toFixed(1)} lbs (${hectogramToKg(pokemon.weight)} kg)`;
    document.querySelector('#abilities').innerHTML = pokemon.abilities.map(capitalizeFirstLetter).join(', ');
    document.querySelector('#photo').setAttribute('src', pokemon.photo);
    document.querySelector('#photo').setAttribute('alt', pokemon.name);

    fetch(pokemon.speciesUrl).then(result => result.json())
        .then(specieDetail => {
            document.querySelector('#species').innerHTML = specieDetail
                .varieties.map(variety => capitalizeFirstLetter(variety.pokemon.name)).join(', ');
            document.querySelector('#eggGroups').innerHTML = specieDetail
                .egg_groups.map(group => capitalizeFirstLetter(group.name)).join(', ');
        });
    
    document.querySelector('#hp').innerHTML = pokemon.hp;
    document.querySelector('#attack').innerHTML = pokemon.attack;
    document.querySelector('#defense').innerHTML = pokemon.defense;
    document.querySelector('#specialAttack').innerHTML = pokemon.specialAttack;
    document.querySelector('#specialDefense').innerHTML = pokemon.specialDefense;
    document.querySelector('#speed').innerHTML = pokemon.speed;

    montaBarraStatus();
}

let pokemon = new Pokemon();
PokeApi.getPokemonById(pokemonId).then(pokemonDetail => {
    pokemon = convertPokeAPIDetailToPokemon(pokemonDetail);
    montaHTMLDetail(pokemon);
});
