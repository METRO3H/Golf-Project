import express from "express"
import * as playerController from "../controllers/playerController.js"

const router = express.Router()

router.get('/all', playerController.getAll)
router.get('/:player_name', playerController.getOne)
router.get('/:change_handicap', playerController.changeHandicap)
export default router