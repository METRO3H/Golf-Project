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

  const user_name = request.body.user_name;

  const db = new sqlite3.Database(database_path, (error) => {
    if (error) {
      console.error("Error al abrir la base de datos. -> ", error.message);
      return response.status(500).send({ message: "Error en el servidor" });
    }
    db.serialize(() => {
      const get_user_query = db.prepare(
        `--sql
      WITH parameter(username_to_compare) AS (
          SELECT ?
      )
      SELECT Users.email, Users.username, Users.description, User_stats.handicap, Last_friend_request.id, Last_friend_request.sender_username, Last_friend_request.receiving_username, Last_friend_request.status AS "Friend_request_status", Friends.username_1, Friends.username_2,
        CASE 
        WHEN ((Friends.username_1 IS NOT NULL) OR (Friends.username_2 IS NOT NULL)) THEN TRUE
        ELSE FALSE
        END AS friendship_status
      FROM Users
      INNER JOIN User_stats ON Users.id = User_stats.id
      LEFT JOIN parameter ON TRUE
      LEFT JOIN (SELECT * FROM Friend_requests ORDER BY id DESC LIMIT 1) AS Last_friend_request ON 
      (
          ( Last_friend_request.sender_username = Users.username AND Last_friend_request.receiving_username = parameter.username_to_compare)
          OR 
          ( Last_friend_request.sender_username = parameter.username_to_compare AND Last_friend_request.receiving_username = Users.username)
      )
      LEFT JOIN Friends ON 
      (
          ( Friends.username_1 = Users.username AND Friends.username_2 = parameter.username_to_compare )
          OR 
          ( Friends.username_1 = parameter.username_to_compare AND Friends.username_2 = Users.username )
      )
      WHERE Users.username = ?
        `
      );

      get_user_query.get(user_name, player_name, function (error, user_row) {
        if (error) {
          console.error(
            "Error: failed to get users from the database. -> ",
            error.message
          );
          db.close();
          return response.status(500).send({ message: "Error en el servidor" });
        }

        if (user_row == null) {
          db.close();
          console.log("User not found");
          return response.status(401).send({ message: "Usuario no válido" });
        }
        get_user_query.finalize();
        db.close();
        console.log(user_row);
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
