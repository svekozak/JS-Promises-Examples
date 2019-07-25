const pokemonType = 'type/3';
const pokemonApiURL = 'https://pokeapi.co/api/v2/'

  get(pokemonApiURL + pokemonType)
  .finally(function(value){
    console.log('Finally', value);
  })
  .then(function(response) {
    console.log("Success!", response);
  }, function(error) {
    console.error("Failed!", error);
  })