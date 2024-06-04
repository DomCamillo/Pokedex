const pokedex = document.getElementById("main-card");
let allPokemon = [];
let currentPokemonIndex = 0;
const LoadnextPokemons = 30;
let MaxPokemon = 151;

async function fetchPokemon(start, end) {
  const promises = [];
  for (let i = start; i <= end; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let fetchPokemon = fetch(url);
    let Pokepromise = fetchPokemon.then((response) => response.json());
    promises.push(Pokepromise);
  }
  const results = await Promise.all(promises);
  const pokemon = results.map((result) => {
    return {
      name: result.name.toUpperCase(),
      image: result.sprites.other["official-artwork"].front_default,
      type: result.types.map((type) => type.type.name).join(" / "),
      firstType: result.types[0].type.name.toLowerCase(),
      id: result.id,
      weight: result.weight,
      stats: result.stats.map((stat) => ({
      name: stat.stat.name,
      value: stat.base_stat,
      })),
      moves: result.moves.map((move) => move.move.name),
    };
  });
  allPokemon = allPokemon.concat(pokemon);
  displayPokemon(allPokemon);
  checkPokemon();
}

function displayPokemon(pokemons) {
    let PokeString = "";
    for (let i = 0; i < pokemons.length; i++) {
      const pokemon = pokemons[i];
      const typeClass = pokemon.firstType;
      PokeString += `
        <div class="pokemonCard" onclick="showPokeInfo(${pokemon.id})">
          <div class="PokeNames">${pokemon.name} #${pokemon.id}</div>
          <div class="PokeImgDiv ${typeClass}"><img class="PokeImg" src="${pokemon.image}" alt="${pokemon.name}"></div>
          <div class="PokeType">${pokemon.type}</div>
        </div>
      `;
    }
    pokedex.innerHTML = PokeString;
  }

function searchPokemon() {
  let pokesearch = document.getElementById("search-bar").value.toUpperCase();
  const filteredPokemon = allPokemon.filter((pokemon) => pokemon.name.includes(pokesearch));
  displayPokemon(filteredPokemon.slice(0, currentPokemonIndex + LoadnextPokemons));
}

function cleansearch() {
  document.getElementById("search-bar").value = "";
  displayPokemon(allPokemon.slice(0, currentPokemonIndex + LoadnextPokemons));
}

async function showPokeInfo(id) {
  closePokeInfo();
  const pokemon = allPokemon.find((pokemon) => pokemon.id === id);
  if (!pokemon) return;
  const maincard = document.getElementById("main-card");
  const typeClass = pokemon.firstType;
  maincard.innerHTML += `
        <div class="PokeCardInfo ${typeClass} ">
           <div class="Pokecardbutton"> <h2 class="PokeInfoCardName">${
             pokemon.name
           } </h2>  <button class="PokeCardClosebutton" onclick="closePokeInfo()">Close</button> </div>
           <div class="center"> <img src="${pokemon.image}" alt="${pokemon.name}"> </div>
             <div class="center"> <p class="PokeStats"><b>Type:</b> ${
               pokemon.type
             }</p> <p class="PokeStats"> <b> Weight: </b> ${pokemon.weight} Kg.</p> </div>
            
            <h3>Stats</h3>
            <ul class="PokeStats">
                ${pokemon.stats.map((stat) => `<li>${stat.name}: ${stat.value}</li>`).join("")}
            </ul>
            <h3>Moves</h3>
            <ul class="PokeStats">
                ${pokemon.moves.slice(0, 10).map((move) => `<li>${move}</li>`).join("")}
            </ul>
            
        </div>
    `;
}

function closePokeInfo() {
  const infoDiv = document.querySelector(".PokeCardInfo");
  if (infoDiv) infoDiv.remove();
}

async function loadMorePokemon() {
  const startIndex = allPokemon.length + 1;
  const endIndex = Math.min(startIndex + LoadnextPokemons - 1, MaxPokemon);
  await fetchPokemon(startIndex, endIndex);
  currentPokemonIndex = endIndex;
}

fetchPokemon(1, LoadnextPokemons);

function checkPokemon() {
  const loadMoreButton = document.getElementById("load-more");
  if (allPokemon.length >= MaxPokemon) {
    loadMoreButton.style.display = "none";
  }
}
