import sqlite3 from "sqlite3";
import { database_path } from "../../constants/paths.js";
import { Verify_Token } from "./tokenController.js";
import express from "express";

const router = express.Router();

router.post(
  "/add/send/:receiving_username",
  Verify_Token,
  function (request, response) {
    const sender_username = request.data.username;
    const receiving_username = request.params.receiving_username.replace(
      /_/g,
      " "
    );

    if (sender_username === receiving_username) {
      return response
        .status(401)
        .send({ message: "No te puedes auto enviar solicitud de amistad" });
    }

    const db = new sqlite3.Database(database_path, function (error) {
      if (error) {
        db.close();
        console.error("Error al abrir la base de datos. ->", error);
        return response.status(500).send({ message: "Error en el servidor" });
      }
      db.serialize(() => {
        const update_friend_request = db.prepare(
          `INSERT INTO Friend_requests (sender_username, receiving_username) VALUES (?, ?)`
        );
        update_friend_request.run(
          sender_username,
          receiving_username,
          function (error) {
            if (error) {
              console.error(
                "Error: failed to insert data on database. -> ",
                error.message
              );
              return response
                .status(500)
                .send({ message: "Error en el servidor" });
            }
            update_friend_request.finalize();
            db.close();
            return response.status(200).send({
              message: "Solicitud de amistad enviada con éxito",
            });
          }
        );
      });
    });
  }
);

router.post(
  "/add/accept/:receiving_username",
  Verify_Token,
  function (request, response) {
    const sender_username = request.params.receiving_username.replace(
      /_/g,
      " "
    );
    const receiving_username = request.data.username;

    if (sender_username === receiving_username) {
      return response
        .status(401)
        .send({ message: "No te puedes auto enviar solicitud de amistad" });
    }

    const db = new sqlite3.Database(database_path, function (error) {
      if (error) {
        db.close();
        console.error("Error al abrir la base de datos. ->", error);
        return response.status(500).send({ message: "Error en el servidor" });
      }
      db.serialize(() => {
        const update_friend_request = db.prepare(
          `UPDATE Friend_requests SET status = ? WHERE sender_username = ? AND receiving_username = ?`
        );
        update_friend_request.run(
          "Accepted",
          sender_username,
          receiving_username,
          function (error) {
            if (error) {
              console.error(
                "Error: failed to UPDATE data on database. -> ",
                error.message
              );
              return response
                .status(500)
                .send({ message: "Error en el servidor" });
            }
            update_friend_request.finalize();

            const update_friendship = db.prepare(
              `INSERT INTO Friends (username_1, username_2) VALUES (?, ?)`
            );
            update_friendship.run(
              sender_username,
              receiving_username,
              function (error) {
                if (error) {
                  console.error(
                    "Error: failed to insert data on database. -> ",
                    error.message
                  );
                  return response
                    .status(500)
                    .send({ message: "Error en el servidor" });
                }
                update_friendship.finalize();
              }
            );

            db.close();
            return response.status(200).send({
              message: "Solicitud de amistad aceptada con éxito",
            });
          }
        );
      });
    });
  }
);

router.post("/list", Verify_Token, function (request, response) {
  const username = request.data.username;

  const db = new sqlite3.Database(database_path, function (error) {
    if (error) {
      db.close();
      console.error("Error al abrir la base de datos. ->", error);
      return response.status(500).send({ message: "Error en el servidor" });
    }

    db.serialize(() => {
      const get_all_friends = db.prepare(
        `--sql 
             WITH parameter(username_to_compare) AS (SELECT ?)
      
      SELECT
          CASE
              WHEN username_1 = parameter.username_to_compare THEN username_2
              WHEN username_2 = parameter.username_to_compare THEN username_1
          END AS friend_username
      FROM
          Friends
      JOIN parameter ON TRUE
      WHERE
          username_1 = parameter.username_to_compare OR username_2 = parameter.username_to_compare;`
      );
      get_all_friends.all(username, function (error, friend_list) {
        if (error) {
          console.error(
            "Error: failed to get data on database. -> ",
            error.message
          );
          return response.status(500).send({ message: "Error en el servidor" });
        }
        get_all_friends.finalize();

        db.close();
        return response.status(200).send({
          message: "Amigos encontrados",
          data: friend_list,
        });
      });
    });
  });
});
export default router;
