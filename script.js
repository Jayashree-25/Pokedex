// ONLY TO FETCH THE API
// fetch("https://pokeapi.co/api/v2/pokemon/ditto")
//     .then(response => response.json())
//     .then(data => console.log(data)) // Log the API response to the console
//     .catch(error => console.error("Error fetching data:", error));


const inputSearch = document.getElementById("search");
const pokedox = document.getElementById("pokedox");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const pageInfo = document.getElementById("page-info");

const pokemonPerPage = 20;
const allPokemon = [];   //stores all Pokémon data after fetching it
let currentPage = 1;

const fetchPokemon = async () => {
    const pokemonCount = 151;  //first 151 pokemon 
    // we can fetch all the pokemon but pokeAPI have rate limit to prevent excessive load on the server. Fetching data for all Pokémon (which is well over 1000) could hit the rate limit, especially if you're making many requests in a short time.
    const promises = [];  //array to hold all the fetch requests for Pokémon

    for (let i = 1; i <= pokemonCount; i++) {
        promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then(res => res.json()))
    }

    allPokemon = await Promise.all(promises);    //waits for all the fetch requests to complete and then stores the result in allPokemon
    updatePagination(); 
}

// const displayPokemon = (pokemonList) => {
//     pokedox.innerHTML = ""; //clears any existing Pokémon displayed before adding new ones
//     pokemonList.forEach(pokemon => {
//         const pokemonElement = document.createElement("div");
//         pokemonElement.classList.add("pokemon");
//     })
// }