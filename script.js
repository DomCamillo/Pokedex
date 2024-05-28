const Base_URL = "https://pokeapi.co/api/v2/";
const Max_Pokemon = 151;

let AllPokemons = [];

async function loadPokeData() {
    let Pokemons = await fetch(`${Base_URL}pokemon/?limit=${Max_Pokemon}`);
    let PokemonToJson = await Pokemons.json();
    AllPokemons = PokemonToJson.results;
    console.log(AllPokemons[0].name);
    getEachPokeData();
    
    
}
  async function getEachPokeData(){
  for (let i = 0; i < AllPokemons.length; i++) {
    const Pokemon = AllPokemons[i].name;
    console.log(Pokemon);
   }
   load();
}

 async function load(Pokemon){
    let card = document.getElementById('main-card');
    card.innerHTML = '';
    for (let i = 0; i < 10 ; i++) {
        
        card.innerHTML += `<div class="pokemonCard">${Pokemon} </div>`
    }
}

function init(){
    loadPokeData();

    getEachPokeData();
}
