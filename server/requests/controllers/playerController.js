import sqlite3 from "sqlite3";
import { database_path } from "../../constants/paths.js";

export function getAll(request, response){
    const get_all_users_query = `--sql
      SELECT username, description, handicap  FROM users;
    `;
  
    const db = new sqlite3.Database(database_path, (error) => {
      if(error){
        console.log('Error: al acceder a la base de datos.')
        errors++
      }
    });
  
    db.all(get_all_users_query, (error, rows) => {
      if(error){
        console.log("Error: failed to get users from the database.")
        errors++
        response.send("Error: failed to get users from the database.")
      } else {
        const users = JSON.stringify(rows);
        console.log(users);
        response.send(users);
      }
    });
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