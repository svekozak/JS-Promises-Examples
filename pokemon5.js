const pokemonType = 'type/3';
const pokemonApiURL = 'https://pokeapi.co/api/v2/'

getJSON(pokemonApiURL + pokemonType).then(
    function(type) {
        console.log(type);
        addInnerHTMLTo("#container", 'Pokemon type <span class="type">' + type.name + '</span>: ');
        var sequence = Promise.resolve();
        type.pokemon.forEach(
            function(p, index) {
                sequence = sequence.then(
                    function() {
                        return getJSON(p.pokemon.url);
                })
                .then(
                    function(pokemon) {
                        addInnerHTMLTo(
                            "#container", 'Caught pokemon <span class="name">' + pokemon.name + ' ' + index + '</span>'
                        );
                        console.log("Pokemon " + pokemon.name, pokemon);
                    }
                );
            }
        )
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