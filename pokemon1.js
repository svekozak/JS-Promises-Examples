const pokemonType = 'type/3';
const pokemonApiURL = 'https://pokeapi.co/api/v2/'

  get(pokemonApiURL + pokemonType + '..').then(
        function(response) {
            console.log('res', response);
            return JSON.parse(response);
        },
        function(error) {
            console.error("Failed!", error);
            return 1;
        }
    ).then(
        function(response) {
            console.log("Yey JSON!", response);
        }
    );