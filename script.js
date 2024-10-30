//Creo un evento click al boton de busqueda con el id searchButton
document.getElementById('searchButton').addEventListener('click', function() {

    //.toLowerCase() para convertir en minúscula el nombre del personaje ingresado
    const characterName = document.getElementById('characterName').value.toLowerCase();

    //uso fetch para hacer la solicitud a la API de Star Wars, 
    //buscando que el nombre ingresado coincida con un personaje
    fetch(`https://swapi.dev/api/people/?search=${characterName}`)
        .then(response => response.json())    //Para converir la respuesta en un objeto JSON
        .then(data => {
            const characterInfo = document.getElementById('characterInfo');
            characterInfo.innerHTML = '';    //Para limpiar

            //Para verificar que tengo resultados y mostrar la información 
            if (data.results.length > 0) {
                const character = data.results[0];
                characterInfo.innerHTML = `
                    <h2>${character.name}</h2>
                    <p><strong>Altura:</strong> ${character.height} cm</p>
                    <p><strong>Peso:</strong> ${character.mass} kg</p>
                    <p><strong>Color de pelo:</strong> ${character.hair_color}</p>
                    <p><strong>Color de ojos:</strong> ${character.eye_color}</p>
                    <p><strong>Año de nacimiento:</strong> ${character.birth_year}</p>
                    <p><strong>Género:</strong> ${character.gender}</p>
                `;
            } else {
                characterInfo.innerHTML = '<p>Personaje no encontrado. Intenta con otro nombre.</p>';
            }
        })

        //para manejar errores
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('characterInfo').innerHTML = '<p>Hubo un error al obtener la información. Intenta nuevamente más tarde.</p>';
        });
});
