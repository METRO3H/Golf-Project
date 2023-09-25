import express from "express"
import playerRoutes from "./playerRoutes.js" 

const router = express.Router()

router.use('/player', playerRoutes)


export default router
