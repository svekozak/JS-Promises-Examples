const pokemonType = 'type/3';
const pokemonApiURL = 'https://pokeapi.co/api/v2/'

getJSON(pokemonApiURL + pokemonType).then(
    function(type) {
        console.log(type);
        addInnerHTMLTo("#container", 'Pokemon type <span class="type">' + type.name + '</span>: ');
        return Promise.all(
            // Map to an array of pokemon json promises
            type.pokemon.map(
                p => getJSON(p.pokemon.url))
          );
    }
).then(
    function(pokemonArray) {
        pokemonArray.forEach(function(pokemon, index) {
            addInnerHTMLTo(
                "#container", 'Caught pokemon <span class="name">' + pokemon.name + ' ' + index + '</span>'
            );
            console.log("Pokemon " + pokemon.name, pokemon);
        })
    }
).then(
    function() {
        addInnerHTMLTo(
            "#container", "<b>We did catch 'em all!!!</b>"
        );
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