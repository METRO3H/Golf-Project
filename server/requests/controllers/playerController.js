import sqlite3 from "sqlite3";
import { database_path } from "../../constants/paths.js";

export function getAll(request, response) {
  const db = new sqlite3.Database(database_path, (error) => {
    if (error) {
      console.error("Error al abrir la base de datos. -> ", error.message);
     return response.status(500).send({message: "Error en el servidor"});
    }

    db.serialize(() => {
      const get_all_users_query = `--sql
        SELECT username, description, handicap FROM users;
        `;
  
      db.all(get_all_users_query, (error, user_rows) => {
        if(error){
          console.error("Error: failed to get users from the database. -> ", error.message)
          return response.status(500).send({message: "Error en el servidor"});
        } 
        const number_of_rows = user_rows.length
        if(number_of_rows === 0){
          console.log("Users not found")
         return response.status(401).send({message: "No hay usuarios disponibles"});
        }
        
        response.status(200).send(
          {
          message: `Se encontraron ${number_of_rows} usuarios`,
          data: user_rows
          }
      );
      });
  
      db.close()
    });

  });

}

export function getOne(request, response) {
  const player_name = request.params.player_name.replace(/_/g, " ");

  const db = new sqlite3.Database(database_path, (error) => {
    if (error) {
      console.error("Error al abrir la base de datos. -> ", error.message);
     return response.status(500).send({ message: "Error en el servidor" });
    }

    db.serialize(() => {
      const get_user_query = `--sql
      SELECT Users.email, Users.username, Users.description, User_stats.handicap 
      FROM Users 
      INNER JOIN User_stats ON Users.id = User_stats.user_id 
      WHERE Users.username = ?
        `;
  
      db.get(get_user_query, [player_name], (error, user_row) => {
        if (error) {
          console.error("Error: failed to get users from the database. -> ", error.message);
        return response.status(500).send({ message: "Error en el servidor" });
        }
        if (user_row == null) {
          console.log("User not found");
        return response.status(401).send({ message: "Usuario no válido" });
        }
  
        response.status(200).send({
          message: "Usuario correcto",
          data: user_row,
        });
  
      });
  
      db.close()
    });

  });




}
