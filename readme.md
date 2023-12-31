![Pokémon Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1920px-International_Pok%C3%A9mon_logo.svg.png)


# Aplicación Web de Pokemon API

este README proporciona una descripcion general del codigo HTML y JavaScript de una aplicación web de Pokemon API. Esta aplicacion web permite a los usuarios interactuar con la API de Pokemon para ver y filtrar Pokemon.

## Tabla de Contenidos

- [descripcion del proyecto](#descripcion-del-proyecto)
- [como empezar](#como-empezar)
- [funcionalidades](#funcionalidades)
- [como usar](#como-usar)
- [nueva funcionalidad: actualizacion de datos](#nueva-funcionalidad-actualizacion-de-datos)

## descripcion del proyecto

la aplicación web de Pokemon API es una aplicación web simple que utiliza la API de Pokemon para obtener y mostrar datos de Pokemon. Permite a los usuarios:

- ver una lista de tarjetas de Pokemon.
- filtrar Pokemon por tipo.
- filtrar Pokemon por cantidad.
- buscar Pokemon por nombre.

el proyecto consta de archivos HTML, CSS y JavaScript que constan de :

- `index.html`: el archivo HTML principal que define la estructura de la pagina web.
- `style.css`: el archivo CSS que aplica estilos a los elementos de la pagina web.
- `index.js`: el archivo JavaScript que gestiona las solicitudes a la API y las interacciones del usuario.

## como empezar

1. para ejecutar la aplicación web de Pokemon API, sigue estos pasos:

1. clona el repositorio en tu máquina local:

` git clone https://github.com/leidert11/api_pokemon.git`

abre el archivo `index.html` en un navegador web para comenzar a usar la aplicación.

## funcionalidades

### 1. visualización de Tarjetas de Pokemon

- cuando la pagina se carga, muestra un conjunto predeterminado de tarjetas de Pokemon (20 de forma predeterminada).
- cada tarjeta muestra la imagen y el nombre del Pokemon.

### 2. filtrado de Pokemon por Tipo

- puedes filtrar Pokemon por sus tipos haciendo clic en los botones de tipo.
- los botones de tipo se generan dinámicamente en función de los tipos de Pokemon disponibles en la API.
- al hacer clic en un boton de tipo, se mostrarán solo los Pokemon de ese tipo y se ocultarán los demas.

### 3. filtrado de Pokemon por Cantidad

- puedes cambiar la cantidad de tarjetas de Pokemon que se muestran utilizando el campo de entrada y el boton "mostrar".
- la aplicación obtendra y mostrara la cantidad especificada de tarjetas de Pokemon.

### 4. busqueda de Pokemon por Nombre

- puedes buscar Pokemon por nombre utilizando el campo de entrada "buscar Pokemon" y el boton "buscar".
- la aplicación mostrara Pokemon cuyos nombres coincidan con la consulta de busqueda.

## como usar

1. abre la aplicación web en tu navegador web mediante el archivo `index.html`.

2. de forma predeterminada, se muestran 20 tarjetas de Pokemon. Puedes:

   - hacer clic en los botones de tipo para filtrar Pokemon por tipo.
   - utilizar el boton "mostrar" para cambiar la cantidad de tarjetas de Pokemon que se muestran.
   - utiliza el campo de entrada "buscar Pokemon" para buscar Pokemon por nombre.

3. haz clic en una tarjeta de Pokemon para ver información detallada sobre ese Pokemon, incluyendo su tipo, experiencia, habilidades, estadísticas y una imagen.

## nueva funcionalidad: actualizacion de datos

Ahora puedes actualizar fácilmente la información de tus Pokémon! Cuando selecciones un Pokémon , si el valor del boton es "actualizar" significa que puedes
actualizar las estadisticas del pokemon que elejiste,si el boton esta "OK" significa que los datos del pokemon ya fueron actualizados y ya no se podran  modificar y estaran guardados en la api simulada de mockapi.

# hecho por leider tami
