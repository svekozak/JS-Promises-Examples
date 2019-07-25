const pokemonType = 'type/3';
const pokemonApiURL = 'https://pokeapi.co/api/v2/'

getJSON(pokemonApiURL + pokemonType).then(
    function(type) {
        console.log('type', type);
        addInnerHTMLTo("#container", 'Pokemon type <span class="type">' + type.name + '</span>: ');
        return type.pokemon.map(
                p => getJSON(p.pokemon.url)
            ).reduce(
                function(sequence, pokemonPromise, index) {
                    return sequence.then(function() {
                        console.log("Pokemon lured ", pokemonPromise, index);
                        // Wait for everything in the sequence so far,
                        // then wait for this pokemon to be caught.
                        return pokemonPromise;
                    }).then(function(pokemon){
                        addInnerHTMLTo(
                            "#container", 'Caught pokemon <span class="name">' + pokemon.name + ' ' + index + '</span>'
                        );
                        console.log("Pokemon caught " + pokemon.name, pokemon);
                    });
                },
                Promise.resolve()
            );
    }
).then(
    function() {
        addInnerHTMLTo(
            "#container", "#container", "<b>We did catch 'em all!!!</b>"
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