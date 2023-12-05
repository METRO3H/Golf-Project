
import sqlite3 from "sqlite3";
import { database_path } from "../../constants/paths.js";
import express from "express"
import { Verify_Token } from "./tokenController.js";
const router = express.Router()

router.get("/", Verify_Token, function(request, response){
    
    const user_name = request.data.username;
  
    const db = new sqlite3.Database(database_path, (error) => {
      if (error) {
        console.error("Error al abrir la base de datos. -> ", error.message);
       return response.status(500).send({ message: "Error en el servidor" });
      }
  
      db.serialize(() => {
        const get_user_query = `--sql
          SELECT Users.email, Users.username, Users.description, User_stats.handicap 
          FROM Users 
          INNER JOIN User_stats ON Users.id = User_stats.id 
          WHERE Users.username = ?
        `;
    
        db.get(get_user_query, [user_name], (error, user_row) => {
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

})

export default router
