import sqlite3 from "sqlite3"; // Importar SQLite
import handle_sql_error from "./handle_sql_error.js";
import * as db_error from "../../constants/db_error.js";
import { database_path } from "../../constants/paths.js";

// Crear una nueva instancia de la base de datos
const db = new sqlite3.Database(database_path, (error) =>
  handle_sql_error(error, db_error.create_database)
);

const sql_create_tables = [
  `CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    username TEXT UNIQUE,
    game_id INTEGER DEFAULT 0,
    password TEXT,
    description TEXT,
    privilege TEXT DEFAULT 'user'
  );`,
  `CREATE TABLE User_stats (
    id INTEGER,
    handicap INTEGER,
    games_won INTEGER DEFAULT 0,
    games_played INTEGER DEFAULT 0,
    FOREIGN KEY(id) REFERENCES Users(id)
  );`,
  `CREATE TABLE Friends (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username_1 TEXT,
    username_2 TEXT, 
    FOREIGN KEY(username_1) REFERENCES Users(username),
    FOREIGN KEY(username_2) REFERENCES Users(username)
  );`,
  `CREATE TABLE Friend_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_username TEXT,
    receiving_username TEXT, 
    status TEXT DEFAULT "waiting",
    FOREIGN KEY(sender_username) REFERENCES Users(username),
    FOREIGN KEY(receiving_username) REFERENCES Users(username)
);`,
  `CREATE TABLE Blocked_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  blocker_username TEXT,
  blocked_username TEXT, 
  FOREIGN KEY(blocker_username) REFERENCES Users(username),
  FOREIGN KEY(blocked_username) REFERENCES Users(username)
);`,
  `CREATE TABLE Game_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    game_id INTEGER,
    hole_number INTEGER,
    score INTEGER,
    field_side_id INTEGER,
    putters INTEGER,
    penalty INTEGER,
    FOREIGN KEY(user_id) REFERENCES Users(id),
    FOREIGN KEY(game_id) REFERENCES Games(id),
    FOREIGN KEY(field_side_id) REFERENCES Field_side(id)
  );`,
  `CREATE TABLE Games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rules TEXT,
    date TEXT,
    weather TEXT,
    number_of_players INTEGER,
    duration INTEGER
  );`,
  `CREATE TABLE Field_side (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    side_name TEXT
  );`,
];

sql_create_tables.forEach((sql) => {
  db.run(sql, (error) => handle_sql_error(error, db_error.create_database));
});

// Cierra la conexión cuando ya no la necesites
db.close((error) => handle_sql_error(error, db_error.close_database));
