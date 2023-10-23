import sqlite3 from "sqlite3";
import { database_path } from "../../constants/paths.js";

export function login(request, response) {
  const user_data = request.body;
  const db = new sqlite3.Database(database_path, (error) => {
    if (error) {
      console.error("Error al abrir la base de datos. ->", error);
      return response.status(500).send({ message: "Error en el servidor" });
    }

    db.serialize(() => {
      const check_user = db.prepare(
        `SELECT username FROM users WHERE email = ? AND password = ?`
      );

      check_user.get(
        user_data.email,
        user_data.password,
        function (error, user_row) {

          if (error) {
            console.error(
              "Error: failed to get users from the database. -> ",
              error.message
            );
            return response
              .status(500)
              .send({ message: "Error en el servidor" });
          }
          if (user_row == null) {
            console.log("User not found");
            return response.status(401).send({ message: "Usuario no válido" });
          }
          response.status(200).send({
            message: "Inicio de sesión exitoso",
            data: user_row,
          });

        }
      );

     
    });
  });
}
