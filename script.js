// ONLY TO FETCH THE API
// fetch("https://pokeapi.co/api/v2/pokemon/ditto")
//     .then(response => response.json())
//     .then(data => console.log(data)) // Log the API response to the console
//     .catch(error => console.error("Error fetching data:", error));

document.addEventListener("DOMContentLoaded", () => {
    const inputSearch = document.getElementById("search");
    const pokedex = document.getElementById("pokedex");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const pageInfo = document.getElementById("page-info");

    let currentOffset = 0;
    const limit = 20;
    let allPokemonNames = []; // Stores all Pokémon names
    let currentPokemonList = []; // Stores Pokémon displayed on the page

    const fetchAllPokemonNames = async () => {
        try {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0");
            const data = await response.json();
            allPokemonNames = data.results; // Store all Pokémon names
        } catch (error) {
            console.error("Error fetching Pokémon names:", error);
        }
    };

    const fetchPokemon = async (offset = 0) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
            const data = await response.json();

            const promises = data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()));

            const pokemonList = await Promise.all(promises); // Fetch detailed Pokémon data
            displayPokemon(pokemonList);
            updatePagination(offset, limit, data.count);
        } catch (error) {
            console.error("Error fetching Pokémon:", error);
        }
    };

    const displayPokemon = (pokemonList) => {
        pokedex.innerHTML = ""; // Clears any existing Pokémon displayed before adding new ones
        pokemonList.forEach(pokemon => {
            // For each Pokémon, a new div is created
            const pokemonElement = document.createElement("div");
            pokemonElement.classList.add("pokemon");

            // Pokémon's name capitalized, an image of the Pokémon & joined types
            pokemonElement.innerHTML = `
                <h2>${pokemon.name.toUpperCase()}</h2> 
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p>Type: ${pokemon.types.map(type => type.type.name).join(", ")}</p>
            `;

            // Newly created div element for the Pokémon is appended to the pokedex container
            pokedex.appendChild(pokemonElement);
        });
    };

    const updatePagination = (offset, limit, total) => {
        pageInfo.textContent = `Page ${offset / limit + 1} of ${Math.ceil(total / limit)}`;
        prevBtn.disabled = offset === 0;
        nextBtn.disabled = offset + limit >= total;
    };

    inputSearch.addEventListener("input", async (event) => {
        const searchTerm = event.target.value.toLowerCase();
        if (searchTerm === "") {
            fetchPokemon(currentOffset); // Reset to current page
            return;
        }
        const matchingPokemon = allPokemonNames.filter(pokemon => pokemon.name.includes(searchTerm));
        
        if (matchingPokemon.length === 0) {
            pokedex.innerHTML = "<p>No Pokémon found</p>";
            return;
        }

        // Fetch details only for first 20 matches to avoid API overload
        const promises = matchingPokemon.slice(0, 20).map(pokemon => fetch(pokemon.url).then(res => res.json()));
        const searchResults = await Promise.all(promises);

        displayPokemon(searchResults);
    });

    prevBtn.addEventListener("click", () => {
        if (currentOffset > 0) {
            currentOffset -= limit;
            fetchPokemon(currentOffset);
        }
    });

    nextBtn.addEventListener("click", () => {
        currentOffset += limit;
        fetchPokemon(currentOffset);
    });

    // Fetch all Pokémon names for searching
    fetchAllPokemonNames();

    // Fetch first page on load
    fetchPokemon(currentOffset);
});
