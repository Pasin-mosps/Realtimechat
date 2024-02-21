import jwt from "jsonwebtoken"
import User from "../model/usermodel.js"

const middleWare = async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if (!token) {
            return res.status(401).json ({error: "Unauthorized no token"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded) {
            return res.status(401).json ({ error: "Unauthorized invalid token"})
        }

        const user = await User.findById(decoded.userId).select("-password")

        if (!user) {
            return res.status(404).json({error:" User not found"})
        }
        req.user = user
        next()

    }catch (error) {
        console.log("error in middleware")
        res.status(500).json({error: "server error"})
    }
}
export default middleWare