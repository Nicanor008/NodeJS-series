import { Router } from "express"
import { getAddNewUser, registerUser, getLoginUser, loginUser, verifyAccount, Logout } from "./auth_controllers"

const router = Router()

router.route("/register").get(getAddNewUser).post(registerUser)
router.route("/login").get(getLoginUser).post(loginUser)
router.route("/verify/:email").patch(verifyAccount)
router.route("/logout").post(Logout)

export default router
