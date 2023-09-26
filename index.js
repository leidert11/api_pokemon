document.addEventListener("DOMContentLoaded", () => {
    getPokemon(20); // Inicializa la aplicación con 20 Pokémon
    
    const filtrarCantidadButton = document.querySelector("#filtrarCantidad");
    filtrarCantidadButton.addEventListener("click", () => {
        const cantidadPokemonInput = document.querySelector("#cantidadPokemon");
        const cantidadPokemon = parseInt(cantidadPokemonInput.value);
        getPokemon(cantidadPokemon); // Actualiza la aplicación con la nueva cantidad de Pokémon
    });

    const buscarBoton = document.querySelector("#buscarBoton");
    buscarBoton.addEventListener("click", buscarPokemon); // Agrega un listener al botón "Buscar Pokémon"
});
//traer los pokemons de la api
function getPokemon(limit) {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
        .then(res => res.json())
        .then(data => {
            crearBotonesElemento(data.results);
            crearPokemonCards(data.results);
        });
}
//botones de los elemento 
function crearBotonesElemento(pokemons) {
    const tiposElemento = [];
    pokemons.forEach(pokemon => {
        fetch(pokemon.url)
            .then(res => res.json())
            .then(PokemonData => {
                PokemonData.types.forEach(type => {
                    const tipoNombre = type.type.name;
                    tiposElemento.includes(tipoNombre) || tiposElemento.push(tipoNombre);
                });
            })
            .then(() => {
                const botonElemento = document.querySelector("#botonElemento");
                botonElemento.innerHTML = ""; 
                tiposElemento.forEach(tipo => {
                    const tipoButton = document.createElement("button");
                    tipoButton.classList.add("tipo-button");
                    tipoButton.innerText = tipo;
                    tipoButton.addEventListener("click", () => filtrarPorTipo(tipo));
                    botonElemento.appendChild(tipoButton);
                });
            });
    });
}

//mostrar cantidad de pokemones
function filtrarPorCantidad(cantidad) {
    const pokemonCards = document.querySelectorAll(".pokemon-card");
    pokemonCards.forEach((card, index) => {
        card.style.display = index < cantidad ? "block" : "none";
    });
}

//tarjetas de pokemon
function filtrarPorTipo(tipo) {
    const pokemonCards = document.querySelectorAll(".pokemon-card");
    pokemonCards.forEach(card => {
        const tiposElemento = card.dataset.types.split(",");
        card.style.display = tiposElemento.includes(tipo) ? "block" : "none";
    });
}


function buscarPokemon() {
    const buscarPokemonInput = document.querySelector("#buscarPokemon");
    const nombrePokemon = buscarPokemonInput.value.toLowerCase();

    const pokemonCards = document.querySelectorAll(".pokemon-card");
    pokemonCards.forEach(card => {
        const nombre = card.dataset.nombre.toLowerCase();
        card.style.display = (nombre.includes(nombrePokemon) || nombrePokemon === "") ? "block" : "none";
    });
}

function crearPokemonCards(pokemons) {
    const pokemonCards = document.querySelector("#pokemonCards");
    pokemonCards.innerHTML = "";
    pokemons.forEach(pokemon => {
        fetch(pokemon.url)
            .then(res => res.json())
            .then(PokemonData => {
                const card = crearCard(PokemonData);
                card.dataset.nombre = PokemonData.name; // asigna el nombre del Pokemon como atributo de datos
                pokemonCards.appendChild(card);
            });
    });
}

function crearCard(pokemonData) {
    const card = document.createElement("div");//crea un elemento de tipo div
    card.classList.add("pokemon-card");//le da una clase al elemento div ceado
    card.dataset.types = pokemonData.types.map(type => type.type.name).join(",");
    
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