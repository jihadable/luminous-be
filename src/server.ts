import cors from "cors";
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import rateLimit from "express-rate-limit";
import path from 'path';
import { pool } from "./database/database";
import cartProductRouter from "./routes/cartProductRoute";
import productRouter from './routes/productRoute';
import userRouter from './routes/userRoute';

dotenv.config();

const port = process.env.PORT!
const app: Application = express()

// middlewares
app.use(express.json(), express.static("views"), cors({ origin: ["https://luminous-2110.netlify.app", "http://localhost:5173"] }))
app.use("/styles", express.static(path.join(__dirname, "styles")))
app.use("/images", express.static(path.join(__dirname, "images")))

// root endpoint
app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "views", "index.html"))
})

// rate limit
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        status: 429,
        ok: false,
        message: "Too many requests from this IP, please try again after 15 minutes"
    },
    statusCode: 429
})

app.use("/api", apiLimiter)

// users api
app.use("/api/users", userRouter)

// products api
app.use("/api/products", productRouter)

// cart products api
app.use("/api/cart-products", cartProductRouter)

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