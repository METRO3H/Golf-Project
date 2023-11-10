import sqlite3 from "sqlite3";
import { database_path } from "../../constants/paths.js";
import express from "express";

const router = express.Router();

router.post("/", function (request, response) {
  const user_data = request.body;
  const verify_data_response = Verify_data(user_data);

  if (!verify_data_response.ok) {
    return response.status(401).send({ message: verify_data_response.message });
  }

  const db = new sqlite3.Database(database_path, (error) => {
    if (error) {
      console.error("Error al abrir la base de datos. ->", error);
      return response.status(500).send({ message: "Error en el servidor" });
    }

    db.serialize(() => {
      const description =
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis perspiciatis eligendi delectus suscipit a dignissimos optio aspernatur voluptatibus! At commodi, nobis est optio beatae ipsa saepe eum ullam vero reiciendis?";

      db.run('BEGIN EXCLUSIVE TRANSACTION', function(error){

        if(error){
          console.error(
            "Error: failed to start transaction in database. -> ",
            error.message
          );
          return response.status(500).send({ message: "Error en el servidor" });
        }

      })
      
      const register_user = db.prepare(
        `INSERT INTO users (email, username, password, description) VALUES (?, ?, ?, ?)`
      );

      register_user.run(
        user_data.email,
        user_data.username,
        user_data.password,
        description,
        function (error) {
          if (error) {

            db.run('ROLLBACK');

            console.error(
              "Error: failed to insert user into database. -> ",
              error.message
            );
            
            if (error.message.includes("UNIQUE constraint failed")) {
              return response.status(500).send({
                message: "El correo electrónico o nombre de usuario ya existe.",
              });
            }

            return response
              .status(500)
              .send({ message: "Error en el servidor" });
          }
        const id = this.lastID;
        const handicap = Math.floor(Math.random() * 40);
        const register_user_stats = db.prepare(
          `INSERT INTO User_stats (id, handicap, games_won, games_played) VALUES (?, ?, ?, ?)`
        );
        register_user_stats.run(id, handicap, 0, 0, function (error) {
          if (error) {
            db.run('ROLLBACK');
            console.error(
              "Error: failed to insert user stats into database. -> ",
              error.message
            );
            return response
              .status(500)
              .send({ message: "Error en el servidor" });
          }
          db.run('COMMIT');
          console.log("User added successfully!");
          response.status(200).send({
            message: "¡Usuario creado exitosamente!",
          });
        });
        }
      );
    });
  });
});

function Verify_data(user_data) {
  const verify_data_response = {
    ok: true,
    message: "",
  };

  if (user_data.username.includes("_")) {
    verify_data_response.ok = false;
    verify_data_response.message =
      "El nombre de usuario no puede contener el caracter '_'";

    return verify_data_response;
  }

  return verify_data_response;
}

export default router;
