

const pokedex = document.getElementById('main-card');
let allPokemon = [];

 async function fetchPokemon(){
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let fetchPokemon = fetch(url);
        let Pokepromise = fetchPokemon.then((response) => response.json());
        promises.push(Pokepromise)
    }
    const results = await Promise.all(promises);
    const pokemon = results.map((result) => {
        return {
            name: result.name.toUpperCase(),  
            image: result.sprites.other['official-artwork'].front_default,  
            type: result.types.map((type) => type.type.name).join(', '),  
            firstType: result.types[0].type.name.toLowerCase(),  
            id: result.id, 
            weight: result.weight,
            stats: result.stats.map(stat => ({ name: stat.stat.name, value: stat.base_stat })),
            moves: result.moves.map(move => move.move.name)
        };
    });
    allPokemon = pokemon;
    displayPokemon(allPokemon); 
};

function displayPokemon(pokemons) {
    const PokeString = pokemons
        .map((pokeman) => {
            const typeClass = pokeman.firstType;
            return `
                <div class="pokemonCard" onclick="showPokeInfo(${pokeman.id})">
                    <div class="PokeNames">${pokeman.name} #${pokeman.id}</div>
                    <div class="PokeImgDiv"><img class="PokeImg" src="${pokeman.image}" alt="${pokeman.name}"></div>
                    <div class="PokeType ">${pokeman.type}</div>
                </div>
            `;
        })
        .join('');
    pokedex.innerHTML = PokeString;
};

function searchPokemon(){ 
    let pokesearch = document.getElementById('search-bar').value.toUpperCase();
    const filteredPokemon = allPokemon.filter((pokeman) => pokeman.name.includes(pokesearch));
    displayPokemon(filteredPokemon);
};

function cleansearch() {
    document.getElementById('search-bar').value= ""; 
}

fetchPokemon();

async function showPokeInfo(id) {
    closePokeInfo();
 const pokeman = allPokemon.find(p => p.id === id);
    if (!pokeman) return;
    const maincard = document.getElementById('main-card');
    const typeClass =  pokeman.firstType;
    maincard.innerHTML += `
        <div class="PokeCardInfo ${typeClass} ">
           <div class="closePokecard"> <h2 class="PokeInfoCardName">${pokeman.name} </h2>  </div>
           <div class="center"> <img src="${pokeman.image}" alt="${pokeman.name}"> </div>
            <p class="PokeStats">Type: ${pokeman.type}</p>
            <p class="PokeStats">Weight: ${pokeman.weight} Kg.</p>
            <h3>Stats</h3>
            <ul class="PokeStats">
                ${pokeman.stats.map(stat => `<li>${stat.name}: ${stat.value}</li>`).join('')}
            </ul>
            <h3>Moves</h3>
            <ul class="PokeStats">
                ${pokeman.moves.slice(0, 10).map(move => `<li>${move}</li>`).join('')}
            </ul>
            <button onclick="closePokeInfo()">Close</button>
        </div>
    `; 
}

function closePokeInfo() {
    const infoDiv = document.querySelector('.PokeCardInfo');
    if(infoDiv) infoDiv.remove();
}

