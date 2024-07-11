import cors from "cors";
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import path from 'path';
import { pool } from "./database/database";
import productRouter from './routes/productRoute';
import userRouter from './routes/userRoute';

dotenv.config();

const port = process.env.PORT!
const app: Application = express()

// middlewares
app.use(express.json(), express.static("views"), cors())
app.use("/styles", express.static(path.join(__dirname, "styles")))
app.use("/images", express.static(path.join(__dirname, "images")))

// root endpoint
app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "views", "index.html"))
})

// users api
app.use("/api/users", userRouter)

// products api
app.use("/api/products", productRouter)

// not found page
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "not-found.html"))
})

app.listen(port, () => {
    pool.connect((error) => {
        if (error){
            console.log(error)
    
            return
        }

        console.log("Server is running")
    })
})