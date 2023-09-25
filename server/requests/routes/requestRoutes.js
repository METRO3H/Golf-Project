import express from "express"
import playerRoutes from "./playerRoutes.js" 
import loginRoutes from "./loginRoutes.js"

const router = express.Router()

router.use('/player', playerRoutes)
router.use('/login', loginRoutes)

export default router
