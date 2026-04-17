import cors from "cors";
import express from "express";
import DB from "../../src/database/db.js";
import apiRouter from "../../src/routes/apiRoute.js";

const app = express()

app.use(express.json(), cors())

const db = DB()
app.use("/api", apiRouter(db))

export default app