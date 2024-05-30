import { Response } from "express"

const serverErrorResponse = (error: any, res: Response): Response => {
    console.log(error.message)

    return res.status(500).json({
        status: 500,
        ok: false,
        message: error.message
    })
}

export default serverErrorResponse