import fs from 'fs'

export function register(request, response){

    const { name, email, password } = request.body
    const jsonPath = './server/data/user_credentials.json'

    fs.readFile(jsonPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON at path: ', jsonPath ,err);
            response.status(500).send('Error interno del servidor');
            return;
        }
        
        // Parsea el contenido del archivo a un objeto JSON
        const jsonData = JSON.parse(data);
        userCredentialAdd(name, email, password, jsonData)
        response.json(jsonData);
      })
}

userCredentialAdd = (name, email, password, jsonData) => {
    const user = {
        name: name,
        email: email,
        password: password
    }
    jsonData.push(user)
    const jsonContent = JSON.stringify(jsonData);
    fs.writeFile(jsonPath, jsonContent, 'utf8', (err) => {
        if (err) {
            console.error('Error al escribir el archivo JSON at path: ', jsonPath ,err);
            return;
        }
        console.log('Archivo JSON guardado exitosamente en: ', jsonPath);
    });
}
