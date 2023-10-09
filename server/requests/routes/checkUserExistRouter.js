import express from "express"
import * as checkUserExistController from "../controllers/checkUserExistController.js"

const router = express.Router()

router.post('/', checkUserExistController.Check_User_Exists)