import express from "express"
import player_routes from "./playerRoutes.js" 
import profile_route from "../controllers/profile_controller.js"
import login_route from "../controllers/loginController.js"
import register_route from "../controllers/registerController.js"



const router = express.Router()

router.use('/player', player_routes)
router.use('/login', login_route)
router.use('/register', register_route)
router.use('/profile', profile_route)


export default router
