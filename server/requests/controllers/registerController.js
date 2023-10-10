import sqlite3 from "sqlite3";
import { database_path } from "../../constants/paths.js";

export async function Register_User(request, response) {

  console.log(request.body);
  const user_data = request.body;

  if (verify_data(user_data) === false) {
    response = "Invalid input data.";
    console.log(response);
    return response;
  }

  const response_message = JSON.stringify(await Insert_User(user_data))

  response.send(response_message)

}

async function Insert_User(user_data) {

  var errors = 0
  const insert_user_query = Get_Insert_User_Query(user_data);

  const db = new sqlite3.Database(database_path, (error) => {

    if(error){
      console.log("Error: Failed to add user to the database.")
      errors++
    }

  });

    if(errors !== 0){
      db.close((error) => handle_sql_error(error, db_error.close_database));
      return "¡Error al crear el usuario en el servidor!"
    } 

    db.run(insert_user_query, (error) => {

      if(error){
        console.log("Error: Failed to add user to the database.")
        errors++
        return
      }

      console.log("User added successfully!")
  
    
  });

  if(errors !== 0){
    db.close((error) => handle_sql_error(error, db_error.close_database));
    return "¡Error al crear el usuario en el servidor!"
  } 


  return "¡Usuario creado exitosamente!"

}

function Get_Insert_User_Query(user_data) {

  const description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis perspiciatis eligendi delectus suscipit a dignissimos optio aspernatur voluptatibus! At commodi, nobis est optio beatae ipsa saepe eum ullam vero reiciendis?"
  const handicap = Math.floor(Math.random() * 40);
  //Tremenda sql injection nos pueden pegar con esto XD
  const query = `--sql
  INSERT INTO users (email, username, password, description, handicap) 
  VALUES ('${user_data.email}', '${user_data.username}','${user_data.password}', '${description}', '${handicap}')
  `;
  return query;
}

function verify_data(user_data) {
  /* Logica para verificar datos*/

  return true;
}
