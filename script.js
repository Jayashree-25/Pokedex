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

    const pokemonPerPage = 20;
    let allPokemon = [];   //stores all Pokémon data after fetching it
    let currentPage = 1;

    const fetchPokemon = async () => {
        //first 151 pokemon  Fetching data for all Pokémon (which is well over 1000) could hit the rate limit, especially if you're making many requests in a short time.
        const pokemonCount = 151;

        //This creates an array of length pokemonCount filled with undefined values, e.g if pokemonCount = 5, it creates [undefined, undefined, undefined, undefined, undefined]
        const promises = Array.from({ length: pokemonCount }, (_, i) =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`).then(res => res.json())
            //but after fetching it will become [fetch(...), fetch(...), fetch(...), ...]
        );

        allPokemon = await Promise.all(promises);    //waits for all the fetch requests to complete and then stores the result in allPokemon
        updatePagination();
    }

    const displayPokemon = (pokemonList) => {
        pokedex.innerHTML = ""; //clears any existing Pokémon displayed before adding new ones
        pokemonList.forEach(pokemon => {
            //for each pokemon new div is crerated
            const pokemonElement = document.createElement("div");
            pokemonElement.classList.add("pokemon");

            //pokemon's name capitalized, an image of the pokemon & (joined into a string with commas if there are multiple types
            pokemonElement.innerHTML =
                `<h2>${pokemon.name.toUpperCase()}</h2> 
        <img src = "${pokemon.sprites.front_default}" alt = "${pokemon.name}>"
        <p>Type: ${pokemon.types.map(type => type.type.name).join(", ")}</p>`

            // newly created div element for the Pokémon is appended to the pokedex container
            pokedex.appendChild(pokemonElement);
        })
    }

    //this function updates the pagination whenever the page changes
    const updatePagination = () => {
        const startIndex = (currentPage - 1) * pokemonPerPage;
        const endIndex = startIndex + pokemonPerPage;
        const paginatedPokemon = allPokemon.slice(startIndex, endIndex);
        //paginatedPokemon holds the Pokémon to be displayed on the current page by slicing the allPokemon array

        displayPokemon(paginatedPokemon);  //calls the func which renders Pokémon on the screen
        pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(allPokemon.length / pokemonPerPage)}`

        prevBtn.disabled = currentPage === 1;  //disables the button if the user is on page 1
        nextBtn.disabled = currentPage === Math.ceil(allPokemon.length / pokemonPerPage);   //Ddsables the button if the user is on the last page. Math.ceil ->  rounds up the total number of pages
    }


    //Listens for changes in the search input field (#search)
    inputSearch.addEventListener("input", (event) => {
        const searchTerm = event.target.value.toLowerCase(); // Gets the current text in the input field and coverts it to lowercase
        if (searchTerm === "") {  //checks if it's empty
            updatePagination();   //it calls, which resets the list to show all Pokémon for the current pag
            return;
        }

        // filters Pokémon from the allPokemon array based on the search term entered by the user
        const filteredPokemon = allPokemon.filter(pokemon => pokemon.name.includes(searchTerm));   //allPokemon.filter(...) creates a new array that contains only the Pokémon whose name includes the search term
        displayPokemon(filteredPokemon);
    });

    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentPage < Math.ceil(allPokemon.length / pokemonPerPage)) {
            currentPage++;
            updatePagination();
        }
    });
    fetchPokemon();
})