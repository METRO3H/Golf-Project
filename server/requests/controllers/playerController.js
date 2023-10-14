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

    const player_name = request.params.player_name.replace(/_/g, ' ');
    console.log(player_name)
    var errors = 0;

    const get_user_query = `--sql
    SELECT email, username, description, handicap from users WHERE username = '${player_name}';
    `

    const db = new sqlite3.Database(database_path, (error) => {
        
        if(error){
          console.log('Error: al acceder a la base de datos.')
          errors++
        }
    });
    
    db.get(get_user_query, (error, rows) => {

        if(error){
          console.log("Error: failed to get users from the database.")
          errors++
          response.send("Error: failed to get users from the database.")
        } else {

          const player_data = JSON.stringify(rows);
          console.log(player_data);
          response.send(player_data);
        }
      });



}