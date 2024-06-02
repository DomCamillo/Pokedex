const pokedex = docuemnt.getelementById('main-card');
let allPokemon = [];

async function fetchPokemon(){
    const promises = [];
    for ( let i = 0; i <= 151; i ++){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
       let fetchPokemon = fetch(url);
       let Pokepromise = fetchPokemon.then((response) => response.json());
       promises.push(Pokepromise)
    }
    const results = await Promise.all(promises);
    const pokemon = results.map((result) =>{
        return {
            name: result.name.toUpperCase(),
            image: result.sprites.other['official-artwork'].front_defualt,
            type: result.types.map((type ) =>type.type.name).join(', '),
            id: result.id
        };
    });
   allPokemon = pokemon;
   displayPokemon(allPokemon);
};

function displayPokemon(pokemons){
    const PokeString = pokemons
    .map(
        (pokeman) => `
        <div class="pokemonCard"> 
        <div class="PokeNames">${pokeman.name} #${pokeman.id}</div>
        <div class="PokeImgDiv"><img class="PokeImg" src="${pokeman.image}" alt="${pokeman.name}"></div>
        <div class="PokeType">${pokeman.type}</div>
    </div>
        `
    )
    .join('');
}