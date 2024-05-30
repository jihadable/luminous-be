import express, { Application, Request, Response } from 'express'
import path from 'path'
import userRouter from './routes/userRoute'

const app: Application = express()

app.use(express.json(), express.static("views"))
app.use("/styles", express.static(path.join(__dirname, "styles")))

app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "views", "index.html"))
})

app.use("/api/users", userRouter)

app.listen(8000, () => {
    console.log("Server is running")
})