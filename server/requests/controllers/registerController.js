import fs from 'fs'

export function register(request, response){

    const { name, email, password } = request.body
    const jsonPath = './server/data/user_credentials.json'
    userCredentialAdd(name, email, password, jsonPath)
}

function userCredentialAdd(name, email, password, jsonPath) {
    const user = {
      username: name,
      email: email,
      password: password
    };
  
    fs.readFile(jsonPath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
  
      const users = JSON.parse(data);
      users.push(user);
  
      fs.writeFile(jsonPath, JSON.stringify(users), (err) => {
        if (err) {
          console.error(err);
          return;
        }
  
        console.log('User added successfully!');
      });
    });
  }