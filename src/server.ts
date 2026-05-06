import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import DB from "./config/db.js";
import getRedis from "./config/redis.js";
import apiRouter from "./routes/apiRoute.js";
dotenv.config({
    path: ".env.local",
    override: true
})

const app = express()

app.use(express.json(), cors())

app.use("/asset", express.static(new URL("./asset", import.meta.url).pathname))

const db = DB()
const redis = getRedis()
app.use("/api", apiRouter(db, redis))

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})