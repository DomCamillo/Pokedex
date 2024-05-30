const Base_URL = "https://pokeapi.co/api/v2/";
const Max_Pokemon = 151;

let AllPokemons = [];

async function loadPokeData() {
    try {
        let response = await fetch(`${Base_URL}pokemon/?limit=${Max_Pokemon}`);
        let data = await response.json();
        AllPokemons = data.results;
        console.log("LOOOSSS GEEEEEHTTSS");
        getEachPokeName();  
    } catch (error) {
        console.error("EEHHH WAS DA LOOOSSS", error);
    }
}

async function getEachPokeName() {
    let PokemonNames = [];
    for (let i = 0; i < AllPokemons.length; i++) {
        const pokemonName = AllPokemons[i].name.toUpperCase();
        PokemonNames.push(pokemonName);
        console.log(pokemonName);
    }
    load(PokemonNames);
}

function load(pokemonNames) {
    let card = document.getElementById('main-card');
    card.innerHTML = '';
    
    for (let i = 0; i < pokemonNames.length; i++) {
        card.innerHTML += `<div class="pokemonCard">${pokemonNames[i]}</div>`;
    }
}

function init() {
    loadPokeData();  
}
function searchPokemon(){ 
    // let pokesearch = document.getElementById('search-bar');
    //  Pokesearch = pokesearch.value.toUpperCase();
    // console.log(Pokesearch);
      
   
   };


window.onload = init;