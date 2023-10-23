import sqlite3 from "sqlite3";
import { database_path } from "../../constants/paths.js";

export async function Register_User(request, response) {
  const user_data = request.body;

  verify_data(user_data)
  const db = new sqlite3.Database(database_path, (error) => {
    if (error) {
      console.error("Error al abrir la base de datos. ->", error);
      return response.status(500).send({ message: "Error en el servidor" });
    }

    db.serialize(() => {
      const description =
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis perspiciatis eligendi delectus suscipit a dignissimos optio aspernatur voluptatibus! At commodi, nobis est optio beatae ipsa saepe eum ullam vero reiciendis?";
      const handicap = Math.floor(Math.random() * 40);

      const insert_user = db.prepare(
        `INSERT INTO users (email, username, password, description, handicap) VALUES (?, ?, ?, ?, ?)`
      );

      insert_user.run(
        user_data.email,
        user_data.username,
        user_data.password,
        description,
        handicap,
        function (error) {
          if (error) {
            console.error(
              "Error: failed to insert user into database. -> ",
              error.message
            );
            if (error.message.includes("UNIQUE constraint failed")) {
              return response
                .status(500)
                .send({
                  message:
                    "El correo electrónico o nombre de usuario ya existe.",
                });
            }

            return response
              .status(500)
              .send({ message: "Error en el servidor" });
          }

          console.log("User added successfully!");
          response.status(200).send({
            message: "¡Usuario creado exitosamente!",
          });
        }
      );
    });
  });
}

function verify_data(user_data) {
  /* Logica para verificar datos*/

  return true;
}
