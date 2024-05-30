import { Request, Response, Router } from "express";

const userRouter: Router = Router()

userRouter.post("/test", (req: Request, res: Response) => {
    return res.json(req.body)
})

export default userRouter