import express from "express"
import playerRoutes from "./playerRoutes.js" 
import loginRoutes from "./loginRoutes.js"
import registerRoutes from "./registerRoutes.js"
import checkUserExistsRoutes from "./checkUserExistsRoutes.js"

const router = express.Router()

router.use('/player', playerRoutes)
router.use('/login', loginRoutes)
router.use('/register', registerRoutes)
router.use('/checkUserExists', checkUserExistsRoutes)

export default router
