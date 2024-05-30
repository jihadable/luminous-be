import * as dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import userRouter from './routes/userRoute';

dotenv.config();

const port = process.env.PORT!
const app: Application = express()

app.use(express.json(), express.static("views"))
app.use("/styles", express.static(path.join(__dirname, "styles")))

app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "views", "index.html"))
})

app.use("/api/users", userRouter)

app.use((req, res) => {
    res.sendFile(path.join(__dirname, "views", "not-found.html"))
})

mongoose.connect(process.env.MONGO_URI!, { dbName: "luminous" })
    .then(() => {
        app.listen(port, () => {
            console.log("Server is running")
        })
    })
    .catch(error => {
        console.log(error)
    })