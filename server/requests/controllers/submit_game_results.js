import sqlite3 from "sqlite3";
import { database_path } from "../../constants/paths.js";
import express from "express";
import { Verify_Token } from "./tokenController.js";
const router = express.Router();

router.post("/", Verify_Token, function (request, response) {

    console.log(request.body)

    return response.status(200).send({message: "WOOOM"})

})

export default router;