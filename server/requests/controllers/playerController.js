import sqlite3 from "sqlite3";
import { database_path } from "../../constants/paths.js";

export function getAll(request, response) {
  const db = new sqlite3.Database(database_path, (error) => {
    if (error) {
      console.error("Error al abrir la base de datos. -> ", error.message);
      return response.status(500).send({ message: "Error en el servidor" });
    }

    db.serialize(() => {
      const get_all_users_query = `--sql
        SELECT Users.username, Users.description, User_stats.handicap, User_stats.games_won
        FROM Users 
        INNER JOIN User_stats ON Users.id = User_stats.id`;

      db.all(get_all_users_query, (error, user_rows) => {
        if (error) {
          console.error(
            "Error: failed to get users from the database. -> ",
            error.message
          );
          return response.status(500).send({ message: "Error en el servidor" });
        }
        const number_of_rows = user_rows.length;
        if (number_of_rows === 0) {
          console.log("Users not found");
          return response
            .status(401)
            .send({ message: "No hay usuarios disponibles" });
        }

        response.status(200).send({
          message: `Se encontraron ${number_of_rows} usuarios`,
          data: user_rows,
        });
      });

      db.close();
    });
  });
}

export function getOne(request, response) {
  const player_name = request.params.player_name.replace(/_/g, " ");

  const user_name = request.body.user_name

  const db = new sqlite3.Database(database_path, (error) => {
    if (error) {
      console.error("Error al abrir la base de datos. -> ", error.message);
      return response.status(500).send({ message: "Error en el servidor" });
    }
    console.log(player_name, user_name)
    db.serialize(() => {
      
        const get_user_query = db.prepare(
        `SELECT Users.email, Users.username, Users.description, User_stats.handicap, Friends.status
        FROM Users 
        INNER JOIN User_stats ON Users.id = User_stats.id
        LEFT JOIN Friends ON Users.username = Friends.friend_name 
        WHERE Users.username = ? AND (Friends.user_name = ? OR Friends.user_name IS NULL)
        `
        );

        get_user_query.get(player_name, user_name, function (error, user_row){
          if (error) {
            console.error(
              "Error: failed to get users from the database. -> ",
              error.message
            );
            db.close();
            return response
              .status(500)
              .send({ message: "Error en el servidor" });
          }

          console.log(user_row)

          if (user_row == null) {
            db.close();
            console.log("User not found");
            return response.status(401).send({ message: "Usuario no válido" });
          }

  
          return response.status(200).send({
            message: "Usuario correcto",
            data: user_row,
          });
          
        });

        
      
    });
  });
}

export function changeHandicap(request, response) {
  console.log("alo");
  const db = new sqlite3.Database(database_path, (error) => {
    if (error) {
      console.error("Error al abrir la base de datos. -> ", error.message);
      return response.status(500).send({ message: "Error en el servidor" });
    }

    const { id, handicap } = request.body;

    db.run(
      `UPDATE User_stats SET handicap = ? WHERE id = ?`,
      [handicap, id],
      function (err) {
        if (err) {
          console.error(
            "Error: failed to update user handicap. -> ",
            err.message
          );
          return response.status(500).send({ message: "Error en el servidor" });
        }

        console.log(`Row(s) updated: ${this.changes}`);
        response
          .status(200)
          .send({ message: "Handicap updated successfully!" });
      }
    );
  });
}
