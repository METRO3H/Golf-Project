import express from "express"
import * as userController from "../controllers/userController.js"

const router = express.Router()

router.post('/all', userController.getAll)
router.post('/:id', userController.getOne)


export default router