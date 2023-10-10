import fs from 'fs'

export function getAll(request, response){
    
    const jsonPath = './server/database/list_of_players.json'
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

    const user_id = request.body
    const user_data = get_user_data(user_id)
    console.log("Codigo para obtener solo un usuario")
    response.send(user_data)
}

function get_user_data(user_data){

    const get_user_query = `--sql
    SELECT * users WHERE id = ${user_data.id};
    `

    const db = new sqlite3.Database(database_path, (error) => {
        
        if(error){
          console.log('Error: al acceder a la base de datos.')
          errors++
        }
    });
    
    const user = db.run(get_user_query, (error) => {
        
        if(error){
          console.log("Error: failed to get user from the database.")
          errors++
          return "Error: failed to get user from the database."
        } 
    });

    const JSON_user = JSON.stringify(user)
    console.log(JSON_user)    
    return JSON_user
}