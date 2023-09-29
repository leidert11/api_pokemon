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
//solicitud de la api para mostrar pokemones
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
            .then(pokemonData => {
                const card = crearCardImg(pokemonData);//llama la funcion la cual trae las imagenes de cada pokemon
                card.dataset.nombre = pokemonData.name; // asigna el nombre del Pokemon como atributo de datos
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

    const urlMockapi = 'https://6509e17df6553137159c2ff5.mockapi.io/pokemon';
    
    let actualizado = false;//esta variable servira para determinar si el pokemon fue actualizado y asi cambiar el valor del boton
    fetch(urlMockapi)
        .then(res => res.json())//una vez que los datos son recibidos se convierten a formato JSON.
        .then(mockAPIData => {//procesan datos
            const pokemonData = mockAPIData.find(item => item.name === pokemon.name);//se busca un objeto que tenga el mismo nombre que el Pokemon proporcionado como argumento a la función.

            actualizado = pokemonData ? true : actualizado;//si se encuaentra un objeto con el mismo noombre se pasa a true

            const confirmButtonText  = actualizado ? 'OK' : 'Actualizar';//si el pokemon esta actualizado su valor sera ok
            Swal.fire({
                title: `${pokemon.name}`,
                html: `
                <div class="pokemon-info">
                <div>
                    <label>Tipo: <span>${pokemon.types.map(type => type.type.name).join(', ')}</span></label>
                </div>
                <div>
                    <label>Experiencia: <span>${pokemonData ? pokemonData.experience : pokemon.experience}</span></label>
                    <input type="range" id="experience" value="${pokemonData ? pokemonData.experience : pokemon.experience}" min="0" max="300" />
                </div>
                <div>
                    <label>Vida: <span>${pokemonData ? pokemonData.vida : pokemon.stats[0].base_stat}</span></label>
                    <input type="range" id="vida" value="${pokemonData ? pokemonData.vida : pokemon.stats[0].base_stat}" min="0" max="150" />
                </div>
                <div>
                    <label>Poder: <span>${pokemonData ? pokemonData.power : pokemon.stats[1].base_stat}</span></label>
                    <input type="range" id="power" value="${pokemonData ? pokemonData.power : pokemon.stats[1].base_stat}" min="0" max="150" />
                </div>
                <div>
                    <label>Defensa: <span>${pokemonData ? pokemonData.defensa : pokemon.stats[2].base_stat}</span></label>
                    <input type="range" id="defensa" value="${pokemonData ? pokemonData.defensa : pokemon.stats[2].base_stat}" min="0" max="150" />
                </div>
                <div>
                    <label>Ataque: <span>${pokemonData ? pokemonData.ataque : pokemon.stats[3].base_stat}</span></label>
                    <input type="range" id="ataque" value="${pokemonData ? pokemonData.ataque : pokemon.stats[3].base_stat}" min="0" max="150" />
                </div>
                <div>
                    <label>Ataque Especial: <span>${pokemonData ? pokemonData.ataqueEspacial : pokemon.stats[4].base_stat}</span></label>
                    <input type="range" id="specialAttack" value="${pokemonData ? pokemonData.ataqueEspacial : pokemon.stats[4].base_stat}" min="0" max="150" />
                </div>
                <div>
                    <label>Velocidad: <span>${pokemonData ? pokemonData.velocidad : pokemon.stats[5].base_stat}</span></label>
                    <input type="range" id="velocidad" value="${pokemonData ? pokemonData.velocidad : pokemon.stats[5].base_stat}" min="0" max="150" />
                </div>
                <div>
                    <label>Habilidades: <span>${pokemon.abilities.map(a => a.ability.name).join(', ')}</span></label>
                </div>
            </div>
            
                `,
                imageUrl: pokemon.sprites.front_default,
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: 'Custom image',
                showCancelButton: true, 
                confirmButtonText : confirmButtonText ,
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                  
                    // obtener valores de los inputs
                    const experience = document.getElementById('experience').value;
                    const vida = document.getElementById('vida').value;
                    const power = document.getElementById('power').value;
                    const defensa = document.getElementById('defensa').value;
                    const ataque = document.getElementById('ataque').value;
                    const ataqueEspacial = document.getElementById('specialAttack').value;
                    const velocidad = document.getElementById('velocidad').value;

                    // datos a enviar
                    const dataEnviar = {
                        name: pokemon.name,
                        experience: experience,
                        vida: vida,
                        power: power,
                        defensa: defensa,
                        ataque: ataque,
                        ataqueEspacial: ataqueEspacial,
                        velocidad: velocidad,
                    };

                    if (pokemonData) {
                       //si el Pokemon ya existe en la base de datos se actualiza su informacion con los nuevos datos
                        dataEnviar.id = pokemonData.id; 
                    } else {
                        //si no existen datos en mockApi se enviaran los datos
                        enviarDatos(dataEnviar);
                    }
                }
            });
        });
}

async function enviarDatos(data) {
    const url = 'https://6509e17df6553137159c2ff5.mockapi.io/pokemon';
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({//se convierte en json los datos y se establece como el cuerpo de la solicitud
                name: data.name,
                experience: data.experience, 
                vida: data.vida,
                power: data.power, 
                defensa: data.defensa, 
                ataque: data.ataque, 
                ataqueEspacial: data.ataqueEspacial,
                velocidad: data.velocidad, 
            }),
        });
        if (res.ok) {
            console.log('datos enviados exitosamente');
        } else {
            console.error('error al enviar datos a mockApi.');
        }
    } catch (error) {
        console.error('error en la solicitud a mockApi:', error);
    }
}
