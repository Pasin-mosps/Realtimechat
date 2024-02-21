import mongoose from "mongoose";

const connectMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database Connect")
    }catch (error) {
        console.log("Database Error")
    }
}
export default connectMongoDB