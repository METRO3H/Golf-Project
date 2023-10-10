import sqlite3 from "sqlite3";
import { database_path } from "../../constants/paths.js";
import promise from "promise"
export async function login(request, response) {
  const user_data = request.body;

  const db_response = await verify_data(user_data);
  var message = ""
  if (db_response === false) {
    message = JSON.stringify("¡Error en el servidor!")
  } else {

    if(Object.keys(db_response).length === 0){
      message = JSON.stringify(" No existe ese usuario mi pana ")
    }else{
      message = db_response
    }
  }

  response.send(message)
}

async function verify_data(user_data) {
  var errors = 0;
  const Select_User_Query = Get_Select_User_Query(user_data);

  const db = new sqlite3.Database(database_path, (error) => {
    if (error) {
      console.error("Error: al abrir la base de datos. ->", error);
      errors++;
    }
  });

  if (errors !== 0) {
    db.close((error) => {
      console.error("Error: al cerrar la base de datos. ->", error);
    });

    return false;
  }

  return new promise((resolve, reject) => {
    db.all(Select_User_Query, (error, row) => {
      if (error) {
        console.log("Error: Usuario no registrado");
      }else{
        console.log(row)
        resolve(row);
        db.close();
      }

    });
  });
}

function Get_Select_User_Query(user_data) {
  const query = `--sql
    SELECT * FROM users WHERE email = '${user_data.email}' AND password = '${user_data.password}';
    `;
    console.log(query)
  return query;
}
