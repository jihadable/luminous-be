import { Response } from "express"

const serverErrorResponse = (error: any, res: Response) => {
    console.log(error.message)

    res.status(500).json({
        status: 500,
        ok: false,
        message: error.message
    })
}

export default serverErrorResponse