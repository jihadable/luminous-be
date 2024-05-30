import express, { Application, Request, Response, Router } from 'express'
import path from 'path'
import userRouter from './routes/userRoute'

const app: Application = express()
const router: Router = Router()

app.use(express.json(), express.static("views"))
app.use("/styles", express.static(path.join(__dirname, "styles")))

router.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "views", "index.html"))
})

app.use("/api/users", userRouter)

app.use("/", router)

app.listen(8000, () => {
    console.log("Server is running")
})