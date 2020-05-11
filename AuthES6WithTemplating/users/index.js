import { Router } from "express"
import { fetchAllUsers, fetchOnlyAuthors } from "./users_controllers"

const router = Router()

router.route("/").get(fetchAllUsers)
router.route("/:name").get(fetchOnlyAuthors)

export default router
