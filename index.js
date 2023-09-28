document.addEventListener("DOMContentLoaded",() => {
    getPokemon(20);//por defecto se veran 20 pokemon que se pasan por el parametro "limit"
    const filtrarCantidadBoton = document.querySelector("#filtrarCantidad");
    filtrarCantidadBoton.addEventListener("click", () => {
        const cantidadPokemonInput = document.querySelector("#cantidadPokemon");
        const cantidadPokemon = parseInt(cantidadPokemonInput.value);//el valor se convertira en numero y se tomara su valor
        getPokemon(cantidadPokemon); //se actualizara la cantidad de pokemones de acuerdo al que se asa por argumentos
    });
    const buscarBoton = document.querySelector("#buscarBoton");
    buscarBoton.addEventListener("click", buscarPokemon); //al hacer click se ejecutara la funcion buscarPokemon
});
//solicitu de la api para mostrar pokemones
function getPokemon(limite) {//de esta manera podra el usuario escoger la cantidd de pokemon que desea ver
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limite}`)
        .then(res => res.json())
        .then(data => {
            //crear botones para los elementos de acuerdo a los pokemon mostrados
            crearBotonesElemento(data.results);
            //crea la tarjetas de cada pokemon
            crearPokemonCardData(data.results);
        });
}
//funcion para crear los botones para los tipo de pokemon 
function crearBotonesElemento() {
    fetch('https://pokeapi.co/api/v2/type/') //hace una solicitud a la API de Pokemon para obtener todos los tipos
        .then(res => res.json())
        .then(data => {
            const tiposElemento = data.results.map(result => result.name);//hace un mapeo para traerme todos los nombres de tpo que hay
            const botonElemento = document.querySelector("#botonElemento");
            botonElemento.innerHTML = ""; //borra cualquier contenido HTML que estuviera en el elemento "botonElemento"

            tiposElemento.forEach(tipo => {//recorre todos los tipos en 'tiposElemento'
                const tipoBoton = document.createElement("button"); //crea un nuevo boton para cada tipo

                tipoBoton.classList.add("tipo-boton");//añade una clase al boton
              
                tipoBoton.innerText = tipo;//asigna el nombre del tipo dentro de cada boton credo

                tipoBoton.addEventListener("click", () => filtrarPorTipo(tipo));
                
                botonElemento.appendChild(tipoBoton);//añade el boton al elemento "botonElemento"
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
//funcion para mostrar pokemon cuando se da click en un boton de un determinado tipo
function filtrarPorTipo(tipo) {
    const pokemonCards = document.querySelectorAll(".pokemon-card");
    pokemonCards.forEach(card => {
        const tiposElemento = card.dataset.types.split(",");//obtiene los tipo de pokemones y los dividi en un array con el split
        card.style.display = tiposElemento.includes(tipo) ? "block" : "none";//verifica si el tipo del pokemon es igual al tipo seleccionado
    });
}
function buscarPokemon() {
    const buscarPokemonInput = document.querySelector("#buscarPokemon");
    const nombrePokemon = buscarPokemonInput.value.toLowerCase();//obtiene el valor de entrada del input seleccionado y lo pasa a minusculas

    const pokemonCards = document.querySelectorAll(".pokemon-card");
    pokemonCards.forEach(card => {
        //obtiene el nombre de cada pokemon y lo pasa a minusculas
        const nombre = card.dataset.nombre.toLowerCase();
        //verifica si el nombre del pokemon es e mismo que en la tarjeta si es asi lo muestra en bloque si no lo oculta
        card.style.display = (nombre.includes(nombrePokemon) || nombrePokemon === "") ? "block" : "none";
    });
}
function crearPokemonCardData(pokemons) {
    const pokemonCards = document.querySelector("#pokemonCards");
    pokemonCards.innerHTML = "";
    pokemons.forEach(pokemon => {
        fetch(pokemon.url)//hace lamado a la url para obtener los datos
            .then(res => res.json())
            .then(PokemonData => {
                const card = crearCardImg(PokemonData);//llama la funcion la cual trae las imagenes de cada pokemon
                card.dataset.nombre = PokemonData.name; // asigna el nombre del Pokemon como atributo de datos
                pokemonCards.appendChild(card);//agrega el elemnto "card" al elemento "pokemonCards" y asi se muestre el pokemon
            });
    });
}

function crearCardImg(pokemonData) {
    const card = document.createElement("div");//crea un elemento de tipo div
    card.classList.add("pokemon-card");//le da una clase al elemento div ceado
    //asigna el atributo type al "div" , el atributo contiene los nombres de todos lo tipos de elementos
    card.dataset.types = pokemonData.types.map(type => type.type.name).join(",");
    
    const img = document.createElement("img");//crea un elemento (imagen) y se almacena 
    img.src = pokemonData.sprites.front_default;//inserta el src de la imagen de la url para mostrar la imagen predeterminada de cada pokemon
    card.appendChild(img);//agrega la imagen al elemento "div"
    card.addEventListener("click", () => infoPokemon(pokemonData));
    return card;//devuelve la tarjeta creada
}

function infoPokemon(pokemon) {
    Swal.fire({
        title: `${pokemon.name}`,
        html: `
            <div class="pokemon-info" >
                <div>
                    <label for="type">Tipo: <span id="type_value">${pokemon.types.map(type => type.type.name).join(', ')}</span></label>
                </div>
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