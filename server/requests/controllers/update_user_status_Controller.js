import sqlite3 from "sqlite3";
import { database_path } from "../../constants/paths.js";
import { Verify_Token } from "./tokenController.js";
import express from "express";

const router = express.Router();

router.post("/:user_name_requested", Verify_Token, function (request, response) {
  const user_name = request.data.username;
  const user_name_requested = request.params.user_name_requested.replace(/_/g, " ");

  if (user_name === user_name_requested) {
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
        `INSERT INTO Friends (user_name, user_name_requested) VALUES (?, ?)`
      );
      update_friend_request.run(user_name, user_name_requested, function (error) {
        if (error) {
          console.error(
            "Error: failed to insert data on database. -> ",
            error.message
          );
          return response.status(500).send({ message: "Error en el servidor" });
        }
        update_friend_request.finalize();
        db.close();
        return response.status(200).send({
          message: "Solicitud de amistad enviada con éxito",
        });
      });
    });
  });
});

export default router;
