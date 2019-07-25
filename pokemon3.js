const pokemonType = 'type/3';
const pokemonApiURL = 'https://pokeapi.co/api/v2/'

getJSON2(pokemonApiURL + pokemonType).then(
    function(type) {
        console.log('type', type);
        return getJSON2(type.pokemon[0].pokemon.url);
    }
).then(
    function(pokemon) {
        addInnerHTMLTo("#container", "Caught pokemon " + pokemon.name);
        console.log("Pokemon " + pokemon.name, pokemon);
    }
).catch(
    function(err) {
        console.log('Something wrong happened: ', err)
        addInnerHTMLTo("#container", "Pokemon got away");
    }
).then(
    function() {
        document.querySelector('#spinner').style.display = 'none';
    }
);