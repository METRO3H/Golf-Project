import { sqlite3 } from "sqlite3";
import { database_path } from "../../constants/paths.js";

export async function Check_User_Exists(request, response) {
  console.log(request.body);
  const user_data = request.body;

  if (search_user_db(user_data) === false) {
    response = true;
    console.log(response);
    response.send(response)
  }

  const response_message = JSON.stringify(await Insert_User(user_data))
  response.send(response_message)
}

async function search_user_db(user_data) {
    const db = new sqlite3.Database(database_path, sqlite3.OPEN_READWRITE, err => {
        if (err) {
        console.error(err.message);
        }
        
        console.log('Connected to the database.');
    });
  }