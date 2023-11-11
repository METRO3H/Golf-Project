import sqlite3 from "sqlite3";
import { database_path } from "../../constants/paths.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express from "express"

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router()

router.post("/", function(request, response){

  const user_data = request.body;

  const db = new sqlite3.Database(database_path, (error) => {
    if (error) {
      console.error("Error al abrir la base de datos. ->", error);
      return response.status(500).send({ message: "Error en el servidor" });
    }

    db.serialize(() => {
      const check_user = db.prepare(
        `SELECT id, username, privilege FROM users WHERE email = ? AND password = ?`
      );
      check_user.get(
        user_data.email,
        user_data.password,
        function (error, user_row) {
          if (error) {
            console.error(
              "Error: failed to get user from the database. -> ",
              error.message
            );
            return response
              .status(500)
              .send({ message: "Error en el servidor" });
          }
          if (user_row == null) {
            console.error("User not found");
            return response
              .status(401)
              .send({
                message:
                  "Error de autenticación. Por favor, verifica tus credenciales",
              });
          }
          try {
            const token = jwt.sign(user_row, JWT_SECRET, { expiresIn: "1d" });
            return response.status(200).send({
              message: "Inicio de sesión exitoso",
              data: user_row,
              jwt: token,
            });
          } catch (error) {
            console.error("Failed to create token -> ", error);
            return response.status(500).send({message: "Error en el servidor"})
          }

        }
      );
    });
  });

})

export default router