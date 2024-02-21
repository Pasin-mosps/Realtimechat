import express from "express"
import middleWare from "../middelware/middelware.js"
import { getUsers } from "../controller/userController.js"

const router = express.Router()

router.get("/",middleWare, getUsers)

export default router