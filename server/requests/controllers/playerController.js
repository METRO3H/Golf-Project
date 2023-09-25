import fs from 'fs'

export function getAll(request, response){
    
    const jsonPath = './server/data/list_of_players.json'
    fs.readFile(jsonPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON at path: ', jsonPath ,err);
            response.status(500).send('Error interno del servidor');
            return;
        }
        
        // Parsea el contenido del archivo a un objeto JSON
        const jsonData = JSON.parse(data);
        response.json(jsonData);
      })
}

export function getOne(request, response){
    console.log("Codigo para obtener solo un usuario")
}