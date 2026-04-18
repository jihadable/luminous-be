import { NextFunction, Request, Response } from "express";
import DashboardService from "../service/DashboardService.js";

class DashboardHandler {
    private service: DashboardService

    constructor(service: DashboardService){
        this.service = service

        this.getDashboardData = this.getDashboardData.bind(this)
    }

    async getDashboardData(req: Request, res: Response, next: NextFunction){
        try {
            const dashboardData = await this.service.getDashboardData()

            res.status(200).json({
                status: "success",
                data: dashboardData
            })
        } catch(error){
            next(error)
        }
    }
}

export default DashboardHandler