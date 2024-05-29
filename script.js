const pokedex = document.getElementById('main-card');

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name.toUpperCase(),
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
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
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();