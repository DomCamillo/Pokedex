const Base_URL = "https://pokeapi.co/api/v2/pokemon/?limit=151";

//function load() {
//let cardContainer = document.getElementById('Pokemon-Card').parentNode;
//    cardContainer.innerHTML = '';  // Erst den Container leeren
//
//    for (let i = 0; i < 10; i++) {
//        let newCard = document.createElement('div');
//        newCard.className = 'pokemonCard';
//        newCard.innerHTML = 'Hallo';
//        cardContainer.appendChild(newCard);
//    }
//}

function load(){
    let card = document.getElementById('main-Card');
    for (let i = 0; i < 10; i++) {
        card.innerHTML +=`<div class="pokemonCard"></div>`
        
    }
}