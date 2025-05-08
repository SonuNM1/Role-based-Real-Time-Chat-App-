import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const conn = mongoose.connect(process.env.MONGO_URI)
    .then((connection) => {
        console.log(`MongoDB Connected: host = ${connection.connection.host}, db = ${connection.connection.name}}`)
    })
    .catch((err) => {
        console.error('DB Error: ', err)
    })

export default conn ; 