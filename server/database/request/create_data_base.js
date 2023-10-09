import sqlite3 from 'sqlite3'; // Importar SQLite
import handle_sql_error from './handle_sql_error.js';
import * as db_error from '../../constants/db_error.js';
import { database_path } from '../../constants/paths.js';
// Crear una nueva instancia de la base de datos
const db = new sqlite3.Database(database_path, 
(error) => handle_sql_error(error, db_error.create_database)
);

const sql_create_tables = `--sql

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT,
  username TEXT,
  password TEXT
);

`

db.run(sql_create_tables, (error) => handle_sql_error(error, db_error.create_database));
// Cierra la conexión cuando ya no la necesites
db.close((error) => handle_sql_error(error, db_error.close_database));
