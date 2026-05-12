import cors from "cors";
import express from "express";
import DB from "../../src/config/db.js";
import getRedis from "../../src/config/redis.js";
import apiRouter from "../../src/routes/apiRoute.js";

const app = express()

app.use(express.json(), cors())

const db = DB()
const redis = getRedis()
app.use("/api", apiRouter(db, redis))

export default app