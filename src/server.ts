import express, { Application, Request, Response } from 'express'
import userRouter from './routes/userRoute'

const app: Application = express()

app.use(express.json())

app.use("/api/users", userRouter)

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
})

app.listen(8000, () => {
    console.log("Server is running")
})