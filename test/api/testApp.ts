import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import DB from "../../src/database/db";
import apiRouter from "../../src/routes/apiRoute";
dotenv.config()

const app = express()

app.use(express.json(), cors())

const db = DB()
app.use("/api", apiRouter(db))

export default app