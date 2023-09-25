window.addEventListener('DOMContentLoaded', (event) => {
    getPokemonData();
});

function getPokemonData() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
        .then(res => res.json())
        .then(data => crearPokemonCards(data.results));
}

function crearPokemonCards(pokemons) {
    const pokemonCards = document.querySelector("#pokemonCards");
    pokemons.forEach(pokemon => {
        fetch(pokemon.url)
            .then(res => res.json())
            .then(pokemonData => {
                const card = crearCard(pokemonData);
                pokemonCards.appendChild(card);
            });
    });
}

function crearCard(pokemonData) {
    const card = document.createElement("div");
    card.classList.add("pokemon-card");
    const img = document.createElement("img");
    img.src = pokemonData.sprites.front_default;
    card.appendChild(img);
    card.addEventListener("click", () => infoPokemon(pokemonData));
    return card;
}

function infoPokemon(pokemon) {
    Swal.fire({
        title: `${pokemon.name}`,
        html: `
            <div class="pokemon-info" >
                <div>
                    <label for="base_experience">Experiencia: <span id="base_experience_value">${pokemon.base_experience}</span></label>
                    <input type="range" id="base_experience" value="${pokemon.base_experience}" min="0" max="300" readonly /> 
                </div>
                <div>
                    <label for="power">Poder: <span id="power_value">${pokemon.stats[1].base_stat}</span></label>
                    <input type="range" id="power" value="${pokemon.stats[1].base_stat}" min="0" max="150" readonly /> 
                </div>
                <div>
                    <label for="hp">Vida: <span id="hp_value">${pokemon.stats[0].base_stat}</span></label>
                    <input type="range" id="hp" value="${pokemon.stats[0].base_stat}" min="0" max="150" readonly /> 
                </div>
                <div>
                    <label for="speed">Velocidad: <span id="speed_value">${pokemon.stats[5].base_stat}</span></label>
                    <input type="range" id="speed" value="${pokemon.stats[5].base_stat}" min="0" max="150" readonly /> 
                </div>
                <div>
                    <label for="defense">Defensa: <span id="defense_value">${pokemon.stats[2].base_stat}</span></label>
                    <input type="range" id="defense" value="${pokemon.stats[2].base_stat}" min="0" max="150" readonly /> 
                </div>
                <div>
                    <label for="attack">Ataque: <span id="attack_value">${pokemon.stats[3].base_stat}</span></label>
                    <input type="range" id="attack" value="${pokemon.stats[3].base_stat}" min="0" max="150" readonly /> 
                </div>
                <div>
                    <label for="abilities">Habilidades :</label>
                    <input class="abilities" type="text" id="abilities" value="${pokemon.abilities.map(a => a.ability.name).join(', ')}" readonly />
                </div>
            </div>
        `,
        imageUrl: pokemon.sprites.front_default,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom image',
    });
    
}

/*

window.addEventListener('DOMContentLoaded', (event) => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
        .then(response => response.json())
        .then(data => {
            const pokemonCards = document.querySelector("#pokemonCards");
            data.results.forEach(pokemon => {
                fetch(pokemon.url)
                    .then(res => res.json())
                    .then(pokemonData => {
                        const card = document.createElement("div/card");
                        card.classList.add("pokemon-card");
                        const img = document.createElement("img");
                        img.src = pokemonData.sprites.front_default;
                        card.appendChild(img);
                        card.addEventListener("click", () => showPokemonInfo(pokemon.url));
                        pokemonCards.appendChild(card);
                    });
            });
        });
});

function showPokemonInfo(url) {
    fetch(url)
        .then(response => response.json())
        .then(pokemon => {
            Swal.fire({
                title: `${pokemon.name}`,
                html: `
                <div>
                    <label for="base_experience">Experiencia: <span id="base_experience_value">${pokemon.base_experience}</span></label>
                    <input type="range" id="base_experience" value="${pokemon.base_experience}" min="0" max="300" readonly /> 
                </div>
                <div>
                    <label for="power">Poder: <span id="power_value">${pokemon.stats[1].base_stat}</span></label>
                    <input type="range" id="power" value="${pokemon.stats[1].base_stat}" min="0" max="150" readonly /> 
                </div>
                <div>
                    <label for="hp">Vida: <span id="hp_value">${pokemon.stats[0].base_stat}</span></label>
                    <input type="range" id="hp" value="${pokemon.stats[0].base_stat}" min="0" max="150" readonly /> 
                </div>
                <div>
                    <label for="speed">Velocidad: <span id="speed_value">${pokemon.stats[5].base_stat}</span></label>
                    <input type="range" id="speed" value="${pokemon.stats[5].base_stat}" min="0" max="150" readonly /> 
                </div>
                <div>
                    <label for="defense">Defensa: <span id="defense_value">${pokemon.stats[2].base_stat}</span></label>
                    <input type="range" id="defense" value="${pokemon.stats[2].base_stat}" min="0" max="150" readonly /> 
                </div>
                <div>
                    <label for="attack">Ataque: <span id="attack_value">${pokemon.stats[3].base_stat}</span></label>
                    <input type="range" id="attack" value="${pokemon.stats[3].base_stat}" min="0" max="150" readonly /> 
                </div>
                <div>
                    <label for="abilities">Habilidades :</label>
                    <input class="abilities" type="text" id="abilities" value="${pokemon.abilities.map(a => a.ability.name).join(', ')}" readonly />
                </div>
            </div>
                `,
                imageUrl: pokemon.sprites.front_default,
                imageWidth: 300,
                imageHeight: 300,
                imageAlt: 'Custom image',
            });
        });
}

Claro, aquí está una explicación detallada de lo que hace cada parte del código:

1. `window.addEventListener('DOMContentLoaded', (event) => { getPokemonData(); });`
   - Este código se ejecuta cuando todos los elementos del DOM de la página se han cargado completamente. En ese momento, llama a la función `getPokemonData`.

2. `getPokemonData()`
   - Esta función hace una solicitud a la API de Pokémon para obtener datos de los primeros 50 Pokémon. Cuando recibe la respuesta, convierte los datos a JSON y luego llama a la función `crearPokemonCards` con los resultados.

3. `crearPokemonCards(pokemons)`
   - Esta función toma un array de Pokémon como argumento. Para cada Pokémon en el array, hace una nueva solicitud a la API de Pokémon para obtener datos más detallados sobre ese Pokémon en particular. Cuando recibe la respuesta, convierte los datos a JSON, crea una tarjeta para ese Pokémon con la función `crearCard` y añade la tarjeta al elemento `pokemonCards` en el DOM.

4. `crearCard(pokemonData)`
   - Esta función toma los datos de un Pokémon como argumento y crea una tarjeta (un div) para ese Pokémon. La tarjeta incluye una imagen del Pokémon y un evento de clic que llama a la función `infoPokemon` con los datos del Pokémon cuando se hace clic en la tarjeta.

5. `infoPokemon(pokemon)`
   - Esta función toma los datos de un Pokémon como argumento y muestra un modal con información sobre el Pokémon usando SweetAlert2. El modal incluye el nombre del Pokémon, su experiencia base, poder, vida, velocidad, defensa, ataque y habilidades.

Espero que esto te ayude a entender mejor lo que hace cada parte del código. 😊


*/