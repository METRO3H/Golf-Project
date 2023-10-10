import sqlite3 from "sqlite3";
import { database_path } from "../../constants/paths.js";

export function login(request, response) {
  const user_data = request.body;

  if(verify_data(user_data) === true){
    response.send(JSON.stringify("¡Usuario valido!"));
  }
  else {
    response.send(JSON.stringify("¡Usuario Invalido!"));
  }

  
}

function verify_data(user_data) {
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

  const user = db.run(Select_User_Query, (error) => {
    if (error) {
      console.log("Error: failed to get user from the database.");
      errors++;
    }
  });

  if (errors !== 0) {
    db.close((error) => {
      if (error) {
        console.error("Error: al cerrar la base de datos. ->", error);
      }
    });

    return false;
  }

  console.log(user);

  db.close((error) => {
    console.error("Error: al cerrar la base de datos. ->", error);
  });
  
  return true
}

function Get_Select_User_Query(user_data) {
  const query = `--sql
    SELECT * users WHERE email = ${user_data.email} AND password = ${user_data.password};
    `;
  return query;
}
