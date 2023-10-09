import sqlite3 from "sqlite3";
import { database_path } from "../../constants/paths.js";

export function login(request, response){

    const user_data = request.body
    
    if (verify_data(user_data) === false) {
        response.send(JSON.stringify('¡Usuario Invalido!'))
      }

    response.send(JSON.stringify('¡Usuario valido!'))
}

function verify_data(user_data){
    var errors = 0
    const Select_User_Query = Get_Select_User_Query(user_data);

    const db = new sqlite3.Database(database_path, (error) => {
  
      if(error){
        console.log('Error: al acceder a la base de datos.')
        errors++
      }
    });
  
      if(errors !== 0){
        db.close((error) => handle_sql_error(error, db_error.close_database));
        return "Error: failed to get user from the database."
      } 
  
      const user = db.run(Select_User_Query, (error) => {
        if(error){
          console.log("Error: failed to get user from the database.")
          errors++
          return "Error: failed to get user from the database."
        }
  
        console.log("User added successfully!")
    

    });

  
    if(errors !== 0){
      db.close((error) => handle_sql_error(error, db_error.close_database));
      return "¡Error al crear el usuario en el servidor!"
    } 
  

    console.log(user)
    db.close((error) => handle_sql_error(error, db_error.close_database));
    return "¡Usuario creado exitosamente!"

}

function Get_Select_User_Query(user_data) {

    const query = `--sql
    SELECT * users WHERE email = ${user_data.email} AND password = ${user_data.password};
    `
    return query;
  }