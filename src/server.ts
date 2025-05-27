import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import DB from "./database/db";
import apiRouter from "./routes/apiRoute";
dotenv.config()

const app = express()

app.use(express.json(), cors())

const db = DB()
app.use("/api", apiRouter(db))

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})