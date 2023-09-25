import fs from 'fs'

export function login(request, response){

    const { username, password } = request.body
    const jsonPath = './server/data/user_credentials.json'

    fs.readFile(jsonPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON at path: ', jsonPath ,err);
            response.status(500).send('Error interno del servidor');
            return;
        }
        
        // Parsea el contenido del archivo a un objeto JSON
        const jsonData = JSON.parse(data);
        userCredentialCheck(username, password, jsonData)
        response.json(jsonData);
      })
    
}

function userCredentialCheck(username, password, jsonData){
    const user = jsonData.find(user => user.username === username)
    if(user){
        if(user.password === password){
            console.log("Login successful")
        } else {
            console.log("Wrong password")
        }
    } else {
        console.log("User not found")
    }
}