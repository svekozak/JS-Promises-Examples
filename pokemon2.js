const pokemonType = 'type/3';
const pokemonApiURL = 'https://pokeapi.co/api/v2/'

getJSON(pokemonApiURL + pokemonType).then(
    function(type) {
        console.log('type', type);
        return getJSON(type.pokemon[0].pokemon.url);
    }
).then(
    function(pokemon) {
        setInnerHTMLTo("#container", "Caught pokemon " + pokemon.name);
        console.log("Pokemon " + pokemon.name, pokemon);
    }
);