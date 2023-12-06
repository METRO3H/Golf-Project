import sqlite3 from "sqlite3";
import { database_path } from "../../constants/paths.js";
import express from "express"

const router = express.Router()

router.post("/", function (request, response) {
    const db = new sqlite3.Database(database_path, (error) => {
        if (error) {
            console.error("Error al abrir la base de datos. ->", error);
            return response.status(500).send({ message: "Error en el servidor" });
        }

        db.serialize(() => {
            const get_all_games_query = `SELECT id, rules, date, weather, number_of_players, duration FROM Games`;

            db.all(get_all_games_query, (error, rows) => {
                if (error) {
                    console.error(
                        "Error: failed to get games from the database. -> ",
                        error.message
                    );
                    return response.status(500).send({ message: "Error en el servidor" });
                }
                console.log(rows);
                console.log("Games fetched successfully!");
                response.status(200).send({
                    message: "Games fetched successfully!",
                    data: rows
                });
            });
        });
    });
});

export default router