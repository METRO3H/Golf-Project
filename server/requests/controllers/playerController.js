import sqlite3 from "sqlite3";
import { database_path } from "../../constants/paths.js";

export function getAll(request, response){
    var errors = 0;
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

    const user_id = request.body.user_id
    console.log(user_id)
    var errors = 0;
    const get_user_query = `--sql
    SELECT email, username, description, handicap from users WHERE id = ${user_id};
    `

    const db = new sqlite3.Database(database_path, (error) => {
        
        if(error){
          console.log('Error: al acceder a la base de datos.')
          errors++
        }
    });
    
    db.all(get_user_query, (error, rows) => {

        if(error){
          console.log("Error: failed to get users from the database.")
          errors++
          response.send("Error: failed to get users from the database.")
        } else {

          const user_data = JSON.stringify(rows);
          console.log(user_data);
          response.send(user_data);
        }
      });



}