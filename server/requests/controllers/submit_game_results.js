import sqlite3 from "sqlite3";
import { database_path } from "../../constants/paths.js";
import express from "express";
import { Verify_Token } from "./tokenController.js";
const router = express.Router();

router.post("/", Verify_Token, function (request, response) {

    console.log(request.body)
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
    return response.status(200).send({message: "WOOOM"})

})

export default router;