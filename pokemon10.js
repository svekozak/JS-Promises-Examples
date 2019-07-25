const pokemonType = 'type/3';
const pokemonApiURL = 'https://pokeapi.co/api/v2/'

getJSON(pokemonApiURL + pokemonType).then(
    function(type) {
        addInnerHTMLTo("#container", 'Pokemon type <span class="type">' + type.name + '</span>: ');
        return type.pokemon.map(
                p => {
                    return getJSON(p.pokemon.url)
                    .then(
                        function(pokemon) {
                            
                            return loadImage(pokemon.sprites.front_default)
                            .then(
                                function(img) {
                                    pokemon.image = img;
                                    console.log('got img', pokemon);
                                    return pokemon;
                                }
                            )
                            .catch(
                                err => {
                                    console.log('we cannot see this one');
                                    return pokemon;
                                }
                            );
                            
                        }
                    )
                }
            ).reduce(
                function(sequence, pokemonPromise, index) {
                    return sequence.then(function() {
                        return pokemonPromise;
                    }).then(function(pokemon){ 
                        console.log("Pokemon caught ", pokemon);
                        addInnerHTMLTo(
                            "#container", 'Caught pokemon <span class="name">' + pokemon.name + ' ' + index + '</span>'
                        );
                        if (pokemon.image) {
                            console.log(pokemon.image)
                            document.getElementById('container').appendChild(pokemon.image);
                        }
                    });
                },
                Promise.resolve()
            );
    }
).then(
    function(pokemonArray) {
        addInnerHTMLTo(
            "#container", "<b>We did catch 'em all!!!</b>"
        );
    }
).catch(
    function(err) {
        console.log('error', err);
        addInnerHTMLTo("#container", "Pokemon got away");
    }
).finally(
    function() {
        document.querySelector('#spinner').style.display = 'none';
    }
);