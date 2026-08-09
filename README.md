# Pokédex

An interactive Pokédex web application that lets you explore Pokémon from all generations. Built with vanilla HTML, CSS, and JavaScript, it fetches live data from the [PokéAPI](https://pokeapi.co/) and renders it in a clean, responsive card grid.

## Features

- **Comprehensive Pokémon data** - Names, official sprites, and types for Pokémon from all generations.
- **Search** - Filter the full Pokémon list in real time as you type.
- **Pagination** - Browse the list 20 Pokémon at a time with previous/next buttons.

## Tech Stack

- **HTML5** - Page structure
- **CSS3** - Styling and responsive layout
- **JavaScript (ES6)** - Async fetching and DOM updates
- **PokéAPI** - Data source

## Getting Started

This project has no build step or dependencies.

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd Pokedex
   ```

2. Open `index.html` in any modern web browser.

That's it - the app fetches data directly from the PokéAPI.

## Usage

- Use the **Prev** / **Next** buttons at the bottom to move between pages of Pokémon.
- Type a name in the search bar to filter the list; clear the search to return to the current page.
- Each card shows the Pokémon's name, sprite, and type(s).

## Project Structure

```
Pokedex/
├── index.html   # Main page: search bar, Pokémon grid, pagination
├── script.js    # API fetching, search filtering, pagination logic
└── style.css    # Styling and responsive design
```

## License

This project is open source and available under the [MIT License](LICENSE).
