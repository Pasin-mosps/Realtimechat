import express from "express"
import { getMessages, sendMessage } from "../controller/messageController.js"
import middleWare from "../middelware/middelware.js"

const router = express.Router()

router.get("/:id",middleWare, getMessages)
router.post("/send/:id",middleWare, sendMessage)

export default router