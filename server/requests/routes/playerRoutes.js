import express from "express"
import * as playerController from "../controllers/playerController.js"

const router = express.Router()

router.post('/all', playerController.getAll)
router.get('/:player_name', playerController.getOne)

export default router