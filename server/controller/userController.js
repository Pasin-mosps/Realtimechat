import User from "../model/usermodel.js"

export const getUsers = async (req,res) => {
    try {
        const loggedUserId = req.user._id
        const filteredUser = await User.find({ _id: {$ne: loggedUserId }}).select("-password")

        res.status(200).json(filteredUser)
    }catch(error) {
        console.log("error in getUser Controller")
        res.status(500).json({error:"server error"})
    }
}