import bcrypt from "bcrypt"
import User from "../model/usermodel.js"
import generateJWT from "../utills/genToken.js"


export const signup = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const profilePic = `https://avatar.iran.liara.run/public`;

        const newUser = new User({
            username,
            password: hashedPassword, // Use the hashed password
            profilePic,
        });

        console.log('New User:', newUser);

        if (newUser) {
            generateJWT(newUser._id, res);
            console.log('JWT Generated Successfully');
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ error: "Invalid user" });
        }
    } catch (error) {
        console.log("Error in signup controller:", error);
        res.status(500).json({ error: "Server Error" });
    }
};


export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        const passwordCorrect = await bcrypt.compare(password, user?.password || "")

        if (!user || !passwordCorrect) {
            return res.status(400).json({error:"Invalid username or password"})
        }

        generateJWT(user._id, res)

        res.status(200).json({
            _id:user._id,
            username: user.username,
            profilePic: user.profilePic,
        })
    }catch (error) {
        console.log("Error login Controller")
        res.status(500).json ({ error: "Server Error"})
    }
}

export const logout = (req, res) => {
    try{
        res.cookie("jwt","", { maxAge: 0})
        res.status(200).json ({message: "Logout success"})
    }catch (error) {
        console.log("error in logout controller")
        res.status(500).json({error:"server error"})
    }
}