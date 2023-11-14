import express from "express"
import player_routes from "./playerRoutes.js" 
import profile_route from "../controllers/profile_controller.js"
import login_route from "../controllers/loginController.js"
import register_route from "../controllers/registerController.js"
import update_friend_status from "../controllers/update_friend_status_Controller.js"
const router = express.Router()

router.use('/player', player_routes)
router.use('/login', login_route)
router.use('/register', register_route)
router.use('/profile', profile_route)
router.use('/update/friend/status', update_friend_status)


export default router
